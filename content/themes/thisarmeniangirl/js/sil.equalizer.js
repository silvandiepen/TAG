/**!
 * jQuery Sil.Equalizer
 *
 * Copyright (c) 2014 Sil van Diepen - http://silvandiepen.nl
 *
 * Available for use under the MIT License
 */

	
/* 	equalizer */
function equalizer() {

	var i = 0; 	  
  var equals = {};
  var max_height = 0;
  $(document).find('.equalizer').each(function(indexInArray){
  
    var groupIndex = indexInArray;
    var groupId = 'equalizer' + groupIndex;

    $(this).attr('id',groupId);

    $(document).find('.equal').each(function(indexInArray){
      if($(this).height()>max_height){
        max_height = $(this).height();
      }
      $(this).attr('id','equal' + groupIndex + ''+indexInArray);
      equals[i] = { group: groupId, el: $(this), height: $(this).height() };
      i++;
    });
    
    $.each(equals, function(i,e){ 
      e.el.height(max_height);
    })
  });
}

