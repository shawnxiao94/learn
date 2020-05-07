import axiosApi from '@/common/utils/axiosApi'
import * as model from './model'
export function userDistribution(params) {
  return axiosApi(
    '/OverviewOpenService/userDistribution',
    'post',
    model.userDistribution,
    params
  )
}
