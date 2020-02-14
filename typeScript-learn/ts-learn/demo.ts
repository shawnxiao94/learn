/*
 * @Author: your name
 * @Date: 2020-01-20 14:29:29
 * @LastEditTime : 2020-01-21 15:09:22
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-learn\demo.ts
 */
interface Point {
  x: number;
  y: number;
}

function tsDemo(data: Point) {
  console.log("123");
  return Math.sqrt(data.x ** 2 + data.y ** 2);
}

tsDemo({ x: 1, y: 123 });

// 基础类型
// null,undefined,symbol,boolean,void
const count: number = 123;
const developName: string = "shawn";

// 对象类型

class Person {}

const teacher: {
  name: string;
  age: number;
  sex: string;
} = {
  name: "shawn",
  age: 18,
  sex: "man"
};

const numbers: number[] = [1, 2, 3];

const shawn: Person = new Person();

// const getTotal: () => number = () => {
//   return 123;
// };
function getTotal(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber;
}

// type annotation 类型注解, 我们来告诉TS变量是什么类型
// type interface 类型推断,TS 会自动去尝试分析变量的类型
// 如果TS能够自动分析变量类型，我们就什么也不需要做了
// 如果TS无法分析变量类型的话，我们就需要使用类型注释
let countt: number;
countt = 123;

let countInference = 123;

const total = getTotal(1, 2);

function add(first: number, second: number): number {
  return first + second;
}
add(1, 2);

// void类型为空，指示该函数没有返回值
function sayHello(): void {
  console.log("hello");
  // return "";
}

function errorEmitter(): never {
  throw new Error();
}

// 参数使用解构语法场景下的定义参数类型
function addt({ first, second }: { first: number; second: number }): number {
  return first + second;
}
const totalt = addt({ first: 1, second: 2 });

const arr: (number | string)[] = [1, "2", 3];
const stringArr: string[] = ["a", "b", "c"];
const undefinedArr: undefined[] = [undefined];

// type alias 类型别名
type User = {
  name: string;
  age: number;
};

class Teacher {
  name: string;
  age: number;
}

const objectArr: Teacher[] = [
  new Teacher(),
  {
    name: "dell",
    age: 28
  }
];

// 元组， tuple
const teacherInfo: [string, string, number] = ["Dell", "male", 18];
const teachList: [string, string, number][] = [
  ["dell", "male", 18],
  ["lii", "male", 19]
];

interface Person {
  // readonly name: string;
  name: string;
  age?: number;
}

const getPersonName = (person: Person): void => {
  console.log(person.name);
};
const setPersonName = (person: Person, name: string): void => {
  person.name = name;
};
const person = {
  name: "dell",
  sex: "male"
};
getPersonName(person);
setPersonName(person, "lee");
