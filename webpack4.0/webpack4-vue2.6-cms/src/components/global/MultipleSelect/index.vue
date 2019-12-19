<template>
  <el-select
    v-model="value"
    :value-key="code"
    multiple
    :placeholder="placeholder"
    filterable
    :class="type"
  >
    <el-option
      v-for="item in options"
      :key="item[code]"
      :label="item[label]"
      :value="item[code]"
    >
    </el-option>
    <div class="el-select-dropdown__btns">
      <span class="el-select-dropdown__btn_left" @click="selectAll">全选</span>
      <span class="el-select-dropdown__btn_right" @click="cannelAll">清空</span>
    </div>
  </el-select>
</template>
<script>
export default {
  name: "MultipleSelect",
  props: {
    type: {
      type: String,
      default: ""
    },
    defaultVal: {
      type: Array,
      default () {
        return [];
      }
    },
    options: {
      type: Array,
      default () {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    code: {
      type: String,
      default: "code"
    },
    label: {
      type: String,
      default: "label"
    }
  },
  mounted () {},
  methods: {
    selectAll () {
      const _arr = [];
      for (const item of this.options) {
        _arr.push(item[this.code]);
      }
      this.value = _arr;
    },
    cannelAll () {
      this.value = [];
    }
  },
  data () {
    return {
      value: this.defaultVal || []
    };
  },
  watch: {
    value (newValue) {
      this.$emit("input", newValue);
      this.$emit("change", newValue);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
  // select多选框加全选和取消全选按钮
  .el-select-dropdown__btns
    padding 0
    overflow hidden
    border-top 1px solid $color-line
    span
      font-weight bold
      padding 12px 20px
      cursor pointer
      color $color-a
      &.el-select-dropdown__btn_left
        float left
      &.el-select-dropdown__btn_right
        float right
</style>
