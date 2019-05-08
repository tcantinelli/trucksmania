/* eslint-disable no-console */
import { SET_AUTHENTIFICATION, GET_USER, UPDATE_USER, GET_CATEGORIES } from './action-types';
import Axios from 'axios';
import { BASE_URL } from '../helpers/url';

export function setAuthentification(isLoggedIn) {
	return {
		type: SET_AUTHENTIFICATION,
		payload: isLoggedIn
	};
}

export function signinUser({email, password}, history) {
	return function(dispatch) {
		Axios.post(`${BASE_URL}/signin`, {
			email,
			password
		})
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				dispatch(setAuthentification(true));
				dispatch(getUser());
				history.replace('/');
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
  
export function signupUser(formValues, history) {
	console.log(formValues);
	return function(dispatch) {
		Axios.post(`${BASE_URL}/signup`, formValues)
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				dispatch(setAuthentification(true));
				history.push('/admin');
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

//UPDATE USER
export function updateUser(user) {
	console.log(user);
	return {
		type: UPDATE_USER,
		payload: user
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