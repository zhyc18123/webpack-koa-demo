
import url from"./url";
import drawCanvas from './canvasGraph';
var Tpl = require('./utils/ejs');

var _init = (function () {
	// module scope variables
	var

		jqueryMap = {},

		setJqueryMap, onClickSchoolListItem, initModule;

	// UTILITY METHODS


	// DOM METHODS
	setJqueryMap = function () {
		jqueryMap = {
			$blackMasking: $("#modal-masking"),
			$schoolListItem: $(".school-list-item")
		};
	};


	onClickSchoolListItem = function() {
		alert(" onClickSchoolListItem ");
		jqueryMap.$blackMasking.removeClass("hide");
	};

	// PUBLIC METHODS
	initModule = function () {
		setJqueryMap();
		jqueryMap.$schoolListItem.click(onClickSchoolListItem);
	};

	return {
		initModule: initModule
	};

}());

var renderEjsTplWithData = function(tplId, htmlId, data) {
	var ejsTpl;
	var ejsHtml;
	var ejsOptions = {
		open:"<&",
		close:"&>"
	};

	ejsTpl = $(tplId).html();
	ejsHtml = Tpl.ejs(ejsTpl, data, ejsOptions);
	$(htmlId).html(ejsHtml);
};


/**
 *
 * selected default width for canvas
 * default size for font
 * @returns {string}
 */
function getFont(ratio) {
	var size = 640 * ratio;   // get font size based on current width
	return (size|0) + 'px sans-serif'; // set font
}

