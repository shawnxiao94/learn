(function(){
	//=====================================
	// 原生JS 函数封装集合整理
	// shawnxiao 597035529@qq.com
	// 2016-07-18
	//======================================

	//定义敏感字符
	var forbiddenArray = ['xx','<','>','黄色'];
	//定义函数
	function forbiddenStr(str){
		//var destString = trim(str);
		var re = '';
		for(var i = 0; i < forbiddenArray.length; i++){
			if(i==forbiddenArray.length-1){
				re += forbiddenArray[i];
			}else{
				re += forbiddenArray[i]+"|";
			}
		}
		//定义正则表示式对象
		//利用RegExp可以动态生成正则表示式
		var pattern = new RegExp(re,"g");
		if(pattern.test(str)){
			return false;
		}else{
			return true;
		}
	}


	// 取消文本的选择 (兼容浏览器)
	 window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

	// 获取class属性
	function getClass(obj,name){
		var arr = [];
		var elems = obj.getElementsByTagName('*');
		for(var i=0;i<elems.length;i++){
			if(elems[i].className == name){
			arr.push(elems[i]);
			}
		}
		return arr;
	}

	//数组去重	
	function removeRepeatArray(arr){
	    return Array.from(new Set(arr))
	}
	// 数组顺序打乱
	function upsetArr(arr){
	    return arr.sort(function(){ return Math.random() - 0.5});
	}
	// 数组最大值最小值
	//这一块的封装，主要是针对数字类型的数组
	function maxArr(arr){
	    return Math.max.apply(null,arr);
	}
	function minArr(arr){
	    return Math.min.apply(null,arr);
	}


	//类数组转化成数组
	function convertToArray(aLi){
		var arr = null;
		try{
			arr = Array.prototype.slice.call(aLi,0);
		}catch(e){
			arr = new Array();
			for(var i=0;i<aLi.length;i++){
				arr[i].push(aLi[i]);
			}
		}
		return arr;
	}

	// DOM加载完毕 模仿JQuery中的ready()事件
	function ready(readyFn) {
		//非IE浏览器
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', function () {
				readyFn && readyFn();
			}, false);
		} else {
			//方案1和2  哪个快用哪一个
			var bReady = false;
			//方案1
			document.attachEvent('onreadystatechange', function () {
				if (bReady) {
					return;
				}
				if (document.readyState == 'complete' || document.readyState == "interactive") {
					bReady = true;
					readyFn && readyFn();
				};
			});

			//方案2
			//jquery也会担心doScroll会在iframe内失效，此处是判断当前页是否被放在了iframe里
			if (!window.frameElement) {
				setTimeout(checkDoScroll, 1);
			}
			function checkDoScroll() {
				try {
					document.documentElement.doScroll("left");
					if (bReady) {
						return;
					}
					bReady = true;
					readyFn && readyFn();
				}
				catch (e) {
					// 不断检查 doScroll 是否可用 - DOM结构是否加载完成
					setTimeout(checkDoScroll, 1);
				}
			};
		}
	};

	//解决IE8及低版本浏览器不支持javascript .trim()方法
	if(typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, ''); 
		}
	}

	/*解决IE8及低版本浏览器不支持forEach的方法
	* forEach遍历数组
	* @param callback [function] 回调函数；
	* @param context [object] 上下文；	
	*/
	if (typeof Array.prototype.forEach != 'function') {
		Array.prototype.forEach = function (fn, context) {
			for (var k = 0, length = this.length; k < length; k++) {
				if (typeof fn === "function" && Object.prototype.hasOwnProperty.call(this, k)) {
					fn.call(context, this[k], k, this);
				}
			}
		};		
	}

	// forEach方法 兼容
	function forEach( nodeList, callback ) {
	  if(Array.prototype.forEach){
	    // ie9+
	    Array.prototype.forEach.call( nodeList, callback );
	  }else {
	    // ie8
	    for (var i = 0; i < nodeList.length; i++){
	      callback(nodeList[i], i);
	    }
	  }
	}
	// forEach(document.querySelectorAll(selector),function(el, i){
	  
	// })


	var isIE=!!window.ActiveXObject;
	var isIE6=isIE&&!window.XMLHttpRequest;
	var isIE8=isIE&&!!document.documentMode;
	var isIE7=isIE&&!isIE6&&!isIE8;
	if (isIE){
		if (isIE6){
		   alert('ie6');
		}else if (isIE8){
		   alert('ie8');
		}else if (isIE7){
		   alert('ie7');
		}
	}　

	function getOs() {
		var naviGator  = navigator.userAgent;
		if (naviGator.indexOf("MSIE 8.0") > 0) {
		   return "MSIE8";
		}else if (naviGator.indexOf("MSIE 6.0") > 0) {
		   return "MSIE6";
		}else if (naviGator.indexOf("MSIE 7.0") > 0) {
		   return "MSIE7";
		}else if (isFirefox = naviGator.indexOf("Firefox") > 0) {
		   return "Firefox";
		}else if (naviGator.indexOf("Chrome") > 0) {
		   return "Chrome";
		}else {
		   return "Other";
		}
	}


	function loadJS (url, fn) {
	   var ss = document.getElementsByName('script'),
	       loaded = false;
	   for (var i = 0, len = ss.length; i < len; i++) {
	       if (ss[i].src && ss[i].getAttribute('src') == url) {
	           loaded = true;
	           break;
	       }
	   }
	   if (loaded) {
	       if (fn && typeof fn != 'undefined' && fn instanceof Function) fn();
	       return false;
	   }
	   var s = document.createElement('script'),
	       b = false;
	   s.setAttribute('type', 'text/javascript');
	   s.setAttribute('src', url);
	   s.onload = s.onreadystatechange = function () {
	       if (!b && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
	           b = true;
	           if (fn && typeof fn != 'undefined' && fn instanceof Function) fn();
	       }
	   };
	   document.getElementsByTagName('head')[0].appendChild(s);
	}

	//获取当前时间
	function GetCurrentDate() {
	   var d = new Date();
	   var y = d.getYear()+1900;
	   month = add_zero(d.getMonth() + 1),
	   days = add_zero(d.getDate()),
	   hours = add_zero(d.getHours());
	   minutes = add_zero(d.getMinutes()),
	   seconds = add_zero(d.getSeconds());
	   var str = y + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
	   return str;
	};
	function add_zero(temp) {
		return temp < 10 ? "0" + temp : temp;
	}


    function getReferrer() {
        var t = "";
        try {
            t = window.top.document.referrer
        } catch (n) {
            if (window.parent) try {
                t = window.parent.document.referrer
            } catch (e) {
                t = ""
            }
        }
        return "" === t && (t = document.referrer), t
    }
	/*
	*  IE和Firefox的差异兼容下 获取返回原素的兄弟元素 
	*  @ param node {Object} Dom节点对象
	*  @ return nextNode {Object} Dom对象
	*/
	function getNextNode(node){
		node = typeof node == "string" ? document.getElementById(node) : node;
		var nextNode = node.nextSibling;
		if(!nextNode) return null;
		if(!document.all){
			// ie支持document.all, firefox不支持
			while(true){
				if(nextNode.nodeType == 1){
					break;
				}else{
					if(nextNode.nextSibling){
						nextNode = nextNode.nextSibling;
					}else{
						break;
					}
				}
			}
		}
		return nextNode;
	}
	/*
	*  兼容IE和Firefox的event对象 得到派生事件的对象
	*  @ return  {Object} Dom对象
	*/
	function getEventTarget(e){
		e = window.event || e;
		return e.srcElement || e.target;
	}
	/*
	*  兼容IE和Firefox 阻止事件冒泡
	*  阻止事件冒泡在IE下通过设置event对象的cancelBubble属性为true实现的，而在firefox下则是通过调用event对象的stopPropagation方法实现的
	*/
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

	/*
	//活动鼠标滚动 兼容处理
	* 返回：滚轮方向 1：向上 -1：向下 
	*当鼠标滚轮触发时，在no-FF浏览器中，记录其距离的是“wheelDelta”，它返回的总是120的倍数（120表明mouse向上滚动，－120表明鼠标向下滚动）。
	*而在FF中，记录其滚动距离的是“detail”属性，它返回的是3的倍数（3表明mouse向下滚动，－3表明mouse向上滚动）
	*滚轮事件的兼容性差异有些不拘一格，不是以往的IE8-派和其他派，而是FireFox派和其他派。
	*包括IE6在内的浏览器是使用onmousewheel，而FireFox浏览器一个人使用DOMMouseScroll. 经自己测试，即使现在FireFox 19下，也是不识onmousewheel
	*/
	//引用举例：
    var mousewheel = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";//FF doesn't recognize mousewheel as of FF3.x

    addEvent(document,mousewheel,function(event){
        var tips = "滚动方向不明";
        if( GetDelta(event) > 0 ){
            tips = "向上滚动";
        }else{
            tips = "向下滚动";
        }
        // obj.value = tips;
    });

    function GetDelta(event) {
        var delta =0;
        var event = window.event || event ;
        var delta = event.detail ? -(event.detail || 0) / 3 : event.wheelDelta / 120;
        if (event.srcElement && !event.target) {
            event.target = event.srcElement;    
        }
        if (!event.preventDefault && event.returnValue !== undefined) {
            event.preventDefault = function() {
                event.returnValue = false;
            };
        }
        return delta;
    }

	/*
	*  兼容IE和Firefox下的监听事件 IE下是attachEvent监听事件,非IE下是addEventListener监听事件
	*  @param node {Object} id
	*  @param eventType {event}  事件
	*  @param handler {function} 函数方法
	*/
	function addEvent(node,eventType,handler){
		node = typeof node == "string" ? document.getElementById(node) : node;
		if(node.attachEvent){
			node.attachEvent("on" + eventType,handler)
		}else{
			node.addEventListener(eventType,handler,false);
		}
	}
	/*
	*  例:
	*  var btn = document.getElementById("btn");
	*  addEvent(btn,"click",function(){alert(1);})
	*/

	/*
	*  封装他trim　检查返回过滤空字符串
	*  @param  ostr {string} 字符串
	*/
	function trim(ostr){
		return ostr.replace(/^\s+|\s+$/g,"");
	}
	// ==================================
	//  定义类型判断字符串数据类型函数
	// ==================================
	/*
	*  isNumber() 是否是数字
	*  return 返回 真或假
	*/	
	function isNumber(s){
		return !isNaN(s);
	}
	/*
	*  isString() 是否是字符串
	*  return 返回 真或假
	*/	
	function isString(s){
		return typeof s === "string";
	}
	/*
	*  isBoolean() 是否是布尔值
	*  return 返回 真或假
	*/	
	function isBoolean(s){
		return typeof s=== "boolean";
	}
	/*
	*  isFunction() 是否是函数
	*  return 返回 真或假
	*/	
	function isFunction(s){
		return typeof s=== "function";
	}
	/*
	*  isNull() 是否是null
	*  return 返回 真或假
	*/	
	function isNull(s){
		return s === null;
	}
	/*
	*  isUndefined() 是否是undefined
	*  return 返回 真或假
	*/	
	function isUndefined(s){
		return typeof s === "undefined";
	}
	/*
	*  isEmpty() 是否是为空
	*  return 返回 真或假
	*/	
	function isEmpty(s){
		return /^\s*$/.test(s);
	}
	/*
	*  isArray() 是否是数组
	*  return 返回 真或假
	*/	
	function isArray(s){
		return s instanceof Array;
	}
	// ================================
	/*
	*  extend() 封装继承方法
	*  js支持面向对象，但它不提供extend方法用于继承，自此自定义extend方法
	*/
	function extend(subClass,superClass){
		var F = function(){};
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;
		subClass.superClass = superClass.prototype;
		if(superClass.prototype.constructor == Object.prototype.constructor){
			superClass.prototype.constructor = superClass;
		}
	}
	/*例：
	function Animal(name){
		this.name = name;
		this.type = "animal";
	}		
	Animal.prototype = {
		say : function () {
			console.log("我是一个" + this.type + ",我的名字是" + this.name);
		}
	}
	function Bird(name) {
		this.constructor.superClass.constructor.apply(this,arguments);
		this.type = "bird";
	}
	extend(Bird,Animal);
	Bird.prototype.fly=function () {
		console.log("我在飞翔");
	}
	var canary = new Bird("xiaocui");
	canary.say();//我是一个小鸟，我的名字是xiaocui
	canary.fly();//我的飞翔
	*/
	/*
		设置cookie
		@param name {string}
		@param value {string}
		@param expires {number}
	*/ 
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
			document.cookie= name + "="+cval+";expires="+exp.toUTCString() + ";path=/;domain=eastday.com";
		}
	}

	// js 遍历所有Cookie
	function clearCookie(){
	  var strCookie=document.cookie;
	  var arrCookie=strCookie.split("; "); // 将多cookie切割为多个名/值对
	  for(var i=0;i <arrCookie.length;i++){
	  	 // 遍历cookie数组，处理每个cookie对
		    var arr=arrCookie[i].split("=");
		    if(arr.length>0){
		    	delCookie(arr[0]);
			}
	   }
	}

	//另一种实现方法
	//set
	function setCookie(objName,objValue,objHours,objDomain,objPath){
	    var str = objName + "=" + escape(objValue);
	    if(objHours > 0){ //为时不设定过期时间，浏览器关闭时cookie自动消失
	        var date = new Date();
	        var ms = objHours*3600*1000;
	        date.setTime(date.getTime() + ms);
	        str += "; expires=" + date.toGMTString();
	        if(objDomain){
	            str += ";domain="+objDomain;
	        }
	        if(objPath){
	            str += ";path="+objPath;
	        }
	    }
	    document.cookie = str;
	}

	// get
	function getCookie(objName){
	  var arrStr = document.cookie.split("; ");
	  for(var i = 0;i < arrStr.length;i ++){
	    var temp = arrStr[i].split("=");
	    if(temp[0] == objName) return unescape(temp[1]);
	  }
	}

	//del
	function delCookie(name){
	  var date = new Date();
	  date.setTime(date.getTime() - 10000);
	  document.cookie = name + "=a; expires=" + date.toGMTString();
	}		



})();
/*======================================================================================================================================*/
/*
* 名称：本地存储函数
* 功能：兼容各大浏览器存储
* 作者：轩枫
* 日期：2015/06/11
* 版本：V2.0
*/
 
