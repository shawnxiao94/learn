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
            label="姓名"
            prop="name"
            :rules="regCheck({ required: true })"
          >
            <el-input v-model="data.form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="手机号"
            prop="mobile"
            :rules="regCheck({ required: true, type: 'mobile' })"
          >
            <el-input v-model="data.form.mobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="邮箱"
            prop="email"
            :rules="regCheck({ required: true, type: 'email' })"
          >
            <el-input v-model="data.form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="所属公司"
            prop="company"
            :rules="regCheck({ required: true })"
          >
            <el-input v-model="data.form.company"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="角色"
            prop="role"
            :rules="regCheck({ required: true, trigger: 'change' })"
          >
            <el-select
              v-model="data.form.role"
              clearable
              placeholder="请选择"
              v-loading="data.optionsLoading"
            >
              <el-option
                v-for="item in data.options.roleArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
import * as api from 'dataB/api/SystemManage/UserManage'
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
          userId: '',
          // 姓名
          name: '',
          // 手机
          mobile: '',
          // 邮箱
          email: '',
          // 公司
          company: '',
          // 角色
          role: ''
        },
        options: {
          roleArr: []
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
          this.data.form.userId = data.data.userId
          this.data.form.name = data.data.userName
          this.data.form.email = data.data.email
          this.data.form.mobile = data.data.mobile
          this.data.form.company = data.data.orgName
          this.data.form.role = data.data.role
          break
        default:
          // 新增
          this.data.type = 1
          this.data.title = '新增'
          // 获取角色选项
          this.getRoleDataFn()
      }
      this.$nextTick(() => {
        this.data.loading = false
      })
    },
    // 获取角色选项
    getRoleDataFn() {
      this.$nextTick(() => {
        this.data.optionsLoading = true
      })
      api
        .getRoleData({})
        .then(res => {
          this.data.options.roleArr = res.Result.data
        })
        .catch(res => {
          this.$notify.error({
            title: '错误',
            message: res.Result.errMsg
          })
        })
        .finally(() => {
          this.$nextTick(() => {
            this.data.optionsLoading = false
          })
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
              this.addRoleSaveFn()
              break
            // 编辑
            case 2:
              this.editSaveFn()
              break
            default:
          }
        } else {
          this.$nextTick(() => {
            this.data.btnLoading = false
          })
        }
      })
    },
    // 新增角色 => 保存
    addRoleSaveFn() {
      api
        .addRoleApi(this.data.form)
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
        .eidtUserAPI(this.data.form)
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
        // 姓名
        name: '',
        // 手机
        mobile: '',
        // 邮箱
        email: '',
        // 公司
        company: '',
        // 角色
        role: ''
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
