// 标签画像 - 标签列表
export const labelListModel = {
  request(params) {
    if (params.viewType !== "视图") {
      if (params.sortType === "descending") {
        params.sortType = "desc";
      } else {
        params.sortType = "asc";
      }
    }
    let response = {
      group: {
        sourceId: params.from ? params.from + "" : "",
        vagueName: params.blurSearch || "",
        pageNumber: params.pageNumber,
        sortName: params.sortName ? params.sortName : "",
        sortType: params.sortName ? params.sortType : "",
        pageSize: params.pageSize,
        tagTypes: params.tagSearch ? params.tagSearch : "",
        isOpenStatus: params.isOpenStatus ? params.isOpenStatus : ""
      }
    };
    return response;
  },
  response(data) {
    return {
      data:
        data.Result.data instanceof Object
          ? data.Result.data
          : JSON.parse(data.Result.data)
    };
  }
};

// 标签画像 - 来源下拉框
export const labelFromSelect = {
  request(params) {
    return params;
  },
  response(data) {
    return {
      data:
        data.Result.data instanceof Object
          ? data.Result.data
          : JSON.parse(data.Result.data)
    };
  }
};

// 递归标签数组，如果tags为空，则过滤去除
// function formatLabelTagsSelectData(_data, children) {
//   if (_data && _data.length) {
//     _data = _data.map(a => {
//       if (a[children].length < 1) {
//         delete a[children];
//       } else {
//         a[children] = formatLabelTagsSelectData(a[children], children);
//       }
//       return a;
//     });
//   } else {
//     _data = [];
//   }
//   return _data;
// }

// 标签画像 - 标签下拉框
export const labelTagsSelect = {
  request(params) {
    return params;
  },
  response(data) {
    let _data = JSON.parse(data.Result.data);
    return {
      data: _data
    };
  }
};

// 用户标签 - 规则列表（不分页）
export const tagRuleModel = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 新增标签
export const tagAddRuleModel = {
  request(params) {
    if (params.tagDto.tagType === "statistical") {
      // 多个表达式
      params.list = params.list.map(a => {
        a.tagRuleExpressions.map(t => {
          // 包含Name
          var expressionValueArray = [];
          if (
            t.operatorType === "String" &&
            (t.expressionLogicSymbol === "IN" ||
              t.expressionLogicSymbol === "NOTIN")
          ) {
            t.expressionArray.map(h => {
              t.ruleValueOpt1.map(y => {
                if (h === y.code) {
                  expressionValueArray.push(y.name);
                }
                return y;
              });
              return h;
            });
            t.expressionValueName = expressionValueArray.join(";");
          }
          return t;
        });
        // 新增表达式
        a.tagRuleExpressions = a.tagRuleExpressions.map((b, index) => {
          delete b.rulePropertyOpt;
          delete b.list;
          delete b.states;
          delete b.ruleValueOpt1;
          delete b.ruleValueOpt2;
          b.groupFlag = b.groupFlag ? 1 : 0;
          b.sorted = index + 1;
          if (b.expressionLogicSymbol === "BETWEEN") {
            b.expressionValue = b.ruleValueFir + ";" + b.ruleValueLas;
            b.expressionValueName = b.expressionValue;
          }
          if (
            (b.operatorType === "int" || b.flagStatus === "register_time") &&
            (b.expressionLogicSymbol === "LE" ||
              b.expressionLogicSymbol === "LT" ||
              b.expressionLogicSymbol === "GE" ||
              b.expressionLogicSymbol === "GT" ||
              b.expressionLogicSymbol === "EQUAL" ||
              b.expressionLogicSymbol === "NE")
          ) {
            b.expressionValueName = b.expressionValue;
          }
          if (
            b.expressionLogicSymbol === "IN" ||
            b.expressionLogicSymbol === "NOTIN"
          ) {
            b.expressionValue = b.expressionArray.join(";");
          }
          delete b.ruleValueFir;
          delete b.ruleValueLas;
          delete b.expressionArray;
          if (a.tagRuleExpressions && a.tagRuleExpressions.length === 1) {
            delete b.expressionRelationSymbol;
            b.groupFlag = 0;
          }
          b.propertyCode = b.propertyCode[0] + "," + b.propertyCode[1];
          return b;
        });
        return a;
      });
    }
    params.tagDto.effDate = params.tagDto.lableBeginEndDate[0];
    params.tagDto.expDate = params.tagDto.lableBeginEndDate[1];

    return { tagAndRuleReq: params };
  },
  response(data) {
    return data;
  }
};

