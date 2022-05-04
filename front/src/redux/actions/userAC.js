import axios from 'axios';
import $api, { API_URL } from '../../http';
import { SET_USER, SET_ERROR_ON_REG, SET_ERROR_ON_LOGIN } from './action.types';

export const setUser = (value) => ({ type: SET_USER, payload: value });
export const setErrOnReg = (value) => ({ type: SET_ERROR_ON_REG, payload: value });
export const setErrOnLogin = (value) => ({ type: SET_ERROR_ON_LOGIN, payload: value });

// used in a component Registration
export const regUser = (value) => async (dispatch) => {
	try {
		const res = await $api.post('/auth/registration', value);
		console.log(res);
		localStorage.setItem('token', res.data.accessToken);
		dispatch(setUser(res.data.user));
	} catch (err) {
		if (err.response) {
			console.log('err.res.data>>>', err.response.data);
			dispatch(setErrOnReg(err.response.data.message));
		} else if (err.request) {
			console.log('err.request>>>', err.request);
		} else {
			console.log('Error', err.message);
			dispatch(setErrOnReg(err.response.data.message));
		}
		console.log('err.config>>>', err.config);
	}
};

// used in a component Login
export const logInUser = (value) => async (dispatch) => {
	try {
		const res = await $api.post('/auth/login', value);
		console.log(res);
		localStorage.setItem('token', res.data.accessToken);
		dispatch(setUser(res.data.user));
	} catch (err) {
		if (err.response) {
			console.log('err.res.data>>>', err.response.data);
			dispatch(setErrOnLogin(err.response.data.message));
		} else if (err.request) {
			console.log('err.request>>>', err.request);
		} else {
			console.log('Error', err.message);
			dispatch(setErrOnLogin(err.response.data.message));
		}
		console.log('err.config>>>', err.config);
	}
};

// used in App component
export const checkUserAuth = () => async (dispatch) => {
	try {
		const res = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
		localStorage.setItem('token', res.data.accessToken);
		dispatch(setUser(res.data.user));
	} catch (err) {
		console.log('userAC refresh catch err', err);
	}
};

// used in Edit Profile
export const submitEditUser = (userProfile) => async (dispatch) => {
	try {
		const res = await axios.post(`${API_URL}/auth/editprofile`, userProfile, { withCredentials: true });
		dispatch(setUser(res.data.user))
	} catch (err) {
		console.log('User Edit Profile catch ERR', err);
	}
}
