/**
 * Created by yangjie on 2017/5/5.
 */
    var zzzzzzzzzzzkkkkkk;
var express = require('express')
    , http = require('http');

var session = require('express-session');


var mainApp = express(),
    sonApp = express(); // the sub app
mainApp.use(session({
    secret: '123456',
    name:'sessionid',
    cookie:{ maxAge:12000, secure: false},
    resave: false,
    saveUninitialized: true
}));



mainApp.all('*', function(req, res, next){
    if( !req.session.countObj ){
        req.session.countObj = {};
        req.session.countObj.count = 0;
    }
    req.session.countObj.count ++;
    console.log('req.session.countObj.count: ', req.session.countObj.count)
    next();
})

sonApp.get('/', function(req, res){
    console.log('进入子路由 admin 的根目录 ');

});
sonApp.get('/:param', function (req, res) {
    console.log(sonApp.mountpath, res.headersSent); // /admin
    res.send('sonApp Homepage: '+ req.params['param'] );
    console.log('headersSend, ', res.headersSent)
    res.end();
    console.log('headersSend, ', res.headersSent)
})
sonApp.param('param', function(req, res, next){/* param 用于获取路径参数，而非http动作的参数 */
    console.log('enter get param p');
    next();
})
sonApp.get('/:param/main', function(req, res){
    console.log('headersSend, ', res.headersSent)
    res.set('Content-Type', 'text/html')
    res.format({
        'text/plain': function(){
            res.send('hey');
        },

        'text/html': function(){
            res.send('<p>hey</p>');
        },

        'application/json': function(){
            res.send({ message: 'hey' });
        },

        'default': function() {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable');
        }
    });
    res.send('enter son main page2');
    console.log('headersSend, ', res.headersSent)
})
console.log('mainApp reference: ', mainApp)
mainApp.use('/admin', sonApp);
mainApp.get('/main', function(req, res, next){
    //res.send('enter parent main page1')
    console.log( 'it is mainApp reference? ', req.app == mainApp, res.app == mainApp)
    console.log('enter parent main page1, ', req.route)
    next(/*'/admin'*/);
}, function(req, res, next){
    //res.send('enter parent main page2')
    console.log('enter parent main page2')
    next(/*'/admin/aaa'*/);
});
mainApp.get('/main', function(req, res){
    //res.redirect('http://www.baidu.com')
    console.log( 'req.setHeader 是否被复写', typeof req.setHeader ,typeof  res.writeHead)
    res.send('output main page')
});

const filterFn1 = function(req, res, next){
    console.log('enter filterFn1 ')
    //next();
}
const filterFn2 = function(req, res, next){
    console.log('enter filterFn2 ');
    //next();
}
//mainApp.all('*', filterFn1, filterFn2)

mainApp.set('port', 80 )
http.createServer(mainApp).listen(mainApp.get('port'), function(){
    console.log("Express server listening on port " + mainApp.get('port'));
});