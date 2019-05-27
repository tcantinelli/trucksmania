import { GET_ORDERS } from '../actions/action-types';

const initialState = {
	date: '',
	client: null,
	elements: null,
	grade: 0,
	comment: ''
};

export default function OrdersReducer(state = initialState, action) {
	switch (action.type) {
	case GET_ORDERS:
		return action.payload;
	default:
		return state;
	}
}
