// api 管理
import request from '../utils/request'
import { QueryUserForm, FormItem } from '../type/UserType'
import { MenuItem, MenuQueryForm } from '../type/MenuType'
import { Action, Pager } from '../type/CommonType'
import { RoleQueryForm, RoleColumns, PermissionList } from '../type/RoleType'

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
  getMenuList (params: Partial<MenuQueryForm>) {
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
  getUserList (params: Partial<FormItem & Pager>) {
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
  getRoleAllList () {
    return request({
      url: '/roles/allList',
      method: 'get',
      mock: true
    })
  },
  getRoleList (params: Partial<RoleQueryForm & Pager>) {
    return request({
      url: '/roles/list',
      method: 'get',
      data: params,
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
  userSubmit (params: Partial<QueryUserForm & { action?: Action }>) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params
    })
  },
  menuSubmit (params: Partial<MenuItem & { action?: Action }>) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data: params
    })
  },
  roleOperate (params: Partial<RoleColumns & { action?: Action }>) {
    return request({
      url: '/roles/operate',
      method: 'post',
      data: params
    })
  },
  updatePermission (params: { _id: string, permissionList: PermissionList }) {
    return request({
      url: '/roles/update/permission',
      method: 'post',
      data: params
    })
  }
}
