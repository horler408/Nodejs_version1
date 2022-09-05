import axios from 'axios';

import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
} from '../constants/cartConstants';

export const getCartAction = () => async (dispatch) => {
  try {
    dispatch({
      type: CART_LIST_REQUEST,
    });

    const { data } = await axios.get('/api/v1/carts');

    dispatch({
      type: CART_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: CART_LIST_FAIL,
      payload: message,
    });
  }
};

export const getCartItemAction = (id) => (dispatch) => {
  dispatch({
    type: GET_CART_REQUEST,
  });
  axios
    .get(`/api/v1/cart/${id}`)
    .then((res) =>
      dispatch({
        type: GET_CART_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({
        type: GET_CART_FAIL,
        payload: message,
      });
    });
};

export const addToCartAction =
  (id, productId, quantity) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_TO_CART_REQUEST,
      });

      const { data } = await axios.post(`/api/v1/cart/${id}`, {
        productId,
        quantity,
      });

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({
        type: ADD_TO_CART_FAIL,
        payload: message,
      });
    }
  };

export const removeFromCartAction = (userId, itemId) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART_REQUEST,
  });

  axios
    .delete(`/api/v1/cart/${userId}/${itemId}`)
    .then((res) =>
      dispatch({
        type: REMOVE_FROM_CART_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({
        type: REMOVE_FROM_CART_FAIL,
        payload: message,
      });
    });
};
