import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';

import AuthPage from './pages/auth';
import TasksPage from './pages/tasks';
import K from './constants';
import setAuthToken from './network/set-auth.token';
import { useDispatch } from 'react-redux';
import { setUser } from './store/reducers/auth.reducer';

function App() {
	const [cookies] = useCookies([K.ACCESS_TOKEN]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (cookies[K.ACCESS_TOKEN]) {
			setAuthToken(cookies[K.ACCESS_TOKEN]);
		} else {
			dispatch(setUser(null));
			setAuthToken(null);
		}
	}, []); // eslint-disable-line

	return (
		<>
			<BrowserRouter>
				<Route path="/" exact component={AuthPage} />
				<Route path="/tasks" exact component={TasksPage} />
			</BrowserRouter>
			<ToastContainer />
		</>
	);
}

export default App;
