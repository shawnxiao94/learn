<!--排序组件封装-->
<template>
  <div class="sort-group el-table">
    <!--排序子组件-->
    <sort
      :ref="item.sortType"
      v-for="item in sortData"
      :key="item"
      :title="item.title"
      :sortType="item.sortType"
      @changeSort="changeSort"
    >
    </sort>
  </div>
</template>
<script>
// 排序子组件
import Sort from './Sort'
export default {
  components: {
    Sort
  },
  props: {
    // 需要排序的数据
    sortData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 重置其它排序子组件
    resetOthers(value) {
      // 遍历所有排序子组件，重置其它排序子组件
      for (let item of this.sortData) {
        if (item.sortType !== value.sortType) {
          this.$refs[item.sortType][0].reset()
        }
      }
    },
    // 设置排序
    changeSort(value) {
      // 将结果传递父组件
      this.$emit('changeSort', value)
      // 重置其它排序子组件
      this.resetOthers(value)
    }
  }
}
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
@import "~@/assets/styles/variable.styl"
.data-list
  .sort-group.el-table
    display flex
    align-items center
    flex-wrap wrap
    margin-bottom 0
    margin-right 20px
    justify-content flex-end
    &:before
      display none
/*手机端适配*/
@media (max-width 768px)
  .data-list
    .sort-group.el-table
      margin-bottom 10px
      justify-content flex-start
/*End 手机端适配*/
</style>
