/**
 * 页面子路由配置
 */
import Loadable from 'react-loadable'
import DelayLoading from '@/components/DelayLoading'

const Detail = Loadable({ loader: () => import(/* webpackChunkName: "ListIndexDetail" */ '@/pages/List/pages/Detail'), loading: DelayLoading, delay: 3000 })

export default [{
    name: '子页面',
    path: '/list/index/detail',
    component: Detail
}]