/**
 * LocalStorage 本地存储兼容函数
 * getItem: 获取属性
 * setItem: 设置属性
 * removeItem: 删除属性
 *
 *
 * @example
 *
    iLocalStorage.setItem('key', 'value');
    console.log(iLocalStorage.getItem('key'));
    iLocalStorage.removeItem('key');
 *
 */
 
 
(function(window, document){
 
    // 1. IE7下的UserData对象
    var UserData = {
        userData: null,
        name: location.href,
        init: function(){
            // IE7下的初始化
            if(!UserData.userData){
                try{
                    UserData.userData = document.createElement("INPUT");
                    UserData.userData.type = "hidden";
                    UserData.userData.style.display = "none";
                    UserData.userData.addBehavior("#default#userData");
                    document.body.appendChild(UserData.userData);
                    var expires = new Date();
                    expires.setDate(expires.getDate() + 365);
                    UserData.userData.expires = expires.toUTCString();
                } catch(e){
                    return false;
                }
            }
            return true;
        },
 
        setItem: function(key, value){
            if(UserData.init()){
                UserData.userData.load(UserData.name);
                UserData.userData.setAttribute(key, value);
                UserData.userData.save(UserData.name);
            }
        },
 
        getItem: function(key){
            if(UserData.init()){
                UserData.userData.load(UserData.name);
                return UserData.userData.getAttribute(key);
            }
        },
 
        removeItem: function(key){
            if(UserData.init()){
                UserData.userData.load(UserData.name);
                UserData.userData.removeAttribute(key);
                UserData.userData.save(UserData.name);
            }
        }
 
    };
 
    // 2. 兼容只支持globalStorage的浏览器
    // 使用： var storage = getLocalStorage();
    function getLocalStorage(){
        if(typeof localStorage == "object"){
            return localStorage;
        } else if(typeof globalStorage == "object"){
            return globalStorage[location.href];
        } else if(typeof userData == "object"){
            return globalStorage[location.href];
        } else{
            throw new Error("不支持本地存储");
        }
    }
    var storage = getLocalStorage();
 
    function iLocalStorage(){
 
    }
 
    // 高级浏览器的LocalStorage对象
    iLocalStorage.prototype = {
        setItem: function(key, value){
            if(!window.localStorage){
                UserData.setItem(key, value);
            }else{
                storage.setItem(key, value);
            }
        },
 
        getItem: function(key){
            if(!window.localStorage){
                return UserData.getItem(key);
            }else{
                return storage.getItem(key);
            }
        },
 
        removeItem: function(key){
            if(!window.localStorage){
                UserData.removeItem(key);
            }else{
                storage.removeItem(key);
            }
        }
    }
 
 
    if (typeof module == 'object') {
        module.exports = new iLocalStorage();
    }else {
        window.iLocalStorage = new iLocalStorage();
    }
 
})(window, document);
/*===============================================================================================================================*/

var hasClass = (function(){
    var div = document.createElement("div") ;
    if( "classList" in div && typeof div.classList.contains === "function" ) {
        return function(elem, className){
            return elem.classList.contains(className) ;
        } ;
    } else {
        return function(elem, className){
            var classes = elem.className.split(/\s+/) ;
            for(var i= 0 ; i < classes.length ; i ++) {
                if( classes[i] === className ) {
                    return true ;
                }
            }
            return false ;
        } ;
    }
})() ;

