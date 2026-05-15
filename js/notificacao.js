var $pagina_not = 1;

$('#aTeste').off('click').on('click', function (e) {
    e.preventDefault();
    $(".notificacao").trigger('click');
});

function carreganot() {
    var $data = { 'Escola': $("#codEscola").val(), 'uniqueID': $("#uniqueID").val(), 'pagina': $pagina_not };
    console.log($data);

    $.ajax({
        type: "POST",
        "headers": {
            "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f"
        },
        dataType: "json",
        url: "https://www.api.sistema2.com.br/webapisae/api/CarregaNotificacao",
        data: $data,
        beforeSend: aguarda,
        error: function () {
            $('#exampleModal1').modal('hide');

            $.toast({
                text: "Nenhum registro foi encontrado",
                hideAfter: 3000,
                position: 'top-center',
                showHideTransition: 'fade'
            });
        },
        success: function (data) {
            console.log(data);

            if (data.indicadorContinuidade) {
                $pagina_not = $pagina_not + 1;
            }
            else {
                $('.modal-footer2').hide();
                $('.modal-body2').css('height', 'calc(100% - 70px)');
            }

            var $data1 = '';
            $.each(data.data, function (index, value) {
                var $aluno = $alunos[$alunos.findIndex(obj => obj.Codigo === value.Codigo.toString())];

                var $data = value.Data.substr(0, 10);

                if ($data1 !== $data) {
                    $(".modal-body2 > ul").append('<li class="time-label" style="padding-top: 0px;padding: 0px;"><span class="bg-' + $('#cor').val() + '"><i class="fa fa-calendar" style="margin-right: 10px;"></i> ' + zMesExt(value.Data.substr(0, 10)) + '</li>');
                }

                $(".modal-body2 > ul").append('<li><div class="col-sm-2 col-xs-2" style="padding: 0px;"><img class="img-circle fotonot" style="border: 3px solid; width: 55px; height: 55px;" src="' + $aluno.Foto + '"/></div><div class="col-sm-10 col-xs-10" style="padding-right: 0px;padding-left: 5px;"></div></li>');

                $('.col-sm-10').last().html('<div class="x" style="background-color: #fff;border: 0px solid transparent;border-radius: 4px;"></div>');

                $('.x').last().html(
                    '<div class="panel panel-default" style="margin-bottom: 5px;">' +
                    '<div class="panel-heading">' +
                    '<div class="row">' +
                    '<div class="col-sm-10 col-xs-10"><strong>' + value.Titulo.toUpperCase() + '</strong></div>' +
                    '<div class="col-sm-2 col-xs-2" style="padding-right: 5px;padding-left: 0px;"><i class="fa fa-commenting fa-2x" style="float: right;"></i></div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="panel-body-' + value.Id + '" class="panel-body">' +
                    '<p style="text-align: justify;text-justify:inter-word;">' + value.Texto + '</p>' +
                    (($.trim(value.Relator) === "") ? '' : '<p style="text-align: right;">RELATOR -> ' + value.Relator + '</p>') +
                    '</div>' +
                    '<div id="panel-footer-' + value.Id + '" class="panel-footer" style="text-align: right;box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">' +
                    '<span class="description"><i class="fa fa-clock-o"></i> ' + value.Data.split(' ')[1].split(':')[0] + ':' + value.Data.split(' ')[1].split(':')[1] + '</span>' +
                    '</div>' +
                    '</div>');

                $('.fotonot').css('color', $('#boxInicio').css('background-color'));
                $('.fa-commenting').css('color', $('#boxInicio').css('background-color'));

                if (($.trim(value.Relator) !== "") && ($.trim(value.Relator) !== "NULL")) {
                    $("#panel-footer-" + value.Id).append('<div style="position: absolute; bottom: 11px;">' +
                        '<button data-phone="' + value.RelatorTelefone + '" class="btn btn-default btn-circle phone" style="margin-right: 10px;"><i class="glyphicon glyphicon-earphone"></i></button>' +
                        '<button data-mail="' + value.RelatoreMail + '" class="btn btn-default btn-circle mail"><i class="glyphicon glyphicon-envelope"></i></button></div>');
                }

                if ($.trim(value.Link) !== "") {
                   if ($.inArray(vEscola, ["241"]) === -1){
                      $("#panel-body-" + value.Id).append('<a href="'+value.Link+'" data-codigo="' + value.Codigo + '" class="link-t btn bg-' + $('#cor').val() + '" data-link="' + value.Link + '" style="float: right;">Visualizar</a>');
                   } else {
                      $("#panel-body-" + value.Id).append(`<a class="btn bg-${$('#cor').val()}" href="http://www.sistema2.com.br/appaluno/url.ashx?codEscola=${vEscola}&url=${value.Link}" target="_blank" style="float: right;">Visualizar </a>`);
                   }
                }

                if (parseInt($.trim(value.Tarefa.id)) !== 0) {
                    var count = parseInt(value.Tarefa.count);
                    if (count > 0) {
                        var $obj = value.Tarefa.data;
                        $.each($obj, function (i, v) {
                            $("#panel-body-" + value.Id).append('<div class="row" style="margin-bottom: 3px;"><div class="col-sm-12 col-xs-12"><a href="#" target="_blank" data-codigo="' + value.Codigo + '" id="b' + v.id + '" class="btn btn-block link-t bg-' + $('#cor').val() + '" data-id="' + v.id + '">' + v.descricao + '</a></div></div>');
                            $('#b' + v.id).attr('data-loading-text', "<i class='fa fa-circle-o-notch fa-spin'></i> Processando...");
                        });
                    }
                }

                $data1 = value.Data.substr(0, 10);
            });

            $(".phone").on("click", function () {
                window.open("tel:" + $(this).attr('data-phone'), '_blank');
            });

            $(".mail").on("click", function (e) {
                window.open("mailto:" + $(this).attr('data-mail'), '_blank');
            });

            $(".link").off('click').on("click", notLinkClick);
            $(".link-t").off('click').on("click", notLinkTClick);

            $('#exampleModal1').modal('hide');
            $('.modal-header2').addClass('bg-' + $("#cor").val());
            $('#myModal').modal('show');

            setTimeout(function () {
                $('#myModal .modal-body').scrollTop(0);
            }, 300);

        }
    });
}

