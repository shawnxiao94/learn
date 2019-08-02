import { observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' })
class RouteCrumb {
    @observable crumbs = []
    @action addCrumbs = item => {
        this.crumbs.push(item)
    }
    @action moveToCrumb = item => {
        let _index = this.crumbs.findIndex(a => {
            return a.key === item.key
        })
        this.crumbs = this.crumbs.slice(0, _index + 1)
    }
    @action clearCrumbs = () => {
        this.crumbs = []
    }
}

export default new RouteCrumb()
