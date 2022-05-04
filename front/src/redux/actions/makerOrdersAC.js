import axios from "axios";
import {SET_ORDERS_MAKER} from "./action.types";

export const setOrderMakers = (value) => ({ type: SET_ORDERS_MAKER, payload: value });

export const getOrdersMaker = (userId) => async (dispatch) => {
    axios.get(`http://localhost:4000/ordersMaker`)
    .then((res) => {
    	dispatch(setOrderMakers(res.data))
    })
}