/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _url = __webpack_require__(1);

var _url2 = _interopRequireDefault(_url);

var _canvasGraph = __webpack_require__(6);

var _canvasGraph2 = _interopRequireDefault(_canvasGraph);

var _loc = __webpack_require__(2);

var _loc2 = _interopRequireDefault(_loc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tpl = __webpack_require__(8);

var REQUESTPARAM = {};

var _init = function () {
	// module scope variables
	var jqueryMap = {},
	    setJqueryMap,
	    _toggleModalShow,
	    _toggleModaHide,
	    _renderSchoolItemDetail,
	    onClickSchoolListItem,
	    onClickCloseSchoolDetailBtn,
	    initModule;

	// UTILITY METHODS
	_toggleModalShow = function _toggleModalShow() {
		jqueryMap.$blackMasking.removeClass("hide");
		jqueryMap.$schoolDetailModal.removeClass("hide");
	};

	_toggleModaHide = function _toggleModaHide() {
		jqueryMap.$blackMasking.addClass("hide");
		jqueryMap.$schoolDetailModal.addClass("hide");
	};

	_renderSchoolItemDetail = function _renderSchoolItemDetail(data) {
		_toggleModalShow();
		var ejsTpl;
		var ejsHtml;
		var ejsOptions = {
			open: "<&",
			close: "&>"
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
		schoolData.loc_provinc_name = REQUESTPARAM.loc_provinc_name;
		schoolData.loc_wenli = REQUESTPARAM.loc_wenli;

		ejsTpl = $("#school-list-item-modal-tpl").html();
		ejsHtml = Tpl.ejs(ejsTpl, schoolData, ejsOptions);
		console.log("ejsHtml >> " + ejsHtml);
		$("#school-list-item-modal-wrap").html(ejsHtml);

		if (schoolData.sch_min_score_list.length > 2) {
			var schMinScoreList = [];

			renderEjsTplWithData("#line-chart-wmzy-link-modal-tpl", "#line-chart-wmzy-link-modal-wrap", schoolData);

			var lineChartCanvasClosestWidth;
			var lineChartCanvas = document.getElementById('line-chart-modal-canvas'),
			    context = lineChartCanvas.getContext('2d');
			lineChartCanvasClosestWidth = lineChartCanvas.parentNode.parentNode.clientWidth;

			// alert("lineChartCanvasParentNodeWidth " + lineChartCanvasClosestWidth );
			lineChartCanvas.width = lineChartCanvas.parentNode.clientWidth;
			lineChartCanvas.height = lineChartCanvas.parentNode.clientHeight * 1.5;

			var startX = 0;
			var startY = 40;
			var widthMargin = lineChartCanvas.width / 4;
			var labelWidth = widthMargin;
			var labelHeight = 75;
			var coordData;
			var lowestPercent = 1;
			var offsetY;
			var setCoordinateReturn;

			var yearColor = {
				dotColor: "#999999",
				lineColor: "#999999"
			};
			var historyColor = {
				dotColor: "#f9be00",
				lineColor: "#f9be00"
			};
			var currentColor = {
				dotColor: "#eb614c",
				lineColor: "#eda89d"
			};
			// alert(" the win.dpr " + window.dpr);
			var lineChartFontStyle = getFont(lineChartCanvas, 0.03);
			var lineDotStyle = {
				lineWidth: 2,
				dotRadius: 8
			};

			if (window.dpr == 1) {
				startX = 20;
			} else if (window.dpr == 2) {
				lineChartFontStyle = getFont(lineChartCanvas, 0.04);
			} else if (window.dpr === 3) {
				lineChartFontStyle = getFont(lineChartCanvas, 0.04);
				labelHeight = 100;
			}

			var schoolDataListLen = schoolData.sch_min_score_list.length;
			if (schoolDataListLen >= 5) {
				for (var i = 0; i <= 3; i++) {
					schMinScoreList.push(schoolData.sch_min_score_list[schoolDataListLen - 4 + i]); //
				}
			} else {
				schMinScoreList = schoolData.sch_min_score_list;
			}

			setCoordinateReturn = _canvasGraph2.default.setCoordinate(schMinScoreList, startX, startY, widthMargin, 400, lowestPercent);
			coordData = setCoordinateReturn[0];
			lowestPercent = setCoordinateReturn[1];

			offsetY = lowestPercent < 0.01 ? 140 : lowestPercent < 0.1 ? 130 : 50;

			if (window.dpr == 1) {
				labelWidth = labelWidth / 2;
				lineChartCanvas.height = lineChartCanvas.height / 2;
				startY = startY / 2;
				offsetY = offsetY / 2;
				labelHeight = labelHeight / 2;
				lineDotStyle.lineWidth = 1;
				lineDotStyle.dotRadius = 5;
			}

			_canvasGraph2.default.drawCoordinate(context, coordData, yearColor, historyColor, currentColor, labelWidth, lineChartCanvas.width, lineChartCanvas.height, startY, offsetY, lineChartFontStyle, lineDotStyle);
			_canvasGraph2.default.drawLabel(context, coordData, labelHeight, 8, 20, lineChartCanvas.height, offsetY, labelWidth, lineChartFontStyle, window.dpr, lineChartCanvasClosestWidth);
		}
	};

	// DOM METHODS
	setJqueryMap = function setJqueryMap() {
		jqueryMap = {
			$blackMasking: $("#modal-black-masking"),
			$schoolListItem: $(".school-list-item"),
			$schoolDetailModal: $("#school-detail-modal"),
			$schoolDetailClose: $("#school-modal-close-btn")
		};
	};

	onClickSchoolListItem = function onClickSchoolListItem() {

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
			url: _url2.default.getSchoolDetailUrl,
			data: param,
			success: function success(data) {
				console.log("data " + JSON.stringify(data, null, 4));
				_renderSchoolItemDetail(data);
			},
			error: function error() {
				alert("服务器错误！");
				// _renderSchoolItemDetail();
			}
		});
	};

	onClickCloseSchoolDetailBtn = function onClickCloseSchoolDetailBtn() {
		_toggleModaHide();
		var schoolListItemModalHtml = '<script id="school-list-item-modal-tpl" type="text/template">' + '<img src="<&= data.icon_url&>" alt="学校logo" class="school-list-img">' + '<ul class="school-info">' + '<li class="school-name-loc" title="">' + '<span class="school-name"><&= data.sch_name&></span>' + '<span class="school-loc"><&= data.city&></span>' + '</li>' + '<li class="school-rank-probability">' + '<&if(data.total_rank){&>' + '<span class="school-rank"><em class="dot"></em>综合排名<em class="rank-num"><&= data.total_rank&></em></span>' + '<&}&>' + '<&if(data.adm_ratio){&>' + '<span class="enroll-probability"><em class="dot"></em>录取概率<em class="probability-num"><&= data.adm_ratio&>%</em></span>' + '<&}&>' + '</li>' + '<li class="school-label">' + '<&if(data.sch_flag.length >= 1){&>' + '<span class="school-label-1"><&= data.sch_flag[0]&></span>' + '<&if(data.sch_flag[1]){&>' + '<span class="school-label-2"><&= data.sch_flag[1]&></span>' + '<&}&>' + '<&}&>' + '<&if(data.sch_type.length > 0){&>' + '<span class="school-label-3"><&= data.sch_type[0]&></span>' + '<&}&>' + '</li>' + '</ul>' + '</script>';
		var schoolListLineChartModalHtml = '<script id="line-chart-wmzy-link-modal-tpl" type="text/template">' + '<& if(data.sch_min_score_list){ &>' + '<div class="line-chart-wrap">' + '<h3 class="line-chart-tiltle">往年该校录取最低省排名&nbsp;<&= data.loc_provinc_name&> — <&= data.loc_wenli&></h3>' + '<canvas id="line-chart-modal-canvas"></canvas>' + '</div>' + '<&}&>' + '</script>';
		$("#school-list-item-modal-wrap").html(schoolListItemModalHtml);
		$("#line-chart-wmzy-link-modal-wrap").html(schoolListLineChartModalHtml);
	};
	// PUBLIC METHODS
	initModule = function initModule() {
		setJqueryMap();
		jqueryMap.$schoolListItem.click(onClickSchoolListItem);
		jqueryMap.$schoolDetailClose.click(onClickCloseSchoolDetailBtn);
	};

	return {
		initModule: initModule
	};
}();

