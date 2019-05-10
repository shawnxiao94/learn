<!--
  * @desc  底部组件
  * @see  footer
-->
<template>
  <!-- 通用footer组件 -->
  <div class="footer">
    <div class="copyright">CopyRights 2018 SAIC Motor Corporation Limited</div>
  </div>
</template>
<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
/*全局*/
// 通用底部样式
.footer
  width 100%
  display flex
  align-items center
  height 30px
  background-color $color-04
  justify-content flex-end
  padding-right 20px
  .copyright
    max-width 360px
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    color $color-03
    font-size $fontsize-small
/*End 全局*/
/*手机端适配*/
@media (max-width: 768px)
  .footer
    justify-content center
    padding-right 0
    .copyright
      max-width 320px
/*End 手机端适配*/
</style>
