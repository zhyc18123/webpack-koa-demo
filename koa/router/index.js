var router = require("koa-router")();
var requireDir = require("require-dir");
// var auth = require("./middleware");
var api = requireDir("../controllers/api");
var view = requireDir("../controllers/view");

//society view
router.get("/", view.index);

module.exports = router;
