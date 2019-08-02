/**
 * 表单验证
 */
import moment from 'moment'
import {
    // 11位手机号
    validateMobile,
    // 邮箱
    validateEmail,
    // 身份证
    validateIDCard,
    // url
    validateURL,
    // 中英文字符
    validateCharacters,
    // 正整数
    validateInteger,
    // 是否为整数(包括正负)
    validateInt,
    // 是否是数字
    validateNumber,
    // 匹配由数字和26个英文字母组成的字符串
    validateUpperCaseNumber,
    // 验证金额
    validateMoney,
    // 验证折扣
    validateSales,
    // 验证最多保留两位小数的正数
    validateDecimal,
    // 验证最多保留两位小数的正数或负数
    validateDecimals
} from './validate'

/**
 * 非空校验
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkNotNull(rule, value, callback) {
    if (
        String(value).replace(/^\s+|\s+$/gm, '') === '' ||
      (value instanceof Array && value[0] === '') ||
      value === null ||
      value === undefined
    ) {
        callback(new Error(rule.message || '内容不能为空!'))
    } else {
        callback()
    }
}

/**
 * 11位手机号
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkMobile(rule, value, callback) {
    if (value) {
        if (!validateMobile(value).status) {
            callback(new Error('您输入的手机号不正确!'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 邮箱
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkEmail(rule, value, callback) {
    if (value) {
        if (!validateEmail(value).status) {
            callback(new Error('请输入有效的邮箱!'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 身份证号
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkIdCard(rule, value, callback) {
    if (value) {
        if (!validateIDCard(value).status) {
            callback(new Error('身份证号码不合规!'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * url
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkUrl(rule, value, callback) {
    if (value) {
        if (!validateURL(value).status) {
            callback(new Error('URL不合规!'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 中英文字符串或者下划线!
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkCharacters(rule, value, callback) {
    if (value) {
        if (!validateCharacters(value).status) {
            callback(new Error('中英文字符串或者下划线!'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 正整数!
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkInteger(rule, value, callback) {
    if (value) {
        if (!validateInteger(value).status) {
            callback(new Error('必须为正整数!'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 整数(包括正负)
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkInt(rule, value, callback) {
    if (value) {
        if (!validateInt(value).status) {
            callback(new Error('必须为整数!'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 是否是数字!
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkNumber(rule, value, callback) {
    if (value) {
        if (!validateNumber(value).status) {
            callback(new Error('必须为数字!'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 匹配由数字和26个英文字母组成的字符串!
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkUpperCaseNumber(rule, value, callback) {
    if (value && !validateUpperCaseNumber(value).status) {
        callback(new Error('必须为数字和26个英文字母组成的字符串!'))
    } else {
        callback()
    }
}

/**
 * 验证金额!
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkMoney(rule, value, callback) {
    if (value && !validateMoney(value).status) {
        callback(new Error('金额不合规!'))
    } else {
        callback()
    }
}

/**
 * 验证折扣!
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkSales(rule, value, callback) {
    if (value && !validateSales(value).status) {
        callback(new Error('金额不合规!'))
    } else {
        callback()
    }
}

/**
 * 验证最多保留两位小数的正数!
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkDecimal(rule, value, callback) {
    if (value && !validateDecimal(value).status) {
        callback(new Error('最多保留两位正小数!'))
    } else {
        callback()
    }
}

/**
 * 验证最多保留两位小数的正数或负数!
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkDecimals(rule, value, callback) {
    if (value && !validateDecimals(value).status) {
        callback(new Error('最多保留两位小数!'))
    } else {
        callback()
    }
}

/**
 * 验证介于最小值和最大值直接的数字
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkMinMaxNumber(rule, value, callback) {
    if (value && !validateNumber(value).status) {
        callback(
            new Error(
                '输入数值介于' + rule.minNum + '和' + rule.maxNum + '之间！'
            )
        )
    } else {
        if (rule.minNum > value || rule.maxNum < value) {
            callback(
                new Error(
                    '输入数值介于' + rule.minNum + '和' + rule.maxNum + '之间！'
                )
            )
        } else {
            callback()
        }
    }
}

/**
 * 验证不能小于最小值数字
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkMinNumber(rule, value, callback) {
    if (value && !validateNumber(value).status) {
        callback(new Error('输入数值不能小于' + rule.minNum))
    } else {
        if (rule.minNum > value) {
            callback(new Error('输入数值不能小于' + rule.minNum))
        } else {
            callback()
        }
    }
}

/**
 * 验证不能大于最大值数字
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkMaxNumber(rule, value, callback) {
    if (value && !validateNumber(value).status) {
        callback(new Error('输入数值不能大于' + rule.maxNum))
    } else {
        if (rule.maxNum < value) {
            callback(new Error('输入数值不能大于' + rule.maxNum))
        } else {
            callback()
        }
    }
}

/**
 * 验证不能早于当前时间
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkNotEarlier(rule, value, callback) {
    if (value) {
        let dd = moment(new Date()).format('YYYY-MM-DD')
        if (new Date(dd) - new Date(value[0]) > 0) {
            callback(new Error('不能早于当前时间'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 验证结束日期不能早于当前时间
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkEndDateNotEarlier(rule, value, callback) {
    var dd = moment(new Date()).format('YYYY-MM-DD')
    if (value) {
        if (new Date(dd) - new Date(value[1]) + 1 > 0) {
            callback(new Error('结束日期不能早于等于当前时间'))
        } else if (new Date(value[0]) - new Date(value[1]) === 0) {
            callback(new Error('开始结束日期不能为同一天'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 验证不能为未来时间
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkNotFutureTime(rule, value, callback) {
    if (value) {
        if (new Date() - new Date(value) < 0) {
            callback(new Error('不能为未来时间'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 校验联动日期，后面的不能早于前面的日期
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkLinkageDate(rule, value, callback) {
    if (value !== null && value !== '' && typeof value !== 'undefined' && rule.beginDate !== '') {
        let _msg
        let _beginDate = rule.beginDate
        if (rule.isTime) {
            _msg = rule.beginDate
            _beginDate = '1980/01/01 ' + rule.beginDate
            value = '1980/01/01 ' + value
        } else {
            _msg = moment(rule.beginDate).format('YYYY-MM-DD')
        }
        if (rule.notFuture) {
            if (new Date(value) > new Date()) {
                callback(new Error('不能为未来时间'))
            }
        }
        if (new Date(_beginDate) - new Date(value) > 0) {
            callback(new Error('不能早于时间' + _msg))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 大于前面的值
 * @param  {Object} rule 规则对象
 * @param  {Number||String} value入参的值
 * @param  {Function} callback 回调函数返回值
 */
export function checkBiggerThanFrontNumber(rule, value, callback) {
    if (!validateInteger(value).status) {
        callback(new Error('必须为正整数!'))
    } else if (Number(value) <= Number(rule.data)) {
        callback(new Error('结束值必须大于起始值!'))
    } else {
        callback()
    }
}