// 用户标签 - 修改标签
export const updateTagStatusModel = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 用户标签 - 修改状态
export const updateTagIsOpenModel = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 用户标签 - 查询详情
export const queryByTagIdModel = {
  request(params) {
    return params;
  },
  response(data) {
    if (data.Result.data.tagRuleDtos && data.Result.data.tagRuleDtos.length) {
      data.Result.data.tagRuleDtos = data.Result.data.tagRuleDtos.map(a => {
        if (a.tagRuleExpressions && a.tagRuleExpressions.length) {
          a.tagRuleExpressions = a.tagRuleExpressions
            .map(b => {
              if (
                b.expressionLogicSymbol === "IN" ||
                b.expressionLogicSymbol === "NOTIN"
              ) {
                b.expressionArray = b.expressionValue.split(";");
              } else if (
                b.expressionLogicSymbol === "EQUAL" ||
                b.expressionLogicSymbol === "NE"
                // eslint-disable-next-line no-empty
              ) {
              } else if (b.expressionLogicSymbol === "BETWEEN") {
                b.ruleValueFir = b.expressionValue.split(";")[0];
                b.ruleValueLas = b.expressionValue.split(";")[1];
              }
              b.groupFlag = !!Number(b.groupFlag);
              return b;
            })
            .sort((a, b) => {
              return a.sorted < b.sorted;
            });
        }
        return a;
      });
    }
    return data;
  }
};

// 详情中导入用户的历史记录列表数据
export const queryManualTagRecord = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 编辑标签
export const updateTagModel = {
  request(params) {
    // 表达式编辑页面
    if (params.tagDto.tagType === "statistical") {
      params.list = [];
      // params.list.map(a => {
      // 包含Name
      // var expressionValueArray = []
      // a.tagRuleExpressions.map((t, indext) => {
      //   if (t.operatorType === 'String' && (t.expressionLogicSymbol === 'IN' || t.expressionLogicSymbol === 'NOTIN')) {
      //     t.expressionArray.map((h, indexh) => {
      //       t.ruleValueOpt1.map((y, indexy) => {
      //         if (h === y.code) {
      //           expressionValueArray.push(y.name)
      //         }
      //         return y
      //       })
      //       return h
      //     })
      //     t.expressionValueName = expressionValueArray.join(';')
      //   }
      //   return t
      // })
      //   a.tagRuleExpressions = a.tagRuleExpressions.map((b, index) => {
      //     delete b.rulePropertyOpt
      //     delete b.list
      //     delete b.states
      //     delete b.ruleValueOpt1
      //     delete b.ruleValueOpt2
      //     b.groupFlag = b.groupFlag ? 1 : 0
      //     b.sorted = index + 1
      //     if (b.expressionLogicSymbol === 'BETWEEN') {
      //       b.expressionValue = b.ruleValueFir + ';' + b.ruleValueLas
      //       b.expressionValueName = b.expressionValue
      //     }
      //     if (b.expressionLogicSymbol === 'LE' || b.expressionLogicSymbol === 'LT' || b.expressionLogicSymbol === 'GE' || b.expressionLogicSymbol === 'GT' || b.expressionLogicSymbol === 'EQUAL' || b.expressionLogicSymbol === 'NE') {
      //       b.expressionValueName = b.expressionValue
      //     }
      //     if (b.expressionLogicSymbol === 'IN' || b.expressionLogicSymbol==='NOTIN') {
      //       b.expressionValue = b.expressionArray.join(';')
      //     }
      //     delete b.ruleValueFir
      //     delete b.ruleValueLas
      //     delete b.expressionArray
      //     if (a.tagRuleExpressions && a.tagRuleExpressions.length === 1) {
      //       delete b.expressionRelationSymbol
      //       b.groupFlag = 0
      //     }
      //     // else {
      //     //   if (a.tagRuleExpressions.length > 1 && a.tagRuleExpressions.length - 1 === index) {
      //     //     b.groupFlag = 0
      //     //   }
      //     // }
      //     if (b.propertyCode.length > 3) {
      //       var opCodee = b.propertyCode.split(',')
      //       b.propertyCode = opCodee[0] + ',' + opCodee[1]
      //     } else {
      //       b.propertyCode = b.propertyCode[0] + ',' + b.propertyCode[1]
      //     }
      //     return b
      //   })
      //   delete a.parentIds
      //   return a
      // })
    } else {
      delete params.type;
    }
    params.tagDto.effDate = params.tagDto.lableBeginEndDate[0];
    params.tagDto.expDate = params.tagDto.lableBeginEndDate[1];
    return { tagAndRuleReq: params };
  },
  response(data) {
    return data;
  }
};

