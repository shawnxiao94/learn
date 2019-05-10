<template>
  <div class="scrollbar">
    <!-- header-left -->
    <div class="header-left">
      <div class="logo">
        <img :src="require('@/assets/images/common/logo.png')" />
      </div>
      <div class="logo-label">
        业务中台用户中心
      </div>
    </div>
    <!--滚动面板-->
    <el-scrollbar ref="elScrollbar">
      <!--菜单-->
      <el-menu
        :unique-opened="true"
        mode="vertical"
        :default-active="$route.path"
        :collapse="isCollapse"
      >
        <!--子组件-->
        <sidebar-item :routes="permission.sideBarNavs"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
// 调用数据仓库
import { mapGetters } from "vuex";
// 菜单子组件
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  computed: {
    // 引入数据仓库中权限及菜单数据
    ...mapGetters(["permission", "app"]),
    // 是否展开收起菜单
    isCollapse() {
      return !this.app.sidebar.opened;
    }
  },
  mounted() {
    // 浏览器视窗改变时重置elScrollbar插件解决滚动条显示问题
    this.resizeElScrollbar();
    window.addEventListener("resize", this.resizeElScrollbar);
  },
  methods: {
    // 浏览器视窗改变时重置elScrollbar插件解决滚动条显示问题
    resizeElScrollbar() {
      this.$refs.elScrollbar.update();
    }
  },
  destroyed() {
    // 注销组件关闭window resize事件
    window.removeEventListener("resize", this.resizeElScrollbar);
  }
};
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
@import "~@/assets/styles/variable.styl"
// 侧边栏样式
.scrollbar
  width 200px
  transition .3s
  position fixed
  top 0
  left 0
  bottom 0
  z-index 1
  overflow hidden
  background-color $sidebar-bgcolor
  // Element UI 滚动条组件
  >>>.el-scrollbar
    position absolute
    top 60px
    bottom 0
    left 0
    right 0
    z-index 0
    .el-scrollbar__wrap
      overflow-x hidden
      .el-scrollbar__view
        padding 80px 0 20px
    // Element UI menu组件
    .el-menu
      border none
      color $color-e
      li
        position relative
      // 将一级栏目高度设为60px
      .el-menu-item,.el-submenu__title
        height 60px
        line-height 60px
        color $sidebar-text-color
        &:focus,&:hover
          background-color transparent
      // 菜单设为文本超出隐藏...
      .el-menu-item
        text-overflow ellipsis
        overflow hidden
        padding-right 10px
      .el-submenu
        // 右侧ICON
        .el-submenu__icon-arrow
          right 10px
        // 将二级栏目高度设为50px
        .el-menu-item
          height 50px
          line-height 50px
      // 设置默认图标样式及大小
      .svg-icon
        color $sidebar-icon-color
        font-size $fontsize-large-xx
        margin-right 10px
      // 当菜单非收起时隐藏展开菜单做光标
      &:not(.el-menu--collapse)
        .is-active
          &.el-submenu
            &:before
              display none
      // 当聚焦时设置左侧光标背景
      .is-active
        &:before
          content ' '
          display block
          overflow hidden
          position absolute
          width 4px
          background $color-b
          height 24px
          top 50%
          margin-top -12px
          left 0
          z-index 1
        // 当点击时设置字体颜色和图标颜色
        &,& .el-submenu__title,& .el-tooltip
          color $sidebar-text-active-color
          >.svg-icon
            color $sidebar-icon-active-color
      &.el-menu--collapse
        // 收起时让图标居中
        .el-tooltip,.el-submenu__title
          display flex!important
          align-items center
          justify-content center
          .svg-icon
            margin-right 0
            font-size $fontsize-large-xx
  // 头部左侧LOGO
  .header-left
    background $layout-aside-header-bg
    height 60px
    width 200px
    color $color-white
    align-items center
    display flex
    justify-content center
    // LOGO 样式
    .logo
      width 30px
      height 30px
      flex 0 0 30px
      img
        width 100%
        height 100%
    // LOGO 文本样式
    .logo-label
      padding 0 0 0 10px
      height 100%
      font-size $fontsize-large
      line-height 60px
      text-align center
      font-weight bold
      color $sidebar-header-text-color
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
  // 收起样式是隐藏内容
  .horizontal-collapse-transition
    display none

/*修复Element UI与我们结构不一致导致样式失效的问题*/
>>>.el-menu--collapse .el-menu-item .svg-icon,>>>.el-menu--collapse .el-submenu .el-submenu__title .svg-icon
  margin 0
  vertical-align middle
  width 24px
  text-align center
>>>.el-menu--collapse .el-menu-item .el-submenu__icon-arrow,>>>.el-menu--collapse .el-submenu .el-submenu__title .el-submenu__icon-arrow
  display none
>>>.el-menu--collapse .el-menu-item span,>>>.el-menu--collapse .el-submenu .el-submenu__title span
  height 0
  width 0
  overflow hidden
  display none
/*End 修复Element UI与我们结构不一致导致样式失效的问题*/
</style>
