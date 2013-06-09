$(document).ready(function(){
    $('.tabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
    });
	
	$(".slider").noUiSlider({

    range: [0, 100]
   ,start: [50, 70]
   ,handles: 2
   ,serialization: {
      to: [$("#exTO"),$("#exFR")]
   }

}); 
	
});
