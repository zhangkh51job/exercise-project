/**
 * Created by yangjie on 2017/5/10.
 */

var buff = Buffer.alloc(10, 1);
//buff = Buffer.allocUnsafe(10);
console.log( buff, 'a'.charCodeAt(0) );


/*  Buffer 对象的内存是被解析为一个明确元素的数组，而不是一个目标类型的字节数组。  */

var buff1 = Buffer.from('a'),
    buff2 = Buffer.from('A'), buff3 = Buffer.from('b');
var arr = [ buff1, buff2, buff3].sort(/*Buffer.compare*/);
for(var i = 0;i< 3;i++){
    console.log( arr[i]. toString() )
}

console.log( Math.pow(2, 24) + Math.pow(2, 16) + Math.pow(2, 8)  +Math.pow(2, 0) );

/* AudioContext 在客户端环境被支持, 该对象目前不再需要加载渲染内核标识  */
console.log( 'AudioContext is supported? ', typeof webkitAudioContext , typeof AudioContext )


var time = new Date().getTime();
console.log('print 1')
setImmediate(function(){console.log('pront 3', new Date().getTime() - time)})
setTimeout(function(){
    console.log('print 4', new Date().getTime() - time)
}, 0);
process.nextTick(function(){ /* process.nextTick在下一轮帧执行中，优先级最高 */
    console.log('print 5');
})
console.log('print 2')
process.env.test = 'haha'
console.log('current setting: ', process.platform, process.arch/*, process.release*/, process.getgid, process.env.test );
console.log('process values: ', process.cwd(), process.execPath, require('os').cpus().length);

/* threads_a_gogo --> tagg2 包可使nodejs 支持多线程  */
//cluster test
var cluster = require('cluster'), numCPUs = require('os').cpus().length;
console.log('cluster: ', cluster.isMaster)
for (let i = 0; i < 100; i++) {
    cluster.fork();
}
cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
});


/* close 是输入输出流被终止时，触发事件类型 */
process.on('exit', function(){
    console.log('addlistener exit event')
})


false && setTimeout(function() {
    /* 测试打印，自动关闭 */
//process.abort();  /* => process.exit(3) */
//process.exit(1002);
    process.exit();
}, 100)