module.exports=function(title){
	var $body = $('body');
	document.title = title;
	var $iframe = $('<iframe src="/favicon.ico"></iframe>');
	$iframe.on('load',function() {
	  setTimeout(function() {
	      $iframe.off('load').remove();
	  }, 0);
	}).appendTo($body);
};