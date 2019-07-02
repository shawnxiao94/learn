import axiosAPI from '@/common/utils/axiosAPI'
import * as model from './model'
// 上汽用户业务分布
export function userDistribution(params) {
  return axiosAPI(
    '/OverviewOpenService/userDistribution',
    'post',
    model.userDistribution,
    params
  )
}
