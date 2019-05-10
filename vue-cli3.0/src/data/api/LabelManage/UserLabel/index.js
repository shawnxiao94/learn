import axiosAPI from "@/common/utils/axiosAPI";

import * as model from "./model";

// 标签画像 - 标签列表
export function labelList(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/queryTags",
    "post",
    model.labelListModel,
    params
  );
}

// 标签画像 - 来源下拉框
export function fromSelect(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/querySources",
    "post",
    model.labelFromSelect,
    params
  );
}

// 标签画像 - 标签下拉框
export function tagsSelect(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/PortraitTagsOpenService/queryAllLevels",
    "post",
    model.labelTagsSelect,
    params
  );
}

// 用户标签 - 规则列表（不分页）
export function tagRuleList(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagRuleOpenService/queryTagRuleList",
    "post",
    model.tagRuleModel,
    params
  );
}

// 用户标签 - 新增标签
export function addTagDetail(params) {
  // return axiosAPI(process.env.VUE_APP_API_HOST + '/TagOpenService/addTag', 'post', model.tagAddRuleModel, params)
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/addTagAndTagRule",
    "post",
    model.tagAddRuleModel,
    params
  );
}

// 用户标签 - 修改标签
export function updateTagDetail(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/updateTagAndRule",
    "post",
    model.updateTagModel,
    params
  );
}

// 用户标签 - 修改状态
export function updateTagStatus(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/updateStatus",
    "post",
    model.updateTagStatusModel,
    params
  );
}

// 用户标签 - 禁用启用
export function updateTagIsOpen(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/updateIsOpen",
    "post",
    model.updateTagIsOpenModel,
    params
  );
}

// 用户标签 - 查询详情
export function queryByTagId(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/queryTagByTagId",
    "post",
    model.queryByTagIdModel,
    params
  );
  // return axiosAPI('http://10.100.58.185:8081/services/TagOpenService/queryTagByTagId', 'post', model.queryByTagIdModel, params)
}

// 用户标签 - 详情中导入用户的历史记录列表数据
export function queryManualTagRecord(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/ManualTagRecordOpenService/queryManualTagRecord",
    "post",
    model.queryManualTagRecord,
    params
  );
}

// 用户标签 - 查询详情
export function queryportraitByTagId(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/PortraitOpenService/queryportraitByTagId",
    "post",
    model.queryportraitByTagId,
    params
  );
}

// 获取规则关系列表
export function getRuleRelationList(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/DictionaryOpenService/operationCharacters",
    "post",
    model.getRuleRelationList,
    params
  );
}

// 根据规则属性获取规则值
export function getCodeTablesByCodeTableName(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/DictionaryOpenService/getCodeTablesByPropertyCode",
    "post",
    model.getCodeTablesByCodeTableName,
    params
  );
}

// 根据操作符id 获取所有的属性
export function getCodePropertiesByOcId(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/DictionaryOpenService/getOperatorPropertiesByOpCode",
    "post",
    model.getCodePropertiesByOcId,
    params
  );
  // return axiosAPI(process.env.VUE_APP_API_HOST + '/DictionaryOpenService/getCodePropertiesByOcId', 'post', model.getCodePropertiesByOcId, params)
}

// 新增规则
export function saveTagRule(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagRuleOpenService/saveTagRule",
    "post",
    model.saveTagRule,
    params
  );
}

// 标签共享查询
export function queryTagAndChannel(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/queryTagAndChannel",
    "post",
    model.queryTagAndChannel,
    params
  );
}

// 标签共享新增编辑
export function addShareChannel(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/addShareChannel",
    "post",
    model.addShareChannel,
    params
  );
}

// 选择 类别
export function querylabelTagList(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagCategoryOpenService/queryCategory",
    "post",
    model.labelTagModel,
    params
  );
}

// 标签规则表达式预览
export function queryTagExpression(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/queryTagExpression",
    "post",
    model.queryTagExpressionModel,
    params
  );
}

// 标签规则表达式预览
export function getOperationCharacters(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/DictionaryOpenService/getOperationCharacters",
    "post",
    model.getOperationCharactersModel,
    params
  );
}

// 手工型失效
export function loseEfficacyTagStatus(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/loseEfficacyTag",
    "post",
    model.loseEfficacyTagStatusModel,
    params
  );
}

// 文件上传删除接口
export function delteUploadFile(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/FileUploadOpenService/deletTemData",
    "post",
    model.delteUploadFileModel,
    params
  );
}

// 标签画像 - 标签列表-查询用户数
export function clientTotalsList(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagOpenService/queryTagUserCounts",
    "post",
    model.clientTotalsListModel,
    params
  );
}