/* hasClass */
/*  @param elem {Object} id */
function hasClass(elem, cls){
    cls = cls || '';
    if(cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}
/* addClass */
/*  @param elem {Object} id */
function addClass(elem, cls){
    if(!hasClass(elem, cls)){
        elem.className += ' ' + cls;
    }
}
/* removeClass */
/*  @param elem {Object} id */
function removeClass(elem, cls){
    if(hasClass(elem, cls)){
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
        while(newClass.indexOf(' ' + cls + ' ') >= 0){
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}


/*
*jQuery里面获取兄弟节点的源码：
*思路：先找到此元素的父节点的第一个子节点，然后循环查找此节点的下一个兄弟节点，一直到查找完毕。
*/
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


/*
*  封装get(),$() 获取ID 方法
*  @param node {Object} id
*  return dom节点
*/
function get(node){
	node = typeof node === "string" ? document.getElementById(node) : node;
	return node;
}
function $(node){
	node = typeof node === "string" ? document.getElementById(node) : node;
	return node;
}			
/* 例：
*  console.log(get("id").innerHTML);
*  console.log($("id").innerHTML);
/*

/*
*  getElementsByClassName() 封装通过class类获取 dom集合 方法
*  @param str {string} classname字符串
*  @param root {Object} 父容器，缺省为body节点
*  @param tag {string} dom节点的标签名
*  return arr {Object} 返回对象集合
*/
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


// 原生的JS获取ID为test的元素下的子元素。可以用：
// var a = docuemnt.getElementById("test").getElementsByTagName("div");  这样是没有问题的
// 此时a.length=2；
// 但是如果我们换另一种方法
// var b =document.getElementById("test").childNodes;  
// 此时b.length 在IE浏览器中没问题，其依旧等于2，但是在FF浏览器中则会使4，是因为FF把换行也当做一个元素了。
// 所以，在此，我们就要做处理了，需遍历这些元素，把元素类型为空格而且是文本都删除。

function del_ff(elem){
	var elem_child = elem.childNodes;
	for(var i=0; i<elem_child.length;i++){
		if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)){
			elem.removeChild(elem_child);
		}
	}
}
// var s= document.getElementById("test");
// del_ff(s);    //清理空格

/*
* @param ele {object}
* 获取子元素
*/
function getChildNodes(ele){
   var childArr = ele.children || ele.childNodes,
         childArrTem = new Array();  //  临时数组，用来存储符合条件的节点
    for(var i=0,len=childArr.length;i<len;i++){
        if(childArr[i].nodeType==1){
            childArrTem.push(childArr[i]);
        }
    }
    return childArrTem;
}

/*
*  show() 显示 方法
*  @param node {Object} id
*/
function show(node){
	node.style.display = "block";
}
/*
*  hide() 显示 方法
*  @param node {Object} id
*/
function show(node){
	node.style.display = "none";
}


/**
*原生js仿jquery一些常用方法，那么，ajax如何实现呢？如下是一个比较完整的ajax()
*/
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

//使用格式跟jquery的ajax差不多:
/*
ajax({  
    type:"POST",  
    url:"ajax.php",  
    dataType:"json",  
    data:{"val1":"abc","val2":123,"val3":"456"},  
    beforeSend:function(){  
        //some js code  
    },  
    success:function(msg){  
        console.log(msg)  
    },  
    error:function(){  
        console.log("error")  
    }  
}) 
*/




/* 封装同域ajax函数
* @param {string}options.type http连接的方式，包括POST和GET两种方式
* @param {string}options.url 发送请求的url
* @param {boolean}options.async 是否为异步请求，true为异步的，false为同步的
* @param {object}options.data 发送的参数，格式为对象类型
* @param {function}options.success ajax发送并接收成功调用的回调函数
*/
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
/* 使用示例：
ajax({
    url: '/login/log',
    type: 'POST',
    data:
    {
        phonenum: encodeURI($account),
        pwd: encodeURI($password)
    },
    dataType: 'json',
    beforeSend : function(){
	
    },
    success: function(response, xml){
        var obj = JSON.parse(response);
        if (obj.status == 1) {
            window.location.href = obj.url;
        } else {
            tipsmask("tipsloginerror"+String(obj.error_code),obj.info);
        }
    },
    complete : function(){
	
    },
    fail: function(status){
        tipsmask("tipslink","网络异常");
    }
});
*/

/* 封装跨域ajax请求，ajaxJsonp函数
* @param {number}options.time 请求时间，必须参数，否则无法判断请求是否成功和失败
* @param {string}options.url 发送请求的url
* @param {string}options.callback 跨域与后端协调好的发送请求的回调函数名
* @param {object}options.data 发送的参数，格式为对象类型
* @param {function}options.success 发送请求并接收成功调用的回调函数
* @param {function}options.fail 发送请求超时调用的失败函数
*/
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
 //使用示例：
 /*
    ajaxJsonp({
        url: "http://shenmamm.dftoutiao.com/smphoto/refreshsmphoto",//请求地址
        data:{
            callback:"jsonpcallback",//必须
            num:6,
            tpid:'10000002'
        },
        time:6000,
        callback:"jsonpcallback",//回调函数名
        beforeSend : function (){
            console.log("beforeSend");
        },
        success: function (json) {
            // 此处放成功后执行的代码
            console.log(json);
        },
        complete : function(){
            console.log("over");
        },
        fail: function (json) {
            // 此处放失败后执行的代码
            console.log(json);
        }
    });
*/
//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端, //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否为微信浏览器（2015-01-22新增）
            weibo: u.toLowerCase().indexOf('weibo') > -1, //是否为微博打开
            qqBrw : u.toLowerCase().indexOf('mqqbrowser') > -1,//qq浏览器
            qq : u.toLowerCase().indexOf('qq') > -1,//qq浏览器 空空间 QQAPP
            ucLowEnd : u.indexOf('UCWEB7.') > -1,
            ucSpecial : u.indexOf('rv:1.2.3.4') > -1,
            google:u.indexOf('Chrome') > -1,
            ucweb : function (){
                try {
                    return parseFloat(u.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
                } catch (e) {
                    if (u.indexOf('UC') > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }(),
            Symbian : u.indexOf('Symbian') > -1,
            ucSB : u.indexOf('Firefox/1.') > -1
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

// 使用方法：
if (browser.versions.mobile) {//判断是否是移动设备打开
        if (browser.versions.weixin) {
                //在微信中打开
        }
        if (browser.versions.weibo) {
                //在新浪微博客户端打开
        }
        if (browser.versions.qqBrw) {
                //在QQ浏览器打开
        }
        if (browser.versions.ios) {
                //是否在IOS浏览器打开
        } 
        if(browser.versions.android){
                //是否在安卓浏览器打开 //UC浏览器,UC浏览器没有安卓报头，只返回：Linux ，这里粗略的根据linux来判断是安卓（前提必须满足是移动终端，UC这点是满足的）
        }
        // 安卓QQ浏览器HD版检测的结果是：mac， Safar
} else {
        //否则就是PC浏览器打开
}
// 检测浏览器语言

// currentLang = navigator.language;   //判断除IE外其他浏览器使用语言
// if(!currentLang){//判断IE浏览器使用语言
//     currentLang = navigator.browserLanguage;
// }
// alert(currentLang);

//获取客户端操作系统类型
function detectOS() {
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform === "Win32") || (navigator.platform === "Windows");
    var isMac = (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform === "MacIntel");
    var bIsIpad = sUserAgent.match(/ipad/i) === "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) === "iphone os";
    var isUnix = (navigator.platform === "X11") && !isWin && !isMac;
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) === "android";
    var bIsCE = sUserAgent.match(/windows ce/i) === "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) === "windows mobile";
		if (isMac) return "Mac";
    if (isUnix) return "Unix";
    if (isLinux) {
        if (bIsAndroid){
            return "Android";
        }else{
            return "Linux";
        }
    }
    if(bIsCE || bIsWM){
        return 'wm';
    }
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
        if (isWin8) return "Win8";
    }
    return "other";
}

//进度条

function Progress(id, width, height, outClass, inClass) {
    this.width = width;
    this.height = height;
    this.color = "#fff";
    this.progress = document.createElement("div");
    this.percentage = document.createElement("div");
    this.filler = document.createElement("div");
    var element = document.getElementById(id);
    if(width) {
        this.progress.style.width = this.width + "px";
    } else {
        this.progress.style.width = "200px";
    }
    if(height) {
        this.progress.style.height = this.height + "px";
    } else {
        this.progress.style.height = "20px";
    }
    if(typeof outClass === "string" && (/^[a-zA-Z](\w|[-])+$/g.test(outClass))) {
        this.progress.className = outClass;
    } else {
        this.progress.style.border = "1px solid #cccccc";
        this.progress.style.backgroundImage = "linear-gradient(to bottom, #ccc 0%, #fff 40%, #ccc 100%)";
        this.progress.style.borderRadius = "10px";
    }
    this.progress.style.overflow = "hidden";
    this.progress.style.position = "relative";
    element.appendChild(this.progress);
    //
    this.progress.appendChild(this.percentage);
    this.percentage.style.width = "100%";
    this.percentage.style.height = "100%";
    this.percentage.style.textAlign = "center";
    this.percentage.style.position = "absolute";
    this.percentage.innerHTML = "0%";
    //
    this.progress.appendChild(this.filler);
    this.filler.style.height = "100%";
    this.filler.style.width = 0;
    if(typeof inClass === "string" && (/^[a-zA-Z](\w|[-])+$/g.test(inClass))) {
        this.filler.className = inClass;
    } else {
        this.filler.style.backgroundColor = "#DC7BBE";
        this.filler.style.backgroundImage = "linear-gradient(to bottom, #0AF 0%, #0ff 40%, #0AF 100%)";
    }
}
Progress.prototype.fill = function(value) {
    if(value) {
        this.percentage.innerHTML = value + "%";
        this.percentage.style.color = this.color;
        value = (this.progress.offsetWidth - 2) / 100 * value;
        this.filler.style.width = value + "px";
    } else {
        this.filler.style.width = 0;
        this.percentage.innerHTML = "0%";
    }
}

//拖拽

function Drag(target, area) {
    this.target = target;
    this.area = area;
}

//根据传入的值获取目标
Drag.prototype.dragTarget = function(target) {
    if(typeof target === "string") {
        return document.getElementById(target);
    } else if(typeof target === "object") {
        return target;
    }
}

Drag.prototype.init = function() {
    this.target = this.dragTarget(this.target);
    this.target.style.position = "absolute";
    this.target.setAttribute("draggable","true");
    this.dragEvent();
}

Drag.prototype.dragEvent = function() {
    var that = this;
    this.target.onmousedown = function(e) {
        e = e || window.event;
        that.disX = e.clientX - that.target.offsetLeft;
        that.disY = e.clientY - that.target.offsetTop;
        document.onmousemove = function(e) {
            that.moveEvent(e);
        }
        document.onmouseup = function(){
            that.target.style.opacity = "1";
            document.onmousemove = document.onmouseup = null;
        }
        return false;
    }
}
Drag.prototype.moveEvent = function(e) {
    var limitX = e.clientX - this.disX;
    var limitY = e.clientY - this.disY;
    //没有指定区域则用document

    if (!this.area) {
        this.area = document.documentElement;
    }
    if(limitX < this.area.offsetLeft) {
        limitX = this.area.offsetLeft;
    } else if(limitX > this.area.clientWidth + this.area.offsetLeft - this.target.offsetWidth) {
        limitX =  this.area.clientWidth + this.area.offsetLeft - this.target.offsetWidth;
    }
    if(limitY < this.area.offsetTop) {
        limitY = this.area.offsetTop;
    } else if(limitY > this.area.clientHeight + this.area.offsetTop - this.target.offsetHeight) {
        limitY = this.area.clientHeight + this.area.offsetTop - this.target.offsetHeight;
    }
    this.target.style.left = limitX + "px";
    this.target.style.top = limitY + "px";
    this.target.style.opacity = "0.8";
} 

/*============================================ safari浏览器无痕浏览下能识别localStorage但不支持setItem()等方法的时候重构localStorage代码==================================*/
// Fake localStorage implementation. safari浏览器无痕浏览下能识别localStorage但不支持setItem()等方法的时候重构localStorage代码
// Mimics localStorage, including events. 
// It will work just like localStorage, except for the persistant storage part. 

var fakeLocalStorage = function() {
  var fakeLocalStorage = {};
  var storage; 

  // If Storage exists we modify it to write to our fakeLocalStorage object instead. 
  // If Storage does not exist we create an empty object. 
  if (window.Storage && window.localStorage) {
    storage = window.Storage.prototype; 
  } else {
    // We don't bother implementing a fake Storage object
    window.localStorage = {}; 
    storage = window.localStorage; 
  }

  // For older IE
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
  }

  var dispatchStorageEvent = function(key, newValue) {
    var oldValue = (key == null) ? null : storage.getItem(key); // `==` to match both null and undefined
    var url = location.href.substr(location.origin.length);
    var storageEvent = document.createEvent('StorageEvent'); // For IE, http://stackoverflow.com/a/25514935/1214183

    storageEvent.initStorageEvent('storage', false, false, key, oldValue, newValue, url, null);
    window.dispatchEvent(storageEvent);
  };

  storage.key = function(i) {
    var key = Object.keys(fakeLocalStorage)[i];
    return typeof key === 'string' ? key : null;
  };

  storage.getItem = function(key) {
    return typeof fakeLocalStorage[key] === 'string' ? fakeLocalStorage[key] : null;
  };

  storage.setItem = function(key, value) {
    dispatchStorageEvent(key, value);
    fakeLocalStorage[key] = String(value);
  };

  storage.removeItem = function(key) {
    dispatchStorageEvent(key, null);
    delete fakeLocalStorage[key];
  };

  storage.clear = function() {
    dispatchStorageEvent(null, null);
    fakeLocalStorage = {};
  };
};

