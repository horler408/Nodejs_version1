import axios from 'axios';

import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  LIST_CART_REQUEST,
  LIST_CART_SUCCESS,
  LIST_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  ADD_TO_CART_SUCCESS,
} from '../constants/cartConstants';

// FOR ADMIN DASHBOARD
export const listCartsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_CART_REQUEST,
    });

    const { data } = await axios.get('/api/v1/carts');

    dispatch({
      type: LIST_CART_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: LIST_CART_FAIL,
      payload: message,
    });
  }
};

export const getCartItemAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CART_REQUEST,
    });

    const { data } = await axios(`/api/v1/carts/${id}`);

    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: GET_CART_FAIL,
      payload: message,
    });
  }
};

// FOR USER DASHBOARD
export const addToCartAction =
  (id, productId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_TO_CART_REQUEST,
      });

      const { data } = await axios.post(`/api/v1/carts/${id}`, {
        productId,
        quantity,
      });

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: data,
      });

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
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

export const removeFromCartAction =
  (userId, itemId) => (dispatch, getState) => {
    try {
      dispatch({
        type: REMOVE_FROM_CART_REQUEST,
      });

      const { data } = axios.delete(`/api/v1/carts/${userId}/${itemId}`);

      dispatch({
        type: REMOVE_FROM_CART_SUCCESS,
        payload: data.data,
      });

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({
        type: REMOVE_FROM_CART_FAIL,
        payload: message,
      });
    }
  };
