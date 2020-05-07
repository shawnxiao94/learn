<!-- 分页器 -->
<template>
  <div :class="wrapClass">
    <el-pagination
      v-if="!disabled"
      :page-size="childPageSize"
      :current-page="currentPage"
      :total="total || 0"
      :page-sizes="pageSizes"
      :background="background"
      :small="small"
      :layout="forMobileLayout"
      @size-change="handleSizeChange"
      @current-change="fetchList"
    >
    </el-pagination>
  </div>
</template>

<script>
import { setScrollTop } from '@/common/utils/index'
// 分页选项
const {
  PAGE_SIZE,
  CURRENT_PAGE,
  PAGE_NUMBER_KEY,
  PAGE_SIZE_KEY,
  TOTAL_COUNT_KEY,
  FORM_KEY,
  EDIT_OPERA_SYMBOL,
  DELETE_OPERA_SYMBOL,
  WRAP_CLASS
} = {
  // 每页默认的条目数
  PAGE_SIZE: 10,
  // 默认的当前页码
  CURRENT_PAGE: 1,
  PAGE_NUMBER_KEY: 'pageNumber',
  PAGE_SIZE_KEY: 'pageSize',
  TOTAL_COUNT_KEY: 'totalCount',
  FORM_KEY: 'form',
  EDIT_OPERA_SYMBOL: 'EDIT',
  DELETE_OPERA_SYMBOL: 'DELETE',
  WRAP_CLASS: 'pagination-container'
}

