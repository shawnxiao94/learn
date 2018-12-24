
/*
支持方法链式调用的JS库(适用高级浏览器，暂未做兼容)
JS库特征：
事件： 添加和删除事件监听器、对事件对象进行规划化处理
DOM： 类名管理、样式管理
Ajax： 对XMLHttpRequest进行规范化处理
*/

(function(){
  function _$(els){
      var self = this;
      for(var i= 0, len=els.length; i<len; i++){
          var element = els[i];
          if(typeof element==='string'){
             if(document.querySelectorAll){
                 this.elements = document.querySelectorAll(element);
             }
          }
      }
      this.length = this.elements.length;
  }
 
  _$.prototype = {    
    constructor : _$,
    //Dom 
    each: function(fn){
      for(var i= 0,len=this.elements.length; i<len; i++){
        fn.call(this, this.elements[i]);
      }
      return this; //在每个方法的最后return this;
    },
    setStyle: function(prop, val){
      this.each(function(el){
        el.style[prop] = val;
      });
      return this; //在每个方法的最后return this;
    },
    show: function(){
      var that = this;
      this.each(function(el){
        that.setStyle('display', 'block');
      });
      return this; //在每个方法的最后return this;
    },
    hide: function(){
      var that = this;
      this.each(function(el){
        that.setStyle('display', 'none');
      });
      return this; //在每个方法的最后return this;
    },   
    setOpacity : function(opacity) {
        var that = this;
        this.each(function(el){
            if (el.style.opacity != undefined) {
                ///兼容FF和GG和新版本IE
                el.style.opacity = opacity / 100;
            } else {
                ///兼容老版本ie
                el.style.filter = "alpha(opacity=" + opacity + ")";
            }
        });
        return this;
    },  
    fadeIn : function(opacity, speed){
        var that = this;
        this.each(function(el){
            speed = speed || 20;
            opacity = opacity || 100;       
            el.style.display = 'block'; 
            that.setOpacity(el, 0);
            var val = 0; 
            //循环将透明值以5递增,即淡入效果 
            (function(){  
                that.setOpacity(val);  
                val += 5;  
                if (val <= opacity) {  
                    setTimeout(arguments.callee, speed)  
                }  
            })();  
        });
        return this;                    
    },
    fadeOut : function(opacity, speed){
        var that = this;
        this.each(function(el){
            speed = speed || 20;  
            opacity = opacity || 0;  
            //初始化透明度变化值为0  
            var val = 100;  
            //循环将透明值以5递减,即淡出效果  
            (function(){  
                that.setOpacity(val);  
                val -= 5;  
                if (val >= opacity) {  
                    setTimeout(arguments.callee, speed);  
                }else if (val < 0) {  
                    //元素透明度为0后隐藏元素  
                    el.style.display = 'none';  
                }  
            })(); 
        });
        return this;          
    },   
    addClass : function(str) {
        var that = this;
        this.each(function(el){
            if (!new RegExp("(^|\\s+)" + str).test(el.className)) {
                el.className = el.className + " " + str;
            }
        });
        return this;        
    },
    hasClass : function(str) {
        var flag = false;
        this.each(function(el){
            str = str || '';
            if (str.replace(/\s/g, '').length == 0){
                flag = false;
            }else{
                flag = new RegExp(' ' + str + ' ').test(' ' + el.className + ' ');
            }
        });
        return flag;        
    },  
    removeClass : function(str) {
        var that = this;
        this.each(function(el){
            el.className = el.className.replace(new RegExp("(^|\\s+)" + str), "");
        });
        return this;        
    },
    siblings : function() {
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
    }, 
    children : function() { 
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
    },  
    find : function(str) {
        var arr = [];
        this.each(function(el){
            if(document.querySelectorAll){
                 arr = el.querySelectorAll(str);
            }else{            
                var els = el.getElementsByTagName("*");
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
            }           
        });
        return arr;
    },   
    append : function(newElem){ 
       this.each(function(el){
            el.innerHTML += newElem; 
       });
       return this;        
    }, 
    prepend : function(){ 
        var _arguments = arguments;
       this.each(function(el){
            el.innerHTML = _arguments[0] + el.innerHTML; 
       });
       return this;        
    }, 
    after : function(){ 
        var _arguments = arguments;
       this.each(function(el){
            el.outerHTML += _arguments[0]; 
       });
       return this;        
    }, 
    before : function(){ 
        var _arguments = arguments;
       this.each(function(el){
            el.outerHTML = _arguments[0] + el.outerHTML; 
       });
       return this;        
    },
    empty : function(){ 
       this.each(function(el){
            el.innerHTML = "";
       });
       return this;        
    }, 
    parent : function(){ 
        var temp;
       this.each(function(el){
           temp = el.parentNode; 
       }); 
       return temp;    
    },   
    next : function(){ 
       var temp; 
       this.each(function(el){
           temp = el.nextElementSibling; 
       }); 
       return temp;    
    }, 
    prev : function(){ 
        var temp;
       this.each(function(el){
           temp = el.previousElementSibling; 
       }); 
       return temp;    
    },
    val : function(){ 
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
    },
    html : function(){ 
       var _arguments = arguments,temp,that = this;
       this.each(function(el){
            if(_arguments.length==0){ 
                temp = el.innerHTML;
            };
            if(_arguments.length==1){ 
                el.innerHTML = _arguments[0]; 
                temp = that; 
            }; 
       }); 
       return temp;   
    },                                                        
    //event 
    on: function(type, fn){
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
      return this; //在每个方法的最后return this;
    },    
    off: function(type, fn){
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
      return this; //在每个方法的最后return this;
    },    

  }

  window._$ = function(){
    return new _$(arguments);
  }
    //解决JS库命名冲突问题
  window.installHelper = function(scope, interface) {
    scope[interface] = function() {
        return _$(arguments)
    }
  }   

})();