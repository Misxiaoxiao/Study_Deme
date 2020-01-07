import { combineReducers } from 'redux';
import { userReducer } from './user/redux';
import { chatReducer } from './chat/redux';

const allReducer = combineReducers({
  user: userReducer,
  chat: chatReducer
})

export default allReducer;