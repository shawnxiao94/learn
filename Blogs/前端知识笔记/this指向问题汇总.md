> 总结：箭头函数的this值取决于该函数外部非箭头函数的this的值；普通函数this指向直接调用者；call、apply、bind，都可以改变this指向，相比下apply传参为数组，bind不会立即执行，需要调用。
---

### 全局执行
```
//全局作用域中，this指向当前的全局对象
console.log(this)
//window
```
### 函数中执行
```
1. 非严格模式
function fn () {
    cosnole.log(this);
}
fn();
// window
2.严格模式
'use strict'
function fn(){
 console.log(this)
}
fn()
//undefined
```
### 作为对象方法的调用
```
当一个函数被当作一个对象的方法调用的时候，this指向当前对象的obj
var obj = {
  name: 'xiao',
  fn: function () {
    console.log(this.name)
  }
}
obj.fn()
// xiao

 如果把对象的方法赋值给一个变量，调用该方法时，this指向window
 var test = obj.fn()
 // window
 ```
 ### 作为一个构造函数使用
 ```
 function Person(name) {
   this.name = name;
   console.log(this);
 }
 var p = new Person('kk);
 // Person
 此时，this指向这个构造函数调用得时候实例化出来得对象。构造函数也是一个函数，如果将构造函数当作普通函数来调用，this指向window。
 function Person(name) {
   this.name = name;
   console.log(this);
 }
 var p1 = Person('mm');
 // window
```
### 定时器种使用
```
setInterval(function(){
  console.log(this)
},1000)
// window
setTimeout(function(){
  console.log(this)
},0)
// window
如果没有特殊指向，setInterval,setTimeout得回调函数种this得指向都是 window。这是因为JS的定时器方法是定义在window下得。
```
### 箭头函数中使用
```
1.全局环境中使用：
var fn = () => {
  console.log(this);
}
fn();
// window
2.作为对象的一个函数调用
var obj = {
  name: 'xiao'.
  fn: function(){
    console.log(this);
  }
}
obj.fn()
// obj
var obj = {
  name: 'xiao',
  fn: () => {
    console.log(this)
  }
}
obj.fn()
// window
不难发现，普通函数作为对象得一个函数被调用，this指向obj，箭头函数作为对象的一个函数被调用，this指向window
3.特殊情况：结合定时器调用
var obj = {
  name: 'xiao',
  fn: function(){
    setTimeout(function(){
      console.log(this);
    }, 0)
  }
}
obj.fn()
// window
var obj = {
  name: 'xiao',
  fn: function() {
    setTimeout(() => {
      console.log(this)
    }, 0)
  }
}
obj.fn()
// obj

若在对象得函数中，普通函数作为定时器延时执行的函数调用，this指向window；箭头函数作为定时器延时执行得函数调用，this指向定义时所在得对象，也就是fn中的this，即obj.

|箭头函数中this得值取决于该函数外部非箭头函数得this得值，且不能通过call(),apply()和bind()方法来改变this得值。|
--
```
### call, apply, bind
```
1.call：
fun.call(thisArg[, arg1[, arg2[, ...]]])
//它会立即执行函数，第一个参数是指定执行函数中 this 的上下文，后面的参数是执行函数需要传入的参数。
2.apply：
fun.apply(thisArg, [argsArray])
//它也会立即执行函数，第一个参数是指定执行函数中 this 的上下文，第二个参数是一个数组，是传给执行函数的参数（与 call 的区别）。
3.bind：
var foo = fun.bind(thisArg[, arg1[, arg2[, ...]]]);
//它不会执行函数，而是返回一个新的函数，这个新的函数被指定了 this 的上下文，后面的参数是执行函数需要传入的参数。
我们来看个示例：
function Person(name, age) { 
  this.name = name;
  this.age = age;
  console.log(this);
}
var obj = {
  name:'kk',
  age: 6
};
Person.call(obj, 'mm', 10);
// obj，{name: "mm", age: 10}
Person.apply(obj, ['mm', 10]);
// obj，{name: "mm", age: 10}
var p1 = Person.bind(obj, 'mm', 10)
var p2 = new p1();
// Person {name: "mm", age: 10}
在这个示例中，call、apply 和 bind 的 this 都指向了 obj，都能正常运行；call、apply 会立即执行函数，call 和 apply 的区别就在于传递的参数，call 接收多个参数列表，apply 接收一个包含多个参数的数组；bind 不是立即执行函数，它返回一个函数，需要执行 p2 才能返回结果，bind 接收多个参数列表。
```

### 应用：怎么改变 this 的指向
```
为什么讲这个模块呢，为了便于大家更加透彻的理解上面所讲述的 this 指向问题，以及更加彻底的理解 JS 函数中重要的三种方法：call、apply、bind 的使用；并且在实际的项目开发中，我们经常会遇到需要改变 this 指向的情况。

我们来看下都有哪些方法：

1. 使用 es6 的箭头函数
var name = "hh";

var
 obj = {
    name : "kk",
    func1: function () {
      console.log(this.name)     
    },
    func2: function () {
      setTimeout(function () {            
        this.func1()
      }, 1000);
    }
};
obj.func2();
// Uncaught TypeError: this.func1 is not a function
这时会报错，因为 setTimeout 里函数的 this 指向 Window，而 Window 对象上是没有 func1 这个函数的。下面我们来修改成箭头函数：
var name = "hh";
var obj = {
  name : "kk",
    func1: function () {
      console.log(this.name)     
    },
    func2: function () {
      setTimeout(() => {            
        this.func1()
      }, 1000);
    }
};
obj.func2();
// kk
这时候，没有报错，因为箭头函数的 this 的值取决于该函数外部非箭头函数的 this 的值，也就是 func2 的 this 的值， 即 obj。

2. 在函数内部使用 _this = this
var name = "hh";
var obj = {
    name : "kk",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {        
      let _this = this;
      setTimeout(function () {
          _this.func1()
      }, 1000);
    }
};
obj.func2();
// kk
此时，func2 也能正常运行。在 func2 中，首先设置 var _this = this，这里的 this 是指向 func2 的对象 obj，为了防止在 func2 中的 setTimeout 被 window 调用而导致的在 setTimeout 中的 this 为 window。我们将 this (指向变量 obj) 赋值给一个变量 _this，这样，在 func2 中我们使用 _this 就是指向对象 obj 了

3. 使用 call、apply、bind
call:
var name = "hh";
var obj = {
    name : "kk",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
      setTimeout(function () {            
        this.func1()
      }.call(obj),1000);
    }
};
obj.func2();
// kk

apply：
var name = "hh";
var obj = {
    name : "kk",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
      setTimeout(function () {            
        this.func1()
      }.apply(obj),1000);
    }
};
obj.func2();
// kk

bind：
var name ="hh";
var obj = {
    name : "kk",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
      setTimeout(function () {            
        this.func1()
      }.bind(obj)(),1000);
    }
};
obj.func2();
// kk
call、apply、bind 都能改变 this 的上下文对象，所以也没有报错，可以正常执行。

具体原因可看上述第七点，call、apply、bind。

4. new 实例化一个对象

如上：第四点，作为一个构造函数使用。