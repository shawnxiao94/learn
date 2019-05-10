import axiosAPI from "@/common/utils/axiosAPI";
import * as model from "./model";

// 获取菜单列表
export function getPermissionList(params) {
  return axiosAPI(
    process.env.VUE_APP_ROLE_CENTER +
      "/SystemRoleCenterOpenService/getAllAuthorityTree",
    "post",
    model.getPermissionList,
    params
  );
}
