
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
    var bodyData = JSON.parse(data.body);
    this.body = bodyData;
}

function* getSchoolDetail(){

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
    var bodyData = JSON.parse(data.body);
    this.body = bodyData;
}

module.exports = {
    getAnalysisReport: getAnalysisReport,
    getSchoolDetail:　getSchoolDetail
};