function btnMaisNotClick(e) {
    e.preventDefault();

    var $thisButton = $(this);

    var $data = { 'Escola': $("#codEscola").val(), 'uniqueID': $("#uniqueID").val(), 'pagina': $pagina_not };

    $.ajax({
        type: "POST",
        "headers": {
            "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f"
        },
        dataType: "json",
        url: "https://www.api.sistema2.com.br/webapisae/api/CarregaNotificacao",
        data: $data,
        beforeSend: function () {
            $thisButton.button('loading');
        },
        error: function () {
            $thisButton.button('reset');

            $.toast({
                text: "Nenhum registro foi encontrado",
                hideAfter: 3000,
                position: 'top-center',
                showHideTransition: 'fade'
            });
        },
        success: function (data) {
            $thisButton.button('reset');

            if (data.indicadorContinuidade) {
                $pagina_not = $pagina_not + 1;
            }
            else {
                $('.modal-footer2').hide();
                $('.modal-body2').css('height', 'calc(100% - 70px)');
            }

            var $data1 = '';
            $.each(data.data, function (index, value) {
                var $aluno = $alunos[$alunos.findIndex(obj => obj.Codigo === value.Codigo.toString())];

                var $data = value.Data.substr(0, 10);

                if ($data1 !== $data) {
                    $(".modal-body2 > ul").append('<li class="time-label" style="padding-top: 0px;padding: 0px;"><span class="bg-' + $('#cor').val() + '"><i class="fa fa-calendar" style="margin-right: 10px;"></i> ' + zMesExt(value.Data.substr(0, 10)) + '</li>');
                }

                $(".modal-body2 > ul").append('<li><div class="col-sm-2 col-xs-2" style="padding: 0px;"><img class="img-circle fotonot" style="border: 3px solid; width: 55px; height: 55px;" src="' + $aluno.Foto + '"/></div><div class="col-sm-10 col-xs-10" style="padding-right: 0px;padding-left: 5px;"></div></li>');

                $('.col-sm-10').last().html('<div class="x" style="background-color: #fff;border: 0px solid transparent;border-radius: 4px;"></div>');

                $('.x').last().html(
                    '<div class="panel panel-default" style="margin-bottom: 5px;">' +
                    '<div class="panel-heading">' +
                    '<div class="row">' +
                    '<div class="col-sm-10 col-xs-10"><strong>' + value.Titulo.toUpperCase() + '</strong></div>' +
                    '<div class="col-sm-2 col-xs-2" style="padding-right: 5px;padding-left: 0px;"><i class="fa fa-commenting fa-2x" style="float: right;"></i></div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="panel-body-' + value.Id + '" class="panel-body">' +
                    '<p style="text-align: justify;text-justify:inter-word;">' + value.Texto + '</p>' +
                    (($.trim(value.Relator) === "") ? '' : '<p style="text-align: right;">RELATOR -> ' + value.Relator + '</p>') +
                    '</div>' +
                    '<div id="panel-footer-' + value.Id + '" class="panel-footer" style="text-align: right;box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">' +
                    '<small class="description"><i class="fa fa-clock-o"></i> ' + value.Data.split(' ')[1].split(':')[0] + ':' + value.Data.split(' ')[1].split(':')[1] + '</span>' +
                    '</div>' +
                    '</div>');

                $('.fotonot').css('color', $('#boxInicio').css('background-color'));
                $('.fa-commenting').css('color', $('#boxInicio').css('background-color'));

                if (($.trim(value.Relator) !== "") && ($.trim(value.Relator) !== "NULL")) {
                    $("#panel-footer-" + value.Id).append('<div style="position: absolute; bottom: 11px;">' +
                        '<button data-phone="' + value.RelatorTelefone + '" class="btn btn-default btn-circle phone" style="margin-right: 10px;"><i class="glyphicon glyphicon-earphone"></i></button>' +
                        '<button data-mail="' + value.RelatoreMail + '" class="btn btn-default btn-circle mail"><i class="glyphicon glyphicon-envelope"></i></button></div>');
                }

                if ($.trim(value.Link) !== "") {
                   if ($.inArray(vEscola, ["241"]) === -1){
                      $("#panel-body-" + value.Id).append('<a href="'+value.Link+'" data-codigo="' + value.Codigo + '" class="link-t btn bg-' + $('#cor').val() + '" data-link="' + value.Link + '" style="float: right;">Visualizar</a>');
                   } else {
                      $("#panel-body-" + value.Id).append(`<a class="btn bg-${$('#cor').val()}" href="http://www.sistema2.com.br/appaluno/url.ashx?codEscola=${vEscola}&url=${value.Link}" target="_blank" style="float: right;">Visualizar </a>`);
                   }
                }

                if (parseInt($.trim(value.Tarefa.id)) !== 0) {
                    var count = parseInt(value.Tarefa.count);
                    if (count > 0) {
                        var $obj = value.Tarefa.data;
                        $.each($obj, function (i, v) {
                            $("#panel-body-" + value.Id).append('<div class="row" style="margin-bottom: 3px;"><div class="col-sm-12 col-xs-12"><href="#" target="_blank" data-codigo="' + value.Codigo + '" id="b' + v.id + '" class="btn btn-block link-t bg-' + $('#cor').val() + '" data-id="' + v.id + '">' + (v.descricao === null) ? "" : v.descricao.substr(0, 30) + '</a></div></div>');
                            $('#b' + v.id).attr('data-loading-text', "<i class='fa fa-circle-o-notch fa-spin'></i> Processando...");
                        });
                    }
                }

                $data1 = value.Data.substr(0, 10);
            });

            $(".phone").on("click", function () {
                window.open("tel:" + $(this).attr('data-phone'), '_blank');
            });

            $(".mail").on("click", function (e) {
                window.open("mailto:" + $(this).attr('data-mail'), '_blank');
            });

            $(".link").off('click').on("click", notLinkClick);
            $(".link-t").off('click').on("click", notLinkTClick);
        }
    });
}

