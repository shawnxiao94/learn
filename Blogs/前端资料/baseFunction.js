/*
*    create by xiaoqiulin
*    原生JS基础方法封装
*/ 
function hasClass(elem, cls){
    cls = cls || '';
    if(cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}
function addClass(elem, cls){
    if(!hasClass(elem, cls)){
        elem.className += ' ' + cls;
    }
}
function removeClass(elem, cls){
    if(hasClass(elem, cls)){
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
        while(newClass.indexOf(' ' + cls + ' ') >= 0){
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
function $(node){
    node = typeof node === "string" ? document.getElementById(node) : node;
    return node;
}
function addEvent(node,eventType,handler){
    node = typeof node == "string" ? document.getElementById(node) : node;
    if(document.all){
        node.attachEvent("on" + eventType,handler)
    }else{
        node.addEventListener(eventType,handler,false);
    }
} 
function getElementsByClassName(str,root,tag){
    if(root){
        root = typeof root == "string" ? document.getElementById(root) : root;
    }else{
        root = document.getElementsByTagName("body")[0];
    }
    tag = tag || "*";
    var els = root.getElementsByTagName(tag),arr = [];
    for(var i = 0, n = els.length; i < n; i++){
        for(var j = 0, k = els[i].className.split(" "), l = k.length; j < l; j++){
            if(k[j] == str){
                arr.push(els[i]);
                break;
            }
        }
    }
    return arr;
}  
function ajax(options) {
    options = options || {};
    options.url = options.url || '';
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    options.async = options.async || true;
    options.data = options.data || {};
    options.beforeSend = options.beforeSend || function(){};
    options.success = options.success || function () {};
    options.fail = options.fail || function () {};
    options.complete = options.complete || function () {};
    var params = formatParams(options.data);
    options.beforeSend && options.beforeSend();
    //创建XHR对象 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //接收 - 第三步
    if( options.async === true ){//异步
        xhr.onreadystatechange = function () {
            //使用异步调用的时候，需要触发readystatechange 事件
            if (xhr.readyState == 4) {//判断对象的状态是否交互完成
                callBack();
            }
        }
    }else{//同步
        callBack();
    }
    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        //在使用XHR对象时，必须先调用open()方法，
        xhr.open("GET", options.url + "?" + params, options.async);
        xhr.send(null);//get方式则填null
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, options.async);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        xhr.send(params);//post方式将数据放在send()方法里
    }
    //回调
    function callBack(){
        var status = xhr.status;
        if (status >= 200 && status < 300) {//判断http的交互是否成功，200表示成功
            options.success && options.success(xhr.responseText, xhr.responseXML);
        } else {
            options.fail && options.fail(status);
        } 
        options.complete && options.complete();      
    }
    //名值对转换为字符串
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        return arr.join("&");
    }
}
function ajaxJsonp(options) {
    options = options || {};
    if (!options.url || !options.callback) {
        throw new Error("参数不合法");
    }

    //创建 script 标签并加入到页面中
    var callbackName = options.callbackName ? options.callbackName : ('jsonp_' + Math.random()).replace(".", "");
    var oHead = document.getElementsByTagName('head')[0];
    options.data[options.callback] = callbackName;
    var params = formatParams(options.data);
    var oS = document.createElement('script');
    oHead.appendChild(oS);

    options.beforeSend && options.beforeSend();

    //创建jsonp回调函数
    window[callbackName] = function (json) {
        oHead.removeChild(oS);
        clearTimeout(oS.timer);
        window[callbackName] = null;
        options.success && options.success(json);
        options.complete && options.complete(); 
    };

    //发送请求
    oS.src = options.url + '?' + params;

    //超时处理,如果不设置超时，就无法得知此次请求是成功还是失败
    if (options.time) {
        oS.timer = setTimeout(function () {
            window[callbackName] = null;
            oHead.removeChild(oS);
            options.fail && options.fail({ message: "超时" });
            options.complete && options.complete(); 
        }, options.time);
    }

    //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&');
    }        
};
function GetRequest(temp) {
    var theRequest = new Object();
    var str = temp.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
    }
    return theRequest;
}
function setCookie(name,value,expires){
    expires = expires || 300;//未传多少天则默认300天
    var expDays = expires*24*60*60*1000;
    var expDate = new Date();
    expDate.setTime(expDate.getTime() + expDays);
    var expString = expires ? ";expires=" + expDate.toGMTString() : "";
    document.cookie = name + "=" + encodeURI(value) + expString + ";path=/";
}
//读取cookies
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return decodeURI(arr[2]);
    }else{
        return null;
    }
}
//删除cookies
function delCookie(name){
    var exp = new Date(new Date().getTime() -1);
    var cval=getCookie(name);
    if(cval!=null){
        document.cookie= name + "="+cval+";expires="+exp.toUTCString() + ";path=/";
    }
}
function trim(ostr){
    return ostr.replace(/^\s+|\s+$/g,"");
}
function stopPropagation(e){
    e = window.event || e;
    if(document.all){
        //ie 下
        e.cancelBubble = true;
    }else{
        //非IE下
        e.stopPropagation();
    }
}
function getEventTarget(e){
    e = window.event || e;
    return e.srcElement || e.target;
}
function sibling( elem ) {
    var r = [];
    var n = elem.parentNode.firstChild;
    for ( ; n; n = n.nextSibling ) {
        if ( n.nodeType === 1 && n !== elem ) {
            r.push( n );
        }
    }
    return r;
}
function getChildNodes(ele){
   var childArr = ele.children || ele.childNodes,childArrTem = new Array();  //  临时数组，用来存储符合条件的节点
    for(var i=0,len=childArr.length;i<len;i++){
        if(childArr[i].nodeType==1){
            childArrTem.push(childArr[i]);
        }
    }
    return childArrTem;
}
function del_ff(elem){
    var elem_child = elem.childNodes;
    for(var i=0; i<elem_child.length;i++){
        if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)){
            elem.removeChild(elem_child);
        }
    }
}
function count(o){
    var t = typeof o;
    if(t == 'string'){
            return o.length;
    }else if(t == 'object'){
            var n = 0;
            for(var i in o){
                    n++;
            }
            return n;
    }
    return false;
}
function beforeAjax(){  
    var ajaxData = {  
        type:arguments[0].type || "GET",  
        url:arguments[0].url || "",  
        async:arguments[0].async || "true",  
        data:arguments[0].data || null,  
        dataType:arguments[0].dataType || "json",  
        contentType:arguments[0].contentType || "application/x-www-form-urlencoded;charset=utf-8",  
        beforeSend:arguments[0].beforeSend || function(){},  
        success:arguments[0].success || function(){},  
        error:arguments[0].error || function(){},
        complete:arguments[0].complete || function(){},   
    }  
    ajaxData.beforeSend();  
    var xhr = createxmlHttpRequest();   
    xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);   
    xhr.setRequestHeader("Content-Type",ajaxData.contentType);   
    xhr.send(convertData(ajaxData.data));   
    xhr.onreadystatechange = function() {   
        if (xhr.readyState == 4) {   
            if(xhr.status == 200){  
                ajaxData.success(xhr.responseText, xhr.responseXML)  
            }else{  
                ajaxData.error()  
            } 
            ajaxData.complete();  
        }  
    }    
}  
  
