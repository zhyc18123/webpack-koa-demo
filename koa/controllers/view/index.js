module.exports = function*() {
	var data={
		scripts:["/js/index.js"]
	};
	try{
		yield this.render("/index",robot.utils.mixin(config.res, data));
	}catch(err){
		throw err;
	}
};