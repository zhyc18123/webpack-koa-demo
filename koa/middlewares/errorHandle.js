
function* serverError(next) {
    try {
        yield next;
    } catch (err) {
        if(this.status>=500){
                if (true) {
                    yield this.render("/500", {
                    });

                } else {
                    var ejsUtil = require("ejs/lib/utils");
                    this.status = err.status || 500;
                    this.type = 'html';
                    var msg = err.stack || err.toString();
                    this.body = '<body><p>Error 500</p><p>' + ejsUtil.escapeXML(msg).replace(/\n/g, "<br/>") + "</p></body>";
                }
            }else{
                        if (404 != this.status) return;
                        this.status = 404;
                        var body = "<p>404 页面未找到！</p>";

                        if (true) {
                            yield this.render("/404", {
                            });
                        } else {
                            switch (this.accepts('html', 'json')) {
                                case 'html':
                                    this.type = 'html';
                                    this.body = body;
                                    break;
                                case 'json':
                                    this.body = {
                                        message: body
                                    };
                                    break;
                                default:
                                    this.type = 'text';
                                    this.body = body;
                            }
                        }
            }
    }
}

function* pageNotFound(next) {
    yield next;
    if (404 != this.status) return;
    this.status = 404;
    var body = "<p>404 页面未找到！</p>";

    if (true) {
        yield robot.myRender("/404", {
            userName: this.response.userName,
            isLogin: this.response.isLogin,
            isWeiChatScanedAndHaveAccount: this.response.weichatScanedAndHaveAccount
        }, this, config.society);
    } else {
        switch (this.accepts('html', 'json')) {
            case 'html':
                this.type = 'html';
                this.body = body;
                break;
            case 'json':
                this.body = {
                    message: body
                };
                break;
            default:
                this.type = 'text';
                this.body = body;
        }
    }
}


module.exports = {
    serverError,
    pageNotFound
};