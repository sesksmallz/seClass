import { toast } from 'react-toastify';
import K from '../../constants';
import setAuthToken from '../../network/set-auth.token';
import isEmpty from '../../utils/is-empty';

const initialState = {
	authenticated: false,
	user: null,
};

export const AuthActions = {
	SET_USER: 'SET_USER',
};

export function setUser(data) {
	return {
		type: AuthActions.SET_USER,
		payload: data,
	};
}

export function logoutUser(removeCookies) {
	window.localStorage.removeItem(K.SAVED_USER);
	removeCookies(K.ACCESS_TOKEN);
	setAuthToken(null);

	toast.info('Logged out successfully');
	return setUser(null);
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case AuthActions.SET_USER: {
			return {
				...state,
				authenticated: !isEmpty(action.payload),
				user: { ...action.payload },
			};
		}
		default:
			return state;
	}
}
