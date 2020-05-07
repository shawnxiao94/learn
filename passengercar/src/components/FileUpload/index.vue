<template>
  <div :class="propsFileData.fileClass">
    <el-upload
      ref="uploadFile"
      class="upload-file"
      :action="propsFileData.actionUrl"
      :before-upload="beforeAvatarUpload"
      :before-remove="beforeRemoveFile"
      :on-remove="handleRemove"
      :on-change="handleUploadChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :auto-upload="propsFileData.autoUpload"
      :file-list="propsFileData.fileList"
      :data="propsFileData.data"
      :limit="propsFileData.limit"
      :on-exceed="handleExceedFile"
      :accept="propsFileData.acceptFileType"
      :multiple="propsFileData.IsMultiple"
      :on-preview="handlePreview"
      :headers="propsFileData.headers"
    >
      <el-button :inline="true" class="border-icon">
        <svg-icon class="uploadIcon2" iconClass="uploadIcon"></svg-icon>
        点击上传
      </el-button>
      <slot name="fileMessage"
        ><div
          slot="tip"
          class="el-upload__tip"
          v-if="propsFileData.tipsMessage"
          v-html="propsFileData.tipsMessage"
        ></div
      ></slot>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    propsFileData: {
      // 额外参数
      data: {
        type: Object,
        default() {
          return { fileType: '01' }
        }
      },
      // 上传成功文件列表数据
      fileList: {
        type: Array,
        default: []
      },
      // 文件个数限制
      limit: {
        type: Number,
        default: 3
      },
      maxSize: {
        type: Number,
        default: 1
      },
      // 接收文件类型
      acceptFileType: {
        type: String,
        default: '.csv'
      },
      fileType: {
        type: String,
        default: 'application/vnd.ms-excel'
      },
      // 是否支持多个文件上传
      IsMultiple: {
        type: Boolean,
        default: false
      },
      // 是否自动上传
      autoUpload: {
        type: Boolean,
        default: true
      },
      // 提交地址
      actionUrl: {
        type: String,
        default: '/fileUpload/'
      },
      // 请求头
      headers: {
        type: Object,
        default() {
          return {
            Authorization: 'Bearer ',
            version: 1
          }
        }
      },
      // 页面提示语
      tipsMessage: {
        type: String,
        default: '请上传csv格式文件，且不超过1M'
      },
      // class
      fileClass: {
        type: String,
        default: ''
      }
    }
  },
  methods: {
    // 手工型标签点击上传,失败成功都会触发
    handleUploadChange(file, fileList) {
      // this.fileData.fileList = fileList.slice(-3)
      this.$emit('change', file, fileList)
    },
    // 预览
    handlePreview(file) {
      this.$emit('preview', file)
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file) {
      this.$emit('success', res, file)
    },
    // 文件上传失败时的钩子
    handleError(res, file) {
      this.$emit('error', res, file)
    },
    // 文件上传时的钩子
    handleProgress(...args) {
      this.$emit('progress', ...args)
    },
    // 上传文件前的钩子
    beforeAvatarUpload(file) {
      let acceptType = file.name
        .substring(file.name.lastIndexOf('.'))
        .toLowerCase()
      const isCSV = acceptType === this.propsFileData.acceptFileType
      const isLt1M = file.size / 1024 / 1024 < this.propsFileData.maxSize

      if (!isCSV) {
        this.$message.error(
          `上传文件只能是${this.propsFileData.acceptFileType} 格式!`
        )
      }
      if (!isLt1M) {
        this.$message.error(
          `上传文件大小不能超过 ${this.propsFileData.maxSize}M!`
        )
      }
      return isCSV && isLt1M
    },
    // 删除文件前
    beforeRemoveFile(file) {
      let acceptType = file.name
        .substring(file.name.lastIndexOf('.'))
        .toLowerCase()
      // 文件格式符合才走提示
      if (acceptType === this.propsFileData.acceptFileType) {
        return this.$confirm(`确定移除 ${file.name}？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      }
    },
    handleRemove(file, fileList) {
      this.$emit('removeFileList', file, fileList)
    },
    // 文件数超过limit限制
    handleExceedFile() {
      this.$message.error(`当前限制最多上传${this.propsFileData.limit}个文件!`)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
>>>.border-icon{
  border 1px solid $color-a
  color $color-a
  display block
  margin-bottom 10px
}
>>>.el-upload .el-button--primary
    border 1px solid $color-a
    color $color-a
.el-upload__tip
  margin-top 10px
</style>
