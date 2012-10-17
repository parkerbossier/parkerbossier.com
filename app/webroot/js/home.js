// moves the intro text to the vertical center of the row
$(window).bind('load', valign_site_intro);
$(window).resize(function() {
	valign_site_intro();
});

function valign_site_intro() {
	// don't adjust offset if the row isn't split
	if ($('#site-intro').css('float') != 'none') {
		var parent_height = $('#site-intro').parent().height();
		var intro_height = $('#site-intro').height();
		var offset = (parent_height-intro_height)/2;
		$('#site-intro').css('margin-top', offset + 'px');
	}
}