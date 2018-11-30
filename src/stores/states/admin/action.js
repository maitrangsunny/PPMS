import Types from "./";
import Configs from "../../../config";

export function listCustomerAdmin(token) {
  return {
    type: Types.LIST_CUSTOMER_ADMIN,
    payload: {
      api: Configs.API + "admin/list-outlet",
      token: token,
      method: "GET",
      payload: {},
    },
  };
}

export function detailProductCustomer(token, id, keyword = "") {
  return {
    type: Types.DETAIL_PRODUCT_CUSTOMER,
    payload: {
      api: Configs.API + `admin/outlet/${id}`,
      token: token,
      method: "POST",
      payload: {
        keyword,
      },
    },
  };
}

export function deleteProductCustomer(token, id, ids, keyword = "") {
  return {
    type: Types.DELETE_PRODUCT_CUSTOMER,
    payload: {
      api: Configs.API + `admin/outlet/deleteProduct/${id}`,
      token: token,
      method: "POST",
      payload: {
        ids,
        keyword,
      },
    },
  };
}

export function setFlagProductCustomer(bool = true) {
  return {
    type: Types.SET_FLAG_PRODUCT_CUSTOMER,
    payload: bool,
  };
}

export function setFlagDeleteProduct(bool = true) {
  return {
    type: Types.SET_FLAG_DELETE_PRODUCT,
    payload: bool,
  };
}
