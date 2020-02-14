/**
 * 获取标签类别
 */
export const queryCategory = {
  request(params) {
    return params
  },
  response(data) {
    return data.Result.data
  }
}

/**
 * 预览表达式
 */
export const queryTagExpression = {
  request(params) {
    return {
      expressionReq: {
        tagRuleExpressions: params
      }
    }
  },
  response(data) {
    return data.Result.data
  }
}

export const deleteUploadFileModel = {
  request(data) {
    return data
  },
  response(data) {
    return data
  }
}