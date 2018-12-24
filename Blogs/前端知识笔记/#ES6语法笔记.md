#ES6语法
--
- 模块化操作

|export: 模块输出,   import:模块引入|
--

- 类的声明

>class coder{
    name(val){
        console.log(val);
    }
}

- 类的使用
> class Coder{
    name(val){
        console.log(val);
    }
}
let jspang= new Coder;
jspang.name('jspang');

- 类的多方法声明
> class Coder{
    name(val){
        console.log(val);
        return val;
    }
    skill(val){
        console.log(this.name('jspang')+':'+'Skill:'+val);
    }
}
let jspang= new Coder;
jspang.name('jspang');
jspang.skill('web');

|这里需要注意的是两个方法中间不要写逗号了，还有这里的this指类本身，还有要注意return 的用法。|
--
- 类的传参

|在类的参数传递中我们用constructor( )进行传参。传递参数后可以直接使用this.xxx进行调用|
--
> class Coder{
    name(val){
        console.log(val);
        return val;
    }
    skill(val){
        console.log(this.name('jspang')+':'+'Skill:'+val);
    }
    constructor(a,b){
        this.a=a;
        this.b=b;
    }
    add(){
        return this.a+this.b;
    }
}
let jspang=new Coder(1,2);
console.log(jspang.add());

|我们用constructor来约定了传递参数，然后用作了一个add方法，把参数相加。这和以前我们的传递方法有些不一样，所以需要小伙伴们多注意下。|
--

- class的继承

|如果你学过java，一定知道类的一大特点就是继承。ES6中也就继承，在这里我们简单的看看继承的用法|
--

> class htmler extends Coder{
}
let pang=new htmler;
pang.name('技术胖');

|声明一个htmler的新类并继承Coder类，htmler新类里边为空，这时候我们实例化新类，并调用里边的name方法。结果也是可以调用到的。|
--

- promise对象的使用

|ES6中的promise的出现给我们很好的解决了回调地狱的问题，在使用ES5的时候，在多层嵌套回调时，写完的代码层次过多，很难进行维护和二次开发，ES6认识到了这点问题，现在promise的使用，完美解决了这个问题。那我们如何理解promise这个单词在ES5中的作用那，你可以想象他是一种承诺，当它成功时执行一些代码，当它失败时执行一些代码。它更符合人类的行为思考习惯，而不在是晦涩难懂的冰冷语言。|
--

|promise的基本用法|
--

> 
promise执行多步操作非常好用，那我们就来模仿一个多步操作的过程，那就以吃饭为例吧。要想在家吃顿饭，是要经过三个步骤的。

洗菜做饭。
坐下来吃饭。
收拾桌子洗碗。
这个过程是有一定的顺序的，你必须保证上一步完成，才能顺利进行下一步。我们可以在脑海里先想想这样一个简单的过程在ES5写起来就要有多层的嵌套。那我们现在用promise来实现。

> let state=1;
function step1(resolve,reject){
    console.log('1.开始-洗菜做饭');
    if(state==1){
        resolve('洗菜做饭--完成');
    }else{
        reject('洗菜做饭--出错');
    }
}
function step2(resolve,reject){
    console.log('2.开始-坐下来吃饭');
    if(state==1){
        resolve('坐下来吃饭--完成');
    }else{
        reject('坐下来吃饭--出错');
    }
}
function step3(resolve,reject){
    console.log('3.开始-收拾桌子洗完');
     if(state==1){
        resolve('收拾桌子洗完--完成');
    }else{
        reject('收拾桌子洗完--出错');
    }
}
new Promise(step1).then(function(val){
    console.log(val);
    return new Promise(step2);
}).then(function(val){
     console.log(val);
    return new Promise(step3);
}).then(function(val){
    console.log(val);
    return val;
});

|Promis在现在的开发中使用率算是最高的，而且你面试前端都会考这个对象，大家一定要掌握好|
--

|# 用Proxy进行预处理|
--

> 如果你学过我的Vue的课程，一定会知道钩子函数，那如果你刚接触我的博客，并没有学习Vue，那我这里给你简单解释一下什么是钩子函数。当我们在操作一个对象或者方法时会有几种动作，比如：在运行函数前初始化一些数据，在改变对象值后做一些善后处理。这些都算钩子函数，Proxy的存在就可以让我们给函数加上这样的钩子函数，你也可以理解为在执行方法前预处理一些代码。你可以简单的理解为他是函数或者对象的生命周期。
Proxy的应用可以使函数更加强大，业务逻辑更加清楚，而且在编写自己的框架或者通用组件时非常好用。Proxy涉及的内容非常多，那这里我就带你入门并且介绍给你后续的学习方法。

