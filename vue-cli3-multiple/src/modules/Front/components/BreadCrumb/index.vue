<template>
  <el-breadcrumb
    separator="/"
    class="crumbs"
    v-if="crumbs.routerCrumbs.length > 1"
  >
    <el-breadcrumb-item
      v-for="item in crumbs.routerCrumbs"
      :key="item.path"
      :to="{ path: `${item.path}` }"
      >{{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStorage } from '@/common/utils/auth.js'
import * as constains from 'dataF/store/modules/pages/components/Crumbs/constants'
export default {
  props: {
    firstCrumbsName: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['crumbs'])
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.data.flag) {
          this.getCrumbsStorage()
          this.data.flag = false
        }
        this.addRouterCrumbs()
      }
    }
  },
  data() {
    return {
      data: {
        // 设置是否是第一次进来标识位
        flag: true
      }
    }
  },
  methods: {
    // 如果VUEX为空，则去本地存储去取
    getCrumbsStorage() {
      let arr = getStorage(constains.ROUTERCRUMBS)
      if (!this.crumbs.routerCrumbs.length && arr && arr.length) {
        this.$store.dispatch(
          'SetRouterCrumbs',
          getStorage(constains.ROUTERCRUMBS)
        )
      }
    },
    // 格式化路由
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    // 添加路由面包屑路由
    addRouterCrumbs() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }

      let _moveRouter
      if (
        this.crumbs.routerCrumbs.some(item => {
          if (item.name === route.name) {
            _moveRouter = item
            return true
          } else {
            return false
          }
        })
      ) {
        this.moveToRouterCrumbs(_moveRouter)
      } else {
        if (this.firstCrumbsName === this.$route.name) {
          this.delRouterCrumbs()
        }
        this.$store.dispatch('AddRouterCrumbs', route)
      }
    },
    // 清空激活页之后的缓存页面数组,移动到指定路由面包屑路由
    moveToRouterCrumbs(route) {
      this.$store.dispatch('MoveToRouterCrumbs', route)
    },
    // 清空全部路由面包屑路由
    delRouterCrumbs() {
      this.$store.dispatch('DelRouterCrumbs')
    }
  },
  destroyed() {
    this.delRouterCrumbs()
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
.crumbs
  height 50px
  line-height 50px
  padding 0 20px
  background-color $color-white
  font-weight normal
  .el-breadcrumb__item
    >>>.el-breadcrumb__inner
      font-weight normal
      &.is-link
        font-weight normal
</style>
