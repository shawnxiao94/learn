import axiosApi from '@/common/utils/axiosApi'

// 登录校验
export function loginReg(params) {
  return axiosApi('/reg/login', 'post', null, params)
}