> 在学习新知识之前，先来回顾一下定义对象的方法。

>> var obj={
    add:function(val){
        return val+10;
    },
    name:'I am Jspang'
};
console.log(obj.add(100));
console.log(obj.name);

|声明了一个obj对象，增加了一个对象方法add和一个对象属性name，然后在控制台进行了打印。|
--

- 声明Proxy
> 我们用new的方法对Proxy进行声明。可以看一下声明Proxy的基本形式。

> new Proxy（{},{}）;

|需要注意的是这里是两个花括号，第一个花括号就相当于我们方法的主体，后边的花括号就是Proxy代理处理区域，相当于我们写钩子函数的地方|
--

> 现在把上边的obj对象改成我们的Proxy形式

> var pro = new Proxy({
    add: function (val) {
        return val + 10;
    },
    name: 'I am Jspang'
}, {
        get:function(target,key,property){
            console.log('come in Get');
            return target[key];
        }
    });
console.log(pro.name);

| get属性 |
--

> get属性是在你得到某对象属性值时预处理的方法，他接受三个参数

> target：得到的目标值
key：目标的key值，相当于对象的属性
property：这个不太常用，用法还在研究中，还请大神指教。
set属性

> set属性是值你要改变Proxy属性值时，进行的预先处理。它接收四个参数。

> target:目标值。
key：目标的Key值。
value：要改变的值。
receiver：改变前的原始值。
var pro = new Proxy({
    add: function (val) {
        return val + 10;
    },
    name: 'I am Jspang'
}, {
        get:function(target,key){
            console.log('come in Get');
            return target[key];
        },
        set:function(target,key,value,receiver){
            console.log(`    setting ${key} = ${value}`);
            return target[key] = value;
        }
    });
console.log(pro.name);
pro.name='技术胖';
console.log(pro.name);
apply的使用

> apply的作用是调用内部的方法，它使用在方法体是一个匿名函数时。看下边的代码。

> get = function () {
    return 'I am JSPang';
};
var handler = {
    apply(target, ctx, args) {
        console.log('do apply');
        return Reflect.apply(...arguments);
    }
}
var pro = new Proxy(target, handler);
console.log(pro());

|其实proxy的知识是非常多的，这里我建议看阮一峰大神的《ES6》。我这里只能算是入门课程，俗话说得好：“师傅领进门，修行靠个人”，那我们下节课见了。|
--

|#map数据结构#|
--
>map是一种灵活，简单的适合一对一查找的数据结构

|Json和map格式的对比,map的效率和灵活性更好|
--
> map的增删查
>>var map=new Map()
map.set('jspang',json);
map.get(json)
map.delete(json)
>>size属性
map.size
map.has('jspang') //查找是否存在has

>>map.clear() //清楚所有元素clear

|总结：map在现在开发中已经经常使用，它的灵活性和高效性是我们喜欢的|
--


# Set和WeakSet数据结构 #

>Set数据结构，注意这里不是数据类型，而是数据结构。它是ES6中新的东西，并且很有用处。Set的数据结构是以数组的形式构建的
>>let setArr = new Set(['jspang','技术胖','web','jspang']);

|Set和Array 的区别是Set不允许内部有重复的值，如果有只显示一个，相当于去重。虽然Set很像数组，但是他不是数组|
--

- Set值的增删查
>setArr.add('前端职场');
setArr.delete('前端职场');
- 用has进行值的查找，返回的是true或者false

>setArr.has('jspang'); //true
setArr.clear()  //删除clear

- set的循环 for…of…循环
>let setArr = new Set(['jspang','技术胖','web','jspang']);
for (let item of setArr){
    console.log(item);
}
- size属性可以获得Set值的数量
>setArr.size
- forEach循环
>setArr.forEach((value)=>console.log(value))

|WeakSet的声明|
--
>let weakObj=new WeakSet();
let obj={a:'jspang',b:'技术胖'}
weakObj.add(obj);
console.log(weakObj)
>>这里需要注意的是，如果你直接在new 的时候就放入值，将报错。
WeakSet里边的值也是不允许重复的，我们来测试一下
>>>let weakObj=new WeakSet();
let obj={a:'jspang',b:'技术胖'}
let obj1=obj;
weakObj.add(obj);
weakObj.add(obj1);
console.log(weakObj);
>>> 总结：在实际开发中Set用的比较多，WeakSet用的并不多，但是他对传入值必须是对象作了很好的判断，我们灵活应用还是有一定的用处的。

