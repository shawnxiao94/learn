import axios from "@/common/axios/"
import * as model from "./model"

// 获取权限接口
export function getPermission(params) {
  return axios({
    url: "/permission",
    method: "post",
    model: model.permission,
    params,
  })
}
