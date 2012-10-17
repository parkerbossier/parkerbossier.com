$(function() {
	// rotate in after everything loads
	$(window).bind('load', function() {
		$('.card').addClass('rotate-in');
	});
	
	// only intercept links if webkit or firefox
	if (/mozilla/i.test(navigator.userAgent) || /webkit/i.test(navigator.userAgent)) {
		// intercept link operation to allow for transition
		$('.navbar a.rotate').click(function(e) {
			e.preventDefault();
				
			// disallow clicking on an active link
			if (!$(this).parent().hasClass('active')) {
				$('.card').removeClass('rotate-in').addClass('rotate-out');
				var addr = $(this).attr('href');
				setTimeout(function() {
					window.location.href = addr;
				}, 500);
			}
		});
	}
});