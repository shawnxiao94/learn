<template>
  <div>
    <!--table or card 组件-->
    <data-list ref="dataList" :notCard="true" @changeSort="value => {}">
      <template slot="form-box">
        <!--按钮组-->
        <div class="form-box-left">
          <el-form :inline="true">
            <el-form-item>
              <el-button
                v-btnPermission="SystemManagePermissionManage_add"
                type="primary"
                @click="addEditFn({ type: 'add', data: {} })"
              >
                <svg-icon class="add" iconClass="ope-add"></svg-icon>
                新增
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--表单组-->
        <div class="form-box-searchs"></div>
      </template>
      <template slot="tableColumn">
        <!-- 列表数据 -->
        <tree-table ref="treeTable" @addEditFn="addEditFn"></tree-table>
        <!-- 新增&编辑弹窗 -->
        <add-edit ref="addEdit" @updateList="updateList"></add-edit>
      </template>
    </data-list>
  </div>
</template>

<script>
/**
 * @see table or card 组件封装
 *   */
// table or card
import DataList from '@/components/DataList/index'
import TreeTable from './components/TreeTable'
import AddEdit from './components/AddEdit'

export default {
  name: 'PermissionManagePage',
  components: {
    DataList,
    TreeTable,
    AddEdit
  },
  methods: {
    // 新增权限&添加子菜单&编辑
    addEditFn(data) {
      this.$refs.addEdit.init(data)
    },
    // 增删改 更新列表
    updateList() {
      this.$refs.treeTable.init()
    }
  }
}
</script>

<style lang="stylus" scoped></style>
