import request from '@/utils/request'

export function alldevice(page, size) {
  return request({
    url: '/device/masterList',
    method: 'get',
    params: {
      page,
      size
    }
  })
}
export function master() {
  return request({
    url: '/device/master',
    method: 'get'

  })
}
export function deverror() {
  return request({
    url: '/device/errorList',
    method: 'get'
  })
}
export function slaveList() {
  return request({
    url: '/device/slaveList',
    method: 'get'
  })
}
export function mmslaveList(maddr) {
  return request({
    url: '/device/mslaveList',
    method: 'get',
    params:{maddr}
  })
}
export function editDevice(device) {
  return request({
    url: '/device/editDevice',
    method: 'post',
    data: device
  })
}
export function warningSlave() {
  return request({
    url: '/device/warningslave',
    method: 'get'
  })
}
export function indexList() {
  return request({
    url: '/device/indexList',
    method: 'get'
  })
}
