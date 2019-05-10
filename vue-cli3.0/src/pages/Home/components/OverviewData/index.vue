<!--
  * @see 数据概览
-->
<template>
  <div class="overview-data">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="box-card">
          <div class="box-card-imgtext theme-b ts-bottom-none">
            <div class="box-card-imgtext-imgbox">
              <img src="~@/assets/images/pages/Home/span.png" alt="" />
            </div>
            <div class="box-card-imgtext-numbox">
              <div class="ts-label">标签总数</div>
              <div class="ts-num">
                <count-to
                  :startVal="0"
                  :title="viewData.tagTotal"
                  :endVal="viewData.tagTotal"
                  :duration="2600"
                ></count-to>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="box-card">
          <div class="box-card-imgtext theme-b ts-bottom-none">
            <div class="box-card-imgtext-imgbox">
              <img src="~@/assets/images/pages/Home/anbm.png" alt="" />
            </div>
            <div class="box-card-imgtext-numbox">
              <div class="ts-label">用户画像</div>
              <div class="ts-num">
                <count-to
                  :startVal="0"
                  :title="viewData.portraitTotal"
                  :endVal="viewData.portraitTotal"
                  :duration="3200"
                ></count-to>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="box-card">
          <div class="box-card-imgtext theme-b ts-bottom-none">
            <div class="box-card-imgtext-imgbox">
              <img src="~@/assets/images/pages/Home/user.png" alt="" />
            </div>
            <div class="box-card-imgtext-numbox">
              <div class="ts-label">用户总数</div>
              <div class="ts-num">
                <count-to
                  :startVal="0"
                  :title="viewData.userTotal"
                  :endVal="viewData.userTotal"
                  :duration="4000"
                ></count-to>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="box-card">
          <div class="box-card-imgtext theme-b ts-bottom-none">
            <div class="box-card-imgtext-imgbox">
              <img src="~@/assets/images/pages/Home/span.png" alt="" />
            </div>
            <div class="box-card-imgtext-numbox">
              <div class="ts-label">活跃用户数</div>
              <div class="ts-num">
                <count-to
                  :startVal="0"
                  :title="viewData.userTotal"
                  :endVal="viewData.userTotal"
                  :duration="4000"
                ></count-to>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CountTo from "vue-count-to";
export default {
  components: { CountTo },
  data() {
    return {
      loading: false,
      viewData: {
        // 标签总数
        tagTotal: 14065012,
        // 用户总数
        userTotal: 15645,
        // 用户分群总数
        portraitTotal: 123154
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
@import "~@/assets/styles/variable.styl"
// 卡片面板
.box-card
  margin-bottom 20px
</style>
