<!--
  * @see  面包屑
-->
<template>
  <div class="layout-crumbs-wrapper">
    <el-row>
      <el-col :xs="24" :sm="10" :lg="8">
        <div class="crumbs">
          <span>{{ $route.meta.title }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="14" :lg="16">
        <slot name="right-box"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value15: []
    };
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
/* 全局 */
.layout-crumbs-wrapper
  margin-bottom 20px
  color $color-white
  // 面包屑
  .crumbs
    height 60px
    font-size $fontsize-large-xx
    line-height 28px
    align-items flex-end
    display flex
  // 面包屑
  >>>.right-box
    height 60px
    align-items flex-end
    display flex
    justify-content flex-end
    .el-form
      .el-form-item
        margin 0 0 0 10px

/* End 全局 */
/* 手机端适配 */
@media (max-width 768px)
  .layout-crumbs-wrapper
    // 面包屑
    >>>.right-box
      justify-content flex-start
      .el-form
        .el-form-item
          margin 0 10px 0 0
/* End 手机端适配 */
</style>
