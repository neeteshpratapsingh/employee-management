import { SET_CURRENT_EMPLOYER } from '../employerActions/types';

const initialState = {
	isAuthenticated: false,
	employer: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_EMPLOYER:
			return {
				...state,
				employer: action.payload
			};
		default:
			return state;
	}
}
