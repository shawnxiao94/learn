/*
	@ create by shawn xiao 
	@ date : 2017/04/05
	@ base function
*/

var GLOBAL = {};
GLOBAL.namespace = function(str) {
	var arr = str.split("."),
		o = GLOBAL;
	for (i = (arr[0] == "GLOBAL") ? 1 : 0; i < arr.length; i++) {
		o[arr[i]] = o[arr[i]] || {};
		o = o[arr[i]];
	}
}

// dom 相关
GLOBAL.namespace("Dom");
GLOBAL.Dom.getNextNode = function(node) {
	node = typeof node == "string" ? document.getElementById(node) : node;
	var nextNode = node.nextSibling;
	if (!nextNode) return null;
	if (!document.all) {
		while (true) {
			if (nextNode.nodeType == 1) {
				break;
			} else {
				if (nextNode.nextSibling) {
					nextNode = nextNode.nextSibling;
				} else {
					break;
				}
			}
		}
	}
	return nextNode;
}
GLOBAL.Dom.get = function(node) {
	node = typeof node == "string" ? document.getElementById(node) : node;
	return node;
}
GLOBAL.Dom.find = function(root, str, tag) {
	if (root) {
		root = typeof root == "string" ? document.getElementById(root) : root;
	} else {
		root = document.body;
	}
	tag = tag || "*";
	var els = root.getElementsByTagName(tag),
		arr = [];
	for (var i = 0, n = els.length; i < n; i++) {
		if( str.indexOf(".") != -1 ){
			//class
			for (var j = 0, k = els[i].className.split(" "), l = k.length; j < l; j++) {
				if (k[j] == str.split(".")[1]) {
					arr.push(els[i]);
					break;
				}
			}
		}else{
			//属性
			var attr = str.split("=")[0],val = str.split("=")[1];
			if( els[i].getAttribute(str.split("=")[0]) && els[i].getAttribute(str.split("=")[0]) === str.split("=")[1] ){
				arr.push(els[i]);
			}			
		}
	}
	return arr;
}
GLOBAL.Dom.setOpacity = function(ele, opacity) {
    if (ele.style.opacity != undefined) {
        ///兼容FF和GG和新版本IE
        ele.style.opacity = opacity / 100;
    } else {
        ///兼容老版本ie
        ele.style.filter = "alpha(opacity=" + opacity + ")";
    }
}
GLOBAL.Dom.fadeIn = function(ele, opacity, speed){
    if (ele) {
    	speed = speed || 20;
    	opacity = opacity || 100;    	
    	ele.style.display = 'block'; 
    	GLOBAL.Dom.setOpacity(ele, 0);
    	var val = 0; 
    	//循环将透明值以5递增,即淡入效果 
        (function(){  
            GLOBAL.Dom.setOpacity(ele, val);  
            val += 5;  
            if (val <= opacity) {  
                setTimeout(arguments.callee, speed)  
            }  
        })();     	
    }	    
}
GLOBAL.Dom.fadeOut = function(ele, opacity, speed){
    if (ele) {
        speed = speed || 20;  
        opacity = opacity || 0;  
        //初始化透明度变化值为0  
        var val = 100;  
        //循环将透明值以5递减,即淡出效果  
        (function(){  
            setOpacity(ele, val);  
            val -= 5;  
            if (val >= opacity) {  
                setTimeout(arguments.callee, speed);  
            }else if (val < 0) {  
                //元素透明度为0后隐藏元素  
                ele.style.display = 'none';  
            }  
        })();
    }
}
GLOBAL.Dom.addClass = function(node, str) {
	if (!new RegExp("(^|\\s+)" + str).test(node.className)) {
		node.className = node.className + " " + str;
	}
}
GLOBAL.Dom.hasClass = function(node, str) {
	str = str || '';
	if (str.replace(/\s/g, '').length == 0) return false;
	return new RegExp(' ' + str + ' ').test(' ' + node.className + ' ');
}
GLOBAL.Dom.removeClass = function(node, str) {
	node.className = node.className.replace(new RegExp("(^|\\s+)" + str), "");
}
GLOBAL.Dom.siblings = function(node) {
	var chid=node.parentNode.children; 
	var eleMatch = []; 
	for(var i=0,l=chid.length;i<l;i++){ 
		if(chid[i]!=node){ 
			eleMatch.push(chid[i]); 
		} 
	} 
	return eleMatch;
}
GLOBAL.Dom.getChildNodes = function(ele) {  
	var childArr = ele.children || ele.childNodes,
		childArrTem = new Array();  //  临时数组，用来存储符合条件的节点
	  
	for (var i = 0, len = childArr.length; i < len; i++) {    
		if (childArr[i].nodeType == 1) {       
			childArrTem.push(childArr[i]);    
		}  
	}  
	return  childArrTem;
}

