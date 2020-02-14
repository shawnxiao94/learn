import { observable, action, configure, runInAction } from 'mobx'
/**
 * 获取所有来源API
 */
import * as api from '@/modules/UserPortrait/data/api/common'
configure({ enforceActions: 'observed' })
/**
 * api相关数据仓库
 */
class PagesApi {
  // 所有来源
  @observable FromSelect = []
  @action getFromSelect = () => {
    return new Promise((resolve, reject) => {
      /**
       * 获取所有来源API
       */
      api.getFromSelect()
        .then(res => {
          /**
           * 特别注意异步action要用runInAction更新数据，否则页面observer监听不到数据变化
           */
          runInAction(
            () => {
              this.FromSelect = res
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

export default new PagesApi()
