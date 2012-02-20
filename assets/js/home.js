// Runs after the DOM is loaded
$(function() {
    initialize_tabset();
});

function initialize_tabset() {
    $('#nav_bar>.nav_button').click(function() {
        corresponding_page = $(this).attr('page');
        
        // Only handle a click on a non-selected tab
        if (!$(this).hasClass('selected'))  {
            // Select just this tab
            $('#nav_bar .nav_button').removeClass('selected');
            $(this).addClass('selected');
           
            // Hide the visible page
            $('#page_wrapper .page:visible').hide();
            
            // Run the setup function (if applicable and safe)
            var setup_func = $(corresponding_page).attr('setup_func');
            if (setup_func != undefined && typeof eval(setup_func) == 'function') {
                eval(setup_func + '()');
            }
            
            // Show the selected page id
            $(corresponding_page).show('fast');
        }
    });
}

// Setup function for the processing page
function processing_page_setup() {
    var attributes = { 
        code: 'Sphere.class',
        archive: 'Sphere.jar,jl1.0.jar,jsminim.jar,minim-spi.jar,minim.jar,mp3spi1.9.4.jar,tritonus_aos.jar,tritonus_share.jar,core.jar',
        width: 800,
        height: 650,
        codebase: '/assets/sphere/'
    };
    var parameters = { 
        image: 'loading.gif',
        centerimage: 'true'
    };
    var version = '1.5';
    console.log(deployJava.runApplet(attributes, parameters, version));
}