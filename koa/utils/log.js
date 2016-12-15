function log(){
    var args = Array.prototype.slice.call(arguments);

    args[0] = args[0].substring(args[0].lastIndexOf("/koa"));
    console.log(" \x1b[1m\x1b[33mDebug: \x1b[0m\x1b[33m[%s] %s\x1b[0m >>> \x1b[33m%s\x1b[0m", args[0], args[1], JSON.stringify(args[2] || "", null, 4));
}

function errLog () {
    var args = Array.prototype.slice.call(arguments);

    args[0] = args[0].substring(args[0].lastIndexOf("/koa"));
    console.log(" \x1b[1m\x1b[31mError:\x1b[0m\x1b[31m[%s] %s\x1b[0m >>> \x1b[31m%s\x1b[0m", args[0], args[1], JSON.stringify(args[2] || "unknown", null, 4));
}

module.exports = {
    log,
    errLog
}
