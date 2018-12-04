import Types from "./";
import createReducer from "../";

const INIT_STATE = {
  addProduct: [],
  listSup: [],
  listBill: [],
  shortBill: true,
  submitBill: [],
  editBill: [],
  error: "",
  listProductPending: [],
  flagSubmitBill: true,
  flagEditBill: true,
  flagListPending: true,
  flagAddPending: true,
  flagDeletePending: true,
  flagUpdateProduct: false,
  flagUpdateDebt: false,
  addPending: [],
  deletePending: [],
  updateProduct: [],
  thongkekhachahangtheongay: {},
  thongke: {},
  adminDeleteProduct: {},
  debtList: [],
  detailDebt:[],
  updateDebt:[]
};

export default createReducer(INIT_STATE, {
  [Types.SUBMIT_BILL_SUCCESS]: (state, action) => {
  console.log('action',action.response);
    return {
      ...state,
      submitBill: action.response,
      flagSubmitBill: false,
    };
  },

  [Types.LIST_PRODUCT_PENDING_SUCCESS]: (state, action) => {
    return {
      ...state,
      listProductPending: action.response,
      error: action.response.message,
      flagListPending: false,
    };
  },

  [Types.ADMIN_DELETE_PRODUCT_SUCCESS]: (state, action) => {
    return {
      ...state,
      adminDeleteProduct: action.response,
    };
  },

  [Types.EDIT_BILL_SUCCESS]: (state, action) => {
    return {
      ...state,
      editBill: action.response,
      flagEditBill: false,
    };
  },

  [Types.THONG_KE_SUCCESS]: (state, action) => {
    return {
      ...state,
      thongke: action.response,
    };
  },

  [Types.UPDATE_PRODUCT_SUCCESS]: (state, action) => {
    return {
      ...state,
      updateProduct: action.response,
      flagUpdateProduct: false,
    };
  },

  [Types.ADD_PRODUCT_SUCCESS]: (state, action) => {
    return {
      ...state,
      addProduct: action.response,
    };
  },

  [Types.THONG_KE_KHACH_HANG_THEO_NGAY_SUCCESS]: (state, action) => {
    return {
      ...state,
      thongkekhachahangtheongay: action.response,
    };
  },

  [Types.LIST_ALL_SUP]: (state, action) => {
    return {
      ...state,
      listSup: action.response,
    };
  },

  [Types.LIST_ALL_SUP_SUCCESS]: (state, action) => {
    return {
      ...state,
      listSup: action.response,
    };
  },

  [Types.SORT_LIST_BILL]: (state, action) => {
    return {
      ...state,
      listBill: action.response,
    };
  },

  [Types.SORT_LIST_BILL_SUCCESS]: (state, action) => {
    return {
      ...state,
      listBill: action.response,
      shortBill: false,
    };
  },

  [Types.SET_FLAG_SUBMIT_BILL]: (state, action) => {
    console.log('SET_FLAG_',action);
    return {
      ...state,
      flagSubmitBill: action.payload,
    };
  },

  [Types.SET_FLAG_SHORT_BILL]: (state, action) => {
    return {
      ...state,
      shortBill: action.payload,
    };
  },

  [Types.SET_FLAG_EDIT_BILL]: (state, action) => {
    return {
      ...state,
      flagEditBill: action.payload,
    };
  },

  [Types.ADD_PENDING_SUCCESS]: (state, action) => {
    return {
      ...state,
      addPending: action.response,
      flagAddPending: false,
    };
  },

  [Types.DELETE_PENDING_SUCCESS]: (state, action) => {
    return {
      ...state,
      deletePending: action.response,
      flagDeletePending: false,
    };
  },

  [Types.DEBT_LIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      debtList: action.response,
    };
  },

  [Types.DETAIL_DEBT_SUCCESS]: (state,action)=>{

    return {
      ...this.state,
      detailDebt: action.response
    }
  },

  [Types.UPDATE_DEBT_SUCCESS]: (state, action) => {
	console.log("reducer", action);
	return {
		...this.state,
		updateDebt: action.response
	}
  },
  ///////////
  [Types.SET_FLAG_LIST_PENDING]: (state, action) => {
    return {
      ...state,
      flagListPending: action.payload,
      flagAddPending: false,
    };
  },

  [Types.SET_FLAG_ADD_PENDING]: (state, action) => {
    return {
      ...state,
      flagAddPending: action.payload,
    };
  },

  [Types.SET_FLAG_DELETE_PENDING]: (state, action) => {
    return {
      ...state,
      flagDeletePending: action.payload,
    };
  },

  [Types.SET_FLAG_UPDATE_PRODUCT]: (state, action) => {
    return {
      ...state,
      flagUpdateProduct: action.payload,
    };
  },

  [Types.SET_FLAG_UPDATE_DEBT]: (state, action) => {
    return {
      ...state,
      flagUpdateDebt: action.payload,
    };
  },
});
