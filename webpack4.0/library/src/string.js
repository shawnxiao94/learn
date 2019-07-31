// 引入第三方lodash方法库
import _ from 'lodash';

export function join (a, b) {
  return _.join([a,b], '')
}