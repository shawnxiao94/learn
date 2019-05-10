import axiosAPI from "@/common/utils/axiosAPI";
import * as model from "./model";
// 异常用户数量占比
export function abnormalLiat(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/AbnormalUserVenusService/abUserProportion",
    "post",
    model.getOverViewData,
    params
  );
}
// export function abnormalLiat (params) {
//   return axiosAPI('http://10.100.57.112:8085/services/AbnormalUserVenusService/abUserProportion', 'post', model.getOverViewData, params)
// }

// 同时段异常增量趋势
export function incrementalEchaet(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/AbnormalUserVenusService/abUserTrend",
    "post",
    model.incrementalData,
    params
  );
}
// export function incrementalEchaet (params) {
//   return axiosAPI('http://10.100.57.112:8085/services/AbnormalUserVenusService/abUserTrend', 'post', model.incrementalData, params)
// }

// 地区异常用户数趋势变化
export function theIncrementalEchaet(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/AbnormalUserVenusService/abUserArea",
    "post",
    model.theIncrementalData,
    params
  );
}
// export function theIncrementalEchaet (params) {
//   return axiosAPI('http://10.100.57.112:8085/services/AbnormalUserVenusService/abUserArea', 'post', model.theIncrementalData, params)
// }
