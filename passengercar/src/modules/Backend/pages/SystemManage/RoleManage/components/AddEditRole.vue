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
            label="角色名称"
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
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="排序"
            prop="sortIndex"
            :rules="regCheck({ type: 'int' })"
          >
            <el-input v-model="data.form.sortIndex"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btns">
        <el-button @click="closeDialog">
          取消
        </el-button>
        <el-button type="primary" :loading="data.btnLoading" @click="saveFn">
          保存
        </el-button>
      </div>
    </el-form>
    <!-- el-form -->
  </el-dialog>
</template>

<script>
import * as api from 'dataB/api/SystemManage/RoleManage'
export default {
  data() {
    return {
      data: {
        title: '新增',
        loading: false,
        btnLoading: false,
        optionsLoading: false,
        visible: false,
        // 类型：新增=> 1||编辑 => 2
        type: '',
        form: {
          // 名称
          name: '',
          // createUser
          createUser: '',
          code: '',
          // 排序索引
          sortIndex: 0,
          id: ''
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
          this.data.form.name = data.data.name
          this.data.form.createUser = data.data.createUser
          this.data.form.code = data.data.code
          this.data.form.sortIndex = data.data.sortIndex
          this.data.form.id = data.data.id
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
    // 保存，存在新增与编辑两个场景
    saveFn() {
      this.$refs['form'].validate(valid => {
        this.$nextTick(() => {
          this.data.btnLoading = true
        })
        if (valid) {
          if (this.data.form.id) {
            // 编辑 => 走保存编辑数据
            this.saveEditFn()
          } else {
            // 新增 => 走保存创建数据
            this.createRoleFn()
          }
        } else {
          this.$nextTick(() => {
            this.data.btnLoading = false
          })
        }
      })
    },
    // 编辑 => 保存更新数据
    saveEditFn() {
      api
        .editRoleSave(this.data.form)
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        })
        .catch(res => {
          this.$notify.error({
            title: '保存失败',
            message: res.Result.errMsg,
            duration: 2000
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
    // 保存创建角色
    createRoleFn() {
      // 执行异步请求
      api
        .addRoleSave(this.data.form)
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        })
        .catch(res => {
          this.$notify.error({
            title: '保存失败',
            message: res.Result.errMsg,
            duration: 2000
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
        // 名称
        name: '',
        // createUser
        createUser: '',
        code: '',
        // 排序索引
        sortIndex: 0,
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
