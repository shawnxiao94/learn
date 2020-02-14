/**
 * @see 插件
 */
/**
 * 公用类型
 */
// 所有 下拉单选 使用此控件
import SelectType from './common/SelectType'
// 所有 数值，或者区间数值 使用此控件
import NumberOrBetweenNumber from './common/NumberOrBetweenNumber'
// 所有 正整数，或者区间正整数值 使用此控件
import IntegerOrBetweenInteger from './common/IntegerOrBetweenInteger'
// 所有 下拉多选 使用此控件
import MultipleSelection from './common/MultipleSelection'
// 所有 日期，或者日期区间 插件
import DateOrBetweenDate from './common/DateOrBetweenDate'
// 所有 输入项 通用插件
import InputType from './common/InputType'

/**
 * 私有类型
 */
// 注册手机号
import LoginAccountMobile from './components/LoginAccountMobile'
// 注册邮箱
import LoginAccountEmail from './components/LoginAccountEmail'
// 行业
import IndustryCode from './components/IndustryCode'
// 生日
import Birthdate from './components/Birthdate'
/**
 * End 插件
 */
export default {
  // 性别
  gender_code: SelectType,
  // 收入
  personal_income: NumberOrBetweenNumber,
  // 教育
  education_code: MultipleSelection,
  // 婚姻
  marriage_code: SelectType,
  // 用户是否有效
  is_valid: SelectType,
  // 注册手机号
  login_account_mobile: LoginAccountMobile,
  // 出生日期
  birthday: DateOrBetweenDate,
  // 子女个数
  children_raised: NumberOrBetweenNumber,
  // 姓名
  full_name: InputType,
  // saic_id
  saic_id: InputType,
  // 邮箱
  login_account_email: LoginAccountEmail,
  // 行业
  industry_code: IndustryCode,
  // 出生地
  birthplace: InputType,
  // 国籍
  nationality_code: MultipleSelection,
  // 实名认证等级
  real_name_level_code: SelectType,
  // 生日
  birthdate: Birthdate,
  // 注册时间
  register_time: DateOrBetweenDate,
  /**
   * 车享家特有
   */
  // 最高价
  max_price: NumberOrBetweenNumber,
  // 最低价
  min_price: NumberOrBetweenNumber,
  // 车辆归属地
  plates_local: SelectType,
  // 车龄
  vel_age: NumberOrBetweenNumber,
  // 车级
  vel_level: SelectType,
  // 里程
  mileage: NumberOrBetweenNumber,
  // 变速器
  transmission_type: SelectType,
  // 保有量
  holdings: NumberOrBetweenNumber,
  // 活跃门店
  store: MultipleSelection,
  /**
   * End 车享家特有
   */

  /**
   * 新增70多个字段
   */
  // 两次进4s店平均时间间隔
  algo_arrival_4s_avg_gap_time: NumberOrBetweenNumber,
  // 两次进4s店平均最大间隔
  algo_arrival_4s_max_gap_time: NumberOrBetweenNumber,
  // 两次进4s店平均最小间隔
  algo_arrival_4s_min_gap_time: NumberOrBetweenNumber,
  // 两次进车享家平均时间间隔
  algo_arrival_cxj_avg_gap_time: NumberOrBetweenNumber,
  // 两次进车享家平均最大间隔
  algo_arrival_cxj_max_gap_time: NumberOrBetweenNumber,
  // 两次进车享家平均最小间隔
  algo_arrival_cxj_min_gap_time: NumberOrBetweenNumber,
  // 一个月内加油之后油箱液位平均值
  algo_avg_endfuellev: NumberOrBetweenNumber,
  // 加油后平均行驶里程
  algo_avg_odo_between_refuel: NumberOrBetweenNumber,
  // 一个月内平均每次加油的油量平均值
  algo_avg_refuellev: NumberOrBetweenNumber,
  // 一个月内加油之前油箱液位平均值
  algo_avg_startfuellev: NumberOrBetweenNumber,
  // 当月充电次数
  algo_charge_count: IntegerOrBetweenInteger,
  // 车辆累计充电次数
  algo_charge_count_lifetime: IntegerOrBetweenInteger,
  // 当月每次充电的平均时间
  algo_charge_minutes_avg: NumberOrBetweenNumber,
  // 轨迹城市分布个数
  algo_city_num: IntegerOrBetweenInteger,
  // 公司停车平均时长
  algo_company_parking_avg: NumberOrBetweenNumber,
  // 公司停车次数
  algo_company_parking_count: IntegerOrBetweenInteger,
  // 一年内到店消费次数
  algo_consume_cnt: IntegerOrBetweenInteger,
  // 一年内到4s店次数
  algo_consume_cnt_4s: IntegerOrBetweenInteger,
  // 一年内到车享家次数 -
  algo_consume_cnt_cxj: IntegerOrBetweenInteger,
  // 是否跨城市-
  algo_cross_city: SelectType,
  // 车享家流失用户-
  algo_cxj_drain: SelectType,
  // 日均活跃度-
  algo_daily_activity: NumberOrBetweenNumber,
  // 日均里程-
  algo_daily_ave_odo: NumberOrBetweenNumber,
  // 当月两次充电之间间隔时间的均值
  algo_diff_minutes_avg: NumberOrBetweenNumber,
  // 当月每次充电后行驶里程的均值
  algo_diff_odo_avg: NumberOrBetweenNumber,
  // 活跃天数
  algo_driver_day_num: IntegerOrBetweenInteger,
  // 用户最近是否在驾校附近接送人
  algo_driver_school: SelectType,
  // //平均油耗
  algo_fuel_consumption_ave: NumberOrBetweenNumber,
  // 一个月内加油活动中加满油箱的次数
  algo_full_refuel_count: IntegerOrBetweenInteger,
  // 假期用车频率
  algo_holiday_use: SelectType,
  // 家最近的车享家距离
  algo_home_nearest_cxj_distance: NumberOrBetweenNumber,
  // 家最近的车享家名称
  algo_home_nearest_cxj_name: InputType,
  // 家最近的经销商距离
  algo_home_nearest_dealer_distance: NumberOrBetweenNumber,
  // 家最近的经销商名称
  algo_home_nearest_dealer_name: InputType,
  // 家庭停车平均时长
  algo_home_parking_avg: NumberOrBetweenNumber,
  // 家庭停车次数
  algo_home_parking_count: IntegerOrBetweenInteger,
  // 工作日活动半径
  algo_home_weekday_radius: NumberOrBetweenNumber,
  // 周末活动半径
  algo_home_weekend_radius: NumberOrBetweenNumber,
  // 身份证生日
  algo_identity_birthday: DateOrBetweenDate,
  // 从身份证读取的性别
  algo_identity_sex: SelectType,
  // 保养推荐
  algo_is_maintain: SelectType,
  // 洗车推荐
  algo_is_wash: SelectType,
  // 最近一次到店日期
  algo_last_service_date: DateOrBetweenDate,
  // 最近一次到4s店日期
  algo_last_service_date_4s: DateOrBetweenDate,
  // 最近一次到车享家日期
  algo_last_service_date_cxj: DateOrBetweenDate,
  // 最近一次到店维修店名
  algo_last_service_shop_name: InputType,
  // 最近一次到店服务类型
  algo_last_service_type: SelectType,
  // 最近一次到4s店服务类型
  algo_last_service_type_4s: SelectType,
  // 最近一次到车享家服务类型
  algo_last_service_type_cxj: SelectType,
  // 车享家导流推荐
  algo_lead_to_cxj: SelectType,
  // 车型
  algo_model: InputType,
  // 非工作日日均里程
  algo_nonworkday_ave_odo: NumberOrBetweenNumber,
  // 非工作日日均活跃度
  algo_nonworkday_daily_activity: NumberOrBetweenNumber,
  // 当前里程
  algo_odo: NumberOrBetweenNumber,
  // 里程重置类型
  algo_odo_reset_flag: SelectType,
  // 用户是否在上下班途中接送人
  algo_pickup_to_from_work: SelectType,
  // 当月快充次数
  algo_quick_charge_count: IntegerOrBetweenInteger,
  // 一个月内加油次数
  algo_refuel_count: IntegerOrBetweenInteger,
  // 到店次数最多的服务类型
  algo_service_type_max_count: SelectType,
  // 4S店到店次数最多的服务类型
  algo_service_type_max_count_4s: SelectType,
  // 车享家到店次数最多的服务类型
  algo_service_type_max_count_cxj: SelectType,
  // 当月充电结束soc的均值
  algo_soc_end_avg: NumberOrBetweenNumber,
  // 当月充电起始soc的均值
  algo_soc_start_avg: NumberOrBetweenNumber,
  // 是否专车
  algo_special_car: SelectType,
  // 一个月内加油总量
  algo_total_refuellev: NumberOrBetweenNumber,
  // 习惯加油量
  algo_usual_refuellev: NumberOrBetweenNumber,
  // 车类型
  algo_vehicle_type: SelectType,
  // 用车偏好
  algo_vehicle_use: SelectType,
  // 周末用车频率
  algo_weekend_use: SelectType,
  // 工作日日均里程
  algo_workday_ave_odo: NumberOrBetweenNumber,
  // 工作日日均活跃度
  algo_workday_daily_activity: NumberOrBetweenNumber,
  // 工作日用车频率
  algo_workday_use: SelectType
  /**
   * End 新增70多个字段
   */
}