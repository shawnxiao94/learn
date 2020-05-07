<template>
  <div class="form-box-searchs" id="scrollSearchFixedTop">
    <el-form :inline="true" :model="search">
      <!-- 时间段 -->
      <datetimerange
        :startTime="search.startTime"
        :endTime="search.endTime"
        @startTime="
          startTime => {
            search.startTime = startTime
          }
        "
        @endTime="
          endTime => {
            search.endTime = endTime
          }
        "
        placeholder="选择创建时间"
        label="选择创建时间"
      >
      </datetimerange>
      <el-form-item label="姓名" prop="userName">
        <el-input
          clearable
          v-model="search.userName"
          placeholder="输入姓名搜索"
          @keyup.enter.native="searchFnForm()"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          clearable
          v-model="search.mobile"
          placeholder="输入手机号搜索"
          @keyup.enter.native="searchFnForm()"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          clearable
          v-model="search.email"
          placeholder="输入邮箱搜索"
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
  </div>
</template>

<script>
export default {
  props: ['searchbtnloading'],
  data() {
    return {
      search: {
        userName: '',
        mobile: '',
        email: '',
        // 开始时间
        startTime: '',
        // 结束时间
        endTime: ''
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
