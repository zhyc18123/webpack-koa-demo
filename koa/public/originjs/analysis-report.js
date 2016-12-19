var drawCanvas = require('./canvasGraph');

var renderAnalysisReportPage = function (reportData) {
	// 概率圆环
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

	drawCanvas.drawCircleText(context, 'normal 36pt serif', '#f9be00', '40', centerX-10, centerY-16);
	drawCanvas.drawCircleText(context, 'normal 18pt serif', '#f9be00', '%', centerX+35, centerY-10);
	drawCanvas.drawCircleText(context, 'normal 16px serif', '#b6b6b6', '录取概率', centerX, centerY+22);


	// canvas 折线图
	/**
	 *  width: 100%;
	 *  max-width: 600px;
	 *  height: 500px;
	 **/
	var canvas = document.getElementById('line-chart-canvas'),
		context = canvas.getContext('2d');

	canvas.width = canvas.parentNode.clientWidth ;

	canvas.height = canvas.parentNode.clientHeight-50;

	var originData = [
		{"ranking": 10700, "year":2013},
		{"ranking": 5326, "year":2014},
		{"ranking": 5000, "year":2015},
		{"ranking": 6000, "year":2016}

	];

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
	coordData = drawCanvas.setCoordinate(originData, startX, startY, widthMargin, 400, lowestPercent);

	offsetY = lowestPercent < 0.01 ? 80 :
		lowestPercent < 0.1 ? 50 : 30;

	drawCanvas.drawCoordinate(context, coordData, yearColor,historyColor, currentColor, 20, labelWitth, canvas.width, canvas.height, offsetY);
	drawCanvas.drawLabel(context, coordData, 36, 8, 20, canvas.height, offsetY, labelWitth, canvas.width);


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
}

module.exports = {
	renderAnalysisReportPage: renderAnalysisReportPage
};


