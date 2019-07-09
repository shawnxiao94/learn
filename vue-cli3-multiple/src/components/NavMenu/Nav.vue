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
import { mapGetters } from 'vuex'
export default {
  props: {
    mode: {
      type: String,
      default() {
        return 'horizontal'
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
    ...mapGetters(['permission']),
    routes() {
      return this.permission.menuNavs.filter(item => {
        return item.children && !item.hidden
      })
    },
    activeIndex() {
      let _index = '0'
      this.permission.menuNavs.forEach((item, index) => {
        if (item.path.includes(this.$route.path.split('/')[1])) {
          _index = index
        }
      })
      return _index + ''
    }
  },
  methods: {
    jumpTo(nav) {
      this.$router.push(`${nav.path}`)
    }
  }
}
</script>
