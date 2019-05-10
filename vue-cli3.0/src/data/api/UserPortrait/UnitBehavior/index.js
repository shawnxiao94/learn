import axiosAPI from "@/common/utils/axiosAPI";
import * as model from "./model";

// 业务线与用户触点分析
export function getContactAnalysis(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/ClientStatisticalOpenService/businessContact",
    "post",
    model.getContactAnalysis,
    params
  );
}

// 用户与上汽生态各业务体系关联情况（六爪鱼）
export function getWaveGraphList(params) {
  // return axiosAPI(process.env.VUE_APP_API_HOST + '/IndividualActionOpenService/queryUserPortrait', 'post', model.getWaveGraphList, params)
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/ClientStatisticalOpenService/userAndSaicBusinessContact",
    "post",
    model.getWaveGraphList,
    params
  );
}

// 个体行为分析
export function getUserBehaviorAnalysis(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/ClientStatisticalOpenService/behaviorContinuityAnalysis",
    "post",
    model.getUserBehaviorAnalysis,
    params
  );
}