// Example of how to use it 应用举例：
if (typeof window.localStorage === 'object') {
  // Safari will throw a fit if we try to use localStorage.setItem in private browsing mode. 
  try {
    localStorage.setItem('localStorageTest', 1);
    localStorage.removeItem('localStorageTest');
  } catch (e) {
    fakeLocalStorage();
  }
} else {
  // Use fake localStorage for any browser that does not support it.
  fakeLocalStorage();
}/*=============================================================================================================*/
/**
 * 取String 或者 object的长度
 * 
 * */
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

/*截取url参数*/
function GetRequest(temp) {
	var theRequest = new Object();
	var str = temp.substr(1);
	var strs = str.split("&");
	for(var i = 0; i < strs.length; i ++) {
		theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
	}
	return theRequest;
}

/*
 * 描述：动画倒计时
 * 参数：intDiff Int 倒计时时间(毫秒)
 * 参数：hObj,mObj,sObj  倒计时时、分、秒或毫秒容器ID
 * 返回值：无
 * */
function CountDownTimer(intDiff,hObj,mObj,sObj) {
    var objTimer = window.setInterval(function() {
        var hour = 0,min = 0,sec = 0,msec = 0;
        if( intDiff <= 0 ){
        	//如果差小于等于0  也就是过期或者正好过期，则推出程序 
        	window.clearInterval(objTimer); //关闭定时器
        	checkToDo();
            return;//结束执行 
        }   
        var total = intDiff; //
        hour = parseInt(total / 3600000);
        total = intDiff % 3600000;
        min = parseInt(total / 60000);
        total = intDiff % 60000;
        sec = parseInt(total / 1000);
        total = intDiff % 1000;
        msec = parseInt(total / 10); //毫秒

        var hh = hour.toString();
        var mm = min.toString();
        var ss = sec.toString();
        var ms = msec.toString();

        hh = hh.length > 1 ? hh : ('0' + hh);
        mm = mm.length > 1 ? mm : ('0' + mm);
        ss = ss.length > 1 ? ss : ('0' + ss);
        ms = ms.length > 1 ? ms : ('0' + ms);
        if( intDiff < 3600000 ){
        	hObj.innerHTML = mm;
            mObj.innerHTML = ss;
            sObj.innerHTML = ms;
        }else{
        	//倒计时时大于60分钟启用秒级倒计时
        	hObj.innerHTML = hh;
            mObj.innerHTML = mm;
            sObj.innerHTML = ss;
        }
        intDiff = intDiff - 10;
    }, 10);
}
/*
* http://www.zhangxinxu.com/
* 倒计时的实现
* @param d {参数1 date截止的时间} 建议使用UTC()方法创建Date对象传递给Date构造函数 例，Date.UTC(2030, 6, 27, 16, 34)，表示的就是2030年7月27日161时34分0秒（月份需要加1）
* @param o {参数2 object 对象集} 可选,不支持jQuery对象，只能是DOM对象
{
     sec: 显示秒数值的标签对象,
     mini: 显示分钟数值的标签对象,
     hour: 显示小时数值的标签对象,
     day: 显示天数数值的标签对象,
     month: 显示月份数值的标签对象,
     year: 显示年数数值的标签对象
}
*/
var fnTimeCountDown = function(d, o){
	var f = {
		zero: function(n){
			var n = parseInt(n, 10);
			if(n > 0){
				if(n <= 9){
					n = "0" + n;	
				}
				return String(n);
			}else{
				return "00";	
			}
		},
		dv: function(){
			d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
			var future = new Date(d), now = new Date();
			//现在将来秒差值
			var dur = Math.round((future.getTime() - now.getTime()) / 1000) + future.getTimezoneOffset() * 60, pms = {
				sec: "00",
				mini: "00",
				hour: "00",
				day: "00",
				month: "00",
				year: "0"
			};
			if(dur > 0){
				pms.sec = f.zero(dur % 60);
				pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
				pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
				pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
				//月份，以实际平均每月秒数计算
				pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
				//年份，按按回归年365天5时48分46秒算
				pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
			}
			return pms;
		},
		ui: function(){
			if(o.sec){
				o.sec.innerHTML = f.dv().sec;
			}
			if(o.mini){
				o.mini.innerHTML = f.dv().mini;
			}
			if(o.hour){
				o.hour.innerHTML = f.dv().hour;
			}
			if(o.day){
				o.day.innerHTML = f.dv().day;
			}
			if(o.month){
				o.month.innerHTML = f.dv().month;
			}
			if(o.year){
				o.year.innerHTML = f.dv().year;
			}
			setTimeout(f.ui, 1000);
		}
	};	
	f.ui();
};
// 示例：
/*
var d = Date.UTC(2030, 6, 27, 16, 34);
var obj = {
     sec: document.getElementById("sec"),
     mini: document.getElementById("mini"),
     hour: document.getElementById("hour")
}
fnTimeCountDown(d, obj);
*/

//获取链接参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

//获取页面视口宽高
function getViewRect() {
    var pageWidth = window.innerWidth
            ,pageHeight = window.innerHeight;

    if ( typeof pageWidth != 'number' ) {
        if ( document.compatMode == 'CSS1Compat') {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }
    return {
        width: pageWidth,
        height: pageHeight
    };
};
/*判断横竖屏*/
function hengshuping(){
    if(window.orientation==180||window.orientation==0){
        var h = getViewRect().height;
        console.log("这是竖屏"+ h);
    }
    if(window.orientation==90||window.orientation==-90){
        var h = getViewRect().height;
        console.log("这是横屏"+ h);
    }
};
// $(function(){
//     hengshuping();
//     $(window).on('orientationchange',function() {
//         setTimeout(function() {
//             hengshuping();
//         },600);
//     });
// })

// （1） 获取浏览器名字+版本字符串
function getBrowserInfo(){
	var agent = navigator.userAgent.toLowerCase() ;
	var regStr_ie = /msie [\d.]+;/gi ;
	var regStr_ff = /firefox\/[\d.]+/gi
	var regStr_chrome = /chrome\/[\d.]+/gi ;
	var regStr_saf = /safari\/[\d.]+/gi ;
	//IE
	if(agent.indexOf("msie") > 0){
		return agent.match(regStr_ie) ;
	}
	//firefox
	if(agent.indexOf("firefox") > 0){
		return agent.match(regStr_ff) ;
	}
	//Chrome
	if(agent.indexOf("chrome") > 0){
		return agent.match(regStr_chrome) ;
	}
	//Safari
	if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0){
		return agent.match(regStr_saf) ;
	}
}

// （2）然后获取版本号
var browser = getBrowserInfo() ;
//alert(browser); 
var verinfo = (browser+"").replace(/[^0-9.]/ig,""); 

/*返回上一页*/  
function return_prepage(){  
	if(window.document.referrer==""||window.document.referrer==window.location.href)  {  
		window.location.href="/";  
	}else  {  
		window.location.href=window.document.referrer;  
	}  
}  

/*
  * @只能输入11位手机号码过滤功能 
  * @param obj {object} input
*/

function filterPhone(obj){
	var inputValue = obj.value;
	if( isNaN( Number(obj.value) ) || obj.value.length > 11 ){
		obj.value = inputValue.substr(0,inputValue.length -1);
		return;
	}	
}

//校验是否全由数字组成 
function isDigit(s) { 
	var patrn=/^[0-9]{1,20}$/; 
	if (!patrn.exec(s)) return false 
	return true 
}
//校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串 
function isRegisterUserName(s) 
{ 
	var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/; 
	if (!patrn.exec(s)) return false 
	return true 
}
//校验用户姓名：只能输入1-30个以字母开头的字串 
function isTrueName(s){ 
	var patrn=/^[a-zA-Z]{1,30}$/; 
	if (!patrn.exec(s)) return false 
	return true 
}
//校验密码：只能输入6-20个字母、数字、下划线 
function isPasswd(s){ 
	var patrn=/^(\w){6,20}$/; 
	if (!patrn.exec(s)) return false 
	return true 
}
//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-” 
function isTel(s){ 
	//var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/; 
	var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/; 
	if (!patrn.exec(s)) return false 
	return true 
}
//校验手机号码：必须以数字开头，除数字外，可含有“-” 
function isMobil(s){ 
	var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/; 
	if (!patrn.exec(s)) return false 
	return true 
}
//校验邮政编码 
function isPostalCode(s){ 
	//var patrn=/^[a-zA-Z0-9]{3,12}$/; 
	var patrn=/^[a-zA-Z0-9 ]{3,12}$/; 
	if (!patrn.exec(s)) return false 
	return true 
}
function isIP(s){ 
	var patrn=/^[0-9.]{1,20}$/; 
	if (!patrn.exec(s)) return false 
	return true 
} 
//浏览器版本是否低于IE8
function lessThenIE8(){
    var UA = navigator.userAgent,
        isIE = UA.indexOf('MSIE') > -1,
        v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
    return v < 8;
};


// 跨浏览器事件处理程序
var eventUtil = {
	//添加句柄
	addHandler:function(element,eventType,handler){
		if(element.addEventListener){
			element.addEventListener(eventType,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+eventType,handler);
		}else{
			element['on'+eventType]=handler;//element['onclick']等同于element.onclick
		}
	},
	//删除句柄
	removeHandler:function(element,eventType,handler){
		if(element.removeEventListener){
			element.removeEventListener(eventType,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+eventType,handler);
		}else{
			element['on'+eventType]=null;
		}
	},
	//获取事件对象
	getEvent:function(event){
		return event ? event : window.event;//ie8以下是window.event
	},
	//获取事件类型
	getType:function(event){
		return event.type;
	},
	//获取事件dom
	getElement:function(event){
		return event.target || event.srcElement;
	},
	//阻止默认行为
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;//ie
		}
	},
	//阻止事件冒泡
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;//IE
		}
	}
}

