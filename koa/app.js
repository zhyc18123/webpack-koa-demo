var koa = require('koa');
var logger = require('koa-logger');
var favicon = require('koa-favicon');
var validate = require('koa-validate');
var render = require('koa-ejs');
var staticDir = require('koa-static');
var koaBody = require('koa-body');
var requireDir = require('require-dir');
var utils = requireDir("./utils");
var log4js = require('log4js');
var req = require("./controllers/api/public/req.js");
var url = require("./controllers/api/public/url.js");
var utilLog = require("./utils/log");
var color = require('colors');
global.log = require('log4js').getLogger('account.js');

module.exports = {

  init: function() {
try{
var app = koa();

    // init
    this.initApp(app);

    // 用户代理
    this.loadUserAgent(app);

    // 加载过滤器
    // this.loadError(app);
    this.loadLog(app);

    //this.loadRedisCache(app);

    // body解析
    this.loadBodyParse(app);

    //数据校验
    this.loadValidate(app);

    // 会话
    // app.use(session(app));
    // this.loadSession(app);

    // this.checkLogin(app);

    // gzip, static cache, logo icon
    this.loadGzipAndCache(app);

    // 路由
    this.loadRoute(app);

}catch(err){
  console.log(err)
}
    
    app.listen(config.port);

    console.log('app.js 服务启动: %s:%s'.green, config.hosts, config.port);
    console.log('app.js NODE_ENV = %s'.green, process.env.NODE_ENV);
  },

  initApp: function(app) {
    global.robot = {
      requireDir: requireDir,
      utils: utils,
      req: req,
      url: url,
      log: utilLog.log,
      errLog: utilLog.errLog,
      isLogin: false
    };

    // cookie 签名
    app.keys = [config.cookieKey];

    // ejs init
    render(app, {
      root: config.viewDir,
      layout: 'layout',
      viewExt: 'html',
      cache: false,
      debug: true,
      filters: require("./filter/index")
    });
  },

  loadUserAgent: function(app) {
    var userAgent = require('./middlewares/userAgent');
    app.use(userAgent.setUserAgent);
  },

  loadError: function(app) {
    var errorHanle = require('./middlewares/errorHandle');

    app.use(errorHanle.pageNotFound);
    app.use(errorHanle.serverError);
  },

  loadLog: function(app) {
    if (global.config.debug) {
      global.koaLogger = require('./middlewares/koaLogger');
      app.use(koaLogger(log4js.getLogger("http"), {
        level: 'auto'
      }));
    } else {
      var log = require('./middlewares/logger');
      app.use(log(global.config.debug, {}));
    }
  },

  loadBodyParse: function(app) {
    app.use(koaBody());
  },

  loadValidate: function(app) {
    app.use(validate());
  },

  loadSession: function (app) {

    var session = require('./middlewares/sessionRedis');

    app.use(session({
        store: config.redisOpt,
        key_uid: "uid",
        key_sessionid: "session_id",
        cookie: {
          httpOnly: false,
          maxage: config.expires
        }
      }
    ));
  },

  checkLogin: function(app) {
    var checkUserLogin = require('./middlewares/checkUserLogin');
    app.use(checkUserLogin.checkLoginLogic);
  },

  loadGzipAndCache: function(app) {
    app.use(require("koa-gzip")());

    // 静态文件cache
    app.use(staticDir(config.staticDir));

    // logo icon
    app.use(favicon(config.faviconDir, {
      // maxAge: 7 * 24 * 60 * 60 * 1000
    }));
  },

  loadRoute: function(app) {
    app.use(require(config.routerDir).routes());
  }
};
