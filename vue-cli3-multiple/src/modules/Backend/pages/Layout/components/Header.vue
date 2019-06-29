<template>
  <div>
    <ul class="nav">
      <router-link tag="li" to="/">home</router-link>
    </ul>
    <a href="./index.html">去前台首页</a>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
ul.nav
  overflow hidden
  li
    float left
    padding 10px
    cursor pointer
</style>
