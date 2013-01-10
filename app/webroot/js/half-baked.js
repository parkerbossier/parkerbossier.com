// wait for images to finish
$(window).bind('load', function() {
    // clock init
    var $clock = $('.clock');
    var updateClock = function() {
        $clock.html(timeString());
    };
    updateClock();
    setInterval(updateClock, 1000);
    
    // scroll to top
    $clock.click(function() {
        $('.screen img').animate({
            'top': '0px'
        }, 2000); 
    });

    // set the iPad screen and clock width
    var iPadWidth = $('.ipad').width();
    var screenWidth = iPadWidth*.8095;
    $screen = $('.screen');
    $screen.width(screenWidth).height(.973*screenWidth*3/4);
    $clock.width(screenWidth)
    
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
    })
    // mousemove
    .on('mousemove touchmove', function(e) {
        fsm.mousemove(e);
    })
    // mouseup
    .on('mouseup touchend mouseleave', function(e) {
        fsm.mouseup(e);
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
            // disallow top over-dragging
            recipeTop = parseFloat(this.$recipe1.css('top'));
            futureTop = recipeTop + delta.top;
            if (futureTop > 0)
                delta.top -= futureTop;
            
            // disallow bottom over-dragging
            futureBottom = recipeTop + this.$recipe1.height() - this.$screen.height() + delta.top;
            if (futureBottom < 0)
                delta.top -= futureBottom;
            this.$recipe1.add(this.$recipe2).css('top', '+=' + delta.top + 'px');
            
            // snap back horizontally if too far scrolled down
            recipeTop = parseFloat(this.$recipe1.css('top'));
            recipeLeft = parseFloat(this.$recipe1.css('left'));
            if (recipeLeft < 0 && recipeTop <= -snapThresh) {
                this.$screen.addClass('transitioning');
                this.$recipe1.animate({
                    left: '0px'
                }, 'fast');
                this.$recipe2.animate({
                    left: this.$recipe1.width()
                }, 'fast', function() {
                    fsm.$screen.removeClass('transitioning');
                });
            }
            
            // advance to recipe 2
            else {
                futureLeft = recipeLeft + delta.left;
                if (futureLeft <= -.1*this.$recipe1.width()) {
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
                }
                
                // allow horizontal dragging; disallow over-dragging 
                else {
                    if (futureLeft > 0)
                        delta.left -= futureLeft;
                    if (recipeTop > -snapThresh)
                        this.$recipe1.add(this.$recipe2).css('left', '+=' + delta.left + 'px');
                }
            }
            break;
                
        case 'recipe-2':
            // disallow top over-dragging
            recipeTop = parseFloat(this.$recipe2.css('top'));
            futureTop = recipeTop + delta.top;
            if (futureTop > 0)
                delta.top = delta.top - futureTop;
            
            // disallow bottom over-dragging
            futureBottom = recipeTop + this.$recipe2.height() - this.$screen.height() + delta.top;
            if (futureBottom < 0)
                delta.top = delta.top - futureBottom;
            this.$recipe1.add(this.$recipe2).css('top', '+=' + delta.top + 'px');
            
            // snap back horizontally if too far scrolled down
            recipeTop = parseFloat(this.$recipe2.css('top'));
            recipeLeft = parseFloat(this.$recipe2.css('left'));
            if (recipeLeft > 0 && recipeTop <= -.1*this.$recipe2.width()) {
                this.$screen.addClass('transitioning');
                this.$recipe1.animate({
                    left: '-' + this.$recipe1.width() + 'px'
                }, 'fast');
                this.$recipe2.animate({
                    left: '0px'
                }, 'fast', function() {
                    fsm.$screen.removeClass('transitioning');
                });
            }
            
            // back to recipe 1
            else {
                futureLeft = recipeLeft + delta.left;
                if (futureLeft >= .1*this.$recipe2.width()) {
                    this.$screen.addClass('transitioning');
                    this.$recipe1.animate({
                        left: '0px'
                    }, 2000);
                    this.$recipe2.animate({
                        left: this.$recipe1.width()
                    }, 2000, function() {
                        fsm.$screen.removeClass('transitioning');
                        fsm.state = 'recipe-1';
                    });
                }
                
                // allow horizontal dragging; disallow over-dragging 
                else {
                    if (futureLeft < 0)
                        delta.left -= futureLeft;
                    if (recipeTop > -snapThresh)
                        this.$recipe1.add(this.$recipe2).css('left', '+=' + delta.left + 'px');
                }
            }
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
            
            // to fridge
            else if (offset.left.between(.35817, .67179) && offset.top.between(.98436, .99397)) {
                this.$fridge.show();
                this.$recipe1.hide();
                this.state = 'fridge';
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
            
            console.log(offset);
            offset = {
                top: 0, 
                left: 0
            };
            
            // to toc
            if (offset.left.between(.01498, .38245) && offset.top.between(.97413, .99037)) {
                this.$toc.show();
                this.$recipe1.hide();
                this.state = 'toc';
            }
            
            // to fridge
            else if (offset.left.between(.39618, .60526) && offset.top.between(.97379, .98902)) {
                this.$fridge.show();
                this.$recipe1.hide();
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