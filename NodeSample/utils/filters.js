/**
 * Created by yangjie on 2017/5/11.
 */
exports.authenticate = function(url){
    var notFilterUlrs = ['/', '/onLogin'];
    for(var i = 0, leni = notFilterUlrs.length;i < leni;i++){
        if(url == notFilterUlrs[i]) return false;
    }
    // 资源路径不过滤
    if(/(.css$|.js$|.png$|.jpg$|.gif$)/ig.test(url)) return false;
    return true;
}