'use strict';
/**
 * Module dependencies.
 */

var debug = require('debug')('koa-session-redis');
var thunkify = require('thunkify');
var redis = require('redis');
var sessionIdGenerator = require('../utils/sessionIdGenerator');

/**
 * Initialize session middleware with `opts`:
 *
 * - `key` session cookie name ["koa:sess"]
 * - all other options are passed as cookie options
 *
 * @param {Object} [opts]
 * @api public
 */
module.exports = function (opts) {
  var keySessionId, keyUId, client, redisOption, cookieOption;

  opts = opts || {};
  // sesisonid and uid
  keySessionId = opts.key_sessionid || 'koa:sess';
  keyUId = opts.key_uid || 'koa:uid';

  debug('key config is: %s', keySessionId, keyUId);

  //redis opts
  redisOption = opts.store || {};

  //cookies opts
  cookieOption = opts.cookie || {};
  cookieOption.path = "/";

  (cookieOption.overwrite === false) ? false : (cookieOption.overwrite = true);
  (cookieOption.httpOnly === false) ? false : (cookieOption.httpOnly = true);

  if( typeof cookieOption.maxage === "number" ){
    redisOption.ttl = cookieOption.maxage / 1000;
  }

  //redis client for session
  console.log("redisOption",redisOption)
  client = redis.createClient(
    redisOption
  );

  // client.select(redisOption.db, function () {
  //   debug('redis changed to db %d', redisOption.db);
  // });

  client.get = thunkify(client.get); // 普通回调转换成Generator接收的函数
  client.set = thunkify(client.set);
  client.del = thunkify(client.del);
  client.ttl = redisOption.ttl ? function expire(key) { client.expire(key, redisOption.ttl); }: function () {};

  return function *(next) {
    var sess, sid, uid, json;
    // to pass to Session()
    this.cookieOption = cookieOption;
    this.sessionKey = keySessionId;
    this.sessionId = null;

    sid = this.sessionId = this.cookies.get(keySessionId, cookieOption) || sessionIdGenerator.generateUid();
    uid = this.uid = this.cookies.get(keyUId, cookieOption) || sessionIdGenerator.generateUid();

    if (sid) {
      try {
        json = yield client.get(sid); // 根据sid取出session数据
      }catch (e) {
        debug('encounter error %s', e);
        json = null;
      }
    }

    if (json) { // 放入sess
      // this.sessionId = sid;
      debug('parsing %s', sid);
      try {
        sess = new Session(this, JSON.parse(json), client);
      } catch (err) {
        // backwards compatibility:
        // create a new session if parsing fails.
        // `JSON.parse(string)` will crash.
        if (!(err instanceof SyntaxError)) throw err;
        sess = new Session(this, null, client);
      }
    } else{ // 创建一个 sess
      debug('new session');
      sess = new Session(this, null, client);
    }

    this.__defineGetter__('session', function () {
      // already retrieved
      if (sess) return sess;
      // unset
      if (false === sess) return null;
    });

    this.__defineSetter__('session', function (val) {
      if (null === val) return sess = false;
      if ('object' === typeof val) return sess = new Session(this, val);
      throw new Error('this.session can only be set as null or an object.');
    });

    this._loadSession = function *loadSession (sid){
      json = yield client.get(sid);
      this.sessionId = sid;
      sess = new Session(this, JSON.parse(json), client);
      sess.save();
    };

    try {
      yield *next; // 把传入next函数指定为generator函数，就是一个generator里面嵌套一个generator
    } catch (err) { // 捕获下游的异常
      throw err;
    } finally {

      uid = this.session.uId = this.uid;
      sid = this.sessionId;
      if (undefined === sess) {
        // not accessed

      } else if (false === sess) {
        // remove
        this.cookies.set(keySessionId, '', cookieOption);
        this.cookies.set(keyUId, '', cookieOption);
        yield client.del(sid);
      } else if (!json && !sess.length) {
        // do nothing if new and not populated

      } else if (sess.changed(json)) {
        json = sess.save();
        yield client.set(sid, json);
        client.ttl(sid);
      }
    }
  };
};

/**
 * Session model.
 *
 * @param {Context} ctx
 * @param {Object} obj
 * @api private
 */

function Session(ctx, obj, client) {
  this._ctx = ctx;
  if (!obj) {
    this.isNew = true;
  } else {
    for (var k in obj) {
      this[k] = obj[k];
    }
  }
  if(client) this.client = client; // hack
}

/**
 * del redis's sess by other's sid
 *
 * @return {Object}
 * @api public
 */

Session.prototype.del = function (sid) {
  this.client.del(sid); // generator-base flow
};

/**
 * JSON representation of the session.
 *
 * @return {Object}
 * @api public
 */

Session.prototype.inspect =
  Session.prototype.toJSON = function () {
    var self = this;
    delete self.client;
    var obj = {};

    Object.keys(this).forEach(function (key) {
      if ('isNew' === key) return;
      if ('_' === key[0]) return;
      obj[key] = self[key];
    });

    return obj;
  };

/**
 * Check if the session has changed relative to the `prev`
 * JSON value from the request.
 *
 * @param {String} [prev]
 * @return {Boolean}
 * @api private
 */

Session.prototype.changed = function (prev) {
  if (!prev) return true;
  var that = this;
  delete that.client;
  this._json = JSON.stringify(that);
  return this._json !== prev;
};

/**
 * Return how many values there are in the session object.
 * Used to see if it's "populated".
 *
 * @return {Number}
 * @api public
 */

Session.prototype.__defineGetter__('length', function () {
  return Object.keys(this.toJSON()).length;
});

/**
 * populated flag, which is just a boolean alias of .length.
 *
 * @return {Boolean}
 * @api public
 */

Session.prototype.__defineGetter__('populated', function () {
  return !!this.length;
});

/**
 * Save session changes by
 * performing a Set-Cookie.
 *
 * @api private
 */

Session.prototype.save = function () {
  var that = this;
  delete that.client;
  var ctx = this._ctx,
    json = this._json || JSON.stringify(that),
    sid = ctx.sessionId,
    uid = ctx.uid,
    opts = ctx.cookieOption;

  debug('save');
  ctx.cookies.set("session_id", sid, opts);
  ctx.cookies.set("uid", uid, opts);

  return json;
};