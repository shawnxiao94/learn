/*
* Basics.js
* @ des {支持方法链式调用的JS库}
* @ des {事件： 添加和删除事件监听器、对事件对象进行规划化处理}
* @ des {DOM： 类名管理、样式管理}
* @ des {Ajax： 对XMLHttpRequest进行规范化处理}
* @ author shawnxiao
* @ date 05/17/2017
*/
Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};
(function() {
    function _$(els) {
        //...
      for(var i= 0, len=els.length; i<len; i++){
          var element = els[i];
          if(typeof element==='string'){
             if(document.querySelectorAll){
                 this.elements = document.querySelectorAll(element);
             }else{
                 var idExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/; 
                 var classExpr = /^(?:\s*(<[\w\W]+>)[^>]*|.([\w-]*))$/; 
                 if(idExpr.test(element)){ 
                    var idMatch = idExpr.exec(element); 
                    this.elements = document.getElementById(idMatch[2]); 
                 }else if(classExpr.test(element)){ 
                      var classMatch = classExpr.exec(element); 
                      var allElement = document.getElementsByTagName("*"); 
                      var ClassMatch = []; 
                      for(var i=0,l=allElement.length; i<l; i++){ 
                           if(allElement[i].className.match( new RegExp( "(\\s|^)" + classMatch[2] + "(\\s|$)") )){ 
                                ClassMatch.push(allElement[i]); 
                           } 
                      } 
                      this.elements = ClassMatch; 
                 }                 
             }
          }
      }                
    }
    /*
     * Events
     *      addEvent
     *      removeEvent
     *      each
     */   
    _$.method('addEvent', function(type, fn) {
        var add = function(el){
            if(window.addEventListener){
              el.addEventListener(type, fn, false);
            }else if(window.attachEvent){
              el.addEvent('on'+type, fn);
            }
        };
        this.each(function(el){
            add(el);
        });
    }).method('removeEvent', function(type, fn) {
        var removeE = function(el){
            if(window.removeEventListener){
              el.removeEventListener(type, fn, false);
            }else if(window.detachEvent){
              el.detachEvent('on'+type, fn);
            }
        };
        this.each(function(el){
            removeE(el);
        });
    }).method('each', function(fn){
        for(var i= 0,len=this.elements.length; i<len; i++){
            fn.call(this, this.elements[i]);
        }    
    })
    /*
     * DOM
     *      addClass
     *      removeClass
     *      hover
     *      hasClass
     *      getClass
     *      getStyle
     *      setStyle
     *      show,hide,fadeIn,fadeOut,siblings,children,append,prepend,after,before,empty,parent,next,prev,val,html
     */
    .method('addClass', function(classname) {
        this.each(function(el){
            if (!new RegExp("(^|\\s+)" + classname).test(el.className)) {
                el.className = el.className + " " + classname;
            }
        });
    }).method('removeClass', function(classname) {
        this.each(function(el){
            el.className = el.className.replace(new RegExp("(^|\\s+)" + classname), "");
        });
    }).method('hasClass', function(classname) {
        var flag = false;
        this.each(function(el){
            classname = classname || '';
            if (classname.replace(/\s/g, '').length == 0){
                flag = false;
            }else{
                flag = new RegExp(' ' + classname + ' ').test(' ' + el.className + ' ');
            }
        });
        return flag;  
    }).method('getClass', function(classname) {
        var arr = [];
        this.each(function(el){
            var els = el.getElementsByTagName("*");
            for(var i = 0, n = els.length; i < n; i++){
                for(var j = 0, k = els[i].className.split(" "), l = k.length; j < l; j++){
                    if(k[j] == classname){
                        arr.push(els[i]);
                        break;
                    }
                }
            }
        });        
        return arr;
    }).method('getStyle', function(prop) {
        var _prop;
        this.each(function(el){
            if (el.currentStyle) {
                //IE下
                _prop = el.currentStyle[prop];
            } else {
                _prop = getComputedStyle(el, false)[prop];
            }
        });
        return _prop;        
    }).method('setStyle', function(prop, val) {
        this.each(function(el){
            if( prop === 'opacity' ){
                el.style['filter'] = "alpha(opacity=" + val + ")";
                el.style[prop] = val/100;
            }else{
                el.style[prop] = val;
            }
        });
    }).method('show', function() {
       this.setStyle('display', 'block');
    }).method('hide', function() {
        this.setStyle('display', 'none');
    }).method('fadeIn', function(speed) {
        var that = this;
        this.each(function(el){
            speed = speed || 30;
            opacity = 100;       
            el.style.display = 'block'; 
            that.setStyle('opacity', 0);
            var val = 0; 
            //循环将透明值以5递增,即淡入效果 
            (function(){  
                that.setStyle('opacity',val);  
                val += 5;  
                if (val <= opacity) {  
                    setTimeout(arguments.callee, speed)  
                }  
            })();  
        });
    }).method('fadeOut', function(speed) {
        var that = this;
        this.each(function(el){
            speed = speed || 30;  
            opacity = 0;  
            //初始化透明度变化值为0  
            var val = 100;  
            //循环将透明值以5递减,即淡出效果  
            (function(){  
                that.setStyle('opacity',val); 
                val -= 5;  
                if (val >= opacity) {  
                    setTimeout(arguments.callee, speed);  
                }else if (val < 0) {  
                    //元素透明度为0后隐藏元素  
                    el.style.display = 'none';  
                }  
            })();
        });
    }).method('siblings', function() {
        var that = this, r = [];
        this.each(function(el){
            var n = el.parentNode.firstChild;
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== el) {
                    r.push(n);
                }
            }
        });        
        return r;
    }).method('children', function() {
        var childArrTem = [];  //  临时数组，用来存储符合条件的节点
        this.each(function(el){
            var childArr = el.children || el.childNodes;
            for (var i = 0, len = childArr.length; i < len; i++) {    
                if (childArr[i].nodeType == 1) {       
                    childArrTem.push(childArr[i]);    
                }  
            }  
        });         
        return  childArrTem;
    }).method('append', function(newElem) {
       this.each(function(el){
            el.innerHTML += newElem; 
       });
    }).method('prepend', function() {
        var _arguments = arguments;
       this.each(function(el){
            el.innerHTML = _arguments[0] + el.innerHTML; 
       });
    }).method('after', function() {
       var _arguments = arguments;
       this.each(function(el){
            el.outerHTML += _arguments[0]; 
       });
    }).method('before', function() {
       var _arguments = arguments;
       this.each(function(el){
            el.outerHTML = _arguments[0] + el.outerHTML; 
       });
    }).method('empty', function() {
       this.each(function(el){
            el.innerHTML = "";
       });
    }).method('parent', function() {
       var temp;
       this.each(function(el){
           temp = el.parentNode; 
       }); 
       return temp;  
    }).method('next', function() {
       var temp; 
       this.each(function(el){
           temp = el.nextElementSibling; 
       }); 
       return temp; 
    }).method('prev', function() {
       var temp;
       this.each(function(el){
           temp = el.previousElementSibling; 
       }); 
       return temp; 
    }).method('val', function() {
       var _arguments = arguments,temp,that = this;
       this.each(function(el){
            if(_arguments.length==0){ 
                temp =  el.value; 
            }else if(_arguments.length==1){ 
                el.value = _arguments[0]; 
                temp = that; 
            } 
       }); 
       return temp;
    }).method('html', function() {
       var _arguments = arguments,temp,flag = false;
       this.each(function(el){
            if(_arguments.length==0){ 
                temp = el.innerHTML;
                flag = true;
            };
            if(_arguments.length==1){ 
                el.innerHTML = _arguments[0]; 
            }; 
       }); 
       if(flag){
           return temp; 
       }
    }).method('attr', function() {
       var _arguments = arguments,temp,flag = false,that=this;
       this.each(function(el){
            if(_arguments.length==0){ 
                temp = el.getAttribute(arguments[0]);
                flag = true;
            };
            if(_arguments.length==1){ 
                el.setAttribute(arguments[0],arguments[1]);
                temp = that;
            }; 
       }); 
       if(flag){
           return temp; 
       }
    })
    /*
     * Anmate
     * @param json {object} 
     * @param interval {number}
     * @param speed {number}
     * @param callBack {function}
     */
    .method('animate', function() {
        var self = this,argu = arguments,json = {},interval = 35,speed = 0.15,callBack;
        for(var i= 0, len=argu.length; i<len; i++){
            if(typeof argu[i] === "object"){
                json = argu[i];
            }else if(typeof argu[i] === "number" && argu[i] > 1 ){
                interval = argu[i];
            }else if(typeof argu[i] === "number" && argu[i] < 1 ){
                speed = argu[i];
            }else if(typeof argu[i] === "function"){
                callBack = argu[i];
            }
        }
        this.each(function(el){
            clearInterval(el.timer);
            el.timer = setInterval(function() {
                var flag = true; //全部动画是否完成标记符
                for (var attr in json) {
                    if( json.hasOwnProperty(attr) ){
                        //1.取当前的值
                        var icur = 0;
                        if (attr == "opacity") {
                            icur = Math.round(parseFloat(self.getStyle(attr)) * 100); //注意要用Math.round()四舍五入进行处理，以防部分浏览器计算不精确问题导致的计算失误
                        } else {
                            icur = parseInt(self.getStyle(attr));
                        }
                        //2.算速度
                        var _speed = (json[attr] - icur) * speed;
                        _speed = _speed > 0 ? Math.ceil(_speed) : Math.floor(_speed); //凡是遇到运动数字的时候都要这样处理，不然会各种问题
                        //3.检测停止
                        if (icur != json[attr]) {
                            flag = false;
                        }
                        if (attr == "opacity") {
                            el.style.filter = 'alpha(opacity:' + (icur + _speed) + ')'; //针对IE浏览器
                            el.style.opacity = (icur + _speed) / 100;
                        } else {
                            el.style[attr] = icur + _speed + 'px';
                        }
                    }
                }
                if (flag) {
                    clearInterval(el.timer);
                    callBack && callBack();
                }
            }, interval);
        });
    });
    /*
     * AJAX
     *      ajax
     */
    window.ajax = function() {
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
    };
    window.trim = function(){
        String.prototype.replace(/^\s+|\s+$/g,"");
    }
    window.$$ = function() {
        return new _$(arguments);
    };
    //解决JS库命名冲突问题
    window.installHelper = function(scope, interface) {
        scope[interface] = function() {
            return _$(arguments)
        }
    }  
})();