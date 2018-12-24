### es6模块化
```
模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import 命令用于输入其他模块提供的功能。
```
### Iterator 和 for…of 循环
```
JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了 Map 和 Set。这样就需要一种统一的接口机制，来处理所有不同的数据结构。遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

1.Iterator 的作用
 -为各种数据结构，提供一个统一的、简便的访问接口；
 -使得数据结构的成员能够按某种次序排列
 -ES6 创造了一种新的遍历命令 for…of 循环，Iterator 接口主要供 for…of 消费
 
2.原生具备 iterator 接口的数据(可用 for of 遍历)
 -Array
 -set 容器
 -map 容器
 -String
 -函数的 arguments 对象
 -NodeList 对象
let arr3 = [1, 2, 'kobe', true];
for(let i of arr3){
   console.log(i); // 1 2 kobe true
}
let str = 'abcd';
for(let item of str){
   console.log(item); // a b c d
}
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit 

3.几种遍历方式比较
 -for of 循环不仅支持数组、大多数伪数组象，也支持字符串遍历，此外还支持Map和Set对象遍历。
 -for in 循环可以遍历字符串、对象、数组，不能遍历 Set/Map
 -forEach 循环不能遍历字符串、对象,可以遍历 Set/Map
 ```
 ### Promise 的基本使用和原理
 ```
 //在JavaScript的世界中，所有代码都是单线程执行的。由于地狱回调产生了promise
 Promise 是异步编程的一种解决方案，比传统的解决方案(回调函数和事件)更合理和更强大。
 
1.Promise 原理
 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
 Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。
 promise 对象初始化状态为 pending ；当调用 resolve(成功)，会由 pending => fulfilled ；当调用 reject(失败)，会由 pending => rejected。

2.Promise 的使用流程
 -new Promise 一个实例，而且要 return
 -new Promise 时要传入函数，函数有 resolve reject 两个参数
 -成功时执行 resolve，失败时执行 reject
 -then 监听结果
 ```
 
 ### Class 和传统构造函数有何区别
 ```
 从概念上讲，在 ES6 之前的 JS 中并没有和其他面向对象语言那样的“类”的概念。长时间里，人们把使用 new 关键字通过函数（也叫构造器）构造对象当做“类”来使用。由于 JS 不支持原生的类，而只是通过原型来模拟，各种模拟类的方式相对于传统的面向对象方式来说非常混乱，尤其是处理当子类继承父类、子类要调用父类的方法等等需求时。
 ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。但是类只是基于原型的面向对象模式的语法糖。
 
 1.对比在传统构造函数和 ES6 中分别如何实现类：
 //传统构造函数
function MathHandle(x,y){
  this.x=x；
  this.y=y；
}
MathHandle.prototype.add =function（）{
  return this.x+this.y；
}；
var m=new MathHandle(1,2）；
console.log(m.add()）
//class语法
class MathHandle {
 constructor(x,y){
  this.x=x；
  this.y=y；
}
 add(){
   return this.x+this.y；
  }
}
const m=new MathHandle(1,2);
console.log(m.add()）
这两者有什么联系？其实这两者本质是一样的，只不过是语法糖写法上有区别。所谓语法糖是指计算机语言中添加的某种语法，这种语法对语言的功能没有影响，但是更方便程序员使用。比如这里 class 语法糖让程序更加简洁，有更高的可读性。

typeof MathHandle //"function"
MathHandle===MathHandle.prototype.constructor //true

2.对比在传统构造函数和 ES6 中分别如何实现继承：
//传统构造函数继承
function Animal() {
    this.eat = function () {
        alert('Animal eat')
    }
}
function Dog() {
    this.bark = function () {
        alert('Dog bark')
    }
}
Dog.prototype = new Animal()// 绑定原型，实现继承
var hashiqi = new Dog()
hashiqi.bark()//Dog bark
hashiqi.eat()//Animal eat
//ES6继承
class Animal {
    constructor(name) {
        this.name = name
    }
    eat() {
        alert(this.name + ' eat')
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name) // 有extend就必须要有super，它代表父类的构造函数，即Animal中的constructor
        this.name = name
    }
    say() {
        alert(this.name + ' say')
    }
}
const dog = new Dog('哈士奇')
dog.say()//哈士奇 say
dog.eat()//哈士奇 eat

Class 之间可以通过 extends 关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

3.Class 和传统构造函数有何区别
 -Class 在语法上更加贴合面向对象的写法
 -Class 实现继承更加易读、易理解，对初学者更加友好
 -本质还是语法糖，使用 prototype
 ```
 
 ### 模板字符串（template string）
 ```
 模板字符串是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。 模板字符串中嵌入变量和函数，需要将变量名写在\${}之中
 ```
 
 ### 解构赋值----更方便的数据访问
 ```
 1. 对象结构赋值&默认值
 
注意:你必须用圆括号包裹解构赋值语句
//这是因为暴露的花括号会被解析为代码块语句，而块语句不允许在赋值操作符（即等号）左侧出现。圆括号标示了里面的花括号并不是块语句、而应该被解释为表达式，从而允许完成赋值操作。

let node = {
  type: "Identifier",
  name: "foo"
};
let {
  type,
  name,
  value = true
} = node;
console.log(type); //    "Identifier"
console.log(name); //    "foo"
console.log(value); //    true

2. 嵌套对象解构：

使用类似于对象字面量的语法，可以深入到嵌套的对象结构中去提取你想要的数据。

let node = {
  type: "Identifier",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  }
};
let { loc: { start }} = node;
console.log(start.line); //    1
console.log(start.column); //    1

// 本例中的解构模式使用了花括号，表示应当下行到 node 对象的 loc 属性内部去寻找 start 属性。

3. 必须传值的解构参数
function setCookie(name, value, {
  secure,
  path,
  domain,
  expires
}) {
  //    设置cookie的代码
}
  setCookie("type", "js");//报错
  
在此函数内，name 与 value 参数是必需的，而 secure、path、domain 与 expires 则不是。默认情况下调用函数时未给参数解构传值会抛出错误。像上例中如果 setCookie 不传第三个参数，就会报错。若解构参数是可选的，可以给解构的参数提供默认值来处理这种错误。

function setCookie(name, value, {
  secure,
  path,
  domain,
  expires
} = {}) {}
setCookie("type", "js");//不会报错

对象内容集合

var obj = {'a': 1, 'b': 2}
 Object.keys(obj);// ['a','b']
 Object.values(obj);// [1,2]
 Object.entries(obj);// [['a',1]['b',2]]

4. 数组

const names = ["Henry","Bucky","Emily"];
const [name1,name2,name3] = names;
console.log(name1,name2,name3);//Henry Bucky Emily
const [name,...rest] = names;//结合展开运算符
console.log(rest);//["Bucky", "Emily"]

 - 用{}解构返回数组个数
 
 const {length} = names;
 console.log(length);//3
 
 数组解构也可以用于赋值上下文，但不需要用小括号包裹表达式。这点跟对象解构的约定不同。
 
 let colors = ["red", "green", "blue"],
  firstColor = "black",
  secondColor = "purple";
[firstColor, secondColor] = colors;
console.log(firstColor); //    "red"
console.log(secondColor);    // "green"

默认值：数组解构赋值同样允许在数组任意位置指定默认值。当指定位置的项不存在、或其值为 undefined，那么该默认值就会被使用。

let colors = ["red"];
let [firstColor, secondColor = "green"] = colors;
console.log(firstColor); //    "red"
console.log(secondColor);//    "green"

与 rest 参数搭配

在 ES5 中常常使用 concat()方法来克隆数组，例如：

//在ES5中克隆数组
var colors = ["red", "green", "blue"];
var clonedColors = colors.concat();
console.log(clonedColors); //"[red,green,blue]"
在 ES6 中，你可以使用剩余项的语法来达到同样效果

//在ES6中克隆数组
let colors = ["red", "green", "blue"];
let [...clonedColors] = colors;
console.log(clonedColors); //[red,green,blue]
接下我们看个例子：如何将数组转化为对象

const points = [
  [4,5],
  [10,1],
  [0,40]
];
//期望得到的数据格式如下，如何实现？
// [
//   {x:4,y:5},
//   {x:10,y:1},
//   {x:0,y:40}
// ]
let newPoints = points.map(pair => {
  const [x,y] = pair;
  return {x,y}
})
//还可以通过以下办法，更为简便
let newPoints = points.map(([x,y]) => {
  return {x,y}
})
console.log(newPoints);

混合解构

const people = [
  {name:"Henry",age:20},
  {name:"Bucky",age:25},
  {name:"Emily",age:30}
];
//es5 写法
var age = people[0].age;
console.log(age);
//es6 解构
const [age] = people;
console.log(age);//第一次解构数组 {name:"Henry",age:20}
const [{age}] = people;//再一次解构对象
console.log(age);//20
4.注意点

当使用解构来配合 var、let、const 来声明变量时，必须提供初始化程序（即等号右边的值）。下面的代码都会因为缺失初始化程序而抛出语法错误：

var { type, name }; // 语法错误！
let { type, name }; // 语法错误！
const { type, name }; // 语法错误！
```

