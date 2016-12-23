function* guestSchool() {
    var body = this.request.body;
    var postdata = {};
    postdata.req_id = body.req_id||"";
    postdata.search_key = body.search_key||"";
    postdata.wenli = body.wenli||"";
    postdata.province_id = body.province_id||"";
    //请求存储接口
    try{
    var data = yield robot.req(robot.url.guestSchool, postdata,this,"","application/json;charset=UTF-8");
    }catch(err){
        console.log(err)
    };
    console.log(data)
    var bodyData = JSON.parse(data.body);
    this.body = bodyData;
};

module.exports = {
	guestSchool:guestSchool
};