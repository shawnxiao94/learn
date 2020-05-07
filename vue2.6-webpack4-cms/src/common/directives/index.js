import store from "data/store";
export default {
  // 是否有按钮权限判定
  btnPermission: {
    inserted (el, binding, vnode) {
      // 设置vnode key 强制更新指令
      vnode.key = Math.random()
        .toString()
        .replace("0.", "_");
      if (
        !store.getters.permission.btnPermissions.includes(binding.expression)
      ) {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          // ie11已经不支持document.all了，下面是支持ie11的版本的，当然ie6-8也是支持的
          el.parentNode.removeChild(el);
        } else {
          el.remove();
        }
      }
    }
  }
};
