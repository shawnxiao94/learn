/**
 * 页面子路由配置
 */
import Loadable from 'react-loadable'
import DelayLoading from '@/components/Loading/DelayLoading'

const Detail = Loadable({ loader: () => import(/* webpackChunkName: "ListIndexDetail" */ '@/modules/Demo/pages/List/pages/Detail'), loading: DelayLoading, delay: 3000 })
const DetailB = Loadable({ loader: () => import(/* webpackChunkName: "ListIndexDetailB" */ '@/modules/Demo/pages/List/pages/DetailB'), loading: DelayLoading, delay: 3000 })
const DetailC = Loadable({ loader: () => import(/* webpackChunkName: "ListIndexDetailC" */ '@/modules/Demo/pages/List/pages/DetailC'), loading: DelayLoading, delay: 3000 })

export default [
  {
    name: '子页面',
    path: '/list/index/detail',
    component: Detail
  },
  {
    name: '子页面B',
    path: '/list/index/detailb',
    component: DetailB
  },
  {
    name: '子页面C',
    path: '/list/index/detailc',
    component: DetailC
  }
]
