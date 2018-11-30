"use strict";
var xiaojiejie = /** @class */ (function () {
    function xiaojiejie(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    xiaojiejie.prototype.sayhello = function () {
        console.log('小哥哥好');
    };
    xiaojiejie.prototype.saylove = function () {
        console.log('我爱你');
    };
    return xiaojiejie;
}());
var jiejie = new xiaojiejie('江一燕', 18, '女');
console.log(jiejie, jiejie.age, jiejie.name);
jiejie.sayhello();
jiejie.saylove();
