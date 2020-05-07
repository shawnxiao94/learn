<template>
  <el-table
    :data="tableData"
    :row-key="rowKey"
    :height="height"
    :max-height="maxHeight"
  >
    <el-table-column
      v-for="item in tableLabelKey"
      :key="item.key"
      :type="item.type ? item.type : ''"
      :label="item.label"
      :prop="item.key"
      v-show="!item.show"
      :align="item.align"
      :width="item.width"
    >
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
/**
 * @author xiaoqiulin
 * @desc
 * 表格数据展示组件
 * 仅接收数据进行展示，按钮通过插槽在组件外自定义设置
 * */
export default {
  props: {
    // 表格数据
    tableData: Array,
    // 树形表格时需指定的row-key
    rowKey: String,
    // 表格每行接收数据的key和label
    tableLabelKey: Array,
    // 高度
    height: {
      type: Number
    },
    // 高度
    maxHeight: {
      type: Number
    }
  }
};
</script>
