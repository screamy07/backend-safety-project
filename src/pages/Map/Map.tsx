import { Box } from '@mui/material';
import MapBox from '../../components/Map/MapBox';

// const style: SxProps<Theme> = {
// 	position: 'absolute',
// 	top: '59%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: '100%',
// 	height: '100%',
// 	bgcolor: 'background.paper',
// 	p: 0,
// };

export default function MapPage(): JSX.Element {

	return (
		<Box>
			<MapBox  width='100vw' height='100vh' hasDangerMarkers={true}/>
		</Box>
	);
}