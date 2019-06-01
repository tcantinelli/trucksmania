import { SHOW_POPMESSAGE } from '../actions/action-types';

const initialState = {
	toShow: false,
	degree: '',
	message: ''
};

export default function PopMessageReducer(state = initialState, action) {
	switch (action.type) {
	case SHOW_POPMESSAGE:
		return action.payload;
	default:
		return state;
	}
}
