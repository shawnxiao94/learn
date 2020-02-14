/**
 * 遇到的问题
 * 由A页面跳转到B页面，B页面停留在A页面的位置，没有返回到顶部。
 *
 * 问题分析
 * 首先分析下出现此问题的原因： 在项目中使用的是 hashHistory，它是建立在 history 之上的，当路由发生变化时会记住原路由的状态，跳转新页面后默认停留在原页面的位置。
 *
 * 解决方法
 */
import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Config from '@/modules/UserPortrait/router/config'
@withRouter
class RouterScrollToTop extends Component {
  
  componentWillUpdate(nextProps) {
    if (this.props.location !== nextProps.location) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      let route = Config.find(item => item.path === this.props.location.pathname)
      if (route && route.cache) {
        route.cache.scrollTop = scrollTop
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      let scrollTop = 0
      let route = Config.find(item => item.path === this.props.location.pathname)
      if (route && route.cache && route.cache.scrollTop) {
        scrollTop = route.cache.scrollTop
      }
      window.scrollTo(0, scrollTop)
    }
  }
  render() {
    return this.props.children
  }
}
export default RouterScrollToTop
