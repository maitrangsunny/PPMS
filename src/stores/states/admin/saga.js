import { call, put, takeLatest, all } from "redux-saga/effects";

import Types from "./";
import API from "../../../utils/api";

function* listCustomerAdmin(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.LIST_CUSTOMER_ADMIN_SUCCESS, response });
}

function* detailProductAdmin(action) {
  let response = yield call(API.request, action.payload);
  yield put({
    ...action,
    type: Types.DETAIL_PRODUCT_CUSTOMER_SUCCESS,
    response,
  });
}

function* deleteProductAdmin(action) {
  let response = yield call(API.request, action.payload);
  yield put({
    ...action,
    type: Types.DELETE_PRODUCT_CUSTOMER_SUCCESS,
    response,
  });
}

export default function* saga() {
  yield all([
    yield takeLatest(Types.LIST_CUSTOMER_ADMIN, listCustomerAdmin),
    yield takeLatest(Types.DETAIL_PRODUCT_CUSTOMER, detailProductAdmin),
    yield takeLatest(Types.DELETE_PRODUCT_CUSTOMER, deleteProductAdmin),
  ]);
}
