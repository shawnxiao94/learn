// 用户群体业务贡献度
export const groupPortraitUserContribution = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};
// 用户群体属性
export const groupPortraitUserInfo = {
  request(params) {
    return params;
  },
  response(data) {
    if (data.Result.data && data.Result.data.length) {
      data.Result.data = data.Result.data.map(item => {
        if (item.max === 0) {
          item.max = 1;
        }
        return item;
      });
    }
    return data;
  }
};
// 用户群体消费趋势
export const groupPortraitConsumptionTrend = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 用户群体消费趋势
export const groupPortraitUserTag = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 获取某渠道下所有的画像
export const getGroupPortrait = {
  request(params) {
    return params;
  },
  response(data) {
    if (data.Result.data.length) {
      data.Result.data = data.Result.data.map(item => {
        item.portraitId = String(item.portraitId);
        return item;
      });
    }
    return data;
  }
};
