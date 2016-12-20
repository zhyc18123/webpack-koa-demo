
var swipeToAnalysisReportPage = require('./analysis-report');
var init=function(xinSwiper){
	$("#get-report").on("click",function(){
		var data={
			req_id:"",
			exam_no:"",
			province_id:"",
			score:"",
			exp_sch_id:"",
			batch:"",
		};
		swipeToAnalysisReportPage.swipeToAnalysisReportPage(data,xinSwiper);
	});
};
module.exports = {
    init:init
};