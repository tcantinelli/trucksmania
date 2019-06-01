import { GET_USER, DELETE_USER, UPDATE_USER, UPDATE_PROFIL } from '../actions/action-types';

const initialState = {
	email: '',
	account: 'foodtruck',
	validation: false,
	foodtrucks: []
};

export default function UserReducer(state = initialState, action) {
	switch (action.type) {
	case GET_USER:
		return action.payload;
	case DELETE_USER:
		return initialState;
	case UPDATE_USER:
		return action.payload;
	case UPDATE_PROFIL:
		const newUser = state;
		newUser.foodtrucks[0] = action.payload;
		return newUser;
	default:
		return state;
	}
}
