<!--
  * @desc  头部组件
  * @see  header
-->
<template>
  <!-- header -->
  <div class="header">
    <!-- header-center -->
    <div class="header-center">
      <template
        v-if="$store.getters.app.responsiveLayout.clientType !== 'mobile'"
      >
        <!--PC端-->
        <hamburger type="hamburger"></hamburger>
      </template>
      <template
        v-if="$store.getters.app.responsiveLayout.clientType === 'mobile'"
      >
        <!--手机端Logo-->
        <div class="mobile-logo">
          <img :src="require('@/assets/images/common/logo.png')" />
        </div>
      </template>
    </div>
    <!-- header-right -->
    <div class="header-right">
      <el-dropdown trigger="click" @command="handleMenuUser" class="dropdown">
        <div class="el-dropdown-link">
          <span v-if="$store.getters.user.userInfo.userName">
            {{ $store.getters.user.userInfo.userName }}
          </span>
          <span class="line">|</span>
          <span v-if="$store.getters.user.sourceChannel.name">
            {{ $store.getters.user.sourceChannel.name }}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="changePwd">修改密码</el-dropdown-item> -->
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <template
        v-if="$store.getters.app.responsiveLayout.clientType === 'mobile'"
      >
        <!--手机端菜单-->
        <mobile-menu type="mobile-menu"></mobile-menu>
      </template>
    </div>
    <!-- header-right -->
  </div>
  <!-- header -->
</template>

<script>
import { loginOutCas } from "@/common/utils/auth";
import MobileMenu from "@/components/Mobile/Menu/index";
export default {
  name: "Header",
  components: {
    MobileMenu
  },
  data() {
    return {
      // 用户名
      userName: "",
      // 登录密码
      changePassWord: {
        visible: false
      }
    };
  },
  methods: {
    // 执行退出
    handleMenuUser(command) {
      if (command === "changePwd") {
        // this.$router.push('/setting/account/changePassWord')
        this.changePassWord.visible = true;
      } else if (command === "loginout") {
        loginOutCas();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
@import "~@/assets/styles/variable.styl"
// 常用样式工具库
@import "~@/assets/styles/helps/mixin.styl"
/* 全局 */
.header
  height 60px
  display flex
  justify-content space-between
  overflow hidden
  color $color-white
  align-items center
  padding 0 20px
  .header-center
    flex 1
  .header-right
    display flex
    align-items center
    .dropdown
      color $color-02
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
/* End 全局 */
/* 手机端适配 */
  .mobile-logo
    width 28px
    height 28px
    img
      width 100%
      height 100%
/* End 手机端适配 */
</style>
