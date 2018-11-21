#TypeScript#
-
- TypeScript是什么？
> TypeScript就是相当于JavaScript的增强版，但是最后运行时还要编译成JavaScript。TypeScript最大的目的是让程序员更具创造性，提高生产力，它将极大增强JavaScript编写应用的开发和调试环节，让JavaScript能够方便用于编写大型应用和进行多人协作。

- TypeScript和JavaScript的对比

> TypeScript是一个应用程序级的JavaScript开发语言。（这也表示TypeScript比较牛逼，可以开发大型应用，或者说更适合开发大型应用）

> TypeScript是JavaScript的超集，可以编译成纯JavaScript。**==这个和我们CSS离的Less或者Sass是很像的==**，我们用更好的代码编写方式来进行编写，最后还是有好生成原生的JavaScript语言。

> TypeScript跨浏览器、跨操作系统、跨主机、且开源。由于最后他编译成了JavaScript所以只要能运行JS的地方，都可以运行我们写的程序，设置在node.js里。

> TypeScript始于JavaScript，终于JavaScript。遵循JavaScript的语法和语义，所以对于我们前端从业者来说，学习前来得心应手，并没有太大的难度。

> TypeScript可以重用JavaScript代码，调用流行的JavaScript库。

> TypeScript提供了类、模块和接口，更易于构建组件和维护。

|TypeScript最大的一个特点就是变量是强类型的，也就是说，在声明变量的时候，我们必须给他一个类型。比如：字符串、数字、布尔，枚举........|
--

- TypeScript中的数据类型有：

> Undefined :

> Number:数值类型;

> string : 字符串类型;

> Boolean: 布尔类型；

> enum：枚举类型；

> any : 任意类型，一个牛X的类型；

> void：空类型；

> Array : 数组类型;

> Tuple : 元祖类型；

> Null ：空类型。

- Undefined类型

> 在js中当你定义了一个变量，但没有给他赋予任何值的时候，他就是Undefined类型。

- Number类型

> 在TypeScript中，所有的数字都是Number类型，这不分是整数还是小数。