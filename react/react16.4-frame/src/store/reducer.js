import { combineReducers } from 'redux-immutable';
import { reducer as permissionReducer } from '@pages/store';
import { reducer as homeReducer } from '@pages/Home/store';
import { reducer as loginReducer } from '@pages/Login/store';
// combineReducers 合并仓库reducer
const reducer = combineReducers({
  permission: permissionReducer,
	home: homeReducer,
  login: loginReducer
});

export default reducer;
