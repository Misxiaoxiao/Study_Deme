// import { Toast } from 'antd-mobile';
import Types from './dispatch.type';
import { getRedirectToUrl } from 'util/util';
import { Toast } from 'antd-mobile';

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
  }),
  authSuccess: (data) => ({
    type: Types.AUTH_SUCCESS,
    payload: data
  }),
  errorMsg: (data) => ({
    type: Types.ERROR_MSG,
    msg: data
  }),
  logoutSubmit: (data) => ({
    type: Types.LOGOUT
  })
}

export const userFuc = {
  // 注册
  register: ({user, pwd, repeatPwd, type}) => {
    if (!user || !pwd || !type) {
      Toast.info('用户名或密码不能为空', 1);
      return userActions.errorMsg('用户名或密码不能为空');
    } else if (pwd !== repeatPwd) {
      Toast.info('两次输入的密码不一致', 1);
      return userActions.errorMsg('两次输入的密码不一致');
    }
    return dispatch => {
      const bool = true;
      if (bool) {
        dispatch(userActions.authSuccess({
          user, pwd, type
        }))
      } else {
        const msg = '错误';
        if (msg) {
          Toast.info(msg, 1);
        }
        dispatch(userActions.errorMsg(msg))
      }
    }
  },
  // 登录
  login: ({user, pwd}) => {
    if (!user || !pwd) {
      Toast.info('用户名或密码不能为空', 1);
      return userActions.errorMsg('用户名或密码不能为空');
    }
    return dispatch => {
      const bool = false;
      if (bool) {
        dispatch(userActions.authSuccess({}));
      } else {
        const msg = 'err';
        if (msg) {
          Toast.info(msg, 1);
          dispatch(userActions.errorMsg(msg));
        }
      }
    }
  }
}
