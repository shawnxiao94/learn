/**
 * 状态码 1：生效中、2：未生效、3：已生效
 * @param  {Number||String} val 状态码
 * @return {String}   返回code对应的value值
 */
export function statusFilters(val) {
    if (Number(val) === 1) {
        return '生效中'
    } else if (Number(val) === 2) {
        return '未生效'
    } else if (Number(val) === 3) {
        return '已失效'
    }
}
