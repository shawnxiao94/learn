<template>
  <div class="log-manage">
    <!--table or card 组件-->
    <data-list ref="dataList" :notCard="true" @changeSort="value => {}">
      <template slot="form-box">
        <!--按钮组-->
        <div class="form-box-left"></div>
        <!--表单组-->
        <div class="form-box-searchs">
          <el-form
            v-btnPermission="SystemManageLogManage_search"
            :inline="true"
            :model="logManage.table.form"
          >
            <!-- 时间段 -->
            <datetime-range
              :startTime="logManage.table.form.startDate"
              :endTime="logManage.table.form.endDate"
              @startTime="
                startDate => {
                  logManage.table.form.startDate = startDate
                }
              "
              @endTime="
                endDate => {
                  logManage.table.form.endDate = endDate
                }
              "
              label="选择时间"
            >
            </datetime-range>
            <el-form-item label="姓名">
              <el-input
                clearable
                v-model="logManage.table.form.userNameLog"
                placeholder="请输入姓名"
                @keyup.enter.native="$refs.page.fetchList()"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input
                clearable
                v-model="logManage.table.form.phone"
                placeholder="请输入手机号"
                @keyup.enter.native="$refs.page.fetchList()"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                clearable
                v-model="logManage.table.form.email"
                placeholder="请输入邮箱"
                @keyup.enter.native="$refs.page.fetchList()"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="$refs.page.fetchList()">
                <svg-icon iconClass="icon-search"></svg-icon>
                搜索
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template slot="tableColumn">
        <!-- 表格数据 -->
        <el-table
          stripe
          size="medium"
          v-loading="logManage.table.loading"
          @sort-change="sortChange"
          :data="logManage.table.tableData"
        >
          <el-table-column prop="userName" label="姓名"></el-table-column>
          <el-table-column prop="mobile" label="手机号"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column
            prop="companyName"
            label="所属公司"
          ></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column prop="createTime" sortable="custom" label="操作时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column prop="message" label="操作内容"></el-table-column>
          <el-table-column label="操作结果">
            <template slot-scope="scope">
              <span class="color-d" v-if="~~scope.row.succeed === 1">
                成功
              </span>
              <span class="color-e" v-else>
                失败
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--表格分页插槽-->
      <template slot="tablePage">
        <!-- 分页 -->
        <page
          ref="page"
          :parent="this"
          structure="logManage.table"
          :total="logManage.table.totalCount"
          @ready-fetch="getTableDataInfo"
        >
        </page>
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
import * as api from 'dataB/api/SystemManage/LogManage'
export default {
  name: 'SystemManageLogManage',
  components: {
    DataList
  },
  data() {
    return {
      logManage: {
        table: {
          loading: false,
          form: {
            eventType: 'oprationlog',
            // 开始时间
            startDate: '',
            // 结束时间
            endDate: '',
            pageNumber: '',
            pageSize: '',
            sortName: '',
            sortType: '',
            userNameLog: '',
            phone: '',
            email: ''
          },
          tableData: [],
          totalCount: 0
        }
      }
    }
  },
  mounted() {
    // 获取列表数据
    this.$refs.page.fetchList()
  },
  methods: {
    sortChange() {
      const { order, prop } = arguments[0]
      const propObj = { createTime: 'createTime' }
      const orderKey = { descending: 'desc', ascending: 'asc' }
      Object.assign(this.logManage.table.form, {
        sortName: prop ? propObj[prop] : '',
        sortType: order ? orderKey[order] : ''
      })
      this.$refs.page.fetchList()
    },
    // 获取列表
    getTableDataInfo() {
      this.logManage.table.loading = true
      this.logManage.table.form.startDate =
        this.logManage.table.form.startDate &&
        !this.logManage.table.form.startDate.includes(':')
          ? this.logManage.table.form.startDate + ' 00:00:00'
          : this.logManage.table.form.startDate
      this.logManage.table.form.endDate =
        this.logManage.table.form.endDate &&
        !this.logManage.table.form.endDate.includes(':')
          ? this.logManage.table.form.endDate + ' 23:59:59'
          : this.logManage.table.form.endDate
      api
        .getUserOperationLogByType(this.logManage.table.form)
        .then(res => {
          this.logManage.table.tableData = res.Result.data.content
          this.logManage.table.totalCount = res.Result.data.totalElements
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
          this.logManage.table.loading = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
// @import "~@/assets/styles/variable.styl"
@media (max-width 1400px)
  .form-box-left,.form-box-searchs
    float none!important
</style>
