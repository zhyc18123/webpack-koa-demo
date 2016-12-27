
import chgUrl from "./change-url";
require("./utils/swiper/swiper-3.3.1.jquery.min");
require('./analysis-report');
var getVip=require("./get-vip");
var input=require("./input");
var analysisReport = require('./analysis-report');
import queryString from "./query-string";
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
				if($(".swiper-slide").eq(0).height()<$(window).height()){
					$(".swiper-slide").eq(0).css('height', $(window).height() + 'px');
					$(".swiper-wrapper").css('height', $(window).height() + 'px');
				};
			},
			noSwiping: true, // 禁止左右滑动
			noSwipingClass : 'stop-swiping'
		});
		getVip.init(xinSwiper);
		input.init(xinSwiper);

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
					document.title="联考成绩定位分析报告";
					break;
				case "#analyse-result":
					xinSwiper.slideTo(1, speed);
					document.title="成绩定位分析报告";
					break;
				case "#introduce":
					xinSwiper.slideTo(2, speed);
					document.title="完美志愿，让你上更好的大学";
					break;
				case "#get-vip":
					xinSwiper.slideTo(3, speed);
					document.title="领取体验卡";
					break;
				case "#vip-result":
					xinSwiper.slideTo(4, speed);
					document.title="领取体验卡";
					break;
				default :
					xinSwiper.slideTo(0, speed);
					document.title="升学预测-成绩定位分析";
					break;

			};
		};
		///刷新显示相应页面
		showPage("0","#input");
		const analyseTpl=$(".analyse-html").html();
		if ('pushState' in history) {
			var search=window.location.search;
			var pageStr="?p=01";
			if(search){
				if(queryString.getQueryString("p")){
					pageStr="";
				}else{
					pageStr="&p=01";
				};
			};
			history.pushState("01", "", window.location.pathname+window.location.search+pageStr+"#input");
			document.title="升学预测-成绩定位分析";
		};
		///浏览器前进后退事件
		window.onpopstate = function() {
			if(window.location.hash == "#input"){
				$(".analyse-html").html(analyseTpl);
				history.go(0);
			};
			showPage();
		};

	};
	init();
});
