import axios, { AxiosError, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { useCallback, useState } from 'react';

export interface IUseFetch {
	url?: string,
	method?: string,
	data?: Record<string, any>,
	headers?: RawAxiosRequestHeaders,
	params?: Record<string, any>
}

export default function useFetch(url: string) {

	const [data, setData] = useState(null);
	const [response, setResponse] = useState<AxiosResponse>();
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const executeFetch = useCallback(async (config: IUseFetch) => {
		try {
			setLoading(true);
			const response = await axios.request({
				url: config.url ? config.url : url, method: config.method ?? 'GET', data: config.data,
				headers: config.headers ?? { 'Content-Type': 'application/json' }, params: config.params
			});

			setResponse(response);
			setData(response.data);
			return response.data;
		} catch (error) {
			setError(error as Error);
			throw new Response('', { status: (error as AxiosError).response?.status, statusText: (error as AxiosError).response?.statusText });
		} finally {
			setLoading(false);
		}
	}, [url, setLoading, setError, setData, setResponse]);

	return { executeFetch, data, response, error, loading };

	// useEffect(() => {
	// 	(
	// 		async function () {
	// 			try {
	// 				setLoading(true);
	// 				const response = await axios.request({ url: config.url, method: config.method ?? 'GET', data: config.data, headers: config.headers ?? { 'Content-Type': 'application/json' }, params: config.params });
	// 				setData(response.data);
	// 				setResponse(response);
	// 			} catch (err) {
	// 				setError(err as Error);
	// 			} finally {
	// 				setLoading(false);
	// 			}
	// 		}
	// 	)();
	// }, [config.url]);

}