### 展开运算符
```
let values = [25,50,75,    100]
//等价于console.log(Math.max(25,50,75,100));
console.log(Math.max(...values));    //100

1.扩展运算符还可以与其他参数混用
let values = [-25,-50,-75,-100]
console.log(Math.max(...values,0));    //0

2.扩展运算符拆解字符串与数组
var array = [1,2,3,4,5];
console.log(...array);//1 2 3 4 5
var str = "String";
console.log(...str);//sting

3.还可以实现拼接
var defaultColors = ["red","greed"];
var favoriteColors = ["orange","yellow"];
var fallColors = ["fire red","fall orange"];
console.log(["blue","green",...fallColors,...defaultColors,...favoriteColors]
//["blue", "green", "fire red", "fall orange", "red", "greed", "orange", "yellow"]
```

### rest 参数
```
ES6 引入 rest 参数（形式为…变量名），用于获取函数的多余参数，这样就不需要使用 arguments 对象了。
rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

传统写法：
function addNumbers(a,b,c,d,e){
  var numbers = [a,b,c,d,e];
  return numbers.reduce((sum,number) => {
    return sum + number;
  },0)
 }
 console.log(addNumbers(1,2,3,4,5));//15
 
 ES6 写法：
  function addNumbers(...numbers){
  return numbers.reduce((sum,number) => {
    return sum + number;
  },0)
 }
 console.log(addNumbers(1,2,3,4,5));//15
 
 也可以与解构赋值组合使用
 var array = [1,2,3,4,5,6];
var [a,b,...c] = array;
console.log(a);//1
console.log(b);//2
console.log(c);//[3, 4, 5, 6]

rest 参数还可以与箭头函数结合
const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5)// [1,2,3,4,5]

注意：
① 每个函数最多只能声明一个 rest 参数，而且 rest 参数必须是最后一个参数，否则报错。
②rest 参数不能用于对象字面量 setter 之中

let object = {
    set name(...value){   //报错
        //执行一些逻辑
    }
}
```

