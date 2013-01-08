// wait for images to finish
$(window).bind('load', function() {
    var updateClock = function() {
        $('.clock').html(timeString());
    };
    updateClock();
    setInterval(updateClock, 1000);

    // set the iPad screen width
    var iPadWidth = $('.ipad').width();
    var pageWidth = iPadWidth*.8095;
    $screen = $('.screen');
    $screen.width(pageWidth).height(.973*pageWidth*3/4);
    
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
$(function() {
    // fsm vars
    fsm.state = 'toc';
    fsm.$screen = $('.screen');
    fsm.$toc = $('.toc');
    fsm.$recipe1 = $('.recipe-1');
    fsm.$recipe2 = $('.recipe-2');
    fsm.$fridge = $('.fridge');
    fsm.$touch = $('.touch');
    //fsm.lastTouch {};
    //fsm.touchDistance = 0;
    fsm.clickThresh = 3;
    
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
            // update the touch distance
            this.touchDistance += Math.sqrt(Math.pow(offset.top-this.lastTouch.top, 2) + Math.pow(offset.left-this.lastTouch.left, 2));
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
        if (this.touchDistance <= this.clickThresh)
            this.click(e);
    };

    // handles a click on the given object with the given event
    fsm.click = function (e) {
        var offset = this.screenOffset(e);
        
        // add the scroll offset
        offset.top += this.$screen.get(0).scrollTop;

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

            // fridge
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

            // recipe 1 (see no speak no cookies)
            case 'recipe-1':
                // click handlers

                break;

            // recipe 2 (hot, sweet, and sticky)
            case 'recipe-2':
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
});

// returns an iDevice-style time string
function timeString() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
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