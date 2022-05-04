import initState from "../initState";
import {SET_ORDERS_MAKER} from "../actions/action.types";

const makerOrdersReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_ORDERS_MAKER:
            return payload;
        default:
            return state;
    }
}

export  default makerOrdersReducer;
