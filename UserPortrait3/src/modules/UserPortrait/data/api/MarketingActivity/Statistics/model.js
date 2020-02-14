/**
 * 营销活动统计
 */
import moment from 'moment'
export const queryStatisticsOfMarketingActivities = {
  request(params = {}) {
    let _params = window.deepClone(params)
    // 最近一年
    if (_params.date === '1') {
      _params.startTime = moment().startOf('year').format('YYYY-MM-DD')
      _params.endTime = moment().startOf('day').format('YYYY-MM-DD')
    }
    // 2018
    if (_params.date === '2') {
      _params.startTime = moment().add(-1, 'years').startOf('year').format('YYYY-MM-DD')
      _params.endTime = moment('2018').endOf('year').format('YYYY-MM-DD')
    }
    // 2017
    if (_params.date === '3') {
      _params.startTime = moment().add(-2, 'years').startOf('year').format('YYYY-MM-DD')
      _params.endTime = _params.endTime = moment('2017').endOf('year').format('YYYY-MM-DD')
    }
    // 2016
    if (_params.date === '4') {
      _params.startTime = moment().add(-3, 'years').startOf('year').format('YYYY-MM-DD')
      _params.endTime = _params.endTime = moment('2016').endOf('year').format('YYYY-MM-DD')
    }

    if (_params.channelCode === '00') {
      _params.channelCode = ''
    }
    delete _params.date
    return _params
  },
  response(data) {
    return data.Result.data
  }
}