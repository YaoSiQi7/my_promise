<!--
 * @Author: your name
 * @Date: 2020-08-06 10:18:29
 * @LastEditTime: 2020-08-06 14:16:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_promise\README.md
-->

# promise实现原理

promise有多种规范，promise/A、promise/B、promise/D、promise/A+，
ES6中采用的时候规范的promise/A+

##状态
* 一个promise的状态只有三种：等待状态pending、执行态fulfilled、拒绝态rejected 
* 处于等待态：promise可以迁移到执行态或者拒绝态
* 处于执行态: promise不能迁移到其他状态，且必须拥有一个不可变的终值
* 处于拒绝态：promise不能迁移到其他状态，且必须拥有一个不可变的拒因

##代码结构
### 构造函数：function Promise(executor){} 
### 原型方法：
* Promise.prototype.then = function(){} 
* Promise.prototype.catch = function(){}
### 静态方法：    
* Promise.resolve = function(){}
* Promise.then = function(){}
* Promise.reject = function(){}
* Promise.all = function(){}
* Promise.race = function(){}

## then方法
一个promise必须提供一个then方法可以访问其当前值、终值和据因。promise的then方法接受两个参数：
### promise.then(onFulFilled,onRejected)
两个参数都是可选的参数：如果不是函数，必须被忽略
### promise必须返回一个promise对象：
promise2 = promise1.then(onFulfilled,onRejected);
### onFulfilled和onRejected不能同步调用，必须异步调用

##链式调用
then方法返回一个promise,如果想实现链式调用，需要把这个promise的值传递到下一个then中
### 如果在第一个then中返回了一个值X，需要对X进行判断，根据X的值来改变promise2的状态，判断X的函数叫做resolvePromise
* 如果onFulfilled或者onRejected返回一个值X，运行promise解决过程：[[Resolve]](promise2,x)
* 如果onFulfilled或者onRejected抛出一个异常e，promise2必须拒绝执行，并返回据因e
* 如果onFulfilled不是函数且promise1成功执行，promise2必须成功执行并返回相同的值
* 如果onRejected不是函数且promise1拒绝执行，promise2必须拒绝执行并返回相同的据因

## promise的解决过程
如果X为对象或者函数：
* 把X.then赋值给then
* 如果取X.then的值时抛出异常e,则以e为据因拒绝promise
* 如果then是函数，把X 作为函数的作用域this调用then
如果X不是对象或者函数：以X为参数执行promise