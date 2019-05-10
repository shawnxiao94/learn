<!--
  * @see 列表 按钮子组件，由于卡片视图和table视图共用了同一套按钮组件，因此单独抽离封装
-->
<template>
  <div :class="type" class="btns-group">
    <!-- 编辑 button -->
    <!-- 提示 -->
    <el-popover
      :open-delay="0"
      trigger="hover"
      placement="top"
      class="button-inline"
    >
      <div class="tips">
        <h3>提示</h3>
        <p class="margin-top-small color-03">
          标签已失效，无法共享
        </p>
      </div>
      <span slot="reference">
        <el-button type="text" class="icon-button" :disabled="true">
          <svg-icon iconClass="ope-edit" titleName="编辑标签"></svg-icon>
        </el-button>
      </span>
    </el-popover>
    <el-popover
      :open-delay="0"
      trigger="hover"
      placement="top"
      class="button-inline"
    >
      <div class="tips">
        <h3>提示</h3>
        <p class="margin-top-small color-03">
          标签已失效，无法共享
        </p>
      </div>
      <span slot="reference">
        <!-- 失效 button -->
        <el-button type="text" class="icon-button icon-button-red">
          <svg-icon iconClass="ope-lose" titleName="失效标签"></svg-icon>
        </el-button>
      </span>
    </el-popover>
    <!-- 共享 button -->
    <el-button type="text" class="icon-button button-inline">
      <svg-icon iconClass="ope-enjoy" titleName="共享标签"></svg-icon>
    </el-button>
    <!-- 查看标签详情 button -->
    <el-button type="text" class="icon-button button-inline">
      <svg-icon iconClass="ope-detail" titleName="查看标签"></svg-icon>
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    type: { type: String, default: "" }
  }
};
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
// @import "~@/assets/styles/variable.styl"
// 常用样式工具库
// @import "~@/assets/styles/helps/mixin.styl"
/* 手机端适配 */
// @media (max-width 768px)
/* End 手机端适配 */
</style>
