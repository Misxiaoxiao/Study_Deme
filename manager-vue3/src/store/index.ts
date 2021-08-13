// vuex 状态管理
import { createStore } from 'vuex'
import mutations from './mutations'
import storage from '../utils/storage'
import { UserInfo } from '../type/UserType'

export type State = {
  userInfo: Partial<UserInfo>
}

const state: State = {
  userInfo: '' || storage.getItem('userInfo'), // 获取用户信息
}

export default createStore({
  state,
  mutations,
})
