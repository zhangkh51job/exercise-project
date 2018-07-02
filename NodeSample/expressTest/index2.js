/**
 * Created by yangjie on 2017/5/11.
 */
/*var crypt = require('../utils/crypt.js');
 var crypto = require('crypto');
 console.log( crypt.encryptAes('123456', '123456'), crypt.decryptAes('f745b8abf736dc2b4e8db54b631a90e2', '123456') )

 var sha1 = crypto.createHash('sha1');
 sha1.update('foo');
 sha1.update('bar');
 console.log('foo + bar s sha1', sha1.digest('hex'));
 var sha1 = crypto.createHash('sha1');
 sha1.update('foobar');
 console.log('foobar s sha1', sha1.digest('hex'));*/

var a = function (c) {
    clearTimeout(a.t)
    a.list.push(c)
    a.flag = a === this
    a.t = setTimeout(() => {
        if (a.flag) a.list.reverse()
        while (a.list.length) {
            a.list.shift()()
        }
    }, 1);
    return a
}
a.list = []
a.a = a


/*setTimeout(function(){
 console.log(1);
 }, 0);

 new Promise(function executor(resolve){
 console.log(2);
 for(var i = 0; i < 1000; i++){
 /!*!//i = 9999 &&*!/ resolve();
 }
 console.log(3);
 }).then(function(){
 console.log(4);
 });*/


var d = new Date();

/*var promise1 = new Promise(function(resolve, reject) {
    //setTimeout(resolve, 1000, 'resolve from promise1');
    setTimeout(reject, 1000, 'reject from promise1');
});

var promise2 = promise1.then(function(result) {
    console.log('promise1.then(resolve):', result);
    return result;
}, function(error) {
    console.log('promise1.then(reject):', error);
    //throw new error('error test');
    return error;
});

promise2.then(
    result => console.log('result11:', result, new Date() - d),
    error => {console.log('error222:', error, new Date() - d);}
);*/


setTimeout(function () {
    console.log(1);
}, 0);

Promise.resolve(function () {
    console.log(2);
})

new Promise(function (resolve) {
    console.log(3);
});

console.log(4);

Promise.prototype.done = function(resolve, reject){
    this.then(resolve, reject).catch(function(error){
        setTimeout(function(){
            throw error;
        }, 0)
    })
};
new Promise(function(){
    console.log('a');
}).done(function(e){
    console.log('done', e)
});

var waitArr = [1, 4, 6, -2, 0, 3, 2];
var fastSort = function(arr){
    if( arr.length < 2) return arr;

    var mIndex =  arr.length/2 << 0;
    var middle = arr.splice(mIndex, 1)[0];

    var left = [], right = [];

    for(var i = 0, leni = arr.length;i < leni;i++){
        if(arr[i] < middle ) left.push( arr[i] );
        else right .push( arr[i] );
    }

    return fastSort( left ).concat( [middle], fastSort(right) );
};
console.log('fastSort', fastSort(waitArr) );
console.log( parseInt('17'), parseInt('27', 8), parseInt('17', 16) );

function red(){ console.log('redddd'); }
function green(){ console.log('greennnn') };
function yellow(){ console.log('yellowwww') };

var proxy = function(fn, time){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            fn();
            resolve();
        }, time)
    });
};
var step = function(promise){
    promise.then(function(){
        return proxy(red, 3000);
    }).then(function(){
        return proxy(green, 2000);
    }).then(function(){
        return proxy(yellow, 1000);
    }).then(function(){
        step(promise)
    })
};
/*step( new Promise(function(resolve, reject){
 resolve();
 }) );*/


const promise = new Promise((resolve, reject) => {
    console.log('a2')
    resolve();
    console.log('b2')
})
promise.then((resolve, reject) => {
    console.log('c2');
    resolve();
    console.log('e2');
})
console.log('d2')



const promise222 = new Promise((resolve, reject) => {
    //setTimeout(() => {
        console.log('once')
        resolve('success')
    //}, 1000)
})

/* 链式调用返回一个新的promise, 但重新调用都能拿到返回值 */
const start = Date.now()
promise222.then((res) => {
    console.log(res, Date.now() - start)
})
promise222.then((res) => {
    console.log(res, Date.now() - start)
})

/* return一个Error，并不会被捕捉 */
Promise.resolve()
    .then(() => {
        //return new Error('error!!!')
        //return Promise.reject(new Error('error!!!'))
        //throw new Error('error!!!')
    })
    .then((res) => {
        console.log('thenNNNNN: ', res)
    })
    .catch((err) => {
        console.log('catchHHHHH: ', err)
    })

Promise.resolve(1+'a')
.then(2)
.then(Promise.resolve(3))
.then(function(arg){
    console.log(arg)
})

Promise.prototype.finally = function(callback){
    var P = this.constructor;
    this.then(function(value){
        P.resolve(callback()).then(function(){
            return value
        })
    }, function(e){
        P.resolve(callback()).then(function(){
            throw e;
        })
    })
};
Promise.prototype.done = function(resolve, reject){
    this.then(resolve, reject).catch(function(e){
        setTimeout(function(){
            throw e;
        }, 0)
    })
}


Promise.resolve().then(() => console.log('zkh2'));
process.nextTick(() => console.log('zkh1'));
(() => console.log('zkh3'))();

const fs = require('fs');

fs.readFile('index.js', () => {
    setImmediate(() => console.log('zkh-----2'));
    setTimeout(() => console.log('zkh-----1'));
});

var a = 10;
var model = {
    a: 20,
    fn: function(){
        var a = 30;
        console.log( 'testa', this.a );
    }
};
model.fn();
model.fn.call(this);
(model.fn)()
new model.fn();
// 20, 10, 30, 10

console.log( 'compare', undefined === void 0, null == void 0, null == undefined );