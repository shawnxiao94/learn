var GLOBAL = {};
GLOBAL.namespace = function(str){
	var arr = str.split("."),o = GLOBAL;
	for(i = (arr[0]=="GLOBAL") ? 1 : 0; i < arr.length; i++){
		o[arr[i]] = o[arr[i]] || {};
		o = o[arr[i]];
	}
}

// dom 相关
GLOBAL.namespace("Dom");
GLOBAL.Dom.getNextNode=function(node){
	node = typeof node == "string" ? document.getElementById(node) : node;
	var nextNode = node.nextSibling;
	if(!nextNode) return null;
	if(!document.all){
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
GLOBAL.Dom.get=function(node){
	node = typeof node == "string" ? document.getElementById(node) : node;
	return node;
}
GLOBAL.Dom.getElementsByClassName=function(str,root,tag){
	if(root){
		root = typeof root == "string" ? document.getElementById(root) : root;
	}else{
		root = document.body;
	}
	tag = tag || "*";
	var els = root.getElementsByTagName(tag),arr=[];
	for(var i = 0, n=els.length; i < n; i++){
		for(var j = 0, k = els[i].className.split(" "),l=k.length; j < l; j++){
			if(k[j] == str){
				arr.push(els[i]);
				break;
			}
		}
	}
	return arr;
}
GLOBAL.Dom.addClass=function(node,str){
	if(!new RegExp("(^|\\s+)" + str).test(node.className)){
		node.className = node.className + " " + str;
	}
}
GLOBAL.Dom.hasClass=function(node,str){
    str = str || '';
    if(str.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + str + ' ').test(' ' + node.className + ' ');
}
GLOBAL.Dom.removeClass=function(node,str){
	node.className = node.className.replace(new RegExp("(^|\\s+)" + str),"");
}

//Event 相关
GLOBAL.namespace("Event");
GLOBAL.Event.getEventTarget=function(e){
	e = window.event || e;
	return e.srcElement || e.target;
}
GLOBAL.Event.stopPropagation=function(e){
	e = window.event || e;
	if(document.all){
		e.cancelBubble = true;
	}else{
		e.stopPropagation();
	}
}
GLOBAL.Event.on=function(node,eventType,handler){
	node = typeof node == "string" ? document.getElementById(node) : node;
	if(document.all){
		node.attachEvent("on"+ eventType,handler);
	}else{
		node.addEventListener(eventType,handler,false);
	}
}

// Lang 相关
GLOBAL.namespace("Lang");
GLOBAL.Lang.trim=function(ostr){
	return ostr.replace(/^\s+|\s+$/g," ");
}
GLOBAL.Lang.isNumber=function(s){
	return !isNaN(s);
}
GLOBAL.Lang.extend=function(subClass,superClass){
	var F = function(){};
	F.prototype=superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor=subClass;
	subClass.superClass = superClass.prototype;
	if(superClass.prototype.constructor == Object.prototype.constructor){
		superClass.prototype.constructor = superClass;
	}
}

// 封装cookie组件
GLOBAL.namespace("Cookie");
GLOBAL.Cookie={
	//读取
	read : function(name){
		var cookieStr = ";" + document.cookie + ";";
		var index = cookieStr.indexOf(";" + name + "=");
		if(index != -1){
			var s = cookieStr.substring(index+name.length+3,cookieStr.length);
			return unescape(s.substring(0, s.indexOf(";")));
		}else{
			return null;
		}
	};
	//设置
	set : function(name,value,expires){
		var expDays = expires*24*60*60*1000;
		var expDate = new Date();
		expDate.setTime(expDate.getTime() + expDays);
		var expString = expires ? ";expires=" + expDate.toGMTString() : "";
		var pathString = ";path=/";
		document.cookie = name + "=" + escape(value) + expString + pathString;
	};
	//删除
	del : function(name){
		var exp = new Date(new Date().getTime() -1);
		var s = this.read(name);
		if(s != null){
			document.cookie = name + "=" + s + ";expires=" + exp.toGMTString() + ";path=/"
		}
	}
} 