Symbol在对象中的作用
--
>我们通过场景应用的方式学习Symbol，它的意思是全局标记

>>看一下如何用Symbol构建对象的Key，并调用和赋值。

>>var jspang = Symbol();
var obj={
    [jspang]:'技术胖'
}
console.log(obj[jspang]);
obj[jspang]='web';
console.log(obj[jspang]);

- Symbol对象元素的保护作用

>在对象中有很多值，但是循环输出时，并不希望全部输出，那我们就可以使用Symbol进行保护。
没有进行保护的写法：

>var obj={name:'jspang',skill:'web',age:18};
for (let item in obj){
    console.log(obj[item]);
}

>现在我不想别人知道我的年龄，这时候我就可以使用Symbol来进行循环保护。

>let obj={name:'jspang',skill:'web'};
let age=Symbol();
obj[age]=18;
for (let item in obj){
    console.log(obj[item]);
} 

ES6中对象
--
>对象对于Javascript是非常重要的。在ES6中对象有了很多新特性。

- 对象赋值
>ES6允许把声明的变量直接赋值给对象，我们看下面的例子

>let name="jspang";
let skill= 'web';
var obj= {name,skill};
console.log(obj);  //Object {name: "jspang", skill: "web"}

- 对象Key值构建
>有时候我们会在后台取出key值，而不是我们前台定义好的，这时候我们如何构建我们的key值那。比如我们在后台取了一个key值，然后可以用[ ] 的形式，进行对象的构建。

>let key='skill';
var obj={
    [key]:'web'
}
console.log(obj.skill);

- 自定义对象方法
> 对象方法就是把兑现中的属性，用匿名函数的形式编程方法。这个在以前就有应用，我们这里只是简单的复习一下。

>var obj={
    add:function(a,b){
        return a+b;
    }
}
console.log(obj.add(1,2));  //3

- Object.is( ) 对象比较

> 对象的比较方法,以前进行对象值的比较，经常使用===来判断，比如下面的代码：

>var obj1 = {name:'jspang'};
var obj2 = {name:'jspang'};
console.log(obj1.name === obj2.name);//true

>那ES6为我们提供了is方法进行对比。

>var obj1 = {name:'jspang'};
var obj2 = {name:'jspang'};
console.log(obj1.name === obj2.name);//true
console.log(Object.is(obj1.name,obj2.name)); //true

- 区分=== 和 is方法的区别是什么，看下面的代码输出结果。

>console.log(+0 === -0);  //true
console.log(NaN === NaN ); //false
console.log(Object.is(+0,-0)); //false
console.log(Object.is(NaN,NaN)); //true

|这太诡异了，我要怎么记忆，那技术胖在这里告诉你一个小妙招，===为同值相等，is()为严格相等。|
--

|NaN代表的是无效结果，不是一个具体的确切值所以===比对是false|
--

- Object.assign( )合并对象

> 操作数组时我们经常使用数组合并，那对象也有合并方法，那就是assgin( )。看一下啊具体的用法。

>var a={a:'jspang'};
var b={b:'技术胖'};
var c={c:'web'};
let d=Object.assign(a,b,c)
console.log(d);

#ES6中的函数和数组补漏#
--

- 对象的函数解构

> 我们在前后端分离时，后端经常返回来JSON格式的数据，前端的美好愿望是直接把这个JSON格式数据当作参数，传递到函数内部进行处理。ES6就为我们提供了这样的解构赋值。

> let json = {
    a:'jspang',
    b:'技术胖'
}
function fun({a,b='jspang'}){
    console.log(a,b);
}
fun(json);

|是不是感觉方便了很多，我们再也不用一个个传递参数了。|
--

- 数组的函数解构

> 函数能解构JSON，那解构我们的数组就更不在话下了，我们看下边的代码。我们声明一个数组，然后写一个方法，最后用…进行解构赋值。

> let arr = ['jspang','技术胖','免费教程'];
function fun(a,b,c){
    console.log(a,b,c);
}
fun(...arr);

|in的用法
--

