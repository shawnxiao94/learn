<template>
  <div>
    <bread-crumb
      ref="routerCrumbs"
      firstCrumbsName="SystemManageRoleManage"
    ></bread-crumb>
    <!--table or card 组件-->
    <data-list
      ref="dataList"
      v-show="!crumbsLength"
      :notCard="true"
      @changeSort="value => {}"
    >
      <template slot="form-box">
        <!--按钮组-->
        <div class="form-box-left">
          <el-form :inline="true">
            <el-form-item>
              <el-button
                type="primary"
                v-btnPermission="SystemManageRoleManage_add"
                @click="addEditFn({ type: 'add', data: {} })"
              >
                <svg-icon class="add" iconClass="ope-add"></svg-icon>
                新增角色
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--表单组-->
        <div class="form-box-searchs">
          <search-label
            :searchProp="data.searchbtnloading"
            @searchFnForm="searchFnForm"
          >
          </search-label>
        </div>
      </template>
      <template slot="tableColumn">
        <!-- 表格数据 -->
        <el-table
          stripe
          size="medium"
          v-loading="data.loading"
          :data="data.tableData"
          @sort-change="sortChange"
        >
          <el-table-column type="index" sortable label="序号"></el-table-column>
          <el-table-column
            prop="sortIndex"
            sortable
            label="排序"
          ></el-table-column>
          <el-table-column
            prop="name"
            sortable
            label="角色名称"
          ></el-table-column>
          <el-table-column prop="createUser" label="修改人"></el-table-column>
          <el-table-column
            :fixed="
              $store.getters.app.responsiveLayout.clientType !== 'mobile'
                ? 'right'
                : undefined
            "
            width="180"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <div class="btns-group">
                <el-button
                  :inline="true"
                  v-btnPermission="SystemManageRoleManage_update"
                  type="text"
                  title="编辑"
                  @click="addEditFn({ type: 'edit', data: scope.row })"
                >
                  <span>编辑</span>
                </el-button>
                <el-button
                  :inline="true"
                  v-btnPermission="SystemManageRoleManage_del"
                  type="text"
                  title="删除"
                  @click="delRole(scope.$index, scope.row)"
                >
                  <span>删除</span>
                </el-button>
                <el-button
                  :inline="true"
                  v-btnPermission="SystemManageRoleManage_setPermisstion"
                  type="text"
                  title="权限分配"
                  @click="setRole(scope.$index, scope.row)"
                >
                  <span>权限分配</span>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--表格分页插槽-->
      <template slot="tablePage">
        <!-- 分页 -->
        <page
          ref="page"
          :parent="this"
          structure="data"
          :total="data.totalCount"
          @ready-fetch="getRoleManageData"
        >
        </page>
      </template>
    </data-list>
    <!-- 新增 & 编辑 -->
    <add-edit ref="addEdit" @updateList="searchFnForm"></add-edit>
    <keep-alive :include="cachedViews">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import BreadCrumb from 'componentsB/BreadCrumb'
// table or card
import DataList from '@/components/DataList/index'
// 搜索组件
import SearchLabel from './components/Search'
import AddEdit from './components/AddEditRole'
import { mapGetters } from 'vuex'
import * as api from 'dataB/api/SystemManage/RoleManage'
export default {
  name: 'SystemManageRoleManage',
  components: {
    BreadCrumb,
    DataList,
    SearchLabel,
    AddEdit
  },
  data() {
    return {
      data: {
        // 列表数据
        tableData: [],
        // 总条目数
        totalCount: 0,
        // 列表加载
        loading: false,
        searchbtnloading: false,
        form: {}
      }
    }
  },
  computed: {
    // 调用路由面包屑数据仓库
    ...mapGetters(['crumbs', 'permission']),
    cachedViews() {
      if (this.permission.cachedViews.length) {
        return this.permission.cachedViews.toString()
      } else {
        return 'undefined'
      }
    },
    crumbsLength() {
      if (this.crumbs.routerCrumbs.length === 1) {
        return this.crumbs.routerCrumbs[0].name !== 'SystemManageRoleManage'
      } else {
        return this.crumbs.routerCrumbs.length > 1
      }
    }
  },
  // 离开此页面前清空面包屑路由
  beforeRouteLeave(to, from, next) {
    this.$refs.routerCrumbs.delRouterCrumbs()
    next()
  },
  mounted() {
    this.searchFnForm()
  },
  methods: {
    // 搜索
    searchFnForm() {
      this.data.searchbtnloading = true
      this.$refs.page.fetchList()
    },
    // 新增或者编辑角色
    addEditFn(data) {
      this.$refs.addEdit.init(data)
    },
    // 获取角色类别数据
    getRoleManageData() {
      this.$nextTick(() => {
        this.data.loading = true
      })
      api
        .getRoleListData(this.data.form)
        .then(res => {
          this.data.tableData = res.Result.data.content
          this.data.totalCount = res.Result.data.totalCount
        })
        .catch(res => {
          this.$notify.error({
            title: '错误',
            message: res.Result.errMsg
          })
        })
        .finally(() => {
          this.$nextTick(() => {
            this.data.loading = false
          })
        })
    },
    // 删除角色
    delRole(index, row) {
      this.$confirm(`是否确认删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          console.log(index, row)
          api
            .delRole(this.data.form)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 更新列表
              this.getRoleManageData()
            })
            .catch(res => {
              this.$notify.error({
                title: '删除失败',
                message: res.Result.errMsg
              })
            })
            .finally(() => {})
        })
        .catch(() => {})
        .finally(() => {})
    },
    // 权限分配
    setRole(index, row) {
      this.$router.push(
        `/systemManage/roleManage/setPermission/${row.id}/${row.name}`
      )
    }
  }
}
</script>

<style lang="stylus" scoped></style>
