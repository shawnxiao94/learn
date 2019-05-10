import axiosAPI from "@/common/utils/axiosAPI";
import * as model from "./model";

// 个体画像 来源
export function querySources(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/querySources",
    "post",
    model.querySources,
    params
  );
}

// 个体画像 用户属性
export function getUserPropertyData(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/IndividualPortraitOpenService/getUserProperty",
    "post",
    model.getUserPropertyData,
    params
  );
}
// 个体画像 用户属性 六边形图表
export function getUserPropertyCountData(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/IndividualPortraitOpenService/getUserPropertyCount",
    "post",
    model.getUserPropertyCount,
    params
  );
}
// 个体画像 基础信息
export function getBaseInfoData(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/IndividualPortraitOpenService/getBaseInfo",
    "post",
    model.getBaseInfoData,
    params
  );
  // return axiosAPI('http://10.100.63.84:8079/services/IndividualPortraitOpenService/getBaseInfo', 'post', model.getBaseInfoData, params)
}
// 个体画像 用户标签
export function getPortraitTagData(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/IndividualPortraitOpenService/getPortraitTag",
    "post",
    model.getPortraitTag,
    params
  );
}
// 个体画像 消费趋势分析
export function getConsumptionTrendData(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/IndividualPortraitOpenService/getConsumptionTrend",
    "post",
    model.getConsumptionTrend,
    params
  );
}
