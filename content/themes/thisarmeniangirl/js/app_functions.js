function topbar(el){
	$(el).clone().addClass('clone').insertAfter(el);
}
	
function topbarScroll(){
	i = 0;
	var headerH = $('header').outerHeight();
	var scrollTop = $(window).scrollTop();
	
	var sectionId = $('section').mostVisible().attr('id');
	//console.log(sectionId);
	$('section').inViewport().each(function(){
		sectionId = $(this).attr('id');
		if(i === 0){					
			$('nav#main').find('a').each(function(){ 
				if($(this).attr('href') === '#'+sectionId){
					$(this).addClass('current');		
				} else {
					$(this).removeClass('current');
				}
			})	
		}	
		i++;	
	})	
			
	if(scrollTop > headerH){
		$('nav#main.clone').addClass('active');
	} else {
		$('nav#main.clone').removeClass('active');
	}
}