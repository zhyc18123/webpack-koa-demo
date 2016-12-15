var objectPath = require("object-path");
var moment = require("moment");
moment.locale('zh-CN');

var eFilter = {};

eFilter.fromNow = function(field) {
  return moment(field).fromNow();
};

eFilter.format = function(field, format) {
  return moment(field).format(format);
};

eFilter.highlight = function(field, highLightArr) {
  var jobDesc = field;
  if (!highLightArr) {
    return jobDesc;
  }
  for (var k = 0; k < highLightArr.length; k++) {
    var flag = highLightArr[k];
    jobDesc = jobDesc.slice(0, flag[0]) +
      '<span class="z-blue">' + jobDesc.slice(flag[0], flag[1]) +
      '</span>' + jobDesc.slice(flag[1]);
  }
  return jobDesc;
};

eFilter.break = function(field) {
  var regEx = /\b(\d+[.,、，。])/g;
  var str = field.replace(regEx, "<br/>\n$1");

  return str;
};

eFilter.hack = function(field) {
  var regEx = /以$/;
  var str = "";
  if (regEx.test(field)) {
    str = field + "上";
    return str;
  }
  return field;
};

eFilter.toFixed = function(field, num) {
  var v = field.toFixed(num);
  return v;
};

eFilter.labelSubStr = function(field) {
  return field.substr(0,10);
};
///确保对象存在属性，否则返回默认值。path,如：a.b.c;default,不存在时给的默认值
// eFilter.findObjProp=function(obj,path,default){
//   return objectPath.ensureExists(obj, path, default);
// };

module.exports = eFilter;