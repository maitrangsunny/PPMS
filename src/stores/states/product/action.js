import Types from "./";
import Configs from "../../../config";

export function addProduct(token, name, price, uom) {
  return {
    type: Types.ADD_PRODUCT,
    payload: {
      api: Configs.API + "product-temporary",
      token: token,
      method: "POST",
      payload: {
        name: name,
        price: price,
        uom: uom,
      },
    },
  };
}

export function listProductPending(token) {
  return {
    type: Types.LIST_PRODUCT_PENDING,
    payload: {
      api: Configs.API + "productTemporaryAll",
      token: token,
      method: "GET",
      payload: {},
    },
  };
}

export function updateProduct(token, price, id) {
  return {
    type: Types.UPDATE_PRODUCT,
    payload: {
      api: Configs.API + "outlet-product/" + id,
      token: token,
      method: "PUT",
      payload: {
        price,
      },
    },
  };
}

////////////
export function addPending(token, ids) {
  return {
    type: Types.ADD_PENDING,
    payload: {
      api: Configs.API + "product-temporary/clone",
      token: token,
      method: "POST",
      payload: {
        ids,
      },
    },
  };
}

export function deletePending(token, ids) {
  return {
    type: Types.DELETE_PENDING,
    payload: {
      api: Configs.API + "product-temporary/reject",
      token: token,
      method: "POST",
      payload: {
        ids,
      },
    },
  };
}

//////////////
export function listSup(token) {
  return {
    type: Types.LIST_ALL_SUP,
    payload: {
      token: token,
      api: Configs.API + "supplierAll",
      method: "GET",
      payload: {},
    },
  };
}

//////////////
export function ThongKeKhachHangTheoNgay(token, customer_id, start, end) {
  return {
    type: Types.THONG_KE_KHACH_HANG_THEO_NGAY,
    payload: {
      token: token,
      api: Configs.API + "orderByDate",
      method: "POST",
      payload: {
        start,
        end,
        customer_id,
      },
    },
  };
}

////////
export function sortListBill(token, customer_id = 0, start_day, end_day) {
  return {
    type: Types.SORT_LIST_BILL,
    payload: {
      token: token,
      api: Configs.API + "order/byDate",
      method: "POST",
      payload: {
        start: start_day,
        end: end_day,
        customer_id: customer_id,
      },
    },
  };
}

////////
export function thongke(token, start_date, end_date) {
  return {
    type: Types.THONG_KE,
    payload: {
      token: token,
      api: Configs.API + "byDate",
      method: "POST",
      payload: {
        start_date,
        end_date,
      },
    },
  };
}

export function adminDeleteProduct(token, ids) {
  return {
    payload: {
      token: token,
      api: Configs.API + "delete/product",
      method: "POST",
      payload: {
        ids
      },
    },
  };
}

export function submitBill(
  token,
  address,
  customer_id,
  delivery_date,
  name,
  amount,
  note,
  phone,
  po_product,
  payment,
  rest,
  expired
) {
  return {
    type: Types.SUBMIT_BILL,
    payload: {
      token: token,
      api: Configs.API + "order",
      method: "POST",
      payload: {
        address: address,
        customer_id: customer_id || 0,
        delivery_date: delivery_date,
        name: name,
        amount: amount,
        note: note,
        phone: phone,
        po_product: po_product,
        payment: payment,
        rest:rest,
        expired: expired
      },
    },
  };
}

export function editBill(
  token,
  id,
  address,
  name,
  delivery_date,
  amount,
  note,
  phone,
  po_product,
  payment,
  rest,
  expired
  
) {
  return {
    type: Types.EDIT_BILL,
    payload: {
      token: token,
      api: Configs.API + "order/" + id,
      method: "PUT",
      payload: {
        address: address,
        delivery_date: delivery_date,
        name: name,
        amount: amount,
        note: note,
        phone: phone,
        po_product: po_product,
        payment: payment,
        rest:rest,
        expired: expired
      },
    },
  };
}


export function getDebtList(token) {
  return {
    type: Types.DEBT_LIST,
    payload: {
      token: token,
      api: Configs.API + "debts?page=3",
      method: "GET",
    },
  };
}

export function getDetailDebt(token, id){
	return {
		type: Types.DETAIL_DEBT,
		payload: {
			token: token,
			api: Configs.API + "debt/"+id,
			method: "GET",
			payload: {},
		}

	}
}

export function updateDebt(token,id, payment, rest, expired){
	return {
		type: Types.UPDATE_DEBT,
		payload: {
			token: token,
			api: Configs.API + "debt/" + id +"/edit",
			method: "POST",
			payload:{
				payment: payment,
				rest: rest,
				expired: expired.toString()
			}
		}

	}
}

// delete temporary product

export function deletedTempProduct(token, id, is_enable) {
  console.log(is_enable, id);
  return {
      type: Types.DELETE_TEMP_PRODUCT,
      payload: {
      token: token,
      api: Configs.API + "outlet-product/"+id,
      method: "PUT",
      payload: {
        is_enable : 0
      }
    }
  }
}

export function setFlagShortBill(bool = true) {
  return {
    type: Types.SET_FLAG_SHORT_BILL,
    payload: bool,
  };
}

export function setFlagSubmitBill(bool = true) {
  return {
    type: Types.SET_FLAG_SUBMIT_BILL,
    payload: bool,
  };
}

export function setFlagEditBill(bool = true) {
  return {
    type: Types.SET_FLAG_EDIT_BILL,
    payload: bool,
  };
}

export function setFlagListPending(bool = true) {
  return {
    type: Types.SET_FLAG_LIST_PENDING,
    payload: bool,
  };
}

export function setFlagAddPending(bool = true) {
  return {
    type: Types.SET_FLAG_ADD_PENDING,
    payload: bool,
  };
}

export function setFlagDeletePending(bool = true) {
  return {
    type: Types.SET_FLAG_DELETE_PENDING,
    payload: bool,
  };
}

export function setFlagUpdateProduct(bool = true) {
  return {
    type: Types.SET_FLAG_UPDATE_PRODUCT,
    payload: bool,
  };
}

export function setFlagUpdateDebt(bool = true) {
  return {
    type: Types.SET_FLAG_UPDATE_DEBT,
    payload: bool,
  };
}

export function setFlagDeleteTempProduct(bool = true) {
  return {
    type: Types.SET_FLAG_DELETE_TEMP_PRODUCT,
    payload: bool,
  };
}
