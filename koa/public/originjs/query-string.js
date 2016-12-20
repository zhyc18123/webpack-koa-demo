///获取url中的参数
    var getQueryString=function(name) {
      var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
    };
    var getQueryObj= function() {
      var str = window.location.search;
      var num=str.indexOf("?") ;
      if(num<0){
        return false;
      };
      str=decodeURIComponent (str.substr(num+1)); //取得所有参数   stringvar.substr(start [, length ]
      var arr=str.split("&"); //各个参数放到数组里
      var lastArr={};
      for(var i=0;i<arr.length;i++){
        lastArr[arr[i].split("=")[0]]=arr[i].split("=")[1];
      };
      return lastArr;
    };
    module.exports={
      getQueryString:getQueryString,
      getQueryObj:getQueryObj
    };