import { observable, action, configure } from 'mobx'
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
        name: ''
    }
    @action updateName = name => {
        this.userInfo.name = name
    }
    @observable loading = false
    @action setLoading = boolean => {
        this.loading = boolean
    }
}

export default new Root()
