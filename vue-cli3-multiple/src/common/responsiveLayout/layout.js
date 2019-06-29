/**
 * @see 适配layout
 *   */
import store from "@/data/store";
export default class Layout {
  // 构造函数
  constructor(parent) {
    this.parent = parent;
    this.run();
  }
  // run
  run() {
    // remove resize
    this.clearWindowResize();
    // window resize
    this.windowResize();
    // 监听浏览器宽度，如果小于1200px则收起侧边栏，小于768px则隐藏侧边栏
    this.mediaForSidebar();
  }
  // window resize
  windowResize() {
    // 监听浏览器宽度，如果小于1200px则收起侧边栏，小于768px则隐藏侧边栏
    window.addEventListener("resize", this.mediaForSidebar.bind(this));
  }
  // remove resize
  clearWindowResize() {
    // 监听浏览器宽度，如果小于1200px则收起侧边栏，小于768px则隐藏侧边栏
    window.removeEventListener("resize", this.mediaForSidebar.bind(this));
  }
  // 监听浏览器宽度，如果小于1200px则收起侧边栏，小于768px则隐藏侧边栏
  mediaForSidebar(e) {
    if (e && e.dispatchEvent) {
      return;
    }
    if (this.parent.options.clientType === "ipad") {
      store.dispatch("SetSideBar", 0);
    } else if (this.parent.options.clientType === "pc") {
      store.dispatch("SetSideBar", 1);
    }
  }
}
