<!--
  * @see  Banner
-->
<template>
  <div class="layout-banner"></div>
</template>

<script>
export default {
  // 组件名称
  name: "Banner"
};
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
.layout-banner
  width 100%
  height 200px
  background url('~@/assets/images/ui/banner/banner.png')
  background-size 100% 100%
  position absolute
  top 0
  left 0
  right 0
  z-index -1
</style>
