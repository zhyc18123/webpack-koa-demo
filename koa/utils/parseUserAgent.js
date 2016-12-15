var http = require('http');
var parser = require('ua-parser-js');

parseUserAgent = function(ua){
    return parser(ua);
}

module.exports = {
    parseUserAgent
}