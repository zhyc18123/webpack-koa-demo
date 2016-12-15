/*  检测用户登录的几种情况:
 *
 *  1 用户未注册帐号,可正常使用
 *
 *  2 用户使用微信扫描但未绑定帐号, 强制绑定帐号,首页显示"请绑定或创建罗盘帐号"
 *
 *  3 用户使用微信登录(已绑定帐号),直接登录
 *
 *  4 用户使用帐号密码登录,直接登录
 *
 * */
var sessionIdGenerator = require('../utils/sessionIdGenerator');

function* checkLoginLogic(next) {

  var nodeUserId;
  var userEmail;

  if (this.session.user && this.session.user.user_id) {
    nodeUserId = this.session.user.user_id;
    userEmail = this.session.user.user_email || "";
  } else {
    nodeUserId = null;
    userEmail="";
  }

  if (nodeUserId && this.uid == nodeUserId) { // user is login
    this.response.isLogin = true;
    this.response.userName = userEmail.substring(0, userEmail.indexOf("@"));
  } else if (nodeUserId && this.uid != nodeUserId) { // uid被修改？
    this.uid = nodeUserId;
    this.response.isLogin = true;
    this.response.userName = userEmail.substring(0, userEmail.indexOf("@"));
  } else { // visitor
    this.response.isLogin = false;
    this.response.userName = null;
  }

  // weichat scaned, but not bind account, force to register
  if (this.session.user && this.session.user.wxuser_id && !this.session.user.user_id) {
    this.response.weichatScanedAndHaveAccount = false;
  } else {
    this.response.weichatScanedAndHaveAccount = true;
  }

  yield next;
}

module.exports = {
  checkLoginLogic
};