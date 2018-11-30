var age:number = 20
var flag:boolean = false
enum sex {
  nan = '男',
  nv = '女',
  yao = '妖',
  type = '枚举类型'
}
var t:any = 10
function say(age:number,s:any,shencai?:string):string{
  return '我年龄' + `${age}` + 's' + s + (!!shencai ? shencai : '')
}

function sayhua(...huayu:string[]):string{
  let y:string = '找到了'
  for(let i=0; i< huayu.length; i++) {
    y = y + huayu[i]
    if(i< huayu.length) {
      y = y + '、'
    }
  }
  y = y + '的小姐姐'
  return y
}

console.log('任意类型:',typeof t)
console.log(age, flag, sex, sex.type)
console.log(say(age,t,'大长腿'))
let result:string = sayhua('22岁','大长腿','瓜子脸','水蛇腰')
console.log(result)

var yan:string = '刘德华'
function zhen():void{
  var yan:string= '马德华'
  console.log('我变成了' + yan + '得样子')
}
zhen()
console.log(yan)

function zhengXing():void{
  var yangzia:string = '刘德华'
  {
       let  yangzib:string = '小沈阳'
       console.log('技术胖整形成了'+yangzib+'的样子')
  }
   console.log('技术胖整形成了'+yangzia+'的样子')
   console.log('技术胖整形成了'+yangzib+'的样子')
}
zhengXing()