var renderEjsTplWithData = function renderEjsTplWithData(tplId, htmlId, data) {
	var ejsTpl;
	var ejsHtml;
	var ejsOptions = {
		open: "<&",
		close: "&>"
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
	var size = canvas.width * ratio; // get font size based on current width
	return (size | 0) + 'px sans-serif'; // set font
}

var _renderAnalysisReportPage = function _renderAnalysisReportPage(reportData) {

	// 成绩与排名
	renderEjsTplWithData("#score-rank-tpl", "#score-rank-wrap", reportData);

	// 总结
	renderEjsTplWithData("#summary-items-tpl", "#summary-items-wrap", reportData);

	// 与目标学校的距离 —— 概率圆环
	var enrollCanvas = document.getElementById('enroll-canvas');
	var context = enrollCanvas.getContext('2d');
	var enrollCanvasParentNodeWidth = enrollCanvas.parentNode.clientWidth;
	enrollCanvas.width = enrollCanvasParentNodeWidth / 2;
	var enrollCanvasFontDpr1 = getFont(enrollCanvas, 0.2);
	var enrollCanvasFontDpr2 = getFont(enrollCanvas, 0.1);
	var enrollCanvasFontDpr3 = getFont(enrollCanvas, 0.06);

	enrollCanvas.height = enrollCanvas.width / 1.5;
	var radius = enrollCanvas.width / 4;
	var centerX = enrollCanvas.width / 2;
	var centerY = enrollCanvas.height / 2;
	var circleLineWidthInner = 4;
	var circleLineWidthOuter = 6;

	if (window.dpr >= 2) {
		circleLineWidthInner = 10;
		circleLineWidthOuter = 12;
		enrollCanvasFontDpr1 = getFont(enrollCanvas, 0.2);
		enrollCanvasFontDpr2 = getFont(enrollCanvas, 0.1);
		enrollCanvasFontDpr3 = getFont(enrollCanvas, 0.06);
	}

	_canvasGraph2.default.drawCircle(context, centerX, centerY, '#ffffff', '#e4e4e4', circleLineWidthInner, radius, 1);
	if (reportData.exp_sch && reportData.adm_ratio != null && reportData.adm_ratio >= 0) {
		_canvasGraph2.default.drawCircle(context, centerX, centerY, '#ffffff', '#f9be00', circleLineWidthOuter, radius, reportData.adm_ratio / 100, 'round');
	}
	context.textBaseline = 'middle';
	context.textAlign = "center";

	// 分是否设立了目标学校,概率是否存在 三种情况讨论
	if (reportData.exp_sch && reportData.adm_ratio != null && reportData.adm_ratio >= 0) {

		_canvasGraph2.default.drawCircleText(context, enrollCanvasFontDpr1, '#f9be00', reportData.adm_ratio, enrollCanvas.width * 0.46, enrollCanvas.height * 0.45);
		_canvasGraph2.default.drawCircleText(context, enrollCanvasFontDpr2, '#f9be00', '%', ("" + reportData.adm_ratio).length > 1 ? enrollCanvas.width * 0.62 : enrollCanvas.width * 0.58, enrollCanvas.height * 0.5);
		_canvasGraph2.default.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', '录取概率', centerX, enrollCanvas.height * 0.65);
	} else if (reportData.adm_ratio == null) {
		_canvasGraph2.default.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', "暂无", centerX, enrollCanvas.height * 0.48);
		_canvasGraph2.default.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', '录取概率', centerX, enrollCanvas.height * 0.6);
	} else {
		_canvasGraph2.default.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', "未设立", centerX, enrollCanvas.height * 0.48);
		_canvasGraph2.default.drawCircleText(context, enrollCanvasFontDpr3, '#b6b6b6', '目标学校', centerX, enrollCanvas.height * 0.6);
	}

	// 与目标学校的距离 —— 建议
	renderEjsTplWithData("#gap-suggest-tpl", "#gap-suggest-wrap", reportData);

	/**
  * canvas 折线图 —— 往年该校录取最低省排名(如果设置了目标院校)
  *  width: 100%;
  *  max-width: 600px;
  *  height: 500px;
  **/

	if (reportData.exp_sch && reportData.sch_min_score_list.length > 1) {

		renderEjsTplWithData("#line-chart-wmzy-link-tpl", "#line-chart-wmzy-link-wrap", reportData);

		var lineChartCanvasClosestWidth;
		var lineChartCanvas = document.getElementById('line-chart-canvas'),
		    context = lineChartCanvas.getContext('2d');
		lineChartCanvasClosestWidth = lineChartCanvas.parentNode.parentNode.clientWidth;

		// alert("lineChartCanvasParentNodeWidth " + lineChartCanvasClosestWidth );
		lineChartCanvas.width = lineChartCanvas.parentNode.clientWidth;
		lineChartCanvas.height = lineChartCanvas.parentNode.clientHeight * 1.5;

		var startX = 0;
		var startY = 40;
		var widthMargin = lineChartCanvas.width / 4;
		var labelWidth = widthMargin;
		var labelHeight = 65;
		var coordData;
		var lowestPercent = 1;
		var offsetY;
		var setCoordinateReturn;

		var yearColor = {
			dotColor: "#999999",
			lineColor: "#dadada"
		};
		var historyColor = {
			dotColor: "#f9be00",
			lineColor: "#f9be00"
		};
		var currentColor = {
			dotColor: "#eb614c",
			lineColor: "#eda89d"
		};
		// alert(" the win.dpr " + window.dpr);
		var lineChartFontStyle = getFont(lineChartCanvas, 0.03);
		var lineDotStyle = {
			lineWidth: 2,
			dotRadius: 8
		};

		if (window.dpr == 1) {
			startX = 20;
		} else if (window.dpr == 2) {
			lineChartFontStyle = getFont(lineChartCanvas, 0.04);
		} else if (window.dpr === 3) {
			lineChartFontStyle = getFont(lineChartCanvas, 0.04);
			labelHeight = 100;
		}

		var schMinScoreList = [];
		var schoolDataListLen = reportData.sch_min_score_list.length;
		if (schoolDataListLen >= 5) {
			for (var i = 0; i <= 3; i++) {
				schMinScoreList.push(reportData.sch_min_score_list[schoolDataListLen - 4 + i]); //
			}
		} else {
			schMinScoreList = reportData.sch_min_score_list;
		}

		setCoordinateReturn = _canvasGraph2.default.setCoordinate(schMinScoreList, startX, startY, widthMargin, 400, lowestPercent);
		coordData = setCoordinateReturn[0];
		lowestPercent = setCoordinateReturn[1];

		offsetY = lowestPercent < 0.01 ? 140 : lowestPercent < 0.1 ? 130 : 50;

		if (window.dpr == 1) {
			labelWidth = labelWidth / 2;
			lineChartCanvas.height = lineChartCanvas.height / 2;
			startY = startY / 2;
			offsetY = offsetY / 2;
			labelHeight = labelHeight / 2;
			lineDotStyle.lineWidth = 1;
			lineDotStyle.dotRadius = 5;
		}

		_canvasGraph2.default.drawCoordinate(context, coordData, yearColor, historyColor, currentColor, labelWidth, lineChartCanvas.width, lineChartCanvas.height, startY, offsetY, lineChartFontStyle, lineDotStyle, window.dpr);

		context.font = lineChartFontStyle;
		context.fillStyle = '#eb614c';
		_canvasGraph2.default.drawLabel(context, coordData, labelHeight, 8, 20, lineChartCanvas.height, offsetY, labelWidth, lineChartFontStyle, window.dpr, lineChartCanvasClosestWidth);
	} else {
		$("#line-chart-wmzy-pro-intro").addClass("hide");
	}

	// 推荐学校列表
	renderEjsTplWithData("#school-list-item-tpl", "#school-list-item-wrap", reportData);

	// 录取人数最多的五个院校
	if (reportData.goto_schs_list.length > 0) {
		renderEjsTplWithData("#top-five-enroll-school-tpl", "#top-five-enroll-school-wrap", reportData);
		var canvas = document.getElementById('trapezoid-canvas');
		var trapezoidParentNodeWidth = canvas.parentNode.clientWidth;
		var trapezoidCount = reportData.goto_schs_list.length;
		canvas.width = trapezoidParentNodeWidth - 60;
		var context = canvas.getContext('2d');
		var width = canvas.width * (360 / 750);
		canvas.height = canvas.width / 2 * (64 / 286) * trapezoidCount + 10 * trapezoidCount + 55; // 286/750 为梯形宽度占比，64/286为高度占比， 50为每个梯形的间隙， 20为标题高度
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

		if (window.dpr == 1) {
			lineDotStyle.lineWidth = 1;
			lineDotStyle.dotRadius = 2;
		} else if (window.dpr == 2) {
			lineDotStyle.lineWidth = 2;
			lineDotStyle.dotRadius = 4;
		} else if (window.dpr == 3) {
			lineDotStyle.lineWidth = 3;
			lineDotStyle.dotRadius = 6;
		}

		contextFontStyle = getFont(canvas, 0.04);
		if (window.dpr == 3) {
			// 640 pixes phone
			titleOffsetX = 20;
		} else if (window.dpr == 2) {
			titleOffsetX = 10;
		} else if (window.dpr == 1) {
			titleOffsetX = 0;
		}

		_canvasGraph2.default.drawTrapezoid(canvas, context, width, height, reportData.goto_schs_list, trapezoidStyle, schoolNumNameStyle, lineDotStyle, contextFontStyle, titleOffsetX, "（考生数量）", 6);
	}

	// 其他 x 所推荐院校
	if (reportData.recommend_sch_list.length > 0) {
		renderEjsTplWithData("#recommend-school-link-tpl", "#recommend-school-link-wrap", reportData);
	} else {
		renderEjsTplWithData("#recommend-school-link-tpl-none", "#recommend-school-link-wrap", reportData);
	}

	// 根据排名的数据来源
	renderEjsTplWithData("#recommend-data-origin-tpl", "#recommend-data-origin-wrap", reportData);

	// 录取人数最多的五个专业，如果有的话
	renderEjsTplWithData("#top-five-enroll-major-tpl", "#top-five-enroll-major-wrap", reportData);
};

var swipeToAnalysisReportPage = function swipeToAnalysisReportPage(requestParam, xinSwiper) {

	var paramData = {};

	paramData.reqId = requestParam.req_id || "";
	paramData.examNo = requestParam.exam_no || "";
	paramData.provinceId = "" + requestParam.province_id;
	paramData.wenli = requestParam.wenli || "";
	paramData.score = requestParam.score || "";
	paramData.expSchId = requestParam.exp_sch_id || "";
	paramData.batch = requestParam.batch || "";

	REQUESTPARAM = paramData;

	$.ajax({
		type: "post",
		cache: false,
		url: _url2.default.getAnalysisReportUrl,
		data: paramData,
		success: function success(data) {
			console.log("data " + JSON.stringify(data, null, 4));
			REQUESTPARAM.loc_provinc_name = data.loc_provinc_name = _loc2.default.getProvinceName(paramData.provinceId);
			REQUESTPARAM.loc_wenli = data.loc_wenli = REQUESTPARAM.wenli == 1 ? "理科" : "文科";
			_renderAnalysisReportPage(data);
			_init.initModule();
			xinSwiper.slideNext();
		},
		error: function error() {
			alert("服务器错误！");
		}
	});
};

var swipeToWmzyIntroPage = function swipeToWmzyIntroPage(xinSwiper) {

	$(".goto-wmzy-pro-intro").on("click", function () {
		xinSwiper.slideNext();
	});
};

module.exports = {
	swipeToAnalysisReportPage: swipeToAnalysisReportPage,
	swipeToWmzyIntroPage: swipeToWmzyIntroPage
};

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = {
	autoUrl: "/get-auto-code",
	vipUrl: "/get-vip",
	getAnalysisReportUrl: "/analysis",
	getSchoolDetailUrl: "/school-detail",
	guestSchool: "/guest-school"
};

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = {
    _data: {
        "441600000000": { "loc_id": "441600000000", "loc_namecn": "河源市", "loc_x": 114.697802, "loc_y": 23.746266 },
        "350500000000": { "loc_id": "350500000000", "loc_namecn": "泉州市", "loc_x": 118.589421, "loc_y": 24.908853 },
        "429000000000": { "loc_id": "429000000000", "loc_namecn": "省直辖县级行政区划", "loc_x": null, "loc_y": null },
        "340800000000": { "loc_id": "340800000000", "loc_namecn": "安庆市", "loc_x": 117.053571, "loc_y": 30.524816 },
        "340000000000": { "loc_id": "340000000000", "loc_namecn": "安徽", "loc_x": null, "loc_y": null },
        "350100000000": { "loc_id": "350100000000", "loc_namecn": "福州市", "loc_x": 119.306239, "loc_y": 26.075302 },
        "460200000000": { "loc_id": "460200000000", "loc_namecn": "三亚市", "loc_x": 109.508268, "loc_y": 18.247872 },
        "653000000000": { "loc_id": "653000000000", "loc_namecn": "克孜勒苏柯尔克孜自治州", "loc_x": 76.172825, "loc_y": 39.713431 },
        "530000000000": { "loc_id": "530000000000", "loc_namecn": "云南", "loc_x": null, "loc_y": null },
        "522700000000": { "loc_id": "522700000000", "loc_namecn": "黔南布依族苗族自治州", "loc_x": 107.517156, "loc_y": 26.258219 },
        "360600000000": { "loc_id": "360600000000", "loc_namecn": "鹰潭市", "loc_x": 117.033838, "loc_y": 28.238638 },
        "330500000000": { "loc_id": "330500000000", "loc_namecn": "湖州市", "loc_x": 120.102398, "loc_y": 30.867198 },
        "210700000000": { "loc_id": "210700000000", "loc_namecn": "锦州市", "loc_x": 121.135742, "loc_y": 41.119269 },
        "450200000000": { "loc_id": "450200000000", "loc_namecn": "柳州市", "loc_x": 109.411703, "loc_y": 24.314617 },
        "440300000000": { "loc_id": "440300000000", "loc_namecn": "深圳市", "loc_x": 114.085947, "loc_y": 22.547 },
        "500100000000": { "loc_id": "500100000000", "loc_namecn": "市辖区", "loc_x": null, "loc_y": null },
        "220300000000": { "loc_id": "220300000000", "loc_namecn": "四平市", "loc_x": 124.370785, "loc_y": 43.170344 },
        "130000000000": { "loc_id": "130000000000", "loc_namecn": "河北", "loc_x": null, "loc_y": null },
        "410500000000": { "loc_id": "410500000000", "loc_namecn": "安阳市", "loc_x": 114.352482, "loc_y": 36.103442 },
        "110100000000": { "loc_id": "110100000000", "loc_namecn": "市辖区", "loc_x": null, "loc_y": null },
        "610300000000": { "loc_id": "610300000000", "loc_namecn": "宝鸡市", "loc_x": 107.14487, "loc_y": 34.369315 },
        "232700000000": { "loc_id": "232700000000", "loc_namecn": "大兴安岭地区", "loc_x": 124.711526, "loc_y": 52.335262 },
        "320100000000": { "loc_id": "320100000000", "loc_namecn": "南京市", "loc_x": 118.767413, "loc_y": 32.041544 },
        "331000000000": { "loc_id": "331000000000", "loc_namecn": "台州市", "loc_x": 121.428599, "loc_y": 28.661378 },
        "330100000000": { "loc_id": "330100000000", "loc_namecn": "杭州市", "loc_x": 120.153576, "loc_y": 30.287459 },
        "450600000000": { "loc_id": "450600000000", "loc_namecn": "防城港市", "loc_x": 108.345478, "loc_y": 21.614631 },
        "341100000000": { "loc_id": "341100000000", "loc_namecn": "滁州市", "loc_x": 118.316264, "loc_y": 32.303627 },
        "542400000000": { "loc_id": "542400000000", "loc_namecn": "那曲地区", "loc_x": 92.060214, "loc_y": 31.476004 },
        "310100000000": { "loc_id": "310100000000", "loc_namecn": "市辖区", "loc_x": null, "loc_y": null },
        "350900000000": { "loc_id": "350900000000", "loc_namecn": "宁德市", "loc_x": 119.527082, "loc_y": 26.65924 },
        "511300000000": { "loc_id": "511300000000", "loc_namecn": "南充市", "loc_x": 106.082974, "loc_y": 30.795281 },
        "331100000000": { "loc_id": "331100000000", "loc_namecn": "丽水市", "loc_x": 119.921786, "loc_y": 28.451993 },
        "220200000000": { "loc_id": "220200000000", "loc_namecn": "吉林市", "loc_x": 126.55302, "loc_y": 43.843577 },
        "511600000000": { "loc_id": "511600000000", "loc_namecn": "广安市", "loc_x": 106.633369, "loc_y": 30.456398 },
        "610900000000": { "loc_id": "610900000000", "loc_namecn": "安康市", "loc_x": 109.029273, "loc_y": 32.6903 },
        "360400000000": { "loc_id": "360400000000", "loc_namecn": "九江市", "loc_x": 115.992811, "loc_y": 29.712034 },
        "140500000000": { "loc_id": "140500000000", "loc_namecn": "晋城市", "loc_x": 112.851274, "loc_y": 35.497553 },
        "450900000000": { "loc_id": "450900000000", "loc_namecn": "玉林市", "loc_x": 110.154393, "loc_y": 22.63136 },
        "341500000000": { "loc_id": "341500000000", "loc_namecn": "六安市", "loc_x": 116.507676, "loc_y": 31.752889 },
        "110200000000": { "loc_id": "110200000000", "loc_namecn": "县", "loc_x": null, "loc_y": null },
        "520400000000": { "loc_id": "520400000000", "loc_namecn": "安顺市", "loc_x": 105.932188, "loc_y": 26.245544 },
        "451300000000": { "loc_id": "451300000000", "loc_namecn": "来宾市", "loc_x": 109.229772, "loc_y": 23.733766 },
        "532800000000": { "loc_id": "532800000000", "loc_namecn": "西双版纳傣族自治州", "loc_x": 100.797941, "loc_y": 22.001724 },
        "410100000000": { "loc_id": "410100000000", "loc_namecn": "郑州市", "loc_x": 113.665412, "loc_y": 34.757975 },
        "510800000000": { "loc_id": "510800000000", "loc_namecn": "广元市", "loc_x": 105.829757, "loc_y": 32.433668 },
        "350600000000": { "loc_id": "350600000000", "loc_namecn": "漳州市", "loc_x": 117.661801, "loc_y": 24.510897 },
        "220000000000": { "loc_id": "220000000000", "loc_namecn": "吉林", "loc_x": null, "loc_y": null },
        "211000000000": { "loc_id": "211000000000", "loc_namecn": "辽阳市", "loc_x": 123.18152, "loc_y": 41.269402 },
        "652800000000": { "loc_id": "652800000000", "loc_namecn": "巴音郭楞蒙古自治州", "loc_x": 86.150969, "loc_y": 41.768552 },
        "510100000000": { "loc_id": "510100000000", "loc_namecn": "成都市", "loc_x": 104.065735, "loc_y": 30.659462 },
        "371000000000": { "loc_id": "371000000000", "loc_namecn": "威海市", "loc_x": 122.116394, "loc_y": 37.509691 },
        "620400000000": { "loc_id": "620400000000", "loc_namecn": "白银市", "loc_x": 104.173606, "loc_y": 36.54568 },
        "330900000000": { "loc_id": "330900000000", "loc_namecn": "舟山市", "loc_x": 122.106863, "loc_y": 30.016028 },
        "440700000000": { "loc_id": "440700000000", "loc_namecn": "江门市", "loc_x": 113.094942, "loc_y": 22.590431 },
        "360300000000": { "loc_id": "360300000000", "loc_namecn": "萍乡市", "loc_x": 113.852186, "loc_y": 27.622946 },
        "321100000000": { "loc_id": "321100000000", "loc_namecn": "镇江市", "loc_x": 119.452753, "loc_y": 32.204402 },
        "220700000000": { "loc_id": "220700000000", "loc_namecn": "松原市", "loc_x": 124.823608, "loc_y": 45.118243 },
        "652900000000": { "loc_id": "652900000000", "loc_namecn": "阿克苏地区", "loc_x": 80.265068, "loc_y": 41.170712 },
        "210800000000": { "loc_id": "210800000000", "loc_namecn": "营口市", "loc_x": 122.235151, "loc_y": 40.667432 },
        "450100000000": { "loc_id": "450100000000", "loc_namecn": "南宁市", "loc_x": 108.320004, "loc_y": 22.82402 },
        "522300000000": { "loc_id": "522300000000", "loc_namecn": "黔西南布依族苗族自治州", "loc_x": 104.897971, "loc_y": 25.08812 },
        "441500000000": { "loc_id": "441500000000", "loc_namecn": "汕尾市", "loc_x": 115.364238, "loc_y": 22.774485 },
        "510500000000": { "loc_id": "510500000000", "loc_namecn": "泸州市", "loc_x": 105.443348, "loc_y": 28.889138 },
        "530500000000": { "loc_id": "530500000000", "loc_namecn": "保山市", "loc_x": 99.167133, "loc_y": 25.111802 },
        "469000000000": { "loc_id": "469000000000", "loc_namecn": "省直辖县级行政区划", "loc_x": null, "loc_y": null },
        "431200000000": { "loc_id": "431200000000", "loc_namecn": "怀化市", "loc_x": 109.97824, "loc_y": 27.550082 },
        "211100000000": { "loc_id": "211100000000", "loc_namecn": "盘锦市", "loc_x": 122.06957, "loc_y": 41.124484 },
        "422800000000": { "loc_id": "422800000000", "loc_namecn": "恩施土家族苗族自治州", "loc_x": 109.48699, "loc_y": 30.283114 },
        "340700000000": { "loc_id": "340700000000", "loc_namecn": "铜陵市", "loc_x": 117.816576, "loc_y": 30.929935 },
        "610700000000": { "loc_id": "610700000000", "loc_namecn": "汉中市", "loc_x": 107.028621, "loc_y": 33.077668 },
        "350200000000": { "loc_id": "350200000000", "loc_namecn": "厦门市", "loc_x": 118.11022, "loc_y": 24.490474 },
        "230500000000": { "loc_id": "230500000000", "loc_namecn": "双鸭山市", "loc_x": 131.157304, "loc_y": 46.643442 },
        "511800000000": { "loc_id": "511800000000", "loc_namecn": "雅安市", "loc_x": 103.001033, "loc_y": 29.987722 },
        "542300000000": { "loc_id": "542300000000", "loc_namecn": "日喀则地区", "loc_x": 88.885148, "loc_y": 29.267519 },
        "341200000000": { "loc_id": "341200000000", "loc_namecn": "阜阳市", "loc_x": 115.819729, "loc_y": 32.896969 },
        "321000000000": { "loc_id": "321000000000", "loc_namecn": "扬州市", "loc_x": 119.421003, "loc_y": 32.393159 },
        "630100000000": { "loc_id": "630100000000", "loc_namecn": "西宁市", "loc_x": 101.778916, "loc_y": 36.623178 },
        "520000000000": { "loc_id": "520000000000", "loc_namecn": "贵州", "loc_x": null, "loc_y": null },
        "653100000000": { "loc_id": "653100000000", "loc_namecn": "喀什地区", "loc_x": 75.989138, "loc_y": 39.467664 },
        "530100000000": { "loc_id": "530100000000", "loc_namecn": "昆明市", "loc_x": 102.712251, "loc_y": 25.040609 },
        "130600000000": { "loc_id": "130600000000", "loc_namecn": "保定市", "loc_x": 115.482331, "loc_y": 38.867657 },
        "450500000000": { "loc_id": "450500000000", "loc_namecn": "北海市", "loc_x": 109.119254, "loc_y": 21.473343 },
        "451400000000": { "loc_id": "451400000000", "loc_namecn": "崇左市", "loc_x": 107.353926, "loc_y": 22.404108 },
        "433100000000": { "loc_id": "433100000000", "loc_namecn": "湘西土家族苗族自治州", "loc_x": 109.739735, "loc_y": 28.314296 },
        "421000000000": { "loc_id": "421000000000", "loc_namecn": "荆州市", "loc_x": 112.23813, "loc_y": 30.326857 },
        "360200000000": { "loc_id": "360200000000", "loc_namecn": "景德镇市", "loc_x": 117.214664, "loc_y": 29.29256 },
        "411300000000": { "loc_id": "411300000000", "loc_namecn": "南阳市", "loc_x": 112.540918, "loc_y": 32.999082 },
        "654200000000": { "loc_id": "654200000000", "loc_namecn": "塔城地区", "loc_x": 82.985732, "loc_y": 46.746301 },
        "211300000000": { "loc_id": "211300000000", "loc_namecn": "朝阳市", "loc_x": 120.451176, "loc_y": 41.576758 },
        "513300000000": { "loc_id": "513300000000", "loc_namecn": "甘孜藏族自治州", "loc_x": 101.963815, "loc_y": 30.050663 },
        "210600000000": { "loc_id": "210600000000", "loc_namecn": "丹东市", "loc_x": 124.383044, "loc_y": 40.124296 },
        "341600000000": { "loc_id": "341600000000", "loc_namecn": "亳州市", "loc_x": 115.782939, "loc_y": 33.869338 },
        "340300000000": { "loc_id": "340300000000", "loc_namecn": "蚌埠市", "loc_x": 117.36237, "loc_y": 32.934037 },
        "430400000000": { "loc_id": "430400000000", "loc_namecn": "衡阳市", "loc_x": 112.607693, "loc_y": 26.900358 },
        "540100000000": { "loc_id": "540100000000", "loc_namecn": "拉萨市", "loc_x": 91.132212, "loc_y": 29.660361 },
        "210100000000": { "loc_id": "210100000000", "loc_namecn": "沈阳市", "loc_x": 123.429096, "loc_y": 41.796767 },
        "632700000000": { "loc_id": "632700000000", "loc_namecn": "玉树藏族自治州", "loc_x": 97.008522, "loc_y": 33.004049 },
        "510900000000": { "loc_id": "510900000000", "loc_namecn": "遂宁市", "loc_x": 105.571331, "loc_y": 30.513311 },
        "533400000000": { "loc_id": "533400000000", "loc_namecn": "迪庆藏族自治州", "loc_x": 99.706463, "loc_y": 27.826853 },
        "650200000000": { "loc_id": "650200000000", "loc_namecn": "克拉玛依市", "loc_x": 84.873946, "loc_y": 45.595886 },
        "530900000000": { "loc_id": "530900000000", "loc_namecn": "临沧市", "loc_x": 100.08697, "loc_y": 23.886567 },
        "610500000000": { "loc_id": "610500000000", "loc_namecn": "渭南市", "loc_x": 109.502882, "loc_y": 34.499381 },
        "451000000000": { "loc_id": "451000000000", "loc_namecn": "百色市", "loc_x": 106.616285, "loc_y": 23.897742 },
        "654300000000": { "loc_id": "654300000000", "loc_namecn": "阿勒泰地区", "loc_x": 88.13963, "loc_y": 47.848393 },
        "421200000000": { "loc_id": "421200000000", "loc_namecn": "咸宁市", "loc_x": 114.328963, "loc_y": 29.832798 },
        "420300000000": { "loc_id": "420300000000", "loc_namecn": "十堰市", "loc_x": 110.785239, "loc_y": 32.647017 },
        "140900000000": { "loc_id": "140900000000", "loc_namecn": "忻州市", "loc_x": 112.733538, "loc_y": 38.41769 },
        "620200000000": { "loc_id": "620200000000", "loc_namecn": "嘉峪关市", "loc_x": 98.277304, "loc_y": 39.786529 },
        "511900000000": { "loc_id": "511900000000", "loc_namecn": "巴中市", "loc_x": 106.753669, "loc_y": 31.858809 },
        "522600000000": { "loc_id": "522600000000", "loc_namecn": "黔东南苗族侗族自治州", "loc_x": 107.977488, "loc_y": 26.583352 },
        "659000000000": { "loc_id": "659000000000", "loc_namecn": "自治区直辖县级行政区划", "loc_x": null, "loc_y": null },
        "430700000000": { "loc_id": "430700000000", "loc_namecn": "常德市", "loc_x": 111.691347, "loc_y": 29.040225 },
        "360500000000": { "loc_id": "360500000000", "loc_namecn": "新余市", "loc_x": 114.930835, "loc_y": 27.810834 },
        "420200000000": { "loc_id": "420200000000", "loc_namecn": "黄石市", "loc_x": 115.077048, "loc_y": 30.220074 },
        "370000000000": { "loc_id": "370000000000", "loc_namecn": "山东", "loc_x": null, "loc_y": null },
        "653200000000": { "loc_id": "653200000000", "loc_namecn": "和田地区", "loc_x": 79.92533, "loc_y": 37.110687 },
        "652700000000": { "loc_id": "652700000000", "loc_namecn": "博尔塔拉蒙古自治州", "loc_x": 82.074778, "loc_y": 44.903258 },
        "230100000000": { "loc_id": "230100000000", "loc_namecn": "哈尔滨市", "loc_x": 126.642464, "loc_y": 45.756967 },
        "530600000000": { "loc_id": "530600000000", "loc_namecn": "昭通市", "loc_x": 103.717216, "loc_y": 27.336999 },
        "360000000000": { "loc_id": "360000000000", "loc_namecn": "江西", "loc_x": null, "loc_y": null },
        "640400000000": { "loc_id": "640400000000", "loc_namecn": "固原市", "loc_x": 106.285241, "loc_y": 36.004561 },
        "420100000000": { "loc_id": "420100000000", "loc_namecn": "武汉市", "loc_x": 114.298572, "loc_y": 30.584355 },
        "411700000000": { "loc_id": "411700000000", "loc_namecn": "驻马店市", "loc_x": 114.024736, "loc_y": 32.980169 },
        "430900000000": { "loc_id": "430900000000", "loc_namecn": "益阳市", "loc_x": 112.355042, "loc_y": 28.570066 },
        "610200000000": { "loc_id": "610200000000", "loc_namecn": "铜川市", "loc_x": 108.963122, "loc_y": 34.90892 },
        "441800000000": { "loc_id": "441800000000", "loc_namecn": "清远市", "loc_x": 113.036779, "loc_y": 23.704188 },
        "370600000000": { "loc_id": "370600000000", "loc_namecn": "烟台市", "loc_x": 121.391382, "loc_y": 37.539297 },
        "350800000000": { "loc_id": "350800000000", "loc_namecn": "龙岩市", "loc_x": 117.02978, "loc_y": 25.091603 },
        "532900000000": { "loc_id": "532900000000", "loc_namecn": "大理白族自治州", "loc_x": 100.240037, "loc_y": 25.592765 },
        "620600000000": { "loc_id": "620600000000", "loc_namecn": "武威市", "loc_x": 102.634697, "loc_y": 37.929996 },
        "340600000000": { "loc_id": "340600000000", "loc_namecn": "淮北市", "loc_x": 116.794664, "loc_y": 33.971707 },
        "610600000000": { "loc_id": "610600000000", "loc_namecn": "延安市", "loc_x": 109.49081, "loc_y": 36.596537 },
        "350700000000": { "loc_id": "350700000000", "loc_namecn": "南平市", "loc_x": 118.178459, "loc_y": 26.635627 },
        "210400000000": { "loc_id": "210400000000", "loc_namecn": "抚顺市", "loc_x": 123.921109, "loc_y": 41.875956 },
        "152500000000": { "loc_id": "152500000000", "loc_namecn": "锡林郭勒盟", "loc_x": 116.090996, "loc_y": 43.944018 },
        "652300000000": { "loc_id": "652300000000", "loc_namecn": "昌吉回族自治州", "loc_x": 87.304012, "loc_y": 44.014577 },
        "360800000000": { "loc_id": "360800000000", "loc_namecn": "吉安市", "loc_x": 114.986373, "loc_y": 27.111699 },
        "120200000000": { "loc_id": "120200000000", "loc_namecn": "县", "loc_x": null, "loc_y": null },
        "500200000000": { "loc_id": "500200000000", "loc_namecn": "县", "loc_x": null, "loc_y": null },
        "530700000000": { "loc_id": "530700000000", "loc_namecn": "丽江市", "loc_x": 100.233026, "loc_y": 26.872108 },
        "130100000000": { "loc_id": "130100000000", "loc_namecn": "石家庄市", "loc_x": 114.502461, "loc_y": 38.045474 },
        "420700000000": { "loc_id": "420700000000", "loc_namecn": "鄂州市", "loc_x": 114.890593, "loc_y": 30.396536 },
        "150200000000": { "loc_id": "150200000000", "loc_namecn": "包头市", "loc_x": 109.840405, "loc_y": 40.658168 },
        "340200000000": { "loc_id": "340200000000", "loc_namecn": "芜湖市", "loc_x": 118.376451, "loc_y": 31.326319 },
        "320600000000": { "loc_id": "320600000000", "loc_namecn": "南通市", "loc_x": 120.864608, "loc_y": 32.016212 },
        "321300000000": { "loc_id": "321300000000", "loc_namecn": "宿迁市", "loc_x": 118.293328, "loc_y": 33.945154 },
        "330400000000": { "loc_id": "330400000000", "loc_namecn": "嘉兴市", "loc_x": 120.750865, "loc_y": 30.762653 },
        "152900000000": { "loc_id": "152900000000", "loc_namecn": "阿拉善盟", "loc_x": 105.706422, "loc_y": 38.844814 },
        "440000000000": { "loc_id": "440000000000", "loc_namecn": "广东", "loc_x": null, "loc_y": null },
        "310200000000": { "loc_id": "310200000000", "loc_namecn": "县", "loc_x": null, "loc_y": null },
        "210300000000": { "loc_id": "210300000000", "loc_namecn": "鞍山市", "loc_x": 122.995632, "loc_y": 41.110626 },
        "445200000000": { "loc_id": "445200000000", "loc_namecn": "揭阳市", "loc_x": 116.355733, "loc_y": 23.543778 },
        "632100000000": { "loc_id": "632100000000", "loc_namecn": "海东地区", "loc_x": 102.10327, "loc_y": 36.502916 },
        "441400000000": { "loc_id": "441400000000", "loc_namecn": "梅州市", "loc_x": 116.117582, "loc_y": 24.299112 },
        "542200000000": { "loc_id": "542200000000", "loc_namecn": "山南地区", "loc_x": 91.766529, "loc_y": 29.236023 },
        "320200000000": { "loc_id": "320200000000", "loc_namecn": "无锡市", "loc_x": 120.301663, "loc_y": 31.574729 },
        "330200000000": { "loc_id": "330200000000", "loc_namecn": "宁波市", "loc_x": 121.549792, "loc_y": 29.868388 },
        "460000000000": { "loc_id": "460000000000", "loc_namecn": "海南", "loc_x": null, "loc_y": null },
        "520300000000": { "loc_id": "520300000000", "loc_namecn": "遵义市", "loc_x": 106.937265, "loc_y": 27.706626 },
        "442000000000": { "loc_id": "442000000000", "loc_namecn": "中山市", "loc_x": 113.382391, "loc_y": 22.521113 },
        "120000000000": { "loc_id": "120000000000", "loc_namecn": "天津", "loc_x": 117.190182, "loc_y": 39.125596 },
        "320900000000": { "loc_id": "320900000000", "loc_namecn": "盐城市", "loc_x": 120.139998, "loc_y": 33.377631 },
        "130300000000": { "loc_id": "130300000000", "loc_namecn": "秦皇岛市", "loc_x": 119.586579, "loc_y": 39.942531 },
        "140700000000": { "loc_id": "140700000000", "loc_namecn": "晋中市", "loc_x": 112.736465, "loc_y": 37.696495 },
        "532500000000": { "loc_id": "532500000000", "loc_namecn": "红河哈尼族彝族自治州", "loc_x": 103.384182, "loc_y": 23.366775 },
        "350300000000": { "loc_id": "350300000000", "loc_namecn": "莆田市", "loc_x": 119.007558, "loc_y": 25.431011 },
        "230400000000": { "loc_id": "230400000000", "loc_namecn": "鹤岗市", "loc_x": 130.277487, "loc_y": 47.332085 },
        "431000000000": { "loc_id": "431000000000", "loc_namecn": "郴州市", "loc_x": 113.032067, "loc_y": 25.793589 },
        "371700000000": { "loc_id": "371700000000", "loc_namecn": "菏泽市", "loc_x": 115.469381, "loc_y": 35.246531 },
        "210200000000": { "loc_id": "210200000000", "loc_namecn": "大连市", "loc_x": 121.618622, "loc_y": 38.91459 },
        "371300000000": { "loc_id": "371300000000", "loc_namecn": "临沂市", "loc_x": 118.326443, "loc_y": 35.065282 },
        "340500000000": { "loc_id": "340500000000", "loc_namecn": "马鞍山市", "loc_x": 118.507906, "loc_y": 31.689362 },
        "610100000000": { "loc_id": "610100000000", "loc_namecn": "西安市", "loc_x": 108.948024, "loc_y": 34.263161 },
        "320300000000": { "loc_id": "320300000000", "loc_namecn": "徐州市", "loc_x": 117.184811, "loc_y": 34.261792 },
        "460300000000": { "loc_id": "460300000000", "loc_namecn": "三沙市", "loc_x": 112.257433, "loc_y": 30.315895 },
        "632500000000": { "loc_id": "632500000000", "loc_namecn": "海南藏族自治州", "loc_x": 100.619542, "loc_y": 36.280353 },
        "630000000000": { "loc_id": "630000000000", "loc_namecn": "青海", "loc_x": null, "loc_y": null },
        "230000000000": { "loc_id": "230000000000", "loc_namecn": "黑龙江", "loc_x": null, "loc_y": null },
        "130400000000": { "loc_id": "130400000000", "loc_namecn": "邯郸市", "loc_x": 114.490686, "loc_y": 36.612273 },
        "511100000000": { "loc_id": "511100000000", "loc_namecn": "乐山市", "loc_x": 103.761263, "loc_y": 29.582024 },
        "421300000000": { "loc_id": "421300000000", "loc_namecn": "随州市", "loc_x": 113.37377, "loc_y": 31.717497 },
        "654000000000": { "loc_id": "654000000000", "loc_namecn": "伊犁哈萨克自治州", "loc_x": 81.317946, "loc_y": 43.92186 },
        "510000000000": { "loc_id": "510000000000", "loc_namecn": "四川", "loc_x": null, "loc_y": null },
        "411000000000": { "loc_id": "411000000000", "loc_namecn": "许昌市", "loc_x": 113.826063, "loc_y": 34.022956 },
        "431100000000": { "loc_id": "431100000000", "loc_namecn": "永州市", "loc_x": 111.608019, "loc_y": 26.434516 },
        "500000000000": { "loc_id": "500000000000", "loc_namecn": "重庆", "loc_x": 106.504962, "loc_y": 29.533155 },
        "371500000000": { "loc_id": "371500000000", "loc_namecn": "聊城市", "loc_x": 115.980367, "loc_y": 36.456013 },
        "620800000000": { "loc_id": "620800000000", "loc_namecn": "平凉市", "loc_x": 106.684691, "loc_y": 35.54279 },
        "652200000000": { "loc_id": "652200000000", "loc_namecn": "哈密地区", "loc_x": 93.51316, "loc_y": 42.833248 },
        "410400000000": { "loc_id": "410400000000", "loc_namecn": "平顶山市", "loc_x": 113.307718, "loc_y": 33.735241 },
        "542600000000": { "loc_id": "542600000000", "loc_namecn": "林芝地区", "loc_x": 94.362348, "loc_y": 29.654693 },
        "210000000000": { "loc_id": "210000000000", "loc_namecn": "辽宁", "loc_x": null, "loc_y": null },
        "510600000000": { "loc_id": "510600000000", "loc_namecn": "德阳市", "loc_x": 104.398651, "loc_y": 31.127991 },
        "340100000000": { "loc_id": "340100000000", "loc_namecn": "合肥市", "loc_x": 117.283042, "loc_y": 31.86119 },
        "231200000000": { "loc_id": "231200000000", "loc_namecn": "绥化市", "loc_x": 126.99293, "loc_y": 46.637393 },
        "420800000000": { "loc_id": "420800000000", "loc_namecn": "荆门市", "loc_x": 112.204251, "loc_y": 31.03542 },
        "620300000000": { "loc_id": "620300000000", "loc_namecn": "金昌市", "loc_x": 102.187888, "loc_y": 38.514238 },
        "440400000000": { "loc_id": "440400000000", "loc_namecn": "珠海市", "loc_x": 113.552724, "loc_y": 22.255899 },
        "222400000000": { "loc_id": "222400000000", "loc_namecn": "延边朝鲜族自治州", "loc_x": 129.513228, "loc_y": 42.904823 },
        "370900000000": { "loc_id": "370900000000", "loc_namecn": "泰安市", "loc_x": 117.129063, "loc_y": 36.194968 },
        "530800000000": { "loc_id": "530800000000", "loc_namecn": "普洱市", "loc_x": 100.972344, "loc_y": 22.777321 },
        "130500000000": { "loc_id": "130500000000", "loc_namecn": "邢台市", "loc_x": 114.508851, "loc_y": 37.0682 },
        "220600000000": { "loc_id": "220600000000", "loc_namecn": "白山市", "loc_x": 126.427839, "loc_y": 41.942505 },
        "141000000000": { "loc_id": "141000000000", "loc_namecn": "临汾市", "loc_x": 111.517973, "loc_y": 36.08415 },
        "150900000000": { "loc_id": "150900000000", "loc_namecn": "乌兰察布市", "loc_x": 113.114543, "loc_y": 41.034126 },
        "150400000000": { "loc_id": "150400000000", "loc_namecn": "赤峰市", "loc_x": 118.956806, "loc_y": 42.275317 },
        "520600000000": { "loc_id": "520600000000", "loc_namecn": "铜仁市", "loc_x": 109.192117, "loc_y": 27.718745 },
        "451100000000": { "loc_id": "451100000000", "loc_namecn": "贺州市", "loc_x": 111.552056, "loc_y": 24.414141 },
        "120100000000": { "loc_id": "120100000000", "loc_namecn": "市辖区", "loc_x": null, "loc_y": null },
        "231100000000": { "loc_id": "231100000000", "loc_namecn": "黑河市", "loc_x": 127.499023, "loc_y": 50.249585 },
        "230800000000": { "loc_id": "230800000000", "loc_namecn": "佳木斯市", "loc_x": 130.361634, "loc_y": 46.809606 },
        "622900000000": { "loc_id": "622900000000", "loc_namecn": "临夏回族自治州", "loc_x": 103.212006, "loc_y": 35.599446 },
        "623000000000": { "loc_id": "623000000000", "loc_namecn": "甘南藏族自治州", "loc_x": 102.911008, "loc_y": 34.986354 },
        "411400000000": { "loc_id": "411400000000", "loc_namecn": "商丘市", "loc_x": 115.650497, "loc_y": 34.437054 },
        "140800000000": { "loc_id": "140800000000", "loc_namecn": "运城市", "loc_x": 111.003957, "loc_y": 35.022778 },
        "420500000000": { "loc_id": "420500000000", "loc_namecn": "宜昌市", "loc_x": 111.290843, "loc_y": 30.702636 },
        "520200000000": { "loc_id": "520200000000", "loc_namecn": "六盘水市", "loc_x": 104.846743, "loc_y": 26.584643 },
        "620000000000": { "loc_id": "620000000000", "loc_namecn": "甘肃", "loc_x": null, "loc_y": null },
        "621100000000": { "loc_id": "621100000000", "loc_namecn": "定西市", "loc_x": 104.626294, "loc_y": 35.579578 },
        "320400000000": { "loc_id": "320400000000", "loc_namecn": "常州市", "loc_x": 119.946973, "loc_y": 31.772752 },
        "141100000000": { "loc_id": "141100000000", "loc_namecn": "吕梁市", "loc_x": 111.134335, "loc_y": 37.524366 },
        "532600000000": { "loc_id": "532600000000", "loc_namecn": "文山壮族苗族自治州", "loc_x": 104.24401, "loc_y": 23.36951 },
        "533300000000": { "loc_id": "533300000000", "loc_namecn": "怒江傈僳族自治州", "loc_x": 98.854304, "loc_y": 25.850949 },
        "230700000000": { "loc_id": "230700000000", "loc_namecn": "伊春市", "loc_x": 128.899396, "loc_y": 47.724775 },
        "410800000000": { "loc_id": "410800000000", "loc_namecn": "焦作市", "loc_x": 113.238266, "loc_y": 35.23904 },
        "410000000000": { "loc_id": "410000000000", "loc_namecn": "河南", "loc_x": null, "loc_y": null },
        "150000000000": { "loc_id": "150000000000", "loc_namecn": "内蒙古", "loc_x": null, "loc_y": null },
        "450000000000": { "loc_id": "450000000000", "loc_namecn": "广西", "loc_x": null, "loc_y": null },
        "410900000000": { "loc_id": "410900000000", "loc_namecn": "濮阳市", "loc_x": 115.041299, "loc_y": 35.768234 },
        "620700000000": { "loc_id": "620700000000", "loc_namecn": "张掖市", "loc_x": 100.455472, "loc_y": 38.932897 },
        "220800000000": { "loc_id": "220800000000", "loc_namecn": "白城市", "loc_x": 122.841114, "loc_y": 45.619026 },
        "320500000000": { "loc_id": "320500000000", "loc_namecn": "苏州市", "loc_x": 120.619585, "loc_y": 31.299379 },
        "431300000000": { "loc_id": "431300000000", "loc_namecn": "娄底市", "loc_x": 112.008497, "loc_y": 27.728136 },
        "430600000000": { "loc_id": "430600000000", "loc_namecn": "岳阳市", "loc_x": 113.132855, "loc_y": 29.37029 },
        "341300000000": { "loc_id": "341300000000", "loc_namecn": "宿州市", "loc_x": 116.984084, "loc_y": 33.633891 },
        "530300000000": { "loc_id": "530300000000", "loc_namecn": "曲靖市", "loc_x": 103.797851, "loc_y": 25.501557 },
        "640300000000": { "loc_id": "640300000000", "loc_namecn": "吴忠市", "loc_x": 106.199409, "loc_y": 37.986165 },
        "511700000000": { "loc_id": "511700000000", "loc_namecn": "达州市", "loc_x": 107.502262, "loc_y": 31.209484 },
        "130200000000": { "loc_id": "130200000000", "loc_namecn": "唐山市", "loc_x": 118.175393, "loc_y": 39.635113 },
        "140600000000": { "loc_id": "140600000000", "loc_namecn": "朔州市", "loc_x": 112.433387, "loc_y": 39.331261 },
        "652100000000": { "loc_id": "652100000000", "loc_namecn": "吐鲁番地区", "loc_x": 89.184078, "loc_y": 42.947613 },
        "445100000000": { "loc_id": "445100000000", "loc_namecn": "潮州市", "loc_x": 116.632301, "loc_y": 23.661701 },
        "520500000000": { "loc_id": "520500000000", "loc_namecn": "毕节市", "loc_x": 105.284852, "loc_y": 27.302085 },
        "620100000000": { "loc_id": "620100000000", "loc_namecn": "兰州市", "loc_x": 103.823557, "loc_y": 36.058039 },
        "230300000000": { "loc_id": "230300000000", "loc_namecn": "鸡西市", "loc_x": 130.975966, "loc_y": 45.300046 },
        "320700000000": { "loc_id": "320700000000", "loc_namecn": "连云港市", "loc_x": 119.178821, "loc_y": 34.600018 },
        "130700000000": { "loc_id": "130700000000", "loc_namecn": "张家口市", "loc_x": 114.884091, "loc_y": 40.811901 },
        "140100000000": { "loc_id": "140100000000", "loc_namecn": "太原市", "loc_x": 112.549248, "loc_y": 37.857014 },
        "460100000000": { "loc_id": "460100000000", "loc_namecn": "海口市", "loc_x": 110.33119, "loc_y": 20.031971 },
        "420900000000": { "loc_id": "420900000000", "loc_namecn": "孝感市", "loc_x": 113.926655, "loc_y": 30.926423 },
        "411100000000": { "loc_id": "411100000000", "loc_namecn": "漯河市", "loc_x": 114.026405, "loc_y": 33.575855 },
        "440100000000": { "loc_id": "440100000000", "loc_namecn": "广州市", "loc_x": 113.280637, "loc_y": 23.125178 },
        "320800000000": { "loc_id": "320800000000", "loc_namecn": "淮安市", "loc_x": 119.021265, "loc_y": 33.597506 },
        "320000000000": { "loc_id": "320000000000", "loc_namecn": "江苏", "loc_x": null, "loc_y": null },
        "620500000000": { "loc_id": "620500000000", "loc_namecn": "天水市", "loc_x": 105.724998, "loc_y": 34.578529 },
        "450700000000": { "loc_id": "450700000000", "loc_namecn": "钦州市", "loc_x": 108.624175, "loc_y": 21.967127 },
        "441300000000": { "loc_id": "441300000000", "loc_namecn": "惠州市", "loc_x": 114.412599, "loc_y": 23.079404 },
        "371200000000": { "loc_id": "371200000000", "loc_namecn": "莱芜市", "loc_x": 117.677736, "loc_y": 36.214397 },
        "370300000000": { "loc_id": "370300000000", "loc_namecn": "淄博市", "loc_x": 118.047648, "loc_y": 36.814939 },
        "513200000000": { "loc_id": "513200000000", "loc_namecn": "阿坝藏族羌族自治州", "loc_x": 102.221374, "loc_y": 31.899792 },
        "210500000000": { "loc_id": "210500000000", "loc_namecn": "本溪市", "loc_x": 123.770519, "loc_y": 41.297909 },
        "450400000000": { "loc_id": "450400000000", "loc_namecn": "梧州市", "loc_x": 111.316229, "loc_y": 23.472309 },
        "411500000000": { "loc_id": "411500000000", "loc_namecn": "信阳市", "loc_x": 114.075031, "loc_y": 32.123274 },
        "632300000000": { "loc_id": "632300000000", "loc_namecn": "黄南藏族自治州", "loc_x": 102.019988, "loc_y": 35.517744 },
        "440500000000": { "loc_id": "440500000000", "loc_namecn": "汕头市", "loc_x": 116.708463, "loc_y": 23.37102 },
        "650000000000": { "loc_id": "650000000000", "loc_namecn": "新疆", "loc_x": null, "loc_y": null },
        "610000000000": { "loc_id": "610000000000", "loc_namecn": "陕西", "loc_x": null, "loc_y": null },
        "430000000000": { "loc_id": "430000000000", "loc_namecn": "湖南", "loc_x": null, "loc_y": null },
        "360700000000": { "loc_id": "360700000000", "loc_namecn": "赣州市", "loc_x": 114.940278, "loc_y": 25.85097 },
        "650100000000": { "loc_id": "650100000000", "loc_namecn": "乌鲁木齐市", "loc_x": 87.617733, "loc_y": 43.792818 },
        "610800000000": { "loc_id": "610800000000", "loc_namecn": "榆林市", "loc_x": 109.741193, "loc_y": 38.290162 },
        "370200000000": { "loc_id": "370200000000", "loc_namecn": "青岛市", "loc_x": 120.369557, "loc_y": 36.094406 },
        "620900000000": { "loc_id": "620900000000", "loc_namecn": "酒泉市", "loc_x": 98.510795, "loc_y": 39.744023 },
        "520100000000": { "loc_id": "520100000000", "loc_namecn": "贵阳市", "loc_x": 106.713478, "loc_y": 26.578343 },
        "350400000000": { "loc_id": "350400000000", "loc_namecn": "三明市", "loc_x": 117.635001, "loc_y": 26.265444 },
        "441900000000": { "loc_id": "441900000000", "loc_namecn": "东莞市", "loc_x": 113.760234, "loc_y": 23.048884 },
        "131000000000": { "loc_id": "131000000000", "loc_namecn": "廊坊市", "loc_x": 116.713873, "loc_y": 39.529244 },
        "341700000000": { "loc_id": "341700000000", "loc_namecn": "池州市", "loc_x": 117.489157, "loc_y": 30.656037 },
        "360900000000": { "loc_id": "360900000000", "loc_namecn": "宜春市", "loc_x": 114.391136, "loc_y": 27.8043 },
        "430300000000": { "loc_id": "430300000000", "loc_namecn": "湘潭市", "loc_x": 112.925083, "loc_y": 27.846725 },
        "370400000000": { "loc_id": "370400000000", "loc_namecn": "枣庄市", "loc_x": 117.557964, "loc_y": 34.856424 },
        "130900000000": { "loc_id": "130900000000", "loc_namecn": "沧州市", "loc_x": 116.857461, "loc_y": 38.310582 },
        "211400000000": { "loc_id": "211400000000", "loc_namecn": "葫芦岛市", "loc_x": 120.856394, "loc_y": 40.755572 },
        "341800000000": { "loc_id": "341800000000", "loc_namecn": "宣城市", "loc_x": 118.757995, "loc_y": 30.945667 },
        "140400000000": { "loc_id": "140400000000", "loc_namecn": "长治市", "loc_x": 113.113556, "loc_y": 36.191112 },
        "611000000000": { "loc_id": "611000000000", "loc_namecn": "商洛市", "loc_x": 109.939776, "loc_y": 33.868319 },
        "411200000000": { "loc_id": "411200000000", "loc_namecn": "三门峡市", "loc_x": 111.194099, "loc_y": 34.777338 },
        "632200000000": { "loc_id": "632200000000", "loc_namecn": "海北藏族自治州", "loc_x": 100.901059, "loc_y": 36.959435 },
        "410700000000": { "loc_id": "410700000000", "loc_namecn": "新乡市", "loc_x": 113.883991, "loc_y": 35.302616 },
        "150500000000": { "loc_id": "150500000000", "loc_namecn": "通辽市", "loc_x": 122.263119, "loc_y": 43.617429 },
        "542100000000": { "loc_id": "542100000000", "loc_namecn": "昌都地区", "loc_x": 97.178452, "loc_y": 31.136875 },
        "371400000000": { "loc_id": "371400000000", "loc_namecn": "德州市", "loc_x": 116.307428, "loc_y": 37.453968 },
        "321200000000": { "loc_id": "321200000000", "loc_namecn": "泰州市", "loc_x": 119.915176, "loc_y": 32.484882 },
        "330700000000": { "loc_id": "330700000000", "loc_namecn": "金华市", "loc_x": 119.649506, "loc_y": 29.089524 },
        "370700000000": { "loc_id": "370700000000", "loc_namecn": "潍坊市", "loc_x": 119.107078, "loc_y": 36.70925 },
        "430200000000": { "loc_id": "430200000000", "loc_namecn": "株洲市", "loc_x": 113.151737, "loc_y": 27.835806 },
        "610400000000": { "loc_id": "610400000000", "loc_namecn": "咸阳市", "loc_x": 108.705117, "loc_y": 34.333439 },
        "440900000000": { "loc_id": "440900000000", "loc_namecn": "茂名市", "loc_x": 110.919229, "loc_y": 21.659751 },
        "330600000000": { "loc_id": "330600000000", "loc_namecn": "绍兴市", "loc_x": 120.582112, "loc_y": 29.997117 },
        "632600000000": { "loc_id": "632600000000", "loc_namecn": "果洛藏族自治州", "loc_x": 100.242143, "loc_y": 34.4736 },
        "621000000000": { "loc_id": "621000000000", "loc_namecn": "庆阳市", "loc_x": 107.638372, "loc_y": 35.734218 },
        "441700000000": { "loc_id": "441700000000", "loc_namecn": "阳江市", "loc_x": 111.975107, "loc_y": 21.859222 },
        "310000000000": { "loc_id": "310000000000", "loc_namecn": "上海", "loc_x": 121.472644, "loc_y": 31.231706 },
        "440200000000": { "loc_id": "440200000000", "loc_namecn": "韶关市", "loc_x": 113.591544, "loc_y": 24.801322 },
        "230900000000": { "loc_id": "230900000000", "loc_namecn": "七台河市", "loc_x": 131.015584, "loc_y": 45.771266 },
        "511000000000": { "loc_id": "511000000000", "loc_namecn": "内江市", "loc_x": 105.066138, "loc_y": 29.58708 },
        "140300000000": { "loc_id": "140300000000", "loc_namecn": "阳泉市", "loc_x": 113.583285, "loc_y": 37.861188 },
        "150600000000": { "loc_id": "150600000000", "loc_namecn": "鄂尔多斯市", "loc_x": 109.99029, "loc_y": 39.817179 },
        "430100000000": { "loc_id": "430100000000", "loc_namecn": "长沙市", "loc_x": 112.982279, "loc_y": 28.19409 },
        "110000000000": { "loc_id": "110000000000", "loc_namecn": "北京", "loc_x": 116.405285, "loc_y": 39.904989 },
        "450800000000": { "loc_id": "450800000000", "loc_namecn": "贵港市", "loc_x": 109.602146, "loc_y": 23.0936 },
        "230600000000": { "loc_id": "230600000000", "loc_namecn": "大庆市", "loc_x": 125.11272, "loc_y": 46.590734 },
        "640100000000": { "loc_id": "640100000000", "loc_namecn": "银川市", "loc_x": 106.278179, "loc_y": 38.46637 },
        "330000000000": { "loc_id": "330000000000", "loc_namecn": "浙江", "loc_x": null, "loc_y": null },
        "411600000000": { "loc_id": "411600000000", "loc_namecn": "周口市", "loc_x": 114.649653, "loc_y": 33.620357 },
        "410300000000": { "loc_id": "410300000000", "loc_namecn": "洛阳市", "loc_x": 112.434468, "loc_y": 34.663041 },
        "350000000000": { "loc_id": "350000000000", "loc_namecn": "福建", "loc_x": null, "loc_y": null },
        "440800000000": { "loc_id": "440800000000", "loc_namecn": "湛江市", "loc_x": 110.405529, "loc_y": 21.195338 },
        "513400000000": { "loc_id": "513400000000", "loc_namecn": "凉山彝族自治州", "loc_x": 102.258746, "loc_y": 27.886762 },
        "130800000000": { "loc_id": "130800000000", "loc_namecn": "承德市", "loc_x": 117.939152, "loc_y": 40.976204 },
        "419000000000": { "loc_id": "419000000000", "loc_namecn": "省直辖县级行政区划", "loc_x": null, "loc_y": null },
        "361000000000": { "loc_id": "361000000000", "loc_namecn": "抚州市", "loc_x": 116.358351, "loc_y": 27.98385 },
        "220100000000": { "loc_id": "220100000000", "loc_namecn": "长春市", "loc_x": 125.3245, "loc_y": 43.886841 },
        "360100000000": { "loc_id": "360100000000", "loc_namecn": "南昌市", "loc_x": 115.892151, "loc_y": 28.676493 },
        "540000000000": { "loc_id": "540000000000", "loc_namecn": "西藏", "loc_x": null, "loc_y": null },
        "140200000000": { "loc_id": "140200000000", "loc_namecn": "大同市", "loc_x": 113.295259, "loc_y": 40.09031 },
        "533100000000": { "loc_id": "533100000000", "loc_namecn": "德宏傣族景颇族自治州", "loc_x": 98.578363, "loc_y": 24.436694 },
        "150100000000": { "loc_id": "150100000000", "loc_namecn": "呼和浩特市", "loc_x": 111.670801, "loc_y": 40.818311 },
        "450300000000": { "loc_id": "450300000000", "loc_namecn": "桂林市", "loc_x": 110.299121, "loc_y": 25.274215 },
        "440600000000": { "loc_id": "440600000000", "loc_namecn": "佛山市", "loc_x": 113.122717, "loc_y": 23.028762 },
        "640000000000": { "loc_id": "640000000000", "loc_namecn": "宁夏", "loc_x": null, "loc_y": null },
        "510300000000": { "loc_id": "510300000000", "loc_namecn": "自贡市", "loc_x": 104.773447, "loc_y": 29.352765 },
        "330300000000": { "loc_id": "330300000000", "loc_namecn": "温州市", "loc_x": 120.672111, "loc_y": 28.000575 },
        "210900000000": { "loc_id": "210900000000", "loc_namecn": "阜新市", "loc_x": 121.648962, "loc_y": 42.011796 },
        "371100000000": { "loc_id": "371100000000", "loc_namecn": "日照市", "loc_x": 119.461208, "loc_y": 35.428588 },
        "421100000000": { "loc_id": "421100000000", "loc_namecn": "黄冈市", "loc_x": 114.879365, "loc_y": 30.447711 },
        "220500000000": { "loc_id": "220500000000", "loc_namecn": "通化市", "loc_x": 125.936501, "loc_y": 41.721177 },
        "430500000000": { "loc_id": "430500000000", "loc_namecn": "邵阳市", "loc_x": 111.46923, "loc_y": 27.237842 },
        "420000000000": { "loc_id": "420000000000", "loc_namecn": "湖北", "loc_x": null, "loc_y": null },
        "150700000000": { "loc_id": "150700000000", "loc_namecn": "呼伦贝尔市", "loc_x": 119.758168, "loc_y": 49.215333 },
        "341000000000": { "loc_id": "341000000000", "loc_namecn": "黄山市", "loc_x": 118.317325, "loc_y": 29.709239 },
        "542500000000": { "loc_id": "542500000000", "loc_namecn": "阿里地区", "loc_x": 80.105498, "loc_y": 32.503187 },
        "530400000000": { "loc_id": "530400000000", "loc_namecn": "玉溪市", "loc_x": 102.543907, "loc_y": 24.350461 },
        "640200000000": { "loc_id": "640200000000", "loc_namecn": "石嘴山市", "loc_x": 106.376173, "loc_y": 39.01333 },
        "361100000000": { "loc_id": "361100000000", "loc_namecn": "上饶市", "loc_x": 117.971185, "loc_y": 28.44442 },
        "371600000000": { "loc_id": "371600000000", "loc_namecn": "滨州市", "loc_x": 118.016974, "loc_y": 37.383542 },
        "340400000000": { "loc_id": "340400000000", "loc_namecn": "淮南市", "loc_x": 117.025449, "loc_y": 32.645947 },
        "230200000000": { "loc_id": "230200000000", "loc_namecn": "齐齐哈尔市", "loc_x": 123.953486, "loc_y": 47.348079 },
        "511500000000": { "loc_id": "511500000000", "loc_namecn": "宜宾市", "loc_x": 104.630825, "loc_y": 28.760189 },
        "131100000000": { "loc_id": "131100000000", "loc_namecn": "衡水市", "loc_x": 115.665993, "loc_y": 37.735097 },
        "640500000000": { "loc_id": "640500000000", "loc_namecn": "中卫市", "loc_x": 105.189568, "loc_y": 37.514951 },
        "140000000000": { "loc_id": "140000000000", "loc_namecn": "山西", "loc_x": null, "loc_y": null },
        "420600000000": { "loc_id": "420600000000", "loc_namecn": "襄阳市", "loc_x": 112.144146, "loc_y": 32.042426 },
        "510400000000": { "loc_id": "510400000000", "loc_namecn": "攀枝花市", "loc_x": 101.716007, "loc_y": 26.580446 },
        "445300000000": { "loc_id": "445300000000", "loc_namecn": "云浮市", "loc_x": 112.044439, "loc_y": 22.929801 },
        "150300000000": { "loc_id": "150300000000", "loc_namecn": "乌海市", "loc_x": 106.825563, "loc_y": 39.673734 },
        "370800000000": { "loc_id": "370800000000", "loc_namecn": "济宁市", "loc_x": 116.587245, "loc_y": 35.415393 },
        "621200000000": { "loc_id": "621200000000", "loc_namecn": "陇南市", "loc_x": 104.929379, "loc_y": 33.388598 },
        "451200000000": { "loc_id": "451200000000", "loc_namecn": "河池市", "loc_x": 108.062105, "loc_y": 24.695899 },
        "220400000000": { "loc_id": "220400000000", "loc_namecn": "辽源市", "loc_x": 125.145349, "loc_y": 42.902692 },
        "211200000000": { "loc_id": "211200000000", "loc_namecn": "铁岭市", "loc_x": 123.844279, "loc_y": 42.290585 },
        "370100000000": { "loc_id": "370100000000", "loc_namecn": "济南市", "loc_x": 117.000923, "loc_y": 36.675807 },
        "410600000000": { "loc_id": "410600000000", "loc_namecn": "鹤壁市", "loc_x": 114.295444, "loc_y": 35.748236 },
        "441200000000": { "loc_id": "441200000000", "loc_namecn": "肇庆市", "loc_x": 112.472529, "loc_y": 23.051546 },
        "512000000000": { "loc_id": "512000000000", "loc_namecn": "资阳市", "loc_x": 104.641917, "loc_y": 30.122211 },
        "632800000000": { "loc_id": "632800000000", "loc_namecn": "海西蒙古族藏族自治州", "loc_x": 97.370785, "loc_y": 37.374663 },
        "330800000000": { "loc_id": "330800000000", "loc_namecn": "衢州市", "loc_x": 118.87263, "loc_y": 28.941708 },
        "430800000000": { "loc_id": "430800000000", "loc_namecn": "张家界市", "loc_x": 110.479921, "loc_y": 29.127401 },
        "231000000000": { "loc_id": "231000000000", "loc_namecn": "牡丹江市", "loc_x": 129.618602, "loc_y": 44.582962 },
        "511400000000": { "loc_id": "511400000000", "loc_namecn": "眉山市", "loc_x": 103.831788, "loc_y": 30.048318 },
        "150800000000": { "loc_id": "150800000000", "loc_namecn": "巴彦淖尔市", "loc_x": 107.416959, "loc_y": 40.757402 },
        "510700000000": { "loc_id": "510700000000", "loc_namecn": "绵阳市", "loc_x": 104.741722, "loc_y": 31.46402 },
        "370500000000": { "loc_id": "370500000000", "loc_namecn": "东营市", "loc_x": 118.4963, "loc_y": 37.461266 },
        "410200000000": { "loc_id": "410200000000", "loc_namecn": "开封市", "loc_x": 114.341447, "loc_y": 34.797049 },
        "532300000000": { "loc_id": "532300000000", "loc_namecn": "楚雄彝族自治州", "loc_x": 101.546046, "loc_y": 25.041988 },
        "152200000000": { "loc_id": "152200000000", "loc_namecn": "兴安盟", "loc_x": 122.070317, "loc_y": 46.076268 }
    },
    getLoc: function getLoc(loc_id) {
        var loc = this._data[loc_id];
        if (loc) {
            return loc;
        } else {
            return {};
        }
    },
    getCityLongId: function getCityLongId(cityId, prov) {
        if (!cityId) {
            return undefined;
        }
        if (cityId.length == 2) {
            if (prov) {
                cityId += "00";
            } else {
                cityId += ["11", "12", "31", "50"].indexOf(cityId) != -1 ? "00" : "01";
            }
        }
        if (cityId.length == 4) {
            cityId = cityId + "00000000";
            var rv = this._data[cityId];
            if (!rv) {
                cityId = cityId.substr(0, 2) + "0100000000";
            }
            rv = this._data[cityId];
            if (!rv) {
                return undefined;
            }
        }
        return cityId;
    },
    getCityName: function getCityName(cityId, prov) {
        cityId = this.getCityLongId(cityId, prov);
        if (this.getLoc(cityId).loc_namecn) {
            return this.getLoc(cityId).loc_namecn.replace('市', '');
        }
        return undefined;
    },
    getProvinceName: function getProvinceName(provId) {
        var loc;
        if (!provId) {
            return undefined;
        }
        if (provId.length == 12) {
            loc = this.getLoc(provId);
            return loc.loc_namecn;
        }

        return undefined;
    },
    getProv: function getProv(provName) {
        var rv = false;
        //console.log(this.province);
        this.province.forEach(function (prov) {
            if (provName.indexOf(prov.name) > -1) {
                rv = prov;
            }
        });
        return rv;
    },

    getProvId: function getProvId(provName) {
        var rv = false;
        //console.log(this.province);
        this.province.forEach(function (prov) {

            if (provName.indexOf(prov.name) > -1) {
                rv = prov.pid;
                return rv;
            }
        });
        return rv;
    },
    findProvRegion: function findProvRegion(provName) {
        var regionKey = "";
        Object.keys(REGION).forEach(function (k) {
            if (REGION[k].provList.indexOf(provName) != -1) {
                regionKey = k;
            }
        });
        return regionKey;
    }
};

var REGION = {
    "region_huabei": {
        "title": "华北",
        "provList": ["北京", "内蒙古", "天津", "河北", "山西"]
    },
    "region_dongbei": {
        "title": "东北",
        "provList": ["辽宁", "黑龙江", "吉林"]
    },
    "region_huadong": {
        "title": "华东",
        "provList": ["上海", "江苏", "浙江", "安徽", "福建", "江西", "山东"]
    },
    "region_huazhong": {
        "title": "华中",
        "provList": ["河南", "湖北", "湖南"]
    },
    "region_huanan": {
        "title": "华南",
        "provList": ["广东", "广西", "海南"]
    },
    "region_xinan": {
        "title": "西南",
        "provList": ["重庆", "四川", "贵州", "云南", "西藏"]
    },
    "region_xibei": {
        "title": "西北",
        "provList": ["陕西", "甘肃", "青海", "宁夏", "新疆"]
    }
};

var no_data_provinces = ["540000000000", "310000000000"]; //完全没有数据的省份
var no_data_provinces_2014 = ["460000000000", "330000000000"]; //14年没有录取数据省份
var not_ratio_provinces = ["110000000000", "650000000000", "420000000000", "330000000000"]; //因为政策原因无法计算得出录取概率省份
var no_data_provinces_2015 = ["330000000000", "350000000000"]; //15年没有录取数据省份

var no_data_provinces_2015 = ["330000000000", "350000000000"]; //14年没有录取数据省份

var data_is_dealing_provs = ['广东', '上海', '辽宁', '湖北', '江西', '内蒙古', '重庆', '贵州', '天津', '河北'];

var hot_cities_names = ["北京", "上海", "深圳", "广州", "武汉", "西安", "南京", "天津", "成都", "长春", "重庆", "沈阳", "哈尔滨", "杭州", "济南", "长沙", "大连", "青岛", "宁波", "厦门"];
var air_fresh_cities_names = ["广州", "南昌", "昆明", "贵阳", "福州", "南宁", "呼和浩特", "宁波", "烟台", "银川", "厦门", "温州"];
var happy_cities_names = ["西安", "南京", "天津", "成都", "长春", "杭州", "长沙", "大连", "珠海", "岳阳"];

var provid = ["31", "63", "32", "42", "35", "11", "37", "61", "54", "12", "21", "65", "44", "45", "36", "15", "51", "23", "34", "13", "14", "43", "22", "50", "33", "41", "62", "52", "46", "53", "64"];

var prov_py = {
    11: "B", 12: "T", 13: "H", 14: "S",
    15: "N", 21: "L", 22: "J", 23: "H",
    31: "S", 32: "J", 33: "Z", 34: "A",
    35: "F", 36: "J", 37: "S", 41: "H",
    42: "H", 43: "H", 44: "G", 45: "G", 46: "H",
    50: "C", 51: "S", 52: "G", 53: "Y", 54: "X",
    61: "S", 62: "G", 63: "Q", 64: "N", 65: "X"
};
var province = [];
var provinceMap = {};
var cityName2ProvinceIdMap = {};

provid.forEach(function (i) {
    var cityId = module.exports.getCityLongId(i + "00");
    var city = module.exports.getLoc(cityId);
    var info = { "py": prov_py[i], "pid": i, name: city.loc_namecn, loc_id: city.loc_id };
    province.push(info);
    provinceMap[info.name] = info;
});
province.sort(function (a, b) {
    return a.py.charCodeAt() > b.py.charCodeAt() ? 1 : -1;
});

function getProvInfoByName(provName) {
    var strMap = [provName, provName.slice(0, -1), provName + "省", provName + "市"];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = strMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var str = _step.value;

            if (str in provinceMap) {
                return provinceMap[str];
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return null;
}
var _getCityInfoMap = function getCityInfoMap() {
    var locData = module.exports._data;
    var locInfoFromNameMap = {};
    for (var key in locData) {
        locInfoFromNameMap[locData[key].loc_namecn] = locData[key];
    }
    _getCityInfoMap = function getCityInfoMap() {
        return locInfoFromNameMap;
    };
    return locInfoFromNameMap;
};

function getCityInfoByName(cityName) {
    var strMap = [cityName, cityName.slice(0, -1), cityName + "市"];
    var cityInfoMap = _getCityInfoMap();

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = strMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var str = _step2.value;

            if (str in cityInfoMap) {
                return cityInfoMap[str];
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return null;
}
var _getTopCity = function getTopCity() {
    var getCityInfoList = function getCityInfoList(cityList) {
        var cityInfos = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = cityList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var city = _step3.value;

                cityInfos.push(getCityInfoByName(city));
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return cityInfos;
    };
    var rv = {
        hot_cities: getCityInfoList(hot_cities_names),
        air_fresh_cities: getCityInfoList(air_fresh_cities_names),
        happy_cities: getCityInfoList(happy_cities_names)
    };
    _getTopCity = function getTopCity() {
        return rv;
    };
    return rv;
};

var contains = function contains(arr, e) {

    for (var i = 0; i < arr.length; i++) {

        if (arr[i] == e) {
            return true;
        }
    }
    return false;
};

var filterProvinceId = function filterProvinceId(list) {
    if (!list) {
        return [];
    }
    ;

    var allPro = "";

    for (var index in list) {
        var item = list[index];

        if (item.length > 6) {

            var pr = item.substr(0, 2);
            var city = item.substr(2, 6);
            pin.log(pr);
            pin.log(city);
            if (contains(provid, pr) == true && city == "0000") {
                if (allPro == "") {
                    allPro = item;
                } else {
                    allPro = allPro + "," + item;
                }

                pin.log(allPro);
            }
        }
        ;
    }

    return allPro;
};

var filterCityId = function filterCityId(list) {

    if (!list) {
        return [];
    }
    ;

    var allCity = "";

    for (var index in list) {
        var item = list[index];
        if (item.length > 6) {

            var pr = item.substr(0, 2);
            var city = item.substr(2, 6);

            if (city != "0000") {

                if (allCity == "") {
                    allCity = item;
                } else {
                    allCity = allCity + "," + item;
                }
            }
        }
        ;
    }

    return allCity;
};

var getProvIdFromCityName = function getProvIdFromCityName(cityName) {
    var pid;
    if (!cityName) {
        return pid;
    }
    ;

    var cityInfo = getCityInfoByName(cityName);

    if (!cityInfo) {
        return pid;
    }
    ;

    pid = cityInfo.loc_id.slice(0, 2);

    return pid;
};

var getRegionIdsFromCityName = function getRegionIdsFromCityName(cityName) {
    var region = [];
    var pid = getProvIdFromCityName(cityName);

    if (pid) {
        var loc = module.exports.getLoc(pid + "0000000000");
        var re = module.exports.findProvRegion(loc.loc_namecn);

        Object.keys(REGION).forEach(function (k) {

            if (k == re) {
                region = REGION[k].provList;
            }
        });
    }
    ;

    var pids = [];
    for (var i in region) {
        var proName = region[i];
        var pid = module.exports.getProvId(proName);
        pids.push(pid + "0000000000");
    }
    return pids;
};

var isSupportProvince = function isSupportProvince(provid) {

    for (var i in no_data_provinces) {
        if (provid == no_data_provinces[i]) {
            return false;
        }
        ;
    }
    return true;
};

var isNoData2014 = function isNoData2014(provid) {
    for (var i in no_data_provinces_2014) {
        if (provid == no_data_provinces_2014[i]) {
            return true;
        }
    }
};

var isNoData2015 = function isNoData2015(provid) {
    for (var i in no_data_provinces_2015) {
        if (provid == no_data_provinces_2015[i]) {
            return true;
        }
    }
};

var isDataDealing = function isDataDealing(loc_name) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = data_is_dealing_provs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var item = _step4.value;

            if (loc_name.indexOf(item) != -1) {
                return true;
            }
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    return false;
};

module.exports.prov_py = prov_py;
module.exports.province = province;
module.exports.REGION = REGION;
module.exports.no_data_provinces = no_data_provinces;
module.exports.no_data_provinces_2014 = no_data_provinces_2014;
module.exports.not_ratio_provinces = not_ratio_provinces;
module.exports.getProvInfoByName = getProvInfoByName;
module.exports.getCityInfoByName = getCityInfoByName;
module.exports.getTopCity = _getTopCity;
module.exports.filterProvinceId = filterProvinceId;
module.exports.filterCityId = filterCityId;
module.exports.getProvIdFromCityName = getProvIdFromCityName;
module.exports.getRegionIdsFromCityName = getRegionIdsFromCityName;
module.exports.isSupportProvince = isSupportProvince;
module.exports.isNoData2014 = isNoData2014;
module.exports.isNoData2015 = isNoData2015;
module.exports.isDataDealing = isDataDealing;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _url = __webpack_require__(1);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init(xinSwiper) {
	// 监听获取vip体验卡按钮
	$("#vip-btn").on("click", function () {
		getVip(xinSwiper);
	});
	// 监听获取验证码按钮
	$(document).on("click", ".get-auto-code", function () {
		console.log("xdd");
		getAutoCode(xinSwiper);
	});
	//监听介绍页面的获取vip按钮
	$("#get-vip-btn").on("click", function () {
		xinSwiper.slideNext();
	});
	$(document).scroll(function () {
		if (xinSwiper.activeIndex === 2) {
			var bottomNum = $(".swiper-slide").eq(xinSwiper.activeIndex).height() - $(window).height() - $(document).scrollTop() - 1;
			$("#get-vip-btn").css({ "bottom": bottomNum + "px" });
		};
	});
};
///检查输入的手机号码
var checkMobile = function checkMobile(mobile) {
	if (!mobile) {
		alert("请先输入手机号码！");
		return false;
	} else if (!/^1[34578]\d{9}$/.test(mobile)) {
		alert("手机号码格式不正确，请检查");
		return false;
	} else {
		return true;
	};
};
// 改变获取验证码按钮
var countdown = 120,
    $getAutoCode = $("#get-auto-code");
var changeAutoCode = function changeAutoCode() {
	if (countdown === 0) {
		$getAutoCode.addClass('get-auto-code');
		$getAutoCode.text("发送验证码");
		countdown = 120;
	} else {
		$getAutoCode.removeClass("get-auto-code");
		$getAutoCode.text("重新发送(" + countdown + ")");
		countdown--;
		setTimeout(function () {
			changeAutoCode();
		}, 1000);
	};
};
var getAutoCode = function getAutoCode(xinSwiper) {
	var mobile = $("#mobile").val();
	if (!checkMobile(mobile)) {
		return;
	};
	changeAutoCode();
	$.ajax({
		type: "post",
		cache: false,
		url: _url2.default.autoUrl,
		data: $(".vip-form").serialize(),
		success: function success(data) {
			console.log(data);
			switch (data.code) {
				case 0:
					break;
				case 11007:
					alert("短信验证码已经发送");
					break;
				case 12001:
					alert("手机号码格式错误");
					break;
				case 11301:
					alert("您已领取过体验卡");
					break;
				default:
					break;
			}
		},
		error: function error(request, _error) {
			alert("服务器错误！");
		}
	});
};
var getVip = function getVip(xinSwiper) {
	var mobile = $("#mobile").val(),
	    autoCode = $("#auto-code").val();
	if (!checkMobile(mobile)) {
		return;
	};
	if (!autoCode) {
		alert("请输入验证码！");
		return;
	};
	$.ajax({
		type: "post",
		cache: false,
		url: _url2.default.vipUrl,
		data: $(".vip-form").serialize(),
		success: function success(data) {
			console.log(data);
			switch (data.code) {
				case 0:
					$(".result-text .text").text("领取成功！");
					xinSwiper.slideNext();
					break;
				case 11301:
					alert("您已领取过体验卡");
					break;
				case 11302:
					alert("体验卡已经被领取完了");
					break;
				case 10005:
					alert("短信验证码不合法");
					break;
				default:
					break;
			}
		},
		error: function error(request, _error2) {
			alert("服务器错误！");
		}
	});
};
module.exports = {
	init: init
};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _url = __webpack_require__(1);

var _url2 = _interopRequireDefault(_url);

var _loc = __webpack_require__(2);

var _loc2 = _interopRequireDefault(_loc);

var _queryString = __webpack_require__(7);

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var analysisReport = __webpack_require__(0);
var init = function init(xinSwiper) {
	//获取url参数，初始化页面
	initPage();
	// 初始化省份列表
	createProv();
	//监听打开选择省份
	$(document).on("click", "#prov-name", function () {
		if ($(".js-open").length) {
			$(".js-open").click();
		} else {
			$(".js-close").click();
		};
	});
	$(document).on("click", ".js-open", function () {
		openProv(this);
	});
	//监听关闭选择省份
	$(document).on("click", ".js-close", function () {
		closeProv(this);
	});
	//监听选择省份
	$(document).on("click", ".prov-list li", function () {
		selectProv(this);
	});
	// 文理科监听
	$(".subject-type span").on("click", function () {
		selectSubject(this);
	});
	// 监听学校联想
	$("#school-input").on("input porpertychange", function () {
		guestSchool(this);
	});
	// 监听学校联想失去光标
	$("#school-input").on("focusout", function () {
		setTimeout(function () {
			$(".school-list").hide();
		}, 200);
	});
	//监听选择学校
	$(document).on("click", ".school-list li", function () {
		selectSchool(this);
	});
	// 监听生成报告
	$("#get-report").on("click", function () {
		var provId = $("#prov-name").data("val"),
		    score = $("#score").val(),
		    prevName = $("#prov-name").val(),
		    schoolName = $("#school-input").val(),
		    schoolId = $("#school-input").data("val");
		if (!provId) {
			alert("请选择省份！");
			return;
		};
		if (!$.trim(score)) {
			alert("请输入你的联考成绩！");
			return;
		} else {
			if (isNaN(score)) {
				alert("分数必须为数字");
				return;
			};
		};
		if (prevName === "江苏") {
			if (score < 0 || score > 480) {
				alert("江苏的分数范围为0~480");
				return;
			};
		} else if (prevName === "海南") {
			if (score < 0 || score > 900) {
				alert("海南的分数范围为0~900");
				return;
			};
		} else {
			if (score < 0 || score > 750) {
				alert("请输入正确的分数！");
				return;
			};
		};
		if (schoolName.length > 40) {
			alert("学校名长度不允许大于40字！");
			return;
		};
		if ($.trim(schoolName).length) {
			if (!schoolId) {
				alert("学校名无效！请清空或重新输入并选择下拉列表学校！");
				return;
			};
		};
		var examNum = $("#exam-no").val();
		var data = {
			req_id: examNum + Date.parse(new Date()),
			exam_no: examNum,
			province_id: provId,
			score: score,
			exp_sch_id: $("#school-input").data("val") || "",
			batch: $("#school-input").data("batch") || "",
			wenli: $(".subject-type .active").data("val")
		};
		analysisReport.swipeToAnalysisReportPage(data, xinSwiper);
	});
};
var setProvByName = function setProvByName(provName) {
	var provObj = _loc2.default.getProvInfoByName(provName);
	$("#prov-name").data("val", provObj.loc_id).val(provObj.name);
};
var initPage = function initPage() {
	var provName = _queryString2.default.getQueryString("prov_name") || "",
	    score = Math.round(_queryString2.default.getQueryString("score")),
	    salesmanId = _queryString2.default.getQueryString("salesman_id"),
	    examNo = _queryString2.default.getQueryString("exam_no");
	// 设置省份
	if (provName) {
		setProvByName(provName);
	} else {
		// 百度地图API功能
		if (typeof BMap != "undefined") {
			///浏览器和经纬度定位
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function (r) {
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {
					var point = new BMap.Point(r.point.lng, r.point.lat);
					var gc = new BMap.Geocoder();
					gc.getLocation(point, function (rs) {
						//getLocation函数用来解析地址信息，分别返回省市区街等
						var addComp = rs.addressComponents;
						var province = addComp.province; //获取省份
						setProvByName(province);
					});
				};
			});
		};
	};
	// 设置分数
	if (score) {
		$("#score").val(score);
	};
	//设置准考证号
	if (examNo) {
		$("#exam-no").val(examNo);
	};
	//设置销售人员id
	if (salesmanId) {
		$("#sales-man").val(salesmanId);
	};
};
var selectSchool = function selectSchool(that) {
	$("#school-input").data("val", $(that).data("val")).data("batch", $(that).data("batch")).val($(that).text());
	$(".school-list").hide();
};
var createSchoolList = function createSchoolList(list) {
	var schHtml = "";
	$.each(list, function (i, item) {
		schHtml += '<li data-batch=' + item.bacth + ' data-val=' + item.sch_id + '>' + item.sch_name + '</li>';
	});
	$(".school-list").hide().html(schHtml).show();
	$(".school-input").addClass("prov-input-active");

	if (!schHtml) {
		$(".school-list").hide();
		$(".school-input").removeClass("prov-input-active");
	};
};
var guestSchool = function guestSchool(that) {
	var schString = $(that).val();
	if (!schString) {
		return;
	};
	var data = {
		req_id: $("#exam-no").val() + Date.parse(new Date()),
		search_key: schString,
		wenli: $(".subject-type .active").data("val")
	};
	$.ajax({
		type: "post",
		cache: false,
		url: _url2.default.guestSchool,
		data: data,
		success: function success(data) {
			console.log(data);
			switch (data.code) {
				case 0:
					createSchoolList(data.sch_list);
				case -1:
					createSchoolList(data.sch_list);
					break;
				default:
					break;
			}
		},
		error: function error(request, _error) {
			// alert("服务器错误！")
		}
	});
};
var selectSubject = function selectSubject(that) {
	$(that).parent().find("span").removeClass("active").find('i').removeClass('icon-gou');
	$(that).addClass('active').find("i").addClass('icon-gou');
};
var createProv = function createProv() {
	var provHtml = "";
	$.each(_loc2.default.province, function (i, item) {
		provHtml += '<li data-val=' + item.loc_id + '>' + item.name + '</li>';
	});
	$(".prov-list").html(provHtml);
};
var openProv = function openProv(that) {
	$(that).addClass("js-close").removeClass("js-open").find("i").removeClass('icon-down').addClass('icon-close').end().parent().addClass("prov-input-active").end().closest('.prov-input-list').find('.prov-list').show();
};
var closeProv = function closeProv(that) {
	$(that).addClass("js-open").removeClass("js-close").find("i").removeClass('icon-close').addClass('icon-down').end().parent().removeClass("prov-input-active").end().closest('.prov-input-list').find('.prov-list').hide();
};
var selectProv = function selectProv(that) {
	$("#prov-name").data("val", $(that).data("val")).val($.trim($(that).text()));
	$(".js-close").click();
};
module.exports = {
	init: init
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Swiper 3.3.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: February 7, 2016
 */
!function () {
  "use strict";
  function e(e) {
    e.fn.swiper = function (a) {
      var s;return e(this).each(function () {
        var e = new t(this, a);s || (s = e);
      }), s;
    };
  }var a,
      t = function t(e, s) {
    function r(e) {
      return Math.floor(e);
    }function i() {
      y.autoplayTimeoutId = setTimeout(function () {
        y.params.loop ? (y.fixLoop(), y._slideNext(), y.emit("onAutoplay", y)) : y.isEnd ? s.autoplayStopOnLast ? y.stopAutoplay() : (y._slideTo(0), y.emit("onAutoplay", y)) : (y._slideNext(), y.emit("onAutoplay", y));
      }, y.params.autoplay);
    }function n(e, t) {
      var s = a(e.target);if (!s.is(t)) if ("string" == typeof t) s = s.parents(t);else if (t.nodeType) {
        var r;return s.parents().each(function (e, a) {
          a === t && (r = t);
        }), r ? t : void 0;
      }if (0 !== s.length) return s[0];
    }function o(e, a) {
      a = a || {};var t = window.MutationObserver || window.WebkitMutationObserver,
          s = new t(function (e) {
        e.forEach(function (e) {
          y.onResize(!0), y.emit("onObserverUpdate", y, e);
        });
      });s.observe(e, { attributes: "undefined" == typeof a.attributes ? !0 : a.attributes, childList: "undefined" == typeof a.childList ? !0 : a.childList, characterData: "undefined" == typeof a.characterData ? !0 : a.characterData }), y.observers.push(s);
    }function l(e) {
      e.originalEvent && (e = e.originalEvent);var a = e.keyCode || e.charCode;if (!y.params.allowSwipeToNext && (y.isHorizontal() && 39 === a || !y.isHorizontal() && 40 === a)) return !1;if (!y.params.allowSwipeToPrev && (y.isHorizontal() && 37 === a || !y.isHorizontal() && 38 === a)) return !1;if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
        if (37 === a || 39 === a || 38 === a || 40 === a) {
          var t = !1;if (y.container.parents(".swiper-slide").length > 0 && 0 === y.container.parents(".swiper-slide-active").length) return;var s = { left: window.pageXOffset, top: window.pageYOffset },
              r = window.innerWidth,
              i = window.innerHeight,
              n = y.container.offset();y.rtl && (n.left = n.left - y.container[0].scrollLeft);for (var o = [[n.left, n.top], [n.left + y.width, n.top], [n.left, n.top + y.height], [n.left + y.width, n.top + y.height]], l = 0; l < o.length; l++) {
            var p = o[l];p[0] >= s.left && p[0] <= s.left + r && p[1] >= s.top && p[1] <= s.top + i && (t = !0);
          }if (!t) return;
        }y.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !y.rtl || 37 === a && y.rtl) && y.slideNext(), (37 === a && !y.rtl || 39 === a && y.rtl) && y.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && y.slideNext(), 38 === a && y.slidePrev());
      }
    }function p(e) {
      e.originalEvent && (e = e.originalEvent);var a = y.mousewheel.event,
          t = 0,
          s = y.rtl ? -1 : 1;if ("mousewheel" === a) {
        if (y.params.mousewheelForceToAxis) {
          if (y.isHorizontal()) {
            if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;t = e.wheelDeltaX * s;
          } else {
            if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;t = e.wheelDeltaY;
          }
        } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * s : -e.wheelDeltaY;
      } else if ("DOMMouseScroll" === a) t = -e.detail;else if ("wheel" === a) if (y.params.mousewheelForceToAxis) {
        if (y.isHorizontal()) {
          if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;t = -e.deltaX * s;
        } else {
          if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;t = -e.deltaY;
        }
      } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * s : -e.deltaY;if (0 !== t) {
        if (y.params.mousewheelInvert && (t = -t), y.params.freeMode) {
          var r = y.getWrapperTranslate() + t * y.params.mousewheelSensitivity,
              i = y.isBeginning,
              n = y.isEnd;if (r >= y.minTranslate() && (r = y.minTranslate()), r <= y.maxTranslate() && (r = y.maxTranslate()), y.setWrapperTransition(0), y.setWrapperTranslate(r), y.updateProgress(), y.updateActiveIndex(), (!i && y.isBeginning || !n && y.isEnd) && y.updateClasses(), y.params.freeModeSticky ? (clearTimeout(y.mousewheel.timeout), y.mousewheel.timeout = setTimeout(function () {
            y.slideReset();
          }, 300)) : y.params.lazyLoading && y.lazy && y.lazy.load(), 0 === r || r === y.maxTranslate()) return;
        } else {
          if (new window.Date().getTime() - y.mousewheel.lastScrollTime > 60) if (0 > t) {
            if (y.isEnd && !y.params.loop || y.animating) {
              if (y.params.mousewheelReleaseOnEdges) return !0;
            } else y.slideNext();
          } else if (y.isBeginning && !y.params.loop || y.animating) {
            if (y.params.mousewheelReleaseOnEdges) return !0;
          } else y.slidePrev();y.mousewheel.lastScrollTime = new window.Date().getTime();
        }return y.params.autoplay && y.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1;
      }
    }function d(e, t) {
      e = a(e);var s,
          r,
          i,
          n = y.rtl ? -1 : 1;s = e.attr("data-swiper-parallax") || "0", r = e.attr("data-swiper-parallax-x"), i = e.attr("data-swiper-parallax-y"), r || i ? (r = r || "0", i = i || "0") : y.isHorizontal() ? (r = s, i = "0") : (i = s, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t * n + "%" : r * t * n + "px", i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t + "%" : i * t + "px", e.transform("translate3d(" + r + ", " + i + ",0px)");
    }function u(e) {
      return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e;
    }if (!(this instanceof t)) return new t(e, s);var c = { direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, autoplay: !1, autoplayDisableOnInteraction: !0, autoplayStopOnLast: !1, iOSEdgeSwipeDetection: !1, iOSEdgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", coverflow: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 }, flip: { slideShadows: !0, limitRotation: !0 }, cube: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 }, fade: { crossFade: !1 }, parallax: !1, scrollbar: null, scrollbarHide: !0, scrollbarDraggable: !1, scrollbarSnapOnRelease: !1, keyboardControl: !1, mousewheelControl: !1, mousewheelReleaseOnEdges: !1, mousewheelInvert: !1, mousewheelForceToAxis: !1, mousewheelSensitivity: 1, hashnav: !1, breakpoints: void 0, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, onlyExternal: !1, threshold: 0, touchMoveStopPropagation: !0, uniqueNavElements: !0, pagination: null, paginationElement: "span", paginationClickable: !1, paginationHide: !1, paginationBulletRender: null, paginationProgressRender: null, paginationFractionRender: null, paginationCustomRender: null, paginationType: "bullets", resistance: !0, resistanceRatio: .85, nextButton: null, prevButton: null, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, lazyLoading: !1, lazyLoadingInPrevNext: !1, lazyLoadingInPrevNextAmount: 1, lazyLoadingOnTransitionStart: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, control: void 0, controlInverse: !1, controlBy: "slide", allowSwipeToPrev: !0, allowSwipeToNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", slideClass: "swiper-slide", slideActiveClass: "swiper-slide-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slidePrevClass: "swiper-slide-prev", wrapperClass: "swiper-wrapper", bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", buttonDisabledClass: "swiper-button-disabled", paginationCurrentClass: "swiper-pagination-current", paginationTotalClass: "swiper-pagination-total", paginationHiddenClass: "swiper-pagination-hidden", paginationProgressbarClass: "swiper-pagination-progressbar", observer: !1, observeParents: !1, a11y: !1, prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", runCallbacksOnInit: !0 },
        m = s && s.virtualTranslate;s = s || {};var f = {};for (var g in s) {
      if ("object" != _typeof(s[g]) || null === s[g] || s[g].nodeType || s[g] === window || s[g] === document || "undefined" != typeof Dom7 && s[g] instanceof Dom7 || "undefined" != typeof jQuery && s[g] instanceof jQuery) f[g] = s[g];else {
        f[g] = {};for (var h in s[g]) {
          f[g][h] = s[g][h];
        }
      }
    }for (var v in c) {
      if ("undefined" == typeof s[v]) s[v] = c[v];else if ("object" == _typeof(s[v])) for (var w in c[v]) {
        "undefined" == typeof s[v][w] && (s[v][w] = c[v][w]);
      }
    }var y = this;if (y.params = s, y.originalParams = f, y.classNames = [], "undefined" != typeof a && "undefined" != typeof Dom7 && (a = Dom7), ("undefined" != typeof a || (a = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (y.$ = a, y.currentBreakpoint = void 0, y.getActiveBreakpoint = function () {
      if (!y.params.breakpoints) return !1;var e,
          a = !1,
          t = [];for (e in y.params.breakpoints) {
        y.params.breakpoints.hasOwnProperty(e) && t.push(e);
      }t.sort(function (e, a) {
        return parseInt(e, 10) > parseInt(a, 10);
      });for (var s = 0; s < t.length; s++) {
        e = t[s], e >= window.innerWidth && !a && (a = e);
      }return a || "max";
    }, y.setBreakpoint = function () {
      var e = y.getActiveBreakpoint();if (e && y.currentBreakpoint !== e) {
        var a = e in y.params.breakpoints ? y.params.breakpoints[e] : y.originalParams,
            t = y.params.loop && a.slidesPerView !== y.params.slidesPerView;for (var s in a) {
          y.params[s] = a[s];
        }y.currentBreakpoint = e, t && y.destroyLoop && y.reLoop(!0);
      }
    }, y.params.breakpoints && y.setBreakpoint(), y.container = a(e), 0 !== y.container.length)) {
      if (y.container.length > 1) {
        var b = [];return y.container.each(function () {
          b.push(new t(this, s));
        }), b;
      }y.container[0].swiper = y, y.container.data("swiper", y), y.classNames.push("swiper-container-" + y.params.direction), y.params.freeMode && y.classNames.push("swiper-container-free-mode"), y.support.flexbox || (y.classNames.push("swiper-container-no-flexbox"), y.params.slidesPerColumn = 1), y.params.autoHeight && y.classNames.push("swiper-container-autoheight"), (y.params.parallax || y.params.watchSlidesVisibility) && (y.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(y.params.effect) >= 0 && (y.support.transforms3d ? (y.params.watchSlidesProgress = !0, y.classNames.push("swiper-container-3d")) : y.params.effect = "slide"), "slide" !== y.params.effect && y.classNames.push("swiper-container-" + y.params.effect), "cube" === y.params.effect && (y.params.resistanceRatio = 0, y.params.slidesPerView = 1, y.params.slidesPerColumn = 1, y.params.slidesPerGroup = 1, y.params.centeredSlides = !1, y.params.spaceBetween = 0, y.params.virtualTranslate = !0, y.params.setWrapperSize = !1), ("fade" === y.params.effect || "flip" === y.params.effect) && (y.params.slidesPerView = 1, y.params.slidesPerColumn = 1, y.params.slidesPerGroup = 1, y.params.watchSlidesProgress = !0, y.params.spaceBetween = 0, y.params.setWrapperSize = !1, "undefined" == typeof m && (y.params.virtualTranslate = !0)), y.params.grabCursor && y.support.touch && (y.params.grabCursor = !1), y.wrapper = y.container.children("." + y.params.wrapperClass), y.params.pagination && (y.paginationContainer = a(y.params.pagination), y.params.uniqueNavElements && "string" == typeof y.params.pagination && y.paginationContainer.length > 1 && 1 === y.container.find(y.params.pagination).length && (y.paginationContainer = y.container.find(y.params.pagination)), "bullets" === y.params.paginationType && y.params.paginationClickable ? y.paginationContainer.addClass("swiper-pagination-clickable") : y.params.paginationClickable = !1, y.paginationContainer.addClass("swiper-pagination-" + y.params.paginationType)), (y.params.nextButton || y.params.prevButton) && (y.params.nextButton && (y.nextButton = a(y.params.nextButton), y.params.uniqueNavElements && "string" == typeof y.params.nextButton && y.nextButton.length > 1 && 1 === y.container.find(y.params.nextButton).length && (y.nextButton = y.container.find(y.params.nextButton))), y.params.prevButton && (y.prevButton = a(y.params.prevButton), y.params.uniqueNavElements && "string" == typeof y.params.prevButton && y.prevButton.length > 1 && 1 === y.container.find(y.params.prevButton).length && (y.prevButton = y.container.find(y.params.prevButton)))), y.isHorizontal = function () {
        return "horizontal" === y.params.direction;
      }, y.rtl = y.isHorizontal() && ("rtl" === y.container[0].dir.toLowerCase() || "rtl" === y.container.css("direction")), y.rtl && y.classNames.push("swiper-container-rtl"), y.rtl && (y.wrongRTL = "-webkit-box" === y.wrapper.css("display")), y.params.slidesPerColumn > 1 && y.classNames.push("swiper-container-multirow"), y.device.android && y.classNames.push("swiper-container-android"), y.container.addClass(y.classNames.join(" ")), y.translate = 0, y.progress = 0, y.velocity = 0, y.lockSwipeToNext = function () {
        y.params.allowSwipeToNext = !1;
      }, y.lockSwipeToPrev = function () {
        y.params.allowSwipeToPrev = !1;
      }, y.lockSwipes = function () {
        y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !1;
      }, y.unlockSwipeToNext = function () {
        y.params.allowSwipeToNext = !0;
      }, y.unlockSwipeToPrev = function () {
        y.params.allowSwipeToPrev = !0;
      }, y.unlockSwipes = function () {
        y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !0;
      }, y.params.grabCursor && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grab", y.container[0].style.cursor = "-moz-grab", y.container[0].style.cursor = "grab"), y.imagesToLoad = [], y.imagesLoaded = 0, y.loadImage = function (e, a, t, s, r) {
        function i() {
          r && r();
        }var n;e.complete && s ? i() : a ? (n = new window.Image(), n.onload = i, n.onerror = i, t && (n.srcset = t), a && (n.src = a)) : i();
      }, y.preloadImages = function () {
        function e() {
          "undefined" != typeof y && null !== y && (void 0 !== y.imagesLoaded && y.imagesLoaded++, y.imagesLoaded === y.imagesToLoad.length && (y.params.updateOnImagesReady && y.update(), y.emit("onImagesReady", y)));
        }y.imagesToLoad = y.container.find("img");for (var a = 0; a < y.imagesToLoad.length; a++) {
          y.loadImage(y.imagesToLoad[a], y.imagesToLoad[a].currentSrc || y.imagesToLoad[a].getAttribute("src"), y.imagesToLoad[a].srcset || y.imagesToLoad[a].getAttribute("srcset"), !0, e);
        }
      }, y.autoplayTimeoutId = void 0, y.autoplaying = !1, y.autoplayPaused = !1, y.startAutoplay = function () {
        return "undefined" != typeof y.autoplayTimeoutId ? !1 : y.params.autoplay ? y.autoplaying ? !1 : (y.autoplaying = !0, y.emit("onAutoplayStart", y), void i()) : !1;
      }, y.stopAutoplay = function (e) {
        y.autoplayTimeoutId && (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId), y.autoplaying = !1, y.autoplayTimeoutId = void 0, y.emit("onAutoplayStop", y));
      }, y.pauseAutoplay = function (e) {
        y.autoplayPaused || (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId), y.autoplayPaused = !0, 0 === e ? (y.autoplayPaused = !1, i()) : y.wrapper.transitionEnd(function () {
          y && (y.autoplayPaused = !1, y.autoplaying ? i() : y.stopAutoplay());
        }));
      }, y.minTranslate = function () {
        return -y.snapGrid[0];
      }, y.maxTranslate = function () {
        return -y.snapGrid[y.snapGrid.length - 1];
      }, y.updateAutoHeight = function () {
        var e = y.slides.eq(y.activeIndex)[0];if ("undefined" != typeof e) {
          var a = e.offsetHeight;a && y.wrapper.css("height", a + "px");
        }
      }, y.updateContainerSize = function () {
        var e, a;e = "undefined" != typeof y.params.width ? y.params.width : y.container[0].clientWidth, a = "undefined" != typeof y.params.height ? y.params.height : y.container[0].clientHeight, 0 === e && y.isHorizontal() || 0 === a && !y.isHorizontal() || (e = e - parseInt(y.container.css("padding-left"), 10) - parseInt(y.container.css("padding-right"), 10), a = a - parseInt(y.container.css("padding-top"), 10) - parseInt(y.container.css("padding-bottom"), 10), y.width = e, y.height = a, y.size = y.isHorizontal() ? y.width : y.height);
      }, y.updateSlidesSize = function () {
        y.slides = y.wrapper.children("." + y.params.slideClass), y.snapGrid = [], y.slidesGrid = [], y.slidesSizesGrid = [];var e,
            a = y.params.spaceBetween,
            t = -y.params.slidesOffsetBefore,
            s = 0,
            i = 0;if ("undefined" != typeof y.size) {
          "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * y.size), y.virtualSize = -a, y.rtl ? y.slides.css({ marginLeft: "", marginTop: "" }) : y.slides.css({ marginRight: "", marginBottom: "" });var n;y.params.slidesPerColumn > 1 && (n = Math.floor(y.slides.length / y.params.slidesPerColumn) === y.slides.length / y.params.slidesPerColumn ? y.slides.length : Math.ceil(y.slides.length / y.params.slidesPerColumn) * y.params.slidesPerColumn, "auto" !== y.params.slidesPerView && "row" === y.params.slidesPerColumnFill && (n = Math.max(n, y.params.slidesPerView * y.params.slidesPerColumn)));var o,
              l = y.params.slidesPerColumn,
              p = n / l,
              d = p - (y.params.slidesPerColumn * p - y.slides.length);for (e = 0; e < y.slides.length; e++) {
            o = 0;var u = y.slides.eq(e);if (y.params.slidesPerColumn > 1) {
              var c, m, f;"column" === y.params.slidesPerColumnFill ? (m = Math.floor(e / l), f = e - m * l, (m > d || m === d && f === l - 1) && ++f >= l && (f = 0, m++), c = m + f * n / l, u.css({ "-webkit-box-ordinal-group": c, "-moz-box-ordinal-group": c, "-ms-flex-order": c, "-webkit-order": c, order: c })) : (f = Math.floor(e / p), m = e - f * p), u.css({ "margin-top": 0 !== f && y.params.spaceBetween && y.params.spaceBetween + "px" }).attr("data-swiper-column", m).attr("data-swiper-row", f);
            }"none" !== u.css("display") && ("auto" === y.params.slidesPerView ? (o = y.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), y.params.roundLengths && (o = r(o))) : (o = (y.size - (y.params.slidesPerView - 1) * a) / y.params.slidesPerView, y.params.roundLengths && (o = r(o)), y.isHorizontal() ? y.slides[e].style.width = o + "px" : y.slides[e].style.height = o + "px"), y.slides[e].swiperSlideSize = o, y.slidesSizesGrid.push(o), y.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === e && (t = t - y.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % y.params.slidesPerGroup === 0 && y.snapGrid.push(t), y.slidesGrid.push(t)) : (i % y.params.slidesPerGroup === 0 && y.snapGrid.push(t), y.slidesGrid.push(t), t = t + o + a), y.virtualSize += o + a, s = o, i++);
          }y.virtualSize = Math.max(y.virtualSize, y.size) + y.params.slidesOffsetAfter;var g;if (y.rtl && y.wrongRTL && ("slide" === y.params.effect || "coverflow" === y.params.effect) && y.wrapper.css({ width: y.virtualSize + y.params.spaceBetween + "px" }), (!y.support.flexbox || y.params.setWrapperSize) && (y.isHorizontal() ? y.wrapper.css({ width: y.virtualSize + y.params.spaceBetween + "px" }) : y.wrapper.css({ height: y.virtualSize + y.params.spaceBetween + "px" })), y.params.slidesPerColumn > 1 && (y.virtualSize = (o + y.params.spaceBetween) * n, y.virtualSize = Math.ceil(y.virtualSize / y.params.slidesPerColumn) - y.params.spaceBetween, y.wrapper.css({ width: y.virtualSize + y.params.spaceBetween + "px" }), y.params.centeredSlides)) {
            for (g = [], e = 0; e < y.snapGrid.length; e++) {
              y.snapGrid[e] < y.virtualSize + y.snapGrid[0] && g.push(y.snapGrid[e]);
            }y.snapGrid = g;
          }if (!y.params.centeredSlides) {
            for (g = [], e = 0; e < y.snapGrid.length; e++) {
              y.snapGrid[e] <= y.virtualSize - y.size && g.push(y.snapGrid[e]);
            }y.snapGrid = g, Math.floor(y.virtualSize - y.size) - Math.floor(y.snapGrid[y.snapGrid.length - 1]) > 1 && y.snapGrid.push(y.virtualSize - y.size);
          }0 === y.snapGrid.length && (y.snapGrid = [0]), 0 !== y.params.spaceBetween && (y.isHorizontal() ? y.rtl ? y.slides.css({ marginLeft: a + "px" }) : y.slides.css({ marginRight: a + "px" }) : y.slides.css({ marginBottom: a + "px" })), y.params.watchSlidesProgress && y.updateSlidesOffset();
        }
      }, y.updateSlidesOffset = function () {
        for (var e = 0; e < y.slides.length; e++) {
          y.slides[e].swiperSlideOffset = y.isHorizontal() ? y.slides[e].offsetLeft : y.slides[e].offsetTop;
        }
      }, y.updateSlidesProgress = function (e) {
        if ("undefined" == typeof e && (e = y.translate || 0), 0 !== y.slides.length) {
          "undefined" == typeof y.slides[0].swiperSlideOffset && y.updateSlidesOffset();var a = -e;y.rtl && (a = e), y.slides.removeClass(y.params.slideVisibleClass);for (var t = 0; t < y.slides.length; t++) {
            var s = y.slides[t],
                r = (a - s.swiperSlideOffset) / (s.swiperSlideSize + y.params.spaceBetween);if (y.params.watchSlidesVisibility) {
              var i = -(a - s.swiperSlideOffset),
                  n = i + y.slidesSizesGrid[t],
                  o = i >= 0 && i < y.size || n > 0 && n <= y.size || 0 >= i && n >= y.size;o && y.slides.eq(t).addClass(y.params.slideVisibleClass);
            }s.progress = y.rtl ? -r : r;
          }
        }
      }, y.updateProgress = function (e) {
        "undefined" == typeof e && (e = y.translate || 0);var a = y.maxTranslate() - y.minTranslate(),
            t = y.isBeginning,
            s = y.isEnd;0 === a ? (y.progress = 0, y.isBeginning = y.isEnd = !0) : (y.progress = (e - y.minTranslate()) / a, y.isBeginning = y.progress <= 0, y.isEnd = y.progress >= 1), y.isBeginning && !t && y.emit("onReachBeginning", y), y.isEnd && !s && y.emit("onReachEnd", y), y.params.watchSlidesProgress && y.updateSlidesProgress(e), y.emit("onProgress", y, y.progress);
      }, y.updateActiveIndex = function () {
        var e,
            a,
            t,
            s = y.rtl ? y.translate : -y.translate;for (a = 0; a < y.slidesGrid.length; a++) {
          "undefined" != typeof y.slidesGrid[a + 1] ? s >= y.slidesGrid[a] && s < y.slidesGrid[a + 1] - (y.slidesGrid[a + 1] - y.slidesGrid[a]) / 2 ? e = a : s >= y.slidesGrid[a] && s < y.slidesGrid[a + 1] && (e = a + 1) : s >= y.slidesGrid[a] && (e = a);
        }(0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / y.params.slidesPerGroup), t >= y.snapGrid.length && (t = y.snapGrid.length - 1), e !== y.activeIndex && (y.snapIndex = t, y.previousIndex = y.activeIndex, y.activeIndex = e, y.updateClasses());
      }, y.updateClasses = function () {
        y.slides.removeClass(y.params.slideActiveClass + " " + y.params.slideNextClass + " " + y.params.slidePrevClass);var e = y.slides.eq(y.activeIndex);e.addClass(y.params.slideActiveClass);var t = e.next("." + y.params.slideClass).addClass(y.params.slideNextClass);y.params.loop && 0 === t.length && y.slides.eq(0).addClass(y.params.slideNextClass);var s = e.prev("." + y.params.slideClass).addClass(y.params.slidePrevClass);if (y.params.loop && 0 === s.length && y.slides.eq(-1).addClass(y.params.slidePrevClass), y.paginationContainer && y.paginationContainer.length > 0) {
          var r,
              i = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length;if (y.params.loop ? (r = Math.ceil((y.activeIndex - y.loopedSlides) / y.params.slidesPerGroup), r > y.slides.length - 1 - 2 * y.loopedSlides && (r -= y.slides.length - 2 * y.loopedSlides), r > i - 1 && (r -= i), 0 > r && "bullets" !== y.params.paginationType && (r = i + r)) : r = "undefined" != typeof y.snapIndex ? y.snapIndex : y.activeIndex || 0, "bullets" === y.params.paginationType && y.bullets && y.bullets.length > 0 && (y.bullets.removeClass(y.params.bulletActiveClass), y.paginationContainer.length > 1 ? y.bullets.each(function () {
            a(this).index() === r && a(this).addClass(y.params.bulletActiveClass);
          }) : y.bullets.eq(r).addClass(y.params.bulletActiveClass)), "fraction" === y.params.paginationType && (y.paginationContainer.find("." + y.params.paginationCurrentClass).text(r + 1), y.paginationContainer.find("." + y.params.paginationTotalClass).text(i)), "progress" === y.params.paginationType) {
            var n = (r + 1) / i,
                o = n,
                l = 1;y.isHorizontal() || (l = n, o = 1), y.paginationContainer.find("." + y.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(y.params.speed);
          }"custom" === y.params.paginationType && y.params.paginationCustomRender && (y.paginationContainer.html(y.params.paginationCustomRender(y, r + 1, i)), y.emit("onPaginationRendered", y, y.paginationContainer[0]));
        }y.params.loop || (y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.isBeginning ? (y.prevButton.addClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.disable(y.prevButton)) : (y.prevButton.removeClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.enable(y.prevButton))), y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.isEnd ? (y.nextButton.addClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.disable(y.nextButton)) : (y.nextButton.removeClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.enable(y.nextButton))));
      }, y.updatePagination = function () {
        if (y.params.pagination && y.paginationContainer && y.paginationContainer.length > 0) {
          var e = "";if ("bullets" === y.params.paginationType) {
            for (var a = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length, t = 0; a > t; t++) {
              e += y.params.paginationBulletRender ? y.params.paginationBulletRender(t, y.params.bulletClass) : "<" + y.params.paginationElement + ' class="' + y.params.bulletClass + '"></' + y.params.paginationElement + ">";
            }y.paginationContainer.html(e), y.bullets = y.paginationContainer.find("." + y.params.bulletClass), y.params.paginationClickable && y.params.a11y && y.a11y && y.a11y.initPagination();
          }"fraction" === y.params.paginationType && (e = y.params.paginationFractionRender ? y.params.paginationFractionRender(y, y.params.paginationCurrentClass, y.params.paginationTotalClass) : '<span class="' + y.params.paginationCurrentClass + '"></span> / <span class="' + y.params.paginationTotalClass + '"></span>', y.paginationContainer.html(e)), "progress" === y.params.paginationType && (e = y.params.paginationProgressRender ? y.params.paginationProgressRender(y, y.params.paginationProgressbarClass) : '<span class="' + y.params.paginationProgressbarClass + '"></span>', y.paginationContainer.html(e)), "custom" !== y.params.paginationType && y.emit("onPaginationRendered", y, y.paginationContainer[0]);
        }
      }, y.update = function (e) {
        function a() {
          s = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate()), y.setWrapperTranslate(s), y.updateActiveIndex(), y.updateClasses();
        }if (y.updateContainerSize(), y.updateSlidesSize(), y.updateProgress(), y.updatePagination(), y.updateClasses(), y.params.scrollbar && y.scrollbar && y.scrollbar.set(), e) {
          var t, s;y.controller && y.controller.spline && (y.controller.spline = void 0), y.params.freeMode ? (a(), y.params.autoHeight && y.updateAutoHeight()) : (t = ("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0), t || a());
        } else y.params.autoHeight && y.updateAutoHeight();
      }, y.onResize = function (e) {
        y.params.breakpoints && y.setBreakpoint();var a = y.params.allowSwipeToPrev,
            t = y.params.allowSwipeToNext;y.params.allowSwipeToPrev = y.params.allowSwipeToNext = !0, y.updateContainerSize(), y.updateSlidesSize(), ("auto" === y.params.slidesPerView || y.params.freeMode || e) && y.updatePagination(), y.params.scrollbar && y.scrollbar && y.scrollbar.set(), y.controller && y.controller.spline && (y.controller.spline = void 0);var s = !1;if (y.params.freeMode) {
          var r = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate());y.setWrapperTranslate(r), y.updateActiveIndex(), y.updateClasses(), y.params.autoHeight && y.updateAutoHeight();
        } else y.updateClasses(), s = ("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0);y.params.lazyLoading && !s && y.lazy && y.lazy.load(), y.params.allowSwipeToPrev = a, y.params.allowSwipeToNext = t;
      };var x = ["mousedown", "mousemove", "mouseup"];window.navigator.pointerEnabled ? x = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (x = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), y.touchEvents = { start: y.support.touch || !y.params.simulateTouch ? "touchstart" : x[0], move: y.support.touch || !y.params.simulateTouch ? "touchmove" : x[1], end: y.support.touch || !y.params.simulateTouch ? "touchend" : x[2] }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === y.params.touchEventsTarget ? y.container : y.wrapper).addClass("swiper-wp8-" + y.params.direction), y.initEvents = function (e) {
        var a = e ? "off" : "on",
            t = e ? "removeEventListener" : "addEventListener",
            r = "container" === y.params.touchEventsTarget ? y.container[0] : y.wrapper[0],
            i = y.support.touch ? r : document,
            n = y.params.nested ? !0 : !1;y.browser.ie ? (r[t](y.touchEvents.start, y.onTouchStart, !1), i[t](y.touchEvents.move, y.onTouchMove, n), i[t](y.touchEvents.end, y.onTouchEnd, !1)) : (y.support.touch && (r[t](y.touchEvents.start, y.onTouchStart, !1), r[t](y.touchEvents.move, y.onTouchMove, n), r[t](y.touchEvents.end, y.onTouchEnd, !1)), !s.simulateTouch || y.device.ios || y.device.android || (r[t]("mousedown", y.onTouchStart, !1), document[t]("mousemove", y.onTouchMove, n), document[t]("mouseup", y.onTouchEnd, !1))), window[t]("resize", y.onResize), y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.nextButton[a]("click", y.onClickNext), y.params.a11y && y.a11y && y.nextButton[a]("keydown", y.a11y.onEnterKey)), y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.prevButton[a]("click", y.onClickPrev), y.params.a11y && y.a11y && y.prevButton[a]("keydown", y.a11y.onEnterKey)), y.params.pagination && y.params.paginationClickable && (y.paginationContainer[a]("click", "." + y.params.bulletClass, y.onClickIndex), y.params.a11y && y.a11y && y.paginationContainer[a]("keydown", "." + y.params.bulletClass, y.a11y.onEnterKey)), (y.params.preventClicks || y.params.preventClicksPropagation) && r[t]("click", y.preventClicks, !0);
      }, y.attachEvents = function () {
        y.initEvents();
      }, y.detachEvents = function () {
        y.initEvents(!0);
      }, y.allowClick = !0, y.preventClicks = function (e) {
        y.allowClick || (y.params.preventClicks && e.preventDefault(), y.params.preventClicksPropagation && y.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
      }, y.onClickNext = function (e) {
        e.preventDefault(), (!y.isEnd || y.params.loop) && y.slideNext();
      }, y.onClickPrev = function (e) {
        e.preventDefault(), (!y.isBeginning || y.params.loop) && y.slidePrev();
      }, y.onClickIndex = function (e) {
        e.preventDefault();var t = a(this).index() * y.params.slidesPerGroup;y.params.loop && (t += y.loopedSlides), y.slideTo(t);
      }, y.updateClickedSlide = function (e) {
        var t = n(e, "." + y.params.slideClass),
            s = !1;if (t) for (var r = 0; r < y.slides.length; r++) {
          y.slides[r] === t && (s = !0);
        }if (!t || !s) return y.clickedSlide = void 0, void (y.clickedIndex = void 0);if (y.clickedSlide = t, y.clickedIndex = a(t).index(), y.params.slideToClickedSlide && void 0 !== y.clickedIndex && y.clickedIndex !== y.activeIndex) {
          var i,
              o = y.clickedIndex;if (y.params.loop) {
            if (y.animating) return;i = a(y.clickedSlide).attr("data-swiper-slide-index"), y.params.centeredSlides ? o < y.loopedSlides - y.params.slidesPerView / 2 || o > y.slides.length - y.loopedSlides + y.params.slidesPerView / 2 ? (y.fixLoop(), o = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
              y.slideTo(o);
            }, 0)) : y.slideTo(o) : o > y.slides.length - y.params.slidesPerView ? (y.fixLoop(), o = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
              y.slideTo(o);
            }, 0)) : y.slideTo(o);
          } else y.slideTo(o);
        }
      };var T,
          S,
          C,
          z,
          M,
          P,
          I,
          k,
          E,
          B,
          D = "input, select, textarea, button",
          L = Date.now(),
          H = [];y.animating = !1, y.touches = { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 };var G, A;if (y.onTouchStart = function (e) {
        if (e.originalEvent && (e = e.originalEvent), G = "touchstart" === e.type, G || !("which" in e) || 3 !== e.which) {
          if (y.params.noSwiping && n(e, "." + y.params.noSwipingClass)) return void (y.allowClick = !0);if (!y.params.swipeHandler || n(e, y.params.swipeHandler)) {
            var t = y.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                s = y.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;if (!(y.device.ios && y.params.iOSEdgeSwipeDetection && t <= y.params.iOSEdgeSwipeThreshold)) {
              if (T = !0, S = !1, C = !0, M = void 0, A = void 0, y.touches.startX = t, y.touches.startY = s, z = Date.now(), y.allowClick = !0, y.updateContainerSize(), y.swipeDirection = void 0, y.params.threshold > 0 && (k = !1), "touchstart" !== e.type) {
                var r = !0;a(e.target).is(D) && (r = !1), document.activeElement && a(document.activeElement).is(D) && document.activeElement.blur(), r && e.preventDefault();
              }y.emit("onTouchStart", y, e);
            }
          }
        }
      }, y.onTouchMove = function (e) {
        if (e.originalEvent && (e = e.originalEvent), !G || "mousemove" !== e.type) {
          if (e.preventedByNestedSwiper) return y.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void (y.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);if (y.params.onlyExternal) return y.allowClick = !1, void (T && (y.touches.startX = y.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, y.touches.startY = y.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, z = Date.now()));if (G && document.activeElement && e.target === document.activeElement && a(e.target).is(D)) return S = !0, void (y.allowClick = !1);if (C && y.emit("onTouchMove", y, e), !(e.targetTouches && e.targetTouches.length > 1)) {
            if (y.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, y.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof M) {
              var t = 180 * Math.atan2(Math.abs(y.touches.currentY - y.touches.startY), Math.abs(y.touches.currentX - y.touches.startX)) / Math.PI;M = y.isHorizontal() ? t > y.params.touchAngle : 90 - t > y.params.touchAngle;
            }if (M && y.emit("onTouchMoveOpposite", y, e), "undefined" == typeof A && y.browser.ieTouch && (y.touches.currentX !== y.touches.startX || y.touches.currentY !== y.touches.startY) && (A = !0), T) {
              if (M) return void (T = !1);if (A || !y.browser.ieTouch) {
                y.allowClick = !1, y.emit("onSliderMove", y, e), e.preventDefault(), y.params.touchMoveStopPropagation && !y.params.nested && e.stopPropagation(), S || (s.loop && y.fixLoop(), I = y.getWrapperTranslate(), y.setWrapperTransition(0), y.animating && y.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), y.params.autoplay && y.autoplaying && (y.params.autoplayDisableOnInteraction ? y.stopAutoplay() : y.pauseAutoplay()), B = !1, y.params.grabCursor && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grabbing", y.container[0].style.cursor = "-moz-grabbin", y.container[0].style.cursor = "grabbing")), S = !0;var r = y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY;r *= y.params.touchRatio, y.rtl && (r = -r), y.swipeDirection = r > 0 ? "prev" : "next", P = r + I;var i = !0;if (r > 0 && P > y.minTranslate() ? (i = !1, y.params.resistance && (P = y.minTranslate() - 1 + Math.pow(-y.minTranslate() + I + r, y.params.resistanceRatio))) : 0 > r && P < y.maxTranslate() && (i = !1, y.params.resistance && (P = y.maxTranslate() + 1 - Math.pow(y.maxTranslate() - I - r, y.params.resistanceRatio))), i && (e.preventedByNestedSwiper = !0), !y.params.allowSwipeToNext && "next" === y.swipeDirection && I > P && (P = I), !y.params.allowSwipeToPrev && "prev" === y.swipeDirection && P > I && (P = I), y.params.followFinger) {
                  if (y.params.threshold > 0) {
                    if (!(Math.abs(r) > y.params.threshold || k)) return void (P = I);if (!k) return k = !0, y.touches.startX = y.touches.currentX, y.touches.startY = y.touches.currentY, P = I, void (y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY);
                  }(y.params.freeMode || y.params.watchSlidesProgress) && y.updateActiveIndex(), y.params.freeMode && (0 === H.length && H.push({ position: y.touches[y.isHorizontal() ? "startX" : "startY"], time: z }), H.push({ position: y.touches[y.isHorizontal() ? "currentX" : "currentY"], time: new window.Date().getTime() })), y.updateProgress(P), y.setWrapperTranslate(P);
                }
              }
            }
          }
        }
      }, y.onTouchEnd = function (e) {
        if (e.originalEvent && (e = e.originalEvent), C && y.emit("onTouchEnd", y, e), C = !1, T) {
          y.params.grabCursor && S && T && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grab", y.container[0].style.cursor = "-moz-grab", y.container[0].style.cursor = "grab");var t = Date.now(),
              s = t - z;if (y.allowClick && (y.updateClickedSlide(e), y.emit("onTap", y, e), 300 > s && t - L > 300 && (E && clearTimeout(E), E = setTimeout(function () {
            y && (y.params.paginationHide && y.paginationContainer.length > 0 && !a(e.target).hasClass(y.params.bulletClass) && y.paginationContainer.toggleClass(y.params.paginationHiddenClass), y.emit("onClick", y, e));
          }, 300)), 300 > s && 300 > t - L && (E && clearTimeout(E), y.emit("onDoubleTap", y, e))), L = Date.now(), setTimeout(function () {
            y && (y.allowClick = !0);
          }, 0), !T || !S || !y.swipeDirection || 0 === y.touches.diff || P === I) return void (T = S = !1);T = S = !1;var r;if (r = y.params.followFinger ? y.rtl ? y.translate : -y.translate : -P, y.params.freeMode) {
            if (r < -y.minTranslate()) return void y.slideTo(y.activeIndex);if (r > -y.maxTranslate()) return void (y.slides.length < y.snapGrid.length ? y.slideTo(y.snapGrid.length - 1) : y.slideTo(y.slides.length - 1));if (y.params.freeModeMomentum) {
              if (H.length > 1) {
                var i = H.pop(),
                    n = H.pop(),
                    o = i.position - n.position,
                    l = i.time - n.time;y.velocity = o / l, y.velocity = y.velocity / 2, Math.abs(y.velocity) < y.params.freeModeMinimumVelocity && (y.velocity = 0), (l > 150 || new window.Date().getTime() - i.time > 300) && (y.velocity = 0);
              } else y.velocity = 0;H.length = 0;var p = 1e3 * y.params.freeModeMomentumRatio,
                  d = y.velocity * p,
                  u = y.translate + d;y.rtl && (u = -u);var c,
                  m = !1,
                  f = 20 * Math.abs(y.velocity) * y.params.freeModeMomentumBounceRatio;if (u < y.maxTranslate()) y.params.freeModeMomentumBounce ? (u + y.maxTranslate() < -f && (u = y.maxTranslate() - f), c = y.maxTranslate(), m = !0, B = !0) : u = y.maxTranslate();else if (u > y.minTranslate()) y.params.freeModeMomentumBounce ? (u - y.minTranslate() > f && (u = y.minTranslate() + f), c = y.minTranslate(), m = !0, B = !0) : u = y.minTranslate();else if (y.params.freeModeSticky) {
                var g,
                    h = 0;for (h = 0; h < y.snapGrid.length; h += 1) {
                  if (y.snapGrid[h] > -u) {
                    g = h;break;
                  }
                }u = Math.abs(y.snapGrid[g] - u) < Math.abs(y.snapGrid[g - 1] - u) || "next" === y.swipeDirection ? y.snapGrid[g] : y.snapGrid[g - 1], y.rtl || (u = -u);
              }if (0 !== y.velocity) p = y.rtl ? Math.abs((-u - y.translate) / y.velocity) : Math.abs((u - y.translate) / y.velocity);else if (y.params.freeModeSticky) return void y.slideReset();y.params.freeModeMomentumBounce && m ? (y.updateProgress(c), y.setWrapperTransition(p), y.setWrapperTranslate(u), y.onTransitionStart(), y.animating = !0, y.wrapper.transitionEnd(function () {
                y && B && (y.emit("onMomentumBounce", y), y.setWrapperTransition(y.params.speed), y.setWrapperTranslate(c), y.wrapper.transitionEnd(function () {
                  y && y.onTransitionEnd();
                }));
              })) : y.velocity ? (y.updateProgress(u), y.setWrapperTransition(p), y.setWrapperTranslate(u), y.onTransitionStart(), y.animating || (y.animating = !0, y.wrapper.transitionEnd(function () {
                y && y.onTransitionEnd();
              }))) : y.updateProgress(u), y.updateActiveIndex();
            }return void ((!y.params.freeModeMomentum || s >= y.params.longSwipesMs) && (y.updateProgress(), y.updateActiveIndex()));
          }var v,
              w = 0,
              b = y.slidesSizesGrid[0];for (v = 0; v < y.slidesGrid.length; v += y.params.slidesPerGroup) {
            "undefined" != typeof y.slidesGrid[v + y.params.slidesPerGroup] ? r >= y.slidesGrid[v] && r < y.slidesGrid[v + y.params.slidesPerGroup] && (w = v, b = y.slidesGrid[v + y.params.slidesPerGroup] - y.slidesGrid[v]) : r >= y.slidesGrid[v] && (w = v, b = y.slidesGrid[y.slidesGrid.length - 1] - y.slidesGrid[y.slidesGrid.length - 2]);
          }var x = (r - y.slidesGrid[w]) / b;if (s > y.params.longSwipesMs) {
            if (!y.params.longSwipes) return void y.slideTo(y.activeIndex);"next" === y.swipeDirection && (x >= y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w)), "prev" === y.swipeDirection && (x > 1 - y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w));
          } else {
            if (!y.params.shortSwipes) return void y.slideTo(y.activeIndex);"next" === y.swipeDirection && y.slideTo(w + y.params.slidesPerGroup), "prev" === y.swipeDirection && y.slideTo(w);
          }
        }
      }, y._slideTo = function (e, a) {
        return y.slideTo(e, a, !0, !0);
      }, y.slideTo = function (e, a, t, s) {
        "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), y.snapIndex = Math.floor(e / y.params.slidesPerGroup), y.snapIndex >= y.snapGrid.length && (y.snapIndex = y.snapGrid.length - 1);var r = -y.snapGrid[y.snapIndex];y.params.autoplay && y.autoplaying && (s || !y.params.autoplayDisableOnInteraction ? y.pauseAutoplay(a) : y.stopAutoplay()), y.updateProgress(r);for (var i = 0; i < y.slidesGrid.length; i++) {
          -Math.floor(100 * r) >= Math.floor(100 * y.slidesGrid[i]) && (e = i);
        }return !y.params.allowSwipeToNext && r < y.translate && r < y.minTranslate() ? !1 : !y.params.allowSwipeToPrev && r > y.translate && r > y.maxTranslate() && (y.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = y.params.speed), y.previousIndex = y.activeIndex || 0, y.activeIndex = e, y.rtl && -r === y.translate || !y.rtl && r === y.translate ? (y.params.autoHeight && y.updateAutoHeight(), y.updateClasses(), "slide" !== y.params.effect && y.setWrapperTranslate(r), !1) : (y.updateClasses(), y.onTransitionStart(t), 0 === a ? (y.setWrapperTranslate(r), y.setWrapperTransition(0), y.onTransitionEnd(t)) : (y.setWrapperTranslate(r), y.setWrapperTransition(a), y.animating || (y.animating = !0, y.wrapper.transitionEnd(function () {
          y && y.onTransitionEnd(t);
        }))), !0));
      }, y.onTransitionStart = function (e) {
        "undefined" == typeof e && (e = !0), y.params.autoHeight && y.updateAutoHeight(), y.lazy && y.lazy.onTransitionStart(), e && (y.emit("onTransitionStart", y), y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeStart", y), y.activeIndex > y.previousIndex ? y.emit("onSlideNextStart", y) : y.emit("onSlidePrevStart", y)));
      }, y.onTransitionEnd = function (e) {
        y.animating = !1, y.setWrapperTransition(0), "undefined" == typeof e && (e = !0), y.lazy && y.lazy.onTransitionEnd(), e && (y.emit("onTransitionEnd", y), y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeEnd", y), y.activeIndex > y.previousIndex ? y.emit("onSlideNextEnd", y) : y.emit("onSlidePrevEnd", y))), y.params.hashnav && y.hashnav && y.hashnav.setHash();
      }, y.slideNext = function (e, a, t) {
        if (y.params.loop) {
          if (y.animating) return !1;y.fixLoop();y.container[0].clientLeft;return y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t);
        }return y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t);
      }, y._slideNext = function (e) {
        return y.slideNext(!0, e, !0);
      }, y.slidePrev = function (e, a, t) {
        if (y.params.loop) {
          if (y.animating) return !1;y.fixLoop();y.container[0].clientLeft;return y.slideTo(y.activeIndex - 1, a, e, t);
        }return y.slideTo(y.activeIndex - 1, a, e, t);
      }, y._slidePrev = function (e) {
        return y.slidePrev(!0, e, !0);
      }, y.slideReset = function (e, a, t) {
        return y.slideTo(y.activeIndex, a, e);
      }, y.setWrapperTransition = function (e, a) {
        y.wrapper.transition(e), "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTransition(e), y.params.parallax && y.parallax && y.parallax.setTransition(e), y.params.scrollbar && y.scrollbar && y.scrollbar.setTransition(e), y.params.control && y.controller && y.controller.setTransition(e, a), y.emit("onSetTransition", y, e);
      }, y.setWrapperTranslate = function (e, a, t) {
        var s = 0,
            i = 0,
            n = 0;y.isHorizontal() ? s = y.rtl ? -e : e : i = e, y.params.roundLengths && (s = r(s), i = r(i)), y.params.virtualTranslate || (y.support.transforms3d ? y.wrapper.transform("translate3d(" + s + "px, " + i + "px, " + n + "px)") : y.wrapper.transform("translate(" + s + "px, " + i + "px)")), y.translate = y.isHorizontal() ? s : i;var o,
            l = y.maxTranslate() - y.minTranslate();o = 0 === l ? 0 : (e - y.minTranslate()) / l, o !== y.progress && y.updateProgress(e), a && y.updateActiveIndex(), "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTranslate(y.translate), y.params.parallax && y.parallax && y.parallax.setTranslate(y.translate), y.params.scrollbar && y.scrollbar && y.scrollbar.setTranslate(y.translate), y.params.control && y.controller && y.controller.setTranslate(y.translate, t), y.emit("onSetTranslate", y, y.translate);
      }, y.getTranslate = function (e, a) {
        var t, s, r, i;return "undefined" == typeof a && (a = "x"), y.params.virtualTranslate ? y.rtl ? -y.translate : y.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (s = r.transform || r.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map(function (e) {
          return e.replace(",", ".");
        }).join(", ")), i = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? i.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? i.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), y.rtl && s && (s = -s), s || 0);
      }, y.getWrapperTranslate = function (e) {
        return "undefined" == typeof e && (e = y.isHorizontal() ? "x" : "y"), y.getTranslate(y.wrapper[0], e);
      }, y.observers = [], y.initObservers = function () {
        if (y.params.observeParents) for (var e = y.container.parents(), a = 0; a < e.length; a++) {
          o(e[a]);
        }o(y.container[0], { childList: !1 }), o(y.wrapper[0], { attributes: !1 });
      }, y.disconnectObservers = function () {
        for (var e = 0; e < y.observers.length; e++) {
          y.observers[e].disconnect();
        }y.observers = [];
      }, y.createLoop = function () {
        y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove();var e = y.wrapper.children("." + y.params.slideClass);"auto" !== y.params.slidesPerView || y.params.loopedSlides || (y.params.loopedSlides = e.length), y.loopedSlides = parseInt(y.params.loopedSlides || y.params.slidesPerView, 10), y.loopedSlides = y.loopedSlides + y.params.loopAdditionalSlides, y.loopedSlides > e.length && (y.loopedSlides = e.length);var t,
            s = [],
            r = [];for (e.each(function (t, i) {
          var n = a(this);t < y.loopedSlides && r.push(i), t < e.length && t >= e.length - y.loopedSlides && s.push(i), n.attr("data-swiper-slide-index", t);
        }), t = 0; t < r.length; t++) {
          y.wrapper.append(a(r[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass));
        }for (t = s.length - 1; t >= 0; t--) {
          y.wrapper.prepend(a(s[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass));
        }
      }, y.destroyLoop = function () {
        y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove(), y.slides.removeAttr("data-swiper-slide-index");
      }, y.reLoop = function (e) {
        var a = y.activeIndex - y.loopedSlides;y.destroyLoop(), y.createLoop(), y.updateSlidesSize(), e && y.slideTo(a + y.loopedSlides, 0, !1);
      }, y.fixLoop = function () {
        var e;y.activeIndex < y.loopedSlides ? (e = y.slides.length - 3 * y.loopedSlides + y.activeIndex, e += y.loopedSlides, y.slideTo(e, 0, !1, !0)) : ("auto" === y.params.slidesPerView && y.activeIndex >= 2 * y.loopedSlides || y.activeIndex > y.slides.length - 2 * y.params.slidesPerView) && (e = -y.slides.length + y.activeIndex + y.loopedSlides, e += y.loopedSlides, y.slideTo(e, 0, !1, !0));
      }, y.appendSlide = function (e) {
        if (y.params.loop && y.destroyLoop(), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) for (var a = 0; a < e.length; a++) {
          e[a] && y.wrapper.append(e[a]);
        } else y.wrapper.append(e);y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0);
      }, y.prependSlide = function (e) {
        y.params.loop && y.destroyLoop();var a = y.activeIndex + 1;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
          for (var t = 0; t < e.length; t++) {
            e[t] && y.wrapper.prepend(e[t]);
          }a = y.activeIndex + e.length;
        } else y.wrapper.prepend(e);y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0), y.slideTo(a, 0, !1);
      }, y.removeSlide = function (e) {
        y.params.loop && (y.destroyLoop(), y.slides = y.wrapper.children("." + y.params.slideClass));var a,
            t = y.activeIndex;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
          for (var s = 0; s < e.length; s++) {
            a = e[s], y.slides[a] && y.slides.eq(a).remove(), t > a && t--;
          }t = Math.max(t, 0);
        } else a = e, y.slides[a] && y.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0), y.params.loop ? y.slideTo(t + y.loopedSlides, 0, !1) : y.slideTo(t, 0, !1);
      }, y.removeAllSlides = function () {
        for (var e = [], a = 0; a < y.slides.length; a++) {
          e.push(a);
        }y.removeSlide(e);
      }, y.effects = { fade: { setTranslate: function setTranslate() {
            for (var e = 0; e < y.slides.length; e++) {
              var a = y.slides.eq(e),
                  t = a[0].swiperSlideOffset,
                  s = -t;y.params.virtualTranslate || (s -= y.translate);var r = 0;y.isHorizontal() || (r = s, s = 0);var i = y.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);a.css({ opacity: i }).transform("translate3d(" + s + "px, " + r + "px, 0px)");
            }
          }, setTransition: function setTransition(e) {
            if (y.slides.transition(e), y.params.virtualTranslate && 0 !== e) {
              var a = !1;y.slides.transitionEnd(function () {
                if (!a && y) {
                  a = !0, y.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) {
                    y.wrapper.trigger(e[t]);
                  }
                }
              });
            }
          } }, flip: { setTranslate: function setTranslate() {
            for (var e = 0; e < y.slides.length; e++) {
              var t = y.slides.eq(e),
                  s = t[0].progress;y.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));var r = t[0].swiperSlideOffset,
                  i = -180 * s,
                  n = i,
                  o = 0,
                  l = -r,
                  p = 0;if (y.isHorizontal() ? y.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + y.slides.length, y.params.flip.slideShadows) {
                var d = y.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                    u = y.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-s, 0)), u.length && (u[0].style.opacity = Math.max(s, 0));
              }t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
            }
          }, setTransition: function setTransition(e) {
            if (y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), y.params.virtualTranslate && 0 !== e) {
              var t = !1;y.slides.eq(y.activeIndex).transitionEnd(function () {
                if (!t && y && a(this).hasClass(y.params.slideActiveClass)) {
                  t = !0, y.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < e.length; s++) {
                    y.wrapper.trigger(e[s]);
                  }
                }
              });
            }
          } }, cube: { setTranslate: function setTranslate() {
            var e,
                t = 0;y.params.cube.shadow && (y.isHorizontal() ? (e = y.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), y.wrapper.append(e)), e.css({ height: y.width + "px" })) : (e = y.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), y.container.append(e))));for (var s = 0; s < y.slides.length; s++) {
              var r = y.slides.eq(s),
                  i = 90 * s,
                  n = Math.floor(i / 360);y.rtl && (i = -i, n = Math.floor(-i / 360));var o = Math.max(Math.min(r[0].progress, 1), -1),
                  l = 0,
                  p = 0,
                  d = 0;s % 4 === 0 ? (l = 4 * -n * y.size, d = 0) : (s - 1) % 4 === 0 ? (l = 0, d = 4 * -n * y.size) : (s - 2) % 4 === 0 ? (l = y.size + 4 * n * y.size, d = y.size) : (s - 3) % 4 === 0 && (l = -y.size, d = 3 * y.size + 4 * y.size * n), y.rtl && (l = -l), y.isHorizontal() || (p = l, l = 0);var u = "rotateX(" + (y.isHorizontal() ? 0 : -i) + "deg) rotateY(" + (y.isHorizontal() ? i : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";if (1 >= o && o > -1 && (t = 90 * s + 90 * o, y.rtl && (t = 90 * -s - 90 * o)), r.transform(u), y.params.cube.slideShadows) {
                var c = y.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                    m = y.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), r.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0));
              }
            }if (y.wrapper.css({ "-webkit-transform-origin": "50% 50% -" + y.size / 2 + "px", "-moz-transform-origin": "50% 50% -" + y.size / 2 + "px", "-ms-transform-origin": "50% 50% -" + y.size / 2 + "px", "transform-origin": "50% 50% -" + y.size / 2 + "px" }), y.params.cube.shadow) if (y.isHorizontal()) e.transform("translate3d(0px, " + (y.width / 2 + y.params.cube.shadowOffset) + "px, " + -y.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + y.params.cube.shadowScale + ")");else {
              var f = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                  g = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2),
                  h = y.params.cube.shadowScale,
                  v = y.params.cube.shadowScale / g,
                  w = y.params.cube.shadowOffset;e.transform("scale3d(" + h + ", 1, " + v + ") translate3d(0px, " + (y.height / 2 + w) + "px, " + -y.height / 2 / v + "px) rotateX(-90deg)");
            }var b = y.isSafari || y.isUiWebView ? -y.size / 2 : 0;y.wrapper.transform("translate3d(0px,0," + b + "px) rotateX(" + (y.isHorizontal() ? 0 : t) + "deg) rotateY(" + (y.isHorizontal() ? -t : 0) + "deg)");
          }, setTransition: function setTransition(e) {
            y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), y.params.cube.shadow && !y.isHorizontal() && y.container.find(".swiper-cube-shadow").transition(e);
          } }, coverflow: { setTranslate: function setTranslate() {
            for (var e = y.translate, t = y.isHorizontal() ? -e + y.width / 2 : -e + y.height / 2, s = y.isHorizontal() ? y.params.coverflow.rotate : -y.params.coverflow.rotate, r = y.params.coverflow.depth, i = 0, n = y.slides.length; n > i; i++) {
              var o = y.slides.eq(i),
                  l = y.slidesSizesGrid[i],
                  p = o[0].swiperSlideOffset,
                  d = (t - p - l / 2) / l * y.params.coverflow.modifier,
                  u = y.isHorizontal() ? s * d : 0,
                  c = y.isHorizontal() ? 0 : s * d,
                  m = -r * Math.abs(d),
                  f = y.isHorizontal() ? 0 : y.params.coverflow.stretch * d,
                  g = y.isHorizontal() ? y.params.coverflow.stretch * d : 0;Math.abs(g) < .001 && (g = 0), Math.abs(f) < .001 && (f = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);var h = "translate3d(" + g + "px," + f + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";if (o.transform(h), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, y.params.coverflow.slideShadows) {
                var v = y.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                    w = y.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0);
              }
            }if (y.browser.ie) {
              var b = y.wrapper[0].style;b.perspectiveOrigin = t + "px 50%";
            }
          }, setTransition: function setTransition(e) {
            y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
          } } }, y.lazy = { initialImageLoaded: !1, loadImageInSlide: function loadImageInSlide(e, t) {
          if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== y.slides.length)) {
            var s = y.slides.eq(e),
                r = s.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!s.hasClass("swiper-lazy") || s.hasClass("swiper-lazy-loaded") || s.hasClass("swiper-lazy-loading") || (r = r.add(s[0])), 0 !== r.length && r.each(function () {
              var e = a(this);e.addClass("swiper-lazy-loading");var r = e.attr("data-background"),
                  i = e.attr("data-src"),
                  n = e.attr("data-srcset");y.loadImage(e[0], i || r, n, !1, function () {
                if (r ? (e.css("background-image", 'url("' + r + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), i && (e.attr("src", i), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), s.find(".swiper-lazy-preloader, .preloader").remove(), y.params.loop && t) {
                  var a = s.attr("data-swiper-slide-index");if (s.hasClass(y.params.slideDuplicateClass)) {
                    var o = y.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + y.params.slideDuplicateClass + ")");y.lazy.loadImageInSlide(o.index(), !1);
                  } else {
                    var l = y.wrapper.children("." + y.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');y.lazy.loadImageInSlide(l.index(), !1);
                  }
                }y.emit("onLazyImageReady", y, s[0], e[0]);
              }), y.emit("onLazyImageLoad", y, s[0], e[0]);
            });
          }
        }, load: function load() {
          var e;if (y.params.watchSlidesVisibility) y.wrapper.children("." + y.params.slideVisibleClass).each(function () {
            y.lazy.loadImageInSlide(a(this).index());
          });else if (y.params.slidesPerView > 1) for (e = y.activeIndex; e < y.activeIndex + y.params.slidesPerView; e++) {
            y.slides[e] && y.lazy.loadImageInSlide(e);
          } else y.lazy.loadImageInSlide(y.activeIndex);if (y.params.lazyLoadingInPrevNext) if (y.params.slidesPerView > 1 || y.params.lazyLoadingInPrevNextAmount && y.params.lazyLoadingInPrevNextAmount > 1) {
            var t = y.params.lazyLoadingInPrevNextAmount,
                s = y.params.slidesPerView,
                r = Math.min(y.activeIndex + s + Math.max(t, s), y.slides.length),
                i = Math.max(y.activeIndex - Math.max(s, t), 0);for (e = y.activeIndex + y.params.slidesPerView; r > e; e++) {
              y.slides[e] && y.lazy.loadImageInSlide(e);
            }for (e = i; e < y.activeIndex; e++) {
              y.slides[e] && y.lazy.loadImageInSlide(e);
            }
          } else {
            var n = y.wrapper.children("." + y.params.slideNextClass);n.length > 0 && y.lazy.loadImageInSlide(n.index());var o = y.wrapper.children("." + y.params.slidePrevClass);o.length > 0 && y.lazy.loadImageInSlide(o.index());
          }
        }, onTransitionStart: function onTransitionStart() {
          y.params.lazyLoading && (y.params.lazyLoadingOnTransitionStart || !y.params.lazyLoadingOnTransitionStart && !y.lazy.initialImageLoaded) && y.lazy.load();
        }, onTransitionEnd: function onTransitionEnd() {
          y.params.lazyLoading && !y.params.lazyLoadingOnTransitionStart && y.lazy.load();
        } }, y.scrollbar = { isTouched: !1, setDragPosition: function setDragPosition(e) {
          var a = y.scrollbar,
              t = y.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
              s = t - a.track.offset()[y.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
              r = -y.minTranslate() * a.moveDivider,
              i = -y.maxTranslate() * a.moveDivider;r > s ? s = r : s > i && (s = i), s = -s / a.moveDivider, y.updateProgress(s), y.setWrapperTranslate(s, !0);
        }, dragStart: function dragStart(e) {
          var a = y.scrollbar;a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), y.params.scrollbarHide && a.track.css("opacity", 1), y.wrapper.transition(100), a.drag.transition(100), y.emit("onScrollbarDragStart", y);
        }, dragMove: function dragMove(e) {
          var a = y.scrollbar;a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), y.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), y.emit("onScrollbarDragMove", y));
        }, dragEnd: function dragEnd(e) {
          var a = y.scrollbar;a.isTouched && (a.isTouched = !1, y.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
            a.track.css("opacity", 0), a.track.transition(400);
          }, 1e3)), y.emit("onScrollbarDragEnd", y), y.params.scrollbarSnapOnRelease && y.slideReset());
        }, enableDraggable: function enableDraggable() {
          var e = y.scrollbar,
              t = y.support.touch ? e.track : document;a(e.track).on(y.touchEvents.start, e.dragStart), a(t).on(y.touchEvents.move, e.dragMove), a(t).on(y.touchEvents.end, e.dragEnd);
        }, disableDraggable: function disableDraggable() {
          var e = y.scrollbar,
              t = y.support.touch ? e.track : document;a(e.track).off(y.touchEvents.start, e.dragStart), a(t).off(y.touchEvents.move, e.dragMove), a(t).off(y.touchEvents.end, e.dragEnd);
        }, set: function set() {
          if (y.params.scrollbar) {
            var e = y.scrollbar;e.track = a(y.params.scrollbar), y.params.uniqueNavElements && "string" == typeof y.params.scrollbar && e.track.length > 1 && 1 === y.container.find(y.params.scrollbar).length && (e.track = y.container.find(y.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = y.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = y.size / y.virtualSize, e.moveDivider = e.divider * (e.trackSize / y.size), e.dragSize = e.trackSize * e.divider, y.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", y.params.scrollbarHide && (e.track[0].style.opacity = 0);
          }
        }, setTranslate: function setTranslate() {
          if (y.params.scrollbar) {
            var e,
                a = y.scrollbar,
                t = (y.translate || 0, a.dragSize);e = (a.trackSize - a.dragSize) * y.progress, y.rtl && y.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), y.isHorizontal() ? (y.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (y.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), y.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
              a.track[0].style.opacity = 0, a.track.transition(400);
            }, 1e3));
          }
        }, setTransition: function setTransition(e) {
          y.params.scrollbar && y.scrollbar.drag.transition(e);
        } }, y.controller = { LinearSpline: function LinearSpline(e, a) {
          this.x = e, this.y = a, this.lastIndex = e.length - 1;var t, s;this.x.length;this.interpolate = function (e) {
            return e ? (s = r(this.x, e), t = s - 1, (e - this.x[t]) * (this.y[s] - this.y[t]) / (this.x[s] - this.x[t]) + this.y[t]) : 0;
          };var r = function () {
            var e, a, t;return function (s, r) {
              for (a = -1, e = s.length; e - a > 1;) {
                s[t = e + a >> 1] <= r ? a = t : e = t;
              }return e;
            };
          }();
        }, getInterpolateFunction: function getInterpolateFunction(e) {
          y.controller.spline || (y.controller.spline = y.params.loop ? new y.controller.LinearSpline(y.slidesGrid, e.slidesGrid) : new y.controller.LinearSpline(y.snapGrid, e.snapGrid));
        }, setTranslate: function setTranslate(e, a) {
          function s(a) {
            e = a.rtl && "horizontal" === a.params.direction ? -y.translate : y.translate, "slide" === y.params.controlBy && (y.controller.getInterpolateFunction(a), i = -y.controller.spline.interpolate(-e)), i && "container" !== y.params.controlBy || (r = (a.maxTranslate() - a.minTranslate()) / (y.maxTranslate() - y.minTranslate()), i = (e - y.minTranslate()) * r + a.minTranslate()), y.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, y), a.updateActiveIndex();
          }var r,
              i,
              n = y.params.control;if (y.isArray(n)) for (var o = 0; o < n.length; o++) {
            n[o] !== a && n[o] instanceof t && s(n[o]);
          } else n instanceof t && a !== n && s(n);
        }, setTransition: function setTransition(e, a) {
          function s(a) {
            a.setWrapperTransition(e, y), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
              i && (a.params.loop && "slide" === y.params.controlBy && a.fixLoop(), a.onTransitionEnd());
            }));
          }var r,
              i = y.params.control;if (y.isArray(i)) for (r = 0; r < i.length; r++) {
            i[r] !== a && i[r] instanceof t && s(i[r]);
          } else i instanceof t && a !== i && s(i);
        } }, y.hashnav = { init: function init() {
          if (y.params.hashnav) {
            y.hashnav.initialized = !0;var e = document.location.hash.replace("#", "");if (e) for (var a = 0, t = 0, s = y.slides.length; s > t; t++) {
              var r = y.slides.eq(t),
                  i = r.attr("data-hash");if (i === e && !r.hasClass(y.params.slideDuplicateClass)) {
                var n = r.index();y.slideTo(n, a, y.params.runCallbacksOnInit, !0);
              }
            }
          }
        }, setHash: function setHash() {
          y.hashnav.initialized && y.params.hashnav && (document.location.hash = y.slides.eq(y.activeIndex).attr("data-hash") || "");
        } }, y.disableKeyboardControl = function () {
        y.params.keyboardControl = !1, a(document).off("keydown", l);
      }, y.enableKeyboardControl = function () {
        y.params.keyboardControl = !0, a(document).on("keydown", l);
      }, y.mousewheel = { event: !1, lastScrollTime: new window.Date().getTime() }, y.params.mousewheelControl) {
        try {
          new window.WheelEvent("wheel"), y.mousewheel.event = "wheel";
        } catch (O) {
          (window.WheelEvent || y.container[0] && "wheel" in y.container[0]) && (y.mousewheel.event = "wheel");
        }!y.mousewheel.event && window.WheelEvent, y.mousewheel.event || void 0 === document.onmousewheel || (y.mousewheel.event = "mousewheel"), y.mousewheel.event || (y.mousewheel.event = "DOMMouseScroll");
      }y.disableMousewheelControl = function () {
        return y.mousewheel.event ? (y.container.off(y.mousewheel.event, p), !0) : !1;
      }, y.enableMousewheelControl = function () {
        return y.mousewheel.event ? (y.container.on(y.mousewheel.event, p), !0) : !1;
      }, y.parallax = { setTranslate: function setTranslate() {
          y.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
            d(this, y.progress);
          }), y.slides.each(function () {
            var e = a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
              var a = Math.min(Math.max(e[0].progress, -1), 1);d(this, a);
            });
          });
        }, setTransition: function setTransition(e) {
          "undefined" == typeof e && (e = y.params.speed), y.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
            var t = a(this),
                s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;0 === e && (s = 0), t.transition(s);
          });
        } }, y._plugins = [];for (var N in y.plugins) {
        var R = y.plugins[N](y, y.params[N]);R && y._plugins.push(R);
      }return y.callPlugins = function (e) {
        for (var a = 0; a < y._plugins.length; a++) {
          e in y._plugins[a] && y._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
      }, y.emitterEventListeners = {}, y.emit = function (e) {
        y.params[e] && y.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);var a;if (y.emitterEventListeners[e]) for (a = 0; a < y.emitterEventListeners[e].length; a++) {
          y.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }y.callPlugins && y.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
      }, y.on = function (e, a) {
        return e = u(e), y.emitterEventListeners[e] || (y.emitterEventListeners[e] = []), y.emitterEventListeners[e].push(a), y;
      }, y.off = function (e, a) {
        var t;if (e = u(e), "undefined" == typeof a) return y.emitterEventListeners[e] = [], y;if (y.emitterEventListeners[e] && 0 !== y.emitterEventListeners[e].length) {
          for (t = 0; t < y.emitterEventListeners[e].length; t++) {
            y.emitterEventListeners[e][t] === a && y.emitterEventListeners[e].splice(t, 1);
          }return y;
        }
      }, y.once = function (e, a) {
        e = u(e);var t = function t() {
          a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), y.off(e, t);
        };return y.on(e, t), y;
      }, y.a11y = { makeFocusable: function makeFocusable(e) {
          return e.attr("tabIndex", "0"), e;
        }, addRole: function addRole(e, a) {
          return e.attr("role", a), e;
        }, addLabel: function addLabel(e, a) {
          return e.attr("aria-label", a), e;
        }, disable: function disable(e) {
          return e.attr("aria-disabled", !0), e;
        }, enable: function enable(e) {
          return e.attr("aria-disabled", !1), e;
        }, onEnterKey: function onEnterKey(e) {
          13 === e.keyCode && (a(e.target).is(y.params.nextButton) ? (y.onClickNext(e), y.isEnd ? y.a11y.notify(y.params.lastSlideMessage) : y.a11y.notify(y.params.nextSlideMessage)) : a(e.target).is(y.params.prevButton) && (y.onClickPrev(e), y.isBeginning ? y.a11y.notify(y.params.firstSlideMessage) : y.a11y.notify(y.params.prevSlideMessage)), a(e.target).is("." + y.params.bulletClass) && a(e.target)[0].click());
        }, liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'), notify: function notify(e) {
          var a = y.a11y.liveRegion;0 !== a.length && (a.html(""), a.html(e));
        }, init: function init() {
          y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.a11y.makeFocusable(y.nextButton), y.a11y.addRole(y.nextButton, "button"), y.a11y.addLabel(y.nextButton, y.params.nextSlideMessage)), y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.a11y.makeFocusable(y.prevButton), y.a11y.addRole(y.prevButton, "button"), y.a11y.addLabel(y.prevButton, y.params.prevSlideMessage)), a(y.container).append(y.a11y.liveRegion);
        }, initPagination: function initPagination() {
          y.params.pagination && y.params.paginationClickable && y.bullets && y.bullets.length && y.bullets.each(function () {
            var e = a(this);y.a11y.makeFocusable(e), y.a11y.addRole(e, "button"), y.a11y.addLabel(e, y.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1));
          });
        }, destroy: function destroy() {
          y.a11y.liveRegion && y.a11y.liveRegion.length > 0 && y.a11y.liveRegion.remove();
        } }, y.init = function () {
        y.params.loop && y.createLoop(), y.updateContainerSize(), y.updateSlidesSize(), y.updatePagination(), y.params.scrollbar && y.scrollbar && (y.scrollbar.set(), y.params.scrollbarDraggable && y.scrollbar.enableDraggable()), "slide" !== y.params.effect && y.effects[y.params.effect] && (y.params.loop || y.updateProgress(), y.effects[y.params.effect].setTranslate()), y.params.loop ? y.slideTo(y.params.initialSlide + y.loopedSlides, 0, y.params.runCallbacksOnInit) : (y.slideTo(y.params.initialSlide, 0, y.params.runCallbacksOnInit), 0 === y.params.initialSlide && (y.parallax && y.params.parallax && y.parallax.setTranslate(), y.lazy && y.params.lazyLoading && (y.lazy.load(), y.lazy.initialImageLoaded = !0))), y.attachEvents(), y.params.observer && y.support.observer && y.initObservers(), y.params.preloadImages && !y.params.lazyLoading && y.preloadImages(), y.params.autoplay && y.startAutoplay(), y.params.keyboardControl && y.enableKeyboardControl && y.enableKeyboardControl(), y.params.mousewheelControl && y.enableMousewheelControl && y.enableMousewheelControl(), y.params.hashnav && y.hashnav && y.hashnav.init(), y.params.a11y && y.a11y && y.a11y.init(), y.emit("onInit", y);
      }, y.cleanupStyles = function () {
        y.container.removeClass(y.classNames.join(" ")).removeAttr("style"), y.wrapper.removeAttr("style"), y.slides && y.slides.length && y.slides.removeClass([y.params.slideVisibleClass, y.params.slideActiveClass, y.params.slideNextClass, y.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), y.paginationContainer && y.paginationContainer.length && y.paginationContainer.removeClass(y.params.paginationHiddenClass), y.bullets && y.bullets.length && y.bullets.removeClass(y.params.bulletActiveClass), y.params.prevButton && a(y.params.prevButton).removeClass(y.params.buttonDisabledClass), y.params.nextButton && a(y.params.nextButton).removeClass(y.params.buttonDisabledClass), y.params.scrollbar && y.scrollbar && (y.scrollbar.track && y.scrollbar.track.length && y.scrollbar.track.removeAttr("style"), y.scrollbar.drag && y.scrollbar.drag.length && y.scrollbar.drag.removeAttr("style"));
      }, y.destroy = function (e, a) {
        y.detachEvents(), y.stopAutoplay(), y.params.scrollbar && y.scrollbar && y.params.scrollbarDraggable && y.scrollbar.disableDraggable(), y.params.loop && y.destroyLoop(), a && y.cleanupStyles(), y.disconnectObservers(), y.params.keyboardControl && y.disableKeyboardControl && y.disableKeyboardControl(), y.params.mousewheelControl && y.disableMousewheelControl && y.disableMousewheelControl(), y.params.a11y && y.a11y && y.a11y.destroy(), y.emit("onDestroy"), e !== !1 && (y = null);
      }, y.init(), y;
    }
  };t.prototype = { isSafari: function () {
      var e = navigator.userAgent.toLowerCase();return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
    }(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent), isArray: function isArray(e) {
      return "[object Array]" === Object.prototype.toString.apply(e);
    }, browser: { ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled, ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1 }, device: function () {
      var e = navigator.userAgent,
          a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
          t = e.match(/(iPad).*OS\s([\d_]+)/),
          s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
          r = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);return { ios: t || r || s, android: a };
    }(), support: { touch: window.Modernizr && Modernizr.touch === !0 || function () {
        return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
      }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
        var e = document.createElement("div").style;return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
      }(), flexbox: function () {
        for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++) {
          if (a[t] in e) return !0;
        }
      }(), observer: function () {
        return "MutationObserver" in window || "WebkitMutationObserver" in window;
      }() }, plugins: {} };for (var s = ["jQuery", "Zepto", "Dom7"], r = 0; r < s.length; r++) {
    window[s[r]] && e(window[s[r]]);
  }var i;i = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, i && ("transitionEnd" in i.fn || (i.fn.transitionEnd = function (e) {
    function a(i) {
      if (i.target === this) for (e.call(this, i), t = 0; t < s.length; t++) {
        r.off(s[t], a);
      }
    }var t,
        s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
        r = this;if (e) for (t = 0; t < s.length; t++) {
      r.on(s[t], a);
    }return this;
  }), "transform" in i.fn || (i.fn.transform = function (e) {
    for (var a = 0; a < this.length; a++) {
      var t = this[a].style;t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
    }return this;
  }), "transition" in i.fn || (i.fn.transition = function (e) {
    "string" != typeof e && (e += "ms");for (var a = 0; a < this.length; a++) {
      var t = this[a].style;t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
    }return this;
  })), window.Swiper = t;
}(),  true ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
  "use strict";
  return window.Swiper;
});

