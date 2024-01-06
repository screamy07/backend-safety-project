import { Link, Modal, SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MouseEventHandler, useEffect, useState } from 'react';
import MapBox from '../MapBox';

const style: SxProps<Theme> = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	height: '50%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 0,
};

interface Props {
	setLongitude: React.Dispatch<React.SetStateAction<number>>,
	setLatitude: React.Dispatch<React.SetStateAction<number>>
}

export default function MapModal({setLongitude, setLatitude}: Props) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			setLongitude(pos.coords.longitude);
			setLatitude(pos.coords.latitude);
		});
	}, []);

	const handleOpen: MouseEventHandler = (event)  => {
		event.preventDefault();
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	return (
		<>
			<Typography component="h5" variant="h6">
				Я хочу використати мою поточну локацію, в іншому випадку <Link component={'button'} onClick={handleOpen}>вибрати іншу локацію</Link>
			</Typography>

			<Modal
				open={open}
				onClose={handleClose}
				aria-describedby="modal-map"
			>
				<Box sx={style} id='modal-map'>
					<MapBox setLongitude={setLongitude} setLatitude={setLatitude} hasDangerMarkers={false} width='50vw' height='50vh'/>
				</Box>
			</Modal>
		</>
	);
}
