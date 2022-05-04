import { all } from 'redux-saga/effects';
import searchItemsSagaWatcher from './searchItemsSaga';


export default function* rootSaga() {
  yield all([
    searchItemsSagaWatcher(),
  ]);
}
