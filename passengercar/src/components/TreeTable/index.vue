<template>
  <el-table
    @sort-change="sortChange"
    :data="formatData"
    :row-class-name="showRow"
    v-bind="$attrs"
    class="tree-table"
  >
    <el-table-column v-if="columns.length === 0" width="150">
      <template slot-scope="scope">
        <span
          v-for="space in scope.row._level"
          class="ms-tree-space"
          :key="space"
        ></span>
        <span
          class="tree-ctrl"
          v-if="iconShow(0, scope.row)"
          @click="toggleExpanded(scope.$index)"
        >
          <i v-if="!scope.row._expanded" class="el-icon-arrow-right"></i>
          <i v-else class="el-icon-arrow-down"></i>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column
      v-else
      v-for="(column, index) in columns"
      :key="column.value"
      :label="column.text"
      :width="column.width"
    >
      <template slot-scope="scope" v-if="index === 0">
        <span
          class="ellipsis"
          :style="{ width: column.width - 20 + 'px' }"
          :title="scope.row[column.value]"
        >
          <span
            v-for="space in scope.row._level"
            class="ms-tree-space"
            :key="space"
          ></span>
          <span
            class="tree-ctrl"
            v-if="iconShow(index, scope.row)"
            @click="toggleExpanded(scope.$index)"
          >
            <i v-if="!scope.row._expanded" class="el-icon-arrow-right"></i>
            <i v-else class="el-icon-arrow-down"></i>
          </span>
          {{ scope.row[column.value] || '-' }}
        </span>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  name: 'TreeTable',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || this.treeToArray
      const args = this.evalArgs
        ? Array.prototype.concat([tmp, this.expandAll], this.evalArgs)
        : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
    // 格式化数据源
    treeToArray(data, expandAll, parent = null, level = null) {
      let tmp = []
      const self = this
      Array.from(data).forEach(function(record) {
        if (record._expanded === undefined) {
          self.$set(record, '_expanded', expandAll)
        }
        let _level = 1
        if (level !== undefined && level !== null) {
          _level = level + 1
        }
        self.$set(record, '_level', _level)
        // 如果有父元素
        if (parent) {
          self.$set(record, 'parent', parent)
        }
        tmp.push(record)
        if (record.children && record.children.length > 0) {
          record.treeTableChildren = record.children
          delete record.children
          const treeTableChildren = self.treeToArray(
            record.treeTableChildren,
            expandAll,
            record,
            _level
          )
          tmp = tmp.concat(treeTableChildren)
        }
      })
      return tmp
    },
    // 显示隐藏
    showRow: function(row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true
      row.row._show = show
      return show ? 'tree-show' : 'tree-hide'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (
        index === 0 &&
        record.treeTableChildren &&
        record.treeTableChildren.length > 0
      )
    },
    // 排序
    sortChange(params) {
      // 用户群列表排序
      this.$emit('sortChange', params)
    }
  }
}
</script>

<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
@import "~@/assets/styles/variable.styl"
$space-width = 14px
.tree-table
  .ms-tree-space
    position relative
    top 1px
    display inline-block
    font-style normal
    font-weight 400
    line-height 1
    width $space-width
    height 14px
    &:before
      content ""
  .tree-ctrl
    position relative
    cursor pointer
    color $color-a
    margin-left -($space-width)
  >>>.tree-hide
    display none
  >>>.tree-show
    display table-row
</style>
