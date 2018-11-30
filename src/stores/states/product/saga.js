import { call, put, takeLatest, all } from "redux-saga/effects";

import Types from "./";
import API from "../../../utils/api";

function* addProduct(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.ADD_PRODUCT_SUCCESS, response });
}

function* listSup(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.LIST_ALL_SUP_SUCCESS, response });
}

function* listBill(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.SORT_LIST_BILL_SUCCESS, response });
}

function* submitBill(action) { 
  let response = yield call(API.request, action.payload);  
  console.log(action.payload, response);
  yield put({ ...action, type: Types.SUBMIT_BILL_SUCCESS, response });
}

function* editBill(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.EDIT_BILL_SUCCESS, response });
}

function* productPending(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.LIST_PRODUCT_PENDING_SUCCESS, response });
}

function* addPending(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.ADD_PENDING_SUCCESS, response });
}

function* deletePending(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.DELETE_PENDING_SUCCESS, response });
}

function* updateProduct(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.UPDATE_PRODUCT_SUCCESS, response });
}

function* thongkekhachhangtheongay(action) {
  let response = yield call(API.request, action.payload);
  yield put({
    ...action,
    type: Types.THONG_KE_KHACH_HANG_THEO_NGAY_SUCCESS,
    response,
  });
}

function* thongke(action) {
  let response = yield call(API.request, action.payload);
  yield put({
    ...action,
    type: Types.THONG_KE_SUCCESS,
    response,
  });
}

function* adminDeleteProduct(action) {
  let response = yield call(API.request, action.payload);
  yield put({
    ...action,
    type: Types.ADMIN_DELETE_PRODUCT_SUCCESS,
    response,
  });
}

export default function* saga() {
  yield takeLatest(Types.ADMIN_DELETE_PRODUCT, adminDeleteProduct),
    yield all([
      yield takeLatest(
        Types.THONG_KE_KHACH_HANG_THEO_NGAY,
        thongkekhachhangtheongay
      ),
      yield takeLatest(Types.THONG_KE, thongke),
      yield takeLatest(Types.UPDATE_PRODUCT, updateProduct),
      yield takeLatest(Types.ADD_PENDING, addPending),
      yield takeLatest(Types.DELETE_PENDING, deletePending),
      yield takeLatest(Types.LIST_PRODUCT_PENDING, productPending),
      yield takeLatest(Types.EDIT_BILL, editBill),
      yield takeLatest(Types.SUBMIT_BILL, submitBill),
      yield takeLatest(Types.SORT_LIST_BILL, listBill),
      yield takeLatest(Types.ADD_PRODUCT, addProduct),
      yield takeLatest(Types.LIST_ALL_SUP, listSup),
    ]);
}