/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
"use strict";

/**
 * 设置canvas字体样式
 * @param ratio  canvas标注字体样式的比例
 * @returns {string}
 */
function getFont(canvas, ratio) {
	var size = canvas.width * ratio; // get font size based on current width
	return (size | 0) + 'px sans-serif'; // set font
}

/**
 * 用canvas画一个圆形
 * @param ctx
 * @param x 圆心x坐标
 * @param y 圆形 y 坐标
 * @param fillStyle 填充
 * @param strokeStyle
 * @param lineWidth
 * @param radius
 * @param angle
 * @param lineCap
 */
function drawCircle(ctx, x, y, fillStyle, strokeStyle, lineWidth, radius, angle, lineCap) {
	ctx.beginPath();
	ctx.arc(x, y, radius, -0.5 * Math.PI, (angle * 2 - 0.5) * Math.PI, false);
	ctx.fillStyle = fillStyle;
	ctx.fill();
	ctx.lineWidth = lineWidth;
	if (lineCap) {
		ctx.lineCap = lineCap;
	}
	ctx.strokeStyle = strokeStyle;
	ctx.stroke();
}

function drawCircleText(ctx, font, fillStyle, content, x, y) {
	ctx.font = font;
	ctx.fillStyle = fillStyle;
	ctx.fillText(content, x, y);
}

