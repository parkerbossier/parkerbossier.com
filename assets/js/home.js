// on DOM load
$(function() {
	// show the nav bar and hide the content divs (no-JS safe)
	$('#nav_bar').show();
	$('.content').not('#parkerbossier').hide();
	
	// parkerbossier click handler
	$('#parkerbossier_nav').click(function() {
		// for efficiency...
		var jthis = $(this);
        
		// only run if not selected
		if (!jthis.hasClass('selected')) {
            
			// hide the project submenu
			$('#project_bar').hide('blind', {}, 'fast', function() {
				// reset the project submenu
				$(this).find('.selected').removeClass('selected');
			});
        
			// select the correct nav button and then reset the projects submenu
			select_nav(jthis);
		}
	});
    
	// projects click handler
	$('#projects_nav').click(function() {
		// for efficiency...
		var jthis = $(this);
        
		// only run if not selected
		if (!jthis.hasClass('selected')) {
            
			// select the correct nav button and then reset the projects submenu
			select_nav(jthis);
			$('#project_bar li:first').click();
		}
	});
    
	// projects submenu click handler
	$('#project_bar li').click(function() {
		// for efficiency...
		var jthis = $(this);
        
		// show the appropriate content
		if (!jthis.hasClass('selected')) {
			select_nav(jthis);
		}
	});
    
	// emulate resume link functionality
	// this is here because the li's have padding, meaning an anchor tag (even with
	// width and height of 100%) doesn't fill up the whole li.
	// this is much cleaner IMO
	$('#resume_nav').click(function() {
		window.open($(this).attr('data-link'), 'resume');
	});
});

// selects this nav button and shows the correct page, then calls @callback
function select_nav(jthis, callback) {
	// select just this item
	jthis.siblings().removeClass('selected');
	jthis.addClass('selected');
        
	// hide visible content
	$('#content_wrapper .content:visible').hide();
    
	// show the correct page
	$(jthis.attr('data-content')).show('blind', 'fast', function() {
		if (callback != undefined) {
			callback();
		}
	});
}