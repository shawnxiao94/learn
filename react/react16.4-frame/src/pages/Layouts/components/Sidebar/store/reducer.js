import { fromJS } from 'immutable';
// import * as constants from './constants';

const defaultState = fromJS({
	menuList: [
    {
      path: '/',
      title: '首页'
    },
    {
      path: '/login',
      title: '登录页 '
    }
  ]
});

export default (state = defaultState, action) => {
	return state;
}