// re-center on resize
$(window).resize(valignHeightAdjust);

// DOM load
$(function() {
    valignHeightAdjust();

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
    
    // space the rows
    var marginLeft = parseFloat($('.card:first').css('margin-left'));
    $('.card').css('margin-bottom', marginLeft || '');
    
    // vertically center the cards
    var $firstRow = $('.row:first')
    var $lastRow = $('.row:last');
    var firstRowOffset = ($(window).height() - $lastRow.offset().top - $lastRow.height())/2;
    if (firstRowOffset > 0)
        $firstRow.css('margin-top', firstRowOffset);

    // overlay the shadow divs
    $('.card-shadow').width(cardWidth).height(cardWidth);
    $('.card-shadow').each(function(index, elem) {
        var cardOffset = $('.card:eq(' + index + ')').offset();
        $(elem).offset(cardOffset);
    });
}