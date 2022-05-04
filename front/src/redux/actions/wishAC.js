import axios from "axios";
import { ADD_WISH, REMOVE_WISH, SET_USER_WISHES } from "./action.types";

export const setUserWishes = (value) => ({ type: SET_USER_WISHES, payload: value });

export const getUserWishes = (userId) => async (dispatch) => {
    axios.get(`http://localhost:4000/wishlist/${userId}`)
    .then((res) => {
        dispatch(setUserWishes(res.data));
    })
}

export const  addWish = (value) => ({ type: ADD_WISH, payload: value})

export const saveWish = (userId, itemId) => async (dispatch) => {
    axios.post(`http://localhost:4000/wishlist/${userId}/new`, { itemId }, { withCredentials: true })
    .then((res) => {
        dispatch(addWish(res.data))
    })
}

export const removeWish = (wishId) => ({ type: REMOVE_WISH, payload: wishId })

export const deleteWish = (wishId) => async (dispatch) => {
    axios.post(`http://localhost:4000/wishlist/delete`, { wishId } )
    .then((res) => {
        if (res.status === 200) {
            dispatch(removeWish(wishId))

        }
    })
}
