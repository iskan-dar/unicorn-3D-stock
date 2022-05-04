import { SET_MODEL } from "./action.types";
import axios from 'axios';

export const setModelData = (data) => ({ type: SET_MODEL, payload: data });

export const setModel = (id) => (dispatch) => {
	axios.get(`http://localhost:4000/items/${id}`)
		.then((res) => {
			dispatch(setModelData(res.data));
		});
};
