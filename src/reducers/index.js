import { combineReducers } from "redux";
import AuthentificationReducer from "./authentification_reducer";

const rootReducer = combineReducers({
	authentification: AuthentificationReducer
});

export default rootReducer;