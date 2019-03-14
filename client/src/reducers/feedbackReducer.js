import { ADD_FEEDBACK, GET_FEEDBACKS, GET_FEEDBACK, DELETE_FEEDBACK, FEEDBACK_LOADING } from '../actions/types';

const initialState = {
	posts: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FEEDBACK_LOADING:
			return {
				...state,
				loading: true
			};

		case GET_FEEDBACKS:
			return {
				...state,
				feedbacks: action.payload,
				loading: false
			};
		case GET_FEEDBACK:
			return {
				...state,
				feedbacks: action.payload,
				loading: false
			};
		case ADD_FEEDBACK:
			return {
				...state,
				feedbacks: [ action.payload, ...state.feedbacks ]
			};
		case DELETE_FEEDBACK:
			return {
				...state,
				feedbacks: state.feedbacks.filter((feedback) => feedback._id !== action.payload)
			};
		default:
			return state;
	}
}
