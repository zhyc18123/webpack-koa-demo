module.exports = function*() {
	var user = this.session.user || null;
	var data={
		scripts:["/js/index.js"]
	};
	console.log("........................",robot.utils.mixin(config.res, data))
	try{
		yield this.render("/index",robot.utils.mixin(config.res, data));
	}catch(err){
		console.log(err)
	}

	
};