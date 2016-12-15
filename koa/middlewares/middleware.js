var logger = utils.log("/middleware/middleware.js");


function* isLogin(next) {
    console.log("已登录用户");
    if (!this.session.user && this.path.indexOf("login") < 0) {
        console.log(null);
        if (this.header["x-requested-with"] === "XMLHttpRequest") {
            this.body = {
                isNeedLogin: 1
            };
        } else {
            this.redirect("/login");
        }
        return;
    }
    if (this.session.user && this.path.indexOf("login") >= 0) {
        if (this.header["x-requested-with"] === "XMLHttpRequest") {
            this.body = {
                err: "请勿再次登录"
            };
        } else {
            this.redirect("/recommend");
        }
        return;
    }
    if (this.session.user) {
        config.res.user = this.session.user;
        console.log(this.session.user.email);
    }
    yield next;
}

function* isUniqueBuy(next) {
    if (this.session.user.buyingCV === CID) {
        logger.warn("该用户正在同时购买同一份简历");
        this.body = {
            error: "您正在购买该简历，请勿重复购买"
        };
        return;
    }
    yield next;
}

function* sendEmail(next) {
    var email = require("./email");
    var users = [
        // {name: "周敏", email: "gdpmp@126.com", password: "mzj55261"},
        // {name: "王芬娥", email: "wangfe@kinco.cn", password: "opa90826"},
        // {name: "宋佳音", email: "talentsbon@163.com", password: "olq09721"},
        // {name: "郭梨苹", email: "hr@ioart.com", password: "nlp66721"},
        // {name: "周隽霞", email: "274107196@qq.com", password: "qds87911"},
        // {name: "陈绮兰", email: "34001633@qq.com", password: "a1234567"},
        // {name: "余莎", email: "yusha@keybridge.com.cn", password: "b1234567"},
        //
        // {name: "张花", email: "zhanghua@sziknow.com", password: "c1234567"},
        // {name: "郭姝", email: "3068591@qq.com", password: "d1234567"},
        // {name: "华欢", email: "hh@ccic-set.com", password: "e1234567"},
        // {name: "Sammy", email: "xiehongpsy@163.com", password: "f1234567"},
        // {name: "刘逸凡", email: "8093780@qq.com", password: "g1234567"},

        // {name: "余励", email: "hr@cheungning.com", password: "h1234567"},
        // {name: "张乾昌", email: "358924035@qq.com", password: "i1234567"},
        // {name: "曹敏", email: "2773798336@qq.com", password: "j1234567"},

        {
            name: "pzh",
            email: "450000549@qq.com",
            password: "mzj55261"
        }
    ];

    for (var i = 0; i < users.length; i++) {

        var env = this.render.env;
        var html = env.render("email_account_tpl.html", {
            name: users[i].name,
            email: users[i].email,
            password: users[i].password
        });

        var options = {
            from: "haoHR<service@haohr.com>", // 发件地址
            to: users[i].email, // 收件列表
            subject: "haoHR产品体验邀请", // 标题
            html: html // 邮件模板
        };

        yield sendEmail();

    }

    yield next;

    function sendEmail() {
        return new Promise(function(resolve, reject) {
            email.send(options, function(err, feedback) {
                if (err) {
                    console.error('邮件发送失败');
                    reject(err);
                    return;
                }
                console.log('邮件已发送');
                // var mail = body.email.split('@');
                // var url = '//mail.' + mail[1];
                resolve();
            });
        });
    }
}


module.exports = {
    isLogin: isLogin,
    sendEmail: sendEmail
};