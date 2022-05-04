import { SET_ERROR_ON_REG } from '../actions/action.types';
import initState from '../initState';

const errorOnRegReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ERROR_ON_REG:
      return payload;

    default:
      return state;
  }
};

export default errorOnRegReducer;
