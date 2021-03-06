import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRgisterReducer } from './reducers/userReducers';
import { noteCreateReducer, noteListReducer } from './reducers/noteReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRgisterReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
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
