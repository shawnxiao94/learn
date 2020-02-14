/**
  * description: 获取用户信息拦截
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import { observable, action, configure } from 'mobx'
import { getUserInfoByAccount } from '@/data/api/Permission'
import { loginOut } from '@/common/permission/auth'
/**
 * 严格模式，不允许action以外的任何操作直接非法修改store仓库数据
 * "never" (默认): 可以在任意地方修改状态
 * "observed": 在某处观察到的所有状态都需要通过动作进行更改。在正式应用中推荐此严格模式。
 * "always": 状态始终需要通过动作来更新(实际上还包括创建)。
 * @see https://cn.mobx.js.org/refguide/api.html#enforceactions
 */
configure({ enforceActions: 'observed' })
class Root {
    @observable userInfo = {
      // 渠道
      sysId: 'center',
      userId: '',
      email: '',
      role: '',
      mobile: '',
      userName: '',
      job: '',
      createdBy: '',
      createdDate: '',
      updateDate: '',
      updatedBy: ''
    }
    /**
     * 获取用户信息
     */
    @action getCasUserName() {
      return new Promise((resolve, reject) => {
        // sysId 系统ID
        getUserInfoByAccount({ sysId: this.userInfo.sysId })
          .then(res => {
            this.userInfo = res
            resolve()
          })
          .catch(res => {
            if (res.data.Result.errCode === -100001) {
              // 获取信息失败暂时走注销登录
              loginOut()
            }
            reject(res)
          })
      })
    }

    @observable loading = false
    @action setLoading = bool => {
      this.loading = bool
    }
}

export default new Root()
