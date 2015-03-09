$('.newsslider').slick({
  slidesToScroll: 1,
  infinite: false,
  centerMode: true,
  variableWidth: true,
  navigation: false,
  autoplay: true,
  autoplaySpeed: 4000,
  accessibility: false,
  arrows: false
});
$('.sponsorlist').slick({
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
  navigation: false,
  autoplay: true,
  autoplaySpeed: 2000,
  accessibility: false,
  arrows: false
});

$('.infoslider').slick({
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true
});

$('.headerslider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  fade: true,
  arrows: false
});


/*
new GMaps({
  div: '#map',
  lat: 52.6103431,
  lng: 4.6955598,
  content: '<div class="overlay">Timmerdorp</div>'
});
*/





$(document).on('click','#informatie .top a',function(e){
	e.preventDefault();	
	
	var index = $(this).parent().index();
	//console.log(index);
	
	$('#informatie .top li').removeClass('active');
	$(this).parent().addClass('active');
	
})


$(document).on('click','#foto #album_years a',function(e){
	e.preventDefault();
	
	var year = $(this).attr('data-year');
	//console.log(year);
	
	$('#foto #album_list ul li, #foto #album_years ul li').removeClass('active');
	$('#foto #album_list ul li.' + year + ' ul, #foto #album_years ul li.'+year).addClass('active');
});


// mobile nav
$('#trigger').click(function(){
	if($(this).hasClass('active')){
		$('header nav ul li').animate({ opacity: 0 }, 300);
		$('header nav ul').delay('200').animate({ top: '-100%' }, 300);		
		$(this).removeClass('active');
	} else{
		$('header nav ul').delay('200').animate({ top: '0%' }, 300);
		$('header nav ul li').delay('600').animate({ opacity: 1 }, 300);
		$(this).addClass('active');
	}
})


$(document).on('click','nav a',function(e) {
  e.preventDefault();
  var section = $(this).attr("href");
  var sctop = $(section).offset().top - $('nav#main').outerHeight();
  $("html, body").animate({
    scrollTop: sctop
  });
});
	
	


$(document).ready(function(){
	//mapWidth();		
	topbar('nav#main');
	topbarScroll();
	getAlbums('#foto','http://localhost/timmerdorp-wp/flickr.json');
	setTimeout(function(){ $('#foto ul.top li:first-child, #foto ul.content li:first-child').addClass('active'); },2000);
});

$(document).resize(function(){
	mapWidth();
});

$(document).scroll(function(){	
	topbarScroll();
});




$(document).on('click','#foto a.item',function(e){
	e.preventDefault();

		$('.photo').empty();
		
	//console.log($(this));
	var albumID = $(this).attr('data-album');
	var message = getAlbum(albumID,'http://localhost/timmerdorp-wp/flickr.json');
		
/*
	$('body').Modal({
			content: message,
			ModalID: 'album'+albumID,
			ModalClass: 'album',
			closeall: true,
			scroll: true,
			background: true,
			closeBg: true,
			closer: true,
			navigation: false
	});
*/
})


$(document).on('click','.modal .content .item a',function(e){
	e.preventDefault();
		
	var pictureID = $(this).attr('href').substring(1);
	var message = getPicture(pictureID,'http://localhost/timmerdorp-wp/flickr.json');

	$('body').Modal({
			content: message,
			ModalID: pictureID,
			ModalClass: 'picture',
			closeall: false,
			fullscreen: false,
			background: true,
			scroll: false,
			closeBg: true,
			closer: true,
			navigation: true
	});
})



