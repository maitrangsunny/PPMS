import Types from "./";
import createReducer from "../";

const INIT_STATE = {
  listCustomerAdmin: false,
  detailCustomerAdmin: false,
  deleteCustomerAdmin: false,

  flagProductCustomer: true,
  flagDeleteProduct: true,
};

export default createReducer(INIT_STATE, {
  [Types.LIST_CUSTOMER_ADMIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      listCustomerAdmin: action.response,
    };
  },

  [Types.DETAIL_PRODUCT_CUSTOMER_SUCCESS]: (state, action) => {
    return {
      ...state,
      detailCustomerAdmin: action.response,
      flagProductCustomer: false,
    };
  },

  [Types.DELETE_PRODUCT_CUSTOMER_SUCCESS]: (state, action) => {
    return {
      ...state,
      deleteCustomerAdmin: action.response,
      flagDeleteProduct: false,
    };
  },

  [Types.SET_FLAG_PRODUCT_CUSTOMER]: (state, action) => {
    return {
      ...state,
      flagProductCustomer: action.payload,
    };
  },

  [Types.SET_FLAG_DELETE_PRODUCT]: (state, action) => {
    return {
      ...state,
      flagDeleteProduct: action.payload,
    };
  },
});
