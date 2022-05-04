import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import initState from './initState';
import rootReducer from './reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk)),
);

sagaMiddleware.run(rootSaga);

export default store;
