// wait for images to finish
$(window).bind('load', function() {
    // clock init
    var $clock = $('.clock');
    var updateClock = function() {
        $clock.html(timeString());
    };
    updateClock();
    setInterval(updateClock, 1000);

    // switch from the loading row
    $('.loading').hide();
    $('.simulator').show();

    // scroll to top
    $clock.click(function() {
        $('.screen img').animate({
            'top': '0px'
        }, 2000);
    });

    // set the iPad screen and clock width
    var iPadWidth = $('.ipad').width();
    var screenWidth = iPadWidth*.8095;
    var screenHeight = .973*screenWidth*3/4;
    $screen = $('.screen');
    $screen.width(screenWidth).height(screenHeight);
    $clock.width(screenWidth);

    // set the touch icon (1:1 and circular)
    var $touch = $('.touch');
    $touch.css({
        height: $touch.width(),
        'border-radius': $touch.width()/2 + 'px',
        '-webkit-border-radius': $touch.width()/2 + 'px',
        '-moz-border-radius': $touch.width()/2 + 'px'
    });

    // prime the FSM (show the table of contents)
    $toc = $('.toc');
    $toc.css({
        top: '0px',
        left: '0px'
    }).show();

    // disallow image dragging
    $('.screen').on('dragstart', function(e) {
        e.preventDefault();
    })
    // mousedown
    .on('mousedown touchstart', function(e) {
        fsm.mousedown(e);
        e.stopPropagation();
    })
    // mousemove
    .on('mousemove touchmove', function(e) {
        fsm.mousemove(e);
        e.stopPropagation();
    })
    // mouseup
    .on('mouseup touchend mouseleave', function(e) {
        fsm.mouseup(e);
        e.stopPropagation();
    });
});

// an FSM object to handle all the state transitions
var fsm = {};
fsm.state = 'toc';
//fsm.lastTouch {};
//fsm.touchDistance = 0;
fsm.clickThresh = 2;

// mousedown handler
fsm.mousedown = function(e) {
    var offset = this.screenOffset(e);
    this.lastTouch = offset;
    this.touchDistance = 0;

    this.$touch.css({
        top: (offset.top - this.$touch.width()/2) + 'px',
        left: (offset.left - this.$touch.height()/2) + 'px'
    })
    .addClass('dragging')
    .show();
};

// mousedown handler
fsm.mousemove = function(e) {
    var offset = this.screenOffset(e);
    if (this.$touch.hasClass('dragging')) {
        // compute drag delta
        var deltaDrag = {
            top: offset.top-this.lastTouch.top,
            left: offset.left-this.lastTouch.left
        };

        // trigger a drag event
        this.drag(deltaDrag);

        // update the touch distance
        this.touchDistance += Math.sqrt(Math.pow(deltaDrag.top, 2) + Math.pow(deltaDrag.left, 2));
        this.lastTouch = offset;

        // move the touch icon
        this.$touch.css({
            top: (offset.top - this.$touch.width()/2) + 'px',
            left: (offset.left - this.$touch.height()/2) + 'px'
        });
    }
};

// mousedown handler
fsm.mouseup = function(e) {
    this.$touch.removeClass('dragging')
    .animate({
        opacity: 0
    }, 'fast', function() {
        $(this).hide().css('opacity', '');
    });

    // simulate a click event if necessary
    if (this.touchDistance <= this.clickThresh && e.type != 'mouseleave')
        this.click(e);
};