/**
 *
 * @param originData originData 排名 年份
 * @param startX 第一个点的横坐标 偏移量
 * @param startY 年份点纵坐标偏移量
 * @param widthMargin 年份竖线之前的间距
 * @param canvasHeight
 * @param lowestPercent 最低省排名的最低比例，用于调整最低排名点坐标
 * @returns {*[]}
 */
function setCoordinate(originData, startX, startY, widthMargin, canvasHeight, lowestPercent) {

	var coordData = [];
	var x;
	var y;
	var rankMaxStr;
	var rankMax = 0;
	var heightPercent;
	var len = originData.length;

	for (var i = 0; i < len; i++) {
		rankMax = originData[i].min_rank > rankMax ? originData[i].min_rank : rankMax;
	}
	rankMaxStr = "" + rankMax;

	if (rankMaxStr.length <= 4) {
		rankMax += 8 * Math.pow(10, rankMaxStr.length - 2);
	} else if (rankMaxStr.length <= 5) {
		rankMax += 4 * Math.pow(10, rankMaxStr.length - 1);
	} else {
		rankMax += 2 * Math.pow(10, rankMaxStr.length - 1);
	}

	for (var i = 0; i < len; i++) {
		x = startX + widthMargin * i;
		heightPercent = originData[i].min_rank / rankMax;

		lowestPercent = heightPercent > lowestPercent ? lowestPercent : heightPercent;

		y = startY + originData[i].min_rank / rankMax * canvasHeight;

		coordData.push({
			"x": x,
			"y": y,
			"ranking": originData[i].min_rank,
			"year": originData[i].year,
			"heightPercent": heightPercent
		});
	}

	return [coordData, lowestPercent];
}