export default {
  name: 'Page',
  props: {
    // 是否为分页按钮添加背景色
    background: {
      type: Boolean,
      default: true
    },
    // 是否小规格
    small: {
      type: Boolean,
      default: false
    },
    // 默认条数
    pageSize: {
      type: Number,
      default: PAGE_SIZE
    },
    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 总条目数
    total: {
      required: true
    },
    // 分页对象结构描述
    structure: {
      type: [String, Array, Object],
      required: true
    },
    // 是否不需要分页功能
    disabled: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Object
    }
  },
  data() {
    return {
      // 当前页码
      currentPage: this.resolveParam(PAGE_NUMBER_KEY) || CURRENT_PAGE,
      // 每页条目数
      childPageSize:
        this.pageSize || this.resolveParam(PAGE_SIZE_KEY) || PAGE_SIZE
    }
  },

  created() {
    // 显示每页条目数
    this.addIntoPageSizes()
  },

  methods: {
    /**
     * currentPage 改变时会触发
     * @param {Number | String} pageNo [页数]
     * @param {Object} opt [参数]
     */
    fetchList(pageNo, opt) {
      // 如果需要分页，那就设置分页入参
      if (!this.disabled) {
        // for pageNo
        let param = this.resolveRootAndNamespace(PAGE_NUMBER_KEY)
        let root = param.root
        let ns = param.ns
        if (pageNo === DELETE_OPERA_SYMBOL) {
          // 删除操作
          const totalCount = this.getObjectInNamespace(
            root,
            this.resolveRootAndNamespace(TOTAL_COUNT_KEY).ns
          )
          if (
            totalCount > this.childPageSize &&
            totalCount % this.childPageSize > 1
          ) {
            pageNo = this.currentPage
          } else if (
            totalCount > this.childPageSize &&
            totalCount % this.childPageSize === 1
          ) {
            pageNo = this.currentPage - 1
          } else {
            pageNo = this.currentPage
          }
        } else if (pageNo === EDIT_OPERA_SYMBOL) {
          // 编辑操作
          pageNo = this.currentPage
        } else if (!pageNo) {
          pageNo = 1
        }
        this.mountToNamespace(pageNo, root, ns)
        this.currentPage = pageNo

        // for pageSize
        param = this.resolveRootAndNamespace(PAGE_SIZE_KEY)
        root = param.root
        ns = param.ns
        this.mountToNamespace(this.childPageSize, root, ns)
      }
      // 触发表格数据查询
      let params = ['ready-fetch']
      opt && params.push(opt)
      this.$emit(...params)
      // 当分页改变时，滚动条置顶
      this.$nextTick(() => {
        setScrollTop(0)
      })
    },

    /**
     * pageSize 改变时会触发
     * @param {Number} pageSize [每页显示条目个数]
     */
    handleSizeChange(pageSize) {
      // 更新分页试图
      this.currentPage = 1
      this.childPageSize = pageSize

      // 设置分页入参
      let structure = this.resolveRootAndNamespace(PAGE_SIZE_KEY)
      this.mountToNamespace(pageSize, structure.root, structure.ns)
      structure = this.resolveRootAndNamespace(PAGE_NUMBER_KEY)
      this.mountToNamespace(this.currentPage, structure.root, structure.ns)
      // 触发表格数据的查询)
      this.$emit('ready-fetch')
    },

    /**
     * 把数据挂载到对象的指定层级下
     * @param {Object} data [数据]
     * @param {Object} mounted [待挂载的对象]
     * @param {String} ns [指定层级，以 . 分割]
     */
    mountToNamespace(data, mounted, ns) {
      const nsList = ns.split('.')
      for (let i = 0, len = nsList.length; i < len; i++) {
        if (i === nsList.length - 1) {
          mounted[nsList[i]] = data
        } else {
          mounted = mounted[nsList[i]]
        }
      }
    },

    /**
     * 获取某个对象指定层级下的对象
     * @param {Object} root [某个对象]
     * @param {String} ns [指定层级]
     * @return {Object} 【指定层级下的对象】
     */
    getObjectInNamespace(root, ns) {
      const nsList = ns.split('.')
      let temp = root
      for (let i = 0, len = nsList.length; i < len; i++) {
        temp = temp[nsList[i]]
      }
      return temp
    },

    /**
     * 获取 当前页数 和 每页显示条目个数
     * @param {String} name [分页参数]
     * @return {Number} 【当前页数 或 每页显示条目个数】
     */
    resolveParam(name) {
      // 获得根对象和相应的分页参数字符串层级
      const { root, ns } = this.resolveRootAndNamespace(name)

      // 获得相应的分页参数
      return this.getObjectInNamespace(root, ns)
    },

    /**
     * 判断是否改变了分页对象的默认结构，获得根对象和相应的分页参数字符串层级
     * @param {String} name [分页参数]
     * @return {Object} 【root：根对象，ns：分页参数的字符串层级】
     */
    resolveRootAndNamespace(name) {
      let root, ns
      if (typeof this.structure === 'string') {
        // page 组件最基本的用法
        if (this.parent) {
          root = this.parent
        } else {
          root = this.$parent
        }
        ns =
          TOTAL_COUNT_KEY === name
            ? `${this.structure}.${name}`
            : `${this.structure}.${FORM_KEY}.${name}`
      } else if (Array.isArray(this.structure)) {
        // 当 page 组件被包裹在 Vue 组件内
        root = this.structure[0]
        ns =
          TOTAL_COUNT_KEY === name
            ? `${this.structure}.${name}`
            : `${this.structure[1]}.${FORM_KEY}.${name}`
      } else {
        // 改变了默认的分页参数结构
        root = this.structure.root
        ns = this.structure[name]
      }
      return { root, ns }
    },

    /**
     * pageSizes 中不存在 pageSize 时，每页显示条目数不能正常显示，若不存在就往里面添加
     */
    addIntoPageSizes() {
      if (this.disabled) {
        return
      }
      if (this.pageSizes.indexOf(this.childPageSize) === -1) {
        this.pageSizes.push(this.childPageSize)
        this.pageSizes.sort((a, b) => a - b)
      }
    }
  },
  watch: {
    pageSize(pageSize) {
      this.handleSizeChange(pageSize)
    }
  },
  computed: {
    /**
     * 获取包裹层的 class
     */
    wrapClass() {
      const classes = []
      !this.disabled && classes.push(WRAP_CLASS)
      return classes
    },
    /**
     *  手机端相应适配
     *  */
    forMobileLayout() {
      if (this.$store.getters.app.responsiveLayout.clientType === 'mobile') {
        return 'prev, next, total'
      } else {
        return this.layout
      }
    }
  }
}
</script>
