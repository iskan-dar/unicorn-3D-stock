import { combineReducers } from 'redux';
import errorOnLoginReducer from './errorOnLoginReducer';
import errorOnRegReducer from './errorOnRegReducer';
import userReducer from './userReducer';
import sortByCategoriesReducer from './sortByCategoriesReducer';
import cartReducer from './cartReducer';
import modelOrderReducer from './modelOrderReducer';
import catalogReducer from './catalogReducer';
import wishReducer from './wishReduser';
import makerOrdersReducer from "./makerOrdersReducer";
import categsReducer from './categsReducer';
import loadStlReducer from './loadStlReducer';

const rootReducer = combineReducers({
	user: userReducer,
	errorOnReg: errorOnRegReducer,
	errorOnLogin: errorOnLoginReducer,
	sortedByCategories: sortByCategoriesReducer,
	cart: cartReducer,
	model: modelOrderReducer,
	catalogItems: catalogReducer,
    wishes: wishReducer,
	makerOrders: makerOrdersReducer,
    categs: categsReducer,
	stl: loadStlReducer,

});

export default rootReducer;