/**
 * @param ctx
 * @param coord  点坐标
 * @param yearColor 年份颜色
 * @param historyColor 往年录取颜色
 * @param currentColor 当前排名点线颜色值
 * @param labelWidth 每个label的宽度
 * @param canvasWidth
 * @param canvasHeight canvas的高度
 * @param startY  Y轴点坐标的起始值
 * @param offsetY Y轴点坐标的偏移量
 * @param lineChartFontStyle 标注年份时的样式
 */
function drawCoordinate(ctx, coord, yearColor, historyColor, currentColor, labelWidth, canvasWidth, canvasHeight, startY, offsetY, lineChartFontStyle, lineDotStyle, dpr) {
	var len = coord.length;

	// 过往年份 text、竖线、圆点
	var year;
	var x;
	var y;
	var lineHeight;
	var linePercent;
	var coordLen = coord.length;
	var lineStartY = startY + offsetY;

	lineHeight = canvasHeight - lineStartY;
	for (var i = 0; i < len - 1; i++) {
		year = parseFloat(coord[i].year);
		x = parseFloat(coord[i].x);
		y = parseFloat(coord[i].y);
		linePercent = parseFloat(coord[i].heightPercent);

		ctx.font = lineChartFontStyle;
		ctx.fillStyle = yearColor.dotColor;
		var yearTextWidth = ctx.measureText(year).width;
		ctx.fillText(year, x + labelWidth / 2 - yearTextWidth / 2, startY);

		ctx.setLineDash([8, 4]);
		ctx.beginPath();
		ctx.lineWidth = 2;
		if (lineDotStyle) {
			ctx.lineWidth = lineDotStyle.lineWidth;
		}
		ctx.strokeStyle = "#dadada";
		ctx.moveTo(x + labelWidth / 2, lineStartY);
		ctx.lineTo(x + labelWidth / 2, canvasHeight);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = historyColor.dotColor;
		if (lineDotStyle) {
			ctx.arc(x + labelWidth / 2, lineStartY + lineHeight * linePercent, lineDotStyle.dotRadius, 0, 2 * Math.PI);
		} else {
			ctx.arc(x + labelWidth / 2, lineStartY + lineHeight * linePercent, 12, 0, 2 * Math.PI);
		}

		ctx.fill();
	}

	// 当前 点、线
	x = coord[coordLen - 1].x;
	y = coord[coordLen - 1].y;
	linePercent = coord[coordLen - 1].heightPercent;

	ctx.setLineDash([10, 4]);
	ctx.beginPath();
	ctx.strokeStyle = currentColor.lineColor;
	ctx.lineWidth = 4;
	if (lineDotStyle) {
		ctx.lineWidth = lineDotStyle.lineWidth;
	}
	ctx.moveTo(0, lineStartY + lineHeight * linePercent);
	ctx.lineTo(canvasWidth, lineStartY + lineHeight * linePercent);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = currentColor.dotColor;

	if (lineDotStyle) {
		ctx.arc(x + labelWidth / 2, lineStartY + lineHeight * linePercent, lineDotStyle.dotRadius, 0, 2 * Math.PI);
	} else {
		ctx.arc(x + labelWidth / 2, lineStartY + lineHeight * linePercent, 12, 0, 2 * Math.PI);
	}
	ctx.fill();

	// 过往历史折线
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = historyColor.lineColor;
	ctx.setLineDash([1, 0]);

	if (coord[0]) {
		x = parseFloat(coord[0].x);
		y = parseFloat(coord[0].y);
		linePercent = parseFloat(coord[0].heightPercent);
		ctx.moveTo(x + labelWidth / 2, lineStartY + lineHeight * linePercent);
	}
	if (coord[1]) {
		x = parseFloat(coord[1].x);
		y = parseFloat(coord[1].y);
		linePercent = parseFloat(coord[1].heightPercent);
		ctx.lineTo(x + labelWidth / 2, lineStartY + lineHeight * linePercent);
		if (3 == coordLen) {
			ctx.stroke();
		}
	}

	if (coord[2] && coordLen > 3) {
		x = parseFloat(coord[2].x);
		y = parseFloat(coord[2].y);
		linePercent = parseFloat(coord[2].heightPercent);
		ctx.lineTo(x + labelWidth / 2, lineStartY + lineHeight * linePercent);
		ctx.stroke();
	}
}

