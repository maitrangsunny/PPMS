import Types from "./";
import createReducer from "../";

const INIT_STATE = {
  token: "-",
  user: [],
  dataProduct: [],
  //   listProduct: [],
};

export default createReducer(INIT_STATE, {
  [Types.REMOVE_TOKEN]: (state, action) => {
    return {
      ...state,
      token: action.storage.payload.token,
    };
  },

  [Types.SET_TOKEN]: (state, action) => {
    return {
      ...state,
      token: action.storage.payload.token,
    };
  },

  [Types.GET_TOKEN]: (state, action) => {
    return {
      ...state,
      token: action.response,
    };
  },

  [Types.GET_DATA]: (state, action) => {
    return {
      ...state,
      dataProduct: action.response,
    };
  },

  [Types.SET_DATA]: (state, action) => {
    return {
      ...state,
      dataProduct: action.storage.payload,
    };
  },

  [Types.REMOVE_LIST_DATA]: (state, action) => {
    return {
      ...state,
      dataProduct: action.storage.payload,
    };
  },

  //   [Types.GET_LIST_ALL_PRODUCT]: (state, action) => {
  //     return {
  //       ...state,
  //       listProduct: action.response,
  //     };
  //   },

  //   [Types.SET_LIST_ALL_PRODUCT]: (state, action) => {
  //     return {
  //       ...state,
  //       listProduct: action.storage.payload.data,
  //     };
  //   },

  [Types.SET_USER]: (state, action) => {
    return {
      ...state,
      user: action.storage.payload.data,
    };
  },

  [Types.GET_USER]: (state, action) => {
    return {
      ...state,
      user: action.response.user,
    };
  },

  [Types.REMOVE_USER]: (state, action) => {
    return {
      ...state,
      user: action.storage.payload,
    };
  },
});
