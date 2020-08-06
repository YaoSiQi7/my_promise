/*
 * @Author: your name
 * @Date: 2020-08-05 18:27:16
 * @LastEditTime: 2020-08-05 18:44:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \promise\methods.js
 */
//构造函数Cat
function Cat(name) {
  this.name = name;
  //实例方法
  this.move = function () {
    console.log('move')
  }
  //实例方法
  this.eat = function() {
    console.log('eat')
  }
}
//这是静态方法(类方法)
Cat.showType = function () {
  console.log('我是静态方法，我是一类动物：猫')
}
//这是原型方法
Cat.prototype.call= function(){
  console.log('miao~miao~')
}
//创建一个Cat实例
let myCat = new Cat('snow')
myCat.eat()        //eat
myCat.move()       //move
myCat.showType()   //mycat.showType is not a function
myCat.call()       //miao~miao~

Cat.eat()        //Cat.eat is not a function
Cat.move()       //Cat.move is not a function
Cat.showType()   //我是静态方法，我是一类动物：猫
Cat.call()       // undefined
Cat.prototype.call() // miao~miao~