/**
 *
 * @param ctx canvas context上下文
 * @param coord 数值对应的点坐标
 * @param labelHeight 每个label的高度
 * @param radius 标注的圆角大小
 * @param startY  标注Y轴的起始值，与drawCoordinate方法startY参数对应
 * @param canvasHeight  canvas的高度
 * @param offsetY  标注Y轴的偏移量，与drawCoordinate方法offsetY参数对应
 * @param labelWidth 每个label的宽度
 * @param canvasWidth  canvas宽度 暂不使用
 * @param lineChartFontStyle 标注标签时的字体样式
 * @param lineChartCanvasClosestWidth  cavas祖父元素的宽度，用于调整label的宽度
 */
function drawLabel(ctx, coord, labelHeight, radius, startY, canvasHeight, offsetY, labelWidth, lineChartFontStyle, dpr, lineChartCanvasClosestWidth) {

	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = { tl: radius, tr: radius, br: radius, bl: radius };
	} else {
		var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
		for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}

	// 从点的位置开始(x, y)
	var len = coord.length;
	var x, y;
	var ranking, rankingStr;
	var width;
	var linePercent;
	var lineStartY = startY + offsetY;
	var lineHeight = canvasHeight - lineStartY;
	for (var i = 0; i < len; i++) {
		x = coord[i].x;
		y = coord[i].y;
		ranking = coord[i].ranking;
		linePercent = coord[i].heightPercent;
		rankingStr = "" + ranking;
		y = lineStartY + lineHeight * linePercent;

		switch (rankingStr.length) {
			case 1:
			case 2:
				width = 185;
				break;
			case 3:
			case 4:
				width = 185;
				break;
			case 5:
				width = 210;
				break;
			case 6:
				width = 225;
				break;
			case 7:
				width = 255;
				break;
			case 8:
				width = 190;
				break;
			case 9:
				width = 195;
				break;
			default:
				width = 200;
				break;

		}

		if (dpr && dpr == 1) {
			width = 195;
		}

		if (dpr && dpr > 1 && lineChartCanvasClosestWidth == 640) {
			width -= 30;
		}

		ctx.strokeStyle = "#3e3a39";
		ctx.fillStyle = "#3e3a39";
		if (i == len - 1) {
			ctx.strokeStyle = "#eb614c";
			ctx.fillStyle = "#eb614c";
		}

		if (dpr && dpr == 1) {
			width -= 120;
			y -= 20;
		} else if (dpr && dpr == 2) {
			width -= 50;
			y -= 48;
		} else {
			y -= 75;
		}
		x += labelWidth / 2 - width / 2;
		var labelYPoint = 20;
		var labelYOffset = labelYPoint + 10;

		ctx.beginPath();
		ctx.lineTo(x + width / 2, y + labelHeight - labelYPoint);
		ctx.lineTo(x + width / 2 - 10, y + labelHeight - labelYOffset);
		ctx.lineTo(x + radius.bl, y + labelHeight - labelYOffset);
		ctx.quadraticCurveTo(x, y + labelHeight - labelYOffset, x, y + labelHeight - radius.bl - labelYOffset);
		ctx.lineTo(x, y + radius.tl - labelYOffset);
		ctx.quadraticCurveTo(x, y - labelYOffset, x + radius.tl, y - labelYOffset);
		ctx.lineTo(x + radius.tl, y - labelYOffset);
		ctx.lineTo(x + width - radius.tr, y - labelYOffset);
		ctx.quadraticCurveTo(x + width, y - labelYOffset, x + width, y + radius.tr - labelYOffset);
		ctx.lineTo(x + width, y + labelHeight - radius.br - labelYOffset);
		ctx.quadraticCurveTo(x + width, y + labelHeight - labelYOffset, x + width - radius.br, y + labelHeight - labelYOffset);
		ctx.lineTo(x + width / 2 + 10, y + labelHeight - labelYOffset);
		ctx.closePath();
		ctx.fill();

		if (ranking) {
			ctx.font = lineChartFontStyle;
			ctx.fillStyle = '#ffffff';
			var textWidth = ctx.measureText(ranking + "名").width;
			if (dpr && dpr == 1) {
				ctx.fillText(ranking + "名", x + width / 2 - textWidth / 2, y - labelHeight / 4);
			} else if (dpr && dpr == 2) {
				ctx.fillText(ranking + "名", x + width / 2 - textWidth / 2, y + labelHeight * 0.2); //
			} else if (dpr && dpr == 3) {
				ctx.fillText(ranking + "名", x + width / 2 - textWidth / 2, y + labelHeight * 0.4); //
			}
		}
		if (i == len - 1) {
			ctx.font = lineChartFontStyle;
			ctx.fillStyle = '#eb614c';
			var textWidth = ctx.measureText("你的排名").width;
			if (dpr && dpr == 1) {
				ctx.fillText("你的排名", x + width / 2 - textWidth / 2, y + labelHeight * 1.2);
			} else if (dpr && dpr == 2) {
				ctx.fillText("你的排名", x + width / 2 - textWidth / 2, y + labelHeight * 1.5);
			} else if (dpr && dpr == 3) {
				ctx.fillText("你的排名", x + width / 2 - textWidth / 2, y + labelHeight * 1.5);
			}
		}
	}
}

