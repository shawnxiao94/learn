var isDone = false;
var decliteral = 20;
var gexkuterak = 0x14;
var bingryLiteral = 20;
var octalLiteral = 20;
var name1 = 'bob';
var age = 30;
var sentence = "Hello, my name is " + name1;
var list = [1, 2, 3];
// let list:number[] = [1,2,3]
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var colorName = Color[2];
console.log(colorName, c);
