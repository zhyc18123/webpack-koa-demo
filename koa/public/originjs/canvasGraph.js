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
 *  获取输入数据的坐标
 *  @param { [{},{}] } originData 排名 年份
 *  @param {Number} 第一个点的横坐标 偏移量
 *  @param {Number} 年份点纵坐标偏移量，年份虚线纵坐标偏移量再次基础上加上50
 *  @param {Number} 年份竖线之前的间距
 *  @param {Number} canvas的高度
 * */
function setCoordinate(originData, startX, startY, widthMargin, canvasHeight, lowestPercent){

	var coordData = [];
	var x;
	var y;
	var rankMaxStr;
	var rankMax = 0;
	var heightPercent;
	var len = originData.length;

	for(var i = 0; i < len; i++){
		rankMax = originData[i].ranking > rankMax ? originData[i].ranking : rankMax;
	}
	rankMaxStr = ""+rankMax;

	if(rankMaxStr.length <= 3){
		rankMax += 5 * Math.pow(10, rankMaxStr.length-2);
	}else if(rankMaxStr.length <= 6){
		rankMax += 3 * Math.pow(10, rankMaxStr.length-2);
	}else{
		rankMax += 1 * Math.pow(10, rankMaxStr.length-2);
	}

	for(var i = 0; i < len; i++){
		x = startX + widthMargin*i;
		heightPercent = (originData[i].ranking/rankMax);

		lowestPercent = heightPercent > lowestPercent ? lowestPercent: heightPercent;

		y = startY + (originData[i].ranking/rankMax) * canvasHeight;

		coordData.push({
			"x": x,
			"y": y,
			"ranking":originData[i].ranking,
			"year": originData[i].year,
			"heightPercent": heightPercent
		});
	}

	return coordData;

}

/**
 *  画点线: 年份的竖线， 往年录取点线， 当前排名点线
 *  @param { Array } 点坐标
 *  @param {Object} 年份颜色
 *  @param {Object} 往年录取颜色
 *  @param {Object} 当前排名点线颜色值
 * */
function drawCoordinate(ctx, coord, yearColor, historyColor, currentColor, startY,
						labelWidth, canvasWidth, canvasHeight, offsetY){
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

		ctx.font = 'normal 12pt Calibri';
		ctx.fillStyle = yearColor.dotColor;
		ctx.fillText(year, x + labelWidth/2 - 16, startY);

		ctx.setLineDash([1,2]);
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = yearColor;
		ctx.moveTo(x + labelWidth/2, lineStartY);
		ctx.lineTo(x + labelWidth/2, canvasHeight);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = historyColor.dotColor;
		ctx.arc(x + labelWidth/2, lineStartY + lineHeight*linePercent , 6, 0, 2 * Math.PI);
		ctx.fill();
	}

	// 当前 点、线
	x = coord[coordLen-1].x;
	y = coord[coordLen-1].y;
	linePercent = coord[coordLen-1].heightPercent;

	ctx.setLineDash([8,6]);
	ctx.beginPath();
	ctx.strokeStyle = currentColor.lineColor;
	ctx.lineWidth = 2;
	ctx.moveTo(0, lineStartY+lineHeight*linePercent);
	ctx.lineTo(canvasWidth, lineStartY+lineHeight*linePercent);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = currentColor.dotColor;
	ctx.arc(x+labelWidth/2, lineStartY+lineHeight*linePercent, 6, 0, 2 * Math.PI);
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
 * 标注:
 *
 *
 *
 *
 * */
