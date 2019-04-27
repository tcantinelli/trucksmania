import { GET_USER } from '../actions/action-types';

const initialState = {
	pseudo: '',
	account: '',
	validation: '',
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
