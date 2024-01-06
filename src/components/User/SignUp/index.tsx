import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/use-fetch.hook';
import MapModal from '../../Map/MapModal';

const theme = createTheme();

export default function SignUp() {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [longitude, setLongitude] = useState<number>(0);
	const [latitude, setLatitude] = useState<number>(0);
	const {executeFetch, response, data, loading, error} = useFetch('http://localhost:3001/auth/signup');
	const navigator = useNavigate();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const result = await executeFetch({method: 'POST', data: {firstName, lastName, email, password, longitude, latitude} });
		localStorage.setItem('access_token', result.access_token);
		navigator('/map');

		console.log(result);
	};

	return (
		<ThemeProvider theme={theme}>
			{loading ? <CircularProgress /> : <Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
            Реєстрація
					</Typography>
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="Ім'я"
									autoFocus
									onChange={(event) => setFirstName(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Прізвище"
									name="lastName"
									autoComplete="family-name"
									onChange={(event) => setLastName(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Емейл"
									name="email"
									autoComplete="email"
									onChange={(event) => setEmail(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Пароль"
									type="password"
									id="password"
									autoComplete="new-password"
									onChange={(event) => setPassword(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<MapModal setLongitude={setLongitude} setLatitude={setLatitude}/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
              Реєстрація
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
                  Логін
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>}

		</ThemeProvider>
	);
}