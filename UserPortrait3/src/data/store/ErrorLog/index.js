/**
 * 记录全局错误日志
 */
import { observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' })
class ErrorLog {
    // 记录错误日志次数，超过十次则只保留最新十条
    @observable index = 1
    // 存储错误日志数组
    @observable logs = []
    /**
     * 添加错误日志
     * @param {Object} log 当前错误对象
     */
    @action addErrorLog = log => {
      if (this.logs.length === 10) {
        this.logs.pop()
      }
      log.index = this.index++
      this.logs.unshift(log)
    }
}

export default new ErrorLog()
