import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (userData, history) => (dispatch) => {
	axios.post('/api/user/register', userData).then((res) => history.push('/profiles')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/user/login', userData)
		.then((res) => {
			const token = res.data.token;

			localStorage.setItem('jwtToken', token);

			setAuthToken(token);

			const decoded = jwt_decode(token);

			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('jwtToken');

	setAuthToken(false);

	dispatch(setCurrentUser({}));
};