function createxmlHttpRequest() {   
    if (window.ActiveXObject) {   
        return new ActiveXObject("Microsoft.XMLHTTP");   
    } else if (window.XMLHttpRequest) {   
        return new XMLHttpRequest();   
    }   
}  
  
function convertData(data){  
    if( typeof data === 'object' ){  
        var convertResult = "" ;   
        for(var c in data){    
            convertResult+= c + "=" + data[c] + "&";    
        }    
        convertResult=convertResult.substring(0,convertResult.length-1)  
        return convertResult;  
    }else{  
        return data;  
    }  
}   
function IsPC(){  
       var userAgentInfo = navigator.userAgent;  
       var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
       var flag = true;  
       for (var v = 0; v < Agents.length; v++) {  
           if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
       }  
       return flag;  
} 
function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return decodeURI(r[2]); return null;
}
function getStyle (obj,attr) {
    // 获取元素样式...
    if(obj.currentStyle){
        //IE下
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }

}

function getDataType(obj){
   //tostring会返回对应不同的标签的构造函数
   var toString = Object.prototype.toString;
   var map = {
      '[object Boolean]'  : 'boolean', 
      '[object Number]'   : 'number', 
      '[object String]'   : 'string', 
      '[object Function]' : 'function', 
      '[object Array]'    : 'array', 
      '[object Date]'     : 'date', 
      '[object RegExp]'   : 'regExp', 
      '[object Undefined]': 'undefined',
      '[object Null]'     : 'null', 
      '[object Object]'   : 'object'
  };
  if(obj instanceof Element) {
       return 'element';
  }
  return map[toString.call(obj)];
}
function deepClone(obj){
  //深度拷贝
   var type = getDataType(obj);
   var oo;
   if(type === 'array'){
       oo = [];
   }else if(type === 'object'){
       oo = {};
   }else {
       //不再具有下一层次
       return obj;
   }
   if(type === 'array'){
       for(var i = 0, len = obj.length; i < len; i++){
           oo.push(arguments.callee(obj[i]));
       }
   }else if(type === 'object'){
       for(var key in obj){
           if(obj.hasOwnProperty(key)){
                oo[key] = arguments.callee(obj[key]);
           }
       }
   }
   return oo;
}


// 字符串转换为驼峰结构
function doStr(str){

    // 转换为数组
    var strArr = str.split("");

    // 循环数组
    for(var i=0; i<strArr.length; i++){

        // 移除 - 字符
        if(strArr[i] == "-"){

            // 删除匹配到的 - 符号
            strArr.splice(i,1);

            // 如果不是第一个，替换之后字母为大写
            if(i!==0){

                // 如果 - 后面不为空
                if(strArr[i]!==""){
                    strArr[i] = strArr[i].toUpperCase();
                }
            }
        }

    }
    // 数组转换为字符串
    var str = strArr.join("");
    return str;

}
//document.write("-webkit-border-image ==>>> "+doStr("-webkit-border-image"));
//##示例：

//-webkit--border-image  ==>>>  webkitBorderImage