//页面仓库
import pages from './modules/pages/index'
let pagesGetters = {}
Object.keys(pages).forEach(item => {
  pagesGetters[item] = state => state[item]
})
const getters = {
  app: state => state.app,
  permission: state => state.permission,
  user: state => state.user,
  mobileApp: state => state.mobileApp,
  ...pagesGetters
}
export default getters
