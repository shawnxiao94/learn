<template>
  <el-form-item :label="label" :class="type">
    <el-date-picker
      v-if="type === 'datetimerange'"
      v-model="datetimerange.value"
      type="datetimerange"
      :picker-options="datetimerange.options"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="datetimerangeChange"
      :default-time="['00:00:00', '23.59:59']"
    >
    </el-date-picker>
    <el-date-picker
      v-if="type === 'daterange'"
      v-model="daterange.value"
      type="daterange"
      :picker-options="daterange.options"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      @change="daterangeChange"
      align="right"
    >
    </el-date-picker>
  </el-form-item>
</template>
<script>
import moment from 'moment'
export default {
  name: 'DatetimeRange',
  props: {
    type: {
      type: String,
      default: 'daterange'
    },
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '选择时间'
    }
  },
  watch: {
    startTime() {
      this.setDefaultTime()
    },
    endTime() {
      this.setDefaultTime()
    }
  },
  mounted() {
    this.setDefaultTime()
  },
  methods: {
    setDefaultTime() {
      if (this.type === 'daterange') {
        if (this.startTime && this.endTime) {
          this.daterange.value = [
            this.startTime.replace(/'-'/g, '/'),
            this.endTime.replace(/'-'/g, '/')
          ]
        } else {
          this.daterange.value = []
        }
      } else {
        if (this.startTime && this.endTime) {
          this.datetimerange.value = [
            this.startTime.replace(/'-'/g, '/'),
            this.endTime.replace(/'-'/g, '/')
          ]
        } else {
          this.datetimerange.value = []
        }
      }
    },
    datetimerangeChange(v) {
      this.$emit('startTime', v ? v[0] : '')
      this.$emit('endTime', v ? v[1] : '')
      this.$emit('change')
    },
    daterangeChange(v) {
      this.$emit('startTime', v ? v[0] : '')
      this.$emit('endTime', v ? v[1] : '')
      this.$emit('change')
    }
  },
  data() {
    return {
      datetimerange: {
        options: {
          shortcuts: [
            {
              text: '本周',
              onClick(picker) {
                let weekOfday = parseInt(moment().format('d'))
                let start = moment()
                  .subtract(weekOfday - 1, 'days')
                  .format('YYYY-MM-DD HH:mm:ss')
                let end = moment()
                  .add(8 - weekOfday - 1, 'days')
                  .format('YYYY-MM-DD HH:mm:ss')
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '上周',
              onClick(picker) {
                let weekOfday = parseInt(moment().format('d'))
                const start = moment()
                  .subtract(weekOfday + 6, 'days')
                  .format('YYYY-MM-DD HH:mm:ss')
                const end = moment()
                  .subtract(weekOfday, 'days')
                  .format('YYYY-MM-DD HH:mm:ss')
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近半年',
              onClick(picker) {
                let end = moment().format('YYYY-MM-DD HH:mm:ss')
                let start = moment()
                  .add(-6, 'months')
                  .format('YYYY-MM-DD HH:mm:ss')
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一年',
              onClick(picker) {
                let end = moment().format('YYYY-MM-DD HH:mm:ss')
                let start = moment()
                  .add(-12, 'months')
                  .format('YYYY-MM-DD HH:mm:ss')
                picker.$emit('pick', [start, end])
              }
            }
          ]
        },
        value: []
      },
      daterange: {
        options: {
          shortcuts: [
            {
              text: '本周',
              onClick(picker) {
                let weekOfday = parseInt(moment().format('d'))
                let start = moment()
                  .subtract(weekOfday - 1, 'days')
                  .format('YYYY-MM-DD')
                let end = moment()
                  .add(8 - weekOfday - 1, 'days')
                  .format('YYYY-MM-DD')
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '上周',
              onClick(picker) {
                let weekOfday = parseInt(moment().format('E'))
                const start = moment()
                  .subtract(weekOfday + 6, 'days')
                  .format('YYYY-MM-DD')
                const end = moment()
                  .subtract(weekOfday, 'days')
                  .format('YYYY-MM-DD')
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近半年',
              onClick(picker) {
                let end = moment().format('YYYY-MM-DD')
                let start = moment()
                  .add(-6, 'months')
                  .format('YYYY-MM-DD')
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一年',
              onClick(picker) {
                let end = moment().format('YYYY-MM-DD')
                let start = moment()
                  .add(-12, 'months')
                  .format('YYYY-MM-DD')
                picker.$emit('pick', [start, end])
              }
            }
          ]
        },
        value: []
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.datetimerange
  >>>.el-range-editor
    width 360px
.daterange
  >>>.el-range-editor
    width 240px
/* 手机端适配 */
@media (max-width 768px)
  .datetimerange
    >>>.el-range-editor
      width auto
  .daterange
    >>>.el-range-editor
      width auto
/* End 手机端适配 */
</style>
