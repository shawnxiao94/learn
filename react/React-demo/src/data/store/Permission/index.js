import { observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' })
class Permission {
    @observable keys = []
    @action setKeys = keys => {
        this.keys = keys
    }
}
export default new Permission()
