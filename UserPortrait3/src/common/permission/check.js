/**
 * 过滤动态路由
 * @param  {Array} allRoutes 全局路由定义
 * @param  {Array} routeKeys 页面权限集合
 * @param  {Array} btnKeys 按钮权限集合
 */
export function filterPermissionRouters(allRoutes, allKeys) {
  function _filetrFn(_allRoutes) {
    // 递归调用过滤
    return _allRoutes.filter(item => {
      if (item.subRoute && item.subRoute.length) {
        item.subRoute = _filetrFn(item.subRoute)
      }
      if (
        item.meta &&
        item.meta.permissions &&
        item.meta.permissions.length
      ) {
        item.meta.permissions = item.meta.permissions.filter(
          itemChild => {
            return itemChild.code ? allKeys.btnKeys.includes(itemChild.code) : true
          }
        )
      }
      return item.code ? allKeys.routeKeys.includes(item.code) : true
    })
  }
  return _filetrFn(allRoutes)
}
/**
 * 判断有无首页的情况下，访问权限路由判断
 * @param  {Array} routeKeys 页面权限集合
 * @param  {Array} arr 路由集合
 * @return {Array} arr 有首页场景下返回权限路由集合，无首页场景下，返回权限路由第一个页面作为首页的路由集合
 */
// function filterNoHomeRouters(routeKeys, arr) {
//   // 无首页权限场景下 默认访问权限路由里的第一个页面
//   if (!routeKeys.includes('Home') || !routeKeys.includes('HomeIndex')) {
//     let _index = 0
//     let flag = arr.some((item, index) => {
//       _index = index
//       return item.subRoute && item.subRoute.length > 0
//     })
//     if (flag) {
//       arr.push({
//         path: '',
//         redirect: arr[_index].path + '/' + arr[_index].subRoute[0].path
//       })
//     }
//   }
//   return arr
// }

/**
 * 过滤权限数组
 * @param  {Array} arr 接口返回data数据
 * @return {Object} obj  返回过滤以后的权限数组对象
 */
export function filterPermission(arr) {
  const obj = {
    routeKeys: [],
    btnKeys: [],
    dataKeys: []
  }
  function _filterFnArr(arr) {
    arr.map(item => {
      if (item.rightId) {
        if (
          item.levelSort &&
          ~~item.levelSort === 1 &&
          !(item.rightId === 'UserPortraitSystem')
        ) {
          // 非用户画像系统权限树
          return
        }
        if (item.rightRootId === 'DataPermission') {
          // 数据权限
          obj.dataKeys.push({
            name: item.rightName,
            code: item.rightId
          })
        } else {
          // 页面权限
          if (item.rightRootId === 'PagePermission') {
            obj.routeKeys.push(item.rightId)
          }
          if (item.rightId.includes(item.rightRootId)) {
            if (item.rightId.includes('_')) {
              // 按钮权限
              obj.btnKeys.push(item.rightId)
            } else {
              obj.routeKeys.push(item.rightId)
            }
          }
        }
      }
      item.authorityUserBeanList &&
        item.authorityUserBeanList.length > 0 &&
        _filterFnArr(item.authorityUserBeanList)
    })
  }
  _filterFnArr(arr)
  return obj
}
