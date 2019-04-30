import { GET_USER } from '../actions/action-types';

const initialState = {
	pseudo: '',
	account: 'foodtruck',
	validation: false,
	foodtrucks: []
};

export default function UserReducer(state = initialState, action) {
	switch (action.type) {
	case GET_USER:
		return action.payload;
	default:
		return state;
	}
}
