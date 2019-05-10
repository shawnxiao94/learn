import axiosAPI from "@/common/utils/axiosAPI";

import * as model from "./model";

// 获取画像管理表格数据1
export function getPortraitListData(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/PortraitOpenService/findByPage",
    "post",
    model.getPortraitListData,
    params
  );
}
// 获取标签数据
export function getLabelData(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/selectTags",
    "post",
    model.getLabelData,
    params
  );
}
// 标签分类
export function querylabelTagList(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagCategoryOpenService/queryCategory",
    "post",
    model.labelTagModel,
    params
  );
}
// 选择标签所属公司部门
export function queryTagSource(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/selectTagsQuerySources",
    "post",
    model.queryTagSource,
    params
  );
}
// 弹框规则下拉数据的接口
export function ruleOptionData(params) {
  return axiosAPI("/ruleOptionData", "post", model.ruleOptionData, params);
}
// 弹框保存时提交数据
export function submitData(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/PortraitOpenService/save",
    "post",
    model.submitData,
    params
  );
}
// updata接口
export function submitUpdata(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/PortraitOpenService/updatePortrait",
    "post",
    model.submitUpData,
    params
  );
}
// 查询编辑
export function findByPortraitId(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/PortraitOpenService/findByPortraitId",
    "post",
    model.getPortraitByIdData,
    params
  );
}
// 表格删除数据时的接口
export function removeData(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/PortraitOpenService/delete",
    "post",
    model.removeData,
    params
  );
}
// 表格禁用接口
export function disableData(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/PortraitOpenService/portraitForBid",
    "post",
    model.disableData,
    params
  );
}
