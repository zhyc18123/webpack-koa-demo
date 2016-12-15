var co = require("co");
var request = require("co-request");
module.exports = function* req(url, data, parent, ignore) {
    var reqOpt = {
        "url": url, //URL to hit
        "qs": data, //Query string data
        "method": 'POST', //Specify the method
        "headers": { //We can define headers too
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        "body": ""
    };
    var data = yield request(reqOpt);

    if(data.statusCode==404){
            if(ignore){
                return false;
            }else{
                parent.status=404;
            return data;
        }
    } else if (data.statusCode >= 500) {
        if (ignore) {
            return false;
        } else {
            throw new Error("{status:500}");
        }
    } else {
        return data;
    }
};