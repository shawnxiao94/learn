import Loadable from 'react-loadable'
import DelayLoading from '@/components/DelayLoading'

const Home = Loadable({
  loader: () => import('@pages/Home'),
  loading: DelayLoading, delay:3000
})


export const asyncRouterMap = [
  {
    name: 'Home',
    path: '/home',
    meta: {
      title: '首页',
      icon: '',
      hidden: false,
      cache: false
    },
    component: Home
  }   
]