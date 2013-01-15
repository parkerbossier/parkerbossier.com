$(function() {
    // make the description divs equal heights
    var $sameHeights = $('.same-height');
    $sameHeights.height(Math.max($($sameHeights[0]).height(), $($sameHeights[1]).height()));
});