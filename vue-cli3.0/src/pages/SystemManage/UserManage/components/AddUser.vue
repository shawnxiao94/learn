<template>
  <el-dialog
    :visible.sync="dialogData.dialogVisible"
    class="ui-dialog dialog-width-sm-s"
  >
    <div slot="title" class="dialog-title">
      <svg-icon iconClass="icon-log"></svg-icon>
      {{ dialogData.title }}
    </div>
    <el-row>
      <el-col :xs="22" :sm="20" :lg="20">
        <el-form ref="form" :model="dialogData.AddUser" label-width="80">
          <el-form-item
            label="用户名"
            prop="userName"
            :rules="regCheck({ required: true, type: 'characters' })"
          >
            <el-input v-model="dialogData.AddUser.userName"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="mobile"
            :rules="regCheck({ required: true, type: 'mobile' })"
          >
            <el-input v-model="dialogData.AddUser.mobile"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="passWord"
            :rules="regCheck({ required: true, type: 'upperCaseNumber' })"
          >
            <el-input
              v-model="dialogData.AddUser.passWord"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini">取消</el-button>
      <el-button size="mini" type="primary" :loading="dialogData.btnLoading"
        >保存</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
// 数据请求方法
// import * as api from "@/data/api/SystemManage/UserManage";
export default {
  name: "AddLable",
  data() {
    return {
      dialogData: {
        title: "新增用户",
        dialogVisible: false,
        btnLoading: false,
        AddUser: {
          userName: "",
          mobile: "",
          passWord: ""
        }
      }
    };
  },
  methods: {
    // 弹出窗口
    init() {
      this.dialogData.dialogVisible = true;
    }
  }
};
</script>
