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

    // runs after the rotate transition (not needed for firefox)
    $('.card').bind('webkitTransitionEnd oTransitionEnd otransitionend msTransitionEnd', function(){
        // reset the HTML to make the video work correctly
        var tempHTML = $('.embedded-video-parent').html();
        $('.embedded-video-parent').html(tempHTML);
    });
});

// select the correct tab on window load
$(window).load(function() {
    var hash = window.location.hash.substr(1) || false;
    if (hash) $('.nav-stacked a[data-name="' + hash + '"]').parent().click();
});