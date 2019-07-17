<!--
  * @see 人员管理页面
-->
<template>
  <div class="user-manage">
    <!--table or card 组件-->
    <data-list ref="dataList" :notCard="true" @changeSort="value => {}">
      <template slot="form-box">
        <!--按钮组-->
        <div class="form-box-left">
          <el-form :inline="true">
            <el-form-item>
              <el-button
                v-btnPermission="SystemManageUserManage_add"
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
        <!-- 搜索组件 -->
        <search-label
          :searchProp="userManageData.searchbtnloading"
          @searchFnForm="searchFnForm"
        >
        </search-label>
      </template>
      <template slot="tableColumn">
        <!-- 表格数据 -->
        <el-table
          stripe
          size="medium"
          v-loading="userManageData.loading"
          :data="userManageData.tableData"
          @sort-change="sortChange"
        >
          <el-table-column prop="userName" label="姓名"></el-table-column>
          <el-table-column prop="mobile" label="手机号"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="orgName" label="所属公司"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column prop="createDate" label="创建日期" sortable="custom">
          </el-table-column>
          <el-table-column prop="loginDate" label="登录时间" width="160">
            <template slot-scope="scope">
              {{ scope.row.loginDate | parseTime('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column prop="loginCount" label="登录次数">
            <template slot-scope="scope">
              <span
                class="color-b cursor-pointer"
                @click="catLoginLog({ row: scope.row, eventType: 'loginLog' })"
              >
                {{ scope.row.loginCount }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :fixed="
              $store.getters.app.responsiveLayout.clientType !== 'mobile'
                ? 'right'
                : undefined
            "
            width="120"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <div class="btns-group">
                <el-button
                  v-btnPermission="SystemManageUserManage_detail"
                  type="text"
                  class="icon-button"
                  @click="
                    catOprationLog({ row: scope.row, eventType: 'oprationlog' })
                  "
                >
                  <span class="detail">
                    <svg-icon
                      titleName="日志详情"
                      iconClass="icon-log"
                    ></svg-icon>
                  </span>
                </el-button>
                <el-button
                  v-btnPermission="SystemManageUserManage_edit"
                  type="text"
                  class="icon-button"
                  @click="addEditFn({ type: 'edit', data: scope.row })"
                >
                  <span class="detail">
                    <svg-icon titleName="编辑" iconClass="ope-edit"></svg-icon>
                  </span>
                </el-button>
                <el-button
                  v-btnPermission="SystemManageUserManage_del"
                  type="text"
                  class="icon-button"
                  @click="delUserFn(scope.row)"
                >
                  <span class="detail">
                    <svg-icon titleName="删除" iconClass="ope-del"></svg-icon>
                  </span>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--表格插槽-->
      <template slot="tablePage">
        <!-- 分页 -->
        <page
          ref="page"
          :parent="this"
          structure="userManageData"
          :total="userManageData.totalCount"
          @ready-fetch="getUserManageData"
        >
        </page>
      </template>
    </data-list>
    <!--操作日志详情子组件-->
    <login-times ref="catLoginDetail"></login-times>
    <operate-log ref="operateLog"></operate-log>
    <!-- 新增用户&编辑用户 -->
    <add-edit ref="addEdit" @updateList="searchFnForm"></add-edit>
  </div>
</template>
<script>
/**
 * @desc 人员管理页面
 *   */
// table or card
import DataList from '@/components/DataList/index'
// 搜索组件
import SearchLabel from './components/Search'
// 登录次数详情组件
import LoginTimes from './components/LoginTimes'
import OperateLog from './components/OperateLog'
import AddEdit from './components/AddEdit'
// 数据请求方法
import * as api from 'dataB/api/SystemManage/UserManage'
export default {
  name: 'SystemManageUserManage',
  components: {
    DataList,
    SearchLabel,
    LoginTimes,
    OperateLog,
    AddEdit
  },
  data() {
    return {
      userManageData: {
        // 搜索字段
        form: {
          createdDateFrom: null,
          createdDateTo: null,
          userName: '',
          mobile: '',
          email: '',
          sysId: this.$store.getters.user.userInfo.sysId,
          // 排序key
          orderElement: '',
          // 排序方式 默认降序
          orderRule: ''
        },
        // table
        tableData: [],
        // 总条目数
        totalCount: 0,
        // 列表加载
        loading: false,
        searchbtnloading: false,
        // 弹框相关数据
        dialogData: {}
      }
    }
  },
  mounted() {
    this.searchFnForm()
  },
  methods: {
    // 获取用户管理列表数据
    getUserManageData() {
      this.userManageData.loading = true
      api
        .getAccout(this.userManageData.form)
        .then(res => {
          this.userManageData.tableData = res.roleCenterUserDtoList
          this.userManageData.totalCount = res.totalElements
        })
        .catch(() => {
          this.$notify({
            title: '失败',
            message: '获取列表失败!',
            type: 'error',
            duration: 2000
          })
        })
        .finally(() => {
          this.userManageData.searchbtnloading = false
          this.userManageData.loading = false
        })
    },
    // 搜索
    searchFnForm(form) {
      form &&
        Object.assign(this.userManageData.form, {
          createdDateFrom:
            form.startTime && !form.startTime.includes(':')
              ? form.startTime + ' 00:00:00'
              : null,
          createdDateTo:
            form.endTime && !form.endTime.includes(':')
              ? form.endTime + ' 23:59:59'
              : null,
          userName: form.userName,
          email: form.email,
          mobile: form.mobile
        })
      this.userManageData.searchbtnloading = true
      this.$refs.page.fetchList()
    },
    // 显示登录次数详情
    catLoginLog(obj) {
      this.$refs.catLoginDetail.init(obj)
    },
    // 显示操作日志详情
    catOprationLog(obj) {
      this.$refs.operateLog.init(obj)
    },
    // 表格排序
    sortChange() {
      const { order, prop } = arguments[0]
      const propObj = {
        createDate: 'orderCreateDate',
        loginDate: 'orderLoginDate',
        loginCount: 'orderLoginCount'
      }
      const orderKey = { descending: 'desc', ascending: 'asc' }
      Object.assign(this.userManageData.form, {
        orderElement: prop ? propObj[prop] : '',
        orderRule: order ? orderKey[order] : ''
      })
      this.$refs.page.fetchList()
    },
    // 新增或者编辑用户
    addEditFn(data) {
      // 新增或者编辑用户
      this.$refs.addEdit.init(data)
    },
    // 删除用户
    delUserFn(row) {
      this.userManageData.form.userId = row.userId
      this.$confirm(`是否确认删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          api
            .delUserApi(this.userManageData.form)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 更新列表
              this.searchFnForm()
            })
            .catch(res => {
              this.$notify.error({
                title: '删除失败',
                message: res.Result.errMsg
              })
            })
            .finally(() => {})
        })
        .catch(() => {})
        .finally(() => {})
    }
  }
}
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
// @import "~@/assets/styles/variable.styl"
@media (max-width 1480px)
  .form-box-left,.form-box-searchs
    float none!important
</style>
