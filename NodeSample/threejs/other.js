/**
 * Created by yangjie on 2017/9/28.
 */
function timeout( ms ) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}
timeout(100).then((value) => {
    console.log(value);
});
var promise = new Promise(function(resolve, reject) {
    //resolve('ok');
    /*setTimeout(function() {*/ throw new Error('test') /*}, 0)*/
    resolve('ok');
});
promise.catch(function(e){
    console.log(e)
}).then(function(data){
    console.log('end1')
}).then(function(data){
    throw new Error('test2')
}).then(function(data){
    console.log('end3')
}).catch(function(e){
    console.log(e)
    throw new Error('test3')
}).catch(function(e){
    console.log(e)
    //throw new Error('test3')
});

const f = () => console.log('now');
console.log('next');
var readFile = function(data){
    console.log( data );
}
var asyncReadFile = async function () {
    var f1 = await readFile('/etc/fstab');
    var f2 = await readFile('/etc/shells');
    console.log(f1/*.toString()*/);
    console.log(f2/*.toString()*/);
};
asyncReadFile();

function* testGeneratorFn(){
     yield 'z';
     yield 'k';
     //yield 'h';
     //return 'e';
 };
var it = testGeneratorFn();
console.log( it.next(), it.next(), it.next() , it.next() )
console.log( it[Symbol.iterator]()  === it)

/*  f已经在上文中 const 方式命名了  */
function* a(){
    for(var i = 0;true;i++){
        var reset = yield i;
        if(reset){
            i = -1;
        }
    }
}
var itf = a();
console.log('yield return', itf.next(), itf.next(), itf.next(true), itf.next(true) );

/* generator函数无记忆储值功能  */
var y, z;
function* foo(x) {
     y = 2 * (yield (x + 1));
     z = yield (y / 3);
    return (x + y + z);
}
var fooIt = foo(5);
console.log('fooIt', fooIt.next(), fooIt.next(), fooIt.next(), fooIt.next())

function * generatorNumbers(){
    yield 1;yield 2;return 3;
}
console.log( 'array.from test', Array.from(generatorNumbers()))


let generator1 = (function* (){
    yield 'he';
    yield* 'llo';
}());
console.log('generator1 test----------', generator1.next(), generator1.next(),generator1.next(),generator1.next());

let generator2 = (function*(){
    console.log('generator2 test start');
    yield console.log('generator2 test excuting1');
    yield console.log('generator2 test excuting2');
}());
//generator2.next()
generator2.next();

async function asytimeout(ms){
    return new Promise(function(resolve, reject){
        setTimeout(resolve, ms);
    });
}
async function asyncPrint(str, ms){
    await asytimeout(ms);
    console.log(str);
}
asyncPrint('hello', 2000);

setTimeout(function(){
    console.log('seq one');
}, 0);
async function seqfun(){
    return  'seq two'
};
console.log( seqfun().then(function(value){
    console.log(value);
}) );
console.log('seq three')

var typeArr = new Int16Array(10), comArr = new Array(10);
console.log('typedarray', typeArr[0], comArr[0], typeArr.byteLength);
var typeArr2 = new Int16Array([1, 2, 3, 258 ,1, 2, 3, 258,1, 2, 3, 258])
console.log('typedarray2', typeArr2[0], typeArr2[1], typeArr2[2], typeArr2[3], typeArr2.byteLength)


console.log( 'Math.pow', Math.pow(1.1, 4)*15 , 5*Math.random()<<0   /*,SIMD.Float32x4(-1, -2, 3, 0)*/ );

$('textarea').on('focusin focusout', function(e){
    $(this).css({'border':'1px solid '+e.type=='focusin'?'#ff0000':'a9a9a9'})
});
console.log('_self', self)
//Object.defineProperties()