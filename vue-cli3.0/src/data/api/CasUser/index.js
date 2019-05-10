import axiosAPI from "@/common/utils/axiosAPI";
import * as model from "./model";

// 获取菜单列表
export function getCasUserName(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/SystemRoleCenterOpenService/getUserInfoByAccount",
    "post",
    model.getCasUser,
    params
  );
}
// 检测token帐号是否合法
export function checkTokenAccout(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST + "/SystemRoleCenterOpenService/checkAccount",
    "post",
    null,
    params
  );
}
