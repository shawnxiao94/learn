<template>
  <div class="header" :class="{ topFixed: app.topFixed }">
    <!-- header-left -->
    <div
      class="header-left"
      :class="{
        'scrollbar-wrapper-collapse': !app.sidebar.opened
      }"
    >
      <div class="logo">
        <!-- <svg-icon iconClass="logo"></svg-icon> -->
        <!-- <img :src="require('@/assets/images/common/logo.png')" /> -->
        <i class="el-icon-eleme logo-icon"></i>
      </div>
      <div class="logo-label">上汽乘用车大数据平台</div>
    </div>
    <!-- header-center -->
    <div class="header-center">
      <!-- 展开/关闭菜单 -->
      <div
        class="fadeSideBar"
        @click="fadeSideBar"
        v-show="
          app.showHamburger && !(app.responsiveLayout.clientType === 'mobile')
        "
      >
        <svg-icon
          iconClass="layout-aside-toggle"
          class="hamburger"
          :class="{ 'is-active': !app.sidebar.opened }"
        ></svg-icon>
      </div>
      <!-- 导航菜单 -->
      <div
        class="header-menu"
        v-if="!(app.responsiveLayout.clientType === 'mobile')"
      >
        <nav-menu
          class="nav-menu"
          v-if="app.menuMode === 1"
          mode="horizontal"
        ></nav-menu>
        <Nav class="nav-menu" v-if="app.menuMode === 3" mode="horizontal"></Nav>
      </div>
    </div>
    <!-- header-right -->
    <div class="header-right">
      <!-- 全屏显示 -->
      <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip
          v-if="app.fullScreen"
          effect="dark"
          :content="data.fullScreen ? `取消全屏` : `全屏`"
          placement="bottom"
        >
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <el-dropdown trigger="click" @command="handleMenuUser" class="dropdown">
        <div class="el-dropdown-link">
          <span v-if="user.userInfo.userName">
            {{ user.userInfo.userName }}
            <span class="line">|</span>
          </span>
          <template v-if="user.userInfo.role">
            <span>{{ user.userInfo.role }}</span>
            <span class="line">|</span>
          </template>
          <span v-if="user.sourceChannel.name">
            {{ user.sourceChannel.name }}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="changePwd">修改密码</el-dropdown-item> -->
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--手机端菜单-->
      <template
        v-if="$store.getters.app.responsiveLayout.clientType === 'mobile'"
      >
        <mobile-menu type="mobile-menu"></mobile-menu>
      </template>
    </div>
    <!-- header-right end -->
  </div>
</template>

<script>
import { loginOutCas } from '@/common/utils/auth'
import NavMenu from '@/components/NavMenu'
import Nav from '@/components/NavMenu/Nav.vue'
import { mapGetters } from 'vuex'
import MobileMenu from 'componentsF/Mobile/Menu/index'
export default {
  components: {
    MobileMenu,
    NavMenu,
    Nav
  },
  data() {
    return {
      data: {
        fullScreen: false
      }
    }
  },
  computed: {
    // 引入数据仓库中权限及菜单数据
    ...mapGetters(['user', 'app'])
  },
  methods: {
    // 展开/关闭菜单
    fadeSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    // 执行退出
    handleMenuUser(command) {
      if (command === 'changePwd') {
        // this.$router.push('/setting/account/changePassWord')
        this.changePassWord.visible = true
      } else if (command === 'loginout') {
        loginOutCas()
      }
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement
      if (this.data.fullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.data.fullScreen = !this.data.fullScreen
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
// 常用样式工具库
@import "~@/assets/styles/helps/mixin.styl"
/* 全局 */
// 顶部右侧下拉退出导航
.el-dropdown-menu
  background-color $color-03
  border 1px solid transparent
  >>>.el-dropdown-menu__item
    color $color-theme-text
    &:hover
      background-color $color-05
  >>>.popper__arrow
    border-bottom-color $color-03
    filter drop-shadow(0 2px 12px $color-03)
    &:after
      border-bottom-color $color-03
.header
  width 100%
  height 60px
  display flex
  justify-content space-between
  color $color-white
  align-items center
  background-color $color-04
  padding 0 20px 0 0
  box-sizing border-box
  position absolute
  left 0
  top 0
  z-index 999
  &.topFixed
    position fixed
  .header-left
    display flex
    width 200px
    justify-content center
    align-items center
    transition .3s
    height 100%
    transition: all .3s ease
    &.scrollbar-wrapper-collapse
      width 64px
      transition all .3s ease
      .logo-label
        display none
    .logo
      width 30px
      height 30px
      flex 0 0 30px
      text-align center
      line-height 30px
      .svg-icon
        width 100%
        height 100%
      img
        width 100%
        height 100%
        display block
      i.logo-icon
        font-size 30px
    .logo-label
      padding 0 0 0 10px
      height 100%
      font-size $fontsize-medium
      line-height 60px
      text-align center
      font-weight bold
      color $color-white
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
  .header-center
    flex 1
    display flex
    align-items center
    height 100%
    overflow hidden
    .fadeSideBar
      margin-left 10px
      .hamburger
        transform rotate(0deg)
        transition .38s
        cursor pointer
        float left
        font-size 20px
        fill $color-white
        &.is-active
          transform rotate(90deg)
    .header-menu
      width 100%
      height 100%
      padding-left 20px
      box-sizing border-box
  .header-right
    display flex
    align-items center
    height 100%
    line-height 42px
    .btn-fullscreen
      transform rotate(45deg)
      margin-right 5px
      font-size 20px
    .dropdown
      color $color-theme-text
      font-size $fontsize-small
      .el-dropdown-link
        padding 10px
        cursor pointer
        padding-right 0
        color $color-white
        display-flex()
        .ts-img
          margin-right 10px
          img
            width 20px
            height 20px
        .line
          margin 0 10px
          color $color-07
          opacity .2
    .header-link
      display flex
      align-items center
      padding 0 20px
      .svg-icon
        width 20px
        height 20px
        margin-right 5px
</style>
