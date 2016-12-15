/**
 * 混合
 * @param  object source 源对象
 * @param  object target 目标对象
 * @return object        混合后的对象
 */
var mixin = function(source, target) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            if (target[key] !== undefined) {
                continue;
            } else {
                target[key] = source[key];
            }
        }
    }

    return target;
};

module.exports = mixin;
