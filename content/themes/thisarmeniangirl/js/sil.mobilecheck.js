/**!
 * jQuery Check Mobile / Desktop plugin
 *
 * Copyright (c) 2014 Sil van Diepen - http://silvandiepen.nl
 *
 * Available for use under the MIT License
 */


/* check mobile */	
function checkMobile(mobile){
	var mobileW = mobile || 800;
	var windowW = $(window).outerWidth();
	
	if(windowW < mobileW){
		$('body').addClass('mobile');
		$('body').removeClass('desktop');
		return true;
	} else {
		$('body').removeClass('mobile');
		$('body').addClass('desktop');
		return false;
	}
}

