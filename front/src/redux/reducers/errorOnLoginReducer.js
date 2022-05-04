import { SET_ERROR_ON_LOGIN } from '../actions/action.types';
import initState from '../initState';

const errorOnLoginReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ERROR_ON_LOGIN:
      return payload;

    default:
      return state;
  }
};

export default errorOnLoginReducer;
