<template>
  <div class="main full-screen">
    <!-- Header组件 -->
    <Header></Header>
    <!-- app-main组件 -->
    <app-main></app-main>
    <el-backtop :bottom="100" class="fixed-backtop">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
    <!-- Footer组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 引入组件
import Header from './components/Header.vue'
// 引入组件
import Footer from './components/Footer.vue'
// 引入组件
// 引入组件
import AppMain from './components/AppMain'
export default {
  // 组件名称
  name: 'Layout',
  // 注册组件
  components: {
    Header,
    Footer,
    AppMain
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
.main
  box-sizing border-box
  padding 60px 0 30px 0
  .fixed-backtop
    position fixed
    background-color $color-04
    color $color-03
    width 30px
    height 30px
    line-height 30px
    text-align center
    font-size 18px
    border-radius 50%
    cursor pointer
    z-index 999
</style>
