export const labelList = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 获取某渠道下所有的画像
export const queryPortraitBySource = {
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

// 查询来源
export const querySource = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};
export const getContactAnalysis = {
  request(params) {
    return {
      sourceActivityStatisticalReq: params
    };
  },
  response(data) {
    let _month = [];
    let _data = data.Result.data;
    let _arr = [];
    let _titleList = [];
    let _titleNameList = [];
    if (_data && _data.length) {
      let sourceLength = _data.length;
      _data[0].data.forEach(m => {
        _month.push(m.moth);
      });
      _data[0].data.forEach(b => {
        let monthData = [];
        _data.forEach(c => {
          _month.forEach(m => {
            if (b.moth === m) {
              let d = c.data.find(item => {
                if (item.moth === m) {
                  return true;
                }
              });
              if (d) {
                if (d.datahover.length) {
                  d.datahover = d.datahover.map(e => {
                    e.name = e.activityName;
                    e.hoverData = [
                      `参与人数：${e.attendance}人`,
                      `订单数：${e.orderCount}`,
                      `成交订单数：${e.payOrderCount}`,
                      `页面停留时间：${e.stateTime}s`
                    ];
                    return e;
                  });
                }
                if (_titleList.length < sourceLength) {
                  _titleList.push(c.data[0].datahover[0].sourceCode);
                  _titleNameList.push(c.data[0].datahover[0].sourceName);
                }
                monthData.push({
                  sourceCode: c.data[0].datahover[0].sourceCode,
                  data: d.datahover
                });
              } else {
                monthData.push({ sourceCode: "", data: [] });
              }
            }
          });
        });
        _arr.unshift({ name: b.moth, data: monthData });
      });
    }
    return {
      title: "日期",
      data: _arr,
      titleList: _titleList,
      titleNameList: _titleNameList
    };
  }
};

export const getUserBehavior = {
  request(params) {
    return {
      portraitGroupReq: {
        startDate: params.form.portraitGroup.startTime,
        endDate: params.form.portraitGroup.endTime,
        requestDateType: params.form.portraitGroup.requestDateType,
        sourceId: params.form.portraitGroup.source.toString(),
        portraitId: params.form.portraitGroup.portraitId.toString() || ""
      }
    };
  },
  response(data) {
    let _ = data.Result.data;
    // 判断返回的是否有数据
    if (_.length > 0) {
      let result = _.map(item => {
        return {
          name: item.name,
          data: item.data.map(i => {
            return [
              i.date,
              i.round + 5,
              i.dat ? i.dat.length : 0,
              i.dat ? i.dat : []
            ];
          })
        };
      });

      // 判断每条数据是否为空
      // let resLength = 0
      // result.forEach(item => {
      //   resLength += item.data[0][3].length
      // })
      // if (resLength > 0) {
      return {
        data: result
      };
      // } else {
      //   return {
      //     data: {
      //       userBehaviors: []
      //     }
      //   }
      // }
    } else {
      return {
        data: {
          userBehaviors: []
        }
      };
    }
  }
};
export const getWaterEcharts = {
  request(params) {
    return {
      portraitGroupReq: {
        startDate: params.portraitGroup.startTime,
        endDate: params.portraitGroup.endTime,
        sourceId: params.portraitGroup.source,
        portraitId: params.portraitGroup.portraitId
      }
    };
  },
  response(data) {
    let dataJson = [];
    let errorResult = { errMsg: "" };
    if (data.Result.data) {
      dataJson = data.Result.data;
    } else {
      errorResult.errMsg = data.Result.errMsg;
      dataJson = errorResult;
    }
    return dataJson;
  }
};
