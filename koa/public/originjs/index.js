
import chgUrl from "./change-url";
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
				if(activeSlide.height()<$(window).height()){
					activeSlide.css('height', $(window).height() + 'px');
					$(".swiper-wrapper").css('height', $(window).height() + 'px');
				}else{
					$(".swiper-wrapper").css('height', activeSlide.height() + 'px');
				};
				window.scrollTo(0,0);
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

		var showPage = function(speed,pageInit) {
			var page;
			if(pageInit){
				page=pageInit;
			}else{
				page = window.location.hash;
			};
			if (speed === "0") {
				speed = 0;
			};
			switch (page) {
				case "#input":
					xinSwiper.slideTo(0, speed);
					break;
				case "#analyse-result":
					xinSwiper.slideTo(1, speed);
					break;
				case "#introduce":
					xinSwiper.slideTo(2, speed);
					break;
				case "#get-vip":
					xinSwiper.slideTo(3, speed);
					break;
				case "#vip-result":
					xinSwiper.slideTo(4, speed);
					break;
				default :
					xinSwiper.slideTo(0, speed);
					break;

			};
		};
		///刷新显示相应页面
		showPage("0","#input");
		history.go(+1);
		console.log(window.location)
		if ('pushState' in history) {
			if(window.location.hash!=="#input"){
			history.pushState("01", "", window.location.pathname+window.location.search+"#input");
			}
		};
		///浏览器前进后退事件
		window.onpopstate = function() {
			alert("window.location.hash  " + window.location.hash );
			if(window.location.hash == "#input"){
				window.location.reload();
			}
			showPage();
		};

	};
	init();
});
