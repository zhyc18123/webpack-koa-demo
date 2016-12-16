import $ from './utils/jquery.min';

$(function(){
	var init=function(){
		var xinSwiper = new Swiper ('.xin-con', {
			noSwiping:true

		});
		console.log(xinSwiper)
	};
	init();
})
