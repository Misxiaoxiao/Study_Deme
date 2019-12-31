import { combineReducers } from 'redux';
import { userReducer } from './user/redux';

const allReducer = combineReducers({
  user: userReducer
})

export default allReducer;