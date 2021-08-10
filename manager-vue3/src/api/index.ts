// api 管理
import request from '../utils/request'
import { CreateForm, Action } from '../type/UserType'

export default {
  login (
    params: {
      userName: string;
      userPwd: string;
    }
  ) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params
    })
  },
  noticeCount () {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {},
      mock: true
    })
  },
  getMenuList () {
    return request({
      url: '/menu/list',
      method: 'get',
      data: {},
      mock: true
    })
  },
  getUserList (params: any) {
    return request({
      url: '/users/list',
      method: 'get',
      params,
      mock: true
    })
  },
  userDel (params: {
    userIds: string[];
  }) {
    return request({
      url: '/users/delete',
      method: 'post',
      params,
      mock: true
    })
  },
  getRoleList () {
    return request({
      url: '/roles/allList',
      method: 'get',
      mock: true
    })
  },
  getDeptList () {
    return request({
      url: '/dept/list',
      method: 'get',
      mock: true
    })
  },
  userSubmit (params: CreateForm & { action?: Action }) {
    return request({
      url: '/roles/allList',
      method: 'get',
      mock: true
    })
  },
}
