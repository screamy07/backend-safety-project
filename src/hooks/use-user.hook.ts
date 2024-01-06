import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../components/Map/MapBox/user.interface';
import useFetch from './use-fetch.hook';

export function useUser() {
	const [user, setUser] = useState<IUser | null>(null);
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	// const [loading, setLoading] = useState<boolean>(false);
	// const [error, setError] = useState<Error | undefined>(undefined);
	const navigate = useNavigate();
	const { executeFetch, data, response, loading, error } = useFetch('http://localhost:3001/user');

	useEffect(() => {
		async function getUserDetails() {
			const accessToken = localStorage.getItem('access_token');

			const result = await executeFetch({ headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } });
			console.log(result);
			setUser(result);

			if (response?.status === StatusCodes.UNAUTHORIZED) {
				navigate('/signin');
				return;
			}

			setUser(data);
			setAuthenticated(true);
		}

		getUserDetails();
	}, []);

	return { user, authenticated, loading, error };
}