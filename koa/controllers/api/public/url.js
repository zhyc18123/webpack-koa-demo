var config = require("../../../config/config");
module.exports = {
	getAutoCode: config.localIp + '/data?id=user.send_sms_code',
	getVip: config.localIp + '/data?id=user.get_experience_card',
	guestSchool:config.xinSearchIp+'/sch/search'
};
