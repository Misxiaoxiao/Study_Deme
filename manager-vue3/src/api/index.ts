// api 管理
import request from '../utils/request'
import { CreateForm } from '../type/UserType'
import { MenuItem, MenuQueryForm } from '../type/MenuType'
import { Action } from '../type/CommonType'

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
  getMenuList (params: MenuQueryForm) {
    return request({
      url: '/menu/list',
      method: 'get',
      data: params
    })
  },
  getPermissionList () {
    return request({
      url: '/users/getPermissionList',
      method: 'get',
      data: {}
    })
  },
  getUserList (params: any) {
    return request({
      url: '/users/list',
      method: 'get',
      params
    })
  },
  userDel (params: {
    userIds: string[];
  }) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params
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
  userSubmit (params: Partial<CreateForm> & { action?: Action }) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params
    })
  },
  menuSubmit (params: Partial<MenuItem> & { action?: Action }) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data: params
    })
  }
}
