$(function() {
	// pills click handler (show the correct content)
	$('.nav-pills li').not('.disabled').not('active').click(function() {
		var self = $(this);
		var divToShow = self.children('a').data('name');
		self.siblings().removeClass('active');
		self.addClass('active');
		$('#content-container .content-item:visible').hide();
		$('.' + divToShow).show();
	});
});

// select the correct tab on window load
$(window).load(function() {
	var hash = window.location.hash.substr(1) || false;
	if (hash) $('.nav-stacked a[data-name="' + hash + '"]').parent().click();
});