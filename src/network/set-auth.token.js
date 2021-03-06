import API from './api';

export default function setAuthToken(token) {
	if (token) {
		// apply token to every request
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		// delete auth header
		delete API.defaults.headers.common['Authorization'];
	}
}
