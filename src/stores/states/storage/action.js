import Types from "./";

export function removeAccessToken() {
  return {
    type: Types.REMOVE_TOKEN,
    storage: {
      method: "remove",
      payload: "token",
    },
  };
}

export function getAccessToken() {
  return {
    type: Types.GET_TOKEN,
    storage: {
      method: "get",
      payload: "token",
    },
  };
}

export function setAccessToken(token) {
  return {
    type: Types.SET_TOKEN,
    storage: {
      method: "set",
      payload: {
        token,
      },
    },
  };
}

export function setListBill(bill) {
  return {
    type: Types.SET_DATA,
    storage: {
      key: "SAVE_DATA",
      method: "setObject",
      payload: {
        bill,
      },
    },
  };
}

export function getListBill() {
  return {
    type: Types.GET_DATA,
    storage: {
      key: "SAVE_DATA",
      method: "getObject",
      payload: "bill",
    },
  };
}

export function clearListBill() {
  return {
    type: Types.REMOVE_LIST_DATA,
    storage: {
      key: "SAVE_DATA",
      method: "remove",
      payload: "bill",
    },
  };
}

// list all product
export function setListProduct(data) {
  return {
    type: Types.SET_LIST_ALL_PRODUCT,
    storage: {
      key: "LIST_ALL_PRODUCT",
      method: "setArray",
      payload: {
        data,
      },
    },
  };
}

export function getListProduct() {
  return {
    type: Types.GET_LIST_ALL_PRODUCT,
    storage: {
      key: "LIST_ALL_PRODUCT",
      method: "getArray",
      payload: "data",
    },
  };
}

export function setUser(data) {
  return {
    type: Types.SET_USER,
    storage: {
      key: "USER",
      method: "setObject",
      payload: {
        data,
      },
    },
  };
}

export function getUser() {
  return {
    type: Types.GET_USER,
    storage: {
      key: "USER",
      method: "getObject",
      payload: "data",
    },
  };
}

export function removeUser() {
  return {
    type: Types.REMOVE_USER,
    storage: {
      key: "USER",
      method: "remove",
      payload: "data",
    },
  };
}
