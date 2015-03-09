
function mapWidth(width){
	var row = width || 1080;
	if($(window).width() > row){
		var windowW = $(window).width();
		var sparespace = (windowW - row)/2;
		var mapHolderW = $('.map').width();
		var mapHolderH = $('.map').parent().outerHeight();
		var mapNewW = mapHolderW + sparespace;
		$('#map').css('width',mapNewW+'px');
		$('#map').css('height',mapHolderH+'px');
	}
}

function getAlbums(parent,album_link){
			
	var albums = [];
	var i = 0;
	
  $.getJSON( album_link, {
    format: "json"
  })
	.done(function( data ) {
		
		$.each(data, function(i,e){ 
			
			$(parent + ' #album_years > ul').append('<li class="'+ i +'"><a href="#'+ i +'" data-year="'+ i +'" class="header">'+ i +'</a></li>');
			$(parent + ' #album_list > ul').append('<li class="'+ i +'"><ul></ul></li>');
			
      $.each(e, function(i,value){ 
		     
		    var picture = '<li data-count="'+ value['count']+'"><span class="image" style="background-image:url(\''+ value['cover'] +'\');"></span><a href="#' + value['id']+ '" class="item" data-album="' + value['id']+ '"><span class="title">'+ value['title'] +'</span></a></li>';
		    
			 	$(parent + ' #album_list > ul > li:last-child > ul').append(picture);				

	    })
    })
	})
}


function getAlbum(id,album_link){
	
	$('.photo-slider').remove();
	$('#album_pictures').append('<div id="album_'+id+'" class="photo-slider" />');
	
	
	
	setTimeout(function(){
		$.getJSON( album_link, {
	    format: "json"
	  })
		.done(function( data ) {
			$.each(data, function(i,e){ 
		    $.each(e, function(i,value){ 
		      if(value['id'] == id){
		       // $('#album'+id + ' .content .spacer').append($('<h1>' + value['title'] + '</h1><div class="row" />'));
			      
						$.each(value['photos'], function(key,img){ 
						//	$('#album_pictures .photo-nav').append('<div class="item"><div style="background-image:url(' + img['s'] + ');" /></div>');
						//	$('#album_pictures .photo').append('<div class="item"><div style="background-image:url(' + img['o'] + ');" /></div>');
							
							console.log(id + ' - ' + img['s']);
							
							$('#album_pictures #album_'+id).append('<div class="image"><img data-lazy="' + img['s'].replace('_m','_b') + '" /></div>');
				     // $('#album_pictures .photo').append($('<div class="photo"><a href="#' + img['id'] +'" style="background-image:url(' + img['m'] +')" /></div>'));
				     // $('#album_pictures .photo-nav').append($('<div class="photo"><a href="#' + img['id'] +'" style="background-image:url(' + img['s'] +')" /></div>'));			      
				      
				      //$('#album'+ id + ' .content .spacer .row').append($('<div class="mini-6 medium-3 large-2 item"><a href="#' + img['id'] +'" style="background-image:url(' + img['s'] +')" /></div>'));
						})
						
						console.log('and do this after');
						$('#album_'+id).slick({
						  lazyLoad: 'ondemand',
						  slidesToShow: 1,
						  slidesToScroll: 1,
						  adaptiveHeight: true
						});		
		      }
		    })
			})	
		})
	},100);
}

function getPicture(id,picture_link){
	$.getJSON( picture_link, {
    format: "json"
  })
	.done(function( data ) {
		
		$.each(data, function(i,e){ 
      $.each(e, function(i,value){ 
				$.each(value['photos'], function(key,img){ 

					if(img['id'] == id){
				//		console.log(img);
						$('#'+id+ ' .content .spacer').append($('<img class="inactive" id="image-'+ img['id'] +'" src="'+ img['m'] +'" />'));
						setTimeout(function(){ $('#image-'+img['id']).removeClass('inactive'); },1000);
					}
		  	})
		  })
		})
	})
	
}

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