//完美动画框架封装
function startMove(obj,json,callBack){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//全部动画是否完成标记符
		for(var attr in json){
			//1.取当前的值
			var icur = 0;
			if( attr == "opacity" ){
				icur = Math.round(parseFloat(getStyle(obj,attr))*100);//注意要用Math.round()四舍五入进行处理，以防部分浏览器计算不精确问题导致的计算失误
			}else{
				icur = parseInt(getStyle(obj,attr));
			}
			//2.算速度
			var speed = (json[attr] - icur)/8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//凡是遇到运动数字的时候都要这样处理，不然会各种问题
			//3.检测停止
			if( icur != json[attr] ){
				flag = false;
			}
			if( attr == "opacity" ){
				obj.style.filter = 'alpha(opacity:'+ (icur + speed) +')';//针对IE浏览器
				obj.style.opacity = (icur +speed)/100;
			}else{
				obj.style[attr] = icur + speed + 'px';
			}
		}
		if( flag ){
			clearInterval(obj.timer);
			callBack&&callBack();
		}
	},30);
}

//示例：
// oDiv[i].onmouseout = function(){
// 	var _this = this;
// 	startMove(_this,{'opacity':30,'height':100,'width':200},function(){
// 		startMove(_this,{'width':200})
// 	});
// }

function getStyle (obj,attr) {
	// 获取元素样式...
	if(obj.currentStyle){
		//IE下
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}

}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();


function calLength2(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}


function randomColor() {
	var col = [0, 1, 2];
	col[0] = Math.random() * 100 + 155;
	col[0] = col[0].toFixed();
	col[1] = Math.random() * 100 + 155;
	col[1] = col[1].toFixed();
	col[2] = Math.random() * 100 + 155;
	col[2] = col[2].toFixed();
	var num = Math.floor(Math.random() * 3);
	col[num] = 0;
	return "rgba(" + col[0] + "," + col[1] + "," + col[2] + ",";
}


function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

function lerpDistance(aim, cur, ratio) {
	//aim:目标值，cur:当前值，ratio:百分比
	var delta = cur - aim;
	return aim + delta * ratio;//返回趋近于目标值得值
}

function inOboundary(arrX, arrY, l, r, t, b) { //在l r t b范围内的检测
	return arrX > l && arrX < r && arrY > t && arrY < b;
}

function rgbColor(r, g, b) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b + ",1)";
}

function rgbNum(r, g, b) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b;
}

function rnd(m) {
	var n = m || 1;
	return Math.random() * n;
}

function rateRandom(m, n) {
	var sum = 0;
	for (var i = 1; i < (n - m); i++) {
		sum += i;

	}

	var ran = Math.random() * sum;

	for (var i = 1; i < (n - m); i++) {
		ran -= i;
		if (ran < 0) {
			return i - 1 + m;
		}
	}
}

function distance(x1, y1, x2, y2, l) {
	var x = Math.abs(x1 - x2);
	var y = Math.abs(y1 - y2);
	if (x < l && y < l) {
		return true;
	}
	return false;
}

function AABBbox(object1, w1, h1, object2, w2, h2, overlap) {
	A1 = object1.x + overlap;
	B1 = object1.x + w1 - overlap;
	C1 = object1.y + overlap;
	D1 = object1.y + h1 - overlap;

	A2 = object2.x + overlap;
	B2 = object2.x + w2 - overlap;
	C2 = object2.y + overlap;
	D2 = object2.y + h2 - overlap;

	if (A1 > B2 || B1 < A2 || C1 > D2 || D1 < C2) return false;
	else return true;
}


function dis2(x, y, x0, y0) {
	var dx = x - x0;
	var dy = y - y0;
	return dx * dx + dy * dy;
}

function rndi2(m, n) {
	var a = Math.random() * (n - m) + m;
	return Math.floor(a);
}


//从一个给定的数组arr中,随机返回num个不重复项
function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length>0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
} 

//****经过验证测试可以用的方法*****
//从一个给定的数组arr中,随机返回num个不重复项
function getArrayItems(arr, num){
	var obj = {};
	var temp = [],data = [];
	for( i in arr ){
		if( !obj[arr[i]] ){
			obj[arr[i]] = true;
			temp.push(arr[i]);
		}
	}

	if( num > temp.length ){
		console.log( "超过不重复数组个数" );
		return;
	}

	for( var k = 0 ; k < num ; k ++ ){
		if( temp.length > 0 ){
			var arrIndex = Math.floor(Math.random()*temp.length);
			data[k] = temp[arrIndex];
			temp.splice(arrIndex , 1);
		}
	}
	return data;
}

//获取滚动高度
//localStorage.clear();
function getScrollTop(){
    if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    } else if (document.body) {
        return document.body.scrollTop;
    }
}
/**
 * 获取文档高度
 * @return {[type]} [description]
 */
function getClientHeight(){
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        return (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
    } else {
        return (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
    }
}
/**
 * 关键词高亮处理（递归算法）
 * @param  {String} txt   标题
 * @param  {Array} swArr  关键词数组(字符串)
 * @param  {Number} i     0
 * @return {String}       新的标题
 */
function getNewStr(txt, swArr, i){
    if(txt && swArr && swArr.length){
        var len = swArr.length;
        swArr.sort(function(a, b){
            return b.length - a.length;
        });
        if(!i){i = 0;}
        if(i == len || swArr[i] == '..'){
            return txt;
        } else {
            var reg = new RegExp(swArr[i], 'gi');
            var tempTxt = txt;
            var subTxtIndex = tempTxt.toLowerCase().indexOf(swArr[i].toLowerCase());
            var subTxt = txt.substring(subTxtIndex, subTxtIndex + swArr[i].length);
            return getNewStr(txt.replace(reg, '<em>' + subTxt + '</em>'), swArr, ++i);
        }
    } else {
        return '';
    }
}
/**
 * 更新搜索关键字
 * @param  {[type]} wd 搜索关键字
 * @return {[type]}    [description]
 */
function bdSearch(json){
    var k = json['q'],
        sd = json['s'],
        len = sd.length > 5 ? 5 : sd.length,
        $searchResult = $('#J_search_result'),
        $srList = $searchResult.children('.search-result-list'),
        qdid = '1012704x';
    if(tt_news_mid === 'pgzs' || tt_news_mid.indexOf('waitui') > -1){
        qdid = '1015785c';
        if(tt_news_mid === 'waitui040'){
            qdid = '1015785c';
        }
    }
    if(len == 0){return;}
    $srList.empty();
    for (var i = 0; i < len; i++) {
        var str = getNewStr(sd[i], [k]);
        $srList.append('<li class="search-result-item"><a href="https://m.baidu.com/s?word=' + sd[i] + '&ie=utf-8&from=' + qdid + '">' + str + '</a><div class="ttp" onclick="changeWord(\'' + sd[i] + '\');"></div></li>');
    }
    $searchResult.show();
}

/**
 * browser的判断
 * @return {[type]} [description]
 */
function getBrowserType(){
    var agent = navigator.userAgent.toLowerCase();
    var browser_type = "";
    if (agent.indexOf("msie") > 0) {
        browser_type = "IE";
    }
    if (agent.indexOf("firefox") > 0) {
        browser_type = "firefox";
    }
    if (agent.indexOf("chrome") > 0
        && agent.indexOf("mb2345browser") < 0
        && agent.indexOf("360 aphone browser") < 0) {
        browser_type = "chrome";
    }
    if(agent.indexOf("360 aphone browser") > 0 || agent.indexOf("qhbrowser") > 0){
        browser_type = "360";
    }
    if (agent.indexOf("ucbrowser") > 0) {
        browser_type = "UC";
    }
    if (agent.indexOf("micromessenger") > 0) {
        browser_type = "WeChat";
    }
    if ((agent.indexOf("mqqbrowser") > 0 || agent.indexOf("qq")>0)
        && agent.indexOf("micromessenger") < 0) {
        browser_type = "QQ";
    }
    if (agent.indexOf("miuibrowser") > 0){
        browser_type = "MIUI";
    }
    if (agent.indexOf("mb2345browser") > 0){
        browser_type = "2345";
    }
    if (agent.indexOf("sogoumobilebrowser") > 0){
        browser_type = "sogou";
    }
    if (agent.indexOf("liebaofast") > 0){
        browser_type = "liebao";
    }
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0
        && agent.indexOf("ucbrowser") < 0
        && agent.indexOf("micromessenger") < 0
        && agent.indexOf("mqqbrowser") < 0
        && agent.indexOf("miuibrowser") < 0
        && agent.indexOf("mb2345browser") < 0
        && agent.indexOf("sogoumobilebrowser") < 0
        && agent.indexOf("liebaofast") < 0
        && agent.indexOf("qhbrowser") < 0) {
        browser_type = "safari";
    }
    return browser_type;
}
/**
 * OS的判断
 * @return {[type]} [description]
 */
function getOsType() {
    var agent = navigator.userAgent.toLowerCase();
    var os_type = "";
    if (/android/i.test(navigator.userAgent)) {
        var index = agent.indexOf("android");
        version = agent.substr(index+8,3);
        os_type = "Android "+version;
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        var index = agent.indexOf("os");
        version = agent.substr(index+3,3);
        os_type = "iOS "+version;
    }
    if (/Linux/i.test(navigator.userAgent)
        && !/android/i.test(navigator.userAgent)
        && !/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        os_type = "Linux";
    }
    if(/windows|win32/i.test(navigator.userAgent)){
        os_type = "windows32";
    }
    if(/windows|win32/i.test(navigator.userAgent)){
        os_type = "windows64";
    }
    return os_type;
}

//创建script，插入到DOM中，加载完毕后callBack
function loadScript(url, callback){ 
    var script = document.createElement_x("script") 
    script.type = "text/javascript"; 
    if (script.readyState){ //IE 
        script.onreadystatechange = function(){ 
            if (script.readyState == "loaded" || script.readyState == "complete"){ 
                script.onreadystatechange = null; 
                callback(); 
            }}; 
    }else{
        //Others: Firefox, Safari, Chrome, and Opera 
        script.onload = function(){ 
            callback(); 
        }; 
    } 
    script.src = url; 
    document.body.appendChild(script); 
}

