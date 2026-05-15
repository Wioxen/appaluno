function videoclick() {
    aguarda();


    $('#content').empty();
    $('#content').append('<div class="row">' +
        '<div class="col-md-12">' +
        '<ul class="timeline">' +

        '</ul>' +
        '</div>' +
        '</div>');

    if ($(".fotoAtual").attr("data-escola") == '14') {
        $('.timeline').append('<li class="time-label" style="visibility:hidden">' +
            '<span class="bg-red">' +
            '10 Feb. 2014' +
            '</span>' +
            '</li>' +
            '<li> ' +
            '<i class="fa fa-envelope bg-blue"  style="visibility:hidden"></i> ' +
            '<div class="timeline-item"> ' +
            '<h3 class="timeline-header" > <a href="#">Video Sonhos</a></h3> ' +
            '<div class="timeline-body">' +
            '<div class="embed-responsive embed-responsive-16by9">' +
            '<a href="http://www.sistema2.com.br/appaluno/url.ashx?codEscola=14&url=http://escolatempodecrianca.com.br/video-portfolio-1-semestre-2019-5c-adna.mp4"><img class="card-img-top img-fluid img-responsive" src="http://www.digite.com.br/cliente/xxx.jpg" /></a>'+
            '</div>' +
            '</div>' +
            '<div class="timeline-footer"> ' +
            '</div> ' +
            '</div> ' +
            '</li>');
    }
    //'<iframe src="https://player.vimeo.com/video/339121596" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>' +
    $('.ytp-title-channel-logo').hide();
    $('body').loadingModal('destroy');
}