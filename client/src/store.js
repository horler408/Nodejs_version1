import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
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
  // cartReducer,
  productUpdateReducer,
  productDeleteReducer,
} from './reducers/productReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  noteList: noteListReducer,

  noteCreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
  productList: productListReducer,
  // cartItems: cartReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
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