/***解决移动端双击页面上滑问题***/
function proMove() {
	var agent = navigator.userAgent.toLowerCase(); //检测是否是ios
	var iLastTouch = null; //缓存上一次tap的时间
	if(agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
		document.body.addEventListener('touchend', function(event) {
			var iNow = new Date().getTime();

			iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
			var delta = iNow - iLastTouch;
			if(delta < 500 && delta > 0) {
				event.preventDefault();
				return false;
			}
			iLastTouch = iNow;
		}, false);
	}
}


/**排序算法**/

/*1. 冒泡排序*/
function bubbleSort(arr){
	var i = j = 0;
	for(i=1;i<arr.length;i++){
		for(j=0;j<=arr.length-i;j++){
			var temp = 0;
			if(arr[j]>arr[j+1]){
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
}

/*2. 快速排序*/
function quickSort(arr,l,r){
	if(l < r){
		var i = l, j = r, x = arr[i];
		while(i<j){
			while(i<j && arr[j]>x)
				j--;
			
			if(i<j)
				//这里用i++，被换过来的必然比x小，赋值后直接让i自加，不用再比较，可以提高效率
				arr[i++] = arr[j];
			
			while(i<j && arr[i]<x)
				i++;
			
			if(i<j)
				//这里用j--，被换过来的必然比x大，赋值后直接让j自减，不用再比较，可以提高效率
				arr[j--] = arr[i];
		}
		arr[i] = x;
		
		quickSort(arr, l, i-1);
		quickSort(arr, i+1, r);
	}
}

/*
3. 二路归并 
PS：将两个按值有序序列合并成一个按值有序序列，则称之为二路归并排序。
*/
function merge(left, right) {
    var result = [],
        il = 0,
        ir = 0;

    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }
    while(left[il]){
        result.push(left[il++]);
	}
    while(right[ir]){
        result.push(right[ir++]);
    }
    return result;
}

/*
字符串操作
*/
/*1. 判断回文字符串*/
function palindrome(str){
	// \W匹配任何非单词字符。等价于“[^A-Za-z0-9_]”。
	var re = /[\W_]/g;
	// 将字符串变成小写字符,并干掉除字母数字外的字符
	var lowRegStr = str.toLowerCase().replace(re,'');
	// 如果字符串lowRegStr的length长度为0时，字符串即是palindrome
	if(lowRegStr.length===0)
		return true;
	// 如果字符串的第一个和最后一个字符不相同，那么字符串就不是palindrome
	if(lowRegStr[0]!=lowRegStr[lowRegStr.length-1])
		return false;
	//递归
	return palindrome(lowRegStr.slice(1,lowRegStr.length-1));
}

/*
2. 翻转字符串
2.1 思路1：反向遍历字符串
*/
function reverseString(str){
	var tmp = '';
	for(var i=str.length-1;i>=0;i--)
		tmp += str[i];
	return tmp
}

/*
2.2 思路2：转化成array操作。
PS：什么？你要问为啥不直接操作str？ 因为str[i]是只读的，不能str[0]=str[1]这样操作。
再PS：如果允许用reverse()，也可以用'str'.split('').reverse().join('')实现。
*/
function reverseString2(str){
	var arr = str.split("");
	var i = 0,j = arr.length-1;
	while(i<j){
	    tmp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = tmp;
	    i++;
	    j--;
	}
	return arr.join("");
}

/*
3. 生成指定长度随机字符串
PS：配合模糊等效果可以生成个验证码- -
*/
function randomString(n){
	var str = 'abcdefghijklmnopqrstuvwxyz0123456789';
	var tmp = '';
	for(var i=0;i<n;i++){
	   tmp += str.charAt(Math.round(Math.random()*str.length));
	}
	return tmp;
}

/*
4. 统计字符串中次数最多字母
PS：利用Object中key的唯一性，利用key来进行筛选，然后计数。
*/
function findMaxDuplicateChar(str) {
    if(str.length == 1) {
        return str;
    }
    var charObj = {};
    for(var i = 0; i < str.length; i++) {
        if(!charObj[str.charAt(i)]) {
            charObj[str.charAt(i)] = 1;
        } else {
            charObj[str.charAt(i)] += 1;
        }
    }
    var maxChar = '',
        maxValue = 1;
    for(var k in charObj) {
        if(charObj[k] >= maxValue) {
            maxChar = k;
            maxValue = charObj[k];
        }
    }
    return maxChar + '：' + maxValue;
}


/*
数组操作
*/
/*
1. 数组去重
PS: 还是利用Object中key的唯一性，利用key来进行筛选。
*/
function unique(arr){
	var obj = {}
	var data = []
	for(var i in arr){
	    if(!obj[arr[i]]){
	        obj[arr[i]] = true;
	        data.push(arr[i]);
		}
	}
	return data;
}

/*
2. Number数组中最大差值
*/
function getMaxProfit(arr){
    var min = arr[0], max = arr[0];
    for(var i=0;i<arr.length;i++){
        if(arr[i]<min)
            min = arr[i];
		if(arr[i]>max)
		    max = arr[i];
	}
	return max - min;
}

/**其他常见算法***/
/*
1. 阶乘 
1.1 非递归实现
*/
function factorialize(num) {
	var result = 1;
    if(num < 0) return -1;
    if(num == 0 || num == 1) return 1;
    while(num>1)
    	result *= num--;
    return result;
}

/*1.2 递归实现*/
function factorialize(num) {
	var result = 1;
    if(num < 0) return -1;
    if(num == 0 || num == 1) return 1;
    if(num > 1){
        return num*factorialize(num-1);
    }
}
/*
2. 生成菲波那切数列 
PS：斐波那契数列，又称黄金分割数列，指的是这样一个数列：0、1、1、2、3、5、8、13、21、34、……在数学上，斐波纳契数列主要考察递归的调用。通过定义fibo[i] = fibo[i-1]+fibo[i-2];来生成斐波那契数组。

2.1 强行递归实现
*/
function getfib(n){
	if(n == 0)
		return 0;
	if(n == 1)
	    return 1;
	if(n > 1){
		return getfib(n-1) + getfib(n-2);
	}
}
function fibo(len){
    var fibo = [];
    for(var i=0;i<len;i++)
		fibo.push(getfib(i));
    return fibo;
}
/*2.2 简约非递归版*/
function getFibonacci(n) {
    var fibarr = [];
    var i = 0;
    while(i < n) {
        if(i <= 1) {
            fibarr.push(i);
        } else {
            fibarr.push(fibarr[i - 1] + fibarr[i - 2])
        }
        i++;
    }
    return fibarr;
}

/***3. 二分查找 
PS：二分查找又称折半查找，是在有序数组查找中用到的较为频繁的一种算法，优点是比较次数少，查找速度快，平均性能好；其缺点是要求待查表为有序表，且插入删除困难。****/
/*3.1 非递归实现*/
function binary_search(arr, key) {
    var low = 0,
        high = arr.length - 1;
    while(low <= high){
        var mid = parseInt((high + low) / 2);
        if(key == arr[mid]){
            return  mid;
        }else if(key > arr[mid]){
            low = mid + 1;
        }else if(key < arr[mid]){
            high = mid -1;
        }
    }
    return -1;
};
/*3.2 递归实现*/
function binary_search2(arr, low, high, key) {
	if(low > high)
	    return -1;
	var mid = parseInt((low + high)/2);
	if(key == arr[mid])
	    return mid;
	else if(key > arr[mid])
	    return binary_search2(arr, mid+1, high, key);
	else if(key < arr[mid])
        return binary_search2(arr, low, mid-1, key);
}


//编写一个函数fn(Number n),将数字转为大写输出，如输入123，输出一百二十三。
function fn(n){
    if(!/^([1-9]\d*)/.test(n)){
        return '非法数据';
    }
    var unit = '千百十亿千百十万千百十个';
    if(n.length > unit.length){
        return '数据过长';
    }
    var newStr = '';
    var nlength = n.length;
    unit = unit.substr(unit.length - nlength);
    for(var i = 0; i < nlength; i++){
        newStr += '零一二三四五六七八九'.charAt(n[i]) + unit.charAt(i);
    }
    newStr = newStr.substr(0,newStr.length-1);
    newStr = newStr.replace(/零(千|百|十)/g,'零').replace(/(零)+/g,'零').replace(/零(亿|万)/g,'$1');
    return newStr;
}
 //console.log(fn('205402002103'));


// Element节点的requestFullscreen方法，可以使得这个节点全屏。
 function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.msRequestFullscreen){
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

// launchFullscreen(document.documentElement);
// launchFullscreen(document.getElementById("videoElement"));


// document对象的exitFullscreen方法用于取消全屏。该方法也带有浏览器前缀。
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

exitFullscreen();


var h = {};  
    h.get = function (url, data, ok, error) {  
        $.ajax({  
            url: url,  
            data: data,  
            dataType: 'json',  
            success: ok,  
            error: error  
        });  
    }  
    h.post = function (url, data, ok, error) {  
        $.ajax({  
            url: url,  
            data: data,  
            type: 'post',  
            dataType: 'json',  
            success: ok,  
            error: error  
        });  
    }  
    //获取url参数  
    h.url = function (url) {  
        if (!url) {  
            url = location.search.substring(1);  
        } else {  
            url = url.substr(url.indexOf('?') + 1);  
        }  
        var args = new Object();   // 声明并初始化一个 "类"  
        // 获得地址(URL)"?"后面的字符串.  
        var query = decodeURI(url);  
        var pairs = query.split("&");  // 分割URL(别忘了'&'是用来连接下一个参数)  
        for (var i = 0; i < pairs.length; i++) {  
            var pos = pairs[i].indexOf('=');  
            if (pos == -1) continue; // 它在找有等号的 数组[i]  
            var argname = pairs[i].substring(0, pos); // 参数名字  
            var value = pairs[i].substring(pos + 1);  // 参数值  
            // 以键值对的形式存放到"args"对象中  
            args[argname] = decodeURI(value);  
        }  
        return args;  
    }  
      
    // 返回字符串的实际长度, 一个汉字算2个长度   
    String.prototype.strlen = function () {  
        return this.replace(/[^\x00-\xff]/g, "**").length;  
    }  
    //字符串超出省略  
    String.prototype.cutstr = function (len) {  
        var restr = this;  
        var wlength = this.replace(/[^\x00-\xff]/g, "**").length;  
        if (wlength > len) {  
            for (var k = len / 2; k < this.length; k++) {  
                if (this.substr(0, k).replace(/[^\x00-\xff]/g, "**").length >= len) {  
                    restr = this.substr(0, k) + "...";  
                    break;  
                }  
            }  
        }  
        return restr;  
    }  
    //替换全部  
    String.prototype.replaceAll = function (s1, s2) {  
        return this.replace(new RegExp(s1, "gm"), s2)  
    }  
    //字符串去空格  
    String.prototype.trim = function () {  
        return this.replace(/(^\s*)|(\s*$)/g, "");  
    }  
    String.prototype.trimAll = function () {  
        return this.replace(/\s+/g, "");  
    }  
    String.prototype.lTrim = function () {  
        return this.replace(/(^\s*)/g, "");  
    }  
    String.prototype.rTrim = function () {  
        return this.replace(/(\s*$)/g, "");  
    }  
    //判断是否以某个字符串开头  
    String.prototype.startWith = function (s) {  
        return this.indexOf(s) == 0  
    }  
    //判断是否以某个字符串结束  
    String.prototype.endWith = function (s) {  
        var d = this.length - s.length;  
        return (d >= 0 && this.lastIndexOf(s) == d)  
    }  
      
    //删除数组中存在重复的元素  
    function getUnique(someArray) {  
        tempArray = someArray.slice(0); //复制数组到临时数组  
        for (var i = 0; i < tempArray.length; i++) {  
            for (var j = i + 1; j < tempArray.length;) {  
                if (tempArray[j] == tempArray[i])  
                    //后面的元素若和待比较的相同，则删除并计数；  
                    //删除后，后面的元素会自动提前，所以指针j不移动  
                {  
                    tempArray.splice(j, 1);  
                }  
                else {  
                    j++;  
                }  
                //不同，则指针移动  
            }  
        }  
        return tempArray;  
    }  
    //判断数组中是否存在重复的元素  
    function confirmRepeat(someArray) {  
        tempArray = someArray.slice(0); //复制数组到临时数组  
        for (var i = 0; i < tempArray.length; i++) {  
            for (var j = i + 1; j < tempArray.length;) {  
                if (tempArray[j] == tempArray[i])  
                    //后面的元素若和待比较的相同，则删除并计数；  
                    //删除后，后面的元素会自动提前，所以指针j不移动  
                {  
                    return true;  
                }  
                else {  
                    j++;  
                }  
                //不同，则指针移动  
            }  
        }  
        return false;  
    }  
      
    //判断某个值是否在数组中  
    Array.prototype.in_array = function (e) {  
        for (i = 0; i < this.length; i++) {  
            if (this[i] == e)  
                return true;  
        }  
        return false;  
    }  
    //判断某个值在数组中的位置  
    Array.prototype.indexOf = function (e) {  
        for (i = 0; i < this.length; i++) {  
            if (this[i] == e)  
                return i;  
        }  
        return -1;  
    }  
      
    //转义html标签  
    function HtmlEncode(text) {  
        return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>')  
    }  
      
    //格式化日期 DateFormat('yyyy_MM_dd hh:mm:ss:SS 星期w 第q季度')  
    function DateFormat(format, date) {  
        if (!date) {  
            date = new Date();  
        }  
        var Week = ['日', '一', '二', '三', '四', '五', '六'];  
        var o = {  
            "y+": date.getYear(), //year  
            "M+": date.getMonth() + 1, //month   
            "d+": date.getDate(), //day   
            "h+": date.getHours(), //hour   
            "H+": date.getHours(), //hour  
            "m+": date.getMinutes(), //minute   
            "s+": date.getSeconds(), //second   
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter   
            "S": date.getMilliseconds(), //millisecond   
            "w": Week[date.getDay()]  
        }  
        if (/(y+)/.test(format)) {  
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));  
        }  
        for (var k in o) {  
            if (new RegExp("(" + k + ")").test(format)) {  
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
            }  
        }  
        return format;  
    }  
      
    //设置cookie值  
    function setCookie(name, value, Hours) {  
        var d = new Date();  
        var offset = 8;  
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);  
        var nd = utc + (3600000 * offset);  
        var exp = new Date(nd);  
        exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);  
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"  
    }  
    //获取cookie值  
    function getCookie(name) {  
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));  
        if (arr != null) return unescape(arr[2]);  
        return null  
    }  
      
    //加入收藏夹  
    function AddFavorite(sURL, sTitle) {  
        try {  
            window.external.addFavorite(sURL, sTitle)  
        } catch (e) {  
            try {  
                window.sidebar.addPanel(sTitle, sURL, "")  
            } catch (e) {  
                alert("加入收藏失败，请使用Ctrl+D进行添加")  
            }  
        }  
    }  
    //设为首页  
    function setHomepage(homeurl) {  
        if (document.all) {  
            document.body.style.behavior = 'url(#default#homepage)';  
            document.body.setHomePage(homeurl)  
        } else if (window.sidebar) {  
            if (window.netscape) {  
                try {  
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")  
                } catch (e) {  
                    alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入about:config,然后将项 signed.applets.codebase_principal_support 值该为true");  
                }  
            }  
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);  
            prefs.setCharPref('browser.startup.homepage', homeurl)  
        }  
    }  
      
    //跨浏览器绑定事件  
    function addEventSamp(obj, evt, fn) {  
        if (!oTarget) { return; }  
        if (obj.addEventListener) {  
            obj.addEventListener(evt, fn, false);  
        } else if (obj.attachEvent) {  
            obj.attachEvent('on' + evt, fn);  
        } else {  
            oTarget["on" + sEvtType] = fn;  
        }  
    }  
    //跨浏览器删除事件  
    function delEvt(obj, evt, fn) {  
        if (!obj) { return; }  
        if (obj.addEventListener) {  
            obj.addEventListener(evt, fn, false);  
        } else if (oTarget.attachEvent) {  
            obj.attachEvent("on" + evt, fn);  
        } else {  
            obj["on" + evt] = fn;  
        }  
    }  
      
    //判断是否移动设备访问  
    function isMobileUserAgent() {  
        return (/iphone|ipad|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));  
    }  
      
    //完美判断是否为网址  
    function IsURL(strUrl) {  
        var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i  
        if (regular.test(strUrl)) {  
            return true;  
        } else {  
            return false;  
        }  
    }  
      
    //获取页面高度  
    function getPageHeight() {  
        var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat" ? a : g.documentElement;  
        return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);  
    }  
    //获取页面宽度  
    function getPageWidth() {  
        var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat" ? a : g.documentElement;  
        return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);  
    }  
      
    //获取页面可视宽度  
    function getPageViewWidth() {  
        var d = document, a = d.compatMode == "BackCompat" ? d.body : d.documentElement;  
        return a.clientWidth;  
    }  
    //获取页面可视高度  
    function getPageViewHeight() {  
        var d = document, a = d.compatMode == "BackCompat" ? d.body : d.documentElement;  
        return a.clientHeight;  
    }  
      
    //获取页面scrollLeft  
    function getPageScrollLeft() {  
        var a = document;  
        return a.documentElement.scrollLeft || a.body.scrollLeft;  
    }  
    //获取页面scrollTop  
    function getPageScrollTop() {  
        var a = document;  
        return a.documentElement.scrollTop || a.body.scrollTop;  
    }  
    //获取窗体可见范围的宽与高  
    function getViewSize() {  
        var de = document.documentElement;  
        var db = document.body;  
        var viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;  
        var viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;  
        return Array(viewW, viewH);  
    }  
    //随机数时间戳  
    function uniqueId() {  
        var a = Math.random, b = parseInt;  
        return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());  
    }  
      
    //获取网页被卷去的位置  
    function getScrollXY() {  
        return document.body.scrollTop ? {  
            x: document.body.scrollLeft,  
            y: document.body.scrollTop  
        } : {  
            x: document.documentElement.scrollLeft,  
            y: document.documentElement.scrollTop  
        }  
    }  
      
    //匹配国内电话号码(0511-4405222 或 021-87888822)   
    function istell(str) {  
        var result = str.match(/\d{3}-\d{8}|\d{4}-\d{7}/);  
        if (result == null) return false;  
        return true;  
    }  
    //匹配身份证(15位或18位)   
    function isidcard(str) {  
        var result = str.match(/\d{15}|\d{18}/);  
        if (result == null) return false;  
        return true;  
    }  
    //移动电话  
    function checkMobile(str) {  
        if (!(/^1[3|5|8][0-9]\d{4,8}$/.test(str))) {  
            return false;  
        }  
        return true;  
    }  
    // 判断输入是否是一个由 0-9 / A-Z / a-z 组成的字符串   
    function isalphanumber(str) {  
        var result = str.match(/^[a-zA-Z0-9]+$/);  
        if (result == null) return false;  
        return true;  
    }  
    // 判断输入是否是有效的电子邮件   
    function isemail(str) {  
        var result = str.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);  
        if (result == null) return false;  
        return true;  
    }  
      
    //金额大写转换函数 transform('123431233132.23')  
    function transform(tranvalue) {  
        try {  
            var i = 1;  
            var dw2 = new Array("", "万", "亿"); //大单位  
            var dw1 = new Array("拾", "佰", "仟"); //小单位  
            var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用  
            //以下是小写转换成大写显示在合计大写的文本框中       
            //分离整数与小数  
            var source = splits(tranvalue);  
            var num = source[0];  
            var dig = source[1];  
            //转换整数部分  
            var k1 = 0; //计小单位  
            var k2 = 0; //计大单位  
            var sum = 0;  
            var str = "";  
            var len = source[0].length; //整数的长度  
            for (i = 1; i <= len; i++) {  
                var n = source[0].charAt(len - i); //取得某个位数上的数字  
                var bn = 0;  
                if (len - i - 1 >= 0) {  
                    bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字  
                }  
                sum = sum + Number(n);  
                if (sum != 0) {  
                    str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面  
                    if (n == '0') sum = 0;  
                }  
                if (len - i - 1 >= 0) { //在数字范围内  
                    if (k1 != 3) { //加小单位  
                        if (bn != 0) {  
                            str = dw1[k1].concat(str);  
                        }  
                        k1++;  
                    } else { //不加小单位，加大单位  
                        k1 = 0;  
                        var temp = str.charAt(0);  
                        if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位  
                            str = str.substr(1, str.length - 1);  
                        str = dw2[k2].concat(str);  
                        sum = 0;  
                    }  
                }  
                if (k1 == 3) { //小单位到千则大单位进一  
                    k2++;  
                }  
            }  
            //转换小数部分  
            var strdig = "";  
            if (dig != "") {  
                var n = dig.charAt(0);  
                if (n != 0) {  
                    strdig += dw[Number(n)] + "角"; //加数字  
                }  
                var n = dig.charAt(1);  
                if (n != 0) {  
                    strdig += dw[Number(n)] + "分"; //加数字  
                }  
            }  
            str += "元" + strdig;  
        } catch (e) {  
            return "0元";  
        }  
        return str;  
    }  
    //拆分整数与小数  
    function splits(tranvalue) {  
        var value = new Array('', '');  
        temp = tranvalue.split(".");  
        for (var i = 0; i < temp.length; i++) {  
            value = temp;  
        }  
        return value;  
    }  
      
    //格式化数字  
    function number_format(number, decimals, dec_point, thousands_sep) {  
        /* 
        * 参数说明： 
        * number：要格式化的数字 
        * decimals：保留几位小数 
        * dec_point：小数点符号 
        * thousands_sep：千分位符号 
        * */  
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');  
        var n = !isFinite(+number) ? 0 : +number,  
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),  
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,  
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,  
            s = '',  
            toFixedFix = function (n, prec) {  
                var k = Math.pow(10, prec);  
                return '' + Math.ceil(n * k) / k;  
            };  
      
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');  
        var re = /(-?\d+)(\d{3})/;  
        while (re.test(s[0])) {  
            s[0] = s[0].replace(re, "$1" + sep + "$2");  
        }  
      
        if ((s[1] || '').length < prec) {  
            s[1] = s[1] || '';  
            s[1] += new Array(prec - s[1].length + 1).join('0');  
        }  
        return s.join(dec);  
    }  


    /* 探测浏览器种类 */
