// 把action type单独用一个文件来统一定义一是易于维护
// 二是万一字符串写错了react能友好的提示错误在哪，不分开写的话字符写错了react不会提示错误在哪里

export const CHANGE_INPUT_VALUE = 'change_input_value'

export const ADD_ITEM = 'add_item'

export const DELETE_ITEM = 'delete_item'