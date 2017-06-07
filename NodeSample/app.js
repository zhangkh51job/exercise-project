var express = require('express')
    , mongoHelper = require("./utils/mongoUtils")
    , urlHelper = require("./routes.js")
    , http = require('http')
    , config = require("./config");

var session = require('express-session'),
    cookieParser = require('cookie-parser');

var filters = require('./utils/filters.js');


//
/*var cluster = require('cluster');//加载clustr模块
var numCPUs = require('os').cpus().length;//设定启动进程数为cpu个数
if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();//启动子进程
  }
} else {*/

  var app = express();

  app.engine('html', require('ejs').renderFile);

  app.configure(function(){
    app.set('port', config.port);
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.use(cookieParser());
    app.use(session({
      secret: '123456',
      name:'sessionid',
      cookie:{ maxAge:1000*1200, secure: false},
      resave: false,
      saveUninitialized: true
    }));

    /* 4.x 中间件单独分离了出来 */
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(function(req, res, next){ /* express 路由拦截要放在 app.use(app.router) 之前 */
      console.log('req.session.user:', req.session.user, req.originalUrl )
      if( req.originalUrl.indexOf('testFiles') != -1 ) {
        res.render('.'+req.originalUrl)
        return;
      }
      if(filters.authenticate(req.originalUrl) && !req.session.user){
        res.redirect('/');
        //res.render('./login.html',{message:"登录信息已失效，请重新登录！"});
        return;
      }
      next();
    })
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));

  });
  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  urlHelper.setRequestUrl(app);

  mongoHelper.connect(function(error){
    if (error) throw error;
  });
//mongoHelper.CreateConnection();
  app.on('close', function(errno) {
    mongoHelper.disconnect(function(err) { });
  });

  http.createServer(app).listen(app.get('port'), function(req, res){
    console.log("Express server listening on port " + app.get('port'));
  });
/*
}*/
