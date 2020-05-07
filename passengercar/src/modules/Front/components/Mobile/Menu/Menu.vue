<template>
  <transition name="mobile-menu-fade">
    <div
      class="mobile-menu"
      v-show="$store.getters.mobileApp.mobileMenu.opened"
      @click.stop=""
    >
      <nav-menu class="nav-menu" mode="vertical"></nav-menu>
      <div @click="closeSideBar" class="mobile-menu-close">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
// 菜单组件
import NavMenu from '@/components/NavMenu'

export default {
  // 菜单子组件
  components: { NavMenu },
  mounted() {
    this.addCloseEvents()
  },
  methods: {
    // 关闭
    closeSideBar(e) {
      this.$store.dispatch('SetMobileMenu', false)
      if (e) {
        e.stopPropagation()
        e.cancelBubble = true
      }
    },
    // 添加事件
    addCloseEvents() {
      // 点击body关闭侧边栏
      document
        .querySelector('body')
        .addEventListener('click', this.closeSideBar)
    }
  },
  destroyed() {
    // 注销点击body关闭侧边栏
    document
      .querySelector('body')
      .removeEventListener('click', this.closeSideBar)
  }
}
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
@import "~@/assets/styles/variable.styl"
.mobile-menu
  width 240px
  transition .3s
  position fixed
  top 0
  left 0
  bottom 0
  z-index 10
  overflow hidden
  background-color $sidebar-bgcolor
  .mobile-menu-close
    position absolute
    top 5px
    right 5px
    width 40px
    height 40px
    display flex
    align-items center
    justify-content center
    font-size $fontsize-large-xx
    color $color-03
    &:hover
      cursor pointer
      color $color-01
  >>>.el-scrollbar
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index 0
    .el-scrollbar__wrap
      overflow-x hidden
      .el-scrollbar__view
        padding 20px 0 20px
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
// CSS过度动画
.mobile-menu-fade-enter-active, .mobile-menu-fade-leave-active
  transition .3s
  transform translate3d(0,0,0)
.mobile-menu-fade-enter, .mobile-menu-fade-leave-active
  transform translate3d(-240px,0,0)
</style>
