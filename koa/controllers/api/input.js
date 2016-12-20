function* guestSchool() {
    var body = this.request.body;
    var postdata = {};
    postdata.req_id = body.req_id||"";
    postdata.search_key = body.search_key||"";
    postdata.wenli = body.wenli||"";
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

function* getAnalysisReport() {
    var body = this.request.body;

    var postdata = {};
    postdata["req_id"] = body.reqId || "";
    postdata["exam_no"] = body.examNo || "";
    postdata["province_id"] = body.provinceId || "";
    postdata["wenli"] = body.wenli || "";
    postdata["score"] = body.score || "";
    postdata["exp_sch_id"] = body.expSchId || "";
    postdata["batch"] = body.batch || "";

    //请求存储接口
    try {
        var data = yield robot.req(robot.url.getAyalysisReport, postdata, this, "", "application/json;charset=UTF-8");
    } catch (err) {
        console.log(err)
    }
    console.log("getAyalysisReport " + JSON.stringify(data, null, 4));
    var bodyData = JSON.parse(data.body);
    this.body = bodyData;
}
module.exports = {
	guestSchool:guestSchool,
    getAnalysisReport: getAnalysisReport
};