//Event 相关
GLOBAL.namespace("Event");
GLOBAL.Event.getElement = function(e) {
	//获取事件dom
	e = window.event || e;
	return e.srcElement || e.target;
}
GLOBAL.Event.stopPropagation = function(e) {
	//阻止事件冒泡
	e = window.event || e;
	if (document.all) {
		e.cancelBubble = true;
	} else {
		e.stopPropagation();
	}
}
GLOBAL.Event.preventDefault = function(e) {
	//阻止默认行为
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false; //ie
	}
}
GLOBAL.Event.getEvent = function(event) {
	//获取事件对象
	return event ? event : window.event; //ie8以下是window.event
}
GLOBAL.Event.getType = function(e) {
	//获取事件类型
	return e.type;
}
GLOBAL.Event.on = function(node, eventType, handler) {
	//添加句柄
	node = typeof node == "string" ? document.getElementById(node) : node;
	if (document.all) {
		node.attachEvent("on" + eventType, handler);
	} else {
		node.addEventListener(eventType, handler, false);
	}
}
GLOBAL.Event.off = function(node, eventType, handler) {
	//删除句柄
	if (node.removeEventListener) {
		node.removeEventListener(eventType, handler, false);
	} else if (node.detachEvent) {
		node.detachEvent('on' + eventType, handler);
	} else {
		node['on' + eventType] = null;
	}
}

// 封装cookie组件
GLOBAL.namespace("Cookie");
GLOBAL.Cookie = {
	//读取
	read: function(name) {
		var cookieStr = ";" + document.cookie + ";";
		var index = cookieStr.indexOf(";" + name + "=");
		if (index != -1) {
			var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
			return unescape(s.substring(0, s.indexOf(";")));
		} else {
			return null;
		}
	},
	//设置
	set: function(name, value, expires) {
		var expDays = expires * 24 * 60 * 60 * 1000;
		var expDate = new Date();
		expDate.setTime(expDate.getTime() + expDays);
		var expString = expires ? ";expires=" + expDate.toGMTString() : "";
		var pathString = ";path=/";
		document.cookie = name + "=" + escape(value) + expString + pathString;
	},
	//删除
	del: function(name) {
		var exp = new Date(new Date().getTime() - 1);
		var s = this.read(name);
		if (s != null) {
			document.cookie = name + "=" + s + ";expires=" + exp.toGMTString() + ";path=/"
		}
	}
}

