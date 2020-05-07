import { weibo, qq, qqZone, douban, shareUrl, shareTitle } from './env'

function getParamsUrl(obj) {
  let paramsUrl = ''
  for (let key in obj) {
    paramsUrl += key + '=' + obj[key] + '&'
  }
  return paramsUrl
}

/**
 * 判断空值
 */
export const isEmpty = keys => {
  if (typeof keys === 'string') {
    keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, '')
    if (keys == '' || keys == null || keys == 'null' || keys === 'undefined') {
      return true
    } else {
      return false
    }
  } else if (typeof keys === 'undefined') {
    // 未定义
    return true
  } else if (typeof keys === 'number') {
    return false
  } else if (typeof keys === 'boolean') {
    return false
  } else if (typeof keys == 'object') {
    if (JSON.stringify(keys) == '{}') {
      return true
    } else if (keys == null) {
      // null
      return true
    } else {
      return false
    }
  }

  if (keys instanceof Array && keys.length == 0) {
    // 数组
    return true
  }
}

export function shareConfig(type, obj) {
  let baseUrl = ''
  if (isEmpty(obj)) {
    obj = {}
  }
  switch (type) {
    case 'weibo':
      // eslint-disable-next-line no-case-declarations
      const weiboData = {
        url: shareUrl, // 内容链接，默认当前页面location
        title: shareTitle, // 可选参数, 默认当前页title
        pic: obj.pic || weibo.pic, // 分享图片的路径(可选)，多张图片通过"||"分开。
        count: 'y' /**是否显示分享数，y|n(可选)*/,
        searchPic: true // 是否要自动抓取页面上的图片。true|falsetrue:自动抓取,false:不自动抓取。
      }
      baseUrl =
        weibo.weiboUrl +
        '?appkey=' +
        weibo.weiboAppkey +
        getParamsUrl(weiboData)
      window.open(baseUrl, '_blank')
      break
    case 'qq':
      // eslint-disable-next-line no-case-declarations
      const qqData = {
        url: shareUrl,
        title: shareTitle,
        pics: obj.pic || qq.pic, //QZone接口暂不支持发送多张图片的能力，若传入多张图片，则会自动选入第一张图片作为预览图。
        source: obj.source || qq.source, // 分享来源
        desc: obj.desc || qq.desc,
        summary: obj.summary || qq.summary
      }
      baseUrl = qq.baseUrl + '?' + getParamsUrl(qqData)
      window.open(baseUrl, '_blank')
      break
    case 'qqZone':
      // eslint-disable-next-line no-case-declarations
      const qqZoneData = {
        url: shareUrl,
        title: shareTitle,
        pics: obj.pic || qqZone.pic.split(','),
        sharesource: obj.sharesource || qqZone.sharesource, // 分享来源
        desc: obj.desc || qqZone.desc,
        summary: obj.summary || qqZone.summary
      }
      baseUrl = qqZone.baseUrl + '?' + getParamsUrl(qqZoneData)
      window.open(baseUrl, '_blank')
      break
    case 'douban':
      // eslint-disable-next-line no-case-declarations
      const doubanData = {
        href: shareUrl,
        name: shareTitle,
        image: obj.pic || douban.pic
      }
      baseUrl = douban.baseUrl + '?' + getParamsUrl(doubanData)
      window.open(baseUrl, '_blank')
      break
  }
}
