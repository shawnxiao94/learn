let isDone: boolean = false
let decliteral: number = 20
let gexkuterak: number = 0x14
let bingryLiteral: number = 0b10100
let octalLiteral: number = 0o24

let name1: string = 'bob'
let age: number = 30
let sentence = `Hello, my name is ${name1}`

let list: Array<number> = [1,2,3]
// let list:number[] = [1,2,3]

enum Color {
  Red,
  Green,
  Blue
}
let c:Color = Color.Green
let colorName:string = Color[2]
console.log(colorName,c)