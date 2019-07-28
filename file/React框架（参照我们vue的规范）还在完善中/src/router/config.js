/*eslint-disable*/
import Loadable from 'react-loadable'
import DelayLoading from '@/components/DelayLoading'

const Home         = Loadable({loader: () => import(/* webpackChunkName: "Home" */ '@/pages/Home'), loading: DelayLoading, delay:3000})
const CardPage         = Loadable({loader: () => import(/* webpackChunkName: "CardPage" */ '@/pages/CardPage'), loading: DelayLoading, delay:3000})

export default [{
    name: '首页',
    path: '/home',
    icon: 'home',
    component: Home
},{
    name: '卡片',
    path: '/card',
    icon: 'mail',
    component: CardPage
}]
