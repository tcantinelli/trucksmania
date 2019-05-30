/* eslint-disable no-console */
import { SET_AUTHENTIFICATION, GET_ORDERS, GET_USER, UPDATE_USER, GET_CATEGORIES, UPDATE_PROFIL, SHOW_POPMESSAGE } from './action-types';
import Axios from 'axios';
import FormData from 'form-data';
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

// GET ORDERS
export function getOrders(idFT) {
	return function(dispatch) {
		Axios.get(`${BASE_URL}/ordersft/${idFT}`)
			.then((response) => {
				console.log(response.data);
				dispatch({
					type: GET_ORDERS,
					payload: response.data
				});
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
				dispatch(getOrders(response.data.foodtrucks[0]._id));
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
	return {
		type: UPDATE_USER,
		payload: user
	};
}

//UPDATE FOODTRUCK PROFIL
export function updateProfil(formValues) {
	return function(dispatch) {
		const datas = new FormData();
		//ID FoodTruck
		datas.append('idFT', formValues.idFT);
		//Ajout name et category
		datas.append('name', formValues.name);
		datas.append('category', formValues.category);
		//Ajout logo
		datas.append('logo', formValues.logo);

		//Ajout images
		const imageDatas = new FormData();
		imageDatas.append('idFT', formValues.idFT);
		formValues.images.map(image => imageDatas.append('image', image));

		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};

		Axios.post(`${BASE_URL}/upprofil`, datas, config)
			.then(() => {
				Axios.post(`${BASE_URL}/upimages`, imageDatas, config)
					.then((response) => {
						dispatch(setPopMessage(true, 'Success', 'Informations mises à jour'));
						dispatch({
							type: UPDATE_PROFIL,
							payload: response.data
						});
						setTimeout(() => {
							dispatch(setPopMessage(false, null, null));	
						}, 2500);
					}).catch(() => {
						dispatch(setPopMessage(true, 'Error', 'Erreur de mise à jour'));
					});
			}).catch(() => {
				dispatch(setPopMessage(true, 'Error', 'Erreur de mise à jour'));
			});
	};
}

//DELETE IMAGE FT
export function deleteImageFoodTruck(datas) {
	return function(dispatch) {
		Axios.post(`${BASE_URL}/delimage`, datas)
			.then((response) => {
				dispatch({
					type: UPDATE_PROFIL,
					payload: response.data
				});
				dispatch(setPopMessage(true, 'Success', 'Image supprimée'));
				setTimeout(() => {
					dispatch(setPopMessage(false, null, null));	
				}, 2500);
			}).catch(() => {
				dispatch(setPopMessage(true, 'Error', 'Erreur suppression image'));
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

//POPMESSAGE
export function setPopMessage(toShow, degree, message) {
	if (toShow) {
		return {
			type: SHOW_POPMESSAGE,
			payload: {
				toShow: true,
				degree,
				message
			}
		};
	}
	return {
		type: SHOW_POPMESSAGE,
		payload: {
			toShow: false,
			degree: '',
			message: ''
		}
	};
}

//ADD ARTICLE
export function addArticle(formValues) {
	return function(dispatch) {
		const datas = new FormData();
		//ID FoodTruck
		datas.append('idFT', formValues.idFT);
		//Ajout value, price et description
		datas.append('value', formValues.value);
		datas.append('price', formValues.price);
		datas.append('description', formValues.description);
		//Ajout logo
		datas.append('article', formValues.image);

		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};

		Axios.post(`${BASE_URL}/article`, datas, config)
			.then((response) => {
				dispatch(setPopMessage(true, 'Success', 'Article ajouté'));
				dispatch({
					type: UPDATE_PROFIL,
					payload: response.data
				});
				setTimeout(() => {
					dispatch(setPopMessage(false, null, null));	
				}, 2500);
			}).catch(() => {
				dispatch(setPopMessage(true, 'Error', 'Erreur lors de la création'));
			});
	};
}

//UPDATE ARTICLE
export function updateArticle(formValues) {
	return function(dispatch) {
		const datas = new FormData();
		datas.append('idFT', formValues.idFT);
		datas.append('idArticle', formValues.idArticle);
		datas.append('oldImageID', formValues.oldImageID);
		datas.append('value', formValues.value);
		datas.append('price', formValues.price);
		datas.append('description', formValues.description);
		//Ajout logo
		datas.append('article', formValues.image);

		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};

		Axios.post(`${BASE_URL}/uparticle`, datas, config)
			.then((response) => {
				dispatch(setPopMessage(true, 'Success', 'Article modifié'));
				dispatch({
					type: UPDATE_PROFIL,
					payload: response.data
				});
				setTimeout(() => {
					dispatch(setPopMessage(false, null, null));	
				}, 2500);
			}).catch(() => {
				dispatch(setPopMessage(true, 'Error', 'Erreur lors de la mise à jour'));
			});
	};
}

//DELETE ARTICLE FT
export function deleteArticleFoodTruck(datas) {
	return function(dispatch) {
		Axios.post(`${BASE_URL}/delarticle`, datas)
			.then((response) => {
				dispatch({
					type: UPDATE_PROFIL,
					payload: response.data
				});
				dispatch(setPopMessage(true, 'Success', 'Article supprimé'));
				setTimeout(() => {
					dispatch(setPopMessage(false, null, null));	
				}, 2500);
			}).catch(() => {
				dispatch(setPopMessage(true, 'Error', 'Erreur suppression article'));
			});
	};
}

//ADD PLACE
export function addPlace(datas) {
	return function(dispatch) {
		Axios.post(`${BASE_URL}/place`, datas)
			.then((response) => {
				dispatch(setPopMessage(true, 'Success', 'Emplacement ajouté'));
				dispatch({
					type: UPDATE_PROFIL,
					payload: response.data
				});
				setTimeout(() => {
					dispatch(setPopMessage(false, null, null));	
				}, 2500);
			}).catch(() => {
				dispatch(setPopMessage(true, 'Error', 'Erreur lors de la création'));
			});
	};
}

//UPDATE PLACE
export function updatePlace(datas) {
	return function(dispatch) {
		Axios.post(`${BASE_URL}/upplace`, datas)
			.then((response) => {
				dispatch(setPopMessage(true, 'Success', 'Emplacement modifié'));
				dispatch({
					type: UPDATE_PROFIL,
					payload: response.data
				});
				setTimeout(() => {
					dispatch(setPopMessage(false, null, null));	
				}, 2500);
			}).catch(() => {
				dispatch(setPopMessage(true, 'Error', 'Erreur lors de la mise à jour'));
			});
	};
}

//DELETE PLACE
export function deletePlace(datas) {
	return function(dispatch) {
		Axios.post(`${BASE_URL}/delplace`, datas)
			.then((response) => {
				dispatch({
					type: UPDATE_PROFIL,
					payload: response.data
				});
				dispatch(setPopMessage(true, 'Success', 'Emplacement supprimé'));
				setTimeout(() => {
					dispatch(setPopMessage(false, null, null));	
				}, 2500);
			}).catch(() => {
				dispatch(setPopMessage(true, 'Error', 'Erreur suppression emplacement'));
			});
	};
}