### 箭头函数
```

ES6 允许使用“箭头”（=>）定义函数。它主要有两个作用：缩减代码和改变 this 指向

1.多个参数记得加括号
const double6 = (number,number2) => number + number2;

2.如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用 return 语句返回。
 const double = (number,number2) => {
   sum = number + number2
   return sum;
 }
 
 3.由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错
 // 报错
let getTempItem = id => { id: id, name: "Temp" };
// 不报
let getTempItem = id => ({ id: id, name: "Temp" });

4.简化回调函数
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});
// 箭头函数写法
[1,2,3].map(x => x * x);//[1, 4, 9]

5.改变 this 指向
（1）函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。

（3）不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
```

### 数组的扩展
```
1. Array.from() : 将伪数组对象或可遍历对象转换为真数组

Array.from(btns).forEach(item=>console.log(item))将伪数组转换为数组

2.Array.of(v1, v2, v3) : 将一系列值转换成数组

new Array( )构造器方式：
let items = new Array(2) ;
console.log(items.length) ; // 2
console.log(items[0]) ; // undefined
console.log(items[1]) ;
let items = new Array(1, 2) ;
console.log(items.length) ; // 2
console.log(items[0]) ; // 1
console.log(items[1]) ; // 2

Array.of( )方式
let items = Array.of(1, 2);
console.log(items.length); // 2
console.log(items[0]); // 1
console.log(items[1]); // 2
items = Array.of(2);
console.log(items.length); // 1
console.log(items[0]); // 2

Array.of 基本上可以用来替代 Array()或 newArray()，并且不存在由于参数不同而导致的重载，而且他们的行为非常统一。

3.数组实例的 find() 和 findIndex()
[1, 4, -5, 10].find((n) => n < 0) // -5
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2

4.数组实例的 includes()
[1, 2, 3].includes(2)   // true
[1, 2, 3].includes(3, -1); // true
[1, 2, 3, 5, 1].includes(1, 2); // true

5.数组实例的 entries()，keys() 和 values()
//ES6 提供 entries()，keys()和 values(),用于遍历数组。它们都返回一个遍历器对象，可以用 for…of 循环进行遍历，唯一的区别是 keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

### 块级作用域
```
ES5 只有全局作用域和函数作用域,这导致内层变量覆盖外层变量,变量泄露，成为全局变量.
ES6 提供 let 和 const 来代替 var 声明变量，新的声明方式支持用大括号表示的块级作用域，这会带来一些好处:
1.不再需要立即执行的函数表达式(IIFE)
//在 ES5 中，我们需要构造一个立即执行的函数表达式去保证我们不污染全局作用域。在 ES6 中， 我们可以使用更简单的大括号（{}），然后使用 const 或者 let 代替 var 来达到同样的效果。
2.循环体中的闭包不再有问题
//在 ES5 中，如果循环体内有产生一个闭包，访问闭包外的变量，会产生问题。在 ES6，你可以使用 “let” 来避免问题
3.防止重复声明变量
//ES6 不允许在同一个作用域内用 let 或 const 重复声明同名变量。这对于防止在不同的 js 库中存在重复声明的函数表达式十分有帮助。
```

### 开发环境配置
````
babel 编译 ES6 语法:

//可以把我们写的 ES6 语法转换成 ES5，相当于在 ES6 和浏览器之间做了一个翻译官。其中Babel是一个广泛使用的转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行。

webpack:

Webpack 的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack 将从这个文件开始找到你的项目的所有依赖文件，使用 loaders 处理它们，最后打包为一个（或多个）浏览器可识别的 JavaScript 文件。