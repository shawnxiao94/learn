import { asyncRouterMap, constantRouterMap } from "@/router";
// 如果有权限功能，则对路由过滤
import * as api from "@/data/api/PermissionList";
import store from "@/data/store";
import { filterRouters, filterPermission } from "@/common/permission/check";

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    sideBarNavs: [],
    // 按钮权限
    btnPermissions: [],
    // 数据权限
    dataPermissionArr: []
  },
  mutations: {
    // 路由
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
    // 侧边栏菜单
    SET_SIDEBARNAVS: (state, sideBarNavs) => {
      state.sideBarNavs = sideBarNavs;
    },
    // 按钮权限
    SET_BTNPERMISSIONS: (state, btnPermissions) => {
      state.btnPermissions = btnPermissions;
    },
    // 数据权限
    SET_DATAPERMISSIONS: (state, DataPermissionArr) => {
      state.dataPermissionArr = DataPermissionArr;
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .getPermissionList({ sysId: store.getters.user.userInfo.sysId })
          .then(res => {
            let permissionObj = filterPermission(res.Result.data);
            // 页面权限集合
            let pageNameArr = permissionObj.routerNameArr;
            // 数据权限集合
            let DataPermissionArr = permissionObj.dataPermissionArr;
            // 按钮权限集合
            let btnNameArr = permissionObj.btnPessionArr;
            // 权限过滤后的路由
            let _asyncRouterMap = filterRouters(
              asyncRouterMap,
              pageNameArr,
              btnNameArr
            );
            // let _asyncRouterMap = asyncRouterMap
            commit("SET_ROUTERS", _asyncRouterMap);
            commit("SET_SIDEBARNAVS", _asyncRouterMap);
            commit("SET_BTNPERMISSIONS", btnNameArr);
            if (DataPermissionArr.length > 1) {
              store.dispatch("SetSourceChannel", { name: "集团", code: "00" });
              DataPermissionArr.unshift({ name: "集团", code: "00" });
            } else {
              store.dispatch("SetSourceChannel", DataPermissionArr[0]);
            }
            commit("SET_DATAPERMISSIONS", DataPermissionArr);
            resolve();
          })
          .catch(_ => {
            reject(_);
          });
      });
    }
  }
};

export default permission;
