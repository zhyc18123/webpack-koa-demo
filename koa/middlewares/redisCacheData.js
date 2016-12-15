var crypto = require('crypto');
var redis = require('redis');
var thunkify = require('thunkify');
var redisClient = null;

module.exports = function(redisOption,cacheOption){
    return new RedisCacheClient(redisOption,cacheOption);
}

function RedisCacheClient(redisOption,cacheOption){
    this.redisOption = redisOption;
    this.cacheTime = cacheOption.cacheTime;
    this.secret = cacheOption.secret;
    this.connet();
}

RedisCacheClient.prototype.connet = function(){
    redisOption = this.redisOption;
    robot.log(__filename, 'RedisCacheClient connet:redisOption', redisOption);
    if(redisClient){
        this.redisClient = redisClient;
        return redisClient;
    }

    //redis client for cache
    redisClient = redis.createClient(
        redisOption.port,
        redisOption.host,
        redisOption.options
    );

    var db = Math.max(redisOption.db-1,1);
    redisClient.select(db, function () {
        robot.log(__filename, 'redis changed to db', db)
    });

    redisClient.get = thunkify(redisClient.get); // 普通回调转换成Generator接收的函数
    redisClient.set = thunkify(redisClient.set);
    redisClient.del = thunkify(redisClient.del);
    redisClient.hset = thunkify(redisClient.hset);
    redisClient.hkeys = thunkify(redisClient.hkeys);

    this.redisClient = redisClient;
    return redisClient;
}

RedisCacheClient.prototype.getClient = function*(){
    var redisClient = this.redisClient;
    if(!redisClient){
        redisClient = yield this.connet();
    }

    return redisClient;
}

RedisCacheClient.prototype.hexKey = function(key){
    return crypto.createHash("md5").update(this.secret+key).digest('hex');
}

RedisCacheClient.prototype.save = function*(key,value){
    var redisClient = yield this.getClient();
    key = this.hexKey(key);
    value = JSON.stringify({v:value});

    yield redisClient.set(key,value);
    redisClient.expire(key,this.cacheTime);
}

RedisCacheClient.prototype.get = function*(key){
    var redisClient = yield this.getClient();
    key = this.hexKey(key);
    var value = yield redisClient.get(key);
    value = JSON.parse(value);
    value = value&&value.v;

    return value;
}