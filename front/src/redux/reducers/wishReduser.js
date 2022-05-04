import { ADD_WISH, REMOVE_WISH, SET_USER_WISHES } from "../actions/action.types";
import initState from "../initState";

const wishReducer = (state = initState, action) => {
    const {type, payload} = action

    switch (type) {
        case ADD_WISH:
            return [...state, payload];

        case SET_USER_WISHES:
            return payload;

        case REMOVE_WISH:
            return state.filter(el => el.id !== payload);

        default:
            return state;
    }
}

export default wishReducer;
