// re-center on resize
$(window).resize(valignHeightAdjust);

// DOM load
$(function() {
    valignHeightAdjust();

    // calculate the offset (click) for the profile card before the user can touch it
    var relativeAboutOffset = $('.card.profile').offset().top - $('.card.profile .about-header').offset().top;

    // profile click handler
    $('.card.profile').click(function() {
        var innerCard = $(this).children('.inner-card');
        if (innerCard.hasClass('clicked')) {
            innerCard.removeClass('clicked');
            innerCard.css('margin-top', '');
        } else {
            innerCard.addClass('clicked');
            innerCard.css('margin-top', relativeAboutOffset + 'px');
        }
    });

    // offset the card headers
    $('.card-header').css('top', '-' + $('.card-header').height() + 'px');

    // detect mobile browser (don't unpeek if mobile becasue of lack of hover)
    var mobile = /android|webos|iphone|ipad|itouch|blackberry|iemobile/i.test(navigator.userAgent);

    // peek the cards
    setTimeout(function() {
        $('.inner-card').css('margin-top', $('.card-header').height() + 'px');

        // un-peek if not mobile
        if (!mobile) {
            setTimeout(function() {
                // allow hovering after the CSS transition
                $('.inner-card').bind('webkitTransitionEnd transitionend oTransitionEnd', function() {
                    $('.inner-card').addClass('peeked');
                });

                // unpeek if not hovered
                $('.inner-card').each(function() {
                    var $this = $(this);
                    if ($this.is(':hover'))
                        $this.addClass('peeked');
                    else
                        $this.css('margin-top', '0px');
                });
            }, 2500);
        }
    }, 750);

    // show the card headers when hovered
    $('.inner-card').hover(function() {
        var $this = $(this);
        if (!$this.hasClass('clicked') && $this.hasClass('peeked'))
            $this.css('margin-top', $('.card-header').height() + 'px');
    }, function() {
        var $this = $(this);
        if (!$this.hasClass('clicked') && $this.hasClass('peeked'))
            $this.css('margin-top', '0px');
    });
});

// set the card heights and vertically center the cards
function valignHeightAdjust() {
    // set the card heights
    var cardWidth = $('.card').width();
    $('.card').height(cardWidth);

    // set the picture heights
    $('.card-preview').height(cardWidth);

    // vertically center the cards
    var docHeight = $(document).height();
    var rowOffset = $('.row').offset().top;
    $('.card').css('margin-top', (.9*docHeight-rowOffset-cardWidth)/2);

    // overlay the shadow divs
    $('.card-shadow').width(cardWidth).height(cardWidth);
    $('.card-shadow').each(function(index, elem) {
        var cardOffset = $('.card:eq(' + index + ')').offset();
        $(elem).offset(cardOffset);
    });
}