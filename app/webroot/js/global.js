$(function() {
    // set a cookie when the alert is dismissed
    $('.ie-alert-row .alert').bind('closed', function() {
        setCookie('ie-alert-closed', 'true', 2);
    });

    // close the alert if the cookie is present
    if (readCookie('ie-alert-closed') == 'true') {
        $('.ie-alert-row .alert').alert();
        $('.ie-alert-row .alert').alert('close');
    }

});

function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    document.cookie = name + "=" + value + (expires || '') + "; path=/";
}

function readCookie(name) {
    var cookies = document.cookie.split(';');

    // each cookie
    for (index in cookies) {
        var cookie = cookies[index];
        cookie = cookie.trim();
        var firstEquals = cookie.indexOf('=');
        var cookieName = cookie.substr(0, firstEquals);

        // found
        if (cookieName == name)
            return cookie.substr(firstEquals + 1);
    }
    return undefined;
}