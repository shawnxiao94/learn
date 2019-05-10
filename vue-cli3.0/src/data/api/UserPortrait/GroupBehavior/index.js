import axiosAPI from "@/common/utils/axiosAPI";
import * as model from "./model";
// 用户画像 - 群体画像
export function labelList(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/PortraitTagsOpenService/queryLevel4Group",
    "post",
    model.labelList,
    params
  );
}
// 用户画像 - 查询来源
export function querySource(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/querySources",
    "post",
    model.querySource,
    params
  );
}

// 用户画像 - 查询画像list
export function queryPortraitBySource(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/GroupPortraitUserOpenService/getGroupPortrait",
    "post",
    model.queryPortraitBySource,
    params
  );
}

// 业务线活动与用户群触点分析
export function getContactAnalysis(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/SourceActivityStatisticalOpenService/queryActivityStatistical",
    "post",
    model.getContactAnalysis,
    params
  );
  // return axiosAPI('http://10.100.61.148:8081/SourceActivityStatisticalOpenService/queryActivityStatistical', 'post', model.getContactAnalysis, params)
}

// 群体群连续行为分析
export function getUserBehavior(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/GroupTrendUserOpenService/groupActionTrend",
    "post",
    model.getUserBehavior,
    params
  );
}
// 上汽生态业务用户分布圆形水波图
export function getWaterEcharts(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/GroupTrendUserOpenService/groupUserDistribution",
    "post",
    model.getWaterEcharts,
    params
  );
}
