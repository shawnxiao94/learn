/*eslint-disable*/
import Loadable from 'react-loadable'
import DelayLoading from '@/components/Loading/DelayLoading'
/**
 * cache组件缓存，采用react-live-route插件
 * @param livePath {String} 缓存去向页面
 * @param alwaysLive {Boolean} 是否一直缓存
 * @param onHide {Function} 离开时钩子
 * @param onReappear {Function} 再次回来时钩子
 * @param forceUnmount {Function} 强制注销缓存钩子
 * eg:
    onReappear={(location, match, livePath, alwaysLive) => {
        console.log('[on reappear]')
        console.log(routeState)
    }}
    onHide={(location, match, livePath, alwaysLive) => {
        console.log('[on hide]')
    }}
    forceUnmount={(location, match)=> match.params.id === 27}
 * @description 特别注意，由于搭配react-loadable懒加载，缓存页面需要设置ensureDidMount钩子，不然会导致双页面同时加载出来
 * eg:
    componentDidMount() {
        this.props.ensureDidMount()
    }
 * @description 缓存面包屑实现思路
 * eg:
    cache: {
        alwaysLive: true,
        forceUnmount(location,match){
            return location.pathname!=='/home'&&location.pathname!=='/card'&&location.pathname!=='/detail'
        }
    }
 */

const Home         = Loadable({loader: () => import(/* webpackChunkName: "Home" */ '@/modules/Demo/pages/Home'), loading: DelayLoading, delay:3000})
const FormPage         = Loadable({loader: () => import(/* webpackChunkName: "FormPage" */ '@/modules/Demo/pages/FormPage'), loading: DelayLoading, delay:3000})
const List         = Loadable({loader: () => import(/* webpackChunkName: "List" */ '@/modules/Demo/pages/List'), loading: DelayLoading, delay:3000})
const Login         = Loadable({loader: () => import(/* webpackChunkName: "Login" */ '@/modules/common/pages/Login'), loading: DelayLoading, delay:3000})

export default [{
    name: '首页',
    path: '/',
    exact: true,
    icon: 'home',
    component: Home
},{
    name: '列表',
    path: '/list',
    icon: 'border-left',
    subRoute:[{
        name: '主列表',
        path: '/index',
        component: List,
        cache: {
            alwaysLive: true,
            forceUnmount(location,match){
                return location.pathname!=='/list/index/detail'
            }
        }
    }]
},{
    name: '表单页面',
    path: '/form',
    icon: 'radius-upright',
    component: FormPage
},{
    name: '登陆页面',
    path: '/login',
    icon: 'stock',
    component: Login
}]
