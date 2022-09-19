import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userDeleteReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  noteCreateReducer,
  noteListReducer,
  noteUpdateReducer,
  noteDeleteReducer,
} from './reducers/noteReducers';
import {
  productCreateReducer,
  productListReducer,
  productDetailReducer,
  cartReducer,
  productFilterReducer,
  productUpdateReducer,
  productDeleteReducer,
} from './reducers/productReducers';
import {
  cartListReducer,
  cartGetItemsReducer,
  cartAddItemReducer,
  cartRemoveItemReducer,
} from './reducers/cartReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,

  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,

  productList: productListReducer,
  productDetail: productDetailReducer,
  cartItems: cartReducer,
  productFilter: productFilterReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,

  listCarts: cartListReducer,
  getCartItems: cartGetItemsReducer,
  addCartItem: cartAddItemReducer,
  removeCartItem: cartRemoveItemReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const cartItemFromStorage = localStorage.getItem('cartItem')
  ? JSON.parse(localStorage.getItem('cartItem'))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: { cartItems: cartItemFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
