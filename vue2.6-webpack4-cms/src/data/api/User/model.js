/*
 * @Author: your name
 * @Date: 2019-12-16 13:50:45
 * @LastEditTime: 2020-03-21 13:10:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2.6-webpack4-cms\src\data\api\User\model.js
 */
export const getUser = {
  request (params) {
    return params;
  },
  response (data) {
    return data.Result.data;
  }
};
