$(function() {
    valign_height_adjust();

    // calculate the offset (click) for the profile card before the user can touch it
    var relativeAboutOffset = $('.card.profile').offset().top - $('.card.profile .about-header').offset().top;

    // profile click handler
    $('.card.profile .inner-card').click(function() {
        var self = $(this);
        if (self.hasClass('clicked')) {
            self.removeClass('clicked');
            self.css('margin-top', '');
        } else {
            self.addClass('clicked');
            self.css('margin-top', relativeAboutOffset + 'px');
        }
    });

    // position the card headers above the inner-cards
    var innerCards = $('.card .inner-card');
    $('.card-header').css('top', '-' + $('.card-header').height() + 'px');

    // show the card headers when hovered
    innerCards.hover(function() {
        var self = $(this);
        if (!self.hasClass('clicked'))
            self.css('margin-top', $('.card-header').height() + 'px');
    }, function() {
        var self = $(this);
        if (!self.hasClass('clicked'))
            self.css('margin-top', '0px');
    });

    // handle card clicks
    innerCards.click(function() {
        var self = $(this);
        if (self.data('href'))
            window.location.href = self.data('href');
    });
});

function valign_height_adjust() {
    // set the card heights
    var cardWidth = $('.card').width();
    $('.card').height(cardWidth);

    // set the profile picture height
    $('.card img').height(cardWidth);

    // vertically center the cards
    var docHeight = $(document).height();
    var rowOffset = $('.row.main').offset().top;
    $('.card').css('margin-top', (.9*docHeight-rowOffset-cardWidth)/2);
}