<template>
  <div class="page404">
    <img :src="require('@/assets/images/common/404.png')" alt="" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/assets/styles/variable.styl"
.page404
  img
    display block
    max-height 80%
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
</style>
