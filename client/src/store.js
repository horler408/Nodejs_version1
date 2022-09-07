import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
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

  cartList: cartListReducer,
  cartGetItems: cartGetItemsReducer,
  cartAddItem: cartAddItemReducer,
  cartRemoveItem: cartRemoveItemReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
