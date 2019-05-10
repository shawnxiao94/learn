<!--排序组件-->
<template>
  <span
    class="sort-item"
    @click.stop.prevent="setSortHandle"
    :class="{
      ascending: this.sort.type === 'asc',
      descending: this.sort.type === 'desc'
    }"
  >
    <span>{{ title }}</span>
    <span class="caret-wrapper">
      <!--正序-->
      <i
        class="sort-caret ascending"
        @click="
          () => {
            this.sort.type = '';
          }
        "
      ></i>
      <!--倒序-->
      <i
        class="sort-caret descending"
        @click="
          () => {
            this.sort.type = 'asc';
          }
        "
      ></i>
    </span>
  </span>
</template>
<script>
import { deepClone } from "@/common/utils/index";
export default {
  props: {
    // 排序名称
    title: String,
    // 排序code
    sortType: String
  },
  data() {
    return {
      sort: {
        // 当前排序
        type: "",
        sortType: this.sortType
      }
    };
  },
  mounted() {},
  methods: {
    // 重置
    reset() {
      this.sort.type = "";
    },
    // 设置排序
    setSortHandle() {
      // 如果正序则倒序
      if (this.sort.type === "asc") {
        this.sort.type = "desc";
        // 如果倒序则默认排序
      } else if (this.sort.type === "desc") {
        this.sort.type = "";
        // 如果默认排序则正序
      } else {
        this.sort.type = "asc";
      }
      this.$nextTick(() => {
        // 将结果传递父组件
        const _sort = deepClone(this.sort);
        this.$emit("changeSort", _sort);
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.sort-item
  cursor pointer
  display flex
  align-items center
  user-select none
  &~.sort-item
    margin-left 10px
  // 排序容器
  .caret-wrapper
    height 28px
    // 正序图标样式
    .ascending
      top 3px
    // 倒序图标样式
    .descending
      bottom 3px
/*手机端适配*/
@media (max-width 768px)
  .sort-item
    margin-right 20px
    &~.sort-item
      margin-left 0
/*End 手机端适配*/
</style>
