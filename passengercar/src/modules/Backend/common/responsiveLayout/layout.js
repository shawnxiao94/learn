/**
 * @see 适配layout
 *   */
import storeF from 'dataB/store'
export default class Layout {
  // 构造函数
  constructor(parent) {
    this.parent = parent
    this.run()
  }
  // run
  run() {
    // remove resize
    this.clearWindowResize()
    // window resize
    this.windowResize()
    // 监听浏览器宽度，如果小于1200px则收起侧边栏，小于768px则隐藏侧边栏
    this.mediaForSidebar()
  }
  // window resize
  windowResize() {
    // 监听浏览器宽度，如果小于1200px则收起侧边栏，小于768px则隐藏侧边栏
    window.addEventListener('resize', this.mediaForSidebar.bind(this))
  }
  // remove resize
  clearWindowResize() {
    // 监听浏览器宽度，如果小于1200px则收起侧边栏，小于768px则隐藏侧边栏
    window.removeEventListener('resize', this.mediaForSidebar.bind(this))
  }
  // 监听浏览器宽度，如果小于1200px则收起侧边栏，小于768px则隐藏侧边栏
  mediaForSidebar(e) {
    if (e && e.dispatchEvent) {
      return
    }
    if (this.parent.options.clientType === 'ipad') {
      storeF.dispatch('SetSideBar', false)
    } else if (this.parent.options.clientType === 'pc') {
      storeF.dispatch('SetSideBar', true)
    }
  }
}
