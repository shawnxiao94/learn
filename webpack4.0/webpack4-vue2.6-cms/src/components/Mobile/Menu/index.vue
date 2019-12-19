<template>
  <div :class="type">
    <span @click.stop="toggleSideBar">
      <svg-icon
        iconClass="layout-aside-toggle"
        class="hamburger"
        :class="{ 'is-active': !$store.getters.mobileApp.mobileMenu.opened }"
      ></svg-icon>
    </span>
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from "./Menu";
export default {
  components: {
    Menu
  },
  props: {
    type: String
  },
  methods: {
    // toggle侧边栏
    toggleSideBar () {
      this.$store.dispatch("ToggleMobileMenu");
    },
    // 关闭侧边栏
    closeSideBar () {
      this.$store.dispatch("SetMobileMenu", false);
    }
  }
};
</script>

<style scoped lang="stylus">
@import "~@/assets/styles/variable.styl"
.hamburger
  // transform rotate(90deg)
  // transition .38s
  cursor pointer
  float left
  margin-left 20px
  font-size $fontsize-large-xx
.hamburger .svg-icon
  fill $color-white
// .hamburger.is-active
//   transform rotate(0deg)
</style>
