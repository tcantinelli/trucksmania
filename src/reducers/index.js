import { combineReducers } from 'redux';
import AuthentificationReducer from './authentification_reducer';
import UserReducer from './user_reducer';
import CategoriesReducer from './categories_reducer';
import PopMessageReducer from './popmessage_reducer';
import OrdersReducer from './orders_reducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
	form,
	authentification: AuthentificationReducer,
	user: UserReducer,
	categories: CategoriesReducer,
	popMessage: PopMessageReducer,
	orders: OrdersReducer
});

export default rootReducer;