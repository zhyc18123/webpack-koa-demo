var co = require("co");
var request = require("co-request");
module.exports = function* req(url, data, parent, ignore,ContentType) {
    var reqOpt = {
        "url": url, //URL to hit
        "qs": "", //Query string data
        "method": 'POST', //Specify the method
        "headers":{},
        "body": JSON.stringify(data)
    };
    if(ContentType){
        reqOpt.headers["Content-Type"]=ContentType;
    };
    try{
        var data = yield request(reqOpt);
    }catch(err){
        console.log(err);
    }

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