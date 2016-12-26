import url from"./url";
import chgUrl from "./change-url";
import changeTitle from "./change-title";
var init=function(xinSwiper){
	// 监听获取vip体验卡按钮
	$("#vip-btn").on("click",function(){
		getVip(xinSwiper);
		ga('send', 'event', '领取页面', '领取按钮', '点击领取按钮');
	});
	// 监听获取验证码按钮
	$(document).on("click",".get-auto-code",function(){
		getAutoCode(xinSwiper);
		ga('send', 'event', '领取页面', '发送验证码', '发送按钮');

	});
	//监听介绍页面的获取vip按钮
	$("#get-vip-btn").on("click",function(){
		xinSwiper.slideNext();
		chgUrl.changeUrl("04","","#get-vip");
		document.title="领取体验卡";
		ga('send', 'event', '产品介绍页', '领取体验卡按钮', '领取按钮');
	});
	///监听下载按钮
	$("#download-btn").on("click",function(){
		downloadApp()
		ga('send', 'event', '领取成功', '下载APP', '下载按钮');
	});
};
var downloadApp=function(){
	function isPC() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	};

	if(isPC()){
		window.location.href="http://wmzy.com";
	}else{
		window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.gaokaozhiyuan";
	};
};
///检查输入的手机号码
var checkMobile=function(mobile){
	if(!mobile){
		alert("请先输入手机号码！");
		return false;
	}else if(!(/^1[34578]\d{9}$/.test(mobile))){
		alert("手机号码不正确，请检查");  
        		return false; 
	}else{
		return true;
	};
};
// 改变获取验证码按钮
var countdown=120,
 $getAutoCode=$("#get-auto-code");
 var timeoutEvent;
var changeAutoCode=function(){
	if (countdown === 0) { 
	$getAutoCode.addClass('get-auto-code');    
	$getAutoCode.text("发送验证码"); 
	countdown = 120; 
	} else { 
	$getAutoCode.removeClass("get-auto-code"); 
	$getAutoCode.text("重新发送(" + countdown + ")"); 
	countdown--; 
	timeoutEvent= setTimeout(function() { 
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
				$("#get-auto-code").text("发送验证码");
				clearTimeout(timeoutEvent);
				break;
				case 12001:
				alert("手机号码格式错误");
				$("#get-auto-code").text("发送验证码");
				clearTimeout(timeoutEvent);
				break;
				case 11301:
				alert("您已领取过体验卡");
				$("#get-auto-code").text("发送验证码");
				clearTimeout(timeoutEvent);
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
			switch (data.code){
				case 0:
				$(".result-text .text").text("领取成功！");
				xinSwiper.slideNext();
				chgUrl.changeUrl("05","","#vip-result");
				document.title="领取体验卡";
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
				case 10006 :
				alert("短信验证码已过期，请重新发送");
				break;
				default:
				alert("服务器错误！")
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