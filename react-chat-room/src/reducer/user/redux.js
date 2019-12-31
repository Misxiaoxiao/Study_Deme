// import { Toast } from 'antd-mobile';
import Types from './dispatch.type';
import { getRedirectToUrl } from 'util/util';

const initialState = {
  user: '12321'
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.AUTH_SUCCESS:
      return { ...state, msg: '', redirecTo: getRedirectToUrl(action.payload), ...action.payload };
    case Types.LOAD_DATA:
      console.log(action)
      return { ...state, ...action.payload };
    case Types.ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false };
    case Types.LOGOUT:
      return {  ...initialState, redirecTo: '/login' };
    default:
      return state;
  }
}

export const userActions = {
  loadData: (data) => ({
    type: Types.LOAD_DATA,
    payload: data
  })
}
