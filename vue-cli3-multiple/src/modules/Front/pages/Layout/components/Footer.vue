<template>
  <div class="footer">
    <div class="copyright">CopyRights 2018 XXX CCC Corporation Limited</div>
  </div>
</template>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
.footer
  width 100%
  display flex
  align-items center
  height 30px
  background-color $color-04
  justify-content flex-end
  padding-right 20px
  position absolute
  left 0
  bottom 0
  .copyright
    max-width 360px
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    color $color-03
    font-size $fontsize-small
</style>