function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }
    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
/* 监听变换事件! */
var transitionEvent = whichTransitionEvent();
transitionEvent && e.addEventListener(transitionEvent, function() {
	console.log('Transition complete!  This is the callback, no library needed!');
});
// 一旦动画或变换结束，回调函数就会触发。不再需要大型类库支持。



/*
* _____H5弹窗组件____
* ----opts{对象}参数----
* @param id {string}
* @param txt {string}
* @param title {string}
* @param intro {string}
* @param btnTxt {string}
* @param btnTxt2 {string}
* @param btnCls {string}
* @param btnCls2 {string}
*/
function maskTips(opts){
    var $mask = document.createElement("div");
    $mask.id = opts.id ? "mask_h5_" + opts.id : "mask_h5_" + String(Math.random()).replace(".","_");
    $mask.className = "component-mask";
    var count = 0;
    for( var attr in opts ){
        if( opts.hasOwnProperty(attr) ){
            count++;
        }
    }
    if( count <= 2 && opts.txt ){
        var ID = "mask_h5_"+opts.id;
        if( document.getElementById(ID) ){
            if( document.getElementById(ID).style.display == "none" ){
                document.getElementById(ID).style.display = "block";
                setNone(ID);
            }
        }else{        
            $mask.style.cssText = "width:80%;height:auto;z-index:9999;position:fixed;left:50%;top:50%;background-color:rgba(0,0,0,.6);color:#fff;font-size:15px;padding:15px;border-radius:20px;line-height:22px;text-align:center;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);";
            $mask.innerHTML = opts.txt;
            opts.parentElem ? opts.parentElem.appendChild($mask) : document.getElementsByTagName("body")[0].appendChild($mask);
            setNone(ID);
        }
    }else{
	    if(document.getElementById("mask_h5_"+opts.id)){
	    	document.getElementById("mask_h5_"+opts.id).style.display = "block";
	    	return;
	    }    	
        var $maskC = document.createElement("div");
        var $p1 = document.createElement("p");
        $maskC.className = "component-mask-c";
        $p1.className = "component-info-mask";
        $mask.style.cssText = "width:100%;height:100%;z-index:9999;position: fixed;left:0;top:0;right:0;bottom:0;background-color:rgba(0,0,0,.6);text-align:center;";
        $maskC.style.cssText = "width:80%;height:auto;position:fixed;left:50%;top:50%;background-color:#fff;color:#333;font-size:12px;border-radius:15px;padding:15px;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);";
        $p1.style.cssText = "width:100%;height:auto;line-height:22px;font-size:14px;padding:15px 0;";
        if(opts.title){
            var $h2 = document.createElement("h2");
            $h2.className = "component-title-mask";
            $h2.style.cssText = "height:35px;line-height:22px;text-align:center;font-size:16px;color:#333;width:100%;overflow:hidden;";
            $h2.innerHTML = opts.title;
            $maskC.appendChild($h2);
        }
        $maskC.appendChild($p1);   
        if(opts.txt){
            $p1.innerHTML = opts.txt;
        }
        if(opts.intro){
            var $p2 = document.createElement("p");
            $p2.innerHTML = opts.intro;
            $p2.className = "component-intr-mask";
            $p2.style.cssText = "width:100%;height:auto;line-height:22px;padding:10px 0;";
            $maskC.appendChild($p2);
        } 
        if(opts.btnTxt){
            var $btncnt = document.createElement("div");
            $btncnt.className = "component-btn";
            $btncnt.style.cssText = "width:100%;height:auto;padding:25px 0 10px 0;overflow: hidden;text-align:center;font-size:15px;";
            var $btnLeft = document.createElement("a");
            $btnLeft.setAttribute("href","javascript:;");
            $btnLeft.className = "comp-mask-btnAleft";
            if(opts.btnCls){
            	$btnLeft.className = "comp-mask-btnAleft " + opts.btnCls;
            }
            $btnLeft.innerHTML = opts.btnTxt;
            $btnLeft.style.cssText = "display:inline;padding:10px 20px;border-radius:15px;border:1px solid #999;margin:0 10px;color:#333;";
            $btncnt.appendChild($btnLeft); 
            $maskC.appendChild($btncnt); 
        }
        if(opts.btnTxt2){
            var $btnRight = document.createElement("a");
            $btnRight.innerHTML = opts.btnTxt2;
            $btnRight.setAttribute("href","javascript:;");
            $btnRight.className = "comp-mask-btnAright";
            if(opts.btnCls2){
            	$btnRight.className = "comp-mask-btnAright "+ opts.btnCls2;
            }
            $btnRight.style.cssText = "display:inline;padding:10px 20px;border-radius:15px;border:1px solid #999;margin:0 10px;color:#333;";
            $btncnt.appendChild($btnRight);
        }
        $mask.appendChild($maskC);
        opts.parentElem ? opts.parentElem.appendChild($mask) : document.getElementsByTagName("body")[0].appendChild($mask);
    }
    function setNone(id){
        setTimeout(function(){
             document.getElementById(id).style.display = "none";
        },2000);
    }    
} 



