import { FormControl, InputLabel, List, ListItemButton, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { groupBy } from 'lodash';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/use-fetch.hook';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 700,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface ITransport {
	id: number,
	name: string,
	capacity: number;
}

export default function EvacuateModal() {
	const [transports, setTransports] = useState<ITransport[]>();
	const [currentTransport, setCurrentTransport] = useState<ITransport>();
	const [amount, setAmount] = useState<number>();
	const [neededTransports, setNeededTransports] = useState<ITransport[]>();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const {executeFetch, response, data, loading, error} = useFetch('http://localhost:3001/vehicle');

	useEffect(() => {
		async function getTransports() {
			const transports: ITransport[] = await executeFetch({method: 'GET'});

			setTransports(transports);
		}

		getTransports();
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		setCurrentTransport(transports?.find(transport => transport.name === event.target.value));
	};

	const handleCapacityChange = (event: any) => {
		setAmount(event.target.value);
	};

	const handleTransportsNumber = (event: any) => {
		const neededTransports: ITransport[] = calculateMostSuitableVehicles(amount as number, transports as ITransport[]);
		setNeededTransports(neededTransports);
		console.log(neededTransports);
	};

	return (
		<div>
			<Button onClick={handleOpen}>Евакуювати</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Транспорт</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={currentTransport?.name}
								label="Транспорт"
								onChange={handleChange}
							>
								{transports?.map((transport, index) => (
									<MenuItem key={`transport-${index}`} value={transport.name}>{transport.name + ' ' + transport.capacity}</MenuItem>
								))}
							</Select>
							<TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleCapacityChange}/>
							<Button onClick={handleTransportsNumber}>Calculate</Button>
							<List>
								{
									neededTransports?.map((transport, index) => (
										<ListItemButton key={index} component="a" href="#simple-list">
											<ListItemText key={index}>{transport.name}</ListItemText>
										</ListItemButton>
									))
								}

							</List>

						</FormControl>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}

const calculateMostSuitableVehicles = (amount: number, allVehicles: ITransport[]) => {
	const myVehicles: ITransport[] = [];
	const vehiclesPool = [...allVehicles];
	let peopleLeftToSeat = amount;
	const allVehiclesCapacity = allVehicles.reduce(
		(acc, cur) => acc + cur.capacity,
		0
	);

	if (allVehiclesCapacity <= amount) {
		return allVehicles;
	}

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const groupedAndSortedByCapacity = Object.entries(
			groupBy(vehiclesPool, (el: any) => el.capacity)
		)
			.map(([key, val]) => ({
				capacity: key,
				vehicles: val,
			}))
			.sort((a, b) => Number(b.capacity) - Number(a.capacity));

		const minCapacityVehicles =
        groupedAndSortedByCapacity[groupedAndSortedByCapacity.length - 1];

		let isAdded = false;

		groupedAndSortedByCapacity.forEach((el, i, arr) => {
			if (isAdded) return;

			if (Number(el.capacity) <= peopleLeftToSeat) {
				const addedVehicle = (el.vehicles as any)[0];
				// add vehicle to selected
				myVehicles.push(addedVehicle);
				// remove vehicle from pool
				vehiclesPool.splice(
					vehiclesPool.findIndex((el) => el.id === addedVehicle.id),
					1
				);
				// decrease amount
				peopleLeftToSeat = peopleLeftToSeat - Number(addedVehicle.capacity);
				isAdded = true;
			}

			if (i === arr.length - 1) {
				const addedVehicle = (minCapacityVehicles.vehicles as any)[0];
				// add vehicle to selected
				myVehicles.push(addedVehicle);
				// remove vehicle from pool
				vehiclesPool.splice(
					vehiclesPool.findIndex((el) => el.id === addedVehicle.id),
					1
				);
				// decrease amount
				peopleLeftToSeat = peopleLeftToSeat - Number(addedVehicle.capacity);
				isAdded = true;
			}
		});

		const areAllPeopleSeated = peopleLeftToSeat <= 0;

		if (areAllPeopleSeated) break;
	}

	return myVehicles;
};