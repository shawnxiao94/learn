<template>
  <el-dialog
    :title="data.title"
    :visible.sync="data.visible"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    v-loading="data.loading"
    class="dialog-width"
  >
    <!-- el-form -->
    <el-form :model="data.form" ref="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="权限类型"
            prop="type"
            :rules="regCheck({ required: true, trigger: 'change' })"
          >
            <el-select v-model="data.form.type" clearable placeholder="请选择">
              <el-option
                v-for="item in data.options.permissionType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="权限名称"
            prop="name"
            :rules="regCheck({ required: true })"
          >
            <el-input v-model="data.form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="code"
            prop="code"
            :rules="regCheck({ required: true })"
          >
            <el-input v-model="data.form.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btns">
        <el-button @click="closeDialog">
          取 消
        </el-button>
        <el-button
          type="primary"
          :loading="data.btnLoading"
          @click="submitDialog"
        >
          确 定
        </el-button>
      </div>
    </el-form>
    <!-- el-form -->
  </el-dialog>
</template>

<script>
import * as api from 'dataB/api/SystemManage/PermissionManage'
export default {
  data() {
    return {
      data: {
        title: '新增',
        loading: false,
        btnLoading: false,
        visible: false,
        // 类型：新增=> 1||编辑 => 2|| 新增子权限 => 3
        type: '',
        form: {
          // 父级id
          parentId: '',
          id: '',
          // 权限类型
          type: '',
          // 权限名称
          name: '',
          // 权限code
          code: ''
        },
        options: {
          permissionType: [
            { label: '菜单', value: 0 },
            { label: '功能', value: 1 }
          ]
        }
      }
    }
  },
  methods: {
    // 初始化
    init(data) {
      this.data.visible = true
      this.getData(data)
    },
    // 初始化回显
    getData(data) {
      this.$nextTick(() => {
        this.data.loading = true
      })
      switch (data.type) {
        case 'edit':
          this.data.type = 2
          // 编辑
          this.data.title = '编辑'
          this.data.form.type = 0
          this.data.form.name = data.data.label
          this.data.form.id = data.data.id
          this.data.form.code = data.data.code
          break
        // 新增子菜单
        case 'addSubMenu':
          this.data.type = 3
          this.data.title = '新增子权限'
          break
        default:
          // 新增
          this.data.type = 1
          this.data.title = '新增'
      }
      this.$nextTick(() => {
        this.data.loading = false
      })
    },
    // 确定提交
    submitDialog() {
      this.$refs['form'].validate(valid => {
        this.$nextTick(() => {
          this.data.btnLoading = true
        })
        if (valid) {
          switch (this.data.type) {
            // 新增
            case 1:
              this.addPermissionSaveFn()
              break
            // 编辑
            case 2:
              this.editSaveFn()
              break
            // 新增子菜单
            default:
              this.addSubMubuSaveFn()
          }
        } else {
          this.$nextTick(() => {
            this.data.btnLoading = false
          })
        }
      })
    },
    // 新增权限菜单 => 保存
    addPermissionSaveFn() {
      api
        .addPermission(this.data.form)
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
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
            this.closeDialog()
            // 更新列表
            this.$emit('updateList')
          })
        })
    },
    // 新增子菜单 => 保存
    addSubMubuSaveFn() {
      api
        .addSubMenu(this.data.form)
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
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
            this.closeDialog()
            // 更新列表
            this.$emit('updateList')
          })
        })
    },
    // 编辑 =>保存
    editSaveFn() {
      api
        .eidtPermissionRow(this.data.form)
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
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
            this.closeDialog()
            // 更新列表
            this.$emit('updateList')
          })
        })
    },
    // 取消
    closeDialog() {
      // 弹窗关闭 清除验证
      this.data.visible = false
      this.data.form = {
        type: 1,
        // 权限名称
        name: '',
        // code唯一性
        code: '',
        // 父级id
        parentId: '',
        id: ''
      }
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.btns
  padding-top 10px
  text-align right
</style>
