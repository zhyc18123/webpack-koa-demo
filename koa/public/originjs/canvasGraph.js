
/**
 * 设置canvas字体样式
 * @param ratio  canvas标注字体样式的比例
 * @returns {string}
 */
function getFont(canvas, ratio) {
	var size = canvas.width * ratio;   // get font size based on current width
	return (size|0) + 'px sans-serif'; // set font
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
function drawCircle(ctx, x, y,fillStyle, strokeStyle, lineWidth, radius, angle, lineCap) {
	ctx.beginPath();
	ctx.arc(x, y, radius, -0.5 * Math.PI, (angle * 2 - 0.5) * Math.PI, false);
	ctx.fillStyle = fillStyle;
	ctx.fill();
	ctx.lineWidth = lineWidth;
	if(lineCap){
		ctx.lineCap = lineCap
	}
	ctx.strokeStyle = strokeStyle;
	ctx.stroke();
}

function drawCircleText(ctx, font, fillStyle, content, x, y){
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
function setCoordinate(originData, startX, startY, widthMargin, canvasHeight, lowestPercent){

	var coordData = [];
	var x;
	var y;
	var rankMaxStr;
	var rankMax = 0;
	var heightPercent;
	var len = originData.length;

	for(var i = 0; i < len; i++){
		rankMax = originData[i].min_rank > rankMax ? originData[i].min_rank : rankMax;
	}
	rankMaxStr = ""+rankMax;

	if(rankMaxStr.length <= 4){
		rankMax += 8 * Math.pow(10, rankMaxStr.length-2);
	}else if(rankMaxStr.length <= 5){
		rankMax += 4 * Math.pow(10, rankMaxStr.length-1);
	}else{
		rankMax += 2 * Math.pow(10, rankMaxStr.length-1);
	}

	for(var i = 0; i < len; i++){
		x = startX + widthMargin*i;
		heightPercent = (originData[i].min_rank/rankMax);

		lowestPercent = heightPercent > lowestPercent ? lowestPercent: heightPercent;

		y = startY + (originData[i].min_rank/rankMax) * canvasHeight;

		coordData.push({
			"x": x,
			"y": y,
			"ranking":originData[i].min_rank,
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
function drawCoordinate(ctx, coord, yearColor, historyColor, currentColor, labelWidth, canvasWidth, canvasHeight,
						startY, offsetY, lineChartFontStyle, lineDotStyle){
	var len = coord.length;

	// 过往年份 text、竖线、圆点
	var year;
	var x;
	var y;
	var lineHeight;
	var linePercent;
	var coordLen = coord.length;
	var lineStartY = startY + offsetY;

	lineHeight = canvasHeight -lineStartY;
	for (var i = 0; i < len-1; i++) {
		year = parseFloat(coord[i].year);
		x = parseFloat(coord[i].x);
		y = parseFloat(coord[i].y);
		linePercent = parseFloat(coord[i].heightPercent);

		ctx.font = lineChartFontStyle;
		ctx.fillStyle = yearColor.dotColor;

		if (window.dpr == 1) {
			ctx.fillText(year, x + labelWidth/2 - 10, startY);
		} else {
			ctx.fillText(year, x + labelWidth/2 - 50, startY);
		}

		ctx.setLineDash([8,4]);
		ctx.beginPath();
		ctx.lineWidth = 2;
		if (lineDotStyle) {
			ctx.lineWidth = lineDotStyle.lineWidth;
		}
		ctx.strokeStyle = "#999999";
		ctx.moveTo(x + labelWidth/2, lineStartY);
		ctx.lineTo(x + labelWidth/2, canvasHeight);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = historyColor.dotColor;
		if(lineDotStyle){
			ctx.arc(x + labelWidth/2, lineStartY + lineHeight*linePercent , lineDotStyle.dotRadius, 0, 2 * Math.PI);
		} else {
			ctx.arc(x + labelWidth/2, lineStartY + lineHeight*linePercent , 12, 0, 2 * Math.PI);
		}

		ctx.fill();
	}

	// 当前 点、线
	x = coord[coordLen-1].x;
	y = coord[coordLen-1].y;
	linePercent = coord[coordLen-1].heightPercent;

	ctx.setLineDash([10,4]);
	ctx.beginPath();
	ctx.strokeStyle = currentColor.lineColor;
	ctx.lineWidth = 4;
	if(lineDotStyle) {
		ctx.lineWidth = lineDotStyle.lineWidth;
	}
	ctx.moveTo(0, lineStartY+lineHeight*linePercent);
	ctx.lineTo(canvasWidth, lineStartY+lineHeight*linePercent);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = currentColor.dotColor;

	if(lineDotStyle){
		ctx.arc(x+labelWidth/2, lineStartY+lineHeight*linePercent, lineDotStyle.dotRadius, 0, 2 * Math.PI);
	} else {
		ctx.arc(x+labelWidth/2, lineStartY+lineHeight*linePercent, 12, 0, 2 * Math.PI);

	}
	ctx.fill();

	// 过往历史折线
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = historyColor.lineColor;
	ctx.setLineDash([1,0]);


	if ( coord[0] ) {
		x = parseFloat(coord[0].x);
		y = parseFloat(coord[0].y);
		linePercent = parseFloat(coord[0].heightPercent);
		ctx.moveTo(x+labelWidth/2, lineStartY + lineHeight*linePercent);
	}

	if ( coord[1] ) {
		x = parseFloat(coord[1].x);
		y = parseFloat(coord[1].y);
		linePercent = parseFloat(coord[1].heightPercent);
		ctx.lineTo(x+labelWidth/2, lineStartY + lineHeight*linePercent);

		if(3 == coordLen ){
			ctx.stroke();
		}
	}

	if( coord[2] && (coordLen > 3) ) {
		x = parseFloat(coord[2].x);
		y = parseFloat(coord[2].y);
		linePercent = parseFloat(coord[2].heightPercent);
		ctx.lineTo(x+labelWidth/2, lineStartY + lineHeight*linePercent);
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
function drawLabel(ctx, coord, labelHeight, radius, startY, canvasHeight, offsetY,
				   labelWidth, lineChartFontStyle, dpr, lineChartCanvasClosestWidth) {

	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
	} else {
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
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
	for (var i = 0; i <　len; i++) {
		x = coord[i].x;
		y = coord[i].y;
		ranking = coord[i].ranking;
		linePercent = coord[i].heightPercent;
		rankingStr = ""+ranking;
		y = lineStartY + lineHeight*linePercent;

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


		if(dpr && dpr ==1){
			width = 195;
		}

		if(dpr && dpr >1 && lineChartCanvasClosestWidth == 640){
			width -= 30;
		}


		ctx.strokeStyle = "#3e3a39";
		ctx.fillStyle = "#3e3a39";
		if (i == len-1){
			ctx.strokeStyle = "#eb614c";
			ctx.fillStyle = "#eb614c";
		}

		if(dpr && dpr == 1) {
			width -= 120;
			y -= 25;
		} else if(dpr && dpr == 2){
			width -= 50;
			y -= 58;
		} else {
			y -= 75;
		}
		x += (labelWidth/2- width/2);
		var labelYPoint = 20;
		var labelYOffset = labelYPoint+10;

		ctx.beginPath();
		ctx.lineTo(x+width/2 , y + labelHeight - labelYPoint);
		ctx.lineTo(x+width/2 - 10, y + labelHeight-labelYOffset);
		ctx.lineTo(x + radius.bl, y + labelHeight-labelYOffset);
		ctx.quadraticCurveTo(x, y + labelHeight-labelYOffset, x, y + labelHeight - radius.bl-labelYOffset);
		ctx.lineTo(x, y + radius.tl-labelYOffset);
		ctx.quadraticCurveTo(x, y-labelYOffset, x + radius.tl, y-labelYOffset);
		ctx.lineTo(x + radius.tl, y-labelYOffset);
		ctx.lineTo(x + width - radius.tr, y-labelYOffset);
		ctx.quadraticCurveTo(x + width, y-labelYOffset, x + width, y + radius.tr-labelYOffset);
		ctx.lineTo(x + width, y + labelHeight - radius.br-labelYOffset);
		ctx.quadraticCurveTo(x + width, y + labelHeight-labelYOffset, x + width - radius.br, y + labelHeight-labelYOffset);
		ctx.lineTo(x+width/2 + 10, y + labelHeight-labelYOffset);
		ctx.closePath();
		ctx.fill();

		if(ranking){
			ctx.font = lineChartFontStyle;
			ctx.fillStyle = '#ffffff';
			switch (rankingStr.length) {
				case 1:
				case 2:
				case 3:
					x += 35;
					break;
				case 4:
				case 5:
					x += 10;
					break;
				case 6:
				case 7:
					x += 10;
					break;
				default:
					x += 10;
					break;

			}
			if ( dpr && dpr == 1) {
				ctx.fillText(ranking+"名", x,  y - labelHeight/8 );
			} else if (dpr && dpr == 2) {
				ctx.fillText(ranking+"名", x + 10,  y + labelHeight*0.2); //
			} else if (dpr && dpr == 3) {
				ctx.fillText(ranking+"名", x + 10,  y + labelHeight*0.4); //
			}
		}
		if (i == len-1) {
			ctx.font = lineChartFontStyle;
			ctx.fillStyle = '#eb614c';
			if ( dpr && dpr == 1) {
				ctx.fillText("你的排名", x, y + labelHeight*1.5 );
			} else if (dpr && dpr == 2) {
				ctx.fillText("你的排名", x+10, y + labelHeight*1.5);

			} else if (dpr && dpr == 3) {
				ctx.fillText("你的排名", x+10, y + labelHeight*1.5 );
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
function drawTrapezoid(canvas, ctx, initWidth, initHeight, schoolList, trapezoidStyle, schoolNumNameStyle,
					   lineDotStyle, contextFontStyle, titleOffsetX, title, trapezoidGap) {
	var lineFinal = 0;
	var startX;
	var startY;
	var trapezoidWidthDown;
	var schoolListItem;
	var offsetY = 0;
	if(!trapezoidGap){
		trapezoidGap = 10;
	}

	// 标题
	if (title) {
		ctx.font = contextFontStyle;
		ctx.fillStyle = '#bebebe';
		ctx.fillText(title, canvas.width*0.12+titleOffsetX, canvas.height*0.12);
		offsetY = canvas.height*0.15;
	}

	for (var i = 0, len = schoolList.length; i < len; i++) {
		schoolListItem = schoolList[i];
		startX = ( (initHeight + trapezoidGap) * i ) * (18 / 64);
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
			grd.addColorStop(0, trapezoidStyle[i]);  // light
			grd.addColorStop(1, trapezoidStyle[i]); // dark
		} else {
			grd.addColorStop(0, '#f9be00');  // light
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
			ctx.fillStyle = schoolNumNameStyle.numStyle
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
