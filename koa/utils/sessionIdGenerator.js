var crypto = require('crypto');

var ONE_DAY_MS = 86400000;

function generateUid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    var uid = (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    return crypto.createHash('md5').update(uid).digest("hex");
}

module.exports = {
    ONE_DAY_MS,
    generateUid
};