var _renderAnalysisReportPage = function (reportData) {


	reportData = {
		"code":0,//状态码,0-成功，-1-失败
		"score":600,//分数
		"rank":4000,//排名
		"rank_gap":1000,//排名差距
		"exp_sch":"中山大学",//目标学校
		"diploma_id":7,//学历 5-本科，7-专科
		"score_gap":30,//与目标学校分差值
		"adm_ratio":40,//录取概率
		"recommend_sch":"北京大学",//推荐学校
		"recommend_sch_num":38,//推荐学校数量
		"batch_name":"本科",//推荐学校的批次名称
		"choosed_sch":"四川大学",//相近分数的人中去向最多的学校
		"stu_count":1300,//学生人数
		"sch_min_score_list":[
			{
				"year":"2013",//年份
				"min_rank":2600//当年最低省排名
			},
			{
				"year":"2014",//年份
				"min_rank":2700//当年最低省排名
			},
			{
				"year":"2015",//年份
				"min_rank":2500//当年最低省排名
			},
			{
				"year":"你的排名",//用户的排名
				"min_rank":3000//用户排名
			}
		],
		"recommend_sch_list":[//推荐学校列表
			{
				"sch_id":"52ac2e98747aec013fcf4c46",//学校id
				"icon_url":"http://school-icon.b0.upaiyun.com/52ac2e98747aec013fcf4c1d.jpg",//学校图标识
				"sch_name":"北京大学",//学校名称
				"location":"北京",//所在省份
				"total_rank":1,//综合排名
				"adm_ratio":89//录取概率
			},
			{
				"sch_id":"52ac2e98747aec013fcf4c46",//学校id
				"icon_url":"http://school-icon.b0.upaiyun.com/52ac2e98747aec013fcf4c1d.jpg",
				"sch_name":"北京大学",//学校名称
				"location":"北京",//所在省份
				"total_rank":1,//综合排名
				"adm_ratio":89//录取概率
			}
		],
		"goto_schs_list":[
			{
				"sch_name":"四川大学",
				"stu_count":1160
			},
			{
				"sch_name":"电子科技大学",
				"stu_count":720
			}
		],
		"goto_majors_list":[
			{
				"major_name":"临床医学",
				"primary_name":"医学",
				"stu_count":124
			},
			{
				"major_name":"自动化",
				"primary_name":"工学",
				"stu_count":124
			}
		]

	};

	// 成绩与排名
	renderEjsTplWithData("#score-rank-tpl", "#score-rank-wrap", reportData);

	// 总结
	renderEjsTplWithData("#summary-items-tpl", "#summary-items-wrap", reportData);

	// 与目标学校的距离 —— 概率圆环
	var enrollCanvas = document.getElementById('enroll-canvas');
	var context = enrollCanvas.getContext('2d');
	var enrollCanvasParentNodeWidth = enrollCanvas.parentNode.clientWidth;
	enrollCanvas.width = enrollCanvasParentNodeWidth / 2 ;
	var enrollCanvasFont1=  getFont(0.04);
	var enrollCanvasFont2=  getFont(0.03);
	var enrollCanvasFont3=  getFont(0.02);

	enrollCanvas.height = enrollCanvas.width/1.5;
	var radius = enrollCanvas.width/4 ;
	var centerX = enrollCanvas.width / 2;
	var centerY = enrollCanvas.height / 2;
	drawCanvas.drawCircle(context, centerX, centerY, '#ffffff', '#e4e4e4', 22, radius, 1);
	drawCanvas.drawCircle(context, centerX, centerY, '#ffffff', '#f9be00', 25, radius, 0.4, 'round');
	context.textBaseline = 'middle';
	context.textAlign = "center";

	if (enrollCanvasParentNodeWidth >= 828){
		enrollCanvasFont1=  getFont(0.1);
		enrollCanvasFont2=  getFont(0.05);
		enrollCanvasFont3=  getFont(0.04);
	} else if (enrollCanvasParentNodeWidth >= 750){
		enrollCanvasFont1=  getFont(0.07);
		enrollCanvasFont2=  getFont(0.035);
		enrollCanvasFont3=  getFont(0.03);
	} else if (enrollCanvasParentNodeWidth >= 640){
		enrollCanvasFont1=  getFont(0.05);
		enrollCanvasFont2=  getFont(0.025);
		enrollCanvasFont3=  getFont(0.02);
	}

	// 分是否设立了目标学校两种情况讨论
	if (!reportData.exp_sch) {
		drawCanvas.drawCircleText(context, enrollCanvasFont3, '#b6b6b6', "未设立", centerX-2, centerY-12);
		drawCanvas.drawCircleText(context, enrollCanvasFont3, '#b6b6b6', '目标学校', centerX, centerY+18);
	} else {
		drawCanvas.drawCircleText(context, enrollCanvasFont1, '#f9be00', reportData.adm_ratio, centerX-15, centerY-15);
		drawCanvas.drawCircleText(context, enrollCanvasFont2, '#f9be00', '%', centerX+30, centerY-10);
		drawCanvas.drawCircleText(context, enrollCanvasFont3, '#b6b6b6', '录取概率', centerX, centerY+30);
	}



	// 与目标学校的距离 —— 建议
	renderEjsTplWithData("#gap-suggest-tpl", "#gap-suggest-wrap", reportData);


	// canvas 折线图 —— 往年该校录取最低省排名(如果设置了目标院校)
	/**
	 *  width: 100%;
	 *  max-width: 600px;
	 *  height: 500px;
	 *
	 **/


	// reportData.sch_min_score_list = 0;
	if (reportData.sch_min_score_list) {

		renderEjsTplWithData("#line-chart-wmzy-link-tpl", "#line-chart-wmzy-link-wrap", reportData);

		var lineChartCanvas = document.getElementById('line-chart-canvas'),
			context = lineChartCanvas.getContext('2d');
		lineChartCanvas.width = lineChartCanvas.parentNode.clientWidth ;
		lineChartCanvas.height = lineChartCanvas.parentNode.clientHeight*1.5;

		var startX = 0;
		var startY = 40;
		var widthMargin = lineChartCanvas.width/4;
		var labelWitth = widthMargin;
		var coordData;
		var lowestPercent = 1;
		var offsetY;
		var setCoordinateReturn;

		var yearColor = {
			dotColor: "#999999",
			lineColor:　"#999999"
		};
		var historyColor = {
			dotColor: "#f9be00",
			lineColor:　"#f9be00"
		};
		var currentColor = {
			dotColor: "#eb614c",
			lineColor: "#eda89d"
		};
		var lineChartFontStyle = "normal 32.3pt serif";
		setCoordinateReturn = drawCanvas.setCoordinate(reportData.sch_min_score_list, startX, startY, widthMargin, 400, lowestPercent);
		coordData = setCoordinateReturn[0];
		lowestPercent = setCoordinateReturn[1];

		offsetY = lowestPercent < 0.01 ? 140 :
			lowestPercent < 0.1 ? 130 : 50;

		drawCanvas.drawCoordinate(context, coordData, yearColor,historyColor, currentColor, labelWitth, lineChartCanvas.width, lineChartCanvas.height,
									40, offsetY, lineChartFontStyle);
		drawCanvas.drawLabel(context, coordData, 75, 8, 20, lineChartCanvas.height, offsetY, labelWitth, lineChartCanvas.width, lineChartFontStyle);

	}


	// 推荐学校列表
	renderEjsTplWithData("#school-list-item-tpl", "#school-list-item-wrap", reportData);


	// 录取人数最多的五个院校
	var canvas = document.getElementById('trapezoid-canvas');
	var trapezoidParentNodeWidth = canvas.parentNode.clientWidth;

	var trapezoidCount = reportData.goto_schs_list.length;
	canvas.width = trapezoidParentNodeWidth - 60;

	var context = canvas.getContext('2d');
	var width = canvas.width * (360 / 750);

	canvas.height = (canvas.width/2) * (64 / 286) * trapezoidCount + 10 * trapezoidCount + 55; // 286/750 为梯形宽度占比，64/286为高度占比， 50为每个梯形的间隙， 20为标题高度

	var height = width * (64 / 286);


	var trapezoidStyle = ["#f9be00", "#fac724", "#fbd149", "#fcda6d", "#fce392"],
		schoolNumNameStyle = {
			"numStyle": "#ffffff",
			"nameStyle": "#000000"
		},
		lineDotStyle = {
			"strokeStyle": "#ccdbe1",
			"fillStyle": "#ffffff"
		};

	drawCanvas.drawTrapezoid(context, width, height, reportData.goto_schs_list, trapezoidStyle, schoolNumNameStyle, lineDotStyle, "（考生数量）", 6, trapezoidParentNodeWidth);

	// 其他 x 所推荐院校
	renderEjsTplWithData("#recommend-school-link-tpl", "#recommend-school-link-wrap", reportData);

	// 根据排名的数据来源
	renderEjsTplWithData("#recommend-data-origin-tpl", "#recommend-data-origin-wrap", reportData);

	// 录取人数最多的五个专业，如果有的话
	renderEjsTplWithData("#top-five-enroll-major-tpl", "#top-five-enroll-major-wrap", reportData);


};

var swipeToAnalysisReportPage = function ( requestParam,xinSwiper ) {

	console.log("requestParam " + JSON.stringify(requestParam, null, 4));

	$.ajax({
		type: "post",
		cache: false,
		url: url.analysisReportUrl,
		data:requestParam,
		success: function(data) {
			console.log("data "+ JSON.stringify(data, null, 4));

			_renderAnalysisReportPage (data);
			xinSwiper.slideNext();
		},
		error:function() {
			_renderAnalysisReportPage ();
			_init.initModule();
			xinSwiper.slideNext();
			// alert("服务器错误！")
		}
	});

};
var swipeToWmzyIntroPage = function (xinSwiper) {

	$(".goto-wmzy-pro-intro").on("click", function () {
		xinSwiper.slideNext();
	});

};



module.exports = {
	swipeToAnalysisReportPage: swipeToAnalysisReportPage,
	swipeToWmzyIntroPage: swipeToWmzyIntroPage
};


