<!--
  * @see table or card 组件封装
-->
<template>
  <div class="data-list">
    <!--筛选框-->
    <div class="filter-box">
      <div class="form-box">
        <slot name="form-box"></slot>
      </div>
      <div class="sort-box" v-if="!notCard">
        <!--排序组件-->
        <sort-grounp
          v-if="type === 'card'"
          :sortData="sortData"
          @changeSort="
            value => {
              $emit('changeSort', value);
            }
          "
        ></sort-grounp>
        <!--选择视图模式-->
        <el-radio-group v-model="type">
          <!--卡片视图-->
          <el-radio-button label="card">
            <svg-icon iconClass="view-card"> </svg-icon>
          </el-radio-button>
          <!--列表视图-->
          <el-radio-button label="table">
            <svg-icon iconClass="view-list"> </svg-icon
          ></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!--表格视图-->
    <div class="card-table" v-if="type === 'table'">
      <!-- 分页组件插槽 -->
      <slot name="tableColumn"></slot>
      <!-- 分页组件插槽 -->
      <slot name="tablePage"> </slot>
    </div>
    <!--卡片式图-->
    <template v-if="type === 'card' && !notCard">
      <slot name="cardColumn"></slot>
      <!-- 分页组件插槽 -->
      <slot name="cardPage"></slot>
    </template>
  </div>
</template>
<script>
import SortGrounp from "./components/Sort/index";
export default {
  components: {
    SortGrounp
  },
  props: {
    // 视图类型，默认表格视图
    viewType: {
      type: String,
      default: "table"
    },
    // 排序数据
    sortData: {
      type: Array,
      default() {
        return [];
      }
    },
    // 没有卡片视图
    notCard: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      // 视图类型
      type: this.viewType
    };
  },
  methods: {
    // 设置视图类型
    setType(type) {
      // 如果没有卡片视图模式，则不允许切换视图
      if (!this.notCard) {
        this.type = type;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
@import "~@/assets/styles/variable.styl"
// 常用样式工具库
@import "~@/assets/styles/helps/mixin.styl"
/*全局样式*/
.data-list
  // 筛选蓝样式
  .filter-box
    background $color-white
    padding 20px 20px 10px
    border-radius $radius-size-medium
    margin-bottom 20px
    clearfix()
    // 排序组
    .sort-box
      display-flex()
      justify-content flex-end
      margin-bottom 10px
      // radio按钮组样式
      >>> .el-radio-group
        .el-radio-button
          &.el-radio-button--mini
            .el-radio-button__inner
              padding 7px 10px
          .el-radio-button__inner
            border-color $color-a
            color $color-a
            box-shadow none
          .el-radio-button__orig-radio:checked+.el-radio-button__inner
            background $color-a
            border-color $color-a
            color $color-white
    // 筛选表单组
    .form-box
      clearfix()
      .form-box-left
        float left
        margin-right 20px
        .form-box-left-title
          height 28px
          display-flex()
          margin-bottom 10px
          font-size $fontsize-medium
          font-weight bold
      .form-box-searchs
        float right
      >>> .el-form
        display-flex()
        flex-wrap wrap
        .el-form-item
          margin-bottom 10px
          margin-right 20px
          .el-form-item__label
            padding-right 10px
          &:last-child
            margin-right 0
  // 表格样式
  >>>.el-table
    margin-bottom 20px
  // 分页样式，居中
  .pagination-container
    text-align center
/*End 全局样式*/
/*手机端适配*/
@media (max-width 768px)
  .data-list
    // 筛选蓝样式
    .filter-box
      // 排序组
      .sort-box
        float none
        display block
/*End 手机端适配*/
</style>
