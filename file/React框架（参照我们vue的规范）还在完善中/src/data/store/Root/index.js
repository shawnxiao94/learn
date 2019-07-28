import { observable, action } from 'mobx'

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
