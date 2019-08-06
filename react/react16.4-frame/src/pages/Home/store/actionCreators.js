import * as constants from './constants';

const changHomeData = (result) => ({
	type: constants.CHANGE_HOME_DATA,
	topicList: result.topicList
});


export const getHomeInfo = () => {
	return (dispatch) => {
    const result = [1,2,3];
    dispatch(changHomeData(result));
	}
}