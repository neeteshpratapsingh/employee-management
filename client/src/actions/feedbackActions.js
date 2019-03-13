import axios from 'axios';

import {
	ADD_FEEDBACK,
	GET_ERRORS,
	CLEAR_ERRORS,
	GET_FEEDBACKS,
	GET_FEEDBACK,
	FEEDBACK_LOADING,
	DELETE_FEEDBACK
} from './types';

export const addFeedback = (feedbackData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post('/api/feedback', feedbackData)
		.then((res) =>
			dispatch({
				type: ADD_FEEDBACK,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const GET_FEEDBACKS = () => (dispatch) => {
	dispatch(setFeedbackLoading());
	axios
		.get('/api/feedback')
		.then((res) =>
			dispatch({
				type: GET_FEEDBACKS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_FEEDBACKS,
				payload: null
			})
		);
};

export const getFeedback = (id) => (dispatch) => {
	dispatch(setFeedbackLoading());
	axios
		.get(`/api/feedback/${id}`)
		.then((res) =>
			dispatch({
				type: GET_FEEDBACK,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_FEEDBACK,
				payload: null
			})
		);
};

export const deleteFeedback = (id) => (dispatch) => {
	axios
		.delete(`/api/Feedback/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_FEEDBACK,
				payload: id
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setFeedbackLoading = () => {
	return {
		type: FEEDBACK_LOADING
	};
};

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
