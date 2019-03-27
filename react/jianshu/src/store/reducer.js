// 合并reducer笔记插件,数据格式直接为不可更改的immutab格式
import { combineReducers } from 'redux-immutable';

import { reducer as headerReducer } from '../common/header/store';

const reducer = combineReducers({
  header: headerReducer
}) 

export default reducer;