/**
 * 梯形宽度计算方式:
 * 第一个梯形宽度固定宽度为父元素宽度的 286/750，高度是宽度的 64/286
 * 每个梯形需确定: 1.左上角坐标(x,y) 2.第一个梯形的高宽(width, height)
 * 传参 第一个梯形的宽高 width，height
 * */
/**
 *
 * @param ctx
 * @param initWidth
 * @param initHeight
 * @param schoolList
 * @param trapezoidStyle
 * @param schoolNumNameStyle
 * @param lineDotStyle
 * @param title
 * @param trapezoidGap
 */
function drawTrapezoid(canvas, ctx, initWidth, initHeight, schoolList, trapezoidStyle, schoolNumNameStyle, lineDotStyle, contextFontStyle, titleOffsetX, title, trapezoidGap) {
	var lineFinal = 0;
	var startX;
	var startY;
	var trapezoidWidthDown;
	var schoolListItem;
	var offsetY = 0;
	if (!trapezoidGap) {
		trapezoidGap = 10;
	}

	// 标题
	if (title) {
		ctx.font = contextFontStyle;
		ctx.fillStyle = '#bebebe';
		ctx.fillText(title, canvas.width * 0.12 + titleOffsetX, canvas.height * 0.12);
		offsetY = canvas.height * 0.15;
	}

	for (var i = 0, len = schoolList.length; i < len; i++) {
		schoolListItem = schoolList[i];
		startX = (initHeight + trapezoidGap) * i * (18 / 64);
		startY = (initHeight + trapezoidGap) * i + offsetY;
		trapezoidWidthDown = initWidth - 2 * startX;

		if (!lineFinal) {
			lineFinal = startX + trapezoidWidthDown + 30;
		}

		// 画梯形
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(startX + trapezoidWidthDown, startY);
		ctx.lineTo(startX + trapezoidWidthDown - initHeight * (18 / 64), startY + initHeight);
		ctx.lineTo(startX + initHeight * (18 / 64), startY + initHeight);
		ctx.closePath();

		// add linear gradient
		var grd = ctx.createLinearGradient(0, 0, initWidth, initHeight);

		if (trapezoidStyle[i]) {
			grd.addColorStop(0, trapezoidStyle[i]); // light
			grd.addColorStop(1, trapezoidStyle[i]); // dark
		} else {
			grd.addColorStop(0, '#f9be00'); // light
			grd.addColorStop(1, '#f9be00'); // dark
		}
		ctx.fillStyle = grd;
		ctx.fill();

		// 直线、圆点
		ctx.beginPath();
		ctx.moveTo(startX + trapezoidWidthDown * (250 / 286), startY + initHeight / 2);
		ctx.lineTo(lineFinal, startY + initHeight / 2);
		if (lineDotStyle.strokeStyle) {
			ctx.strokeStyle = lineDotStyle.strokeStyle;
		} else {
			ctx.strokeStyle = "##ccdbe1";
		}
		ctx.lineWidth = lineDotStyle.lineWidth;
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(startX + trapezoidWidthDown * (250 / 286), startY + initHeight / 2, lineDotStyle.dotRadius, 0, 2 * Math.PI, true);
		if (lineDotStyle.fillStyle) {
			ctx.fillStyle = lineDotStyle.fillStyle;
		} else {
			ctx.fillStyle = "#ffffff";
		}
		ctx.fill();

		// 考生数量
		ctx.font = contextFontStyle;
		if (schoolNumNameStyle.fillStyle) {
			ctx.fillStyle = schoolNumNameStyle.numStyle;
		} else {
			ctx.fillStyle = '#ffffff';
		}
		// 根据数量长度设置 x 方向的偏移量
		var numOffset = 0;
		var studentNumberStr = schoolListItem["stu_count"] + "";
		switch (studentNumberStr.length) {
			case 1:
				numOffset = startX + trapezoidWidthDown / 2 - 6;
				break;
			case 2:
				numOffset = startX + trapezoidWidthDown / 2 - 10;
				break;
			case 3:
				numOffset = startX + trapezoidWidthDown / 2 - 16;
				break;
			case 4:
				numOffset = startX + trapezoidWidthDown / 2 - 20;
				break;
			case 5:
				numOffset = startX + trapezoidWidthDown / 2 - 24;
				break;
			case 6:
				numOffset = startX + trapezoidWidthDown / 2 - 28;
				break;
			default:
				numOffset = startX + trapezoidWidthDown / 2 - 22;
				break;
		}
		ctx.fillText(schoolListItem["stu_count"], numOffset, startY + initHeight / 2 + 6);

		// 学校名称
		ctx.font = contextFontStyle;
		if (schoolNumNameStyle.fillStyle) {
			ctx.fillStyle = schoolNumNameStyle.nameStyle;
		} else {
			ctx.fillStyle = '#000000';
		}
		ctx.fillText(schoolListItem["sch_name"], lineFinal + 8, startY + initHeight / 2 + 6);
	}
}

