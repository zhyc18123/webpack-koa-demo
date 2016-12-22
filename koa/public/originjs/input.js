
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
		console.log($(".js-close"))
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
	//监听选择学校
	$(document).on("click",".school-list li",function(){
		selectSchool(this);
	});
	// 监听生成报告
	$("#get-report").on("click",function(){
		var provId=$("#prov-name").data("val"),
		       score=$("#score").val(),
		       prevName=$("#prov-name").val(),
		       schoolName=$("#school-input").val();
		if(!provId){
			alert("请选择省份！");
			return;
		};
		if(!score){
			alert("请输入你的联考成绩！");
			return;
		}else{
			if(isNaN(score)){
			   alert("分数必须为数字");
			   return;
			};
		};
		if(prevName==="江苏"){
			if(score<0||score>480){
				alert("江苏的分数范围为0~480");
				return;
			};
		}else if(prevName==="海南"){
			if(score<0||score>900){
				alert("海南的分数范围为0~900");
				return;
			};
		}else{
			if(score<0||score>750){
				alert("请输入正确的分数！");
				return;
			};
		};
		if(schoolName.length>40){
			alert("学校名长度不允许大于40字！");
			return;
		};
		var examNum=$("#exam-no").val();
		var data={
			req_id:examNum+Date.parse(new Date()),
			exam_no:examNum,
			province_id:provId,
			score:score,
			exp_sch_id:$("#school-input").data("val")||"",
			batch:$("#school-input").data("batch")||"",
			wenli:$(".subject-type .active").data("val"),
		};
		analysisReport.swipeToAnalysisReportPage(data,xinSwiper);

	});
};
var setProvByName=function(provName){
	var provObj=prov.getProvInfoByName(provName);
	$("#prov-name").data("val",provObj.loc_id)
			    .val(provObj.name);
};
var initPage=function(){
	var provName=queryString.getQueryString("prev_name")||"",
		score=queryString.getQueryString("score"),
		salesmanId=queryString.getQueryString("salesman_id"),
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
	var schString=$(that).val();
	if(!schString){
		return;
	};
	var data={
		req_id:$("#exam-no").val()+Date.parse(new Date()),
		search_key:schString,
		wenli:$(".subject-type .active").data("val")
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
		provHtml+='<li data-val='+item.loc_id+'>'+item.name+'</li>'
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
