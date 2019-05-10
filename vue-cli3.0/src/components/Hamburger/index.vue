<template>
  <div @click="toggleSideBar" :class="type">
    <svg-icon
      iconClass="layout-aside-toggle"
      class="hamburger"
      :class="{ 'is-active': !$store.getters.app.sidebar.opened }"
    ></svg-icon>
  </div>
</template>

<script>
export default {
  name: "hamburger",
  props: {
    type: String
  },
  methods: {
    // 展开收起侧边栏
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
      setTimeout(() => {
        let windowResize = new Event("resize");
        windowResize.dispatchEvent = true;
        window.dispatchEvent(windowResize, "aaa");
      }, 300);
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
.hamburger .svg-icon
  color $color-white
  font-size $fontsize-large-xx
// .hamburger.is-active
//   transform rotate(0deg)
</style>
