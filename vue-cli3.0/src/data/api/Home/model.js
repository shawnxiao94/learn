import banma from "@/assets/images/charts/waterLogo/banma.png";
import wyc from "@/assets/images/charts/waterLogo/wyc.png";
import fcshj from "@/assets/images/charts/waterLogo/fangche.png";
import datong from "@/assets/images/charts/waterLogo/datong.png";
import hqcx from "@/assets/images/charts/waterLogo/evcard.png";
import cxj from "@/assets/images/charts/waterLogo/chexiang.png";
import cyc from "@/assets/images/charts/waterLogo/chengyongche.png";
import rongwei from "@/assets/images/charts/waterLogo/rongwei.png";
const waveImg = {
  banma,
  wyc,
  fcshj,
  datong,
  hqcx,
  cxj,
  cyc,
  rongwei
};
// 上汽用户业务分布
export const userDistribution = {
  request(params) {
    return params;
  },
  response(data) {
    let dataJson = [];
    let errorResult = { errMsg: "" };
    if (data.Result.data) {
      dataJson = JSON.parse(data.Result.data);
      dataJson = dataJson.map(item => {
        // 水波图logo图片
        return {
          code: item.souceCode,
          name: item.souceName,
          rangeValue: item.rate ? Math.round(item.rate) : "*",
          img: waveImg[item.souceCode],
          popupData: item.portraits,
          channelCode: item.channelCode
        };
      });
    } else {
      errorResult.errMsg = data.Result.errMsg;
      dataJson = errorResult;
    }
    return dataJson;
  }
};
// 标签数分布
export const tagDistribution = {
  request(params) {
    return params;
  },
  response(data) {
    if (data.Result.data) {
      data.Result.data = JSON.parse(data.Result.data);
    }
    return data.Result.data;
  }
};
// 概览数据
export const general = {
  request(params) {
    return params;
  },
  response(data) {
    if (data.Result.data) {
      data.Result.data = JSON.parse(data.Result.data);
    }
    return data.Result.data;
  }
};
