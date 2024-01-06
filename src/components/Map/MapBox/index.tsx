import DangerousIcon from '@mui/icons-material/Dangerous';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from '@mui/material';
import { getDistance } from 'geolib';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import Map, { MapLayerMouseEvent, Marker, Popup } from 'react-map-gl';
import useFetch from '../../../hooks/use-fetch.hook';
import EvacuateModal from '../../EvacuateModal';
import { ILocation } from './location.interface';
import { IUser } from './user.interface';

const token = 'pk.eyJ1IjoieXVyaWgxIiwiYSI6ImNsZjVsaWh2NTBjNms0MW5ueHh6dGd0N2IifQ.6bEmg3YCL9ZGvNe7CisOqw';

interface IGeopoint {
	longitude: number;
	latitude: number;

}

interface IViewport extends IGeopoint {
	zoom: number;
}

interface MapBoxProps {
	setLongitude?: React.Dispatch<React.SetStateAction<number>>,
	setLatitude?: React.Dispatch<React.SetStateAction<number>>
	hasDangerMarkers: boolean;
	width: string;
	height: string;
}

export default function MapBox({ width, height, hasDangerMarkers, setLongitude, setLatitude}: MapBoxProps) : JSX.Element {
	const [user, setUser] = useState<IUser | null>(null);
	const [viewport, setViewport] = useState<IViewport>();
	const [locations, setLocations] = useState<ILocation[]>([]);
	const [userMarker, setUserMarker] = useState<IGeopoint>();
	const {executeFetch, response, data, loading, error} = useFetch('http://localhost:3001/user');

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		navigator.geolocation.getCurrentPosition(async (pos) => {
			const user = await executeFetch({ headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } });
			setUser(user);

			setViewport({
				latitude: hasDangerMarkers ? (user as IUser).longitude : pos.coords.latitude,
				longitude: hasDangerMarkers ? (user as IUser).latitude : pos.coords.longitude,
				zoom: 9,
			});

			setUserMarker({
				longitude: hasDangerMarkers ? (user as IUser).longitude : pos.coords.longitude,
				latitude: hasDangerMarkers ? (user as IUser).latitude : pos.coords.latitude});

		});

		async function getLocations() {
			const locations: ILocation[] = await executeFetch({url: 'http://localhost:3001/locations', method: 'GET',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
			});

			setLocations(locations.map(location => ({...location, showed: false})));
		}

		getLocations();
	}, []);

	const addDangerMarker = (event: MapLayerMouseEvent) => {
		const closeMarker = locations.findIndex(marker =>  getDistance({longitude: marker.longitude, latitude: marker.latitude},
			{longitude: event.lngLat.lng, latitude: event.lngLat.lat}) < 500);

		if(closeMarker !== -1) {
			setLocations(locations.filter(marker => getDistance({longitude: marker.longitude, latitude: marker.latitude},
				{longitude: event.lngLat.lng, latitude: event.lngLat.lat}) > 500));
			return ;
		}

		// {longitude: event.lngLat.lng, latitude: event.lngLat.lat}
		setLocations([...locations]);
	};

	const addUserMarker = (event: MapLayerMouseEvent) => {
		setUserMarker({longitude: event.lngLat.lng, latitude: event.lngLat.lat});
		if(setLongitude && setLatitude){
			setLongitude(event.lngLat.lng);
			setLatitude(event.lngLat.lat);
		}
	};

	const onMarkerClick = (id: number) => {
		const changedLocations = locations.map(location =>
			({...location, showed: location.id === id ? !location.showed : location.showed}));

		setLocations(changedLocations);
	};

	return (
		<Box sx={{position: 'relative'}}>
			{viewport?.latitude && viewport?.longitude && (
				<Box sx={{width, height, position: 'absolute'}}>
					<Map
						mapboxAccessToken={token}
						initialViewState={viewport}
						mapStyle="mapbox://styles/mapbox/streets-v11"
						style={{width, height}}
						onClick={hasDangerMarkers ? user?.roles.some(role => role.name === 'ADMIN') ? addDangerMarker : () => null : addUserMarker	}
					>
						{locations.map((marker, index) =>
							(
								<div key={`container-${index}`}>
									<Marker key={`marker-${index}`}
										longitude={marker.longitude}
										latitude={marker.latitude}
										draggable={user?.roles.some((role) => role.name === 'ADMIN') ? true : false}
										onClick={() =>
											onMarkerClick(marker.id)
										}
									>
										<DangerousIcon fontSize='large'/>
									</Marker>
									{
										(<Popup key={`popup-${index}`} longitude={marker.longitude} latitude={marker.latitude}
											anchor="bottom">
											<p>Назва: {marker.name}</p>
											<p>Опис: {marker.description}</p>
											<p>Рівень води: <span style={{color: getColorByWaterLevel(marker.waterLevel) }}>{marker.waterLevel}</span></p>
											<p>Температура: <span style={{color: getColorByTemperatureLevel(marker.temperatureLevel) }}>{marker.temperatureLevel}</span></p>
											<p>Рівень снігу: <span style={{color: getColorBySnowLevel(marker.snowLevel) }}>{marker.snowLevel}</span></p>
											<p>Рівень дощу: <span style={{color: getColorByRainLevel(marker.rainLevel) }}>{marker.rainLevel}</span></p>
											{marker.dangerResult === 'Евакуювати' ?
												<EvacuateModal/>
												: <p>{marker.dangerResult}</p>}
										</Popup>)}
								</div>
							))}

						<Marker
							longitude={userMarker?.longitude}
							latitude={userMarker?.latitude}
							draggable={true}>
							<LocationOnIcon fontSize='large'/>
						</Marker>

					</Map>
					{/* <GeolocateControl/>
					<FullscreenControl/>
					<NavigationControl/>
					<ScaleControl/> */}
				</Box>
			)}
		</Box>
	);
}

function getColorByDangerResult(dangerResult: string): string {
	switch(dangerResult){
	case 'Евакуювати':
		return 'red';
	case 'Посилити увагу':
		return 'yellow';
	case 'Не хвилюватися':
		return 'green';
	default:
		return '';
	}
}

function getColorByWaterLevel(waterLevel: string): string {
	switch(waterLevel){
	case 'ВИСОКИЙ':
		return 'red';
	case 'СЕРЕДНІЙ':
		return 'yellow';
	default:
		return '';
	}
}

function getColorByTemperatureLevel(temperatureLevel: string): string {
	switch(temperatureLevel){
	case 'ВИСОКИЙ':
		return 'red';
	case 'СЕРЕДНІЙ':
		return 'yellow';
	default:
		return '';
	}
}

function getColorBySnowLevel(snowLevel: string): string {
	switch(snowLevel){
	case 'ВИСОКИЙ':
		return 'red';
	case 'НИЗЬКИЙ':
		return 'green';
	default:
		return '';
	}
}

function getColorByRainLevel(rainLevel: string): string {
	switch(rainLevel){
	case 'ВИСОКИЙ':
		return 'red';
	case 'СЕРЕДНІЙ':
		return 'yellow';
	case 'НИЗЬКИЙ':
		return 'green';
	default:
		return '';
	}
}