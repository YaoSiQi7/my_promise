<!--
 * @Author: your name
 * @Date: 2020-08-06 10:18:29
 * @LastEditTime: 2020-08-06 10:19:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_promise\README.md
-->

# promise实现原理

promise有多种规范，promise/A、promise/B、promise/D、promise/A+
ES6中采用的时候规范的promise/A+

**状态**

一个promise的状态只有三种：等待状态pending、执行态fulfilled、拒绝态rejected
处于等待态：promise可以迁移到执行态或者拒绝态
处于执行态: promise不能迁移到其他状态，且必须拥有一个不可变的终值
处于拒绝态：promise不能迁移到其他状态，且必须拥有一个不可变的拒因

**代码结构**

构造函数：function Promise(executor){}
原型方法：
         Promise.prototype.then = function(){}
         Promise.prototype.catch = function(){}
静态方法：    
         Promise.resolve = function(){}
         Promise.then = function(){}
         Promise.reject = function(){}
         Promise.all = function(){}
         Promise.race = function(){}




