import Vue from "vue";
import store from "@/data//store";
Vue.config.errorHandler = function(err, vm, info) {
  Vue.nextTick(() => {
    store.dispatch("AddErrorLog", {
      err,
      vm,
      info,
      url: window.location.href
    });
    console.error(err, info);
  });
};
