import { SET_MODEL } from '../actions/action.types';
import initState from '../initState'

const modelOrderReducer = (state = initState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_MODEL:
			return payload;

		default:
			return state;
	}
}

export default modelOrderReducer;
