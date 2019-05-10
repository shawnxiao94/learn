// 异常用户数量占比
export const getOverViewData = {
  request(params) {
    return params;
  },
  response(data) {
    let dataJson = [];
    let errorResult = { errMsg: "" };
    if (data.Result.data) {
      dataJson = JSON.parse(data.Result.data);
    } else {
      errorResult.errMsg = data.Result.errMsg;
      dataJson = errorResult;
    }
    return dataJson;
  }
};

// 同时段异常增量趋势
export const incrementalData = {
  request(params) {
    return params;
  },
  response(data) {
    let dataJson = [];
    let errorResult = { errMsg: "" };
    if (data.Result.data) {
      dataJson = JSON.parse(data.Result.data);
    } else {
      errorResult.errMsg = data.Result.errMsg;
      dataJson = errorResult;
    }
    return dataJson;
  }
};

// 地区异常用户数趋势变化
export const theIncrementalData = {
  request(params) {
    return params;
  },
  response(data) {
    let dataJson = [];
    let errorResult = { errMsg: "" };
    if (data.Result.data) {
      dataJson = JSON.parse(data.Result.data);
    } else {
      errorResult.errMsg = data.Result.errMsg;
      dataJson = errorResult;
    }
    return dataJson;
  }
};
