class xiaojiejie{
  protected name:string
  private age:number
  public sex:string
  constructor(name:string,age:number, sex:string){
    this.name = name
    this.age = age
    this.sex = sex
  }
  public sayhello(){
    console.log('小哥哥好')
  }
  protected saylove() {
    console.log('我爱你')
  }
}
let jiejie:xiaojiejie = new xiaojiejie('江一燕', 18, '女')
console.log(jiejie, jiejie.age, jiejie.name)
jiejie.sayhello()
jiejie.saylove()