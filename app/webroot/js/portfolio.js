// re-center on resize
$(window).resize(valignHeightAdjust);

// DOM load
$(function() {
    valignHeightAdjust();

    // profile click handler
    $('.carddd.profile').click(function() {
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
    $('.card').hover(function() {
        $(this).children('.inner-card').css('margin-top', '-' + $('.card-preview').height() + 'px');
    }, function() {
        $(this).children('.inner-card').css('margin-top', '0px');
    });
});

// set the card heights and vertically center the cards
function valignHeightAdjust() {
    // set the card heights
    var cardWidth = $('.card').width();
    $('.card').height(cardWidth);

    // set the picture heights
    $('.card-preview').height(cardWidth);

    // set the description wrapper heights
    $('.description-wrapper').height(cardWidth);

    // vertically center the cards
    var docHeight = $(document).height();
    var rowOffset = $('.row').offset().top;
    var newOffset = (.9*docHeight-rowOffset-cardWidth*2)/2;
    if (newOffset < 0)
        newOffset = 0;
    $('.row:first').css('margin-top', newOffset);

    // overlay the shadow divs
    $('.card-shadow').width(cardWidth).height(cardWidth);
    $('.card-shadow').each(function(index, elem) {
        var cardOffset = $('.card:eq(' + index + ')').offset();
        $(elem).offset(cardOffset);
    });
}