/*
* baseFn.js
* @ des {支持方法链式调用的JS库}
* @ des {事件： 添加和删除事件监听器、对事件对象进行规划化处理}
* @ des {DOM： 类名管理、样式管理}
* @ des {Ajax： 对XMLHttpRequest进行规范化处理}
* @ author shawnxiao
* @ date 05/17/2017
*/
/*
* @ param strExpr{string}
* @ return arr
*/
function $(strExpr){ 
	var els = [];

     if(document.querySelectorAll){
         els = document.querySelectorAll(strExpr);
     }else{
     	if( strExpr.indexOf(",") != -1 ){
     		console.log('暂不支持多个获取')
     	}else{
	     	var idExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/; 
	     	var classExpr = /^(?:\s*(<[\w\W]+>)[^>]*|.([\w-]*))$/;      		
			if(idExpr.test(strExpr)){ 
				var idMatch = idExpr.exec(strExpr); 
				els.push( document.getElementById(idMatch[2]) ); 
			}else{
				 if(classExpr.test(strExpr)){ 
	                  var classMatch = classExpr.exec(strExpr); 
	                  var allElement = document.getElementsByTagName("*"); 
	                  for(var i=0,l=allElement.length; i<l; i++){ 
	                       if(allElement[i].className.match( new RegExp( "(\\s|^)" + classMatch[2] + "(\\s|$)") )){ 
	                            els.push(allElement[i]); 
	                       } 
	                  } 
	             }
			}
     	}
     }
	return els;
}

Object.prototype.addEvent = function(type, fn){ 
    if(window.addEventListener){
       this.addEventListener(type, fn, false);
    }else if(window.attachEvent){
      this.addEvent('on'+type, fn);
    }
 	return this; 
}
Object.prototype.removeEvent = function(type, fn){ 
    if(window.removeEventListener){
      this.removeEventListener(type, fn, false);
    }else if(window.detachEvent){
      this.detachEvent('on'+type, fn);
    }
 	return this; 
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
Object.prototype.fadeIn = function(){ 
	var that = this,speed = arguments[0] || 30,
    opacity = 100;       
    that.style.display = 'block'; 
    that.css('opacity', 0);
    var val = 0; 
    //循环将透明值以5递增,即淡入效果 
    (function(){  
        that.css('opacity',val/100);  
        val += 5;  
        if (val <= opacity) {  
            setTimeout(arguments.callee, speed)  
        }  
    })();  
 	return this; 
}
Object.prototype.fadeOut = function(){ 
	var that = this,
    speed = arguments[0] || 30,  
    opacity = 0;  
    //初始化透明度变化值为0  
    var val = 100;  
    //循环将透明值以5递减,即淡出效果  
    (function(){  
        that.css('opacity',val/100); 
        val -= 5;  
        if (val >= opacity) {  
            setTimeout(arguments.callee, speed);  
        }else if (val < 0) {  
            //元素透明度为0后隐藏元素  
            that.style.display = 'none';  
        }  
    })();
 	return this; 
}
Object.prototype.css = function(){ 
    if (this.currentStyle) {
        //IE下
        if(arguments.length==1){ 
        	return this.currentStyle[arguments[0]];
        }else if(arguments.length==2){
            if( arguments[0] === 'opacity' ){
                this.style['filter'] = "alpha(opacity=" + arguments[1]*100 + ")";
            }
			this.style[arguments[0]] = arguments[1]; 
			return this; 
        }
    } else {
        if(arguments.length==1){ 
        	return getComputedStyle(this, false)[arguments[0]];
        }else if(arguments.length==2){
			eval("this.style."+arguments[0]+"='"+arguments[1]+"'"); 
			return this; 
        }
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
//siblings() 
Object.prototype.siblings = function(){ 
    var r = [];
        var n = this.parentNode.firstChild;
        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== el) {
                r.push(n);
            }
        }       
    return r;
} 
//children() 原生js已含有该方法，故命名为userChildren。 
Object.prototype.userChildren = function(){ 
 var chid = this.children || this.childNodes; 
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
  	return this.getAttribute(arguments[0]); 
 }else if(arguments.length==2){ 
 	this.setAttribute(arguments[0],arguments[1])
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
String.prototype.trim = function(){ 
	return this.replace(/^\s+|\s+$/g,"");
}