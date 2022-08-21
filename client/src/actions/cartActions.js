import axios from 'axios';

import {
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
  CART_REQUEST,
  CART_FAIL,
} from '../constants/orderConstants';

export const getCart = (id) => (dispatch) => {
  axios
    .get(`/api/v1/cart/${id}`)
    .then((res) =>
      dispatch({
        type: GET_CART,
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

export const addToCart = (id, productId, quantity) => (dispatch) => {
  axios
    .post(`/api/v1/cart/${id}`, { productId, quantity })
    .then((res) =>
      dispatch({
        type: ADD_TO_CART,
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

export const deleteFromCart = (userId, itemId) => (dispatch) => {
  axios
    .delete(`/api/v1/cart/${userId}/${itemId}`)
    .then((res) =>
      dispatch({
        type: DELETE_FROM_CART,
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

export const setCartLoading = () => {
  return {
    type: CART_REQUEST,
  };
};
