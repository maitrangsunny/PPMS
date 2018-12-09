import Types from "./";
import createReducer from "../";

const INIT_STATE = {
  login: "",
  token: "",
  listProduct: [],
  allProduct: [],
  allCustomer: [],
  listOrder: [],
  detailOrder: [],
  deleteCustomer: [],
  addCustomer: [],
  detailCustomer: [],
  editOrder: [],
  updateOutlet: [],
  listOutlet: [],
  register: [],

  addUser: [],
  detailAdmin: [],
  updateUser: [],
  detailUser: [],
  changePassword: [],

  sendCode: [],
  resetPass: [],
  listUserAdmin: [],
  error: "",
  success: "",
  productAdmin: {},

  flagLogin: true,
  flagRegister: true,
  flagListProduct: true,
  flagDeleteCustomer: true,
  flagSendCode: true,
  flagResetPass: true,
  flagDetailBill: true,
  editType: "",
};

export default createReducer(INIT_STATE, {
  [Types.REQUEST_LOGOUT]: (state, action) => {
    return {
      ...state,
      socialInfo: {},
      userInfo: {},
    };
  },

  [Types.LOGIN]: (state, action) => {
    return {
      ...state,
      login: action.response,
      flagLogin: false,
    };
  },

  [Types.LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      login: action.response,
      token: action.response.access_token,
      error: action.response.error,
    };
  },

  // product all admin
  [Types.GET_ALL_PRODUCT_ADMIN]: (state, action) => {
    return {
      ...state,
      productAdmin: action.response,
    };
  },

  [Types.GET_ALL_PRODUCT_ADMIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      productAdmin: action.response,
    };
  },
  // end

  [Types.REGISTER_SUCCESS]: (state, action) => {
    return {
      ...state,
      register: action.response,
      error: action.response.message,
      success: action.response.message,
      flagRegister: false,
    };
  },

  [Types.GET_ALL_PRODUCT]: (state, action) => {
    return {
      ...state,
      allProduct: action.response,
      flagListProduct: false,
    };
  },

  [Types.GET_ALL_PRODUCT_SUCCESS]: (state, action) => {
    return {
      ...state,
      allProduct: action.response,
    };
  },

  [Types.GET_ALL_CUSTOMER]: (state, action) => {
    return {
      ...state,
      allCustomer: action.response,
    };
  },

  [Types.GET_ALL_CUSTOMER_SUCCESS]: (state, action) => {
    return {
      ...state,
      allCustomer: action.response,
    };
  },

  [Types.GET_LIST_ORDER]: (state, action) => {
    return {
      ...state,
      listOrder: action.response,
    };
  },

  [Types.GET_LIST_ORDER_SUCCESS]: (state, action) => {
    return {
      ...state,
      listOrder: action.response,
    };
  },

  [Types.DETAIL_ORDER]: (state, action) => {
    return {
      ...state,
      detailOrder: action.response,
    };
  },

  [Types.DETAIL_ORDER_SUCCESS]: (state, action) => {
    return {
      ...state,
      detailOrder: action.response,
      editType: action.payload.edit,
      flagDetailBill: false,
    };
  },

  [Types.DELETE_CUSTOMER]: (state, action) => {
    return {
      ...state,
      deleteCustomer: action.response,
    };
  },

  [Types.DELETE_CUSTOMER_SUCCESS]: (state, action) => {
    return {
      ...state,
      deleteCustomer: action.response,
      flagDeleteCustomer: false,
    };
  },

  [Types.ADD_CUSTOMER_SUCCESS]: (state, action) => {
    return {
      ...state,
      addCustomer: action.response,
    };
  },

  [Types.DETAIL_CUSTOMER]: (state, action) => {
    return {
      ...state,
      detailCustomer: action.response,
    };
  },

  [Types.DETAIL_CUSTOMER_SUCCESS]: (state, action) => {
    return {
      ...state,
      detailCustomer: action.response,
    };
  },

  [Types.EDIT_ORDER_SUCCESS]: (state, action) => {
    return {
      ...state,
      editOrder: action.response,
    };
  },

  [Types.UPDATE_OUTLET_SUCCESS]: (state, action) => {
    return {
      ...state,
      updateOutlet: action.response,
    };
  },

  [Types.LIST_OUTLET_SUCCESS]: (state, action) => {
    return {
      ...state,
      listOutlet: action.response,
    };
  },
  [Types.ADD_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      addUser: action.response,
      error: action.response.message,
      success: action.response.message,
    };
  },

  [Types.DETAIL_ADMIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      detailAdmin: action.response,
    };
  },

  [Types.UPDATE_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      updateUser: action.response,
    };
  },

  [Types.DETAIL_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      detailUser: action.response,
    };
  },

  [Types.SEND_CODE_SUCCESS]: (state, action) => {
    return {
      ...state,
      sendCode: action.response,
      success: action.response.message,
      error: action.response.message,
      flagSendCode: false,
    };
  },

  [Types.RESET_PASSWORD_SUCCESS]: (state, action) => {
    return {
      ...state,
      resetPass: action.response,
      success: action.response.message,
      error: action.response.message,
      flagResetPass: false,
    };
  },

  [Types.CHANGE_PASSWORD_ADMIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      changePassword: action.response,
      error: action.response.message,
      success: action.response.message,
    };
  },

  [Types.LIST_USER_ADMIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      listUserAdmin: action.response,
      error: action.response.message,
      success: action.response.message,
    };
  },

  [Types.TOP_TAI_KHOAN_MUA_NHIEU_SUCCESS]: (state, action) => {
    return {
      ...state,
      topMuaNhieu: action.response,
    };
  },

  // Flag

  [Types.SET_FLAG_SET_LIST_PRODUCT]: (state, action) => {
    return {
      ...state,
      flagListProduct: action.payload,
    };
  },

  [Types.SET_FLAG_DELETE_CUSTOMER]: (state, action) => {
    return {
      ...state,
      flagDeleteCustomer: action.payload,
    };
  },

  [Types.SET_FLAG_LOGIN]: (state, action) => {
    return {
      ...state,
      flagLogin: action.payload,
    };
  },

  [Types.SET_FLAG_REGISTER]: (state, action) => {
    return {
      ...state,
      flagRegister: action.payload,
    };
  },

  [Types.SET_FLAG_SENDCODE]: (state, action) => {
    return {
      ...state,
      flagSendCode: action.payload,
    };
  },

  [Types.SET_FLAG_RESET_PASS]: (state, action) => {
    return {
      ...state,
      flagResetPass: action.payload,
    };
  },

  [Types.SET_FLAG_DETAIL_BILL]: (state, action) => {
    return {
      ...state,
      flagDetailBill: action.payload,
    };
  },
});
