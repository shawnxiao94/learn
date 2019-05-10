// 获取所有渠道
export const querySources = {
  request(params) {
    return {
      individualReq: params
    };
  },
  response(data) {
    return data;
  }
};

// 获取用户属性 六边形
export const getUserPropertyData = {
  request(params) {
    return {
      individualReq: params
    };
  },
  response(data) {
    return data;
  }
};
// 获取用户属性 图表
export const getUserPropertyCount = {
  request(params) {
    return {
      individualReq: params
    };
  },
  response(data) {
    return data;
  }
};
// 获取基础信息
export const getBaseInfoData = {
  request(params) {
    return {
      // 'individualReq': {'startTime': '', 'endTime': '', 'identificationType': '3', 'identificationValue': '5c63c22b6b950a5d80b52c6b'}
      individualReq: params
    };
  },
  response(data) {
    return data;
  }
};
// 获取用户标签
export const getPortraitTag = {
  request(params) {
    return {
      individualReq: params
    };
  },
  response(data) {
    return data;
  }
};
// 消费趋势分析
export const getConsumptionTrend = {
  request(params) {
    return {
      individualReq: params
    };
  },
  response(data) {
    return data;
  }
};