function drawLabel(ctx, coord, labelHeight, radius, startY,
				   canvasHeight, offsetY, labelWidth, canvasWidth) {

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
				width = 70;
				break;
			case 3:
			case 4:
			case 5:
			case 6:
				width = 85;
				break;
			case 7:
			case 8:
				width = 90;
				break;
			case 9:
				width = 95;
				break;
			default:
				width = 100;
				break;

		}

		if (canvasWidth < 320) {
			width -= 10;
		}

		ctx.strokeStyle = "#3e3a39";
		ctx.fillStyle = "#3e3a39";
		if (i == len-1){
			ctx.strokeStyle = "#eb614c";
			ctx.fillStyle = "#eb614c";
		}

		y -= 58;
		x += (labelWidth/2- width/2);

		ctx.beginPath();
		ctx.lineTo(x+width/2 , y + labelHeight + 10);
		ctx.lineTo(x+width/2 - 10, y + labelHeight);
		ctx.lineTo(x + radius.bl, y + labelHeight);
		ctx.quadraticCurveTo(x, y + labelHeight, x, y + labelHeight - radius.bl);
		ctx.lineTo(x, y + radius.tl);
		ctx.quadraticCurveTo(x, y, x + radius.tl, y);
		ctx.lineTo(x + radius.tl, y);
		ctx.lineTo(x + width - radius.tr, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
		ctx.lineTo(x + width, y + labelHeight - radius.br);
		ctx.quadraticCurveTo(x + width, y + labelHeight, x + width - radius.br, y + labelHeight);
		ctx.lineTo(x+width/2 + 10, y + labelHeight);
		ctx.closePath();
		ctx.fill();

		if(ranking){
			ctx.font = 'normal 12pt Calibri';
			ctx.fillStyle = '#ffffff';
			switch (rankingStr.length) {
				case 1:
				case 2:
					x += 20;
					break;
				case 3:
				case 4:
				case 5:
					x += 15;
					break;
				case 6:
				case 7:
					x += 10;
					break;
				default:
					x += 10;
					break;

			}
			ctx.fillText(ranking+"名", x, y+25);
		}
		if (i==len-1) {
			ctx.font = 'normal 12pt Calibri';
			ctx.fillStyle = '#eb614c';
			ctx.fillText("你的排名", x+width/2-40, y+86);
		}
	}

}

/**
 * 梯形宽度计算方式
 * 第一个梯形宽度固定宽度为父元素宽度的 286/750，高度是宽度的 64/286
 *
 * 每个梯形需确定: 1.左上角坐标(x,y) 2.第一个梯形的高宽(width, height)
 *
 * 传参 第一个梯形的宽高 width，height
 *
 * */
function drawTrapezoid(ctx, initWidth, initHeight, schoolList,
					   trapezoidStyle, schoolNumNameStyle, lineDotStyle, title, trapezoidGap, contextFontStyle) {
	var lineFinal = 0;
	var startX;
	var startY;
	var trapezoidWidthDown;
	var schoolListItem;
	var offsetY = 0;

	if(!trapezoidGap){
		trapezoidGap = 10;
	}

	if (!contextFontStyle) {
		contextFontStyle = "18px serif";
	}
	// 标题
	if (title) {
		ctx.font = contextFontStyle;
		ctx.fillStyle = '#bebebe';
		if (initWidth < 120){
			ctx.fillText(title, initWidth / 2 - 50, 25);
		} else if (initWidth < 140){
			ctx.fillText(title, initWidth / 2 - 58, 25);
		} else {
			ctx.fillText(title, initWidth / 2 - 66, 25);
		}

		offsetY = 40
	}

	for (var i = 0, len = schoolList.length; i < len; i++) {
		schoolListItem = schoolList[i];
		startX = ( (initHeight + trapezoidGap) * i ) * (18 / 64);
		startY = (initHeight + trapezoidGap) * i + offsetY;
		trapezoidWidthDown = initWidth - 2 * startX;

		if (!lineFinal) {
			lineFinal = startX + trapezoidWidthDown + 20;
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
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(startX + trapezoidWidthDown * (250 / 286), startY + initHeight / 2, 3, 0, 2 * Math.PI, true);
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
		var studentNumberStr = schoolListItem["studentNumber"] + "";
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
		ctx.fillText(schoolListItem["studentNumber"], numOffset, startY + initHeight / 2 + 6);

		// 学校名称
		ctx.font = contextFontStyle;
		if (schoolNumNameStyle.fillStyle) {
			ctx.fillStyle = schoolNumNameStyle.nameStyle;
		} else {
			ctx.fillStyle = '#000000';
		}
		ctx.fillText(schoolListItem["schoolName"], lineFinal + 8, startY + initHeight / 2 + 6);
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
