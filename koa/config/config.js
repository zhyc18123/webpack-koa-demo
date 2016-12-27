var env = process.argv.slice(2);
if(env[0] === "release") {
    var debug = false;
    var redisHost = "192.168.1.42";
    var redisPort = 6379;
}else{
    var debug = true;
    var redisHost = "192.168.1.42";
    var redisPort = 6379;
};


var os = require('os'),
    numCPUs = os.cpus().length > 16 ? 16 : os.cpus().length,
    path = require("path"),
    MAX_CONNECTIONS = 20,
    MIN_CONNECTIONS = 1;

var getHostIpAddress = function() {
    var interfaces = os.networkInterfaces();
    var addresses = [];

    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses[0];
};

var config = {
    "name": "新东方",
    hosts: getHostIpAddress() || "0.0.0.0",
    port: 3005, // 端口
    numCPUs: numCPUs,
    debug: debug,
    "cookieKey": "sf8dsfasd8sd7fsda8a123bbrc23ch41", //cookie 签名
    "expires": 7 * 24 * 60 * 60 * 1000, // 7Day
    "routerDir": "./router/", // 路由所在目录
    "viewDir": path.join(__dirname, "..", "views"), // 模板所在的目录
    "logDir": path.join(__dirname, "..", "/log"), // log所在的目录
    "staticDir": path.join(__dirname, "..", "/public/"), // 静态文件所在的目录
    "faviconDir": path.join(__dirname, "..", "/public/faicon.ico"), // logo icon 所在目录
    "interfaceStatus": "online", // 接口状态
    "localIp": "http://192.168.1.81:28086",
    "xinSearchIp": "http://192.168.1.83:9999",
    "res": {
        "title": "新东方",
        "keywords": "",
        "description": "",
        "styles": [],
        "scripts": [],
        "header": true,
        "navbar": false,
        "footer": true,
        "pluginUrl":false,
        "staticVersion": "v=0.1",
        "mode": ""
    },
    redisOpt:{
        host: redisHost,
        port: redisPort,
        db:10,
        password:"ipinredis",
        timeout:3000
    }
};

module.exports = config;
