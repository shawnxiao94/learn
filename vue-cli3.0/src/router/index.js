// 加载vue模块
import Vue from "vue";
// 加载vue-router
import Router from "vue-router";
// 导入全局vue路由
const _import = file => () => import("@/pages/" + file + ".vue");
// 使用Router
Vue.use(Router);

// 配置路由
export const constantRouterMap = [
  { path: "/login", component: _import("Login/index") },
  { path: "/404", component: _import("Error/404") },
  { path: "/403", component: _import("Error/403") }
];

// 创建router
export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (!from.meta.noCache) {
        from.meta.savedPosition =
          document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageYoffset;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  },
  routes: constantRouterMap
});

// 全局路由定义
export const asyncRouterMap = [
  {
    path: "",
    component: _import("Layout/index"),
    redirect: "home",
    name: "Home",
    meta: {
      title: "首页",
      icon: "",
      sort: "",
      noCache: true
    },
    children: [
      {
        path: "home",
        component: _import("Home/index"),
        name: "HomeIndex",
        meta: {
          title: "首页",
          icon: "layout-aside-home",
          sort: "",
          noCache: true,
          permissionss: [{ name: "查询", code: "HomeIndex_search" }]
        }
      }
    ]
  },
  {
    path: "/userPortrait",
    component: _import("Layout/index"),
    name: "UserPortrait",
    redirect: "/userPortrait/groupPortrait",
    meta: {
      title: "用户画像",
      icon: "layout-aside-userportrait",
      sort: "",
      noCache: true
    },
    children: [
      {
        path: "groupPortrait",
        component: _import("UserPortrait/GroupPortrait/index"),
        name: "UserPortraitGroupPortrait",
        meta: {
          title: "群体画像",
          icon: "layout-aside-userportrait",
          sort: "",
          noCache: true,
          permissions: [
            { name: "查询", code: "UserPortraitGroupPortrait_search" }
          ]
        }
      },
      {
        path: "groupBehavior",
        component: _import("UserPortrait/GroupBehavior/index"),
        name: "UserPortraitGroupBehavior",
        meta: {
          title: "群体行为分析",
          icon: "",
          sort: "",
          noCache: true,
          permissions: [
            { name: "查询", code: "UserPortraitGroupBehavior_search" }
          ]
        }
      },
      {
        path: "unitPortrait",
        component: _import("UserPortrait/UnitPortrait/index"),
        name: "UserPortraitUnitPortrait",
        meta: {
          title: "个体画像",
          icon: "",
          sort: "",
          noCache: true,
          permissions: [
            { name: "查询", code: "UserPortraitUnitPortrait_search" }
          ]
        }
      },
      {
        path: "unitBehavior",
        component: _import("UserPortrait/UnitBehavior/index"),
        name: "UserPortraitUnitBehavior",
        meta: {
          title: "个体行为分析",
          icon: "",
          sort: "",
          noCache: true,
          permissions: [
            { name: "查询", code: "UserPortraitUnitBehavior_search" }
          ]
        }
      }
    ]
  },
  {
    path: "/labelManage",
    component: _import("Layout/index"),
    name: "LabelManage",
    redirect: "/labelManage/userLabel",
    meta: {
      title: "标签管理",
      icon: "layout-aside-label",
      sort: "",
      noCache: true
    },
    children: [
      {
        path: "userLabel",
        component: _import("LabelManage/UserLabel/index"),
        name: "LabelManageUserLabel",
        meta: {
          title: "标签管理",
          icon: "layout-aside-label",
          sort: "",
          noCache: true,
          permissions: [
            { name: "查询", code: "LabelManageUserLabel_search" },
            { name: "新增", code: "LabelManageUserLabel_add" },
            { name: "编辑", code: "LabelManageUserLabel_update" },
            { name: "失效", code: "LabelManageUserLabel_lose" },
            { name: "查看详情", code: "LabelManageUserLabel_detail" },
            { name: "共享", code: "LabelManageUserLabel_share" },
            { name: "编辑共享", code: "LabelManageUserLabel_editShare" }
          ]
        }
      }
    ]
  },
  {
    path: "/portraitManage",
    component: _import("Layout/index"),
    name: "PortraitManage",
    redirect: "/portraitManage/userPortrait",
    meta: {
      title: "画像管理",
      icon: "",
      sort: "",
      noCache: true
    },
    children: [
      {
        path: "userPortrait",
        component: _import("PortraitManage/UserPortrait/index"),
        name: "PortraitManageUserPortrait",
        meta: {
          title: "画像管理",
          icon: "layout-aside-portmanage",
          sort: "",
          noCache: true,
          permissions: [
            { name: "查询", code: "PortraitManageUserPortrait_search" },
            { name: "新增", code: "PortraitManageUserPortrait_add" },
            { name: "编辑", code: "PortraitManageUserPortrait_update" },
            { name: "失效", code: "PortraitManageUserPortrait_lose" },
            { name: "删除", code: "PortraitManageUserPortrait_delete" }
          ]
        }
      }
    ]
  },
  {
    path: "/systemManage",
    component: _import("Layout/index"),
    name: "SystemManage",
    redirect: "/systemManage/userManage",
    meta: {
      title: "系统管理",
      icon: "layout-aside-system",
      sort: "",
      noCache: true
    },
    children: [
      {
        path: "userManage",
        component: _import("SystemManage/UserManage/index"),
        name: "SystemManageUserManage",
        meta: {
          title: "人员管理",
          icon: "",
          sort: "",
          noCache: true,
          permissions: [
            { name: "查询", code: "SystemManageUserManage_search" },
            { name: "新增", code: "SystemManageUserManage_add" }
          ]
        }
      },
      {
        path: "logManage",
        component: _import("SystemManage/LogManage/index"),
        name: "SystemManageLogManage",
        meta: {
          title: "日志管理",
          icon: "",
          sort: "",
          noCache: true,
          permissions: [{ name: "查询", code: "SystemManageLogManage_search" }]
        }
      },
      {
        path: "labelTag",
        component: _import("SystemManage/LabelTag/index"),
        name: "SystemManageLabelTag",
        meta: {
          title: "标签类别管理",
          icon: "",
          sort: "",
          noCache: true,
          permissions: [
            { name: "新增", code: "SystemManageLabelTag_add" },
            { name: "编辑", code: "SystemManageLabelTag_update" },
            { name: "删除", code: "SystemManageLabelTag_del" }
          ]
        }
      }
    ]
  },
  { path: "*", redirect: "/404" }
];
