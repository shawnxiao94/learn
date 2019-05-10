// import { parseTime } from "@/common/utils/index";
import moment from "moment";

export const getPortraitListData = {
  request(params) {
    if (params.viewType !== "视图") {
      if (params.sortType === "descending") {
        params.sortType = "desc";
      } else {
        params.sortType = "asc";
      }
    }
    let paramsObj = {
      portraitPageParam: {
        pageNumber: params.pageNumber,
        // pageSize: params.viewType === '视图' ? 6 : 10,
        pageSize: params.pageSize,
        portraitName: params.portraitName,
        sourceIds: params.sourceIds,
        statuss: params.statuss,
        sortName: params.sortName ? params.sortName : "",
        sortType: params.sortName ? params.sortType : ""
      }
    };
    return paramsObj;
  },
  response(data) {
    return data;
  }
};
export const getLabelData = {
  request(params) {
    let paramsObj = {
      tagSelectReq: {
        pageSize: params.pageSize || 6,
        pageNumber: params.pageNumber || 1,
        tagTypes: params.tagTypes || [],
        querySourceIds: params.tagSelectReq.querySourceIds || [],
        tagName: params.tagSelectReq.tagName || "",
        tagCategoryId: params.tagSelectReq.tagCategoryId || "",
        startTime: params.tagSelectReq.startTime || "",
        endTime: params.tagSelectReq.endTime || ""
      }
    };
    return paramsObj;
  },
  response(data) {
    let res = data.Result.data;
    return res;
  }
};
export const getPortraitByIdData = {
  request(params) {
    let portraitObj = {
      portraitId: params.portraitId
    };
    return portraitObj;
  },
  response(data) {
    let res = data.Result.data;
    let tags = res.tags.map(item => {
      return item.tagName.split("_")[1];
    });
    // let options = res.selectOption || []
    // let tags = options.map(item => {
    //   return {
    //     tagId: Object.keys(item)[0].split(',').map(t => Number(t))
    //   }
    // })
    // let detailTags = options.map(item => {
    //   let _arr
    //   Object.keys(item).forEach(a => {
    //     _arr = item[a]
    //   })
    //   _arr = _arr.map(b => {
    //     return b.tagName
    //   })
    //   return _arr.join(' / ')
    // })
    return {
      portraitId: res.portraitId,
      portraitName: res.portraitName || "",
      description: res.description || "",
      sourceId: Number(res.sourceId) || "",
      effDate: res.effDate,
      expDate: res.expDate,
      status: Number(res.status) || "",
      sourceName: res.sourceName,
      selectLabel: res.tags,
      selectOption: res.selectOption || [],
      // 该参数给编辑逻辑使用
      tags: tags || []
      // 该参数给详情逻辑使用
      // detailTags: detailTags || []
    };
  }
};
export const ruleOptionData = {
  request(params) {
    params.optionId = params.optionId.tagId[params.optionId.tagId.length - 1];
    return params;
  },
  response(data) {
    return data;
  }
};
export const submitData = {
  request(params) {
    let tagIds = params.selectLabel.map(item => {
      return item.id;
    });
    let portraitObj = {
      portrait: {
        effDate: params.effDate,
        expDate: params.expDate,
        portraitName: params.portraitName,
        description: params.description,
        createUser: params.createUser,
        tagIds: tagIds || []
      }
    };
    return portraitObj;
  },
  response(data) {
    return data;
  }
};
export const submitUpData = {
  request(params) {
    let tagIds = params.selectLabel.map(item => {
      return item.id;
    });
    let portraitObj = {
      portrait: {
        portraitId: params.portraitId,
        effDate: moment(new Date(params.effDate)).format("YYYY-MM-DD"),
        expDate: moment(new Date(params.expDate)).format("YYYY-MM-DD"),
        portraitName: params.portraitName,
        description: params.description,
        tagIds: tagIds
      }
    };
    return portraitObj;
  },
  response(data) {
    return data;
  }
};
export const removeData = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};
export const disableData = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

export const labelTagModel = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};

export const queryTagSource = {
  request(params) {
    return params;
  },
  response(data) {
    return data;
  }
};
