function* getAutoCode() {
    var body = this.request.body;
    var postdata = {};
    postdata.mobile = body.mobile;
    postdata.ip = body.ip||"";
    postdata.img_code = body.img_code||"";
    console.log("ddddddddddd",postdata)
    //请求存储接口
    var data = yield robot.req(robot.url.getAutoCode, postdata);
    console.log(data)
    var bodyData = JSON.parse(data.body);
    this.body = bodyData;
};
function* getVip() {
    var body = this.request.body;
    var postdata = {};
    postdata.mobile = body.mobile;
    postdata.ip = body.ip||"";
    postdata.img_code = body.img_code||"";
    console.log("ddddddddddd",postdata)
    //请求存储接口
    var data = yield robot.req(robot.url.getVip, postdata);
    console.log(data)
    var bodyData = JSON.parse(data.body);
    this.body = bodyData;
};
module.exports = {
	getAutoCode:getAutoCode,
            getVip:getVip
};