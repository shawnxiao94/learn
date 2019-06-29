<template>
  <div>
    <ul class="nav">
      <router-link tag="li" to="/">home</router-link>
    </ul>
    <a href="./backend.html">去控制台首页</a>
  </div>
</template>

<script>
export default {
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log('test')
    }
  }
}
</script>

<style lang="stylus" scoped>
ul.nav
  overflow hidden
  li
    float left
    padding 10px
    cursor pointer
</style>
