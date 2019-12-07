$(document).ready(function () {
    var c, currentScrollTop = 0,
        navbar = $('nav.navbar');
    $(window).scroll(function () {
        var a = $(window).scrollTop();
        var b = navbar.height();
        currentScrollTop = a;
        if (c < currentScrollTop && a > b + b) {
            navbar.addClass("scrollUp");
            if ($('div.navbar-collapse').hasClass('show'))
                $('div.navbar-collapse').removeClass('show');
            if (!$('buttom.navbar-toggler').hasClass('collapsed'))
                $('buttom.navbar-toggler').addClass('collapsed');
        } else if (c > currentScrollTop && !(a <= b)) {
            navbar.removeClass("scrollUp");
        }
        c = currentScrollTop;
    });
});