// 用户标签 - 查询详情
export const queryportraitByTagId = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 获取规则关系列表
export const getRuleRelationList = {
  request(params) {
    return params;
  },
  response(data) {
    let dataJson = [];
    if (data.Result.data) {
      dataJson = data.Result.data;
    }
    return dataJson;
  }
};

// 根据规则属性获取规则值
export const getCodeTablesByCodeTableName = {
  request(params) {
    return params;
  },
  response(data) {
    let dataJson = [];
    if (data.Result.data) {
      dataJson = data.Result.data;
    }
    return dataJson;
  }
};

// 根据操作符id 获取所有的属性
export const getCodePropertiesByOcId = {
  request(params) {
    return params;
  },
  response(data) {
    let dataJson = [];
    if (data.Result.data) {
      dataJson = data.Result.data;
    }
    return dataJson;
  }
};

// 新增规则
export const saveTagRule = {
  request(params) {
    let tagRuleValue;
    let tagRuleValue3 = [];
    if (
      params.ruleRelation === "IN" ||
      params.expressionLogicSymbol === "NOTIN"
    ) {
      tagRuleValue = [];
      params.tagRuleValue.map(function(item) {
        tagRuleValue.push(item.name);
      });
      tagRuleValue.join(",");
    } else if (
      params.ruleRelation === "EQUAL" ||
      params.expressionLogicSymbol === "NE"
    ) {
      tagRuleValue = params.ruleValue2;
    } else if (params.ruleRelation === "BETWEEN") {
      tagRuleValue3 = [params.ruleValue3, params.ruleValue4];
    }
    return {
      tagRule: {
        // 规则名
        tagRuleName: params.name,
        // 规则值
        tagRuleValue:
          params.ruleRelation === "IN" ||
          params.expressionLogicSymbol === "NOTIN"
            ? tagRuleValue.join(",")
            : params.ruleRelation === "EQUAL"
            ? params.tagRuleValue2
            : tagRuleValue3.join(","),
        // 属性名
        propertyName: params.propertyName,
        // 属性code
        propertyCode: params.property,
        // 描述
        description: "add",
        // 创建者
        crtUser: "admin",
        // 创建时间
        crtDate: "",
        // 关系code
        characterCode: params.ruleRelationCode
      }
    };
  },
  response(data) {
    return data;
  }
};

// 标签共享查询
export const queryTagAndChannel = {
  request(params) {
    return params;
  },
  response(data) {
    if (data.Result.data.sourceDtos && data.Result.data.sourceDtos.length) {
      data.Result.data.sourceDtos = data.Result.data.sourceDtos.map(a => {
        // a.flag = Number(a.flag) === 1
        a.ifSelect = Number(a.ifSelect) === 1; // a.flag
        return a;
      });
    }
    return data;
  }
};

