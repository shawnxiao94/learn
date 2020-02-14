// /*eslint-disable*/
import Loadable from 'react-loadable'
import DelayLoading from '@/components/Loading/DelayLoading'
/**
 * 缓存 首页
 * 标签页面路由
 */
import LabelManageRouter from '../pages/LabelManage/route/config'
/**
 * 缓存 首页
 * 画像页面路由
 */
import PortraitManageRouter from '../pages/PortraitManage/route/config'
/**
 * 缓存 首页
 * 用户群页面路由
 */
import GroupManageRouter from '../pages/GroupManage/route/config'
/**
 * 缓存 活动主页
 * 活动页面路由
 */
import ActivityManageRouter from '../pages/ActivityManage/route/config'
/**
 * 首页缓存
 * 跳转以下页面时缓存首页，以便以下页面返回时首页保持上次浏览状态
 */
// 标签列表缓存页面
let labelManage = LabelManageRouter.map(item => item.path)
// 画像列表缓存页面
let portraitManage = PortraitManageRouter.map(item => item.path)
// 用户群列表缓存页面
let groupManage = GroupManageRouter.map(item => item.path)
/**
 * 营销活动页面缓存
 * 跳转以下页面时缓存首页，以便以下页面返回时首页保持上次浏览状态
 */
// 活动相关页面缓存
let activityManage = ActivityManageRouter.map(item => item.path)
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

const Home = Loadable({ loader: () => import(/* webpackChunkName: "Home" */ '@/modules/UserPortrait/pages/Home'), loading: DelayLoading, delay: 3000 })
const MarketingActivity = Loadable({ loader: () => import(/* webpackChunkName: "MarketingActivity" */ '@/modules/UserPortrait/pages/MarketingActivity'), loading: DelayLoading, delay: 3000 })
const LabelManage = Loadable({ loader: () => import(/* webpackChunkName: "LabelManage" */ '@/modules/UserPortrait/pages/LabelManage'), loading: DelayLoading, delay: 3000 })
const PortraitManage = Loadable({ loader: () => import(/* webpackChunkName: "PortraitManage" */ '@/modules/UserPortrait/pages/PortraitManage'), loading: DelayLoading, delay: 3000 })
const GroupManage = Loadable({ loader: () => import(/* webpackChunkName: "GroupManage" */ '@/modules/UserPortrait/pages/GroupManage'), loading: DelayLoading, delay: 3000 })
const ActivityManage = Loadable({ loader: () => import(/* webpackChunkName: "ActivityManage" */ '@/modules/UserPortrait/pages/ActivityManage'), loading: DelayLoading, delay: 3000 })

export default [
  {
    name: '首页',
    path: '/',
    exact: true,
    icon: 'layout-userportrait',
    component: Home,
    cache: {
      livePath: [...labelManage, ...portraitManage, ...groupManage]
    }
  },
  {
    name: '营销活动',
    path: '/marketing-activity',
    icon: 'layout-marketing',
    component: MarketingActivity,
    cache: {
      livePath: [...activityManage]
    }
  },
  {
    name: '标签管理列表',
    path: '/label-manage',
    hidden: true,
    component: LabelManage
  },
  {
    name: '画像管理列表',
    path: '/portrait-manage',
    hidden: true,
    component: PortraitManage
  },
  {
    name: '用户群管理列表',
    path: '/group-manage',
    hidden: true,
    component: GroupManage
  },
  {
    name: '活动管理列表',
    path: '/activity-manage',
    hidden: true,
    component: ActivityManage
  }
]
