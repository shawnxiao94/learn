<template>
  <div>
    <!--table or card 组件-->
    <data-list ref="dataList" :notCard="true" @changeSort="value => {}">
      <template slot="form-box">
        <!--按钮组-->
        <div class="form-box-left">
          <el-tag class="set-role-per">{{ $route.params.name }}</el-tag>
        </div>
        <!--表单组-->
        <div class="form-box-searchs"></div>
      </template>
      <template slot="tableColumn">
        <!-- 列表数据 -->
        <permission-tree
          ref="treeTable"
          @addEditFn="addEditFn"
        ></permission-tree>
        <!-- 新增&编辑弹窗 -->
        <!-- <add-edit ref="addEdit" @updateList="updateList"></add-edit> -->
      </template>
    </data-list>
  </div>
</template>

<script>
/**
 * @desc 权限分配
 *   */
// table or card
import DataList from '@/components/DataList/index'
import PermissionTree from './components/PermissionTree'
export default {
  name: 'SystemManageRoleManageSetPermission',
  components: {
    DataList,
    PermissionTree
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
.role-name
  height 30px
  line-height 30px
  color $color-01
  font-weight normal
.set-role-per
  margin-bottom 10px
</style>
