// Runs after the DOM is loaded
$(function() {
    initialize_tabset();
});

function initialize_tabset() {
    $('#nav_bar .nav_button').click(function() {
        // Only handle a click on a non-selected tab
        corresponding_page = $(this).attr('page');
        if (!$(this).hasClass('selected'))  {
            // Select just this tab
            $(this).siblings('.nav_button').removeClass('selected');
            $(this).addClass('selected');
           
            // Hide the visible page
            $('#page_wrapper .page:visible').hide();
            
            // Show the selected page
            $(corresponding_page).show('fast');
        }
    });
}