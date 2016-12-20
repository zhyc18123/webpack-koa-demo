var router = require("koa-router")();
var requireDir = require("require-dir");
// var auth = require("./middleware");
var api = requireDir("../controllers/api");
var view = requireDir("../controllers/view");

// view
router.get("/", view.index);

//api
router.post("/get-auto-code", api.get_auto_code.getAutoCode);
router.post("/get-vip", api.get_auto_code.getVip);
router.post("/guest-school", api.input.guestSchool);
router.post("/analysis", api.analysis.getAnalysisReport);

module.exports = router;
