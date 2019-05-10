import axiosAPI from "@/common/utils/axiosAPI";

import * as model from "./model";

// 标签类别列表
export function labelTagList(params) {
  // return axiosAPI('http://10.100.63.218:8889/client/v1/tagcategory/queryCategory', '', model.labelTagModel, params)
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagCategoryOpenService/queryCategory",
    "post",
    model.labelTagModel,
    params
  );
}

// 新增
export function addLabelTagDetail(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagCategoryOpenService/saveCategory",
    "post",
    model.addLabelTagModel,
    params
  );
}

// 编辑
export function updLabelTagDetail(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagCategoryOpenService/updateCategory",
    "post",
    model.updLabelTagModel,
    params
  );
}

// 删除
export function delLabelTagDetail(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/TagCategoryOpenService/deleteCategory",
    "post",
    model.delLabelTagModel,
    params
  );
}
