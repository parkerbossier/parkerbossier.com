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

    // handle inner-links (overlay a real link on top
    $('span.inner-link').parent().parent().parent().click(function(e) {
        if ($('span.inner-link').is(':hover'))
            e.preventDefault();
    });
    $('span.inner-link').click(function(e) {
        e.preventDefault();
    });
    $('span.inner-link').each(function() {
        var $this = $(this);
        var $div = $('<span class="link-hack"><a href="' + $this.data('href') + '" target="_blank">' + $this.html() + '</a></span>');
        var $innerCard = $this.parents('.inner-card');
        $innerCard.append($div);
        $innerCard.children('.link-hack').offset($this.offset()).css('top', '+=1px');
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

    // vertically align the descriptions
    $('.description-wrapper').each(function() {
        var $descWrapper = $(this);
        var $description = $descWrapper.children('.description');
        var freeSpace = $descWrapper.height() - $descWrapper.children(':first').height() - $descWrapper.children(':first').children(':eq(1)').height()*2 - $description.outerHeight();
        if (freeSpace > 0) {
            $description.css('margin-top', freeSpace/2);
        }
    });

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