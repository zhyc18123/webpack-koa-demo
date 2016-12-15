var cluster = require('cluster');
var app = require("./app");
global.config = require("./config/config");

var server = {
    init: function() {
        if (cluster.isMaster) {
            this.serverStartLog();
            for (i = 0; i < config.numCPUs; i = i + 1) {
                cluster.fork();
            }
            cluster.on('death', function(worker) {
                console.log('Worker ' + worker.pid + ' died');
            });
        } else {
            app.init();
        }
    },
    serverStartLog: function() {
        console.log('\n\x1B[90mserver running %s:%s\nserver process %s\x1B[0m\n', config.hosts, config.port, config.numCPUs);
    }
};



if (config.debug) {
    app.init();
} else {
    server.init();
}
