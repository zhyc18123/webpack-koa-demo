
///手动改变url
var changeUrl = function(state, title, url) {
	history.go(+1);
	if ('pushState' in history) {
		history.pushState(state, title, "/score/analyse?p="+state+url);
	};
};
module.exports={
	changeUrl:changeUrl
};