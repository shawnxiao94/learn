<!--
  * @see 人员管理页面
-->
<template>
  <div class="user-manage">
    <!--面包屑组件-->
    <crumbs></crumbs>
    <!--table or card 组件-->
    <data-list ref="dataList" :notCard="true" @changeSort="value => {}">
      <template slot="form-box">
        <!--按钮组-->
        <div class="form-box-left">
          <el-form :inline="true">
            <el-form-item>
              <el-button @click="addUserManage" type="primary">
                <svg-icon class="add" iconClass="ope-add"></svg-icon>
                新增
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--表单组-->
        <div class="form-box-searchs">
          <el-form :inline="true">
            <!-- 创建时间 -->
            <el-form-item label="创建时间">
              <el-input clearable spellcheck="false" placeholder="创建时间">
              </el-input>
            </el-form-item>
            <!-- 姓名 -->
            <el-form-item label="姓名">
              <el-input clearable spellcheck="false" placeholder="姓名">
              </el-input>
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item label="手机号">
              <el-input clearable spellcheck="false" placeholder="手机号">
              </el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="邮箱">
              <el-input clearable spellcheck="false" placeholder="邮箱">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">
                <svg-icon iconClass="icon-search"></svg-icon>
                <span>搜索</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template slot="tableColumn">
        <!-- 表格数据 -->
        <el-table stripe :data="table.data" size="medium">
          <el-table-column prop="userName" label="姓名"></el-table-column>
          <el-table-column prop="mobile" label="手机号"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="orgName" label="所属公司"></el-table-column>
          <el-table-column prop="role" label="权限"></el-table-column>
          <el-table-column prop="createDate" label="创建日期" sortable="custom">
          </el-table-column>
          <el-table-column prop="loginDate" label="登录时间" width="160">
            <template slot-scope="scope">
              {{ scope.row.loginDate | parseTime("YYYY-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column prop="loginCount" label="登录次数">
            <template slot-scope="scope">
              <span
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
            width="100"
            label="日志操作"
            align="center"
          >
            <template slot-scope="scope" :id="scope">
              <div class="btns-group">
                <el-button
                  type="text"
                  class="icon-button"
                  @click="
                    catOprationLog({ row: scope.row, eventType: 'oprationlog' })
                  "
                >
                  <svg-icon iconClass="icon-log"></svg-icon>
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
          structure="table"
          @ready-fetch="getUserManageData"
        >
        </page>
      </template>
    </data-list>
    <!--操作日志详情子组件-->
    <operate-log ref="operateLog"></operate-log>
    <!--新增人员子组件-->
    <add-user ref="addUser"></add-user>
  </div>
</template>
<script>
/**
 * @see table or card 组件封装
 *   */
// table or card
import DataList from "@/components/DataList/index";
// 分页
import Page from "@/components/Page/index";
// 获取人员列表数据
import * as api from "@/data/api/SystemManage/UserManage/index";
// 操作日志详情子组件
import OperateLog from "./components/OperateLog";
// 新增人员
import AddUser from "./components/AddUser";
export default {
  name: "UserManage",
  components: {
    DataList,
    Page,
    OperateLog,
    AddUser
  },
  data() {
    return {
      table: {
        // 表单
        form: {},
        // 数据
        data: [],
        totalCount: 0
      }
    };
  },
  mounted() {
    // 渲染用户管理列表数据
    this.setUserManageData();
  },
  methods: {
    // 渲染用户管理列表数据
    setUserManageData() {
      // 初始化分页
      this.$refs.page.fetchList();
    },
    // 获取用户管理列表数据
    getUserManageData() {
      this.table.loading = true;
      api
        .getAccout(this.table.form)
        .then(res => {
          this.table.data = res.roleCenterUserDtoList;
          this.table.totalCount = res.totalElements;
        })
        .catch(() => {
          this.$notify({
            title: "失败",
            message: "获取列表失败!",
            type: "error",
            duration: 2000
          });
        })
        .finally(() => {
          this.table.loading = false;
        });
    },
    // 显示操作日志详情
    catOprationLog(obj) {
      this.$refs.operateLog.init(obj);
    },
    // // 显示新增
    addUserManage() {
      this.$refs.addUser.init();
    }
  }
};
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
// @import "~@/assets/styles/variable.styl"
@media (max-width 1480px)
  .form-box-left,.form-box-searchs
    float none!important
</style>
