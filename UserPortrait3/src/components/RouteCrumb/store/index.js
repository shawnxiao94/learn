import { observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' })
class RouteCrumb {
    @observable crumbs = []
    @action addCrumbs = item => {
      this.crumbs.push(item)
    }
    @action moveToCrumb = item => {
      let _index = this.crumbs.findIndex(a => {
        return a.title === item.title
      })
      let crumbs = this.crumbs.slice(0, _index)
      crumbs.push(item)
      this.crumbs = crumbs
    }
    @action replaceCrumb = item => {
      this.crumbs.pop()
      this.crumbs.push(item)
    }
    @action clearCrumbs = () => {
      this.crumbs = []
    }
    @action setLabel = label => {
      this.crumbs = this.crumbs.map((item, index) => {
        if (index === this.crumbs.length - 1) {
          item.title = label
        }
        return item
      })
    }
}

export default new RouteCrumb()
