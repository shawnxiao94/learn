<template>
  <el-menu
    :unique-opened="uniqueOpened"
    :mode="mode"
    :default-active="activeIndex"
    :collapse="mode === 'vertical' ? collapse : undifined"
    router
  >
    <template v-for="item in tsRoutes">
      <!-- 无子菜单场景或者有子菜单但全部都是不可见的子菜单 -->
      <el-menu-item
        :index="item.path"
        v-if="
          !item.children ||
            (item.children &&
              item.children.every(c => {
                return c.meta.hidden
              }))
        "
        :to="item.path"
        :key="item.name"
      >
        <svg-icon
          v-if="item.meta && item.meta.icon && mode === 'vertical'"
          :iconClass="item.meta.icon"
        ></svg-icon>
        <span slot="title" :title="item.meta.title">{{ item.meta.title }}</span>
      </el-menu-item>
      <!-- 只有一个子菜单场景 -->
      <template v-if="item.children && item.children.length === 1">
        <!-- 该子菜单还有子菜单场景 -->
        <nav-menu
          :is-nest="true"
          class="nest-menu"
          :again="true"
          v-if="
            item.children[0].children && item.children[0].children.length > 0
          "
          :routes="item.children[0].children"
          :key="item.path"
        ></nav-menu>
        <!-- 该子菜单无子菜单场景 -->
        <el-menu-item
          v-else
          :to="item.children[0].path"
          :key="item.name"
          :index="item.children[0].path"
        >
          <svg-icon
            v-if="
              ((item.children[0].meta && item.children[0].meta.icon) ||
                item.meta.icon) &&
                mode === 'vertical'
            "
            :iconClass="item.children[0].meta.icon || item.meta.icon"
          ></svg-icon>
          <span slot="title" :title="item.children[0].meta.title">{{
            item.children[0].meta.title
          }}</span>
        </el-menu-item>
      </template>
      <!-- 有多个子菜单场景 -->
      <el-submenu
        v-if="item.children && item.children.length > 1"
        :index="item.path"
        :key="item.name"
      >
        <template slot="title">
          <svg-icon
            v-if="item.meta && item.meta.icon && mode === 'vertical'"
            :iconClass="item.meta.icon"
          ></svg-icon>
          <span slot="title" :title="item.meta.title">
            {{ item.meta.title }}
          </span>
        </template>
        <template v-for="child in item.children">
          <!-- 还有子菜单场景 -->
          <el-submenu
            v-if="child.children && child.children.length > 0"
            :index="child.path"
            :key="child.name"
          >
            <template slot="title">
              <svg-icon
                v-if="child.meta && child.meta.icon && mode === 'vertical'"
                :iconClass="child.meta.icon"
              ></svg-icon>
              <span slot="title" :title="child.meta.title">
                {{ child.meta.title }}
              </span>
            </template>
            <nav-menu
              :is-nest="true"
              class="nest-menu"
              :routes="child.children"
              :again="true"
              :key="child.path"
            ></nav-menu>
          </el-submenu>
          <!-- 无子菜单场景 -->
          <el-menu-item
            v-else
            :to="child.path"
            :key="child.name"
            :index="child.path"
          >
            <svg-icon
              class="child-icon"
              v-if="child.meta && child.meta.icon && mode === 'vertical'"
              :iconClass="child.meta.icon"
            ></svg-icon>
            <span
              slot="title"
              v-if="child.meta && child.meta.title"
              :title="child.meta.title"
              >{{ child.meta.title }}</span
            >
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { deepClone } from "@/common/utils/index";
export default {
  name: "NavMenu",
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
    },
    routes: {
      type: Array,
      default () {
        return [];
      }
    },
    rootPath: {
      type: String,
      default () {
        return "";
      }
    },
    again: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tsRoutes () {
      return this.formaterRoutes(this.routes);
    },
    activeIndex () {
      // 当访问隐藏的子路由时，菜单的父级保持激活状态
      let path = this.$route.path;
      if (this.$route.meta.hidden) {
        path = this.$route.matched[0].redirect;
      }
      return path;
    }
  },
  methods: {
    formaterRoutes (_r) {
      if (this.again) {
        return _r;
      }
      // eslint-disable-next-line no-param-reassign
      _r = deepClone(_r)
        .filter(item => item.meta && !item.meta.hidden && item.name)
        .map(item => {
          if (item.children && item.children.length) {
            item.children.forEach(childItem => {
              if (childItem.path) {
                childItem.path = item.path + "/" + childItem.path;
              }
            });
            item.children = this.formaterRoutes(item.children);
          }
          item.path = this.rootPath ? this.rootPath + item.path : item.path;
          return item;
        });
      return _r;
    }
  }
};
</script>
