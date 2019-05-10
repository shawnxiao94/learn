<template>
  <transition name="mobile-menu-fade">
    <div
      class="mobile-menu"
      v-show="$store.getters.mobileApp.mobileMenu.opened"
      @click.stop=""
    >
      <!--滚动面板-->
      <el-scrollbar ref="elScrollbar">
        <!--菜单-->
        <el-menu
          :unique-opened="true"
          mode="vertical"
          :default-active="$route.path"
        >
          <!--子组件-->
          <sidebar-item :routes="permission.sideBarNavs"></sidebar-item>
        </el-menu>
      </el-scrollbar>
      <div @click="closeSideBar" class="mobile-menu-close">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
// 调用数据仓库
import { mapGetters } from "vuex";
// 菜单子组件
import SidebarItem from "@/pages/Layout/components/Sidebar/SidebarItem";

export default {
  // 菜单子组件
  components: { SidebarItem },
  computed: {
    // 引入数据仓库中权限及菜单数据
    ...mapGetters(["permission"])
  },
  mounted() {
    // 浏览器视窗改变时重置elScrollbar插件解决滚动条显示问题
    this.resizeElScrollbar();
    window.addEventListener("resize", this.resizeElScrollbar);
    this.addCloseEvents();
  },
  methods: {
    // 浏览器视窗改变时重置elScrollbar插件解决滚动条显示问题
    resizeElScrollbar() {
      this.$refs.elScrollbar.update();
    },
    // 关闭
    closeSideBar(e) {
      this.$store.dispatch("SetMobileMenu", false);
      if (e) {
        e.stopPropagation();
        e.cancelBubble = true;
      }
    },
    // 添加事件
    addCloseEvents() {
      // 点击body关闭侧边栏
      document
        .querySelector(".container")
        .addEventListener("click", this.closeSideBar);
    }
  },
  destroyed() {
    // 注销组件关闭window resize事件
    window.removeEventListener("resize", this.resizeElScrollbar);
    // 注销点击body关闭侧边栏
    document
      .querySelector(".container")
      .removeEventListener("click", this.closeSideBar);
  }
};
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
@import "~@/assets/styles/variable.styl"
.mobile-menu
  width 300px
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
        padding 20px 0
    .el-menu
      border none
      &:not(.el-menu--collapse)
        .is-active
          &.el-submenu
            &:before
              display none
      li
        position relative
      .is-active
        &:before
          content ' '
          display block
          overflow hidden
          position absolute
          width 3px
          background $color-01
          top 0
          bottom 0
          left 0
          z-index 1
      .el-menu-item
        text-overflow ellipsis
        overflow hidden
        padding-right 20px
      .svg-icon
        color $sidebar-icon-color
        font-size $fontsize-large-x
        margin-right 10px
// CSS过度动画
.mobile-menu-fade-enter-active, .mobile-menu-fade-leave-active
  transition .3s
  transform translate3d(0,0,0)
.mobile-menu-fade-enter, .mobile-menu-fade-leave-active
  transform translate3d(-300px,0,0)
</style>
