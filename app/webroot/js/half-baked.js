// wait for images to finish
$(window).bind('load', function() {
    $('.clock').html(timeString());
    setInterval(function() {
        $('.clock').html(timeString());
    }, 1000);

    // set the iPad screen width
    var iPadWidth = $('.ipad').width();
    var pageWidth = iPadWidth*.8095;
    $screen = $('.screen');
    $screen.width(pageWidth).height(.973*pageWidth*3/4);

    // prime the FSM (show the table of contents)
    $screen.css('overflow', 'hidden');
    $toc = $('.toc');
    $toc.show();

    // pass the clicks through to the FSM
    $('.screen img').click(function(e) {
        fsm.handleClick($(this), e);
    });
});

// an FSM object to handle all the state transitions
var fsm = {
    state: 'toc',

    // handles a click on the given object with the given event
    handleClick: function ($this, e) {
        // convert to percentage values
        var x = e.offsetX/$this.width();
        var y = e.offsetY/$this.height();

        // yay for FSMs!!!
        switch (this.state) {
            // table of contents
            case 'toc':
                // to fridge
                if (x.between(.894, .993) && y.between(.034, .175)) {
                    $this.hide();
                    $('.fridge').show();
                    this.state = 'fridge';
                }
                // to recipe 1
                else if (x.between(.243, .401) && y.between(.524, .71)) {
                    // hide and show to begin
                    $('.screen img').hide();
                    var $recipe1 = $('.recipe-1')
                    .css({
                        top: '0px',
                        left: '0px'
                    }).show();
                    var $recipe2pre = $('.recipe-2-preview')
                    .css({
                        top: '0px',
                        left: $recipe1.width() + 'px'
                    }).show();
                    var $recipe2 = $('.recipe-2')
                    .css({
                        top: '0px',
                        left: $recipe1.width() + 'px'
                    });

                    $('.screen').scroll(function(e) {
                        if ($recipe2pre.is(':visible')) {
                            // proceed to recipe 2
                            if (!$recipe2pre.hasClass('transitioning') && ($recipe2pre.width() - e.currentTarget.scrollLeft) < 2) {
                                e.currentTarget.scrollTop = 0;
                                var scrollLeft = e.currentTarget.scrollLeft;
                                $(this).css({
                                    'overflow-x': 'hidden',
                                    'overflow-y': 'hidden'
                                });
                                $recipe2.show();
                                $recipe1.animate({
                                    left: '-' + ($recipe1.width()-scrollLeft) + 'px'
                                }, 2000, function() {
                                    this.state = 'recipe-2';
                                });
                                $recipe2.animate({
                                    left: scrollLeft + 'px'
                                }, 2000);
                            }

                            // hide the preview when scrolled too far down
                            else if (e.currentTarget.scrollTop >= $('.screen').height() / 10) {
                                $recipe2pre.addClass('transitioning')
                                .animate({
                                    width: '0px'
                                }, 'fast', function() {
                                    $recipe2pre.hide().css('width', '').removeClass('transitioning');
                                });
                            }
                        }

                        // show the preview when scrolled high enough
                        else if (e.currentTarget.scrollTop < $('.screen').height() / 10) {
                            $recipe2pre.css({
                                top: '0px',
                                left: $recipe1.width() + 'px'
                            }).show();
                        }

                    });

                    this.state = 'recipe-1';
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
}

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