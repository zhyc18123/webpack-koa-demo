/**
 * Created by yang on 16/6/3.
 */
var Roles = require('koa-roles');
var logger = utils.log("/middlewares/roles.js");

var user = new Roles({
    failureHandler: function *(action) {
        // optional function to customise code that runs when
        // user fails authorisation
        this.status = 403;
        var t = this.accepts('json', 'html');
        if (t === 'json') {
            this.body = {
                message: 'Access Denied - You don\'t have permission to: ' + action
            };
        } else if (t === 'html') {
            this.render('access-denied', {action: action});
            this.redirect('/');
        } else {
            this.body = 'Access Denied - You don\'t have permission to: ' + action;
        }
    }
});



//admin users can access all pages
user.use("admin", function (action) {
    if (this.session.user.role === 50) {
        return true;
    }
});



module.exports = user
