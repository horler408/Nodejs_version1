import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  GET_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  LIST_CART_FAIL,
  LIST_CART_REQUEST,
  LIST_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
} from '../constants/cartConstants';

export const cartListReducer = (state = { carts: [] }, action) => {
  switch (action.type) {
    case LIST_CART_REQUEST:
      return { loading: true };
    case LIST_CART_SUCCESS:
      return { loading: false, carts: action.payload };
    case LIST_CART_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cartGetItemsReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return { loading: true };
    case GET_CART_SUCCESS:
      return { loading: false, cartItems: action.payload };
    case GET_CART_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cartAddItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { loading: true };
    case ADD_TO_CART_SUCCESS:
      return { loading: false, success: true };
    case ADD_TO_CART_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export const cartRemoveItemReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_FROM_CART_REQUEST:
      return { loading: true };
    case REMOVE_FROM_CART_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_FROM_CART_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case 'PRODUCT_DETAIL_REQUEST':
      return { loading: true };
    case 'PRODUCT_DETAIL_SUCCESS':
      return { loading: false, product: action.payload };
    case 'PRODUCT_DETAIL_FAIL':
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
