import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData,token) => {
  return function (dispatch) {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(response => {
        console.log(response.data);
        /* response.data.name é o id que vem do firebase! */
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    const queryParams = '?auth=' + token + '&orderBy="userId"' + '&equalTo="' + userId + '"';
    console.log(queryParams);
    
    dispatch(fetchOrdersStart());
    axios
      .get('/orders.json' + queryParams)
      .then(res => {
        console.log(res.data);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
        console.log(err);
      });
  }
}

export const deleteOrderSuccess = orderId => {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    orderId: orderId
  }
}

export const deleteOrderFail = error => {
  return {
    type: actionTypes.DELETE_ORDER_FAIL,
    error: error
  }
}

export const deleteOrderStart = () => {
  return {
    type: actionTypes.DELETE_ORDER_START
  }
}

export const deleteOrder = orderId => {
  return dispatch => {
    dispatch(deleteOrderStart());
    axios.delete(`/orders/${orderId}.json/`)
      .then(_ => {
        dispatch(deleteOrderSuccess(orderId));
      })
      .catch(error => {
        console.log(error);
        dispatch(deleteOrderFail(error));
      })
  }
}

