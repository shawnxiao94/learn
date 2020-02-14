/**
  * description: 全局仓库引入
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import Root from './Root'

/**
 * 错误日志
 */
import ErrorLog from './ErrorLog'

/**
 * 权限
 */
import Permission from './Permission'

/**
 * @see 全局组件
 */
/**
 * 面包屑组件
 */
import CRouteCrumb from '@/components/RouteCrumb/store'
/**
 * @end 全局组件
 */

export default {
  Root,
  ErrorLog,
  Permission,
  /**
   * @see 全局组件
   */
  CRouteCrumb
  /**
   * @end 全局组件
   */
}
