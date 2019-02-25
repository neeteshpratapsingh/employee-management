import axios from 'axios';

import { GET_LEAVE, GET_LEAVES, LEAVE_LOADING, CLEAR_CURRENT_LEAVE, GET_ERRORS, SET_CURRENT_USER } from './types';

export const getCurrentLeave = () => (dispatch) => {
	dispatch(setLeaveLoading());
	axios
		.get('/api/leave/current')
		.then((res) =>
			dispatch({
				type: GET_LEAVE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_LEAVE,
				payload: {}
			})
		);
};

export const getLeaveByHandle = (id) => (dispatch) => {
	dispatch(setLeaveLoading());
	axios
		.get(`/api/leave/id/${id}`)
		.then((res) =>
			dispatch({
				type: GET_LEAVE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_LEAVE,
				payload: null
			})
		);
};

export const createLeave = (leaveData, history) => (dispatch) => {
	axios.post(`/api/leave/id/${leaveData.user}`, leaveData).then((res) => history.push('/leaves')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

export const getLeaves = () => (dispatch) => {
	dispatch(setLeaveLoading());
	axios
		.get('/api/leave/all')
		.then((res) =>
			dispatch({
				type: GET_LEAVES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_LEAVES,
				payload: null
			})
		);
};

export const deleteAccount = () => (dispatch) => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		axios
			.delete('/api/leave')
			.then((res) =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

export const setLeaveLoading = () => {
	return {
		type: LEAVE_LOADING
	};
};

export const clearCurrentLeave = () => {
	return {
		type: CLEAR_CURRENT_LEAVE
	};
};
