// re-center on resize
$(window).resize(valignHeightAdjust);

// DOM load
$(function() {
    valignHeightAdjust();

    // offset the card headers
    $('.card:not(.profile) .card-header').each(function() {
        var $this = $(this);
        $this.css('top', '-' + $this.height() + 'px');
    });

    // detect mobile browser (don't unpeek if mobile becasue of lack of hover)
    var mobile = /android|webos|iphone|ipad|itouch|blackberry|iemobile/i.test(navigator.userAgent);

    // peek the cards
    setTimeout(function() {
        // profile card
        $('.card.profile .inner-card').each(function() {
            var $this = $(this);
            var $cardHeader = $this.children('.card-header');
            $this.css('margin-top', '-' + $cardHeader.outerHeight() + 'px');
        });

        // other cards
        $('.card:not(.profile) .inner-card').each(function() {
            var $this = $(this);
            $this.css('margin-top', $this.children('.card-header').height() + 'px');
        });

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
                    else {
                        $this.css('margin-top', '0px');

                        // fucking IE
                        if ($('.ie-alert-row').length)
                            $this.addClass('peeked');
                    }
                });
            }, 3500);
        }
    }, 750);

    // show the card headers when hovered
    $('.card:not(.profile)').hover(function() {
        var $this = $(this);
        var $innerCard = $this.find('.inner-card');
        if ($innerCard.hasClass('peeked'))
            $innerCard.css('margin-top', $innerCard.children('.card-header').height() + 'px');
    }, function() {
        var $this = $(this);
        var $innerCard = $this.find('.inner-card');
        if ($innerCard.hasClass('peeked'))
            $innerCard.css('margin-top', '0px');
    });

    // special case for profile
    $('.card.profile').hover(function() {
        var $this = $(this);
        var $innerCard = $this.find('.inner-card');
        if ($innerCard.hasClass('peeked')) {
            var $cardHeader = $innerCard.find('.card-header');
            var offset = -($cardHeader.offset().top - $innerCard.offset().top);
            $innerCard.css('margin-top', offset + 'px');
        }
    }, function() {
        var $this = $(this);
        var $innerCard = $this.find('.inner-card');
        if ($innerCard.hasClass('peeked'))
            $innerCard.css('margin-top', '0px');
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
    var $cardRow = $('.card-row');
    var cardRowOffset = ($(window).height() - $cardRow.offset().top - $cardRow.height())/2;
    if (cardRowOffset > 0)
        $('.card-row').css('margin-top', cardRowOffset);

    // overlay the shadow divs
    $('.card-shadow').width(cardWidth).height(cardWidth);
    $('.card-shadow').each(function(index, elem) {
        var cardOffset = $('.card:eq(' + index + ')').offset();
        $(elem).offset(cardOffset);
    });
}