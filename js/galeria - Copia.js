function galeriaClick() {
    $.getJSON('http://www.sistema2.com.br/WebApiSae/api/apiKey/' + $(".fotoAtual").attr("data-escola") + '', function (data) {

        var access_token = data["0"].TokenInstagram;

        jQuery.ajax({
            type: "GET",
            dataType: "jsonp",
            beforeSend: aguarda,
            error: exibeErro,
            url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + access_token + "",
            success: exibeProfile
        });
    })
}


function exibeProfile(data) {


    var obj = data.data;
    var meta = data.meta;
    var imagem = "";

    var vscript = '<div class="row box-body">' +
        '<div class="col-md-6">' +
        '<div class="box box-solid">' +
        '<div class="box-body">';

    var caption = "";

    var indicator = '<ol class="carousel-indicators"></ol>';

    if (obj != "") {
        if (meta.code == 200) {
            $.each(obj, function (index, value) {
                id = value.id;
                created_time = value.created_time;
                date = new Date(parseInt(created_time) * 1000);
                imagem = value.images.standard_resolution.url;
                user = value.user.profile_picture;
                fullname = value.user.full_name;
                username = value.user.username;
                likes = value.likes.count;
                caption = (value.caption == null) ? "" : value.caption.text;
                comments = value.comments.count;
                tags = value.tags;
                link = value.link;
                type = value.type
                carouselMedia = [id, value.carousel_media];

                var mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                publicadoEm = date.getDate() + " de " + mes[date.getMonth()] + " de " + date.getFullYear() + " às " + date.getHours() + "h" + ((date.getMinutes() < 10) ? "0" + date.getMinutes() + "min" : date.getMinutes() + "min");

                switch (type) {
                    case 'video':
                        vscript = vscript + '<div class="box box-widget">' +
                            '<div class="box-header with-border">' +
                            '<div class="user-block">' +
                            '<img class="img-circle" src="' + user + '" alt="User Image">' +
                            '<span class="username"><a href="#">' + fullname + ' </a></span>' +
                            '<small class="description"">@' + username + '</small>' +
                            '<span class="description">' + publicadoEm + '</span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="box-body">' +
                            '<iframe class="embed-responsive-item img-responsive" src= "' + value.videos.standard_resolution.url + '" allowfullscreen></iframe>' +
                            '<p>' + caption + '</p>' +
                            '<div>' +
                            '<a></a>' +
                            '</div>' +
                            '<span class="pull-right badge bg-green">' + likes + ' likes ' + ((comments == 0) ? " " : ' - ' + comments + ' comentários') + '</span>' +
                            '</div>' +
                            '</div>';
                        break;
                    case 'carousel':
                        var last = carouselMedia[1].length;
                        $.each(carouselMedia[1], function (index, value) {
                            if (index == 0) {
                                vscript = vscript + '<div class="box-header with-border">' +
                                    '<div class="user-block">' +
                                    '<img class="img-circle" src="' + user + '" alt="User Image">' +
                                    '<span class="username"><a href="#">' + fullname + ' </a></span>' +
                                    '<span class="description">@' + username + '</span>' +
                                    '<span class="description">' + publicadoEm + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="timeline-body">' +
                                    '<div class="carousel slide" data-ride="carousel">' +
                                    '<ol class="carousel-indicators">' +
                                    '</ol>' +
                                    '<div class="carousel-inner">' +
                                    '<div class="item active">' +
                                    '<img class="img-responsive pad" src="' + value.images.standard_resolution.url + '" alt="..." class="margin">' +
                                    '</div>';
                            } else {
                                vscript = vscript + '<div class="item">' +
                                    '<img class="img-responsive pad" src="' + value.images.standard_resolution.url + '" alt="..." class="margin">' +
                                    '</div>';

                            }
                            if (index == last - 1) {
                                vscript = vscript + '<p>' + caption + '</p>' +
                                    '<span class="label pull-right bg-green">' + likes + ' likes ' + ((comments == 0) ? " " : ' - ' + comments + ' comentários') + '</span><br><hr>';
                            }
                        });
                        vscript = vscript + '</div>';

                        vscript = vscript + '<a class="left carousel-control" href="#carousel-example-generic'+index+'" data-slide="prev">' +
                            '<span class="fa fa-angle-left"></span>' +
                            '</a>' +
                            '<a class="right carousel-control" data-slide="next">' +
                            '<span class="fa fa-angle-right"></span>' +
                            '</a>' +
                            '</div>' +
                            '</div ></div>';

                        $("#content").empty();
                        $("#content").html(vscript);
                        var lixo = "";
                        $.each(carouselMedia[1], function (index, value) {
                            if (lixo != index) {
                                if (index == 0) {
                                    $(".carousel-indicators").append('<li data-target="#carousel-example-generic1" data-slide-to="' + index + '" class="active"></li>');
                                } else {
                                    $(".carousel-indicators").append('<li data-target="#carousel-example-generic1" data-slide-to="' + index + '" class=""></li>');
                                }
                            }
                            lixo = index;
                        });

                        $('.carousel').each(function (index, value) {
                            $(this).attr('id', 'carousel-example-generic' + index);
                        });
                        break;
                    default:
                        vscript = vscript + '<div class="box box-widget">' +
                            '<div class="box-header with-border">' +
                            '<div class="user-block">' +
                            '<img class="img-circle" src="' + user + '" alt="User Image">' +
                            '<span class="username"><a href="#">' + fullname + ' </a></span>' +
                            '<span class="description">@' + username + '</span>' +
                            '<span class="description">' + publicadoEm + '</span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="box-body">' +
                            '<a id="single_1" data-fancybox="gallery' + index + '" class="fancybox" href="' + $.trim(imagem) + '"><img class="img-responsive pad" src=' + imagem + ' alt=' + link + '></a>' +
                            '<p>' + caption + '</p>' +
                            '<div>' +
                            '<a></a>' +
                            '</div>' +
                            '<span class="pull-right badge bg-green">' + likes + ' likes ' + ((comments == 0) ? " " : ' - ' + comments + ' comentários') + '</span>' +
                            '</div>' +
                            '</div>';
                }
            });
        } else {
            vscript = vscript + "<div class='well'><img src='./images/none1.jpg' class='img-responsive'/></div>";
        }
    } else {
        vscript = vscript + "<div class='well'><img src='./images/none.jpg' class='img-responsive'/></div>";
    }





    $('body').loadingModal('destroy');
}