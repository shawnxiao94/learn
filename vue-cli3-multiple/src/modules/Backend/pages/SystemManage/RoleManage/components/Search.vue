<template>
  <el-form :inline="true" :model="search">
    <el-form-item label="角色" prop="role">
      <el-input
        clearable
        v-model="search.role"
        placeholder="输入角色搜索"
        @keyup.enter.native="searchFnForm()"
      >
      </el-input>
    </el-form-item>
    <!-- 搜索按钮 -->
    <el-form-item>
      <el-button
        type="primary"
        :loading="searchbtnloading"
        @click="searchFnForm"
        v-btnPermission="SystemManageUserManage_search"
      >
        <svg-icon iconClass="icon-search"></svg-icon>
        搜索
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ['searchbtnloading'],
  data() {
    return {
      search: {
        role: ''
      }
    }
  },
  methods: {
    // 搜索表格
    searchFnForm() {
      this.$emit('searchFnForm', this.search)
    }
  }
}
</script>
