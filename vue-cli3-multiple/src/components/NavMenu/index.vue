<!--横向、纵向菜单-->
<template>
  <el-scrollbar ref="elScrollbar">
    <Menu
      :mode="mode"
      :routes="mode === 'horizontal' ? permission.menuNavs : sidebarMenu"
      :uniqueOpened="uniqueOpened"
      :collapse="isCollapse"
      :rootPath="rootPath ? `${rootPath}/` : ''"
    ></Menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from './Menu'
export default {
  components: {
    Menu
  },
  props: {
    mode: {
      type: String,
      default() {
        return 'horizontal'
      }
    },
    uniqueOpened: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 引入数据仓库中权限及菜单数据
    ...mapGetters(['permission', 'app']),
    // 是否展开收起菜单, 其中手机场景是展开状态
    isCollapse() {
      return this.app.responsiveLayout.clientType === 'mobile'
        ? false
        : !this.app.sidebar.opened
    },
    rootPath() {
      // 手机场景下，菜单是侧边栏菜单
      return this.app.responsiveLayout.clientType === 'mobile'
        ? ''
        : this.app.menuMode === 3
        ? `/${this.$route.path.split('/')[1]}`
        : ''
    },
    sidebarMenu() {
      if (this.app.responsiveLayout.clientType === 'mobile') {
        // 手机场景下
        return this.permission.menuNavs
      }
      if (this.app.menuMode === 3) {
        return this.permission.menuNavs.filter(item => {
          return item.path === this.rootPath
        })[0].children.length > 1
          ? this.permission.menuNavs.filter(item => {
              return item.path === this.rootPath
            })[0].children
          : []
      } else {
        return this.permission.menuNavs
      }
    }
  },
  mounted() {
    // 浏览器视窗改变时重置elScrollbar插件解决滚动条显示问题
    this.resizeElScrollbar()
    window.addEventListener('resize', this.resizeElScrollbar)
  },
  methods: {
    // 浏览器视窗改变时重置elScrollbar插件解决滚动条显示问题
    resizeElScrollbar() {
      this.$refs.elScrollbar.update()
    }
  },
  destroyed() {
    // 注销组件关闭window resize事件
    window.removeEventListener('resize', this.resizeElScrollbar)
  }
}
</script>
