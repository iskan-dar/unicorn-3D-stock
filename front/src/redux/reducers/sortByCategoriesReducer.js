import { SET_CATEG_FR_SSTRG, SET_FOUND_ITEMS, SET_ITEMS, SORT_BY_CATEGORIES } from "../actions/action.types";
import initState from "../initState";


const sortByCategoriesReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SORT_BY_CATEGORIES:
            return payload;

         case SET_FOUND_ITEMS:
            return payload;

        default:
            return state;
    }
}

export default sortByCategoriesReducer;
