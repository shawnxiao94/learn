import router from "router";
import store from "data/store";
import { Message, MessageBox } from "element-ui";
// progress bar
import NProgress from "nprogress";
// progress bar style
import "nprogress/nprogress.css";
import {
  setStorage,
  getStorage,
  getQueryString,
  loginOutCas
} from "common/utils/auth"; // get token from cookie
import getPageTitle from "../getPageTitle";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = []; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  setStorage(
    "Admin-Token",
    "AT-1-Z8zpbiHQfLzAc5WON-QkiyUA6qYeRDLo",
    172800000,
    "bearer"
  );
  document.title = getPageTitle(to.meta.title);
  const hasToken = getStorage();
  if (hasToken) {
    try {
      runRouter();
    } catch (error) {
      // 错误 重置token 跳转登录页
      // await store.dispatch('resetStorage')
      Message.error(error || "Has Error");
      // next(`/login?redirect=${to.path}`)
      NProgress.done();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (getQueryString("token")) {
        setStorage(null, getQueryString("token")).then(() => {
          runRouter();
        });
      } else {
        loginOutCas();
        // next(`/login?redirect=${to.path}`)
        NProgress.done();
      }
    }
  }
  function runRouter () {
    if (store.getters.permission.addRouters.length === 0) {
      store
        .dispatch("GenerateRoutes")
        .then(() => {
          store
            .dispatch("GetCasUserName")
            .then(() => {
              if (store.getters.permission.addRouters.length < 1) {
                NProgress.done();
                MessageBox({
                  message: "您没有任何页面访问权限，请联系管理员配置权限！",
                  showCancelButton: false,
                  confirmButtonText: "确定",
                  type: "error",
                  callback () {
                    loginOutCas();
                  }
                });
              } else {
                router.addRoutes(store.getters.permission.addRouters);
                next({ ...to, replace: true });
              }
            })
            .catch(() => {
              NProgress.done();
              MessageBox({
                message: "获取用户信息失败！",
                showCancelButton: false,
                confirmButtonText: "确定",
                type: "error",
                callback () {}
              });
            });
        })
        .catch(err => {
          NProgress.done();
          MessageBox({
            message:
              "获取菜单树失败:" + err.mesg ||
              (err.data && err.data.data) ||
              (err.data && err.data.mesg),
            showCancelButton: false,
            confirmButtonText: "确定",
            type: "error",
            callback () {
              loginOutCas();
            }
          });
        });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
