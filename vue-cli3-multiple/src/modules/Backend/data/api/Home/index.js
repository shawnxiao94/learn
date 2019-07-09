import axiosAPI from '@/common/utils/axiosAPI'
import * as model from './model'
export function userDistribution(params) {
  return axiosAPI(
    process.env.VUE_APP_BASE_API + '/OverviewOpenService/userDistribution',
    'post',
    model.userDistribution,
    params
  )
}
