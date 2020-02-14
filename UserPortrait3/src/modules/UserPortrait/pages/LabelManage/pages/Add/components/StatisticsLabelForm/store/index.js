import { observable, action, configure, runInAction } from 'mobx'
/**
 * 获取表达式字段列表API
 */
import * as api from '@/modules/UserPortrait/data/api/LabelManage/Add/StatisticsLabelForm'
configure({ enforceActions: 'observed' })
/**
 * 统计型标签新增编辑表单相关数据仓库
 */
class PagesLabelManageStatisticsLabel {
  // 表达式字段列表
  @observable operationCharacters = []
  @action getOperationCharacters = () => {
    return new Promise((resolve, reject) => {
      /**
       * 获取表达式字段列表API
       */
      api.getOperationCharacters()
        .then(res => {
          /**
           * 特别注意异步action要用runInAction更新数据，否则页面observer监听不到数据变化
           */
          runInAction(
            () => {
              this.operationCharacters = res
              resolve(res)
            }
          )
        })
        .catch(res => {
          reject(res)
        })
    })
  }
  
  // 表达式字段/值列表
  @observable codeTablesByPropertyCodes = {}
  @action getCodeTablesByPropertyCode = propertyCode => {
    return new Promise((resolve, reject) => {
      /**
       * 获取表达式字段/值列表API
       */
      api.getCodeTablesByPropertyCode({ propertyCode })
        .then(res => {
          /**
           * 特别注意异步action要用runInAction更新数据，否则页面observer监听不到数据变化
           */
          runInAction(
            () => {
              this.codeTablesByPropertyCodes[propertyCode] = res
              resolve(res)
            }
          )
        })
        .catch(res => {
          reject(res)
        })
    })
  }
  
  // 行业数据
  @observable industryList
  @action getFindIndustryList = () => {
    return new Promise((resolve, reject) => {
      /**
       * 获取行业数据
       */
      api.getFindIndustryList()
        .then(res => {
          /**
           * 特别注意异步action要用runInAction更新数据，否则页面observer监听不到数据变化
           */
          runInAction(
            () => {
              this.industryList = res
              resolve(res)
            }
          )
        })
        .catch(res => {
          reject(res)
        })
    })
  }
}

export default new PagesLabelManageStatisticsLabel()
