import url from"./url";
import renderAnalysisReportPage from "./analysis-report";

function gotoAnalysisReportPage( requestParam ) {

	$.ajax({
		type: "post",
		cache: false,
		url: url.analysisReportUrl,
		data:requestParam,
		success: function(data) {
			console.log(data);

			renderAnalysisReportPage(data);
			xinSwiper.slideNext();
			}
		},
		error: function() {
			alert("服务器错误！")
		}
	});

}

module.exports = {
	getAnalysisReportData: gotoAnalysisReportPage
};
