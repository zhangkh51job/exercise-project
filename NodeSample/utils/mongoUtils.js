
var dburl = require("../config").db;//数据库地址
var mongoose = require('mongoose'), Admin = mongoose.mongo.Admin;

exports.connect = function(callback) {
    try{
        mongoose.connect(dburl);
        var db = mongoose.connection;
        /*var db = mongoose.createConnection('127.0.0.1','scott_dev');*/
        db.on('error', console.error.bind(console,'连接错误:'));
        db.once('open',function(){
            //一次打开记录
            console.log('enter open')
            /*var obj = db.user.find();
            console.log(obj);*/
        });
    }catch (e){
        callback(e);
    }

};
exports.mongoObj = function(){
    return 	mongoose;
};

/// create a connection to the DB
exports.CreateConnection=function(callback,returnFunc){
    console.log('enter CreateConnection');
    var connection = mongoose.createConnection(dburl);

    connection.on('open', function() {
        callback(connection,Admin,returnFunc);
    });
};