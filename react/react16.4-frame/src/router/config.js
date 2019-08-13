import Loadable from 'react-loadable'
import DelayLoading from '@/components/DelayLoading'

export const ErrorPage403 = Loadable({
  loader: () => import('@pages/ErrorPage/403'),
  loading: DelayLoading, delay:3000
})
export const Login = Loadable({
  loader: () => import('@pages/Login'),
  loading: DelayLoading, delay:3000
});
export const ErrorPage404 = Loadable({
  loader: () => import('@pages/ErrorPage'),
  loading: DelayLoading, delay:3000
});

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