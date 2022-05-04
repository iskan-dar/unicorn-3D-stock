import { SET_USER, EDIT_USER } from '../actions/action.types';
import initState from '../initState';

const userReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return payload;
    case EDIT_USER:
      return {...state, ...payload};
    default:
      return state;
  }
};

export default userReducer;
