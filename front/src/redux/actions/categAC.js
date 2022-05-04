import { FIRST_CATEG, SUB_CATEG } from "./action.types";

// used in categReducer
export const setFirstCateg = value => ({ type: FIRST_CATEG, payload: value});
export const setSubCateg = value => ({ type: SUB_CATEG, payload: value});
