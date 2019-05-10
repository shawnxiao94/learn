<!--
  * @see 标签管理页面
-->
<template>
  <div>
    <!--面包屑组件-->
    <crumbs></crumbs>
    <tabs-layout
      type="tabs-layout-list"
      ref="tabsLayout"
      :tabsDefaultOptions="tabs.tabsDefaultOptions"
    >
      <template slot-scope="scope">
        <component @addTab="addTab" :is="scope.data.component"> </component>
      </template>
    </tabs-layout>
  </div>
</template>
<script>
/**
 * @see tas layout 组件封装
 *   */
// tabs layout
import TabsLayout from "@/components/TabsLayout/index";
/* End tas layout 组件封装 */
/**
 * @see 调用列表组件
 */
import List from "./components/List/index";
/* End 调用列表组件 */
/**
 * @see 表单组件
 */
import Add from "./components/Add/index";
/* End 表单组件 */
export default {
  components: {
    TabsLayout,
    List,
    Add
  },
  data() {
    return {
      tabs: {
        tabsDefaultOptions: {
          activeName: "List",
          tabs: [
            {
              name: "List",
              component: "List",
              title: "列表"
            }
          ]
        }
      }
    };
  },
  methods: {
    // 添加tabs标签
    addTab(options) {
      this.$refs.tabsLayout.addTab(options);
    }
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
// @import "~@/assets/styles/variable.styl"
</style>
