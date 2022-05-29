import initState from "../initState";
import {LOAD_STL, DEL_STL} from "../actions/action.types";

const loadStlReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_STL:
            return payload;

        case DEL_STL:
            return null;

        default:
            return state;
    }
}

export  default loadStlReducer;