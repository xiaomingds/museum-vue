import request from '@/utils/request'

export function allMaster(page, size) {
  return request({
    url: '/master/masterList',
    method: 'get',
    params: {
      page,
      size
    }
  })
}
export function master() {
  return request({
    url: '/master/master',
    method: 'get'

  })
}
export function masterRest(maddr) {
  return request({
    url: '/master/reset',
    method: 'get',
    params: {maddr}
  })
}
export function masterSwitch(maddr, sw) {
  return request({
    url: '/master/switch',
    method: 'get',
    params: {
      maddr,
      sw
    }
  })
}
