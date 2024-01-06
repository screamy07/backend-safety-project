import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { SxProps, Theme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface IRouteName {
	path: string;
	name: string;
}

export default function Navbar() {
	const currentRoute = useLocation();

	const buttonStyles: SxProps<Theme> = {
		color: 'white',
		':hover': {
			bgcolor: '#363636',
			color: 'white',
		}
	};

	const linkStyles: CSSProperties = {
		textDecoration: 'none', color: 'inherit'
	};

	const routes: IRouteName[] = [{path: '/', name: 'Головна'}, {path: '/map', name: 'Карта'}, {path: '/signup', name:  'Реєстрація'}, {path: '/signin', name: 'Логін'}];

	return (
		<Box sx={{ flexGrow: 1, zIndex:10 }}>
			<AppBar position="static" color={'transparent'} sx={{'.MuiToolbar-root':{
				zIndex: 10, backgroundColor: currentRoute.pathname !== '/home' ? 'black': 'inherit'
			}}} >
				<Toolbar sx={{gap: '5px'}}>
					<IconButton
						size="large"
						edge="start"
						sx={{ mr: 5, ':hover': {
							bgcolor: 'grey'
						} }}
					>
						<Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>
							<TravelExploreIcon />
						</Link>
					</IconButton>
					{/* <Button color="inherit" sx={buttonStyles}>
						<Link to={'/home'} style={{...linkStyles, backgroundColor: currentRoute.pathname === '/home'}}>Home</Link>
					</Button>
					<Button color="inherit" sx={buttonStyles}>
						<Link to={'/map'} style={linkStyles}>Map</Link>
					</Button> */}

					{routes.map((route, index) =>
						<Button key={index} color="inherit" sx={{...buttonStyles,
							marginLeft: route.path === '/signup' ? 'auto' : 'inherit',
							bgcolor: currentRoute.pathname === route.path ? '#808080' : 'inherit',
							color: currentRoute.pathname === route.path ? 'black' : 'white'}}>
							<Link to={route.path} style={linkStyles}>{route.name}</Link>
						</Button>)}

					{/* <Stack direction={'row'} justifyContent={'end'} sx={{flexGrow: 1}}>
						<Button color="inherit" sx={buttonStyles}>
							<Link to={'/signup'} style={linkStyles}>Sign up</Link>
						</Button>
						<Button color="inherit" sx={buttonStyles}>
							<Link to={'/signin'} style={linkStyles}>Sign in</Link>
						</Button>
					</Stack> */}

				</Toolbar>
			</AppBar>
		</Box>
	);
}
