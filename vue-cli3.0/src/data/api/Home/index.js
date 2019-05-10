import axiosAPI from "@/common/utils/axiosAPI";
import * as model from "./model";
// 上汽用户业务分布
export function userDistribution(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/OverviewOpenService/userDistribution",
    "post",
    model.userDistribution,
    params
  );
}

// 标签数分布
export function tagDistribution(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/OverviewOpenService/tagDistribution",
    "post",
    model.tagDistribution,
    params
  );
}

// 概览数据
export function general(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/OverviewOpenService/general",
    "post",
    model.general,
    params
  );
}
