import { combineReducers } from 'redux';
import AuthentificationReducer from './authentification_reducer';
import UserReducer from './user_reducer';

const rootReducer = combineReducers({
	authentification: AuthentificationReducer,
	user: UserReducer
});

export default rootReducer;