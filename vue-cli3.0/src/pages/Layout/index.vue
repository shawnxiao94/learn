<!--
  * @see  Layout
  * @desc Layout主页面
-->
<template>
  <div
    @click="() => {}"
    class="container"
    :class="{
      'scrollbar-collapse': !$store.getters.app.sidebar.opened,
      'is-mobile': $store.getters.app.responsiveLayout.clientType === 'mobile'
    }"
  >
    <!-- side-bar组件 -->
    <side-bar></side-bar>
    <!-- <error-log></error-log> -->
    <div class="main">
      <!-- Header组件 -->
      <Header></Header>
      <!-- app-main组件 -->
      <app-main></app-main>
      <!-- Footer组件 -->
      <Footer></Footer>
    </div>
    <!-- Banner组件 -->
    <banner></banner>
  </div>
</template>

<script>
// 引入组件
import Header from "./components/Header.vue";
// 引入组件
import Footer from "./components/Footer.vue";
// 引入组件
import SideBar from "./components/Sidebar";
// import ErrorLog from '@/components/ErrorLog/index'
// 引入组件
import AppMain from "./components/AppMain";
// 引入组件
import Banner from "./components/Banner/index";
export default {
  // 组件名称
  name: "Layout",
  // 注册组件
  components: {
    Header,
    Footer,
    SideBar,
    // ErrorLog,
    AppMain,
    Banner
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~@/assets/styles/variable.styl"
.container
  >>>.app-main
    padding 0 20px 20px
  .main
    margin-left 200px
    transition 0.3s
    position relative
  &.scrollbar-collapse
    .main
      margin-left 60px
    >>>.scrollbar
      width 60px
      .header-left
        width 60px!important
        .logo-label
          display none
      .el-menu--collapse
        width 60px
  &.is-mobile
    .main
      margin-left 0
    >>>.scrollbar
      display none
</style>
