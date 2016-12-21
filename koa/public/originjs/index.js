
require("./utils/swiper/swiper-3.3.1.jquery.min");
require('./analysis-report');
var getVip=require("./get-vip");
var input=require("./input");
var analysisReport = require('./analysis-report');
$(function(){
	var init=function(){
		// var swiperHeight=[];
		var xinSwiper = new Swiper ('.xin-con', {
			autoHeight:true,
			onSlideChangeStart: function() {
				var activeSlide=$(".swiper-slide").eq(xinSwiper.activeIndex);
				console.log(activeSlide.height())
				if(activeSlide.height()<$(window).height()){
					activeSlide.css('height', $(window).height() + 'px');
					$(".swiper-wrapper").css('height', $(window).height() + 'px');
				}else{
					$(".swiper-wrapper").css('height', activeSlide.height() + 'px');
				};
			},
			onInit: function(swiper){
				console.log($(".swiper-slide").eq(0).height())
				console.log($(window).height())
				if($(".swiper-slide").eq(0).height()<$(window).height()){
					console.log("xdd")
					$(".swiper-slide").eq(0).css('height', $(window).height() + 'px');
					$(".swiper-wrapper").css('height', $(window).height() + 'px');
				};
			},
			noSwiping: true, // 禁止左右滑动
			noSwipingClass : 'stop-swiping'
		});
		getVip.init(xinSwiper);
		input.init(xinSwiper);
		analysisReport.swipeToWmzyIntroPage(xinSwiper);
	};
	init();
});
