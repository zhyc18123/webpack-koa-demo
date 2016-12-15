var http = require('http');
var parser = require('ua-parser-js');

parseUserAgent = function(ua){
    return parser(ua);
}

function* setUserAgent (next) {

    this.__defineGetter__('UA', function() {
        return parseUserAgent(this.get("user-agent"));
    });

    this.__defineGetter__('userBrowser', function() {
        return [this.UA["browser"]["name"], "/", this.UA["browser"]["version"]].join("");
    });

    yield next;
}

module.exports = {
    setUserAgent
}