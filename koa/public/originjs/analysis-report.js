import url from"./url";
import drawCanvas from './canvasGraph';
import prov from "./loc.js";
var Tpl = require('./utils/ejs');

var REQUESTPARAM = {};

var _init = (function () {
	// module scope variables
	var

		jqueryMap = {},

		setJqueryMap, _toggleModalShow, _toggleModaHide, _renderSchoolItemDetail, onClickSchoolListItem,
		onClickCloseSchoolDetailBtn, initModule;

	// UTILITY METHODS
	_toggleModalShow = function() {
		jqueryMap.$blackMasking.removeClass("hide");
		jqueryMap.$schoolDetailModal.removeClass("hide");
	};

	_toggleModaHide = function() {
		jqueryMap.$blackMasking.addClass("hide");
		jqueryMap.$schoolDetailModal.addClass("hide");
	};

	_renderSchoolItemDetail = function (data) {
		_toggleModalShow();
		var ejsTpl;
		var ejsHtml;
		var ejsOptions = {
			open:"<&",
			close:"&>"
		};
		// var schoolData = {
		// 	"code": 0,
		// 	"msg": "",
		// 	"sch_id":"52ac2e98747aec013fcf4c46",//学校id
		// 	"icon_url":"http://school-icon.b0.upaiyun.com/52ac2e98747aec013fcf4c1d.jpg",//学校图标识
		// 	"sch_name":"北京大学",//学校名称
		// 	"city":"北京",//所在地区
		// 	"province":"广州",//用户所选省份
		// 	"total_rank":1,//综合排名
		// 	"adm_ratio":89,//录取概率
		// 	"sch_flag":[985,211],//985、211
		// 	"sch_type":['综合院校'],//学校类型
		// 	"sch_min_score_list":[
		// 		{
		// 			"year":"2013",//年份
		// 			"min_rank":2600//当年最低省排名
		// 		},
		// 		{
		// 			"year":"2014",//年份
		// 			"min_rank":2700//当年最低省排名
		// 		},
		// 		{
		// 			"year":"2015",//年份
		// 			"min_rank":2500//当年最低省排名
		// 		}
		// 	]
		// };

		var schoolData = data;

		ejsTpl = $("#school-list-item-modal-tpl").html();
		ejsHtml = Tpl.ejs(ejsTpl, schoolData, ejsOptions);
		console.log("ejsHtml >> " + ejsHtml);
		$("#school-list-item-modal-wrap").html(ejsHtml);

		if (schoolData.sch_min_score_list.length>0) {

			renderEjsTplWithData("#line-chart-wmzy-link-modal-tpl", "#line-chart-wmzy-link-modal-wrap", schoolData);

			var lineChartCanvas = document.getElementById('line-chart-modal-canvas'),
				context = lineChartCanvas.getContext('2d');
			lineChartCanvas.width = lineChartCanvas.parentNode.clientWidth ;
			lineChartCanvas.height = lineChartCanvas.parentNode.clientHeight*1.5;


			var startX = 0;
			var startY = 40;
			var widthMargin = lineChartCanvas.width/4;
			var labelWitth = widthMargin;
			var labelHeight=75;
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
			// alert(" the win.dpr " + window.dpr);
			var lineChartFontStyle = getFont(lineChartCanvas,0.03);
			var lineDotStyle = {};

			if (window.dpr) {
				startX = 20;
			} else if(window.dpr == 2){
				lineChartFontStyle = getFont(lineChartCanvas,0.04);
			}else if(window.dpr === 3){
				lineChartFontStyle = getFont(lineChartCanvas, 0.04);
			}


			setCoordinateReturn = drawCanvas.setCoordinate(schoolData.sch_min_score_list, startX, startY, widthMargin, 400, lowestPercent);
			coordData = setCoordinateReturn[0];
			lowestPercent = setCoordinateReturn[1];

			offsetY = lowestPercent < 0.01 ? 140 :
				lowestPercent < 0.1 ? 130 : 50;

			if(window.dpr == 1) {
				labelWitth = labelWitth/2;
				lineChartCanvas.height = lineChartCanvas.height / 2;
				startY = startY / 2;
				offsetY = offsetY / 2;
				labelHeight = labelHeight / 2;
				lineDotStyle.lineWidth = 1;
				lineDotStyle.dotRadius = 5;
			}

			drawCanvas.drawCoordinate(context, coordData, yearColor,historyColor, currentColor, labelWitth,
				lineChartCanvas.width, lineChartCanvas.height, startY, offsetY, lineChartFontStyle, lineDotStyle);
			drawCanvas.drawLabel(context, coordData, labelHeight, 8, 20, lineChartCanvas.height, offsetY, labelWitth,
				lineChartCanvas.width, lineChartFontStyle);

		}
	};

	// DOM METHODS
	setJqueryMap = function () {
		jqueryMap = {
			$blackMasking: $("#modal-black-masking"),
			$schoolListItem: $(".school-list-item"),
			$schoolDetailModal: $("#school-detail-modal"),
			$schoolDetailClose: $("#school-modal-close-btn")
		};
	};

	onClickSchoolListItem = function() {

		// alert("REQUESTPARAM " + JSON.stringify(REQUESTPARAM, null, 4));

		var schoolId = $(this).data("schoolid");

		// alert("schoolId " + schoolId);

		var param = {};
		param.reqId = REQUESTPARAM.req_id || "1111";
		param.schId = schoolId || "111";
		param.provinceId = REQUESTPARAM.province_id || "440000000000";
		param.wenli = REQUESTPARAM.wenli || "";
		param.batch = REQUESTPARAM.batch || "";

		$.ajax({
			type: "post",
			cache: false,
			url: url.getSchoolDetailUrl,
			data: param,
			success: function(data) {
				console.log("data "+ JSON.stringify(data, null, 4));
				_renderSchoolItemDetail(data);
			},
			error:function() {
				alert("服务器错误！");
				// _renderSchoolItemDetail();
			}
		});
	};

	onClickCloseSchoolDetailBtn = function() {
		_toggleModaHide();
		var schoolListItemModalHtml = '<script id="school-list-item-modal-tpl" type="text/template">'+
			'<img src="<&= data.icon_url&>" alt="学校logo" class="school-list-img">'+
			'<ul class="school-info">'+
			'<li class="school-name-loc" title="">'+
			'<span class="school-name"><&= data.sch_name&></span>'+
			'<span class="school-loc"><&= data.city&></span>'+
			'</li>'+
			'<li class="school-rank-probability">'+
			'<span class="school-rank"><em class="dot"></em>综合排名<em class="rank-num"><&= data.total_rank&></em></span>'+
			'<span class="enroll-probability"><em class="dot"></em>录取概率<em class="probability-num"><&= data.adm_ratio&>%</em></span>'+
			'</li>'+
			'<li class="school-label">'+
			'<span class="school-label-1"><&= data.sch_flag[0]&></span>'+
			'<span class="school-label-2"><&= data.sch_flag[1]&></span>'+
			'<span class="school-label-3"><&= data.sch_type[0]&></span>'+
			'</li>'+
			'</ul>'+
			'</script>';
		var schoolListLineChartModalHtml = '<script id="line-chart-wmzy-link-modal-tpl" type="text/template">'+
			'<& if(data.sch_min_score_list){ &>'+
			'<div class="line-chart-wrap">'+
			'<h3 class="line-chart-tiltle">往年该校录取最低省排名（广东-理科）</h3>'+
			'<canvas id="line-chart-modal-canvas"></canvas>'+
			'</div>'+
			'<&}&>'+
			'</script>';
		$("#school-list-item-modal-wrap").html(schoolListItemModalHtml);
		$("#line-chart-wmzy-link-modal-wrap").html(schoolListLineChartModalHtml);
	};

	// PUBLIC METHODS
	initModule = function () {
		setJqueryMap();
		jqueryMap.$schoolListItem.click(onClickSchoolListItem);
		jqueryMap.$schoolDetailClose.click(onClickCloseSchoolDetailBtn)
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
function getFont(canvas, ratio) {
	var size = canvas.width * ratio;  // get font size based on current width
	return (size|0) + 'px sans-serif'; // set font
}

var _renderAnalysisReportPage = function (reportData) {

	// 成绩与排名
	renderEjsTplWithData("#score-rank-tpl", "#score-rank-wrap", reportData);

	// 总结
	renderEjsTplWithData("#summary-items-tpl", "#summary-items-wrap", reportData);

	// 与目标学校的距离 —— 概率圆环
	var enrollCanvas = document.getElementById('enroll-canvas');
	var context = enrollCanvas.getContext('2d');
	var enrollCanvasParentNodeWidth = enrollCanvas.parentNode.clientWidth;
	enrollCanvas.width = enrollCanvasParentNodeWidth / 2 ;
	var enrollCanvasFontDpr1=  getFont(enrollCanvas, 0.2);
	var enrollCanvasFontDpr2=  getFont(enrollCanvas, 0.1);
	var enrollCanvasFontDpr3=  getFont(enrollCanvas, 0.06);

	enrollCanvas.height = enrollCanvas.width/1.5;
	var radius = enrollCanvas.width/4 ;
	var centerX = enrollCanvas.width / 2;
	var centerY = enrollCanvas.height / 2;
	var circleLineWidthInner = 4;
	var circleLineWidthOuter = 6;

	if (window.dpr ==1) {

	}

	if(window.dpr >= 2){
		circleLineWidthInner = 10;
		circleLineWidthOuter = 12;
		enrollCanvasFontDpr1=  getFont(enrollCanvas,0.2);
		enrollCanvasFontDpr2=  getFont(enrollCanvas,0.1);
		enrollCanvasFontDpr3=  getFont(enrollCanvas,0.06);
	}

	drawCanvas.drawCircle(context, centerX, centerY, '#ffffff', '#e4e4e4', circleLineWidthInner, radius, 1);
	drawCanvas.drawCircle(context, centerX, centerY, '#ffffff', '#f9be00', circleLineWidthOuter, radius, 0.4, 'round');
	context.textBaseline = 'middle';
	context.textAlign = "center";

	// 分是否设立了目标学校两种情况讨论
	if (reportData.exp_sch && reportData.adm_ratio) {
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr1, '#f9be00', reportData.adm_ratio, enrollCanvas.width*0.46, enrollCanvas.height*0.45);
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr2, '#f9be00', '%', enrollCanvas.width*0.62, enrollCanvas.height*0.5);
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', '录取概率', centerX, enrollCanvas.height*0.65);
	} else {
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', "未设立", centerX, enrollCanvas.height*0.5);
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', '目标学校', centerX, enrollCanvas.height*0.6);
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
	if (reportData.exp_sch && reportData.sch_min_score_list.length>1) {

		renderEjsTplWithData("#line-chart-wmzy-link-tpl", "#line-chart-wmzy-link-wrap", reportData);

		var lineChartCanvasClosestWidth;
		var lineChartCanvas = document.getElementById('line-chart-canvas'),
			context = lineChartCanvas.getContext('2d');
		lineChartCanvasClosestWidth = lineChartCanvas.parentNode.parentNode.clientWidth;

		// alert("lineChartCanvasParentNodeWidth " + lineChartCanvasClosestWidth );

		lineChartCanvas.width = lineChartCanvas.parentNode.clientWidth;
		lineChartCanvas.height = lineChartCanvas.parentNode.clientHeight*1.5;

		var startX = 0;
		var startY = 40;
		var widthMargin = lineChartCanvas.width/4;
		var labelWitth = widthMargin;
		var labelHeight=75;
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
		// alert(" the win.dpr " + window.dpr);
		var lineChartFontStyle = getFont(lineChartCanvas,0.03);
		var lineDotStyle = {};

		if (window.dpr) {
			startX = 20;
		} else if(window.dpr == 2){
			lineChartFontStyle = getFont(lineChartCanvas,0.04);
		}else if(window.dpr === 3){
			lineChartFontStyle = getFont(lineChartCanvas, 0.04);
		}


		setCoordinateReturn = drawCanvas.setCoordinate(reportData.sch_min_score_list, startX, startY, widthMargin, 400, lowestPercent);
		coordData = setCoordinateReturn[0];
		lowestPercent = setCoordinateReturn[1];

		offsetY = lowestPercent < 0.01 ? 140 :
			lowestPercent < 0.1 ? 130 : 50;

		if(window.dpr == 1) {
			labelWitth = labelWitth/2;
			lineChartCanvas.height = lineChartCanvas.height / 2;
			startY = startY / 2;
			offsetY = offsetY / 2;
			labelHeight = labelHeight / 2;
			lineDotStyle.lineWidth = 1;
			lineDotStyle.dotRadius = 5;
		}

		drawCanvas.drawCoordinate(context, coordData, yearColor,historyColor, currentColor, labelWitth,
			lineChartCanvas.width, lineChartCanvas.height, startY, offsetY, lineChartFontStyle, lineDotStyle);
		drawCanvas.drawLabel(context, coordData, labelHeight, 8, 20, lineChartCanvas.height, offsetY, labelWitth,
			lineChartCanvas.width, lineChartFontStyle, lineChartCanvasClosestWidth);

	}else{
		$("#line-chart-wmzy-pro-intro").addClass("hide");
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
		};
	var lineDotStyle = {
		"strokeStyle": "#ccdbe1",
		"fillStyle": "#ffffff"
	};
	var contextFontStyle, titleOffsetX;

	if (window.dpr ==1) {
		lineDotStyle.lineWidth = 1;
		lineDotStyle.dotRadius = 2;
	} else if (window.dpr==2){
		lineDotStyle.lineWidth = 2;
		lineDotStyle.dotRadius = 4;
	} else if(window.dpr==3){
		lineDotStyle.lineWidth = 3;
		lineDotStyle.dotRadius = 6;
	}

	contextFontStyle = getFont(canvas, 0.04);
	if (window.dpr == 3) { // 640 pixes phone
		titleOffsetX = 20;
	} else if (window.dpr == 2){
		titleOffsetX = 10;
	} else if(window.dpr ==1 ){
		titleOffsetX = 0;
	}

	drawCanvas.drawTrapezoid(canvas, context, width, height, reportData.goto_schs_list, trapezoidStyle,
		schoolNumNameStyle, lineDotStyle, contextFontStyle, titleOffsetX,"（考生数量）", 6);


	// 其他 x 所推荐院校
	if(reportData.recommend_sch_list.length>0){
		renderEjsTplWithData("#recommend-school-link-tpl", "#recommend-school-link-wrap", reportData);
	}else{
		renderEjsTplWithData("#recommend-school-link-tpl-none", "#recommend-school-link-wrap", reportData);
	}

	// 根据排名的数据来源
	renderEjsTplWithData("#recommend-data-origin-tpl", "#recommend-data-origin-wrap", reportData);

	// 录取人数最多的五个专业，如果有的话
	renderEjsTplWithData("#top-five-enroll-major-tpl", "#top-five-enroll-major-wrap", reportData);


};

var swipeToAnalysisReportPage = function ( requestParam, xinSwiper ) {

	var paramData  = {};

	paramData.reqId = requestParam.req_id || "1111";
	paramData.examNo = requestParam.exam_no || "111";
	paramData.provinceId = requestParam.province_id || "440000000000";
	paramData.wenli = requestParam.wenli || "";
	paramData.score = requestParam.score || "";
	paramData.expSchId = requestParam.exp_sch_id || "52ac2e98747aec013fcf4c46";
	paramData.batch = requestParam.batch || "";

	REQUESTPARAM = paramData;

	$.ajax({
		type: "post",
		cache: false,
		url: url.getAnalysisReportUrl,
		data: paramData,
		success: function(data) {
			console.log("data "+ JSON.stringify(data, null, 4));
			data.loc_provinc_name = prov.getProvinceName(paramData.provinceId);
			data.loc_wenli = REQUESTPARAM.wenli == 1 ? "理科" : "文科";

			_renderAnalysisReportPage(data);
			_init.initModule();
			xinSwiper.slideNext();
		},
		error:function() {
			alert("服务器错误！");
			// var testData = {
			// 	"code":0,//状态码,0-成功，-1-失败
			// 	"score":600,//分数
			// 	"rank":4000,//排名
			// 	"rank_gap":1000,//排名差距
			// 	"exp_sch":null,//目标学校
			// 	"diploma_id":7,//学历 5-本科，7-专科
			// 	"score_gap":30,//与目标学校分差值
			// 	"adm_ratio":40,//录取概率
			// 	"recommend_sch":"北京大学",//推荐学校
			// 	"recommend_sch_num":0,//推荐学校数量
			// 	"batch":1,//批次编号
			// 	"batch_name":"本科",//推荐学校的批次名称
			// 	"choosed_sch":"四川大学",//相近分数的人中去向最多的学校
			// 	"stu_count":1300,//学生人数
			// 	"sch_min_score_list":[
			// 		{
			// 			"year":"2013",//年份
			// 			"min_rank":2600//当年最低省排名
			// 		},
			// 		{
			// 			"year":"2014",//年份
			// 			"min_rank":2700//当年最低省排名
			// 		},
			// 		{
			// 			"year":"2015",//年份
			// 			"min_rank":2500//当年最低省排名
			// 		},
			// 		{
			// 			"year":"你的排名",//用户的排名
			// 			"min_rank":3000//用户排名
			// 		}
			// 	],
			// 	"recommend_sch_list":[//推荐学校列表
            //
			// 	],
			// 	"goto_schs_list":[
			// 		{
			// 			"sch_name":"四川大学",
			// 			"stu_count":1160
			// 		},
			// 		{
			// 			"sch_name":"电子科技大学",
			// 			"stu_count":720
			// 		}
			// 	],
			// 	"goto_majors_list":[
			// 		{
			// 			"major_name":"临床医学",
			// 			"primary_name":"医学",
			// 			"stu_count":124
			// 		},
			// 		{
			// 			"major_name":"自动化",
			// 			"primary_name":"工学",
			// 			"stu_count":124
			// 		}
			// 	]
            //
			// };
			// testData["loc_provinc_name"] = prov.getProvinceName(paramData.provinceId);
			// testData["loc_wenli"] = REQUESTPARAM.wenli == 1 ? "理科" : "文科";
			// _renderAnalysisReportPage(testData);
			// _init.initModule();
			// xinSwiper.slideNext();
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