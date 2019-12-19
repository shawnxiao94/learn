export function setCookie (name, value, _expires) {
  const expires = _expires || 300; // 未传多少天则默认300天
  var expDays = expires * 24 * 60 * 60 * 1000;
  var expDate = new Date();
  expDate.setTime(expDate.getTime() + expDays);
  var expString = expires ? ";expires=" + expDate.toGMTString() : "";
  document.cookie = name + "=" + encodeURI(value) + expString + ";path=/";
}
// 读取cookies
export function getCookie (name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return decodeURI(arr[2]);
  } else {
    return null;
  }
}
// 删除cookies
export function delCookie (name) {
  var exp = new Date(new Date().getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie =
      name + "=" + cval + ";expires=" + exp.toUTCString() + ";path=/";
  }
}
