// wait for images to finish
$(window).bind('load', function() {
    var updateClock = function() {
        $('.clock').html(timeString());
    }();
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
    .on('mousedown', function(e) {
        fsm.mousedown(e);
    })
    // mousemove
    .on('mousemove', function(e) {
        fsm.mousemove(e);
    })
    // mouseup
    .on('mouseup', function(e) {
        fsm.mouseup(e);
    })
    // mouseup
    .on('click', function(e) {
        fsm.click(e);
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
    
    // mousedown handler
    fsm.mousedown = function(e) {
        var offset = this.screenOffset(e);
        this.$touch.css({
            top: (offset.top - this.$touch.width()/2) + 'px',
            left: (offset.left - this.$touch.height()/2) + 'px'
        }).show();
    };
    
    // mousedown handler
    fsm.mousemove = function(e) {
        var offset = this.screenOffset(e);
        this.$touch.css({
            top: (offset.top - this.$touch.width()/2) + 'px',
            left: (offset.left - this.$touch.height()/2) + 'px'
        });
    };
    
    // mousedown handler
    fsm.mouseup = function(e) {
        this.$touch.animate({opacity: 0}, 'fast', function() {
           $(this).hide().css('opacity', '');
        });
    };

    // handles a click on the given object with the given event
    fsm.click = function ($this, e) {
        // convert to percentage values
        x = x/$this.width();
        y = y/$this.height();

        // yay for FSMs!!!
        switch (this.state) {
            // table of contents
            case 'toc':
                // to fridge
                if (x.between(.894, .993) && y.between(.034, .175)) {
                    // hide and show
                    $this.hide();
                    $('.fridge').show();

                    // state
                    this.state = 'fridge';
                }
                // to recipe 1
                else if (x.between(.243, .401) && y.between(.524, .71)) {
                    this.recipe1init(e);
                }

                // to recipe 2
                else if (x.between(.467, .658) && y.between(.721, .98)) {
                    console.log('recipe 2!!');
                }
                break;

            // fridge
            case 'fridge':
                // to toc
                if (x.between(.797, .951) && y.between(.121, .19)) {
                    $this.hide();
                    $('.toc').show();
                    this.state = 'toc';
                }
                // to recipe 1
                else if (x.between(.172, .419) && y.between(.231, .558)) {
                    console.log('recipe 1!!');
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