import { FIRST_CATEG, SUB_CATEG } from "../actions/action.types";
import initState from "../initState";


const categsReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FIRST_CATEG:
            return  { category: payload } ;

        case SUB_CATEG:
            return { ...state, subCategory: payload };

        default:
            return state;
    }
}

export default categsReducer;
