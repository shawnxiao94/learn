import { formatFloat } from '@/common/utils'
/**
 * 营销活动面板
 */
export const marketingGeneral = {
  request(params) {
    return params
  },
  response(data) {
    data = data.Result.data
    data.baseMarketingPercent = data.lastMonthBaseMarketingCounts === 0 ? 0 : formatFloat((data.monthBaseMarketingCounts - data.lastMonthBaseMarketingCounts) / data.lastMonthBaseMarketingCounts)
    data.baseTouchPercent = data.lastMonthTouchCounts === 0 ? 0 : formatFloat((data.monthTouchCounts - data.lastMonthTouchCounts) / data.lastMonthTouchCounts)
    data.baseEnterShopPercent = data.lastMonthEnterShopCounts === 0 ? 0 : formatFloat((data.monthEnterShopCounts - data.lastMonthEnterShopCounts) / data.lastMonthEnterShopCounts)
    data.baseTurnoverPercent = data.lastMonthTurnoverCounts === 0 ? 0 : formatFloat((data.monthTurnoverCounts - data.lastMonthTurnoverCounts) / data.lastMonthTurnoverCounts)
    data.averageConversion = data.baseEnterShopCounts === 0 ? 0 : formatFloat(data.baseTurnoverCounts / data.baseEnterShopCounts * 100) + '%'
    return data
  }
}