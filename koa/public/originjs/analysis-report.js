
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
				"sch_name":"北京大学",//学校名称
				"location":"北京",//所在省份
				"total_rank":1,//综合排名
				"adm_ratio":89//录取概率
			},
			{
				"sch_id":"52ac2e98747aec013fcf4c46",//学校id
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
	var radius = 70;
	enrollCanvas.width = enrollCanvas.parentNode.clientWidth ;
	enrollCanvas.height = enrollCanvas.width-60;
	var centerX = enrollCanvas.width / 2;
	var centerY = enrollCanvas.height / 2;
	drawCanvas.drawCircle(context, centerX, centerY, '#ffffff', '#e4e4e4', 8, radius, 1);
	drawCanvas.drawCircle(context, centerX, centerY, '#ffffff', '#f9be00', 10, radius, 0.4, 'round');
	context.textBaseline = 'middle';
	context.textAlign = "center";

	// 分是否设立了目标学校两种情况讨论
	if (!reportData.exp_sch) {
		drawCanvas.drawCircleText(context, 'normal 0.16rem serif', '#b6b6b6', "未设立", centerX-2, centerY-12);
		drawCanvas.drawCircleText(context, 'normal 0.16rem serif', '#b6b6b6', '目标学校', centerX, centerY+18);
	} else {
		drawCanvas.drawCircleText(context, 'normal .36rem serif', '#f9be00', reportData.adm_ratio, centerX-10, centerY-16);
		drawCanvas.drawCircleText(context, 'normal .18rem serif', '#f9be00', '%', centerX+35, centerY-10);
		drawCanvas.drawCircleText(context, 'normal .16rem serif', '#b6b6b6', '录取概率', centerX, centerY+22);
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


	reportData.sch_min_score_list = 0;
	if (reportData.sch_min_score_list) {

		renderEjsTplWithData("#line-chart-wmzy-link-tpl", "#line-chart-wmzy-link-wrap", reportData);

		var canvas = document.getElementById('line-chart-canvas'),
			context = canvas.getContext('2d');
		canvas.width = canvas.parentNode.clientWidth ;
		canvas.height = canvas.parentNode.clientHeight-50;

		var startX = 0;
		var startY = 40;
		var widthMargin = canvas.width/4;
		var labelWitth = widthMargin;
		var coordData;
		var lowestPercent = 1;
		var offsetY;

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
		coordData = drawCanvas.setCoordinate(reportData.sch_min_score_list, startX, startY, widthMargin, 400, lowestPercent);

		offsetY = lowestPercent < 0.01 ? 80 :
			lowestPercent < 0.1 ? 50 : 30;

		drawCanvas.drawCoordinate(context, coordData, yearColor,historyColor, currentColor, 20, labelWitth, canvas.width, canvas.height, offsetY);
		drawCanvas.drawLabel(context, coordData, 36, 8, 20, canvas.height, offsetY, labelWitth, canvas.width);

	}




	// 录取人数最多的五个院校
	var canvas = document.getElementById('trapezoid-canvas');
	var trapezoidParentNodeWidth = canvas.parentNode.clientWidth;

	canvas.width = trapezoidParentNodeWidth - 60;
	canvas.height = canvas.width * (300 / 750) * (64 / 300) * 5 + 50 + 35; // 286/750 为梯形宽度占比，64/286为高度占比， 50为每个梯形的间隙， 20为标题高度
	var context = canvas.getContext('2d');
	var contextFontStyle;
	var width = canvas.width * (360 / 750);

	if (trapezoidParentNodeWidth >= 640) {
		contextFontStyle = "normal normal 24px serif";
		width = canvas.width * (420 / 750);
		canvas.height = canvas.width * (420 / 750) * (64 / 300) * 5 + 50 + 35;
	} else if (trapezoidParentNodeWidth >= 414) {
		contextFontStyle = "normal normal 20px serif";
		width = canvas.width * (360 / 750);
		canvas.height = canvas.width * (360 / 750) * (64 / 300) * 5 + 50 + 35;
	} else if (trapezoidParentNodeWidth >=320) {
		contextFontStyle = "normal normal 16px serif";
		width = canvas.width * (320 / 750);
		canvas.height = canvas.width * (320 / 750) * (64 / 300) * 5 + 50 + 35; // 286/750 为梯形宽度占比，64/286为高度占比， 50为每个梯形的间隙， 20为标题高度

	}else{
		contextFontStyle = "normal normal 16px serif";
		width = canvas.width * (320 / 750);
		canvas.height = canvas.width * (320 / 750) * (64 / 300) * 5 + 50 + 35; // 286/750 为梯形宽度占比，64/286为高度占比， 50为每个梯形的间隙， 20为标题高度
	}
	var height = width * (64 / 286);

	var schoolData = [{"studentNumber": 319000, "schoolName": "中山大学"},
		{"studentNumber": 100, "schoolName": "华南理工大学"},
		{"studentNumber": 80, "schoolName": "华南理工大学"},
		{"studentNumber": 50, "schoolName": "华南理工大学"},
		{"studentNumber": 9, "schoolName": "华南理工大学"}];
	var trapezoidStyle = ["#f9be00", "#fac724", "#fbd149", "#fcda6d", "#fce392"],
		schoolNumNameStyle = {
			"numStyle": "#ffffff",
			"nameStyle": "#000000"
		},
		lineDotStyle = {
			"strokeStyle": "#ccdbe1",
			"fillStyle": "#ffffff"
		};

	drawCanvas.drawTrapezoid(context, width, height, schoolData, trapezoidStyle, schoolNumNameStyle, lineDotStyle, "（考生数量）", 6, contextFontStyle);
};

var swipeToAnalysisReportPage = function ( requestParam,xinSwiper ) {

	$.ajax({
		type: "post",
		cache: false,
		url: url.analysisReportUrl,
		data:requestParam,
		success: function(data) {
			console.log(data);

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

module.exports = {
	swipeToAnalysisReportPage: swipeToAnalysisReportPage
};


