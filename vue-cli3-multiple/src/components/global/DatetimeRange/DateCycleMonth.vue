<template>
  <div class="data-cycle-month">
    <el-form ref="form" :model="this">
      <el-form-item v-if="timeType">
        <el-select v-model="typeValue">
          <el-option
            v-for="item in options.typeOptions"
            :key="item.code"
            :label="item.value"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="typeValue === 'cycle'"
        prop="dateCycleValue"
        :rules="regCheck({ required: true })"
      >
        <el-select
          v-model="dateCycleValue"
          :placeholder="placeholder.dateCycle"
          @change="dateCycleChange"
        >
          <el-option
            v-for="item in options.dateCycleOptions"
            :key="item.code"
            :label="item.value"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <template v-if="typeValue === 'months'">
        <el-form-item prop="month" :rules="regCheck({ required: true })">
          <el-date-picker
            v-model="month"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            @change="monthChange"
          >
          </el-date-picker>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    type: {
      type: String,
      default: 'date-cycle-month'
    },
    timeType: {
      type: Boolean
    },
    label: {
      type: Object,
      default() {}
    },
    placeholder: {
      type: Object,
      default() {
        return {
          dateCycle: '请选择'
        }
      }
    },
    values: {
      type: Array,
      default() {
        return ['cycle', '1']
      }
    },
    openValidate: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  mounted() {
    this.setDate(this.values[0], this.values[1])
  },
  watch: {
    typeValue(type) {
      if (type === 'cycle') {
        this.dateCycleValue = this.dateCycleValue
        this.dateCycleChange(this.dateCycleValue)
      } else {
        this.monthChange(this.month)
      }
      this.$refs['form'].clearValidate()
    }
  },
  methods: {
    /**
     * 设置日期
     * 设置最近时间段
     * this.$refs.dataCycleMonth.setDate('cycle', '1')
     * 设置月份区间
     * this.$refs.dataCycleMonth.setDate('months', ['2018-01','2018-07'])
     *  */
    setDate(type, value) {
      this.typeValue = type
      if (type === 'cycle') {
        this.dateCycleValue = value
        this.dateCycleChange(value)
      } else {
        this.month = value
        this.monthChange(value)
      }
    },
    checkValidate() {
      let _bool = false
      if (!this.openValidate) {
        _bool = true
      } else {
        this.$refs['form'].validate(valid => {
          if (valid) {
            _bool = true
          }
        })
      }
      return _bool
    },
    // 按最近时间查询变更日期时触发事件
    dateCycleChange(code) {
      this.checkValidate()
      if (code === '1') {
        let end = moment()
          .startOf('day')
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
        let start = moment(end).format('YYYY-MM-DD')
        this.$emit('startTime', start)
        this.$emit('endTime', end)
        this.$emit('requestDateType', code)
      } else if (code === '3') {
        let end = moment()
          .startOf('day')
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
        let start = moment(end)
          .subtract(2, 'days')
          .format('YYYY-MM-DD')
        this.$emit('startTime', start)
        this.$emit('endTime', end)
        this.$emit('requestDateType', code)
      } else if (code === '7') {
        let end = moment()
          .startOf('day')
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
        let start = moment(end)
          .subtract(6, 'days')
          .format('YYYY-MM-DD')
        this.$emit('startTime', start)
        this.$emit('endTime', end)
        this.$emit('requestDateType', code)
      } else if (code === '14') {
        let end = moment()
          .startOf('day')
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
        let start = moment(end)
          .subtract(13, 'days')
          .format('YYYY-MM-DD')
        this.$emit('startTime', start)
        this.$emit('endTime', end)
        this.$emit('requestDateType', code)
      } else if (code === '30') {
        let end = moment()
          .startOf('day')
          .format('YYYY-MM-DD')
        let start = moment()
          .month(moment().month())
          .startOf('month')
          .format('YYYY-MM-DD')
        this.$emit('startTime', start)
        this.$emit('endTime', end)
        this.$emit('requestDateType', code)
      } else if (code === '60') {
        let end = moment()
          .month(moment().month() - 1)
          .endOf('month')
          .format('YYYY-MM-DD')
        let start = moment()
          .month(moment().month() - 1)
          .startOf('month')
          .format('YYYY-MM-DD')
        this.$emit('startTime', start)
        this.$emit('endTime', end)
        this.$emit('requestDateType', code)
      }
      this.$emit('change')
    },
    // 按月份查询时间触发事件
    monthChange(monthData) {
      this.checkValidate()
      if (monthData && monthData.length) {
        // 格式化日期
        monthData = monthData.map((item, index) => {
          if (index === 0) {
            // 格式化开始日期，取1号
            return moment(item)
              .startOf('month')
              .format('YYYY-MM-DD')
          } else {
            // 格式化结束日期，取月末
            return moment(item)
              .endOf('month')
              .format('YYYY-MM-DD')
          }
        })
      } else {
        monthData = ['', '']
      }
      this.$emit('startTime', monthData[0])
      this.$emit('endTime', monthData[1])
      this.$emit('requestDateType', '')
      this.$emit('change')
    }
  },
  data() {
    return {
      typeValue: 'cycle',
      dateCycleValue: '1',
      month: null,
      options: {
        typeOptions: [
          {
            code: 'cycle',
            value: '按最近时间查询'
          },
          {
            code: 'months',
            value: '按月份查询'
          }
        ],
        dateCycleOptions: [
          {
            code: '1',
            value: '昨天'
          },
          {
            // code: 'nearlyThreeDays',
            code: '3',
            value: '近3天(不包含当天)'
          },
          {
            // code: 'nearlySevenDays',
            code: '7',
            value: '近7天(不包含当天)'
          },
          {
            // code: 'nearlyFourteenDays',
            code: '14',
            value: '近14天(不包含当天)'
          },
          {
            // code: 'currentMonths',
            code: '30',
            value: '当月'
          },
          {
            // code: 'lastMonths',
            code: '60',
            value: '上月'
          }
        ]
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.data-cycle-month
  display inline-block
  vertical-align top
>>>.el-select .el-input__inner
  width 150px!important
</style>
