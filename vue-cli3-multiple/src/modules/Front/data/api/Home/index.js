import axiosAPI from '@/common/utils/axiosAPI'
import * as model from './model'
export function userDistribution(params) {
  return axiosAPI(
    '/OverviewOpenService/userDistribution',
    'post',
    model.userDistribution,
    params
  )
}
