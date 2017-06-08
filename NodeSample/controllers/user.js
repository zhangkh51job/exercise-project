"use strict";

var config = require('../config');
var userDBModel = require('../models/user.js');
var crypt = require('../utils/crypt.js');

var user =new userDBModel.Schema("user").model;

exports.login = function (req, res, next) {
    res.render('login.html',{message:""});
};
exports.authenticate = function(req, res, next){
    console.log('filter fn:',req.session.userName);
    next();
    /*if( !req.cookies['sessionid'] || !req.session.userName ){
        console.log('aaaaa')
        return;
    }
    console.log( req.cookies['sessionid'], crypt.decryptAes( req.cookies['sessionid'], '123456') );
    if(req.session.userName != crypt.decryptAes( req.cookies['sessionid'], '123456')){
        res.render('./login.html',{message:"登录信息已失效，请重新登录！"});
    }*/
}
exports.onLogin = function (req, res, next) {
    //var mdPassword=crypt.md5(req.body.password);
    var queryObj = {userName: req.body.userName, password: req.body.password};

    user.findOne(queryObj,function(err,userInfo){
        console.log('findOne result')
        if(err){

            res.render('./login.html',{message:"登陆失败！"});
        }else{
            if(userInfo){
                // express 重写了 nodejs 的response，不能直接res.setHttpHeader
                //res.setHttpHeader('Set-cookie', crypt.encryptAes(userInfo._id, '123456') )
                console.log( 'encryptAes sessionid: ', crypt.encryptAes(userInfo._doc['userName'], '123456') );
                req.session.user = userInfo._doc;
                console.log('req.session.user:', req.session.user,  req.session.user.userName)
                //res.cookie('sessionid', crypt.encryptAes(userInfo._doc['userName'], '123456'), { domain: 'localhost:3000', path: '/', secure: true });
                res.redirect("/index")
            }else{
                res.render('./login.html',{message:"用户名和密码错误！"});
            }
        }
    })
};
exports.addUser = function (){
    console.log('enter add user');
    var userEntity = new user();
    userEntity.userName = req.body.userName;
    //userEntity.password = crypt.md5(req.body.password);
    console.log('混淆的密码：', userEntity.password);
    userEntity.save(function (err,userInfo){
        if(userInfo){
            console.log('add user success');
            //res.render('./login.html',{message:"请用添加用户名密码登录！"});
            res.redirect('/user/userList');
        }
    })
};

exports.userList=function(req, res, next){
    user.find({},function(err,userList){
        res.render('./user/users.html',{userList:userList});
    });

};

exports.userManager = exports.userManager_up = function (req,res,next){
    var type = req.params['type'];

    var urlParam;
    if( req.method == 'POST'){
        urlParam = req['body'];
    }else{
        urlParam = (function(){
            var param = {};
            var url = req.originalUrl,
                urlParam = url.split('?')[1];
            if(!urlParam ) return param;
            var params = urlParam.split('&'), urlUnit;
            for(var i = 0, leni = params.length;i < leni;i++){
                urlUnit = params[i].split('=');
                if(urlUnit[0] && urlUnit[1]){
                    param[ urlUnit[0] ] = urlUnit[1];
                }
            }
            return param;
        })();
    }

    if(type == 'add'){
        res.render('./user/userManager.html', {user:{type: 'add'}})
    }
    else if(type == 'edit'){
        if(!urlParam['userName']){
            return next(new Error('userName field is undefined'))
        }
        user.findOne({userName: urlParam['userName'] },function(err, userInfo){
            if(err){

                return next(err)
            }else{
                var renderUserInfo = userInfo['_doc'];
                renderUserInfo.type = '!add';
                res.render('./user/userManager.html', {user: renderUserInfo} )
            }
        })
    }else if(type == 'update'){
        if(!urlParam['userName'] && !req.body['userName']){
            return next(new Error('userName field is undefined'))
        }
        user.update({userName: (/*/get/ig.test(req.method) ? urlParam:*/req.body)['userName'] }, {$set:{password: /*urlParam*/req.body['password'], email:req.body['email']}}, {upsert: true} ,function(err, userInfo){
            if(err){

                return next(err)
            }else{
                res.redirect('/user/userList');
            }
        })
    }
    else if(type == 'save'){
        if(!urlParam['userName'] || !urlParam['password']){
            return next(new Error('userName or password cannot be undefined'))
        }
        user.create(urlParam, function(error, row){
            if(error) return next(error);
            res.redirect('/user/userList');
        });
    }
    else if(type == 'delete'){
        if(!urlParam['userName']){
            return next(new Error('userName field is undefined'))
        }
        user.remove({userName: urlParam['userName'] },function(err, userInfo){
            if(err){
                return next(err)
            }else{
                res.redirect('/user/userList')
            }
        })
    }

};