> in是用来判断对象或者数组中是否存在某个值的。我们先来看一下用in如何判断对象里是否有某个值。

- 对象判断

> let obj={
    a:'jspang',
    b:'技术胖'
}
console.log('a' in obj);  //true

- 数组判断

> 先来看一下ES5判断的弊端，以前会使用length属性进行判断，为0表示没有数组元素。但是这并不准确，或者说真实开发中有弊端。

> let arr=[,,,,,];
console.log(arr.length); //5

> 上边的代码输出了5，但是数组中其实全是空值，这就是一个坑啊。那用ES6的in就可以解决这个问题。

> let arr=[,,,,,];
console.log(0 in arr); //false
let arr1=['jspang','技术胖'];
console.log(0 in arr1);  // true

> 注意：这里的0指的是数组下标位置是否为空。

- 数组的遍历方法
> 1.forEach

> let arr=['jspang','技术胖','前端教程'];
arr.forEach((val,index)=>console.log(index,val));

> forEach循环的特点是会自动省略为空的数组元素，相当于直接给我们筛空了。当是有时候也会给我们帮倒忙。

> 2.filter

> let arr=['jspang','技术胖','前端教程'];
arr.filter(x=>console.log(x));

> 3.some

> let arr=['jspang','技术胖','前端教程'];
arr.some(x=>console.log(x));

> 4.map

> let arr=['jspang','技术胖','前端教程'];
console.log(arr.map(x=>'web'));

> map在这里起到一个替换的作用，这个我们后续课程会详细讲解。

> 数组转换字符串 在开发中我们经常会碰到把数组输出成字符串的形式，我们今天学两种方法，你要注意两种方法的区别。

- join()方法

> let arr=['jspang','技术胖','前端教程'];
console.log(arr.join('|'));

> join()方法就是在数组元素中间，加了一些间隔，开发中很有用处。

- toString()方法

> let arr=['jspang','技术胖','前端教程'];
console.log(arr.toString());

> 转换时只是是用逗号隔开了。

#ES6中的箭头函数和扩展
--

> 函数中的严谨模式

>我们在ES中就经常使用严谨模式来进行编程，但是必须写在代码最上边，相当于全局使用。在ES6中我们可以写在函数体中，相当于针对函数来使用。

> function add(a,b=1){
    'use strict'
    if(a == 0){
        throw new Error('This is error');
    }
     return a+b;
}
console.log(add(1));

> 上边的代码如果运行的话，你会发现浏览器控制台报错，这是ES6中的一个坑，如果没人指导的话，可能你会陷进去一会。这个错误的原因就是如果你使用了默认值，再使用严谨模式的话，就会有冲突，所以我们要取消默认值的操作，这时候你在运行就正常了。

#ES6中新增的数组知识
--

- Array.from()方法：

> let  json = {
    '0': 'jspang',
    '1': '技术胖',
    '2': '大胖逼逼叨',
    length:3
}
let arr=Array.from(json);
console.log(arr) // ["jspang", "技术胖", "大胖逼逼叨"]

> 实际开发中这种方法还是比较常用的，毕竟节省了我们代码行数，也让我们的程序更清晰

- Array.of()方法：

> let arr =Array.of(3,4,5,6);
console.log(arr); //  [3, 4, 5, 6]

> let arr =Array.of('技术胖','jspang','大胖逼逼叨');
console.log(arr);  //  ["技术胖", "jspang", "大胖逼逼叨"]

- find( )实例方法:

> let arr=[1,2,3,4,5,6,7,8,9];
console.log(arr.find(function(value,index,arr){
    return value > 5;
}))
> 控制台输出了6，说明找到了符合条件的值，并进行返回了，如果找不到会显示undefined。

- fill( )实例方法：

> let arr=[0,1,2,3,4,5,6,7,8,9];
arr.fill('jspang',2,5);
console.log(arr); //  [0, 1, "jspang", "jspang", "jspang", 5, 6, 7, 8, 9]

|上边的代码是把数组从第二位到第五位用jspang进行填充。|
--

|数组的遍历
--
- for…of循环：

> for (let item of arr){
    console.log(item);
}

> let arr=['jspang','技术胖','大胖逼逼叨']
for (let index of arr.keys()){
    console.log(index);
}

> 可以看到这时的控制台就输出了0,1,2，也就是数组的索引。

|同时输出数组的内容和索引：我们用entries()这个实例方法，配合我们的for…of循环就可以同时输出内容和索引了。|
--

