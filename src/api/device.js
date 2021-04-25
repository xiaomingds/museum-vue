import request from '@/utils/request'

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
export function deviceSwitch(maddr,saddr, sw) {
  return request({
    url: '/device/switch',
    method: 'get',
    params: {
      maddr,
      saddr,
      sw
    }
  })
}
export function deviceLamp(maddr,saddr, lamp) {
  return request({
    url: '/device/light',
    method: 'get',
    params: {
      maddr,
      saddr,
      lamp
    }
  })
}
export function deviceSleep(maddr,saddr,sleep) {
  return request({
    url: '/device/sleep',
    method: 'get',
    params: {
      maddr,
      saddr,
      sleep
    }
  })
}

