// 标签类别列表
export const labelTagModel = {
  request(params) {
    params.tagCategoryReq = {
      vagueName: params.vagueName || "",
      pageNumber: params.pageNumber,
      pageSize: params.pageSize
    };
    delete params.pageNumber;
    delete params.pageSize;
    delete params.vagueName;
    return params;
  },
  response(data) {
    return data;
  }
};

// 新增
export const addLabelTagModel = {
  request(params) {
    let paramsObj = {
      tagCategory: {
        categoryDesc: params.categoryDesc || "",
        categoryName: params.categoryName || ""
      }
    };
    return paramsObj;
  },
  response(data) {
    return data;
  }
};

// 修改
export const updLabelTagModel = {
  request(params) {
    let paramsObj = {
      tagCategory: {
        id: params.id,
        categoryDesc: params.categoryDesc || "",
        categoryName: params.categoryName || ""
      }
    };
    return paramsObj;
  },
  response(data) {
    return data;
  }
};

// 删除
export const delLabelTagModel = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};
