<!--
  * @see 标签管理页面
-->
<template>
  <!--table or card 组件-->
  <data-list
    ref="dataList"
    :viewType="table.viewType"
    :sortData="table.sortData"
    @changeSort="value => {}"
  >
    <template slot="form-box">
      <!--按钮组-->
      <div class="form-box-left">
        <el-form :inline="true">
          <el-form-item>
            <el-button
              type="primary"
              @click="
                () => {
                  this.$emit('addTab', {
                    title: '表单页面:' + getRandomNum(' w', 6),
                    component: 'Add'
                  });
                }
              "
            >
              <svg-icon class="add" iconClass="ope-add"></svg-icon>
              新增表单
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--表单组-->
      <div class="form-box-searchs">
        <el-form :inline="true">
          <!-- 搜索按钮 -->
          <el-form-item label="标签名">
            <!-- 模糊搜索 -->
            <!-- <i class="el-icon-search"></i> -->
            <el-input
              clearable
              class="w-260"
              spellcheck="false"
              placeholder="支持批量模糊搜索"
            >
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
    <!--表格插槽-->
    <template slot="tableColumn">
      <!--table-->
      <list-table :data="table.data"></list-table>
    </template>
    <!--表格分页插槽-->
    <template slot="tablePage">
      <!-- 分页 -->
      <page
        ref="page"
        :parent="this"
        structure="table"
        @ready-fetch="getLabelData"
      >
      </page>
    </template>
    <!--卡片插槽-->
    <template slot="cardColumn">
      <!--card-->
      <list-card :data="table.data"></list-card>
    </template>
    <!--卡片分页插槽-->
    <template slot="cardPage">
      <!-- 分页 -->
      <page
        ref="page"
        structure="table"
        :parent="this"
        :page-size="6"
        :page-sizes="[6, 12, 18, 24, 30]"
        @ready-fetch="getLabelData"
      >
      </page>
    </template>
  </data-list>
</template>
<script>
/**
 * @see table or card 组件封装
 *   */
// table or card
import DataList from "@/components/DataList/index";
// 分页
import Page from "@/components/Page/index";
// 表格列表视图
import ListTable from "./Table";
// 卡片列表视图
import ListCard from "./Card";
/* End table or card 组件封装 */
// 获取标签列表
import * as api from "@/data/api/LabelManage/UserLabel/index";
// 获取随机数
import { getRandomNum } from "@/common/utils/index";
export default {
  components: {
    DataList,
    ListTable,
    ListCard,
    Page
  },
  data() {
    return {
      table: {
        // 排序配置
        sortData: [
          { title: "日期排序", sortType: "data" },
          { title: "姓名排序", sortType: "name" },
          { title: "地址排序", sortType: "address" },
          { title: "城市排序", sortType: "province" }
        ],
        // 表单
        form: {},
        // 数据
        data: []
      }
    };
  },
  mounted() {
    // 渲染列表数据
    this.setLabelData();
  },
  methods: {
    // 渲染列表数据
    setLabelData() {
      // 初始化分页
      this.$refs.page.fetchList();
    },
    // 获取列表数据
    getLabelData() {
      api.labelList().then(res => {
        this.table.data = res.data.content;
      });
    },
    // 获取随机数
    getRandomNum
  }
};
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
// @import "~@/assets/styles/variable.styl"
@media (max-width 768px)
  .form-box-left,.form-box-searchs
    float none!important
</style>
