<template>
  <el-scrollbar ref="elScrollbar">
    <el-menu
      :unique-opened="uniqueOpened"
      :mode="mode"
      :default-active="activeIndex"
    >
      <el-menu-item
        v-for="(item, index) in routes"
        :index="index.toString()"
        :key="item.name"
        @click="jumpTo(item)"
      >
        <span slot="title" :title="item.meta.title"
          >{{ item.meta.title }}
        </span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    mode: {
      type: String,
      default () {
        return "horizontal";
      }
    },
    uniqueOpened: {
      type: Boolean,
      default: true
    },
    collapse: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(["permission"]),
    routes () {
      return this.permission.menuNavs.filter(item => {
        return item.children && !item.hidden;
      });
    },
    activeIndex () {
      let _index = "0";
      this.permission.menuNavs.forEach((item, index) => {
        if (item.path.includes(this.$route.path.split("/")[1])) {
          _index = index;
        }
      });
      return _index + "";
    }
  },
  mounted () {
    // 浏览器视窗改变时重置elScrollbar插件解决滚动条显示问题
    this.resizeElScrollbar();
    window.addEventListener("resize", this.resizeElScrollbar);
  },
  methods: {
    jumpTo (nav) {
      this.$router.push(`${nav.path}`);
    },
    // 浏览器视窗改变时重置elScrollbar插件解决滚动条显示问题
    resizeElScrollbar () {
      this.$refs.elScrollbar.update();
    }
  },
  destroyed () {
    // 注销组件关闭window resize事件
    window.removeEventListener("resize", this.resizeElScrollbar);
  }
};
</script>
