import { SET_CATALOG_ITEMS } from "../actions/action.types";
import initState from "../initState";

const catalogReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_CATALOG_ITEMS:
            return payload;

        default:
            return state;
    }
}

export default catalogReducer;
