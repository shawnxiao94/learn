<template>
  <!-- el-from -->
  <el-form v-loading="this.data.loading">
    <el-form-item>
      <el-tree
        :data="data.treeData"
        :props="data.defaultProps"
        node-key="id"
        show-checkbox
        :default-expand-all="true"
        :expand-on-click-node="true"
        :default-checked-keys="data.permissionCheked"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <span v-if="~~data.type === 1" class="menu-span">菜单权限</span>
            <span v-else>按钮权限</span>
          </span>
        </span>
      </el-tree>
    </el-form-item>
    <!--提交按钮-->
    <el-form-item class="btn">
      <el-button
        type="primary"
        :disabled="this.data.btnLoading"
        @click="updatePermissionByRoleId"
        v-btnPermission="SystemManageSetPermission_save"
      >
        提交
      </el-button>
      <!--返回按钮-->
      <!-- <el-button @click="goBack">返回</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script>
// 获取全部权限树列表
import { getTreePermissionData } from 'dataB/api/SystemManage/PermissionManage'
// 获取该角色所拥有的权限树
import * as api from 'dataB/api/SystemManage/SetPermission'
export default {
  data() {
    return {
      data: {
        loading: false,
        btnLoading: false,
        // 全部权限树
        treeData: [],
        form: {},
        // 所拥有的权限树id
        permissionCheked: [],
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
      getTreePermissionData(this.data.form)
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
          // 获取角色所拥有的权限树
          this.getPermissionCheckedByRoleId()
        })
    },
    // 获取角色所拥有的权限树
    getPermissionCheckedByRoleId() {
      this.$nextTick(() => {
        this.data.loading = true
      })
      api
        .getPermissionChecked(this.data.form)
        .then(res => {
          this.data.permissionCheked = res.Result.data.content
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
    // 权限分配保存
    updatePermissionByRoleId() {
      this.$nextTick(() => {
        this.data.btnLoading = true
      })
      api
        .savePermission(this.data.form)
        .then(() => {
          this.$alert('权限更新保存成功！需要重新加载页面！', '提示', {
            confirmButtonText: '确定',
            showClose: false,
            callback: () => {
              // 权限更新 => 重新加载页面
              window.location.reload()
            }
          })
        })
        .catch(res => {
          this.$notify.error({
            title: '错误',
            message: res.Result.errMsg
          })
        })
        .finally(() => {
          this.$nextTick(() => {
            this.data.btnLoading = false
          })
        })
    },
    // 返回上一级
    goBack() {
      this.$router.push({
        path: '/systemManage/roleManage',
        name: 'SystemManageRoleManage'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
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
.menu-span
  color $color-e
.btn
  text-align center
</style>
