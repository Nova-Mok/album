function getLoadingElement() {
    const loader = '<div class="loader">' +
'<svg class="circular" viewBox="25 25 50 50">' +
  '<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterLimit="10" />' +
'</svg>' +
'</div>';
    return loader;
}


if ($('.loading-screen').length > 0) {
    $('.loading-screen').html(getLoadingElement());

    $(document).ready(() => {
        setTimeout(() => {
            $('body.animate').addClass('zoom');
            $('.loading-screen').animate({
                top: '-100%'
            }, 1000);
        }, 500);
    });
}