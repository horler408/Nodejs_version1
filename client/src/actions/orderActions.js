import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  GET_ORDERS,
  CHECKOUT,
  ORDERS_REQUEST,
  CART_FAIL,
} from '../constants/orderConstants';

export const getOrders = (id) => (dispatch) => {
  dispatch(setOrdersLoading());
  axios
    .get(`/api/vi/order/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) => {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({
        type: CART_FAIL,
        payload: message,
      });
    });
};

export const checkout = (id, source) => (dispatch) => {
  axios
    .post(`/api/v1/order/${id}`, { source })
    .then((res) =>
      dispatch({
        type: CHECKOUT,
        payload: res.data,
      })
    )
    .catch((err) => {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({
        type: CART_FAIL,
        payload: message,
      });
    });
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_REQUEST,
  };
};
