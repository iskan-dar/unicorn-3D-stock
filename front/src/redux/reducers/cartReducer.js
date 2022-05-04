import {ADD_TO_CART, DEL_TO_CART, SET_CART_ITEMS} from '../actions/action.types';
import initState from '../initState'

const cartReducer = (state = initState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ADD_TO_CART:
			return [...state, payload];

        case SET_CART_ITEMS:
            return payload;

		case DEL_TO_CART:
			return payload;

		default:
			return state;
	}
}

export default cartReducer;

