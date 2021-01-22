import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function findUserList(page, size) {
  return request({
    url: '/user/allUser',
    method: 'get',
    params: {
      page,
      size
    }
  })
}
export function addUser(user) {
  return request({
    url: '/user/creatUser',
    method: 'post',
    data: user
  })
}
export function editUser(user) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data: user
  })
}
export function delUser(userId) {
  console.log('传递信息axios' + '  ' + userId)
  return request({
    url: '/user/delUser',
    method: 'get',
    params: {
      userId
    }
  })
}
