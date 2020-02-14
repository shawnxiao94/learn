/**
 * 页面子路由配置
 */
import Loadable from 'react-loadable'
import DelayLoading from '@/components/Loading/DelayLoading'

const Add = Loadable({ loader: () => import(/* webpackChunkName: "PortraitManageAdd" */ '../pages/Add'), loading: DelayLoading, delay: 3000 })
const Detail = Loadable({ loader: () => import(/* webpackChunkName: "PortraitManageDetail" */ '../pages/Detail'), loading: DelayLoading, delay: 3000 })
const Enjoy = Loadable({ loader: () => import(/* webpackChunkName: "PortraitManageEnjoy" */ '../pages/Enjoy'), loading: DelayLoading, delay: 3000 })

export default [
  {
    name: '新增',
    path: '/portrait-manage/add/:id?',
    component: Add
  },
  {
    name: '详情',
    path: '/portrait-manage/detail/:id',
    component: Detail
  },
  {
    name: '共享',
    path: '/portrait-manage/enjoy/:id',
    component: Enjoy
  }
]
