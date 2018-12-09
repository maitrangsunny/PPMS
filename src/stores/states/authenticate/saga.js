import { call, put, takeLatest, all } from "redux-saga/effects";

import Types from "./";
import API from "../../../utils/api";

function* login(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.LOGIN_SUCCESS, response });
}

function* submit(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.SUBMIT_ORDER_SUCCESS, response });
}

function* allProduct(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.GET_ALL_PRODUCT_SUCCESS, response });
}

function* allCustomer(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.GET_ALL_CUSTOMER_SUCCESS, response });
}

function* listOrder(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.GET_LIST_ORDER_SUCCESS, response });
}

function* detailOrder(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.DETAIL_ORDER_SUCCESS, response });
}

function* deleteCustomer(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.DELETE_CUSTOMER_SUCCESS, response });
}

function* addCustomer(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.ADD_CUSTOMER_SUCCESS, response });
}

function* detailCustomer(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.DETAIL_CUSTOMER_SUCCESS, response });
}

function* editOrder(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.EDIT_ORDER_SUCCESS, response });
}

function* updateOutlet(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.UPDATE_OUTLET_SUCCESS, response });
}

function* listOutlet(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.LIST_OUTLET_SUCCESS, response });
}

function* register(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.REGISTER_SUCCESS, response });
}

function* addUser(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.ADD_USER_SUCCESS, response });
}

function* detailAdmin(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.DETAIL_ADMIN_SUCCESS, response });
}

function* updateUser(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.UPDATE_USER_SUCCESS, response });
}

function* detailUser(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.DETAIL_USER_SUCCESS, response });
}

function* changePassAdmin(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.CHANGE_PASSWORD_ADMIN_SUCCESS, response });
}

function* sendCode(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.SEND_CODE_SUCCESS, response });
}

function* resetPassword(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.RESET_PASSWORD_SUCCESS, response });
}

function* listUserAdmin(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.LIST_USER_ADMIN_SUCCESS, response });
}

function* topTaiKhoanMuaNhieu(action) {
  let response = yield call(API.request, action.payload);
  yield put({
    ...action,
    type: Types.TOP_TAI_KHOAN_MUA_NHIEU_SUCCESS,
    response,
  });
}

function* productAllAdmin(action) {
  let response = yield call(API.request, action.payload);
  yield put({
    ...action,
    type: Types.GET_ALL_PRODUCT_ADMIN_SUCCESS,
    response,
  });
}

export default function* saga() {
  yield all([
    yield takeLatest(Types.GET_ALL_PRODUCT_ADMIN, productAllAdmin),
    yield takeLatest(Types.TOP_TAI_KHOAN_MUA_NHIEU, topTaiKhoanMuaNhieu),
    yield takeLatest(Types.LIST_USER_ADMIN, listUserAdmin),
    yield takeLatest(Types.RESET_PASSWORD, resetPassword),
    yield takeLatest(Types.SEND_CODE, sendCode),
    yield takeLatest(Types.CHANGE_PASSWORD_ADMIN, changePassAdmin),
    yield takeLatest(Types.DETAIL_USER, detailUser),
    yield takeLatest(Types.UPDATE_USER, updateUser),
    yield takeLatest(Types.DETAIL_ADMIN, detailAdmin),
    yield takeLatest(Types.ADD_USER, addUser),
    yield takeLatest(Types.REGISTER, register),
    yield takeLatest(Types.LIST_OUTLET, listOutlet),
    yield takeLatest(Types.UPDATE_OUTLET, updateOutlet),
    yield takeLatest(Types.EDIT_ORDER, editOrder),
    yield takeLatest(Types.DETAIL_CUSTOMER, detailCustomer),
    yield takeLatest(Types.ADD_CUSTOMER, addCustomer),
    yield takeLatest(Types.DELETE_CUSTOMER, deleteCustomer),
    yield takeLatest(Types.DETAIL_ORDER, detailOrder),
    yield takeLatest(Types.GET_LIST_ORDER, listOrder),
    yield takeLatest(Types.GET_ALL_CUSTOMER, allCustomer),
    yield takeLatest(Types.GET_ALL_PRODUCT, allProduct),
    yield takeLatest(Types.SUBMIT_ORDER, submit),
    yield takeLatest(Types.LOGIN, login),
  ]);
}
