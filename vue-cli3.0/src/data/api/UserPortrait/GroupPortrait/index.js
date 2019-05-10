import axiosAPI from "@/common/utils/axiosAPI";
import * as model from "./model";

// 用户群体业务贡献度
export function groupPortraitUserContribution(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/GroupPortraitUserOpenService/groupPortraitUserContribution",
    "post",
    model.groupPortraitUserContribution,
    params
  );
}

// 用户群体属性 图表数据
export function groupPortraitUserInfo(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/GroupPortraitUserOpenService/groupPortraitUserInfo",
    "post",
    model.groupPortraitUserInfo,
    params
  );
}

// 用户群体消费趋势
export function groupPortraitConsumptionTrend(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/GroupPortraitUserOpenService/groupPortraitConsumptionTrend",
    "post",
    model.groupPortraitConsumptionTrend,
    params
  );
}

// 用户群体画像标签构成
export function groupPortraitUserTag(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/GroupPortraitUserOpenService/groupPortraitUserTag",
    "post",
    model.groupPortraitUserTag,
    params
  );
}

// 获取某渠道下所有的画像
export function getGroupPortrait(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/GroupPortraitUserOpenService/getGroupPortrait",
    "post",
    model.getGroupPortrait,
    params
  );
}
