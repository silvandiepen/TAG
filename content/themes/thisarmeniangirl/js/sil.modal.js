/**!
 * jQuery Sil.Modal
 *
 * Copyright (c) 2014 Sil van Diepen - http://silvandiepen.nl
 *
 * Available for use under the MIT License
 */
(function( $ ){
	$.fn.Modal = function(data){
		

// variables
		
//	console.log($(this));
//	console.log(data);	


		var parent = $(this);
		var modal = {};
		
		
// subFunctions	

	$.fn.Modal.CloseAll = function(e){
		$(document).find('.modal').each(function(){
			$(this).addClass('close').after(function(){
				$(this).remove();
			});
		})
  };
  
	$.fn.Modal.Close = function(e){
		$(e).addClass('after').css('top','10px');
		setTimeout(function(){
			$(e).remove();
		},500);
  };
		
	$.fn.Modal.Navigate = function(e,to){
		
		//console.log(to);
		
		var thisId = e.closest('.modal').attr('id');
	//	console.log(thisId);
		
		var thisElement = e.closest('.modal');
		var mainIndex = $('a[href="#'+thisId+'"]').parent().index();
		var mainEl = $('a[href="#'+thisId+'"]').parent().parent();
		
		var mainCount = $(mainEl).find('.item').length -1;
		
		console.log(mainIndex);
		console.log(mainCount);
		var parentEl = $('a[href="#'+thisId+'"]').parent();
		
		if(mainIndex <= 0){
			prevElID = thisId;
		} else {
			var prevEl = $(parentEl).prev('div');
			var prevElID = $(prevEl).find('a').attr('href').substr(1);
		}		
		
		if(mainIndex < mainCount) {
			var nextEl = $(parentEl).next('div');
			var nextElID = $(nextEl).find('a').attr('href').substr(1);
		} else {
			nextElID = thisId;
		}		
		

		$.fn.Modal.Close($(thisElement));
		
		if(to == 'next'){
			var pictureID = nextElID;
			getPicture(nextElID,'http://localhost/timmerdorp-wp/flickr.json');
		} else if(to == 'prev'){
			var pictureID = prevElID;
			getPicture(prevElID,'http://localhost/timmerdorp-wp/flickr.json');
		}

		$('body').Modal({
				content: null,
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
		
		
		
  };
			
	$.fn.Modal.MakeModal = function(element,modal){
		
		//console.log(modal);
		
		if(modal['closeAll'] == true){
			$.fn.Modal.CloseAll();
		}
	// Build Modal	
		$(element).append(modal['_modal']).after(function(){
			// give Class/Id
						
			if(modal['ModalClass'] != null){ $('.modal:last-child').addClass(modal['ModalClass']); }
			if(modal['ModalID'] != null){ $('.modal:last-child').attr('id',modal['ModalID']); }
			
			// Make that Background
			if(modal['_background'] != null){ $('.modal:last-child').append(modal['_background']); }
	
			
			// Make that Content
			$('.modal:last-child').append(modal['_content']).after(function(){
				if(modal['_prev'] != null){ $('.modal:last-child .content').append(modal['_prev']); }
				if(modal['_next'] != null){ $('.modal:last-child .content').append(modal['_next']); }
				if(modal['_close'] != null){ $('.modal:last-child .content').append(modal['_close']); }
				$('.modal:last-child .content .spacer').append(modal['content']);
			});
			
			setTimeout(function(){
				$('.modal').removeClass('before');
			}, 10);
			
		});
	
  };

// 		defaults
		modal = {
			content: 0,
			ModalID: 0,
			ModalClass: 0,
			show: true,
			closeall: true,
			background: true,
			closeBg: true,
			scroll: false,
			fullscreen: false,
			closer: true,
			animate: false,
			navigation: false
		};		
		
// Overrule Defaults
		$.each(modal, function(key,value){
		//	console.log(key);
			if(key in data){
				modal[key] = data[key];
			} 
		});
			
		
// make html
		modal['_modal'] = $('<div class="modal build">'),
		modal['_content'] = $('<div class="content"><div class="spacer">');
	

// Make elements		
		if(modal['background'] == true){
			modal['_background'] = $('<div class="background">');
			if(modal['closeBg'] == true){ $(modal['_background']).addClass('closer'); }
		} else { modal['_background'] = '';}
		
		if(modal['fullscreen'] == true){
			$(modal['_modal']).addClass('fullscreen'); 
		}
		if(modal['scroll'] == true){
			$(modal['_modal']).addClass('scroll'); 
		} else {
			$(modal['_modal']).addClass('noscroll'); 
		}
		if(modal['closer'] == true){
			modal['_close'] = $('<a href="#" class="closer" />');
		} else { modal['_close'] = ''; }
		
		if(modal['navigation'] == true){
			modal['_next'] = $('<a href="#next" class="nav next" />');
			modal['_prev'] = $('<a href="#prev" class="nav prev" />');
		} else { 
			modal['_next'] = ''; 
			modal['_prev'] = ''; 
		}
		
		if(modal['animate'] == true){
		//	console.log('animate = true');
		}
				
		if(modal['show'] == true){
			$.fn.Modal.MakeModal(parent,modal);
		} else{ }
	};
		
}) (jQuery );

$(document).on('click','.modal .closer, .modal .nav',function(e){
	
	e.preventDefault();
	
	var element = $(this).closest('.modal');
	
//	console.log($(element));
	
	var Modal = $.fn.Modal(e);
	var classes = $(this).attr('class');
	
//	console.log(classes);
	
	if(classes.indexOf('closer') != -1){
		$.fn.Modal.Close($(element));
	}
	if(classes.indexOf('nav') != -1){
		if(classes.indexOf('prev') != -1){
			$.fn.Modal.Navigate($(element),'prev');
		} else if(classes.indexOf('next') != -1){
			$.fn.Modal.Navigate($(element),'next');
		}
	}
	//console.log(e);
	


})



