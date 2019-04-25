/* eslint-disable no-console */
import { SET_AUTHENTIFICATION } from "./action-types";
import Axios from "axios";

const BASE_URL = "http://localhost:3060";

export function setAuthentification (isLoggedIn) {
	return {
		type: SET_AUTHENTIFICATION,
		payload: isLoggedIn
	};
}

export function signinUser ({email, password, remember}, history) {
	return function (dispatch) {
		Axios.post(`${BASE_URL}/signin`, {
			email,
			password
		})
			.then((response) => {
				if (remember) {
					localStorage.setItem("token", response.data.token);
				}
				dispatch(setAuthentification(true));
				history.push("/admin");
			}).catch((error) => {
				console.log(error.response.data.message);
			});
	};
}
  
export function signoutUser () {
	return function (dispatch) {
		dispatch(setAuthentification(false));
		localStorage.removeItem("token");
	};
}
  
export function  signupUser ({email, password}, history) {
	return function (dispatch) {
		Axios.post(`${BASE_URL}/signup`, {
			email,
			password
		})
			.then((response) => {
				localStorage.setItem("token", response.data.token);
				dispatch(setAuthentification(true));
				history.push("/ressources");
			}).catch((error) => {
				console.log(error);
			});
	};
}