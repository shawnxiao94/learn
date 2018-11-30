"use strict";
var age = 20;
var flag = false;
var sex;
(function (sex) {
    sex["nan"] = "\u7537";
    sex["nv"] = "\u5973";
    sex["yao"] = "\u5996";
    sex["type"] = "\u679A\u4E3E\u7C7B\u578B";
})(sex || (sex = {}));
var t = 10;
function say(age, s, shencai) {
    return '我年龄' + ("" + age) + 's' + s + (!!shencai ? shencai : '');
}
function sayhua() {
    var huayu = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        huayu[_i] = arguments[_i];
    }
    var y = '找到了';
    for (var i = 0; i < huayu.length; i++) {
        y = y + huayu[i];
        if (i < huayu.length) {
            y = y + '、';
        }
    }
    y = y + '的小姐姐';
    return y;
}
console.log('任意类型:', typeof t);
console.log(age, flag, sex, sex.type);
console.log(say(age, t, '大长腿'));
var result = sayhua('22岁', '大长腿', '瓜子脸', '水蛇腰');
console.log(result);
var yan = '刘德华';
function zhen() {
    var yan = '马德华';
    console.log('我变成了' + yan + '得样子');
}
zhen();
console.log(yan);
function zhengXing() {
    var yangzia = '刘德华';
    {
        var yangzib = '小沈阳';
        console.log('技术胖整形成了' + yangzib + '的样子');
    }
    console.log('技术胖整形成了' + yangzia + '的样子');
    console.log('技术胖整形成了' + yangzib + '的样子');
}
zhengXing();