> let arr=['jspang','技术胖','大胖逼逼叨']
for (let [index,val] of arr.entries()){
    console.log(index+':'+val);
}

|字符串模版 ``
--

> 字符串查找
> 查找是否存在:
> blog.includes(jspang)

- 判断开头是否存在：
> blog.startsWith(jspang);

- 判断结尾是否存在：

> blog.endsWith(jspang);

> document.write('jspang|'.repeat(3));  // 复制字符串

#ES6数字操作
--

> 二进制和八进制

>二进制和八进制数字的声明并不是ES6的特性，我们只是做一个常识性的回顾，因为很多新人小伙伴会把他们当成字符串或者不知道是什么，所以这算是赠送的知识点。

>二进制声明：

>二进制的英文单词是Binary,二进制的开始是0（零），然后第二个位置是b（注意这里大小写都可以实现），然后跟上二进制的值就可以了。

>let binary = 0B010101;
console.log(binary);
这时候浏览器的控制台显示出了21。

>八进制声明：

>八进制的英文单词是Octal，也是以0（零）开始的，然后第二个位置是O（欧），然后跟上八进制的值就可以了。
数字判断和转换

>数字验证Number.isFinite( xx )

>可以使用Number.isFinite( )来进行数字验证，只要是数字，不论是浮点型还是整形都会返回true，其他时候会返回false。

>let a= 11/4;
console.log(Number.isFinite(a));//true
console.log(Number.isFinite('jspang'));//false
console.log(Number.isFinite(NaN));//false
console.log(Number.isFinite(undefined));//false
NaN验证

>NaN是特殊的非数字，可以使用Number.isNaN()来进行验证。下边的代码控制台返回了true。

>console.log(Number.isNaN(NaN));
判断是否为整数Number.isInteger(xx)

>let a=123.1;
console.log(Number.isInteger(a)); //false
整数转换Number.parseInt(xxx)和浮点型转换Number.parseFloat(xxx)

>let a='9.18';
console.log(Number.parseInt(a)); 
console.log(Number.parseFloat(a));
整数取值范围操作

>整数的操作是有一个取值范围的，它的取值范围就是2的53次方。我们先用程序来看一下这个数字是什么.

>let a = Math.pow(2,53)-1;
console.log(a); //9007199254740991
在我们计算时会经常超出这个值，所以我们要进行判断，ES6提供了一个常数，叫做最大安全整数，以后就不需要我们计算了。

- 最大安全整数

>consolec .log(Number.MAX_SAFE_INTEGER);
最小安全整数

>console.log(Number.MIN_SAFE_INTEGER);
安全整数判断isSafeInteger( )

>let a= Math.pow(2,53)-1;
console.log(Number.isSafeInteger(a));//false
>let b=0o666;
console.log(b);
这时候浏览器的控制台显示出了438。

- 数字判断和转换

>数字验证Number.isFinite( xx )

>可以使用Number.isFinite( )来进行数字验证，只要是数字，不论是浮点型还是整形都会返回true，其他时候会返回false。

>let a= 11/4;
console.log(Number.isFinite(a));//true
console.log(Number.isFinite('jspang'));//false
console.log(Number.isFinite(NaN));//false
console.log(Number.isFinite(undefined));//false
- NaN验证

>NaN是特殊的非数字，可以使用Number.isNaN()来进行验证。下边的代码控制台返回了true。

>console.log(Number.isNaN(NaN));
判断是否为整数Number.isInteger(xx)

>let a=123.1;
console.log(Number.isInteger(a)); //false
整数转换Number.parseInt(xxx)和浮点型转换Number.parseFloat(xxx)

>let a='9.18';
console.log(Number.parseInt(a)); 
console.log(Number.parseFloat(a));
整数取值范围操作

>整数的操作是有一个取值范围的，它的取值范围就是2的53次方。我们先用程序来看一下这个数字是什么.

>let a = Math.pow(2,53)-1;
console.log(a); //9007199254740991
在我们计算时会经常超出这个值，所以我们要进行判断，ES6提供了一个常数，叫做最大安全整数，以后就不需要我们计算了。

- 最大安全整数

> consolec .log(Number.MAX_SAFE_INTEGER);
最小安全整数

> console.log(Number.MIN_SAFE_INTEGER);
安全整数判断isSafeInteger( )

>let a= Math.pow(2,53)-1;
console.log(Number.isSafeInteger(a));//false