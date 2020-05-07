<template>
  <el-dialog
    :visible.sync="logData.visible"
    :before-close="resetDialog"
    class="ui-dialog dialog-width-lg-x"
  >
    <div slot="title" class="dialog-title">
      <svg-icon iconClass="icon-log"></svg-icon>
      {{ logData.title }}
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
            {{ logData.data.userName }} / {{ logData.data.orgName }}
          </div>
        </div>
        <!--表单组-->
        <div class="form-box-searchs">
          <el-form :inline="true" :model="logData.form">
            <!-- 时间段 -->
            <datetimerange
              :startTime="logData.form.startDate"
              :endTime="logData.form.endDate"
              type="datetimerange"
              @startTime="
                startTime => {
                  logData.form.startDate = startTime
                }
              "
              @endTime="
                endTime => {
                  logData.form.endDate = endTime
                }
              "
            >
            </datetimerange>
            <!-- 搜索按钮 -->
            <el-form-item>
              <el-button type="primary" @click="searchFilter">
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
          ref="table"
          v-loading="logData.loading"
          :data="logData.tableData"
        >
          <el-table-column prop="createTime" label="操作时间" width="150">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column prop="message" label="操作内容"></el-table-column>
          <el-table-column prop="succeed" label="操作结果" width="300">
            <template slot-scope="scope">
              {{ ~~scope.row.succeed === 0 ? '失败' : '成功' }}
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--表格分页插槽-->
      <template slot="tablePage">
        <!-- 分页 -->
        <page
          v-if="logData.visible"
          ref="pageOperate"
          structure="logData"
          :parent="this"
          :pageSize="5"
          :pageSizes="[5, 10, 20, 50, 100]"
          :total="logData.totalCount"
          @ready-fetch="getlogData"
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
  name: 'LogComponent',
  components: {
    DataList
  },
  data() {
    return {
      logData: {
        title: '操作日志',
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
      Object.assign(this.logData.data, {
        orgName: obj.row.orgName,
        userName: obj.row.userName
      })
      Object.assign(this.logData.form, {
        userId: obj.row.userId,
        eventType: obj.eventType
      })
      this.logData.visible = true
      this.$nextTick(() => {
        this.searchFilter()
      })
    },
    // 获取操作日志详情列表
    getlogData() {
      this.logData.loading = true
      api
        .getLogDetail(this.logData.form)
        .then(res => {
          this.logData.tableData = res.content
          this.logData.totalCount = res.totalElements
        })
        .catch(() => {
          this.$notify({
            title: '失败',
            message: '获取操作日志详情失败!',
            type: 'error',
            duration: 2000
          })
        })
        .finally(() => {
          this.logData.loading = false
        })
    },
    // 搜索
    searchFilter() {
      this.$refs.pageOperate.fetchList()
      // 筛选之后滚动条回顶部
      this.$refs.table.bodyWrapper.scrollTop = 0
    },
    resetDialog() {
      this.logData.tableData = []
      this.logData.totalCount = 0
      this.logData.visible = false
      for (let key in this.logData.form) {
        this.logData.form[key] = ''
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
