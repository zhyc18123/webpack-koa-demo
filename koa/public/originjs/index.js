
require("./utils/swiper/swiper-3.3.1.jquery.min");
require('./analysis-report');
var getVip=require("./get-vip");
$(function(){
	var init=function(){
		var xinSwiper = new Swiper ('.swiper-container', {
		});
		getVip.init(xinSwiper);
	};
	init();
});
