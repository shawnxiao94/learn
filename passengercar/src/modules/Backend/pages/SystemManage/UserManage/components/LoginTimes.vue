<template>
  <el-dialog
    :visible.sync="loginDetailData.visible"
    :before-close="resetDialog"
    class="ui-dialog dialog-width-lg-x"
  >
    <div slot="title" class="dialog-title">
      <svg-icon iconClass="ope-detail"></svg-icon>
      {{ loginDetailData.title }}
    </div>
    <!--table or card 组件-->
    <data-list
      ref="dataList"
      :notCard="true"
      :notCardTableWrapper="true"
      @changeSort="value => {}"
    >
      <template slot="form-box">
        <!--按钮组-->
        <div class="form-box-left">
          <div class="form-box-left-title">
            {{ loginDetailData.data.userName }} /
            {{ loginDetailData.data.orgName }}
          </div>
        </div>
        <!--表单组-->
        <div class="form-box-searchs">
          <el-form :inline="true" :model="loginDetailData.form">
            <!-- 时间段 -->
            <datetimerange
              :startTime="loginDetailData.form.startDate"
              :endTime="loginDetailData.form.endDate"
              type="datetimerange"
              @startTime="
                startTime => {
                  loginDetailData.form.startDate = startTime
                }
              "
              @endTime="
                endTime => {
                  loginDetailData.form.endDate = endTime
                }
              "
            >
            </datetimerange>
            <!-- 搜索按钮 -->
            <el-form-item>
              <el-button type="primary" @click="searchFilter">
                <svg-icon class="search" iconClass="icon-search"></svg-icon>
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
          v-loading="loginDetailData.loading"
          ref="table"
          :data="loginDetailData.tableData"
        >
          <el-table-column prop="loginTime" label="登录时间" width="150">
            <template slot-scope="scope">
              {{ scope.row.loginTime | parseTime('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="loginIp"
            label="登录IP"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="loginDevice"
            label="系统版本"
          ></el-table-column>
          <el-table-column
            prop="loginBrowser"
            label="浏览器版本"
          ></el-table-column>
        </el-table>
      </template>
      <!--表格插槽-->
      <template slot="tablePage">
        <!-- 分页 -->
        <page
          v-if="loginDetailData.visible"
          ref="pageLoginDetail"
          structure="loginDetailData"
          :parent="this"
          :pageSize="5"
          :pageSizes="[5, 10, 20, 50, 100]"
          :total="loginDetailData.totalCount"
          @ready-fetch="getLoginDetailData"
        >
        </page>
      </template>
    </data-list>
  </el-dialog>
</template>

<script>
/**
 * @see table or card 组件封装
 *   */
// table or card
import DataList from '@/components/DataList/index'
// 数据请求方法
import * as api from 'dataB/api/SystemManage/UserManage'
export default {
  name: 'LoginTimes',
  components: {
    DataList
  },
  data() {
    return {
      loginDetailData: {
        title: '登录列表',
        visible: false,
        loading: false,
        tableData: [],
        totalCount: 0,
        data: {
          // 所属公司
          orgName: '',
          userName: ''
        },
        form: {
          // 开始时间
          startDate: '',
          // 结束时间
          endDate: '',
          userId: '',
          // 日志类型
          eventType: '',
          sortName: '',
          sortType: ''
        }
      }
    }
  },
  methods: {
    // 弹窗初始化
    init(obj) {
      Object.assign(this.loginDetailData.data, {
        orgName: obj.row.orgName,
        userName: obj.row.userName
      })
      Object.assign(this.loginDetailData.form, {
        userId: obj.row.userId,
        eventType: obj.eventType
      })
      this.loginDetailData.visible = true
      this.$nextTick(() => {
        this.searchFilter()
      })
    },
    // 获取登录次数详情列表
    getLoginDetailData() {
      this.loginDetailData.loading = true
      api
        .getLoginTimesDetail(this.loginDetailData.form)
        .then(res => {
          this.loginDetailData.tableData = res.content
          this.loginDetailData.totalCount = res.totalElements
        })
        .catch(() => {
          this.$notify({
            title: '失败',
            message: '获取登录次数详情失败!',
            type: 'error',
            duration: 2000
          })
        })
        .finally(() => {
          this.loginDetailData.loading = false
        })
    },
    // 搜索
    searchFilter() {
      this.$refs.pageLoginDetail.fetchList()
      // 筛选之后滚动条回顶部
      this.$refs.table.bodyWrapper.scrollTop = 0
    },
    resetDialog() {
      this.loginDetailData.tableData = []
      this.loginDetailData.totalCount = 0
      this.loginDetailData.visible = false
      for (let key in this.loginDetailData.form) {
        this.loginDetailData.form[key] = ''
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
// @import "~@/assets/styles/variable.styl"
.form-box-searchs
  float right!important
// 手机端适配
@media (max-width 768px)
  .form-box-left,.form-box-searchs
    float none!important
</style>
