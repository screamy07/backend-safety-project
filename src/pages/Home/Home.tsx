import { Box, Typography } from '@mui/material';
import changedUserLocationImage from '../../assets/changed-location-example.png';
import currentUserLocationImage from '../../assets/current-location-example.png';
import dangerZonesExampleImage from '../../assets/danger-zones.png';
import backgroundMapImage from '../../assets/map-background.jpg';

export default function HomePage(): JSX.Element {

	return (
		<Box>
			<Box sx={{position: 'relative'}}>
				<img src={backgroundMapImage} style={{width: '100vw', position: 'absolute', top: '-80px'}} />
				<Box sx={{position: 'absolute', zIndex: 100, left: '50%', top: '80%', marginTop: '100px', transform: 'translate(-50%, -50%)'}}>
					<Typography variant='h4' style={{color: 'white', textAlign: 'center'}}>Your safety matters - avoid danger zones and enjoy peace of mind</Typography>
					<Box>
						<img src={dangerZonesExampleImage} style={{width: '40vw', height: '40vh', position: 'absolute', top: '150px', left: '-300px'}}/>
						<Typography style={{width: '35vw', height: '15vh', color: 'white', fontSize: 32, position: 'absolute', top: '150px', right: '-175px'}}>
							All danger possible in one place!
							Keep tracking all possible threatens for your life to avoid it as soon as possible!
						</Typography>
					</Box>
					<Box>
						<Typography style={{width: '35vw', height: '55vh', color: 'white', fontSize: 32, position: 'absolute', top: '550px', left: '-275px'}}>
							Just drag your cursor to move current position and receive danger zones info according to new location!
						</Typography>
						<img src={currentUserLocationImage} style={{width: '26vw', height: '26vh', position: 'absolute', top: '443px', right: '-100px'}}/>
						<img src={changedUserLocationImage} style={{width: '26vw', height: '26vh', position: 'absolute', top: '630px', right: '-100px'}}/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}