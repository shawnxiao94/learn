import Loadable from 'react-loadable'
import DelayLoading from '@/components/DelayLoading'

export const ErrorPage403 = Loadable({
  loader: () => import('@pages/ErrorPage/403'),
  loading: DelayLoading,
  delay: 3000
})
export const Login = Loadable({
  loader: () => import('@pages/Login'),
  loading: DelayLoading,
  delay: 3000
})
export const NotFound = Loadable({
  loader: () => import('@pages/ErrorPage'),
  loading: DelayLoading,
  delay: 3000
})

const Home = Loadable({
  loader: () => import('@pages/Home'),
  loading: DelayLoading,
  delay: 3000
})
const News = Loadable({
  loader: () => import('@pages/News'),
  loading: DelayLoading,
  delay: 3000
})
const NewsDetail = Loadable({
  loader: () => import('@pages/News/NewsDetail'),
  loading: DelayLoading,
  delay: 3000
})

export const asyncRouterMap = [
  {
    name: 'Home',
    path: '/app/home',
    meta: {
      title: '首页',
      icon: '',
      hidden: false,
      cache: false
    },
    component: Home
  },
  {
    name: 'News',
    path: '/app/news',
    meta: {
      title: '新闻列表',
      icon: '',
      hidden: false,
      cache: false
    },
    component: News,
    children: [
      {
        name: 'NewsDetail',
        path: '/app/news/:id',
        meta: {
          title: '新闻详情',
          icon: '',
          hidden: true,
          cache: false
        },
        component: NewsDetail
      }
    ]
  }
]
