<template>
  <el-tree
    :data="data.treeData"
    v-loading="data.loading"
    :props="data.defaultProps"
    node-key="id"
    :default-expand-all="true"
    :expand-on-click-node="true"
  >
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>
      <span>
        <el-button
          type="text"
          size="mini"
          v-btnPermission="SystemManagePermissionManage_update"
          @click.stop="$emit('addEditFn', { type: 'edit', data })"
        >
          编辑
        </el-button>
        <el-button
          type="text"
          size="mini"
          v-btnPermission="SystemManagePermissionManage_del"
          @click.stop="remove(node, data)"
        >
          删除
        </el-button>
        <el-button
          type="text"
          size="mini"
          v-btnPermission="SystemManagePermissionManage_addSubMenu"
          @click.stop="$emit('addEditFn', { type: 'addSubMenu', data })"
        >
          添加子权限
        </el-button>
      </span>
    </span>
  </el-tree>
</template>

<script>
import * as api from 'dataB/api/SystemManage/PermissionManage'
export default {
  data() {
    return {
      data: {
        loading: false,
        treeData: [],
        form: {},
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 列表初始化
    init() {
      this.data.treeData = []
      this.getTreePermissionDataFn()
    },
    // 获取树形权限菜单列表
    getTreePermissionDataFn() {
      this.$nextTick(() => {
        this.data.loading = true
      })
      api
        .getTreePermissionData(this.data.form)
        .then(res => {
          this.data.treeData = res.Result.data.content
        })
        .catch(res => {
          this.$notify.error({
            title: '错误',
            message: res.Result.errMsg
          })
        })
        .finally(() => {
          this.$nextTick(() => {
            this.data.loading = false
          })
        })
    },
    // 删除
    remove(node, data) {
      console.log(node, data)
      let id = data.id
      this.$confirm('此操作将删除此行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除接口
          api
            .deletePermission(id)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 删除成功后刷新列表
              this.init()
            })
            .catch(res => {
              this.$notify.error({
                title: '错误',
                message: res.data.errMsg
              })
            })
            .finally(() => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.custom-tree-node
  flex 1;
  display flex;
  align-items center;
  justify-content space-between;
  font-size 14px;
  padding-right 8px;
  height 30px
>>>.el-tree-node__content
  height 30px
  line-height 30px
</style>
