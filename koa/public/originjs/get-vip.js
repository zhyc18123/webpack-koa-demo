import url from"./url";
var init=function(xinSwiper){
	// 监听获取vip体验卡按钮
	$("#vip-btn").on("click",function(){
		getVip(xinSwiper);
	});
	// 监听获取验证码按钮
	$(document).on("click",".get-auto-code",function(){
		console.log("xdd")
		getAutoCode(xinSwiper);

	});
	//监听介绍页面的获取vip按钮
	$("#get-vip-btn").on("click",function(){
		xinSwiper.slideNext();
	});
	$(document).scroll(function(){
		if(xinSwiper.activeIndex===2){
			var bottomNum=$(".swiper-slide").eq(xinSwiper.activeIndex).height()-$(window).height()-$(document).scrollTop()-1;
			$("#get-vip-btn").css({"bottom":bottomNum+"px"});
		};
	});
};
///检查输入的手机号码
var checkMobile=function(mobile){
	if(!mobile){
		alert("请先输入手机号码！");
		return false;
	}else if(!(/^1[34578]\d{9}$/.test(mobile))){
		alert("手机号码格式不正确，请检查");  
        		return false; 
	}else{
		return true;
	};
};
// 改变获取验证码按钮
var countdown=120,
 $getAutoCode=$("#get-auto-code");
var changeAutoCode=function(){
	if (countdown === 0) { 
	$getAutoCode.addClass('get-auto-code');    
	$getAutoCode.text("发送验证码"); 
	countdown = 120; 
	} else { 
	$getAutoCode.removeClass("get-auto-code"); 
	$getAutoCode.text("重新发送(" + countdown + ")"); 
	countdown--; 
	setTimeout(function() { 
	changeAutoCode();
	},1000) ;
	} ;
} 
var getAutoCode=function(xinSwiper){
	var mobile=$("#mobile").val();
	if(!checkMobile(mobile)){
		return;
	};
	changeAutoCode();
	$.ajax({
		type: "post",
		cache: false,
		url: url.autoUrl,
		data:$(".vip-form").serialize(),
		success: function(data) {
			console.log(data)
			switch (data.code){
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
		error: function(request, error) {
			alert("服务器错误！")
		}
	});
};
var getVip=function(xinSwiper){
	var mobile=$("#mobile").val(),
	autoCode=$("#auto-code").val();
	if(!checkMobile(mobile)){
		return;
	};
	if(!autoCode){
		alert("请输入验证码！")
		return;
	};
	$.ajax({
		type: "post",
		cache: false,
		url: url.vipUrl,
		data:$(".vip-form").serialize(),
		success: function(data) {
			console.log(data)
			switch (data.code){
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
				case 10005 :
				alert("短信验证码不合法");
				break;
				default:
				break;
			}
		},
		error: function(request, error) {
			alert("服务器错误！")
		}
	});

}
module.exports = {
    init:init
}