import request from '@/utils/request'

export function login(user) {
  return request({
    url: '/user/login',
    method: 'post',
    data: user
  })
}
// 获取权限
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function resetToken({commit}) {
  return new Promise(resolve =>{
    removeToken();
    commit("RESET_STATE");
    commit('SET_ROLES', []);
    resolve();
  })
}
