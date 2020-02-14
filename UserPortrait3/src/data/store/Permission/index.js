/**
  * description: 权限控制
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import { observable, action, configure } from 'mobx'
import { getAllAuthorityTree } from '@/data/api/Permission'
import { filterPermission } from '@/common/permission/check'
configure({ enforceActions: 'observed' })
class Permission {
    /**
     * 获取权限
     * routeKeys 页面权限
     * btnKeys   按钮权限
     * dataKeys  数据权限
     */
    @observable allKeys = {}
    /**
     * 当前登录归属渠道
     */
    @observable loginedChannel = {}

    @action getAllkeys = () => {
      return new Promise((resolve, reject) => {
        getAllAuthorityTree()
          .then(res => {
            /**
             * 获取所有权限
             */
            this.allKeys = filterPermission(res.Result.data)
            const _dataKeys = this.allKeys.dataKeys
            this.loginedChannel = _dataKeys.length > 1 ? { name: '集团', code: '00' } : _dataKeys[0]
            resolve()
          })
          .catch(res => {
            reject(res)
          })
      })
    }

    /**
     * 判断权限获取情况
     * @param {Boolean} loading    页面权限加载中
     * @param {Boolean} isGetReady 页面是否加载成功
     */
    @observable loading = true
    @observable isGetReady = false
    @action setLoading = (loading, isGetReady) => {
      this.loading = loading
      if (isGetReady) {
        this.isGetReady = isGetReady !== 'notReady'
      } else {
        this.isGetReady = !loading
      }
    }
}
export default new Permission()
