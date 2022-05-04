import axios from "axios";
import { API_URL } from "../../http";
import { SEARCH_ITEMS, SET_FOUND_ITEMS, SET_ITEMS } from "./action.types";

// NOTE: TODO // move to sortAC as action types are used in sortByCategoryReducer
export const searchItems = (value) => ({ type: SEARCH_ITEMS, payload: value})

export const setItems = (value) => ({ type: SET_ITEMS, payload: value})
export const setFoundItems = (value) => ({ type: SET_FOUND_ITEMS, payload: value})

// used in component ???MainPage
export const getItems = () => async (dispatch) => {
    axios.get(`${API_URL}/search`)
    .then((res) => {
        console.log(res.data);
        dispatch(setItems(res.data.allItems))
    }).catch((error) => console.log(error));
}
