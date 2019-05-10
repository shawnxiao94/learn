<!--
  * @see table
-->
<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :lg="8" v-for="item in data" :key="item">
      <el-card class="box-card">
        <div class="box-card-imgtext">
          <div class="box-card-imgtext-imgbox">
            <img src="~@/assets/images/common/logo.png" />
          </div>
          <div class="box-card-imgtext-textbox">
            <h3>{{ item.label }}</h3>
            <div class="box-card-ts-labels">
              <el-tag class="theme-b">标签三</el-tag>
              <el-tag class="theme-f">标签四</el-tag>
              <el-tag class="theme-d">标签五</el-tag>
            </div>
          </div>
        </div>
        <div class="box-card-info">
          <ul>
            <li>
              <span class="box-card-info-li-label">生效日期</span>
              <span class="box-card-info-li-text">{{
                item.effDate | parseTime("YYYY-MM-DD")
              }}</span>
            </li>
            <li>
              <span class="box-card-info-li-label">失效日期</span>
              <span class="box-card-info-li-text">{{
                item.expDate | parseTime("YYYY-MM-DD")
              }}</span>
            </li>
            <li>
              <span class="box-card-info-li-label">创建日期</span>
              <span class="box-card-info-li-text">{{
                item.crtTime | parseTime("YYYY-MM-DD")
              }}</span>
            </li>
          </ul>
        </div>
        <user-label-buttons
          :data="scope"
          type="box-card-btns"
        ></user-label-buttons>
      </el-card>
    </el-col>
  </el-row>
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
