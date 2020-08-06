/*
 * @Author: your name
 * @Date: 2020-07-28 18:22:48
 * @LastEditTime: 2020-08-06 16:49:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \promise\promise.js
 */
// Promise构造函数
function Primise(executor) {
  //初始状态
  this.state = 'pending';
  //成功之后必须有一个终值
  this.value = undefined;
  //失败之后必须有一个据因
  this.reason = undefinde
  //成功之后的回调函数集
  this.onFulfilledSucc = []
  //失败之后的回调函数集
  this.onRejectedFail = []
  var _this = this;
  function resolve(value) {
    if (_this.state === "pending") {
      _this.state = "fulFilled"
      _this.value = value
      //执行回调函数集中的函数
      _this.onFulfilledSucc.forEach(fun => {
        fun()
      })
    }
  }
  function reject(reason) {
    if (_this.state === "pending") {
      _this.state = "rejected";
      _this.reason = reason;
      //执行回调函数集中的函数
      _this.onRejectedFail.forEach(fun => {
        fun()
      })
    }
  }
  //executor执行发生错误，则直接reject
  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err)
  }
}
//resolvePromise
function resolvePromise(promise2, x, resolve, reject) {
  //如果X === promise2,则会造成循环引用
  if (x === promise2) {
    return reject(new TypeError("chaining cycle detected for promise "))
  }
  //防止多次调用
  var called;
  //x不是null 且是对象或者函数
  if (x != null && typeof x === "object" || typeof x === "function") {
    try {
      //把x.then赋值给 then
      var then = x.then
      //如果then是函数，就默认x是promise
      if (typeof then === "function") {
        //如果then是函数 x作为函数的作用域this调用then
        then.call(x, function (y) {
          //成功和失败只能调用一个
          if (called) return
          called = true;
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          resolvePromise(promise2, y, resolve, reject)
        }, function (r) {
          if (called) return
          called = true;
          //如果rejectPromise以据因r为参数被调用，则以据因r拒绝promise
          reject(r)
        }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      //如果取x.then的值时抛出错误e,则以e为据因拒绝promise
      if (called) return
      called = true
      reject(e)
    }
  } else {
    //如果x不为对象或者函数  以x为参数执行promise
    resolve(x)
  }
}
//实现then
Promise.prototype.then = function (onFulfilled, onRejected) {
  //如果不是传入的参数不是函数必须忽略
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : function (value) { return value }
  onRejected = typeof onRejected === "function" ? onRejected : function (err) { throw err }
  var _this = this;
  var promise2 = new Promise(function (resolve, reject) {
    if (_this.state === "fulfilled") {
      //规定 onFulfilled 或 onRejected 不能同步调用 必须异步调用
      setTimeout(() => {
        try {
          var x = onFulfilled(_this.value)
          //根据x的值修改promise2的状态
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0);
    }
    if (_this.state === "rejected") {
      setTimeout(() => {
        try {
          var x = onRejected(_this.reason);
          //根据x的值修改promise2的状态
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0);
    }
    if (_this.state === "pending") {
      //onFulfilled传入到成功时的回调函数集
      _this.onFulfilledSucc.push(function () {
        setTimeout(() => {
          try {
            var x = onFulfilled(_this.value)
            //根据x的值修改promise2的状态
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      })
      // onRejected传入到失败时的回调函数集
      _this.onRejectedFail.push(function () {
        setTimeout(() => {
          try {
            var x = onRejected(_this.reason)
            //根据x的值修改promise2的状态
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      })
    }
  })
  return promise2
}
//catch 
// Promise.prototype.catch方法是.then(null, rejection)或
// .then(undefined, rejection)的别名，用于指定发生错误时的回调函数
Primise.prototype.catch = function (fn) {
  return this.then(null, fn)
}
Promise.resolve = function (value) {
  return new Primise((resolve, reject) => {
    resolve(value)
  })
}
Promise.reject = function (reason) {
  return new Promise((resolve, relect) => {
    relect(reason)
  })
}
Promise.all = function (promises) {
  return new Primise((resolve, reject) => {
    var promiseLen = promises.length;
    var resolvedCounter = 0;
    var resolvedValues = new Array(promiseLen);
    for (let index = 0; index < promiseLen; index++) {
      (
        function (i) {
          Promise.resolve(promises[index].then(function (value) {
            resolvedCounter++;
            resolvedValues[index] = value;
            if (resolvedCounter === promiseLen) {
              return resolve(resolvedValues)
            }
          }), function (reason) {
            return reject(reason)
          })
        }
      )(i)
    }
  })
}
Promise.race=function(promises) {
  return new Promise(function(resolve,reject) {
    for (let index = 0; index < promises.length; index++) {
      Promise.resolve(promises[index].then(function (value) {
        return resolve(value)
      }),function (reason) {
        return reject(reason)
      })
    }
  })
}