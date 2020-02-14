/**
 * 活动用户来源
 */
export const queryActiveUserSource = {
  request(params) {
    return params
  },
  response(data) {
    // let numIndex = 0
    let sortNum = [55, 50, 40, 36, 30]
    // let numIndey = 0
    // 获取两集合总数
    // data.Result.data.nodes.map((item, index) => {
    //   numIndex = numIndex + item.value
    //   return item
    // })
    // data.Result.data.links.map((item, index) => {
    //   numIndey = numIndey + item.value
    //   return item
    // })
    // 根据百分比计算
    data.Result.data.nodes.map((item, index) => {
      // item.category = index
      item.symbolSize = sortNum[index] // 20 + parseInt(Math.random() * 40)
      return item
    })
    // data.Result.data.links.map((item, index) => {
    //   delete item.baseCode
    //   // item.value = Math.ceil(item.value / (numIndey / 100))
    //   return item
    // })
    return data.Result.data
  }
}