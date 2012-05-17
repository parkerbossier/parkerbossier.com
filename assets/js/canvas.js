// Runs after the DOM is loaded
$(function() {
    // prevent elastic scrolling
    $('body').bind('touchmove', function(event){
        console.log(event);
        event.preventDefault();
    });
    
    $('#canvas').bind('touchstart', function(event) {
        draw_dot(event, 10);
    });
    $('#canvas').bind('click', function(event) {
        draw_dot(event, 10);
    });
});

function draw_dot(click_event, width, height) {
    
    if (height == undefined) {
        height = width;
    }
    
    $('#canvas').drawEllipse({
        fillStyle: '#000',
        x: 0,
        y: 0,
        width: click_event.offsetX,
        height: click_event.offsetY
    });
    
    console.log(click_event.offsetX + ', ' + click_event.offsetY);
}