// drag handler
fsm.drag = function(delta) {
    // yay for FSMs!!!
    var futureTop;
    var futureBottom;
    var futureLeft;
    var recipeTop;
    var recipeLeft;
    var snapThresh = .1*this.$screen.width();

    // bypass everything if already transitioning
    if (this.$screen.hasClass('transitioning'))
        return;

    switch (this.state) {
        case 'recipe-1':
            // disallow downward over-dragging
            recipeTop = parseFloat(this.$recipe1.css('top'));
            futureTop = recipeTop + delta.top;
            if (futureTop > 0)
                delta.top -= futureTop;

            // disallow upward over-dragging
            else {
                futureBottom = recipeTop + this.$recipe1.height() - this.$screen.height() + delta.top;
                if (futureBottom < 0)
                    delta.top -= futureBottom;
            }

            // perform vertical dragging
            this.$recipe1.add(this.$recipe2).css('top', '+=' + delta.top + 'px');
            recipeTop = parseFloat(this.$recipe1.css('top'));

            // disallow rightward over-dragging
            recipeLeft = parseFloat(this.$recipe1.css('left'));
            futureLeft = recipeLeft + delta.left;
            if (futureLeft > 0)
                delta.left -= futureLeft;

            // recipe scrolled outside of snapping threshold (horizontally locked)
            if (recipeTop < -snapThresh) {

                // snap back horizontally if too far scrolled down
                if (recipeLeft < 0) {
                    this.$screen.addClass('transitioning');
                    this.$recipe1.animate({
                        left: '0px'
                    }, 'fast');
                    this.$recipe2.animate({
                        left: this.$recipe1.width()
                    }, 'fast', function() {
                        fsm.$screen.removeClass('transitioning');
                    });
                    break;
                }

                // disallow leftward over-dragging
                else if (futureLeft < 0) {
                    delta.left -= futureLeft;
                }
            }

            // recipe scrolled within snapping threshold (horizontally scrollable)
            // advance to recipe 2
            else if (recipeLeft <= -.1*this.$recipe1.width()) {
                this.$screen.addClass('transitioning');
                this.$recipe1.animate({
                    left: '-' + this.$recipe1.width() + 'px'
                }, 2000);
                this.$recipe2.animate({
                    left: '0px'
                }, 2000, function() {
                    fsm.$screen.removeClass('transitioning');
                    fsm.state = 'recipe-2';
                });
                break;
            }

            // perform horizontal dragging
            this.$recipe1.add(this.$recipe2).css('left', '+=' + delta.left + 'px');
            break;

        case 'recipe-2':
            // disallow downward over-dragging
            recipeTop = parseFloat(this.$recipe2.css('top'));
            futureTop = recipeTop + delta.top;
            if (futureTop > 0)
                delta.top -= futureTop;

            // disallow upward over-dragging
            else {
                futureBottom = recipeTop + this.$recipe2.height() - this.$screen.height() + delta.top;
                if (futureBottom < 0)
                    delta.top -= futureBottom;
            }

            // perform vertical dragging
            this.$recipe1.add(this.$recipe2).css('top', '+=' + delta.top + 'px');
            recipeTop = parseFloat(this.$recipe2.css('top'));

            // disallow rightward over-dragging
            recipeLeft = parseFloat(this.$recipe2.css('left'));
            futureLeft = recipeLeft + delta.left;
            if (futureLeft < 0)
                delta.left -= futureLeft;

            // recipe scrolled outside of snapping threshold (horizontally locked)
            if (recipeTop < -snapThresh) {

                // snap back horizontally if too far scrolled down
                if (recipeLeft > 0) {
                    this.$screen.addClass('transitioning');
                    this.$recipe1.animate({
                        left: '-' + this.$recipe1.width() + 'px'
                    }, 'fast');
                    this.$recipe2.animate({
                        left: '0px'
                    }, 'fast', function() {
                        fsm.$screen.removeClass('transitioning');
                    });
                    break;
                }

                // disallow leftward over-dragging
                else if (futureLeft > 0) {
                    delta.left -= futureLeft;
                }
            }

            // recipe scrolled within snapping threshold (horizontally scrollable)
            // revert to recipe 1
            else if (recipeLeft >= .1*this.$recipe1.width()) {
                this.$screen.addClass('transitioning');
                this.$recipe1.animate({
                    left: '0px'
                }, 2000);
                this.$recipe2.animate({
                    left: this.$recipe1.width() + 'px'
                }, 2000, function() {
                    fsm.$screen.removeClass('transitioning');
                    fsm.state = 'recipe-1';
                });
                break;
            }

            // perform horizontal dragging
            this.$recipe1.add(this.$recipe2).css('left', '+=' + delta.left + 'px');
            break;
    }
};