// 校验数字的表达式
1 数字：^[0-9]*$
2 n位的数字：^\d{n}$
3 至少n位的数字：^\d{n,}$
4 m-n位的数字：^\d{m,n}$
5 零和非零开头的数字：^(0|[1-9][0-9]*)$
6 非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$
7 带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})?$
8 正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$
9 有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
10 有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
11 非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$
12 非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$
13 非负整数：^\d+$ 或 ^[1-9]\d*|0$
14 非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
15 非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
16 非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
17 正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
18 负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
19 浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$
校验字符的表达式
1 汉字：^[\u4e00-\u9fa5]{0,}$
2 英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$
3 长度为3-20的所有字符：^.{3,20}$
4 由26个英文字母组成的字符串：^[A-Za-z]+$
5 由26个大写英文字母组成的字符串：^[A-Z]+$
6 由26个小写英文字母组成的字符串：^[a-z]+$
7 由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
8 由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$
9 中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$
10 中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
11 可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+
12 禁止输入含有~的字符：[^~\x22]+
特殊需求表达式
1 Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
2 域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?
3 InternetURL：<[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$<
4 手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
5 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$ 
6 国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7}
7 身份证号(15位、18位数字)：^\d{15}|\d{18}$
8 短身份证号码(数字、字母x结尾)：^([0-9]){7,18}(x|X)?$ 或 ^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$
9 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
10 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
11 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$  
12 日期格式：^\d{4}-\d{1,2}-\d{1,2}
13 一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$
14 一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$ 
15 钱的输入格式：
16    1.有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：^[1-9][0-9]*$ 
17    2.这表示任意一个不以0开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：^(0|[1-9][0-9]*)$ 
18    3.一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：^(0|-?[1-9][0-9]*)$ 
19    4.这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧.下面我们要加的是说明可能的小数部分：^[0-9]+(.[0-9]+)?$ 
20    5.必须说明的是,小数点后面至少应该有1位数,所以"10."是不通过的,但是 "10" 和 "10.2" 是通过的：^[0-9]+(.[0-9]{2})?$ 
21    6.这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：^[0-9]+(.[0-9]{1,2})?$ 
22    7.这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$ 
23    8.1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$ 
24    备注：这就是最终结果了,别忘了"+"可以用"*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
25 xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$
26 中文字符的正则表达式：[\u4e00-\u9fa5]27 双字节字符：[^\x00-\xff]    (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
28 空白行的正则表达式：\n\s*\r    (可以用来删除空白行)
29 HTML标记的正则表达式：<(\S*?)[^>]*>.*?<!--\1-->|<.*? />    (网上流传的版本太糟糕，上面这个也仅仅能部分，对于复杂的嵌套标记依旧无能为力)
30 首尾空白字符的正则表达式：^\s*|\s*$或(^\s*)|(\s*$)    (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
31 腾讯QQ号：[1-9][0-9]{4,}    (腾讯QQ号从10000开始)
32 中国邮政编码：[1-9]\d{5}(?!\d)    (中国邮政编码为6位数字)
33 IP地址：\d+\.\d+\.\d+\.\d+    (提取IP地址时有用)
34 IP地址：((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))