import axios from 'axios';
import { call, put, takeEvery, delay, takeLatest } from 'redux-saga/effects'
import { API_URL } from '../../http';
import { SEARCH_ITEMS  } from '../actions/action.types'
import { setFoundItems } from '../actions/itemsAC';

const searchItemsReq = async (searchObj) => {
  try {
    const res = await axios.post(`${API_URL}/search/item`, searchObj)
    console.log('searchItemsRes', res );
    return res.data.foundItems;
  } catch (error) {
    console.log(error);
  }
};

function* searchItemsSagaWorker(action) {
  try {
    yield console.log(action.payload);
    const result = yield call(searchItemsReq, action.payload)
    yield put(setFoundItems(result))
  } catch (error) {
    console.log(error);
  }
}


export default function* searchItemsSagaWatcher() {
  yield takeEvery(SEARCH_ITEMS, searchItemsSagaWorker);
}
