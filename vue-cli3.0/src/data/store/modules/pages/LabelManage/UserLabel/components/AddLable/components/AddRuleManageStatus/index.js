// 数据请求方法
import * as api from "@/data/api/LabelManage/UserLabel";

const getLabelRuleData = {
  state: {
    optionsData: {
      // 获取规则关系下拉
      labelRuleByCodeData: []
    }
  },
  mutations: {
    ADD_LABEL_CODE_DATAS: (state, arr) => {
      state.optionsData.labelRuleByCodeData[arr.type] = arr.data;
    }
  },
  actions: {
    // 根据选择字段 ---> 获取规则关系下拉
    GetLabelRuleByCodeAction({ commit, state }, type) {
      return new Promise((resolve, reject) => {
        if (
          state.optionsData.labelRuleByCodeData[type] &&
          state.optionsData.labelRuleByCodeData[type].length
        ) {
          resolve(state.optionsData.labelRuleByCodeData[type]);
        } else {
          api
            .getCodeTablesByCodeTableName({ propertyCode: type })
            .then(res => {
              commit("ADD_LABEL_CODE_DATAS", { type: type, data: res });
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        }
      });
    }
  }
};
export default getLabelRuleData;
