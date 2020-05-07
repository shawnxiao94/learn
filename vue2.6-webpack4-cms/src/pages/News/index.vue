<!---
  通过获取面包屑数组长度，v-show判断来执行显示对应的模板，
  避免父子层级组件多建router-view文件的麻烦
-->
<template>
  <div>
    <bread-crumb ref="routerCrumbs" firstCrumbsName="NewsIndex"></bread-crumb>
    <!-- 新闻列表首页模板 -->
    <el-table :data="tableData" style="width: 100%" v-show="!crumbsLength">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="类型" width="180"> </el-table-column>
      <el-table-column prop="address" label="描述"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            移除
          </el-button>
          <el-button
            @click.native.prevent="catDetail(scope.$index)"
            type="text"
            size="small"
          >
            类型列表
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新闻列表下的类型列表模板 新闻列表下的类型列表模板 在此渲染-->
    <keep-alive :include="cachedViews">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import BreadCrumb from "components/BreadCrumb";
import { mapGetters } from "vuex";
export default {
  name: "NewsIndex",
  components: {
    BreadCrumb
  },
  data () {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "财经",
          address: "财金理财"
        },
        {
          date: "2016-05-04",
          name: "军事",
          address: "军事政治格局"
        },
        {
          date: "2016-05-01",
          name: "娱乐",
          address: "娱乐至死"
        }
      ]
    };
  },
  computed: {
    // 调用路由面包屑数据仓库
    ...mapGetters(["crumbs", "permission"]),
    cachedViews () {
      if (this.permission.cachedViews.length) {
        return this.permission.cachedViews.toString();
      } else {
        return "undefined";
      }
    },
    crumbsLength () {
      if (this.crumbs.routerCrumbs.length === 1) {
        return this.crumbs.routerCrumbs[0].name !== "NewsIndex";
      } else {
        return this.crumbs.routerCrumbs.length > 1;
      }
    }
  },
  // 离开此页面前清空面包屑路由
  beforeRouteLeave (to, from, next) {
    this.$refs.routerCrumbs.delRouterCrumbs();
    next();
  },
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1);
    },
    catDetail (index) {
      this.$router.push(`/news/index/${index}`);
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-table
  .warning-row
    background oldlace
  .success-row
    background #f0f9eb
</style>
