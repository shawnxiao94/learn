<template>
  <div
    class="wrapper-app"
    :class="{
      'wrapper-app-sidebar': sidebarShow,
      'wrapper-app-sidebar-collapse': !app.sidebar.opened && sidebarShow
    }"
  >
    <div
      class="sidebar"
      :class="{ 'sidebar-collapse': !app.sidebar.opened }"
      v-show="sidebarShow"
    >
      <nav-menu class="nav-menu" mode="vertical"></nav-menu>
    </div>
    <div class="view">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  components: {
    NavMenu
  },
  computed: {
    ...mapGetters(['app', 'permission']),
    rootPath() {
      return this.app.menuMode === 3 ? `/${this.$route.path.split('/')[1]}` : ''
    },
    sidebarShow() {
      let flag = true
      if (this.app.menuMode === 2 || this.app.menuMode === 3) {
        if (this.app.menuMode === 2) {
          flag = this.permission.menuNavs.length > 0
        } else {
          flag =
            this.permission.menuNavs.filter(item => {
              return item.path === this.rootPath
            })[0].children.length > 1
        }
      } else {
        flag = false
      }
      return flag
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
.wrapper-app
  width 100%
  height 100%
  transition all .3s ease
  box-sizing border-box
  &.wrapper-app-sidebar
    padding-left 200px
  &.wrapper-app-sidebar-collapse
    padding-left 64px
  .sidebar
    position absolute
    top 60px
    left 0
    bottom 30px
    transition all .3s ease
    z-index 2
    background-color $sidebar-bgcolor
    width 200px
    &.sidebar-collapse
      width 64px
    // Element UI 滚动条组件
    >>>.el-scrollbar
      position absolute
      top 60px
      bottom 0
      left 0
      right 0
      z-index 0
      height auto
      .el-scrollbar__wrap
        overflow-x hidden
        .el-scrollbar__view
          padding 80px 0 20px
      // Element UI menu组件
      .el-menu
        border none
        color $color-e
        transition all .3s ease
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
  .view
    width 100%
    height 100%
</style>
