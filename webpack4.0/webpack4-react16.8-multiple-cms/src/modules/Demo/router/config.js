/*
 * @Author: your name
 * @Date: 2020-01-03 10:55:24
 * @LastEditTime : 2020-01-03 14:05:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack4-react16.8-multiple-cms\src\modules\Demo\router\config.js
 */
import Loadable from "react-loadable"
import DelayLoading from "@/components/Loading/DelayLoading"

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ "@/modules/Demo/pages/Home"),
  loading: DelayLoading,
  delay: 3000,
})
const List = Loadable({
  loader: () => import(/* webpackChunkName: "List" */ "@/modules/Demo/pages/List"),
  loading: DelayLoading,
  delay: 3000,
})
const Login = Loadable({
  loader: () => import(/* webpackChunkName: "Login" */ "@/modules/Demo/pages/Login"),
  loading: DelayLoading,
  delay: 3000,
})
export const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */"@/modules/Demo/pages/NotFound"),
  loading: DelayLoading,
  delay: 3000,
})

export default [
  {
    name: "首页",
    path: "/",
    exact: true,
    icon: "home",
    component: Home,
  },
  {
    name: "列表",
    path: "/list",
    icon: "border-left",
    subRoute: [
      {
        name: "主列表",
        path: "/index",
        component: List,
        cache: {},
      },
    ],
  },
  {
    name: "登陆页面",
    path: "/login",
    icon: "stock",
    component: Login,
  },
]