// 标签共享新增编辑
export const addShareChannel = {
  request(params) {
    let _params = {};
    if (params.sourceDtos && params.sourceDtos.length) {
      params.sourceDtos = params.sourceDtos.map(a => {
        a.ifSelect = a.ifSelect ? 1 : 0;
        // a.flag = a.flag ? 1 : 0
        return a;
      });
    }
    _params.tagShareReq = params;
    return _params;
  },
  response(data) {
    return data;
  }
};

// 选择 类别
export const labelTagModel = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 标签规则表达式预览
export const queryTagExpressionModel = {
  request(params) {
    params.tagRuleExpressions.map(a => {
      var expressionValueArray = [];
      if (
        a.operatorType === "String" &&
        (a.expressionLogicSymbol === "IN" ||
          a.expressionLogicSymbol === "NOTIN")
      ) {
        a.expressionArray.map(b => {
          a.ruleValueOpt1.map(c => {
            if (b === c.code) {
              expressionValueArray.push(c.name);
            }
            return c;
          });
          return b;
        });
        a.expressionValueName = expressionValueArray.join(";");
      }
      a.propertyCode = a.propertyCode[0] + "," + a.propertyCode[1];
      return a;
    });
    params.tagRuleExpressions = params.tagRuleExpressions.map((b, index) => {
      delete b.rulePropertyOpt;
      delete b.list;
      delete b.states;
      delete b.ruleValueOpt1;
      delete b.ruleValueOpt2;
      b.groupFlag = b.groupFlag ? 1 : 0;
      // b.propertyName = b.propertyName;
      // b.expressionValueName = b.expressionValueName;
      b.sorted = index + 1;
      if (b.expressionLogicSymbol === "BETWEEN") {
        b.expressionValue = b.ruleValueFir + ";" + b.ruleValueLas;
        b.expressionValueName = b.expressionValue;
      }
      if (
        (b.operatorType === "int" || b.flagStatus === "register_time") &&
        (b.expressionLogicSymbol === "LE" ||
          b.expressionLogicSymbol === "LT" ||
          b.expressionLogicSymbol === "GE" ||
          b.expressionLogicSymbol === "GT" ||
          b.expressionLogicSymbol === "EQUAL" ||
          b.expressionLogicSymbol === "NE")
      ) {
        b.expressionValueName = b.expressionValue;
      }
      if (
        b.operatorType === "String" &&
        (b.expressionLogicSymbol === "IN" ||
          b.expressionLogicSymbol === "NOTIN")
      ) {
        b.expressionValue = b.expressionArray.join(";");
      }
      if (
        b.flagStatus === "birthdate" &&
        (b.expressionLogicSymbol === "EQUAL" ||
          b.expressionLogicSymbol === "NE")
      ) {
        b.expressionValueName = b.expressionValue;
      }
      delete b.ruleValueFir;
      delete b.ruleValueLas;
      delete b.expressionArray;
      if (params.tagRuleExpressions && params.tagRuleExpressions.length === 1) {
        delete b.expressionRelationSymbol;
        b.groupFlag = 0;
      }
      //  else {
      //   if (params.tagRuleExpressions.length > 1 && params.tagRuleExpressions.length - 1 === index) {
      //     b.groupFlag = 0
      //   }
      // }
      return b;
    });
    return { expressionReq: { tagRuleExpressions: params.tagRuleExpressions } };
  },
  response(data) {
    return data;
  }
};

// 标签规则表达式预览
export const getOperationCharactersModel = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 手工型失效
export const loseEfficacyTagStatusModel = {
  request(params) {
    delete params.status;
    return params;
  },
  response(data) {
    return data;
  }
};

// 文件上传删除接口
export const delteUploadFileModel = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

// 标签画像 - 标签列表-查询用户数
export const clientTotalsListModel = {
  request(params) {
    let tagUserCounts = [];
    params.data.content.map(_item => {
      tagUserCounts.push({ id: _item.id, type: _item.tagType });
    });
    return { tagUserCounts: tagUserCounts };
  },
  response(data) {
    return data;
  }
};