// Lang 相关
GLOBAL.namespace("Lang");
GLOBAL.Lang.trim = function(ostr) {
	return ostr.replace(/^\s+|\s+$/g, " ");
}
GLOBAL.Lang.isNumber = function(s) {
	return !isNaN(s);
}
GLOBAL.Lang.extend = function(subClass, superClass) {
	var F = function() {};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
	subClass.superClass = superClass.prototype;
	if (superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
	}
}
GLOBAL.Lang.getQueryString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
}
GLOBAL.Lang.getStyle = function(obj, attr) {
	// 获取元素样式...
	if (obj.currentStyle) {
		//IE下
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}

}
GLOBAL.Lang.ajax = function() {
	var ajaxData = {
		type: arguments[0].type || "GET",
		url: arguments[0].url || "",
		async: arguments[0].async || "true",
		data: arguments[0].data || null,
		dataType: arguments[0].dataType || "json",
		contentType: arguments[0].contentType || "application/x-www-form-urlencoded;charset=utf-8",
		beforeSend: arguments[0].beforeSend || function() {},
		success: arguments[0].success || function() {},
		error: arguments[0].error || function() {},
		complete: arguments[0].complete || function() {},
		time: arguments[0].time || 6000,
	}
	if (ajaxData.dataType == 'jsonp') {
		if (!ajaxData.url || !arguments[0].callbackName) {
			throw new Error("参数不合法");
		}

		//创建 script 标签并加入到页面中
		var callbackName = arguments[0].callbackName || ('jsonp_' + Math.random()).replace(".", "");
		var oHead = document.getElementsByTagName('head')[0];
		ajaxData.data[arguments[0].callbackName] = callbackName;
		var params = convertData(ajaxData.data);
		var oS = document.createElement('script');
		oHead.appendChild(oS);

		ajaxData.beforeSend && ajaxData.beforeSend();

		//创建jsonp回调函数
		window[callbackName] = function(result) {
			oHead.removeChild(oS);
			clearTimeout(oS.timer);
			window[callbackName] = null;
			ajaxData.success && ajaxData.success(result);
			ajaxData.complete && ajaxData.complete();
		};

		//发送请求
		oS.src = ajaxData.url + '?' + params;

		//超时处理,如果不设置超时，就无法得知此次请求是成功还是失败
		if (ajaxData.time) {
			oS.timer = setTimeout(function() {
				window[callbackName] = null;
				oHead.removeChild(oS);
				ajaxData.error && ajaxData.error({
					message: "超时"
				});
				ajaxData.complete && ajaxData.complete();
			}, ajaxData.time);
		}

	} else {
		ajaxData.beforeSend();
		var xhr = createxmlHttpRequest();
		xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
		xhr.setRequestHeader("Content-Type", ajaxData.contentType);
		xhr.send(convertData(ajaxData.data));
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					ajaxData.success(xhr.responseText, xhr.responseXML)
				} else {
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
	//格式化参数
	function convertData(data) {
		if (typeof data === 'object') {
			var convertResult = "";
			for (var c in data) {
				convertResult += c + "=" + data[c] + "&";
			}
			convertResult = convertResult.substring(0, convertResult.length - 1)
			return convertResult;
		} else {
			return data;
		}
	}
}
GLOBAL.Lang.animate = function(obj, json,interval, speed, callBack) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true; //全部动画是否完成标记符
		for (var attr in json) {
			if( json.hasOwnProperty(attr) ){
				//1.取当前的值
				var icur = 0;
				if (attr == "opacity") {
					icur = Math.round(parseFloat(GLOBAL.Lang.getStyle(obj, attr)) * 100); //注意要用Math.round()四舍五入进行处理，以防部分浏览器计算不精确问题导致的计算失误
				} else {
					icur = parseInt(GLOBAL.Lang.getStyle(obj, attr));
				}
				//2.算速度
				var _speed = (json[attr] - icur) * speed;
				_speed = _speed > 0 ? Math.ceil(_speed) : Math.floor(_speed); //凡是遇到运动数字的时候都要这样处理，不然会各种问题
				//3.检测停止
				if (icur != json[attr]) {
					flag = false;
				}
				if (attr == "opacity") {
					obj.style.filter = 'alpha(opacity:' + (icur + _speed) + ')'; //针对IE浏览器
					obj.style.opacity = (icur + _speed) / 100;
				} else {
					obj.style[attr] = icur + _speed + 'px';
				}
			}
		}
		if (flag) {
			clearInterval(obj.timer);
			callBack && callBack();
		}
	}, interval);
}
GLOBAL.Lang.getArrayItems = function(arr, num) {
	//****经过验证测试可以用的方法*****
	//从一个给定的数组arr中,随机返回num个不重复项	
	var obj = {};
	var temp = [],
		data = [];
	for (i in arr) {
		if (!obj[arr[i]]) {
			obj[arr[i]] = true;
			temp.push(arr[i]);
		}
	}
	if (num > temp.length) {
		console.log("超过不重复数组个数");
		return;
	}
	for (var k = 0; k < num; k++) {
		if (temp.length > 0) {
			var arrIndex = Math.floor(Math.random() * temp.length);
			data[k] = temp[arrIndex];
			temp.splice(arrIndex, 1);
		}
	}
	return data;
}
GLOBAL.Lang.proMove = function() {
	/***解决ios下双击页面上滑问题***/
	var agent = navigator.userAgent.toLowerCase(); //检测是否是ios
	var iLastTouch = null; //缓存上一次tap的时间
	if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
		document.body.addEventListener('touchend', function(event) {
			var iNow = new Date().getTime();
			iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
			var delta = iNow - iLastTouch;
			if (delta < 500 && delta > 0) {
				event.preventDefault();
				return false;
			}
			iLastTouch = iNow;
		}, false);
	}
}
GLOBAL.Lang.detectOS = function() {
	//获取客户端操作系统类型
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
		if (bIsAndroid) {
			return "Android";
		} else {
			return "Linux";
		}
	}
	if (bIsIphoneOs || bIsIpad) {
		return "Ios";
	}
	if (bIsCE || bIsWM) {
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
GLOBAL.Lang.browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: (/iphone|ipad|android.*mobile|windows.*phone|blackberry.*mobile/i.test(u.toLowerCase())), //是否为移动终端, //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否为微信浏览器（2015-01-22新增）
			weibo: u.toLowerCase().indexOf('weibo') > -1, //是否为微博打开
			qqBrw: u.toLowerCase().indexOf('mqqbrowser') > -1, //qq浏览器
			qq: u.toLowerCase().indexOf('qq') > -1, //qq浏览器 空空间 QQAPP
			ucLowEnd: u.indexOf('UCWEB7.') > -1,
			ucSpecial: u.indexOf('rv:1.2.3.4') > -1,
			google: u.indexOf('Chrome') > -1,
			ucweb: function() {
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
			Symbian: u.indexOf('Symbian') > -1,
			ucSB: u.indexOf('Firefox/1.') > -1
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
GLOBAL.Lang.isPc = function(){
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	return (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) )
}
GLOBAL.Lang.getDateStr = function() {
	/*年月日字符串*/
	var now = new Date(),
		year = now.getFullYear().toString().slice(2),
		month = (now.getMonth() + 1).toString(),
		day = now.getDate().toString();
	month = (month.length === 1) ? (month = '0' + month) : month;
	day = (day.length === 1) ? (day = '0' + day) : day;
	return year + month + day; // 年月日字符串
}
GLOBAL.Lang.objectSize = function(o) {
	// 取String 或者 object的长度	
	var t = typeof o;
	if (t == 'string') {
		return o.length;
	} else if (t == 'object') {
		var n = 0;
		for (var i in o) {
			n++;
		}
		return n;
	}
	return false;
}


Object.prototype.hide = function(){ 
 this.style.display="none"; 
 return this; 
} 
//show() 
Object.prototype.show = function(){ 
 this.style.display="block"; 
 return this; 
}
Object.prototype.css = function(){ 
 if(arguments.length==1){ 
  return eval("this.style."+arguments[0]); 
 }else if(arguments.length==2){ 
  eval("this.style."+arguments[0]+"='"+arguments[1]+"'"); 
  return this; 
 } 
}
//append() 
Object.prototype.append = function(newElem){ 
 this.innerHTML += newElem; 
 return this; 
} 
//prepend() 
Object.prototype.prepend = function(newElem){ 
 this.innerHTML = arguments[0] + this.innerHTML; 
 return this; 
} 
//after() 
Object.prototype.after = function(newElem){ 
 this.outerHTML += arguments[0]; 
 return this; 
} 
//before() 
Object.prototype.before = function(newElem){ 
 this.outerHTML = arguments[0] + this.outerHTML; 
 return this; 
}
//empty() 
Object.prototype.empty = function(){ 
 this.innerHTML = ""; 
 return this; 
} 
//replaceWith() 
Object.prototype.replaceWith = function(newElem){ 
 this.outerHTML = arguments[0]; 
 return this; 
} 
//hasClass() 
Object.prototype.hasClass = function(cName){ 
 return !!this.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
} 
//addClass() 
Object.prototype.addClass = function(cName){ 
 if( !this.hasClass( cName ) ){ 
  this.className += " " + cName; 
 } 
 return this; 
} 
//removeClass() 
Object.prototype.removeClass = function(cName){ 
 if( this.hasClass( cName ) ){ 
  this.className = this.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); 
 } 
 return this; 
}
//id或class选择器$("elem") 
function $(strExpr){ 
 var idExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/; 
 var classExpr = /^(?:\s*(<[\w\W]+>)[^>]*|.([\w-]*))$/; 
 if(idExpr.test(strExpr)){ 
  var idMatch = idExpr.exec(strExpr); 
  return document.getElementById(idMatch[2]); 
 }else if(classExpr.test(strExpr)){ 
  var classMatch = classExpr.exec(strExpr); 
  var allElement = document.getElementsByTagName("*"); 
  var ClassMatch = []; 
  for(var i=0,l=allElement.length; i<l; i++){ 
   if(allElement[i].className.match( new RegExp( "(\\s|^)" + classMatch[2] + "(\\s|$)") )){ 
    ClassMatch.push(allElement[i]); 
   } 
  } 
  return ClassMatch; 
 } 
}

