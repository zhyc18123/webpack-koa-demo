
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
    postdata["source"] = body.source || "";

    //请求存储接口
    try {
        console.log(postdata)
        var data = yield robot.req(robot.url.getAyalysisReport, postdata, this, "", "application/json;charset=UTF-8");
    } catch (err) {
        console.log(err)
    }
    var bodyData = JSON.parse(data.body);
    this.body = bodyData;
}

function* getSchoolDetail(){

    var body = this.request.body;

    console.log("body>>>>>>>>>>>>>>>>>>>>> ", JSON.stringify(body, null, 4));

    // param.reqId = REQUESTPARAM.req_id || "1111";
    // param.schId = schoolId || "111";
    // param.provinceId = REQUESTPARAM.province_id || "440000000000";
    // param.wenli = REQUESTPARAM.wenli || "";
    // param.batch = REQUESTPARAM.batch || "";

    var postdata = {};
    postdata["req_id"] = body.reqId || "";
    postdata["sch_id"] = body.schId || "";
    postdata["province_id"] = body.provinceId || "";
    postdata["wenli"] = body.wenli || "";
    postdata["batch"] = body.batch || 2;

    console.log("postdata>>>>>>>>>>>>>>>>>>>>> ", JSON.stringify(postdata, null, 4));


    //请求存储接口
    try {
        var data = yield robot.req(robot.url.getSchoolDetail, postdata, this, "", "application/json;charset=UTF-8");
    } catch (err) {
        console.log(err)
    }
    var bodyData = JSON.parse(data.body);
    this.body = bodyData;
}

module.exports = {
    getAnalysisReport: getAnalysisReport,
    getSchoolDetail:　getSchoolDetail
};