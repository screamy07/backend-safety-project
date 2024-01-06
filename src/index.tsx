import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignIn from './components/User/SignIn';
import SignUp from './components/User/SignUp';
import './index.css';
import ErrorPage from './pages/Error/Error';
import HomePage from './pages/Home/Home';
import MapPage from './pages/Map/Map';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				path: '/',
				element: <HomePage/>
			},
			{
				path: 'map',
				element: <MapPage/>
			},
			{
				path: 'signup',
				element: <SignUp/>
			},
			{
				path: 'signin',
				element: <SignIn/>
			}
		]
	},
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

	<RouterProvider router={router} />

);
