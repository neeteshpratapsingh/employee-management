import { GET_LEAVE, GET_LEAVES, LEAVE_LOADING, CLEAR_CURRENT_LEAVE } from '../actions/types';

const initialState = {
	leave: null,
	leaves: null,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LEAVE_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_LEAVE:
			return {
				...state,
				leave: action.payload,
				loading: false
			};
		case GET_LEAVES:
			return {
				...state,
				leaves: action.payload,
				loading: false
			};
		case CLEAR_CURRENT_LEAVE:
			return {
				...state,
				leave: null
			};
		default:
			return state;
	}
}
