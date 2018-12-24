/*  原生js 方法集合 
*   @date:2017/07/25
*   @autor:xiaoqiulin
*/
(function(){
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

	window.HTMLElement = window.HTMLElement || Element;

	(function preventMove() {
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
	})();

    //判断是否具有指定样式类
    HTMLElement.prototype.x_hasClass = function (name) {
        var c = this.className.split(' ');
        for (var i = c.length - 1; i >= 0; i--) {
            if (c[i].toLowerCase() == name.toLowerCase()) {
                return true;
            }
        }
        return false;
    };
    //添加样式类
    HTMLElement.prototype.x_addClass = function (name) {
        var list1 = name.split(' ');
        var list2 = this.className.split(' ');
        list1.forEach(function (item, i) {
            var index = list2.indexOf(item);
            if (index === -1) {
                list2.push(item);
            }
        });
        this.className = list2.join(' ');
        return this;
    };
    //删除样式类
    HTMLElement.prototype.x_removeClass = function (name) {
        var list1 = name.split(' ');
        var list2 = this.className.split(' ');
        list1.forEach(function (item) {
            var index = list2.indexOf(item);
            if (index > -1) {
                list2.splice(index, 1);
            }
        });
        this.className = list2.join(' ');
        return this;
    };
    //删除自己
    HTMLElement.prototype.x_remove = function () {
        this.parentNode.removeChild(this);
        return this;
    };
    //获取指定样式值，数值只会返回数字
    HTMLElement.prototype.x_getComputedStyle = function (name, pseudoElt) {
        var res;
        var style = getComputedStyle(this, pseudoElt);
        if (res = /^([0-9.%]+)[^0-9.%]+$/.exec(style[name])) {
            return Number(res[1]);
        }
        return style[name];
    };

	HTMLElement.prototype.x_hide = function(){ 
	 this.style.display="none"; 
	 return this; 
	} 
	//show() 
	HTMLElement.prototype.x_show = function(){ 
	 this.style.display="block"; 
	 return this; 
	}
	//append() 
	HTMLElement.prototype.x_append = function(newElem){ 
	 this.innerHTML += newElem; 
	 return this; 
	} 
	//prepend() 
	HTMLElement.prototype.x_prepend = function(newElem){ 
	 this.innerHTML = arguments[0] + this.innerHTML; 
	 return this; 
	} 
	//after() 
	HTMLElement.prototype.x_after = function(newElem){ 
	 this.outerHTML += arguments[0]; 
	 return this; 
	} 
	//before() 
	HTMLElement.prototype.x_before = function(newElem){ 
	 this.outerHTML = arguments[0] + this.outerHTML; 
	 return this; 
	}
	//empty() 
	HTMLElement.prototype.x_empty = function(){ 
	 this.innerHTML = ""; 
	 return this; 
	} 

	HTMLElement.prototype.x_getClass = function(name){
		var arr = [];
		var elems = this.getElementsByTagName('*');
		for(var i=0;i < elems.length;i++){
			if(elems[i].className.indexOf(name.substring(1)) != -1){
				arr.push(elems[i]);
			}
		}
		return arr;
	}

	//siblings() 
	HTMLElement.prototype.x_siblings = function(){ 
		var chid=this.parentNode.children; 
		var eleMatch = []; 
		for(var i=0,l=chid.length;i<l;i++){ 
			if(chid[i]!=this){ 
				eleMatch.push(chid[i]); 
			} 
		} 
		return eleMatch;
	} 
	//childrens() 
	HTMLElement.prototype.x_childrens = function(){ 
		var chid=this.childNodes; 
		var eleMatch = []; 
		for(var i=0,l=chid.length;i<l;i++){ 
			eleMatch.push(chid[i]); 
		} 
		return eleMatch; 
	} 
	//parent() 
	HTMLElement.prototype.x_parent = function(){ 
	 return this.parentNode; 
	} 
	//next() 
	HTMLElement.prototype.x_next = function(){ 
	 return this.nextElementSibling; 
	} 
	//prev() 
	HTMLElement.prototype.x_prev = function(){ 
	 return this.previousElementSibling; 
	}
	//attr() 
	HTMLElement.prototype.x_attr = function(){ 
		if(arguments.length==1){ 
			return this.getAttribute(arguments[0]);
		}else if(arguments.length==2){ 
			this.setAttribute(arguments[0],arguments[1]);
			return this; 
		} 
	} 
	//val() 
	HTMLElement.prototype.x_val = function(){ 
		if(arguments.length==0){ 
			return this.value; 
		}else if(arguments.length==1){ 
			this.value = arguments[0]; 
			return this; 
		} 
	} 
	//html() 
	HTMLElement.prototype.x_html = function(){ 
		if(arguments.length==0){ 
			return this.innerHTML; 
		}else if(arguments.length==1){ 
			this.innerHTML = arguments[0]; 
			return this; 
		} 
	} 

    //获取指定样式值
    HTMLElement.prototype.x_getStyle = function () {
		if(arguments.length==1){ 
			// 获取元素样式...
			if (this.currentStyle) {
				//IE下
				return this.currentStyle[arguments[0]];
			} else {
				return getComputedStyle(this, false)[arguments[0]];
			}
		}
    };

    // addEvent()事件绑定 委托
    HTMLElement.prototype.x_addEvent = function(){
    	if( arguments.length == 2 ){
			if (this.addEventListener) {
				this.addEventListener(arguments[0], arguments[1], false);
			} else {
				this.attachEvent("on" + arguments[0], arguments[1]);
			}
    	}

    }
    //addEvent()移除事件 ,移除事件时必须传入实名函数，匿名函数无效！
    HTMLElement.prototype.x_removeEvent = function(){
		//删除句柄
		if( arguments.length == 2 ){
			if (this.removeEventListener) {
				this.removeEventListener(arguments[0], arguments[1], false);
			} else if (this.detachEvent) {
				this.detachEvent('on' + arguments[0], arguments[1]);
			} else {
				this['on' + arguments[0]] = null;
			} 
		}   	
    }

    //indexOf增强版，可以指定多级属性
    Array.prototype.indexOf2 = function (value, property) {
        var list = property && property.split('.');
        var length = (list && list.length) || 0;
        var index = -1;
        var temporary;
        for (var i = 0; i < this.length; i++) {
            var temporary = this[i];
            for (var z = 0; z < length; z++) {
                if (typeof temporary === 'object' || typeof temporary === 'function') {
                    if (list[z] !== '') {
                        temporary = temporary[list[z]];
                    }
                } else {
                    temporary = null;
                    break;
                }
            }
            if (temporary === value) {
                return i;
            }
        }
        return index;
    };
    //绘制圆角矩形
    CanvasRenderingContext2D.prototype.radiusRect = function (width, height, r1, r2, r3, r4) {
        var s = this;
        s.beginPath();
        s.moveTo(0, height - r1);
        s.arcTo(0, 0, width, 0, r1);
        s.arcTo(width, 0, width, height, r2);
        s.arcTo(width, height, 0, height, r4);
        s.arcTo(0, height, 0, 0, r3);
        s.closePath();
        return s;
    };	
	//获取到的元素集合为类数组转化成数组
	window.x_convertToArray = function(aLi){
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
	//find()
	HTMLElement.prototype.x_find = function(sel){
		var arr = [];
		if( sel.charAt(0) == '.' ){ 
			arr = this.x_getClass(sel);
		}else{ 
			arr = this.getElementsByTagName(sel);
		}
		return x_convertToArray(arr); 
	}  
	window.x_detectOS=function() {
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
	window.x_removeRepeatArray=function(arr){
	    return Array.from(new Set(arr));
	}
	window.x_getArrayItems=function(arr, num) {
		//****经过验证测试可以用的方法*****
		//从一个给定的数组arr中,随机返回num个不重复项	
		var obj = {};
		var temp = [],
			data = [];
		temp = x_removeRepeatArray(arr);
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
	window.x_getQueryString=function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]);
		return null;
	}
	// DOM加载完毕 模仿JQuery中的ready()事件
	window.x_ready = function (readyFn) {
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
    /*
     * 描述：ajax方法
     * 参数(必选)：url
     * 参数(可选)：type,data,dataType,callbackName,beforeSend,success,complete,error,
     * dataType为 jsonp 时跨域 ，callbackName为回调函数名未设置则默认名称jsonpcallback
     * 返回值：无
     */
	window.x_ajax = function() {
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
	//获取滚动高度
	window.x_getScrollTop = function(){
	    if (document.documentElement && document.documentElement.scrollTop) {
	        return document.documentElement.scrollTop;
	    } else if (document.body) {
	        return document.body.scrollTop;
	    }
	}
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
				return window.setTimeout(callback, 1000 / 60);
			};
	})();	
	window.x_$ = function(){
		return arguments[0].indexOf("#") != -1 ? document.getElementById(arguments[0].substring(1)) : document.querySelectorAll(arguments[0]);
	}
	/**
	 * 获取文档高度
	 * @return {[type]} [description]
	 */
	window.x_getClientHeight = function(){
	    if (document.body.clientHeight && document.documentElement.clientHeight) {
	        return (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
	    } else {
	        return (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
	    }
	}	
    /*
     * 描述：动画倒计时
     * 参数(必选)：diffTime Int 倒计时时间(毫秒)
     * 参数(可选)：dayElement,hourElement,minuteElement,secondsElement,millisecondElement  倒计时天、时、分、秒、毫秒容器对象
     * 返回值：无
     */
    window.x_CountDownTimer = function(opts) {
        var intDiff = opts.diffTime;
        var objTimer = window.setInterval(function() {
            var day = 0 ,hour = 0,min = 0,sec = 0,msec = 0;
            if( intDiff <= 0 ){
                //如果差小于等于0  也就是过期或者正好过期，则推出程序 
                window.clearInterval(objTimer); //关闭定时器
                return;//结束执行 
            }   
            var total = intDiff; //
            day = Math.floor(total / (1000 * 60 * 60 * 24));
            total = intDiff % 86400000;
            hour = parseInt(total / 3600000);
            total = intDiff % 3600000;
            min = parseInt(total / 60000);
            total = intDiff % 60000;
            sec = parseInt(total / 1000);
            total = intDiff % 1000;
            msec = parseInt(total / 10); //毫秒

            var dd = day.toString();
            var hh = hour.toString();
            var mm = min.toString();
            var ss = sec.toString();
            var ms = msec.toString();

            dd = dd.length > 1 ? dd : ('0' + dd);
            hh = hh.length > 1 ? hh : ('0' + hh);
            mm = mm.length > 1 ? mm : ('0' + mm);
            ss = ss.length > 1 ? ss : ('0' + ss);
            ms = ms.length > 1 ? ms : ('0' + ms);
            //倒计时按分走
            if(opts.dayElement){
                opts.dayElement.innerHTML = dd;
            }
            if(opts.hourElement){
                opts.hourElement.innerHTML = hh;
            }
            if(opts.minuteElement){
                opts.minuteElement.innerHTML = mm;
            }
            if(opts.secondsElement){
                opts.secondsElement.innerHTML = ss;
            }
            if(opts.millisecondElement){
                opts.millisecondElement.innerHTML = ms;
            }

            intDiff = intDiff - 10;
        }, 10);
    }

	HTMLElement.prototype.x_animate = function(opts) {
		var obj = this,json = opts.json ? opts.json : {},interval = opts.interval ? opts.interval : 30, speed = opts.speed ? opts.speed : 8,callBack = opts.callBack ? opts.callBack : function(){};
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var flag = true; //全部动画是否完成标记符
			for (var attr in json) {
				if( json.hasOwnProperty(attr) ){
					//1.取当前的值
					var icur = 0;
					if (attr == "opacity") {
						icur = Math.round(parseFloat(obj.x_getStyle(attr)) * 100); //注意要用Math.round()四舍五入进行处理，以防部分浏览器计算不精确问题导致的计算失误
					} else {
						icur = parseInt(obj.x_getStyle(attr));
					}
					//2.算速度
					var _speed = (json[attr] - icur) / speed;
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

	/*
	* _____H5弹窗组件____
	* ----opts{对象}参数----
	* @param id {string}
	* @param txt {string}
	* @param title {string}
	* @param intro {string}
	* @param btnTxt {string}
	* @param btnTxt2 {string}
	*/
	window.x_maskTips = function(opts){
	    var $mask = document.createElement("div");
	    $mask.id = opts.id ? "mask_h5_" + opts.id : "mask_h5_" + String(Math.random()).replace(".","_");
	    $mask.className = "component-mask";
	    var count = 0;
	    for( attr in opts ){
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
	            $mask.style.cssText = "width:80%;height:auto;position:fixed;left:50%;top:50%;background-color:rgba(0,0,0,.6);color:#fff;font-size:15px;padding:15px;border-radius:20px;line-height:22px;text-align:center;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);";
	            $mask.innerHTML = opts.txt;
	            opts.parentElem ? opts.parentElem.appendChild($mask) : document.getElementsByTagName("body")[0].appendChild($mask);
	            setNone(ID);
	        }
	    }else{
	        var $maskC = document.createElement("div");
	        var $p1 = document.createElement("p");
	        $maskC.className = "component-mask-c";
	        $p1.className = "component-info-mask";
	        $mask.style.cssText = "width:100%;height:100%;position: fixed;left:0;top:0;right:0;bottom:0;background-color:rgba(0,0,0,.6);text-align:center;";
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
	            $btnLeft.className = "comp-mask-btnAleft";
	            $btnLeft.innerHTML = opts.btnTxt;
	            $btnLeft.style.cssText = "display:inline;padding:10px 20px;border-radius:15px;border:1px solid #999;margin:0 10px;color:#333;";
	            $btncnt.appendChild($btnLeft); 
	            $maskC.appendChild($btncnt); 
	        }
	        if(opts.btnTxt2){
	            var $btnRight = document.createElement("a");
	            $btnRight.innerHTML = opts.btnTxt2;
	            $btnRight.className = "comp-mask-btnAright";
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
})();