function notificacaoClick(event) {
    event.preventDefault();

    $pagina_not = 1;

    $('.modal-body2').css('height', 'calc(100% - 135px)');
    $('.modal-footer2').show();
    $('.modal-footer2').html('<div class="row container"><button class="btn btn-block bg-' + $('#cor').val() + '" id="btnMaisNot" style="margin-botom:3em;background-color:' + $("body > div.wrapper > header > nav").css('background-color') + ';color:white;font-weight:bold">VER MAIS</button></div>');
    $('#btnMaisNot').attr("data-loading-text", "<i class='fa fa-circle-o-notch fa-spin'></i> Processando");
    $('#btnMaisNot').off('click').on('click', btnMaisNotClick);

    $('#modalfoto').attr('src', './images/download.png');
    $('#modaltitulo').text($(this).find('strong').text());

    $("#exampleModal1").modal('hide');

    $('.modal-body2').html('<ul class="timeline" style="margin: 5px;margin-right:0px;"></ul>');

    aguarda();

    carreganot();
    //setTimeout(carreganot, 3000);
}

function notLinkClick(e) {
    e.preventDefault();

    var $this = $(this);

    var _href = 'http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + $("#codEscola").val() + '&url=' + $(this).attr('data-link');

    var isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());

    if (parseInt($("#codEscola").val()) === 80) {
        setTimeout(function () {
            $this.button('loading');
        }, 200);

        $.ajax({
            type: "POST",
            dataType: "json",
            data: { 'Escola': $("#codEscola").val(), 'Codigo': $this.attr("data-codigo") },
            url: "https://www.api.sistema2.com.br/WebApiSae/Bloqueado",
            error: function () {
                $this.button('reset');
            },
            success: function (data) {
                $this.button('reset');
                if (data.bloqueado === true) {
                    exibeErro080();
                } else {
                    if ((isiPhone) && (vs === "1")) {
                        window.open($(this).attr('data-link'), '_blank');
                    } else {
                        window.open(_href, '_blank');
                    }
                }
            }
        });
    } else {
        if ((isiPhone) && (vs === "1")) {
            window.open($(this).attr('data-link'), '_blank');
        } else {
            window.open(_href, '_blank');
        }
    }

}

