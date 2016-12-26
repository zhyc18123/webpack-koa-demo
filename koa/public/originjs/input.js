
import url from"./url";
import prov from "./loc.js";
import queryString from "./query-string";
var analysisReport = require('./analysis-report');
var init=function(xinSwiper){
	//获取url参数，初始化页面
	initPage();
	// 初始化省份列表
	createProv();
	//监听打开选择省份
	$(document).on("click","#prov-name",function(){
		if($(".js-open").length){
			$(".js-open").click();
		}else{
			$(".js-close").click();
		};
	});
	$(document).on("click",".js-open",function(){
		openProv(this);
	});
	//监听关闭选择省份
	$(document).on("click",".js-close",function(){
		closeProv(this);
	});
	//监听选择省份
	$(document).on("click",".prov-list li",function(){
		selectProv(this);
	});
	// 文理科监听
	$(".subject-type span").on("click",function(){
		selectSubject(this);
	});
	// 监听学校联想
	$("#school-input").on("input porpertychange",function(){
		guestSchool(this);
	});
	// 监听学校联想失去光标
	$("#school-input").on("focusout",function(){
		setTimeout(function(){
			if($("#school-input").val()){
				if(!$("#school-input").data("val")){
					if($(".school-list li").length){
						$($(".school-list li")[0]).click();
					};
				};
				$(".school-list").hide();
			}else{
				$(".school-list").hide();
			};
		},200)
	});
	// 监听分数输入
	$("#score").on("input porpertychange",function(){
		var score=$(this).val();
		var patrn= /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,1}$|^[1-9]\d{0,8}$/; 
		if (!patrn.exec(score)){
			$(this).val("");
		};
	});
	//监听选择学校
	$(document).on("click",".school-list li",function(){
		selectSchool(this);
	});
	// 监听生成报告
	$("#get-report").on("click",function(){
		createReport(xinSwiper);
		ga('send', 'event', '输入界面', '生成定位分析报告', '生成报告');
	});
};
var createReport=function(xinSwiper){
		var provId=$("#prov-name").data("val"),
		       score=$("#score").val(),
		       prevName=$("#prov-name").val(),
		       schoolName=$("#school-input").val(),
		       schoolId=$("#school-input").data("val");
		if(!provId){
			alert("请选择省份！");
			return;
		};
		if(!$.trim(score)){
			alert("请输入你的联考成绩！");
			return;
		}else{
			var res = /^(\d+\.\d{1,1}|\d+)$/ ;
    			if(!res.test(score)){
			   alert("分数最多输入一位小数点");
			   return;
			};
		};
		if(prevName==="江苏"){
			if(score>480){
				alert("您输入的成绩已超过满分，请重新输入");
				return;
			};
		}else if(prevName==="海南"){
			if(score>950){
				alert("您输入的成绩已超过满分，请重新输入");
				return;
			};
		}else{
			if(score>750){
				alert("您输入的成绩已超过满分，请重新输入");
				return;
			};
		};
		if(schoolName.length>40){
			alert("学校名长度不允许大于40字！");
			return;
		};
		if($.trim(schoolName).length){
			if(!schoolId){
				if($(".school-list li").length){
					schoolName=$($(".school-list li")[0]).val();
					
				}else{
					alert("学校名无效！请清空或重新输入并选择下拉列表学校！");
					return;
				};
			};
		};
		var examNum=$("#exam-no").val();
		var data={
			req_id:examNum+Date.parse(new Date()),
			exam_no:examNum,
			province_id:provId,
			score:score,
			exp_sch_id:$("#school-input").data("val")||$($(".school-list li")[0]).data("val")||"",
			batch:$("#school-input").data("batch")||$($(".school-list li")[0]).data("batch")||"",
			wenli:$(".subject-type .active").data("val"),
			type:"spt"
		};
		analysisReport.swipeToAnalysisReportPage(data,xinSwiper);
};
var setProvByName=function(provName){
	var provObj=prov.getProvInfoByName(provName);
	$("#prov-name").data("val",provObj.loc_id)
			    .val(provObj.name);
};
var initPage=function(){
	var provName=queryString.getQueryString("prov_name")||"",
		score=Math.round(queryString.getQueryString("score")),
		salesmanId=queryString.getQueryString("salesman_id"),
		wenli=queryString.getQueryString("wenli"),
		examNo=queryString.getQueryString("exam_no");
	// 设置省份
	if(provName){
		setProvByName(provName);
	}else{
	             // 百度地图API功能
                          if (typeof(BMap) != "undefined" ) {
	                          ///浏览器和经纬度定位
	                        var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var point = new BMap.Point(r.point.lng,r.point.lat); 
		                              	var gc = new BMap.Geocoder();
		                               	gc.getLocation(point,function (rs) {   //getLocation函数用来解析地址信息，分别返回省市区街等
					 	            var addComp = rs.addressComponents;
					 	            var province = addComp.province;//获取省份
							setProvByName(province);
					});
				};      
			});
                          };
            };
            if(wenli){
            	var subjectSpan=$(".subject-type span");
            	subjectSpan.removeClass("active");
            	subjectSpan.find('i').removeClass("icon-gou");
            	if(wenli==1){
            		subjectSpan.eq(1).addClass("active").find('i').addClass('icon-gou');
            	}else{
            		subjectSpan.eq(0).addClass("active").find('i').addClass('icon-gou');
            	};
            };
            // 设置分数
            if(score){
            	$("#score").val(score);
            };
            //设置准考证号
            if(examNo){
            	$("#exam-no").val(examNo);
            };
            //设置销售人员id
            if(salesmanId){
            	$("#sales-man").val(salesmanId);
            };
};
var selectSchool=function(that){
	$("#school-input").data("val",$(that).data("val"))
			      .data("batch",$(that).data("batch"))
			      .val($(that).text());
	$(".school-list").hide();
};
var createSchoolList=function(list){
	var schHtml="";
	$.each(list,function(i,item){
		schHtml+='<li data-batch='+item.bacth+' data-val='+item.sch_id+'>'+item.sch_name+'</li>'
	});
	$(".school-list").hide().html(schHtml).show();
	$(".school-input").addClass("prov-input-active");

	if(!schHtml){
		$(".school-list").hide();
		$(".school-input").removeClass("prov-input-active");
	};
};
var guestSchool=function(that){
	$(that).data("val","");
	var schString=$(that).val();
	var provId=$("#prov-name").data("val");
	if(!$.trim(schString)){
		$(".school-list").hide();
		return;
	};
	if(!provId){
		alert("请先选择省份！");
		return;
	};
	var data={
		req_id:$("#exam-no").val()+Date.parse(new Date()),
		search_key:schString,
		wenli:$(".subject-type .active").data("val"),
		province_id:provId
	};
	$.ajax({
		type: "post",
		cache: false,
		url: url.guestSchool,
		data:data,
		success: function(data) {
			console.log(data)
			switch (data.code){
				case 0:
				createSchoolList(data.sch_list);
				case -1:
				createSchoolList(data.sch_list);
				break;
				default:
				break;
			}
		},
		error: function(request, error) {
			// alert("服务器错误！")
		}
	})
};
var selectSubject=function(that){
	$(that).parent().find("span").removeClass("active").find('i').removeClass('icon-gou');
	$(that).addClass('active').find("i").addClass('icon-gou');
};
var createProv=function(){
	var provHtml="";
	$.each(prov.province,function(i,item){
		if(item.loc_id){
			provHtml+='<li data-val='+item.loc_id+'>'+item.name+'</li>';
		};
	});
	$(".prov-list").html(provHtml);
};
var openProv=function(that){
	$(that).addClass("js-close")
		.removeClass("js-open")
		.find("i").removeClass('icon-down').addClass('icon-close').end()
		.parent().addClass("prov-input-active")
		.end().closest('.prov-input-list').find('.prov-list').show();
};
var closeProv=function(that){
	$(that).addClass("js-open")
		.removeClass("js-close")
		.find("i").removeClass('icon-close').addClass('icon-down').end()
		.parent().removeClass("prov-input-active")
		.end().closest('.prov-input-list').find('.prov-list').hide();

};
var selectProv=function(that){
	$("#prov-name").data("val",$(that).data("val"))
			    .val($.trim($(that).text()));
	$(".js-close").click();
};
module.exports = {
    init:init
};
