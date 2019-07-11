<template>
  <el-breadcrumb separator="/" class="crumbs" v-if="$route.matched.length">
    <el-breadcrumb-item
      v-for="item in $route.matched"
      :key="item.path"
      :to="{ path: `${item.path}` }"
      >{{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
.crumbs
  height 50px
  line-height 50px
  padding 0 20px
  background-color $color-white
  font-weight 700
</style>
