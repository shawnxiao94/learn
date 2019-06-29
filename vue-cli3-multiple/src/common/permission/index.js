import router from "@/router";
import store from "@/data/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import {
  setToken,
  getToken,
  loginCas,
  loginOutCas,
  getQueryString
} from "@/common/utils/auth";
import { checkTokenAccout } from "@/data/api/CasUser";
import { MessageBox } from "element-ui";

NProgress.configure({ showSpinner: false });
router.beforeEach((to, from, next) => {
  NProgress.start();
  // setToken('Admin-Token', 'AT-1-Z8zpbiHQfLzAc5WON-QkiyUA6qYeRDLo', 172800000, 'bearer')
  if (getToken()) {
    runRouter();
  } else {
    if (getQueryString("access_token")) {
      // url 里有传token时
      setToken(
        null,
        getQueryString("access_token"),
        getQueryString("expires_in") * 1000,
        getQueryString("token_type")
      ).then(() => {
        runRouter();
      });
    } else {
      // 跳转登录认证
      loginCas();
    }
  }
  function runRouter() {
    if (store.getters.permission.addRouters.length === 0) {
      checkTokenAccout({ sysId: store.getters.user.userInfo.sysId })
        .then(() => {
          store
            .dispatch("GenerateRoutes")
            .then(() => {
              // 依token获取用户信息
              store
                .dispatch("GetCasUserName")
                .then(() => {
                  // 没有任何页面权限的时候
                  if (store.getters.permission.addRouters.length < 1) {
                    NProgress.done();
                    MessageBox({
                      message: "您没有任何页面访问权限，请联系管理员配置权限！",
                      showCancelButton: false,
                      confirmButtonText: "确定",
                      callback() {
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
                    callback() {}
                  });
                });
            })
            .catch(() => {
              NProgress.done();
              MessageBox({
                message: "获取菜单树失败！",
                showCancelButton: false,
                confirmButtonText: "确定",
                callback() {
                  loginOutCas();
                }
              });
            });
        })
        .catch(() => {
          NProgress.done();
          MessageBox({
            message: "账户检测失败！",
            showCancelButton: false,
            confirmButtonText: "确定",
            callback() {
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
  // 移动端适配关闭侧边栏
  if (store.getters.app.responsiveLayout.clientType === "mobile") {
    store.dispatch("SetMobileMenu", false);
  }
});
