// vuex 状态管理
import { createStore } from 'vuex'
import mutations from './mutations'
import storage from '../utils/storage'

export type UserInfo = {
  userName: string;
  userId: string;
  userEmail: string;
  token: string;
  state: number;
  roleList: string[];
  role: number;
  deptId: string[]
} | undefined;

export type State = {
  userInfo: UserInfo
}

const state: State = {
  userInfo: '' || storage.getItem('userInfo'), // 获取用户信息
}

export default createStore({
  state,
  mutations,
})
