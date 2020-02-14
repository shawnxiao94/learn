import * as api from "@/data/api/Permission"
// import { getStorage } from "@common/utils/auth";
import * as constants from "./constants"

const setPermission = (permission) => ({
  type: constants.SET_PERMISSION,
  permission,
})

export const getPermissionFn = (token) => (dispatch) => {
  api.getPermission({ token }).then((res) => {
    if (res) {
      dispatch(setPermission(res[0]))
      // eslint-disable-next-line no-console
      console.log("获取权限成功")
    } else {
      // eslint-disable-next-line no-alert
      alert("获取权限失败")
    }
  })
}