// handles a click on the given object with the given event
fsm.click = function (e) {
    var offset = this.screenOffset(e);

    // yay for FSMs!!!
    switch (this.state) {
        case 'toc':
            // convert to percentages
            offset.top /= this.$toc.height();
            offset.left /= this.$toc.width();

            // to fridge
            if (offset.left.between(.894, .993) && offset.top.between(.034, .175)) {
                this.$fridge.show();
                this.$toc.hide();
                this.state = 'fridge';
            }

            // to recipe 1
            else if (offset.left.between(.243, .401) && offset.top.between(.524, .71)) {
                this.$recipe1.css({
                    top: '0px',
                    left: '0px'
                }).show();
                this.$recipe2.css({
                    top: '0px',
                    left: this.$recipe1.width() + 'px'
                }).show();
                this.$toc.hide();
                this.state = 'recipe-1';
            }

            // to recipe 2
            else if (offset.left.between(.467, .658) && offset.top.between(.721, .98)) {
                this.$recipe1.css({
                    top: '0px',
                    left: '-' + this.$recipe1.width() + 'px'
                }).show();
                this.$recipe2.css({
                    top: '0px',
                    left: '0px'
                }).show();
                this.$toc.hide();
                this.state = 'recipe-2';
            }
            break;

        case 'fridge':
            // convert to percentages
            offset.top /= this.$fridge.height();
            offset.left /= this.$fridge.width();

            // to toc
            if (offset.left.between(.797, .951) && offset.top.between(.121, .19)) {
                this.$toc.show();
                this.$fridge.hide();
                this.state = 'toc';
            }

            // to recipe 1
            else if (offset.left.between(.172, .419) && offset.top.between(.231, .558)) {
                this.$recipe1.css({
                    top: '0px',
                    left: '0px'
                }).show();
                this.$recipe2.css({
                    top: '0px',
                    left: this.$recipe1.width() + 'px'
                }).show();
                this.$fridge.hide();
                this.state = 'recipe-1';
            }
            break;

        case 'recipe-1':
            // account for scrolling
            offset.top += -parseFloat(this.$recipe1.css('top'));
            offset.left += -parseFloat(this.$recipe1.css('left'));

            // convert to percentages
            offset.top /= this.$recipe1.height();
            offset.left /= this.$recipe1.width();

            // to toc
            if (offset.left.between(.01392, .34127) && offset.top.between(.98436, .99372)) {
                this.$toc.show();
                this.$recipe1.hide();
                this.state = 'toc';
            }

            // stick to fridge
            else if (offset.left.between(.35817, .67179) && offset.top.between(.98436, .99397)) {
                alert("This is just a demo, so adding items to the fridge isn't supported. Thanks for actually clicking on it, though :)");
            }

            // share your story
            else if (offset.left.between(.6908, .98541) && offset.top.between(.98485, .99446)) {
                alert("This is just a demo, so this feature isn't supported. Thanks for actually clicking on it, though :)");
            }
            break;

        case 'recipe-2':
            // account for scrolling
            offset.top += -parseFloat(this.$recipe2.css('top'));
            offset.left += -parseFloat(this.$recipe2.css('left'));

            // convert to percentages
            offset.top /= this.$recipe2.height();
            offset.left /= this.$recipe2.width();

            // to toc
            if (offset.left.between(.01498, .38245) && offset.top.between(.97413, .99037)) {
                this.$toc.show();
                this.$recipe2.hide();
                this.state = 'toc';
            }

            // to fridge
            else if (offset.left.between(.39618, .60526) && offset.top.between(.97379, .98902)) {
                this.$fridge.show();
                this.$recipe2.hide();
                this.state = 'fridge';
            }

            // share your story
            else if (offset.left.between(.61793, .98858) && offset.top.between(.97413, .99003)) {
                alert("This is just a demo, so this feature isn't supported. Thanks for actually clicking on it, though :)");
            }
            break;
    }
}

// returns the offset from the top left corner of the iPad screen
fsm.screenOffset = function(e) {
    var offset = this.$screen.offset();
    return {
        top: e.pageY - offset.top,
        left: e.pageX - offset.left
    };
}

// on DOM load
$(function() {
    // fsm DOM-dependent vars
    fsm.$screen = $('.screen');
    fsm.$toc = $('.toc');
    fsm.$recipe1 = $('.recipe-1');
    fsm.$recipe2 = $('.recipe-2');
    fsm.$fridge = $('.fridge');
    fsm.$touch = $('.touch');

    // loading animation
    var loadingAnimation = setInterval(function() {
        var $alert = $('.loading .alert');

        // cycle periods
        if ($alert.is(':visible')) {
            var text = $alert.html().trim();
            var first = text.indexOf('.', text.length-3);

            if (first == -1)
                text += '.';
            switch (text.length - first) {
                case 3:
                    text = text.substr(0, text.length-3);
                    break;

                case 2:
                case 1:
                    text += '.';
                    break;
            }
            $alert.html(text);
        }

        // done
        else
            clearInterval(loadingAnimation);
    }, 500);

    // make the instruction and description divs equal heights
    var $sameHeights = $('.same-height');
    $sameHeights.height(Math.max($($sameHeights[0]).height(), $($sameHeights[1]).height()));
});

// returns an iDevice-style time string
function timeString() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    if (minutes < 10)
        minutes = '0' + minutes;
    var amPm;
    if (hours > 12) {
        amPm = 'PM';
        hours -= 12;
    } else
        amPm = 'AM';

    if (hours == 0)
        hours = 12;

    return hours + ':' + minutes + ' ' + amPm;
}

// shorthand comparator
Number.prototype.between = function(lower, upper) {
    return this.valueOf() > lower && this.valueOf() < upper;
}