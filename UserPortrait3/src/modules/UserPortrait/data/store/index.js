/**
  * description: 模块级仓库引入
  * author: William
  */
/**
 * 全局仓库引入
 */
import RootStore from '@/data/store'
/**
 * @see 页面级仓库引入
 */
/**
 * 统计型标签新增编辑表单相关数据仓库
 */
import PagesLabelManageStatisticsLabel from '../../pages/LabelManage/pages/Add/components/StatisticsLabelForm/store'
/**
 * 所属来源
 */
import PagesApi from '@/modules/UserPortrait/data/store/Api'
/**
 * @end 页面级仓库引入
 */

export default {
  ...RootStore,
  /**
   * @see 页面级仓库引入
   */
  PagesLabelManageStatisticsLabel,
  PagesApi
  /**
   * @end 页面级仓库引入
   */
}
