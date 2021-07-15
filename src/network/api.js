import axios from 'axios';

let baseURL = '';

const isLocal = process.env.REACT_APP_IS_LOCAL;

if (isLocal) {
	baseURL = 'http://localhost:8000/api';
} else {
	baseURL = 'https://taskly-server.herokuapp.com/api';
}

export default axios.create({
	baseURL,
});
