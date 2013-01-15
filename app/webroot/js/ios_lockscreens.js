$(function() {
    // make the description divs equal heights
    var sameHeight = function() {
        var $sameHeights = $('.same-height').height('');
        $sameHeights.height(Math.max($($sameHeights[0]).height(), $($sameHeights[1]).height()));
    }

    $(window).on('resize', sameHeight);
    sameHeight();
});