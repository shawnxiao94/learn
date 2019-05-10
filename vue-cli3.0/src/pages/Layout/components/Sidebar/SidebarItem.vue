<template>
  <span class="menu-wrapper">
    <template v-for="item in tsRoutes">
      <router-link v-if="!item.children" :to="item.path" :key="item.name">
        <el-menu-item :index="item.path">
          <svg-icon
            v-if="item.meta && item.meta.icon"
            :iconClass="item.meta.icon"
          ></svg-icon>
          <span slot="title" :title="item.meta.title"
            >{{ item.meta.title }}
          </span>
        </el-menu-item>
      </router-link>
      <template v-if="item.children && item.children.length === 1">
        <sidebar-item
          :is-nest="true"
          class="nest-menu"
          :again="true"
          v-if="
            item.children[0].children && item.children[0].children.length > 0
          "
          :routes="item.children[0].children"
          :key="item.path"
        ></sidebar-item>
        <router-link v-else :to="item.children[0].path" :key="item.name">
          <el-menu-item :index="item.children[0].path">
            <svg-icon
              v-if="item.children[0].meta && item.children[0].meta.icon"
              :iconClass="item.children[0].meta.icon"
            ></svg-icon>
            <span slot="title" :title="item.children[0].meta.title"
              >{{ item.children[0].meta.title }}
            </span>
          </el-menu-item>
        </router-link>
      </template>
      <el-submenu
        v-if="item.children && item.children.length > 1"
        :index="item.path"
        :key="item.name"
      >
        <template slot="title">
          <svg-icon
            v-if="item.meta && item.meta.icon"
            :iconClass="item.meta.icon"
          ></svg-icon>
          <span slot="title" :title="item.meta.title">{{
            item.meta.title
          }}</span>
        </template>
        <template v-for="child in item.children">
          <el-submenu
            v-if="child.children && child.children.length > 0"
            :index="child.path"
            :key="child.name"
          >
            <template slot="title">
              <svg-icon
                v-if="child.meta && child.meta.icon"
                :iconClass="child.meta.icon"
              ></svg-icon>
              <span slot="title" :title="child.meta.title">{{
                child.meta.title
              }}</span>
            </template>
            <sidebar-item
              :is-nest="true"
              class="nest-menu"
              :routes="child.children"
              :again="true"
              :key="child.path"
            ></sidebar-item>
          </el-submenu>
          <router-link v-else :to="child.path" :key="child.name">
            <el-menu-item :index="child.path">
              <svg-icon
                class="child-icon"
                v-if="child.meta && child.meta.icon"
                :iconClass="child.meta.icon"
              ></svg-icon>
              <span
                slot="title"
                v-if="child.meta && child.meta.title"
                :title="child.meta.title"
              >
                {{ child.meta.title }}
              </span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </span>
</template>

<script>
import { deepClone } from "@/common/utils/index";

export default {
  // 页面命名
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    },
    again: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    routes(newValue) {
      this.tsRoutes = this.formaterRoutes(newValue);
    }
  },
  data() {
    return {
      tsRoutes: this.formaterRoutes(this.routes)
    };
  },
  methods: {
    formaterRoutes(_r) {
      if (this.again) {
        return _r;
      }
      _r = deepClone(_r)
        .filter(item => !item.hidden && item.name)
        .map(item => {
          if (item.children && item.children.length) {
            item.children.forEach(childItem => {
              if (childItem.path) {
                childItem.path = item.path + "/" + childItem.path;
              }
            });
            item.children = this.formaterRoutes(item.children);
          }
          return item;
        });
      return _r;
    }
  }
};
</script>
<style lang="stylus" scoped>
.menu-wrapper
  .svg-icon
    margin-right 5px
</style>
