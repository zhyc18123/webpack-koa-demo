module.exports = function*() {
	var user = this.session.user || null;
	var data={
		scripts:["/js/index.js"]
	};
	yield this.render("/index",robot.utils.mixin(config.res, data));
};