/**
 * Mutations 业务层数据提交
 */
import storage from "../utils/storage"
import { State } from './index'

export default {
  saveUserInfo (state: State, userInfo: any) {
    state.userInfo = userInfo
    storage.setItem('userInfo', userInfo)
  }
}
