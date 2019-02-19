import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_EMPLOYER } from './types';

export const registerEmployer = (employerData, history) => (dispatch) => {
	axios.post('/api/employers/register', employerData).then((res) => history.push('/login')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

export const loginEmployer = (employerData) => (dispatch) => {
	axios
		.post('/api/employers/login', employerData)
		.then((res) => {
			const { token } = res.data;

			localStorage.setItem('jwtToken', token);

			setAuthToken(token);

			const decoded = jwt_decode(token);

			dispatch(setCurrentEmployer(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setCurrentEmployer = (decoded) => {
	return {
		type: SET_CURRENT_EMPLOYER,
		payload: decoded
	};
};

export const logoutEmployer = () => (dispatch) => {
	localStorage.removeItem('jwtToken');

	setAuthToken(false);

	dispatch(setCurrentEmployer({}));
};
