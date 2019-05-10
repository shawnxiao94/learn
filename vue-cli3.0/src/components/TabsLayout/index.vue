<!--
  * @see Tabs layout组件
-->
<template>
  <div class="tabs-layout" :class="type">
    <el-tabs
      v-model="tabsLayout.activeName"
      @tab-remove="removeTab"
      :before-leave="beforeLeave"
    >
      <el-tab-pane
        v-for="(item, index) in tabsLayout.tabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="index !== 0"
      >
        <slot :data="item"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: {
    // class样式
    type: {
      type: String,
      default: ""
    },
    // 标签配置
    tabsDefaultOptions: {
      type: Object,
      default() {
        return {
          activeName: "",
          tabs: []
        };
      }
    }
  },
  data() {
    return {
      tabsLayout: this.tabsDefaultOptions
    };
  },
  methods: {
    // 添加Tabs
    addTab({ title = "未命名", name, component = "List" } = {}) {
      let _name = name || String(Math.random()).replace(".", "");
      this.tabsLayout.tabs.push({
        title: title,
        name: _name,
        component: component
      });
      this.tabsLayout.activeName = _name;
    },
    // 切换钩子
    // beforeLeave(activeName, oldActiveName) {
    //   // return false;
    // }
    // 删除Tabs
    removeTab(targetName) {
      let _tabs = this.tabsLayout.tabs;
      if (_tabs && _tabs.length) {
        //如果删除项为当前tabs选择项，则选中该项的前一项tabs页面
        if (targetName === this.tabsLayout.activeName) {
          // 取前一个name，_prevsName为临时name
          let _prevsName;
          // 找到当前删除项则确认前一个tabs的name
          let prevName;
          for (let tab of _tabs) {
            // 找到当前删除项则确认前一个tabs的name
            if (targetName === tab.name) {
              prevName = _prevsName;
              break;
            }
            _prevsName = tab.name;
          }
          // 将选项卡设置到删除项前一个tabs
          this.tabsLayout.activeName = prevName;
        }
        // 过滤掉删除的tabs
        this.tabsLayout.tabs = _tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
// 调用样式常用色值、字体大小等变量
@import "~@/assets/styles/variable.styl"
// 常用样式工具库
@import "~@/assets/styles/helps/mixin.styl"
/*全局样式*/
.tabs-layout
  // 列表tabs样式
  &.tabs-layout-list
    >>> .el-tabs
      // 头部背景
      .el-tabs__header
        background $color-white
        border-radius $radius-size-medium
        padding 0 20px
        margin-bottom 20px
        // 出现滚动条时左右翻页样式
        .el-tabs__nav-wrap.is-scrollable
          padding 0
          overflow visible
          .el-tabs__nav-prev,.el-tabs__nav-next
            height 60px
            width 20px
            display-flex()
            justify-content center
            cursor pointer
          .el-tabs__nav-prev
            left -20px
          .el-tabs__nav-next
            right -20px
        // tab标签元素
        .el-tabs__item
          height 60px
          line-height 60px
          user-select none
          &.is-active,&:hover
            color $color-01
        .el-tabs__active-bar
          background $color-a
/*End 全局样式*/
/*手机端适配*/
// @media (max-width 768px)
/*End 手机端适配*/
</style>
