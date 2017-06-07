/**
 * Created by yangjie on 2017/5/19.
 */

var zip = require('zlib');/*  zip的library库 简写 zlib */

var zzip = require('zlib').Zlib;
//console.log('zlib details:', zip);
console.log( typeof zip , typeof zzip )


var variable = 'zhangkanghua';
zip.gzip(variable, function(err, out){
    if(!err){
        /* output : eJxLTEouzkqpykjMS88G4ozSRABFuwdf */
        console.log( 'gzip compress: ', out.toString('base64') )
    }else{
        console.error( err );
    }
});

var zipCopy = zip.createDeflate();
console.log('zip.createDeflate details: ', zipCopy)
/*false && */zip.deflateRaw(variable, function(err, out){
    if(!err){
        /* output : eJxLTEouzkqpykjMS88G4ozSRABFuwdf */
        console.log( 'deflate compress: ', out.toString('base64') )
    }else{
        console.error( err );
    }
});
var buff = Buffer.from('H4sIAAAAAAAACqvKSMxLzwbijNJEAM7AxssMAAAA', 'base64');;
zip.unzip(buff, function(err, out){
    if(!err){
        /* output : zhangkanghua */
        console.log( 'decompress gzip data: ', out.toString() )
    }else{
        console.error( err );
    }
})
buff = Buffer.from('q8pIzEvPBuKM0kQA', 'base64');
zip.inflateRaw(buff, function(err, out){
    /* unzip可解压gzip deflate方式压缩的数据；从中看出 gzip压缩后数据更多，压缩比更高，效率要低  */
    /* 选择压缩数据，使用相应的解压函数解压：deflateRaw <--> inflateRaw */
    /* zlib.createFlate()等 返回一flate对象，可直接使用 stream.pipe(zlib.createFlate()).pipe(otherStream) */
    if(!err){
        /* output : zhangkanghua */
        console.log( 'decompress deflate data: ', out.toString() )
    }else{
        console.error( err );
    }
})


const buffer = Buffer.from('eJxLTEouzkqpykjMS88G4ozSRABFuwdf', 'base64');
zip.unzip(buffer, { finishFlush: zip.Z_SYNC_FLUSH }, function(err, out){
    if(!err){
        console.log( out.toString() );
    }else{
        console.error( err );
    }
})

setTimeout(function(){
    process.exit();
}, 500);

