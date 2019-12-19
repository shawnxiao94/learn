<template>
  <div class="tag-view-wrapper" v-if="tagsView.visitedViews.length">
    <div class="tagviews">
      <el-tabs
        v-model="data.activeTabName"
        type="card"
        :closable="tagsView.visitedViews.length > 1 ? true : undefined"
        @tab-remove="removeTab"
        @tab-click="tabClick"
      >
        <el-tab-pane
          v-for="item in tagsView.visitedViews"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <ul
        class="tabs-contextmenu"
        v-show="data.contextmenu.visible"
        :style="{
          left: data.contextmenu.left + 'px',
          top: data.contextmenu.top + 'px'
        }"
      >
        <li @click="closeSelectedTag">
          关闭当前
        </li>
        <li @click="closeOthersTags">关闭其它</li>
        <li @click="closeAllTags">关闭全部</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      data: {
        activeTabName: "",
        // 当前激活页面路径
        activeTabPath: "",
        contextmenu: {
          visible: false,
          top: 0,
          left: 0,
          id: null
        }
      }
    };
  },
  computed: {
    ...mapGetters(["tagsView"])
  },
  watch: {
    $route () {
      this.addViewTags();
    },
    "data.contextmenu.visible" (value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted () {
    this.addViewTags();
  },
  methods: {
    tabClick () {
      this.$router.push({
        path: this.tagsView.visitedViews[arguments[0].index].path
      });
    },
    removeTab (name) {
      const arr = this.tagsView.visitedViews;
      if (arr.length < 2) {
        return;
      }
      const activeObj = {
        name: "",
        path: "",
        flag: false
      };
      if (this.data.activeTabName === name) {
        // 如果删除的是当前激活状态下的页面,则更改激活页面为它的下一页或者上一页
        activeObj.flag = true;
        arr.forEach((item, index) => {
          if (item.name === name) {
            if (arr[index + 1] && arr[index + 1].name) {
              activeObj.name = arr[index + 1].name;
              activeObj.path = arr[index + 1].path;
            } else if (arr[index - 1] && arr[index - 1].name) {
              activeObj.name = arr[index - 1].name;
              activeObj.path = arr[index - 1].path;
            }
          }
        });
      }
      this.$store.dispatch("delVisitedViews", name).then(() => {
        this.gotoPath(activeObj);
      });
    },
    gotoPath (activeObj) {
      // 跳转到指定页面
      if (activeObj.flag) {
        this.$router.push({ path: activeObj.path });
        this.data.activeTabPath = activeObj.path;
        this.data.activeTabName = activeObj.name;
      }
    },
    addViewTags () {
      const matchedArr = this.$route.matched;
      const routeCur = matchedArr[matchedArr.length - 1];
      const obj = {
        name: "",
        path: "",
        title: ""
      };
      function filterActiveRoute (route) {
        if (!route.meta.hidden) {
          obj.name = route.name;
          obj.path = route.path;
          obj.title = route.meta.title;
        } else {
          filterActiveRoute(route.parent);
        }
      }
      // 递归获取主路由信息
      filterActiveRoute(routeCur);
      // 当前激活状态的路由name
      this.data.activeTabName = obj.name;
      this.data.activeTabPath = obj.path;
      this.$store.dispatch("addVisitedViews", obj);
      setTimeout(() => {
        this.bindEventContextmenu(this.data.activeTabName);
      }, 0);
    },
    // 绑定鼠标右键事件
    bindEventContextmenu (id) {
      const _element = document.getElementById("tab-" + id);
      _element &&
        _element.addEventListener("contextmenu", event => {
          event.stopPropagation();
          event.preventDefault();
          this.data.contextmenu.id = id;
          this.openMenu(event);
        });
    },
    // 展开菜单
    openMenu (event) {
      // 右键菜单一个以上时才给予显示
      this.data.contextmenu.visible = this.tagsView.visitedViews.length > 1;
      const width = window.innerWidth - 17;
      if (width - event.clientX < 80) {
        this.data.contextmenu.left = width - 80;
      } else {
        this.data.contextmenu.left = event.clientX;
      }
      this.data.contextmenu.top = event.clientY;
    },
    // 关闭当前
    closeSelectedTag () {
      this.removeTab(this.data.contextmenu.id);
    },
    // 关闭其他,留下当前点击页面
    closeOthersTags () {
      this.$store
        .dispatch("delOthersViews", this.data.contextmenu.id)
        .then(routeArr => {
          this.data.activeTabName = routeArr[0].name;
          this.$router.push({
            path: routeArr[0].path
          });
        });
    },
    // 关闭全部, 只留下当前页
    closeAllTags () {
      this.$store.dispatch("delAllViews", this.data.activeTabName);
    },
    // 点击body 关闭右侧菜单
    closeMenu () {
      this.data.contextmenu.visible = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
.tag-view-wrapper
  width 100%
  height 45px
  transition all .5s ease-in-out
  .tagviews
    width 100%
    height 45px
    line-height 45px
    background-color $color-white
    box-sizing border-box
    padding-right 10px
    .el-tabs
      height 100%
      .el-tabs__content
        height 0
    .tabs-contextmenu
      background $color-white
      z-index 100
      position fixed
      list-style-type none
      left auto
      padding 5px 0
      border-radius 4px
      font-weight 400
      border 1px solid $color-line
      li
        padding 2px 16px
        cursor pointer
        line-height 25px
        &:hover
          background $color-09
</style>
