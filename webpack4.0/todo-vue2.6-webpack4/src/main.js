import Vue from 'vue'
import App from './App.vue'

// PWA => 判断该浏览器支不支持 serviceWorker
if (process.env.envList.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          // eslint-disable-next-line no-console
          console.log("service-worker registed", registration);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log("service-worker registed error", error);
        });
    });
  }
} else {
  /**
   * 启动热加载
   */
  if (module.hot) {
    module.hot.accept();
  }
  // eslint-disable-next-line no-console
  console.log(process.env.NODE_ENV, process.env.envList);
}


// render
new Vue({
  // router,
  // store,
  // i18n,
  render(createElement) {
    return createElement(App)
  }
}).$mount('#app')