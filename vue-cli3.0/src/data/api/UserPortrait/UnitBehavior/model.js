export const getContactAnalysis = {
  request(params) {
    return params;
  },
  response(data) {
    let _titleList = [];
    let _titleNameList = [];
    let _data = data.Result.data;
    _data.xAxis.forEach(item => {
      _titleList.push(item.sourceCode);
      _titleNameList.push(item.sourceName);
    });
    data.Result.data = _data.result.map(a => {
      let _channelList = [];
      a.name = a.time;
      a.data = a.data.map(b => {
        _channelList.push(b.sourceCode);
        b.data = b.operation.map(c => {
          c.name = c.operationName;
          return c;
        });
        return b;
      });
      let _a = [];
      _data.xAxis.forEach(d => {
        if (_channelList.indexOf(d.sourceCode) < 0) {
          _a.push({
            sourceCode: d.sourceCode,
            sourceName: d.sourceName,
            data: []
          });
        } else {
          _a.push(
            a.data.find(item => {
              return item.sourceCode === d.sourceCode;
            })
          );
        }
      });
      a.data = _a;
      return a;
    });
    return {
      title: "日期",
      data: data.Result.data,
      titleList: _titleList,
      titleNameList: _titleNameList
    };
  }
};

export const getWaveGraphList = {
  request(params) {
    return params;
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

export const getPictureData = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

export const getUserBehaviorAnalysis = {
  request(params) {
    return {
      startTime: params.form.startTime,
      endTime: params.form.endTime,
      identificationType: params.form.identificationType,
      identificationValue: params.form.identificationValue
    };
  },
  response(data) {
    // let _ = (JSON.parse(data.Result.data) || {}).userBehaviors
    let _ = data.Result.data;
    // 判断返回的数据是否为空
    let length = 0;
    for (let i of _) {
      for (let k of i.data) {
        length += Number(k.dat.length);
      }
    }
    if (length) {
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
