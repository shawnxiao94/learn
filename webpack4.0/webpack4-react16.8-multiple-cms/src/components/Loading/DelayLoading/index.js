/*
 * @Author: shawn
 * @Date: 2020-01-03 11:08:27
 * @LastEditTime : 2020-01-03 13:31:27
 * @LastEditors  : Please set LastEditors
 * @Description: 加载loading
 * @FilePath: \webpack4-react16.8-multiple-cms\src\components\Loading\index.js
 */
import React from "react"
import PropTypes from "prop-types"

const DelayLoading = ({ pastDelay, error }) => {
  if (pastDelay) {
    return <div>Loading...</div>
  } if (error) {
    return <div>Sorry, there was a problem loading the page.</div>
  }
  return null
}

export default DelayLoading

DelayLoading.propTypes = {
  pastDelay: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
}
