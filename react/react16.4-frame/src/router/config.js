import Loadable from 'react-loadable'
import DelayLoading from '@/components/DelayLoading'

const Home = Loadable({loader: () => import('@pages/Home'), loading: DelayLoading, delay:3000})
const Login = Loadable({loader: () => import('@pages/Login'), loading: DelayLoading, delay:3000})
const ErrorPage = Loadable({loader: () => import('@pages/ErrorPage'), loading: DelayLoading, delay:3000})

export default [
  {
    name: '首页',
    path: '/home',
    meta: {
      title: '首页',
      icon: '',
      hidden: false,
      cache: false
    },
    component: Home
  },
  {
    name: '登录',
    path: '/login',
    meta: {
      title: '登录',
      icon: '',
      hidden: false,
      cache: false
    },
    component: Login
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '找不到页面',
      icon: '',
      hidden: false,
      cache: false
    },
    component: ErrorPage
  }
]