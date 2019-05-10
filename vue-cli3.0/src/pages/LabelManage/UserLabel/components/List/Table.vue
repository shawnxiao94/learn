<!--
  * @see table
-->
<template>
  <el-table :data="data" stripe size="medium" row-key="id">
    <el-table-column label="标签来源">
      <template slot-scope="scope">
        {{ scope.row.sourceName }}
      </template>
    </el-table-column>
    <!-- 类型 -->
    <el-table-column label="类型">
      <template slot-scope="scope">
        <el-tag size="mini" class="theme-a">
          {{ scope.row.tagType | tagTypeFilter }}
        </el-tag>
      </template>
    </el-table-column>
    <!-- 标签名 -->
    <el-table-column label="标签名" width="200">
      <template slot-scope="scope">
        <span class="ellipsis" :title="scope.row.label" style="width:180px">
          {{ scope.row.label }}
        </span>
      </template>
    </el-table-column>
    <!-- 状态 -->
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-tag size="mini" class="theme-f">
          {{ scope.row.isOpen }}
        </el-tag>
      </template>
    </el-table-column>
    <!-- 用户数 -->
    <el-table-column label="用户数" width="100">
      <template slot="header" slot-scope="scope" :id="scope.$index">
        <!-- 有效期 -->
        <el-popover trigger="hover" placement="top">
          <div class="tips">
            <h3>有效期</h3>
            <p class="margin-top-small color-03">
              统计的用户数为标签有效期（不包含标签有效期的结束日期）内曾经打过这个标签的总用户数
            </p>
          </div>
          <!-- 用户数 -->
          <span slot="reference">
            用户数
          </span>
        </el-popover>
      </template>
      <template slot-scope="scope">
        <span>
          {{ scope.row.clientTotals }}
        </span>
      </template>
    </el-table-column>
    <!-- 生效日期 -->
    <el-table-column sortable label="生效日期" width="110">
      <template slot-scope="scope">
        {{ scope.row.effDate | parseTime("YYYY-MM-DD") }}
      </template>
    </el-table-column>
    <!-- 失效日期 -->
    <el-table-column sortable label="失效日期" width="110">
      <template slot-scope="scope">
        {{ scope.row.expDate | parseTime("YYYY-MM-DD") }}
      </template>
    </el-table-column>
    <!-- 创建日期 -->
    <el-table-column sortable label="创建日期" width="110">
      <template slot-scope="scope">
        {{ scope.row.crtTime | parseTime("YYYY-MM-DD") }}
      </template>
    </el-table-column>
    <el-table-column
      :fixed="
        $store.getters.app.responsiveLayout.clientType !== 'mobile'
          ? 'right'
          : undefined
      "
      align="center"
      width="160"
      label="操作"
    >
      <template slot-scope="scope" :id="scope">
        <user-label-buttons :data="scope"></user-label-buttons>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// 调用按钮子组件
import UserLabelButtons from "./components/Button/index";
export default {
  components: {
    UserLabelButtons
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
