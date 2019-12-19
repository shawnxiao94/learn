import { loginOutCas } from "common/utils/auth";
import { addEvent } from "common/utils";

export function filterRouters (arr, routeKeysArr, btnPessionArr) {
  function _filetrFn (arr) {
    return arr.filter(item => {
      if (item.children && item.children.length) {
        item.children = _filetrFn(item.children);
        item.children = item.children.filter(_item => {
          if (
            _item.meta &&
            _item.meta.permissions &&
            _item.meta.permissions.length
          ) {
            _item.meta.permissions = _item.meta.permissions.filter(
              itemChild => {
                return btnPessionArr.includes(itemChild.code);
              }
            );
          }
          return routeKeysArr.includes(_item.name);
        });
      }
      return routeKeysArr.includes(item.name) || item.path === "*";
    });
  }
  return filterNoHomeRouters(routeKeysArr, _filetrFn(arr));
}
function filterNoHomeRouters (routeKeysArr, arr) {
  if (!routeKeysArr.includes("Home") || !routeKeysArr.includes("HomeIndex")) {
    let _index = 0;
    const flag = arr.some((item, index) => {
      _index = index;
      return item.children && item.children.length > 0;
    });
    if (flag) {
      let path = "";
      arr[_index].children.forEach(child => {
        if (child.meta && !child.meta.hidden) {
          path = child.path;
        }
      });
      arr.push({
        path: "",
        redirect: arr[_index].path + "/" + path
      });
    }
  }
  return arr;
}

export function filterPermission (arr) {
  const obj = {
    routerNameArr: [],
    btnPessionArr: [],
    dataPermissionArr: []
  };
  function _filterFnArr (arr) {
    arr.map(item => {
      if (item.rightId) {
        if (
          ~~item.levelSort === 1 &&
          !(item.rightId === "UserCenterApiSystem")
        ) {
          return;
        }
        if (item.rightRootId === "DataPermission") {
          obj.dataPermissionArr.push({
            name: item.rightName,
            code: item.rightId
          });
        } else {
          if (item.rightRootId === "PagePermission") {
            obj.routerNameArr.push(item.rightId);
          }
          if (item.rightId.includes(item.rightRootId)) {
            if (item.rightId.includes("_")) {
              obj.btnPessionArr.push(item.rightId);
            } else {
              obj.routerNameArr.push(item.rightId);
            }
          }
        }
      }
      item.authorityUserBeanList &&
        item.authorityUserBeanList.length > 0 &&
        _filterFnArr(item.authorityUserBeanList);
    });
  }
  _filterFnArr(arr);
  return obj;
}
export function getNowRouter (asyncRouterMap, to) {
  return asyncRouterMap.some(route => {
    if (to.path.indexOf(route.path) !== -1) {
      return true;
    } else if (route.children && route.children.length) {
      return getNowRouter(route.children, to);
    }
  });
}

/**
 * @param {Number} minute [分钟]
 */
export function listennerDocumentEvent (minute = 5) {
  let count = 0;
  // 监听鼠标
  addEvent(document, "mousemove", function () {
    count = 0;
  });
  addEvent(document, "click", function () {
    count = 0;
  });
  // 监听键盘
  addEvent(document, "keydown", function () {
    count = 0;
  });
  const timer = window.setInterval(listenFn, 1000);
  function listenFn () {
    count++;
    if (~~minute && ~~minute * 60 <= count) {
      clearInterval(timer);
      loginOutCas();
    }
  }
}
