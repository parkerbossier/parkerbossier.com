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

    // position the card headers above the inner-cards
    $('.card-header').css('top', '-' + $('.card-header').height() + 'px');

    // show the card headers when hovered
    $('.card .inner-card').hover(function() {
        var self = $(this);
        if (!self.hasClass('clicked'))
            self.css('margin-top', $('.card-header').height() + 'px');
    }, function() {
        var self = $(this);
        if (!self.hasClass('clicked'))
            self.css('margin-top', '0px');
    });
});

// set the card heights and vertically center the cards
function valignHeightAdjust() {
    // set the card heights
    var cardWidth = $('.card').width();
    $('.card').height(cardWidth);

    // set the picture heights
    $('.card img.preview').height(cardWidth);

    // vertically center the cards
    var docHeight = $(document).height();
    var rowOffset = $('.row.main').offset().top;
    $('.card').css('margin-top', (.9*docHeight-rowOffset-cardWidth)/2);

    // overlay the shadow divs
    $('.card-shadow').width(cardWidth).height(cardWidth);
    $('.card-shadow').each(function(index, elem) {
        var cardOffset = $('.card:eq(' + index + ')').offset();
        $(elem).offset(cardOffset);
    });
}