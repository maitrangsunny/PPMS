import { delay } from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'

import Types from './';

//function* setTest(action) {
//  yield delay(1000);
//  console.log("saga", action);
//  yield put({ ...action, type: Types.SET_TEST_SUCCESS, });
//}

export default function* saga() {
  //yield takeLatest(Types.SET_TEST, setTest);
}