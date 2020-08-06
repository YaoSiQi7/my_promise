/*
 * @Author: your name
 * @Date: 2020-08-05 18:27:16
 * @LastEditTime: 2020-08-06 17:34:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \promise\methods.js
 */
//----------原型方法 静态方法 实例方法--------
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

// -----------构造函数中变量的作用域-------------
//构造函数Person
function Person(name,sex) {
  this.name = name;
  var name1 = '22';
  name2 = sex
}
var person = new Person('qiqi','girl');
console.log(person.name) //qiqi
console.log(person.name1)//undefined
console.log(person.name2)//undefined
console.log(name2)//girl
console.log(window.name2)//girl
//构造函数中定义的变量：
// 加this 是成员变量(实例的变量)
// 使用var是局部变量
// 不加关键字是全局变量，会添加到window中