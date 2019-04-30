/* eslint-disable no-console */
import { SET_AUTHENTIFICATION, GET_USER, GET_CATEGORIES } from './action-types';
import Axios from 'axios';

const BASE_URL = 'http://localhost:3060';

export function setAuthentification(isLoggedIn) {
	return {
		type: SET_AUTHENTIFICATION,
		payload: isLoggedIn
	};
}

export function signinUser({email, password, remember}, history) {
	return function(dispatch) {
		Axios.post(`${BASE_URL}/signin`, {
			email,
			password
		})
			.then((response) => {
				if (remember) {
					localStorage.setItem('token', response.data.token);
				}
				dispatch(setAuthentification(true));
				dispatch(getUser());
				history.push('/admin');
			}).catch((error) => {
				console.log(error.response.data.message);
			});
	};
}
  
export function signoutUser() {
	return function(dispatch) {
		dispatch(setAuthentification(false));
		localStorage.removeItem('token');
	};
}
  
export function  signupUser({email, password}, history) {
	return function(dispatch) {
		Axios.post(`${BASE_URL}/signup`, {
			email,
			password
		})
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				dispatch(setAuthentification(true));
				history.push('/ressources');
			}).catch((error) => {
				console.log(error);
			});
	};
}

//GET USER
export function getUser() {
	return function(dispatch) {
		Axios.get(`${BASE_URL}/user`, {
			headers: { authorization: localStorage.getItem('token')}
		})
			.then((response) => {
				dispatch({
					type: GET_USER,
					payload: response.data
				});
			}).catch((error) => {
				console.log(error);
			});
	};
}

//CATEGORIES
export function getCategories() {
	return function(dispatch) {
		Axios.get(`${BASE_URL}/categories`)
			.then((response) => {
				dispatch({
					type: GET_CATEGORIES,
					payload: response.data
				});
			}).catch((error) => {
				console.log(error);
			});
	};
}