module.exports = {
	drawCircle: drawCircle,
	drawCircleText: drawCircleText,
	setCoordinate: setCoordinate,
	drawCoordinate: drawCoordinate,
	drawLabel: drawLabel,
	drawTrapezoid: drawTrapezoid
};

/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
"use strict";

///获取url中的参数
var getQueryString = function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var result = window.location.search.substr(1).match(reg);
  return result ? decodeURIComponent(result[2]) : null;
};
var getQueryObj = function getQueryObj() {
  var str = window.location.search;
  var num = str.indexOf("?");
  if (num < 0) {
    return false;
  };
  str = decodeURIComponent(str.substr(num + 1)); //取得所有参数   stringvar.substr(start [, length ]
  var arr = str.split("&"); //各个参数放到数组里
  var lastArr = {};
  for (var i = 0; i < arr.length; i++) {
    lastArr[arr[i].split("=")[0]] = arr[i].split("=")[1];
  };
  return lastArr;
};
module.exports = {
  getQueryString: getQueryString,
  getQueryObj: getQueryObj
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    var Tpl = {};
    var regTpl = /\{(\.?[\w_$]+)(\.[\w_$]+)?(\.?[\w_$]+)?\}/g;
    var ifRegTpl = /\[\?(!?)(\.[\w_$]+)(\.?[\w_$]+)?(\.?[\w_$]+)?\?([\S\s]*?)\?\]/g;

    var uID = new Date() * 1;
    function getUID() {
        return ++uID;
    }

    Tpl.tpls = {};
    Tpl.parse = function (tpl, map) {
        var self = this;
        !map && (map = {});
        if (tpl.charAt(0) !== '<') {
            var t = self.tpls[tpl];
            t && (tpl = t);
        }
        tpl = tpl.replace(ifRegTpl, function (s, s0, s1, s2, s3, s4) {
            var v = map[s1.substr(1)];
            if (s2) {
                v = s2.charAt(0) == '.' ? v[s2.substr(1)] : v;
            }

            if (s3) {
                v = s3.charAt(0) == '.' ? v[s3.substr(1)] : v;
            }
            if (s0 === '!') {
                return !v ? s4 : "";
            }
            return v ? s4 : '';
        });

        return tpl.replace(regTpl, function (s, s0, s1, s2) {
            var v = s0.charAt(0) == '.' ? map[s0.substr(1)] : self.tpls[s0];
            if (v == void 0) return '';

            if (s1) {
                v = s1.charAt(0) == '.' ? v[s1.substr(1)] : v;
            }

            if (s2) {
                v = s2.charAt(0) == '.' ? v[s2.substr(1)] : v;
            }

            if (v && (v.toString().charAt(0) === '<' || v.toString().substr(0, 2) == "[?")) return Tpl.parse(v, map);

            if (self.tpls[v]) return Tpl.parse(self.tpls[v], map);

            v = v === void 0 ? '' : v;

            return v;
        });
    };

    Tpl.ejs = function (tpl, data, opts) {
        opts = opts || {};
        //opts.tid = tpl;
        var fn = Tpl.ejs.compile(Tpl.parse(tpl, data), opts);
        return fn(data);
    };

    Tpl.ejs.cache = {};

    Tpl.ejs.filters = { //用于添加各种过滤器
        contains: function contains(target, str, separator) {
            return separator ? (separator + target + separator).indexOf(separator + str + separator) > -1 : target.indexOf(str) > -1;
        },
        truncate: function truncate(target, length, truncation) {
            length = length || 30;
            truncation = truncation === void 0 ? "..." : truncation;
            return target.length > length ? target.slice(0, length - truncation.length) + truncation : String(target);
        },
        camelize: function camelize(target) {
            if (target.indexOf("-") < 0 && target.indexOf("_") < 0) {
                return target;
            }
            return target.replace(/[-_][^-_]/g, function (match) {
                return match.charAt(1).toUpperCase();
            });
        },
        escape: function escape(target) {
            return target.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        },
        unescape: function unescape(target) {
            return target.replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&#([\d]+);/g, function ($0, $1) {
                return String.fromCharCode(parseInt($1, 10));
            });
        },
        floor: function floor(target) {
            var target = Math.floor(target);
            return isNaN(target) ? 0 : target;
        }

    };

    Tpl.ejs.compile = function (source, opts) {
        opts = opts || {};
        var tid = opts.tid;
        if (typeof tid === "string" && typeof Tpl.ejs.cache[tid] == "function") {
            return Tpl.ejs.cache[tid];
        }
        var open = !opts.open ? "<%" : "<&";
        var close = !opts.close ? "%>" : "&>";
        var helperNames = [],
            helpers = [];
        for (var name in opts) {
            if (opts.hasOwnProperty(name) && typeof opts[name] == "function") {
                helperNames.push(name);
                helpers.push(opts[name]); //收集所有helper!
            }
        }
        if (opts.userFn) {
            helperNames.push("userFn");
            helpers.push(opts.userFn);
        }
        var flag = true; //判定是否位于前定界符的左边
        var codes = []; //用于放置源码模板中普通文本片断
        var tid = getUID(); // 时间截,用于构建codes数组的引用变量
        var prefix = " ;r += txt" + tid + "["; //渲染函数输出部分的前面
        var postfix = "];"; //渲染函数输出部分的后面
        var t = "return function (data){ try{var r = '',line" + tid + " = 0;"; //渲染函数的最开始部分
        var rAt = /(^|[^\w\u00c0-\uFFFF_])(@)(?=\w)/g;
        var rstr = /(['"])(?:\\[\s\S]|[^\ \\r\n])*?\1/g;
        var rtrim = /(^-|-$)/g;
        var rmass = /mass/;
        var js = [];
        var pre = 0,
            cur,
            code,
            trim;
        for (var i = 0, n = source.length; i < n;) {
            cur = source.indexOf(flag ? open : close, i);
            if (cur < pre) {
                if (flag) {
                    //取得最末尾的HTML片断
                    t += prefix + codes.length + postfix;
                    if (cur == -1 && i == 0) {
                        code = source;
                    } else {
                        code = source.slice(pre + close.length);
                    }
                    //  code = source.slice( pre+ close.length );
                    if (trim) {
                        code = code.trim();
                        trim = false;
                    }
                    codes.push(code);
                } else {
                    console.log("发生错误了");
                }
                break;
            }
            code = source.slice(i, cur); //截取前后定界符之间的片断
            pre = cur;
            if (flag) {
                //取得HTML片断
                t += prefix + codes.length + postfix;
                if (trim) {
                    code = code.trim();
                    trim = false;
                }
                codes.push(code);
                i = cur + open.length;
            } else {
                //取得javascript罗辑
                js.push(code);
                t += "line" + tid + "=" + js.length + ";";
                switch (code.charAt(0)) {
                    case "=":
                        //直接输出
                        code = code.replace(rtrim, function () {
                            trim = true;
                            return "";
                        });
                        code = code.replace(rAt, "$1data.");
                        if (code.indexOf("|") > 1) {
                            //使用过滤器
                            var arr = [];
                            var str = code.replace(rstr, function (str) {
                                arr.push(str); //先收拾所有字符串字面量
                                return 'mass';
                            }).replace(/\|\|/g, "@"); //再收拾所有短路或
                            if (str.indexOf("|") > 1) {
                                var segments = str.split("|");
                                var filtered = segments.shift().replace(/\@/g, "||").replace(rmass, function () {
                                    return arr.shift();
                                });
                                for (var filter; filter = arr.shift();) {
                                    segments = filter.split(":");
                                    name = segments[0];
                                    args = "";
                                    if (segments[1]) {
                                        args = ', ' + segments[1].replace(rmass, function () {
                                            return arr.shift(); //还原
                                        });
                                    }
                                    filtered = "Tpl.ejs.filters." + name + "(" + filtered + args + ")";
                                }
                                code = filtered;
                            }
                        }
                        t += "r +" + code + ";";
                        break;
                    case "#":
                        //注释,不输出
                        break;
                    case "-":
                    default:
                        //普通逻辑,不输出
                        code = code.replace(rtrim, function () {
                            trim = true;
                            return "";
                        });
                        t += code.replace(rAt, "$1data.");
                        break;
                }
                i = cur + close.length;
            }
            flag = !flag;
        }
        t += " return r; }catch(e){ console.log(e);\nconsole.log(js" + tid + "[line" + tid + "-1]) }}";
        var body = ["txt" + tid, "js" + tid, "filters"];
        var fn = Function.apply(Function, body.concat(helperNames, t));
        var args = [codes, js, Tpl.ejs.filters];
        var compiled = fn.apply(this, args.concat(helpers));
        if (typeof tid === "string") {
            return Tpl.ejs.cache[tid] = compiled;
        }
        return compiled;
    };

    return Tpl;
}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

__webpack_require__(5);
__webpack_require__(0);
var getVip = __webpack_require__(3);
var input = __webpack_require__(4);
var analysisReport = __webpack_require__(0);
$(function () {
	var init = function init() {
		// var swiperHeight=[];
		var xinSwiper = new Swiper('.xin-con', {
			autoHeight: true,
			onSlideChangeStart: function onSlideChangeStart() {
				var activeSlide = $(".swiper-slide").eq(xinSwiper.activeIndex);
				if (activeSlide.height() < $(window).height()) {
					activeSlide.css('height', $(window).height() + 'px');
					$(".swiper-wrapper").css('height', $(window).height() + 'px');
				} else {
					$(".swiper-wrapper").css('height', activeSlide.height() + 'px');
				};
				window.scrollTo(0, 0);
			},
			onInit: function onInit(swiper) {
				console.log($(".swiper-slide").eq(0).height());
				console.log($(window).height());
				if ($(".swiper-slide").eq(0).height() < $(window).height()) {
					console.log("xdd");
					$(".swiper-slide").eq(0).css('height', $(window).height() + 'px');
					$(".swiper-wrapper").css('height', $(window).height() + 'px');
				};
			},
			noSwiping: true, // 禁止左右滑动
			noSwipingClass: 'stop-swiping'
		});
		getVip.init(xinSwiper);
		input.init(xinSwiper);
		analysisReport.swipeToWmzyIntroPage(xinSwiper);
	};
	init();
});

/***/ }
/******/ ]);