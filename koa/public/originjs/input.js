
var analysisReport = require('./analysis-report');
var init=function(xinSwiper){
	// 初始化省份列表
	createProv();
	//监听选择省份
	$("#prov-down").on("click",function(){
		selectProv();
	});
	// 监听生成报告
	$("#get-report").on("click",function(){

		var data={
			req_id:"1111",
			exam_no:"XDF234324",
			province_id:"440000000000",
			score:"600",
			exp_sch_id:"52ac2e98747aec013fcf4c46",
			batch:1,
			wenli:2,
		};
		analysisReport.swipeToAnalysisReportPage(data,xinSwiper);
	});
};
var createProv=function(){
	var data={}
};
var selectProv=function(){

};
module.exports = {
    init:init
};
