<template>
  <div class="error-log" v-if="errorLog.logs && errorLog.logs.length">
    <span class="error-log-text" @click="dialogVisible = true">ERROR LOG</span>
    <el-dialog title="Error Log" :visible.sync="dialogVisible" width="80%">
      <div
        v-for="(item, index) in errorLog.logs"
        :key="index"
        class="error-panel"
      >
        <div class="error-title">
          {{ item.index }}：{{ item.title }}。 错误时间：{{ item.time }}
        </div>
        <div class="error-api" v-if="item.log && item.log.api">
          API地址：{{ item.log.api }}
        </div>
        <div class="error-api" v-if="item.log && item.log.params">
          入参：{{ item.log.params }}
        </div>
        <div class="error-message" v-if="item.log && item.log.data">
          出参：{{ item.log.data }}
        </div>
        <div class="error-api" v-if="item.url">URL地址：{{ item.url }}</div>
        <div class="error-message">错误信息：{{ item.message }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    errorLog() {
      return this.$store.getters.errorLog;
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  }
};
</script>

<style scoped lang="stylus">
@import "~@/assets/styles/variable.styl"
  .error-log
    position fixed
    z-index 2
    right 5px
    bottom 5px
    .error-log-text
      color $color-e
      cursor pointer
      &:hover
        color $color-e
    .error-panel
      padding 20px
      border 1px $color-line solid
      background $color-a
      border-radius 5px
      line-height 1.4
      &~.error-panel
        margin-top 20px
      .error-title
        margin-bottom 5px
      .error-api
        margin-bottom 5px
</style>
