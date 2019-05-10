<!--
  * @desc  主组件
  * @see  AppMain
-->
<template>
  <div class="app-main">
    <!-- 结合router，缓存页面 -->
    <router-view :key="key" v-if="$route.meta.noCache"></router-view>
    <keep-alive v-else>
      <router-view :key="key"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "AppMain",
  // 计算属性
  computed: {
    key() {
      return this.$route.path.replace(/\//g, "_");
    }
  },
  methods: {
    // 获取主题区域高度
    getAppMainMinHeight() {
      let _appMainMinheight =
        window.innerHeight -
        document.querySelector(".header").offsetHeight -
        document.querySelector(".footer").offsetHeight;
      document.querySelector(".app-main").style.minHeight =
        _appMainMinheight + "px";
    }
  },
  mounted() {
    this.getAppMainMinHeight();
    // 添加获取主题区域高度事件
    window.addEventListener("resize", this.getAppMainMinHeight);
  },
  destroyed() {
    // 清除获取主题区域高度事件
    window.removeEventListener("resize", this.getAppMainMinHeight);
  }
};
</script>

<style lang="stylus" scoped></style>
