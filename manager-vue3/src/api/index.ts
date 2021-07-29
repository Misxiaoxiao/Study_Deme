// api 管理
import request from "../utils/request"

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
  }
}
