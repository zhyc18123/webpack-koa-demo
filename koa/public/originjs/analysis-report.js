import url from"./url";
import drawCanvas from './canvasGraph';
import prov from "./loc.js";
import chgUrl from "./change-url";
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

		var schoolData = data;
		schoolData.loc_provinc_name = REQUESTPARAM.loc_provinc_name;
		schoolData.loc_wenli = REQUESTPARAM.loc_wenli;

		ejsTpl = $("#school-list-item-modal-tpl").html();
		ejsHtml = Tpl.ejs(ejsTpl, schoolData, ejsOptions);
		console.log("ejsHtml >> " + ejsHtml);
		$("#school-list-item-modal-wrap").html(ejsHtml);

		if (schoolData.sch_min_score_list.length>1) {
			var schMinScoreList = [];

			renderEjsTplWithData("#line-chart-wmzy-link-modal-tpl", "#line-chart-wmzy-link-modal-wrap", schoolData);

			var lineChartCanvas = document.getElementById('line-chart-modal-canvas'),
				context = lineChartCanvas.getContext('2d');

			lineChartCanvas.width = lineChartCanvas.parentNode.clientWidth;
			lineChartCanvas.height = lineChartCanvas.parentNode.clientHeight*1.5;
			var startX = 0;
			var startY = 40;
			var widthMargin = lineChartCanvas.width/4;
			var labelWidth = widthMargin;
			var coordData;
			var lowestPercent = 1;
			var offsetY;
			var setCoordinateReturn;
			var triangleSide = 20;
			var labelBorderRadius = 10;
			var labelHeight;

			var yearColor = {
				dotColor: "#999999",
				lineColor:　"#dadada"
			};
			var historyColor = {
				dotColor: "#f9be00",
				lineColor:　"#f9be00"
			};
			var currentColor = {
				dotColor: "#eb614c",
				lineColor: "#eda89d"
			};
			var lineChartFontStyle = getFont(lineChartCanvas,0.04);
			var lineDotStyle = {
				lineWidth: 2,
				dotRadius: 8
			};

			if (window.dpr==1) {
				startX = 20;
			} else if(window.dpr == 2){
				lineChartFontStyle = getFont(lineChartCanvas,0.04);
			}else if(window.dpr === 3){
				lineChartFontStyle = getFont(lineChartCanvas, 0.04);
			}

			var schMinScoreList = [];
			var schoolDataListLen = schoolData.sch_min_score_list.length;
			if(schoolDataListLen >0){
				schMinScoreList = schoolData.sch_min_score_list;
				schMinScoreList.push({
					"year":"你的排名",//用户的排名
					"min_rank":REQUESTPARAM.rank//用户排名
				});
			}

			setCoordinateReturn = drawCanvas.setCoordinate(schMinScoreList, startX, startY, widthMargin, 400, lowestPercent);
			coordData = setCoordinateReturn[0];
			lowestPercent = setCoordinateReturn[1];

			offsetY = lowestPercent < 0.01 ? 140 :
				lowestPercent < 0.1 ? 130 : 100;

			if(window.dpr == 1) {
				labelWidth = labelWidth/2;
				lineChartCanvas.height = lineChartCanvas.height / 2;
				startY = startY / 2;
				offsetY = offsetY / 2;
				lineDotStyle.lineWidth = 1;
				lineDotStyle.dotRadius = 5;
				triangleSide = 5;
				labelBorderRadius /= 2;
			}

			drawCanvas.drawCoordinate(context, coordData, yearColor,historyColor, currentColor, labelWidth,
				lineChartCanvas.width, lineChartCanvas.height, startY, offsetY, lineChartFontStyle, lineDotStyle, window.dpr);

			context.font = lineChartFontStyle;
			labelHeight = context.measureText("排").width*2;
			drawCanvas.drawLabel(context, coordData, labelHeight, labelBorderRadius, startY, lineChartCanvas.height, offsetY,
				labelWidth, lineChartFontStyle, lineDotStyle, triangleSide);

		}
	};

	// DOM METHODS
	setJqueryMap = function () {
		jqueryMap = {
			$blackMasking: $("#modal-black-masking"),
			$schoolListItem: $(".school-list-item-btn"),
			$schoolDetailModal: $("#school-detail-modal"),
			$schoolDetailClose: $("#school-modal-close-btn")
		};
	};

	onClickSchoolListItem = function() {

		var schoolId = $(this).data("schoolid");
		var schoolRankNum = $(this).data("ranknum");
		var schoolAdmratio = $(this).data("admratio");
		var param = {};
		param.reqId = REQUESTPARAM.reqId || "";
		param.schId = schoolId || "";
		param.provinceId = REQUESTPARAM.provinceId || "";
		param.wenli = REQUESTPARAM.wenli || "";
		param.batch = REQUESTPARAM.batch || "";

		$.ajax({
			type: "post",
			cache: false,
			url: url.getSchoolDetailUrl,
			data: param,
			success: function(data) {
				console.log("data "+ JSON.stringify(data, null, 4));
				data.total_rank = schoolRankNum;
				data.adm_ratio = schoolAdmratio;
				_renderSchoolItemDetail(data);
				
			},
			error:function() {
				alert("服务器错误！");
			}
		});
	};

	onClickCloseSchoolDetailBtn = function() {
		_toggleModaHide();
		var schoolListItemModalHtml =
			'<script id="school-list-item-modal-tpl" type="text/template">'+
			'<img src="<&= data.icon_url&>" alt="学校logo" class="school-list-img">'+
			'<ul class="school-info">'+
			'<li class="school-name-loc" title="">'+
			'<span class="school-name"><&= data.sch_name&></span>'+
			'<span class="school-loc"><&= data.city&></span>'+
			'</li>'+
			'<li class="school-rank-probability">'+
			'<&if(data.total_rank){&>'+
			'<span class="school-rank"><em class="dot"></em>综合排名<em class="rank-num"><&= data.total_rank&></em></span>'+
			'<&}&>'+
			'<&if(data.adm_ratio){&>'+
			'<span class="enroll-probability"><em class="dot"></em>录取概率<em class="probability-num"><&= data.adm_ratio&>%</em></span>'+
			'<&}&>'+
			'</li>'+
			'<li class="school-label">'+
			'<&if(data.sch_flag.length >= 1){&>'+
			'<span class="school-label-1"><&= data.sch_flag[0]&></span>'+
			'<&if(data.sch_flag[1]){&>'+
			'<span class="school-label-2"><&= data.sch_flag[1]&></span>'+
			'<&}&>'+
			'<&}&>'+
			'<&if(data.sch_type.length > 0){&>'+
			'<span class="school-label-3"><&= data.sch_type[0]&></span>'+
			'<&}&>'+
			'</li>'+
			'</ul>'+
			'</script>';
		var schoolListLineChartModalHtml =
				'<script id="line-chart-wmzy-link-modal-tpl" type="text/template">'+
				'<& if(data.sch_min_score_list){ &>'+
				'<div class="line-chart-wrap">'+
				'<h3 class="line-chart-tiltle">往年该校录取最低省排名&nbsp;<&= data.loc_provinc_name&> — <&= data.loc_wenli&></h3>'+
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
	return (size|0) + 'px 微软雅黑'; // set font
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

	if(window.dpr >= 2){
		circleLineWidthInner = 10;
		circleLineWidthOuter = 12;
		enrollCanvasFontDpr1=  getFont(enrollCanvas,0.2);
		enrollCanvasFontDpr2=  getFont(enrollCanvas,0.1);
		enrollCanvasFontDpr3=  getFont(enrollCanvas,0.06);
	}

	drawCanvas.drawCircle(context, centerX, centerY, '#ffffff', '#e4e4e4', circleLineWidthInner, radius, 1);
	if (reportData.exp_sch && reportData.adm_ratio!=null && reportData.adm_ratio>=0) {
		drawCanvas.drawCircle(context, centerX, centerY, '#ffffff', '#f9be00', circleLineWidthOuter, radius, reportData.adm_ratio/100, 'round');
	}
	context.textBaseline = 'middle';
	context.textAlign = "center";

	// 分是否设立了目标学校,概率是否存在 三种情况讨论
	if (reportData.exp_sch && reportData.adm_ratio!=null && reportData.adm_ratio>=0) {
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr1, '#f9be00', reportData.adm_ratio, enrollCanvas.width*0.46, enrollCanvas.height*0.45);
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr2, '#f9be00', '%', (""+reportData.adm_ratio).length>1?enrollCanvas.width*0.62:enrollCanvas.width*0.58, enrollCanvas.height*0.5);
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', '录取概率', centerX, enrollCanvas.height*0.65);
	} else if(reportData.exp_sch == null){
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', "未设立", centerX, enrollCanvas.height*0.48);
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', '目标学校', centerX, enrollCanvas.height*0.6);
	}else{
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', "暂无", centerX, enrollCanvas.height*0.48);
		drawCanvas.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', '录取概率', centerX, enrollCanvas.height*0.6);
	}

	// 与目标学校的距离 —— 建议
	renderEjsTplWithData("#gap-suggest-tpl", "#gap-suggest-wrap", reportData);

	/**
	 * canvas 折线图 —— 往年该校录取最低省排名(如果设置了目标院校)
	 *  width: 100%;
	 *  max-width: 600px;
	 *  height: 500px;
	 **/

	if (reportData.exp_sch && reportData.sch_min_score_list.length>1) {

		renderEjsTplWithData("#line-chart-wmzy-link-tpl", "#line-chart-wmzy-link-wrap", reportData);

		var lineChartCanvas = document.getElementById('line-chart-canvas'),
			context = lineChartCanvas.getContext('2d');

		lineChartCanvas.width = lineChartCanvas.parentNode.clientWidth;
		lineChartCanvas.height = lineChartCanvas.parentNode.clientHeight*1.5;
		var startX = 0;
		var startY = 40;
		var widthMargin = lineChartCanvas.width/4;
		var labelWidth = widthMargin;
		var coordData;
		var lowestPercent = 1;
		var offsetY;
		var setCoordinateReturn;
		var triangleSide = 20;
		var labelBorderRadius = 10;
		var labelHeight;

		var yearColor = {
			dotColor: "#999999",
			lineColor:　"#dadada"
		};
		var historyColor = {
			dotColor: "#f9be00",
			lineColor:　"#f9be00"
		};
		var currentColor = {
			dotColor: "#eb614c",
			lineColor: "#eda89d"
		};
		var lineChartFontStyle = getFont(lineChartCanvas,0.04);
		var lineDotStyle = {
			lineWidth: 2,
			dotRadius: 8
		};

		if (window.dpr==1) {
			startX = 20;
		} else if(window.dpr == 2){
			lineChartFontStyle = getFont(lineChartCanvas,0.04);
		}else if(window.dpr === 3){
			lineChartFontStyle = getFont(lineChartCanvas, 0.04);
		}

		var schMinScoreList = [];
		var schoolDataListLen = reportData.sch_min_score_list.length;
		if(schoolDataListLen > 0){
			schMinScoreList = reportData.sch_min_score_list;
			schMinScoreList.push({
				"year":"你的排名",//用户的排名
				"min_rank":REQUESTPARAM.rank//用户排名
			});
		}

		setCoordinateReturn = drawCanvas.setCoordinate(schMinScoreList, startX, startY, widthMargin, 400, lowestPercent);
		coordData = setCoordinateReturn[0];
		lowestPercent = setCoordinateReturn[1];

		offsetY = lowestPercent < 0.01 ? 140 :
			lowestPercent < 0.1 ? 130 : 100;

		if(window.dpr == 1) {
			labelWidth = labelWidth/2;
			lineChartCanvas.height = lineChartCanvas.height / 2;
			startY = startY / 2;
			offsetY = offsetY / 2;
			lineDotStyle.lineWidth = 1;
			lineDotStyle.dotRadius = 5;
			triangleSide = 5;
			labelBorderRadius /= 2;
		}

		drawCanvas.drawCoordinate(context, coordData, yearColor,historyColor, currentColor, labelWidth,
			lineChartCanvas.width, lineChartCanvas.height, startY, offsetY, lineChartFontStyle, lineDotStyle, window.dpr);

		context.font = lineChartFontStyle;
		labelHeight = context.measureText("排").width*2;
		drawCanvas.drawLabel(context, coordData, labelHeight, labelBorderRadius, startY, lineChartCanvas.height, offsetY,
			labelWidth, lineChartFontStyle, lineDotStyle, triangleSide);

	}else{
		$("#line-chart-wmzy-pro-intro").addClass("hide");
	}


	// 推荐学校列表
	renderEjsTplWithData("#school-list-item-tpl", "#school-list-item-wrap", reportData);


	// 录取人数最多的五个院校
	if(reportData.goto_schs_list.length > 0){
		renderEjsTplWithData("#top-five-enroll-school-tpl", "#top-five-enroll-school-wrap", reportData);
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
	}

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

	paramData.reqId = requestParam.req_id || "";
	paramData.examNo = requestParam.exam_no || "";
	paramData.provinceId = ""+requestParam.province_id;
	paramData.wenli = requestParam.wenli || "";
	paramData.score = requestParam.score || "";
	paramData.expSchId = requestParam.exp_sch_id || "";
	paramData.batch = requestParam.batch || "";

	REQUESTPARAM = paramData;

	$.ajax({
		type: "post",
		cache: false,
		url: url.getAnalysisReportUrl,
		data: paramData,
		success: function(data) {

			REQUESTPARAM.loc_provinc_name = data.loc_provinc_name = prov.getProvinceName(paramData.provinceId);
			REQUESTPARAM.loc_wenli = data.loc_wenli = REQUESTPARAM.wenli == 2 ? "理科" : "文科";
			console.log("data "+ JSON.stringify(data, null, 4));

			if(data.rank){
				REQUESTPARAM.rank = data.rank;
			}
			_renderAnalysisReportPage(data);
			_init.initModule();
			xinSwiper.slideNext();
			chgUrl.changeUrl("02","","#analyse-result");
			document.title="成绩定位分析报告";
		},
		error:function() {
			alert("服务器错误！");
		}
	});
};

var swipeToWmzyIntroPage = function (xinSwiper) {

	$(".goto-wmzy-pro-intro").on("click", function () {
		xinSwiper.slideNext();
		chgUrl.changeUrl("03","","#introduce");
		document.title="完美志愿，让你上更好的大学";
	});

};

module.exports = {
	swipeToAnalysisReportPage: swipeToAnalysisReportPage,
	swipeToWmzyIntroPage: swipeToWmzyIntroPage
};