$(document).ready(function(){
    $('body').append('<a id="toTop" class="btn btn-primary btn-sm" href="#" title="Go to Top Page"><i class="fa fa-arrow-up"></i></a>');
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop, #search-top').fadeIn();
        } else {
            $('#toTop, #search-top').fadeOut();
        }
    });
    $('#toTop, #search-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});
setTimeout(function() { window.location=window.location;},10400000);
