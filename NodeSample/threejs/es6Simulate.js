/**
 * Created by yangjie on 2017/10/19.
 */
export function foo1(){

}
console.log('es6 module global', this);
function addShow(){
    console.log('new.target', new.target)
    this.cont = 0;
    this.add = function(){
        this.cont++;
        return this;
    }
    this.show = function(){
        console.log('addShow', this.cont)
    }
};
//new addShow();
class ParentClazz{}
class SonClazz extends ParentClazz{
    /* 默认的constructor中有 super(...arg);如显示声明，没有super，则报错 */
    /*constructor(){

    }*/
    //state = 2;
}
let son = new SonClazz();
let arr1 = [1,2, 3], arr2 = ['a', 'b', 'c'];
let variable = Array.prototype.push.apply(arr1, arr2);
console.log('es6simulate arr', arr1, variable, new (Date.bind.apply(Date, [null, null, 2015, null, 1, null, 1])));
console.log( 'es6Simulate', son.state );

window.fooid = 1;
let foo = function(){
    setTimeout(function(){console.log('fooid', this.fooid)}, 100)
};
foo.call({fooid:2})

let [a, ...rest] = [1, 'a', 'b'];
let arrayLike = {0:'a', 1:'b', 2:'c', length:3}, arrL = Array.from(arrayLike)
console.log('解构赋值', a, rest, Object.prototype.toString.call(arrL), arrL );
export /*{addShow() as addShowFn}*/let addShowFn = new addShow();

let recurTest = function(n){
    if( n <= 1) return 1;
    return recurTest(n-1) + recurTest(n-2);
};


function testable(target) {
    target.isTestable = true;
}
//@testable
class MyTestableClass {}
//console.log('decorator to class', MyTestableClass.isTestable) // true

var proxy = new Proxy({}, {
    get:function(t, p){
        return 35;
    }
});
console.log('proxy.name', proxy.name)
