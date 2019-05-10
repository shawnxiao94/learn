<!--
  * @see  首页
-->
<template>
  <div>
    <!--面包屑组件-->
    <crumbs>
      <div slot="right-box" class="right-box">
        <el-form :inline="true">
          <el-form-item class="el-form-item-w-200">
            <el-date-picker
              class="el-date-picker-transparent"
              v-model="month"
              type="monthrange"
              :picker-options="pickerOptions2"
              range-separator="-"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </crumbs>
    <!--概览数据-->
    <overview-data></overview-data>
    <!--End 概览数据-->
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="card-title">
              上汽业务分部
              <span class="card-title-modification"
                ><svg-icon iconClass="title-icon"></svg-icon
              ></span>
            </div>
          </div>
          <div>内容</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <div slot="header" class="clearfix">
            <div class="card-title">
              标签数排行
              <span class="card-title-modification"
                ><svg-icon iconClass="title-icon"></svg-icon
              ></span>
            </div>
          </div>
          <div>内容</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 概览数据组件
import OverviewData from "./components/OverviewData/index";
export default {
  // 组件
  components: {
    OverviewData
  },
  data() {
    return {
      month: [],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {}
};
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
// @import "~@/assets/styles/variable.styl"
</style>
