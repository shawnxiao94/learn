export const getCasUser = {
  request(params) {
    return params;
  },
  response(data) {
    return data.Result.data instanceof Object
      ? data.Result.data
      : JSON.parse(data.Result.data);
  }
};