function notLinkTClick(e) {
    e.preventDefault();
    
    var $this = $(this);

    if ($this.attr('href') !== '#') {
        $this.text($this.attr('data-text'));

        var _href = 'http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + $("#codEscola").val() + '&url=' + $this.attr('href');
        var isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());

        if ((isiPhone) && (parseInt(vs) === 1)) {
            window.open($this.attr('href'), '_blank');
        } else {
            window.open(_href, '_blank');
        }

        return false;
    }

    setTimeout(function () {
        $this.button('loading');
    }, 200);

    jQuery.ajax({
        type: "GET",
        "headers": { "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
        dataType: "json",
        url: "https://www.api.sistema2.com.br/webapisae/api/tarefadoc/" + $(this).attr('data-id'),
        error: function () {
            $this.button('reset');

            var $error = $.parseJSON(jqXHR.responseText);

            $.toast({
                text: $error.Message,
                hideAfter: 5000,
                position: 'top-center',
                showHideTransition: 'fade'
            });
        },
        success: function (data) {
            var $link = data.Arquivo;
            var _href = 'http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + $("#codEscola").val() + '&url=' + $link;

            var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());

            if ((isiPhone) && (vs === "1"))
                _href = $link;

            if (parseInt($("#codEscola").val()) === 80) {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    data: { 'Escola': $("#codEscola").val(), 'Codigo': $this.attr("data-codigo") },
                    url: "https://www.api.sistema2.com.br/WebApiSae/Bloqueado",
                    success: function (data) {
                        if (data.bloqueado === true) {
                            $this.button('reset');
                            exibeErro080();
                        } else {
                            $this.button('reset');
                            setTimeout(function () {
                                $this.attr('href', _href);
                                $this.attr('data-text', $this.text());
                                $this.html('<span>Clique aqui para visualizar</span>');
                            }, 200);
                        }
                    }
                });
            } else {
                $this.button('reset');
                setTimeout(function () {
                    $this.attr('href', _href);
                    $this.attr('data-text', $this.text());
                    $this.html('<span>Clique aqui para visualizar</span>');
                }, 200);

            }
        }
    });
}