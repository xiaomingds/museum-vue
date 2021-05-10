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
export function doorSwitch(maddr,door_address,sw) {
  return request({
    url: '/device/switch',
    method: 'get',
    params: {
      maddr,
      door_address,
      sw
    }
  })
}
export function deviceLamp(maddr,lamp_address, lamp) {
  return request({
    url: '/device/light',
    method: 'get',
    params: {
      maddr,
      lamp_address,
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

export function otherSwitch(maddr,relay_address,sw) {
  return request({
    url: '/device/otherswitch',
    method: 'get',
    params: {
      maddr,
      relay_address,
      sw
    }
  })
}
export function findSwitch(mid,door_address) {
  return request({
    url: '/device/findswitch',
    method: 'get',
    params: {
      mid,
      door_address
    }
  })
}
export function findLamp(mid,lamp_address) {
  return request({
    url: '/device/findlamp',
    method: 'get',
    params: {
      mid,
      lamp_address
    }
  })
}export function findRelay(mid,relay_address) {
  return request({
    url: '/device/findrelay',
    method: 'get',
    params: {
      mid,
      relay_address
    }
  })
}
