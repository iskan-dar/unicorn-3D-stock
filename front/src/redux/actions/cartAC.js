import {ADD_TO_CART, DEL_TO_CART, SET_CART_ITEMS} from './action.types';
import axios from 'axios';

export const setCart = (value) => ({ type: ADD_TO_CART, payload: value });

export const addModelToCart = (event, data) => (dispatch) => {
	event.preventDefault();
	axios.post(`http://localhost:4000/cart/new`, data, { withCredentials: true })
		.then((res) => {
			dispatch(setCart(res.data));
			// dispatch(setCartItemsByUser(res.data))
		});
};

export const setCartItemsByUser = (value) => ({ type: SET_CART_ITEMS, payload: value });

export const getCartItemsByUser = (userId) => async (dispatch) => {
	axios.get(`http://localhost:4000/cart/${userId}`)
		.then((res) => {
			dispatch(setCartItemsByUser(res.data))
		})
}

export const deleteCart = (cartList,itemId ) => ({ type: DEL_TO_CART, payload: cartList.filter(elem => elem.id !== itemId) })

export const postDeleteItemCart = (userId, cartList ,itemId) => async (dispatch) => {
    // console.log(userId, itemId)
    axios.post(`http://localhost:4000/cart/${userId}/${itemId}`)
        .then((res) => {
            console.log(res.data);
            // dispatch(setCartItemsByUser(res.data))
			dispatch(deleteCart(cartList, itemId))
        })
}

export const postAddQuantityItem = (userId ,itemId) => async (dispatch) => {
	console.log('postAddQuantityItem')
	axios.post(`http://localhost:4000/cart/${userId}/${itemId}/plus`)
		.then((res) => {
			console.log(res.data);
			dispatch(setCartItemsByUser(res.data))
		})
}

export const postDeleteQuantityItem = (userId ,itemId) => async (dispatch) => {
	console.log('postDeleteQuantityItem')
	axios.post(`http://localhost:4000/cart/${userId}/${itemId}/minus`)
		.then((res) => {
			console.log(res.data);
			dispatch(setCartItemsByUser(res.data))
		})
}

export const postAddOrderCart = (userId, cartList) => async (dispatch) => {
	console.log('postAddOrderCart',userId , cartList)
	axios.post(`http://localhost:4000/cart/${userId}/addOrder`, {cartList} )
		.then((res) => {
			console.log(res.data);
			dispatch(setCartItemsByUser(res.data))
		})
}