//siblings() 
Object.prototype.siblings = function(){ 
 var chid=this.parentNode.children; 
 var eleMatch = []; 
 for(var i=0,l=chid.length;i<l;i++){ 
  if(chid[i]!=this){ 
   eleMatch.push(chid[i]); 
  } 
 } 
 return eleMatch; 
} 
//children() 原生js已含有该方法，故命名为userChildren。 
Object.prototype.userChildren = function(){ 
 var chid=this.childNodes; 
 var eleMatch = []; 
 for(var i=0,l=chid.length;i<l;i++){ 
  eleMatch.push(chid[i]); 
 } 
 return eleMatch; 
} 
//parent() 
Object.prototype.parent = function(){ 
 return this.parentNode; 
} 
//next() 
Object.prototype.next = function(){ 
 return this.nextElementSibling; 
} 
//prev() 
Object.prototype.prev = function(){ 
 return this.previousElementSibling; 
}
//attr() 
Object.prototype.attr = function(){ 
 if(arguments.length==1){ 
  return eval("this."+arguments[0]); 
 }else if(arguments.length==2){ 
  eval("this."+arguments[0]+"="+arguments[1]); 
  return this; 
 } 
} 
//val() 
Object.prototype.val = function(){ 
 if(arguments.length==0){ 
  return this.value; 
 }else if(arguments.length==1){ 
  this.value = arguments[0]; 
  return this; 
 } 
} 
//html() 
Object.prototype.html = function(){ 
 if(arguments.length==0){ 
  return this.innerHTML; 
 }else if(arguments.length==1){ 
  this.innerHTML = arguments[0]; 
  return this; 
 } 
} 
//text()需要在html()结果基础上排除标签，会很长，省略

	//获取到的元素集合为类数组转化成数组
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

// 滑动 省略speed和callback的传入，因为要加一串判断和处理回调，代码量大
//slideDown() 
Object.prototype.slideDown = function(){ 
 this.style.display = 'block'; 
 if(this.clientHeight<this.scrollHeight){ 
  this.style.height=10+this.clientHeight+"px"; 
  var _this = this; 
  setTimeout(function(){_this.slideDown()},10) 
 }else{ 
  this.style.height=this.scrollHeight+"px"; 
 } 
} 
//slideUp() 
Object.prototype.slideUp = function(){ 
 if(this.clientHeight>0){ 
  this.style.height=this.clientHeight-10+"px"; 
  var _this = this; 
  setTimeout(function(){_this.slideUp()},10) 
 }else{ 
  this.style.height=0; 
  this.style.display = 'none'; 
 } 
}