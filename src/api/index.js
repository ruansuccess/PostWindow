/**
 * apis
 */
import request from './../utils/request';
export default {
  test() {
    return request({
      url: '/test',
    });
  },
  login(params) {
    return request({
      url: '/user',
      method: 'post',
      data: {
        action: 'login',
        params,
      },
    });
  },
  register(params) {
    return request({
      url: '/user',
      method: 'post',
      data: {
        action: 'register',
        params,
      },
    });
  },
};
