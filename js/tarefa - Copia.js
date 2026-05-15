var $pagina = 1;

function tarefa() {
    $pagina = 1;

    $('#modalfoto').attr('src', $('#imgfoto').attr('src'));
    $('.modal-header2').addClass('bg-' + $("#cor").val());
    $('.modal-footer2').show();
    $('.modal-footer2').html('<div class="row container"><button class="btn btn-block bg-' + $('#cor').val() + '" id="btnMaisTarefa" style="margin-botom:3em;background-color:' + $("body > div.wrapper > header > nav").css('background-color') + ';color:white;font-weight:bold">VER MAIS</button></div>');
    $('#btnMaisTarefa').attr("data-loading-text", "<i class='fa fa-circle-o-notch fa-spin'></i> Processando");
    $('#btnMaisTarefa').off('click').on('click', btnMaisTarefaClick);
    $('.modal-body2').css('height', 'calc(100% - 135px)');
    $('.modal-body2').css('overflow-x', 'hidden');

    var $data = {};
    $data.Escola = $(".fotoAtual").attr("data-escola");
    $data.Codigo = $(".fotoAtual").attr("data-codigo");
    //$data.Turma = $(".fotoAtual").attr("data-alunoTurma");
    $data.pagina = $pagina;

    $.ajax({
        type: "POST",
        headers: { "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
        dataType: "json",
        url: "https://www.api.sistema2.com.br/WebApiSae/api/carregatarefa",
        data: $data,
        //beforeSend: aguarda,
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

            $(".modal-backdrop").remove();
            $(".modal-backdrop").hide();
            $("#exampleModal1 > div > div > div.modal-header > button").trigger('click');

            if (data.totalCount === 0) {
                $.toast({
                    text: "Nenhum registro foi encontrado",
                    hideAfter: 3000,
                    position: 'top-center',
                    showHideTransition: 'fade'
                });

                return false;
            }

            if (data.indicadorContinuidade) {
                $pagina = $pagina + 1;
            }
            else {
                $('.modal-footer2').hide();
                $('.modal-body2').css('height', 'calc(100% - 70px)');
            }

            $('#myModal .modal-body').empty();
            $('#myModal .modal-body').html("<div class='row' style='margin: 0px; margin-top: 10px; margin-left: 0px;'><div class='col-md-12'><ul id='timeline' class='timeline' style='margin: 0px;'><ul></div></div>");

            $.each(data.data, function (index, value) {
                var vdata = value.data.substr(0, 10).replace('/', '').replace('/', '');

                $('#timeline').append(
                    '<li style="font-weight: 600;display: inline-block;border-radius: 4px;} data-datetarefa="' +
                    vdata + '" class="' + vdata + ' time-label liTarefaData liData' +
                    vdata + '">' +
                    '<span class="bg-' + $('#cor').val() + '" style="background-color:#CCC;width: 200px;">' +
                    '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                    '</font></font><i class="fa fa-calendar"></i>&nbsp;' + zMesExt(value.data.substr(0, 10)) + '</span>' +
                    '</li>' +
                    '<li date-datetarefa="' +
                    vdata + '" class="liTarefaCorpo liCorpo' +
                    value.data.substr(0, 10) + '">' +
                    '<div class="box-group" id="acc' + vdata + '">' +
                    '</div>' +
                    '</li>');

                if (value.casa !== undefined) {
                    $('#acc' + vdata).append(
                        '<div class="panel box box-default">' +
                        '<div class="box-header with-border" style="color: #444;" data-toggle="collapse" data-parent="acc' + vdata + '" href="#collapseCasa' + vdata + '">' +
                        '<h4 style="color: #444;" class="box-title">' +
                        '<a style="color: #444;">' +
                        '<font style="vertical-align: inherit;" style="color: #444;">' +
                        '<font style="vertical-align: inherit;">' +
                        '<i class="fa fa-home" aria-hidden="true"></i>&nbsp;CASA' +
                        '</font></font></a>' +
                        '</h4>' +
                        '</div>' +
                        '<div id="collapseCasa' +
                        vdata + '" class="panel-collapse collapse in">' +
                        '<div style="text-align:justify" class="box-bodyCasa' +
                        vdata + '"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    $.each(value.casa, function (indexCasa, valueCasa) {
                        $('.box-bodyCasa' + vdata).
                            append('<div class="timeline-body bodyCasa' + valueCasa.iddisciplina + '-' + vdata + '">' +
                                '<div class="box-group" id="accordion">' +
                                '<div class="box-header with-border">' +
                                '<a data-toggle="collapse" data-parent="#accordion" href="#collapseCasa' +
                                valueCasa.iddisciplina + '-' + vdata + '" aria-expanded="true" class=""><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp; ' + valueCasa.disciplina + '</font>' +
                                '<div id="collapseCasa' + valueCasa.iddisciplina + '-' + vdata + '" class="panel-collapse collapse in" aria-expanded="true">' +
                                '<div class="casa' + valueCasa.iddisciplina + '-' + vdata + '">' +
                                '<br><ul class="timeline ulCasa' + valueCasa.iddisciplina + '-' + vdata + '">' +
                                '</ul>' +
                                '</div>' +
                                '</div>' +
                                '</font></a>' +
                                '</div>');

                        $.each(valueCasa.conteudo, function (i, v) {
                            $('.ulCasa' + valueCasa.iddisciplina + '-' + vdata).
                                append('<li class="time-label" style="margin-right: 0px;">' +
                                    '<span style="background-color:#CCC;width:100%">' +
                                    '<p style="text-aling:left;color:black;text-align: justify; text-justify: inter-word;">' + v.texto.toUpperCase() + '</p>' +
                                    '</span>' +
                                    '</li>');

                            $.each(v.doc, function (ii, vv) {
                                $('.ulCasa' + valueCasa.iddisciplina + '-' + vdata).
                                    append('<li><a style="margin-top:1em;" data-id="' + vv.id + '" target="_blank" href="#" class="btn btn-app btn-block">' +
                                        '<span class="badge bg-yellow">' + vv.id + '</span>' +
                                        '<i class="fa fa-paperclip"></i>' +
                                        '<font style="vertical-align: inherit;">' + vv.descricao +
                                        '</font>' +
                                        '</a></li>');
                            });

                            $('.btn-app').attr("data-loading-text", "<i class='fa fa-circle-o-notch fa-spin'></i> Processando");
                            $('.btn-app').off('click').on('click', botao_appClick);
                        });
                    });
                }

                if (value.sala !== undefined) {
                    $('#acc' + vdata).append(
                        '<div class="panel box box-default">' +
                        '<div class="box-header with-border" style="color: #444;" data-toggle="collapse" data-parent="acc' + vdata + '" href="#collapseSala' + vdata + '">' +
                        '<h4 style="color: #444;" class="box-title">' +
                        '<a style="color: #444;">' +
                        '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                        '<i class="fa fa-book" aria-hidden="true"></i>&nbsp;SALA/CLASSE' +
                        '</font></font></a>' +
                        '</h4>' +
                        '</div>' +
                        '<div id="collapseSala' + vdata + '" class="panel-collapse collapse in">' +
                        '<div data-i="' + $("#collapseSala" + vdata).length + '" style="text-align:justify" class="box-bodySala' + vdata + '"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    $.each(value.sala, function (indexSala, valueSala) {
                        $('.box-bodySala' + vdata).
                            append('<div class="timeline-body bodySala' + valueSala.iddisciplina + '-' + vdata + '">' +
                                '<div class="box-group" id="accordion">' +
                                '<div class="box-header with-border">' +
                                '<a data-toggle="collapse" data-parent="#accordion" href="#collapseSala' +
                                valueSala.iddisciplina + '-' + vdata + '" aria-expanded="true" class=""><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                '<p><font style="vertical-align: inherit;">' +
                                '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp; ' +
                                valueSala.disciplina + '</font></p > ' +
                                '<div id="collapseSala' + valueSala.iddisciplina + '-' + vdata + '" class="panel-collapse collapse in" aria-expanded="true">' +
                                '<div class="sala' + valueSala.iddisciplina + '-' + vdata + '">' +
                                '<div class="timeline ulSala' + valueSala.iddisciplina + '-' + vdata + '">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</font></a>' +
                                '</div>');

                        $.each(valueSala.conteudo, function (i, v) {
                            console.log(valueSala.conteudo);

                            $('.ulSala' + valueSala.iddisciplina + '-' + vdata).
                                append('<li class="time-label" style="margin-right: 0px;">' +
                                    '<span style="background-color:#CCC;width:100%">' +
                                    '<p style="text-aling:left;color:black;text-align: justify; text-justify: inter-word;">' + v.texto.toUpperCase() + '</p>' +
                                    '</span>' +
                                    '</li>');

                            $.each(v.doc, function (ii, vv) {
                                $('.ulSala' + valueSala.iddisciplina + '-' + vdata).
                                    append('<li><a style="margin-top:1em;" data-id="' + vv.id + '" target="_blank" href="#" class="btn btn-app btn-block">' +
                                        '<span class="badge bg-yellow">' + vv.id + '</span>' +
                                        '<i class="fa fa-paperclip"></i>' +
                                        '<font style="vertical-align: inherit;">' + vv.descricao +
                                        '</font>' +
                                        '</a></li>');
                            });

                            $('.btn-app').attr("data-loading-text", "<i class='fa fa-circle-o-notch fa-spin'></i> Processando");
                            $('.btn-app').off('click').on('click', botao_appClick);
                        });
                    });

                }
            });

            $('#myModal').modal('show');
        }
    });

}

function botao_appClick(e) {
    e.preventDefault();

    var $this = $(this);

    jQuery.ajax({
        type: "GET",
        "headers": { "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
        dataType: "json",
        url: "https://www.api.sistema2.com.br/webapisae/api/tarefadoc/" + $(this).attr('data-id'),
        beforeSend: function () {
            $this.button('loading');
        },
        error: function (jqXHR) {
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

            var isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());

            if ((isiPhone) && (vs === "1"))
                _href = $link;

            setTimeout(function () {
                $this.button('reset');
                window.open(_href, '_blank');
            }, 600);
        }
    });

    return false;
}

function zMesExt(zdata) {
    var vMes = zdata.split('/')[1];
    var semana = [
        "DOMINGO",//0
        "SEGUNDA-FEIRA",//1
        "TERCA-FEIRA",//2
        "QUARTA-FEIRA",//3
        "QUINTA-FEIRA",//4
        "SEXTA-FEIRA",//5
        "SABADO"];//6
    var data = zdata;
    var arr = data.split("/").reverse();
    var teste = new Date(arr[0], arr[1] - 1, arr[2]);
    var dia = teste.getDay();
    // Obtém a data/hora atual
    var data = new Date();

    // Guarda cada pedaço em uma variável
    var xdia = data.getDate();           // 1-31
    var dia_sem = data.getDay();            // 0-6 (zero=domingo)
    var mes = data.getMonth();          // 0-11 (zero=janeiro)
    var ano2 = data.getYear();           // 2 dígitos
    var ano4 = data.getFullYear();       // 4 dígitos
    var hora = data.getHours();          // 0-23
    var min = data.getMinutes();        // 0-59
    var seg = data.getSeconds();        // 0-59
    var mseg = data.getMilliseconds();   // 0-999
    var tz = data.getTimezoneOffset(); // em minutos

    if (xdia < 10) {
        xdia = '0' + xdia;
    }
    if (mes < 10) {
        mes = (mes + 1);
        mes = '0' + mes;
    }

    // Formata a data e a hora (note o mês + 1)
    var str_data = xdia + '-' + (mes) + '-' + ano4;
    var str_data1 = (((xdia - 1) < 10) ? '0' + (xdia - 1) : (xdia - 1)) + '-' + (mes) + '-' + ano4;
    var str_data2 = (xdia + 1) + '-' + (mes) + '-' + ano4;
    var str_hora = hora + ':' + min + ':' + seg;

    // Mostra o resultado
    if (str_data == zdata.split('/')[0] + '-' + zdata.split('/')[1] + '-' + zdata.split('/')[2]) {
        semana[dia] = "HOJE";
    } else {

        if (str_data1 == zdata.split('/')[0] + '-' + zdata.split('/')[1] + '-' + zdata.split('/')[2]) {
            semana[dia] = "ONTEM";
        } else {
            if (str_data2 == zdata.split('/')[0] + '-' + zdata.split('/')[1] + '-' + zdata.split('/')[2]) {
                semana[dia] = "AMANHÃ";
            } else {
                //console.log(str_data2 + zdata.split('/')[0] + '-' + zdata.split('/')[1] + '-' + zdata.split('/')[2]);
            }
        }
    }

    switch (vMes) {
        case "01": vMes = "janeiro"; break;
        case "02": vMes = "fevereiro"; break;
        case "03": vMes = "março"; break;
        case "04": vMes = "abril"; break;
        case "05": vMes = "maio"; break;
        case "06": vMes = "junho"; break;
        case "07": vMes = "julho"; break;
        case "08": vMes = "agosto"; break;
        case "09": vMes = "setembro"; break;
        case "10": vMes = "outubro"; break;
        case "11": vMes = "novembro"; break;
        case "12": vMes = "dezembro"; break;
        default:
    }
    return semana[dia] + '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + zdata.split('/')[0] + ' DE ' +
        vMes.toUpperCase() + ' DE ' +
        zdata.split('/')[2];
}

function btnMaisTarefaClick(e) {
    e.preventDefault();

    var $thisButton = $(this);

    var $data = {};
    $data.Escola = $(".fotoAtual").attr("data-escola");
    $data.Codigo = $(".fotoAtual").attr("data-codigo");
//    $data.Curso = $(".fotoAtual").attr("data-alunoCurso");
//    $data.Turma = $(".fotoAtual").attr("data-alunoTurma");
    $data.pagina = $pagina;

    $.ajax({
        type: "POST",
        headers: { "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
        dataType: "json",
        url: "https://www.api.sistema2.com.br/WebApiSae/api/carregatarefa",
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
                $pagina = $pagina + 1;
            }
            else {
                $('.modal-footer2').hide();
                $('.modal-body2').css('height', 'calc(100% - 70px)');
            }

            $.each(data.data, function (index, value) {
                var vdata = value.data.substr(0, 10).replace('/', '').replace('/', '');
                $('#timeline').append(
                    '<li style="font-weight: 600;display: inline-block;border-radius: 4px;} data-datetarefa="' +
                    vdata + '" class="' + vdata + ' time-label liTarefaData liData' +
                    vdata + '">' +
                    '<span class="bg-' + $('#cor').val() + '" style="background-color:#CCC;width: 200px;">' +
                    '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                    '</font></font><i class="fa fa-calendar"></i>&nbsp;' + zMesExt(value.data.substr(0, 10)) + '</span>' +
                    '</li>' +
                    '<li date-datetarefa="' +
                    vdata + '" class="liTarefaCorpo liCorpo' +
                    value.data.substr(0, 10) + '">' +
                    '<div class="box-group" id="acc' + vdata + '">' +
                    '</div>' +
                    '</li>');

                if (value.casa !== undefined) {
                    $('#acc' + vdata).append(
                        '<div class="panel box box-default">' +
                        '<div class="box-header with-border" style="color: #444;" data-toggle="collapse" data-parent="acc' + vdata + '" href="#collapseCasa' + vdata + '">' +
                        '<h4 style="color: #444;" class="box-title">' +
                        '<a style="color: #444;">' +
                        '<font style="vertical-align: inherit;" style="color: #444;">' +
                        '<font style="vertical-align: inherit;">' +
                        '<i class="fa fa-home" aria-hidden="true"></i>&nbsp;CASA' +
                        '</font></font></a>' +
                        '</h4>' +
                        '</div>' +
                        '<div id="collapseCasa' +
                        vdata + '" class="panel-collapse collapse in">' +
                        '<div style="text-align:justify" class="box-bodyCasa' +
                        vdata + '"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    $.each(value.casa, function (indexCasa, valueCasa) {
                        $('.box-bodyCasa' + vdata).
                            append('<div class="timeline-body bodyCasa' + valueCasa.iddisciplina + '-' + vdata + '">' +
                                '<div class="box-group" id="accordion">' +
                                '<div class="box-header with-border">' +
                                '<a data-toggle="collapse" data-parent="#accordion" href="#collapseCasa' +
                                valueCasa.iddisciplina + '-' + vdata + '" aria-expanded="true" class=""><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp; ' + valueCasa.disciplina + '</font>' +
                                '<div id="collapseCasa' + valueCasa.iddisciplina + '-' + vdata + '" class="panel-collapse collapse in" aria-expanded="true">' +
                                '<div class="casa' + valueCasa.iddisciplina + '-' + vdata + '">' +
                                '<br><ul class="timeline ulCasa' + valueCasa.iddisciplina + '-' + vdata + '">' +
                                '</ul>' +
                                '</div>' +
                                '</div>' +
                                '</font></a>' +
                                '</div>');

                        $.each(valueCasa.conteudo, function (i, v) {
                            $('.ulCasa' + valueCasa.iddisciplina + '-' + vdata).
                                append('<li class="time-label" style="margin-right: 0px;">' +
                                    '<span style="background-color:#CCC;width:100%">' +
                                    '<p style="text-aling:left;color:black;text-align: justify; text-justify: inter-word;">' + v.texto.toUpperCase() + '</p>' +
                                    '</span>' +
                                    '</li>');

                            $.each(v.doc, function (ii, vv) {
                                $('.ulCasa' + valueCasa.iddisciplina + '-' + vdata).
                                    append('<li><a style="margin-top:1em;" data-id="' + vv.id + '" target="_blank" href="#" class="btn btn-app btn-block">' +
                                        '<span class="badge bg-yellow">' + vv.id + '</span>' +
                                        '<i class="fa fa-paperclip"></i>' +
                                        '<font style="vertical-align: inherit;">' + vv.descricao +
                                        '</font>' +
                                        '</a></li>');
                            });

                            $('.btn-app').attr("data-loading-text", "<i class='fa fa-circle-o-notch fa-spin'></i> Processando");
                            $('.btn-app').off('click').on('click', botao_appClick);
                        });
                    });
                }

                if (value.sala !== undefined) {
                    $('#acc' + vdata).append(
                        '<div class="panel box box-default">' +
                        '<div class="box-header with-border" style="color: #444;" data-toggle="collapse" data-parent="acc' + vdata + '" href="#collapseSala' + vdata + '">' +
                        '<h4 style="color: #444;" class="box-title">' +
                        '<a style="color: #444;">' +
                        '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                        '<i class="fa fa-book" aria-hidden="true"></i>&nbsp;SALA/CLASSE' +
                        '</font></font></a>' +
                        '</h4>' +
                        '</div>' +
                        '<div id="collapseSala' + vdata + '" class="panel-collapse collapse in">' +
                        '<div data-i="' + $("#collapseSala" + vdata).length + '" style="text-align:justify" class="box-bodySala' + vdata + '"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    $.each(value.sala, function (indexSala, valueSala) {
                        $('.box-bodySala' + vdata).
                            append('<div class="timeline-body bodySala' + valueSala.iddisciplina + '-' + vdata + '">' +
                                '<div class="box-group" id="accordion">' +
                                '<div class="box-header with-border">' +
                                '<a data-toggle="collapse" data-parent="#accordion" href="#collapseSala' +
                                valueSala.iddisciplina + '-' + vdata + '" aria-expanded="true" class=""><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                '<p><font style="vertical-align: inherit;">' +
                                '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp; ' +
                                valueSala.disciplina + '</font></p > ' +
                                '<div id="collapseSala' + valueSala.iddisciplina + '-' + vdata + '" class="panel-collapse collapse in" aria-expanded="true">' +
                                '<div class="sala' + valueSala.iddisciplina + '-' + vdata + '">' +
                                '<div class="timeline ulSala' + valueSala.iddisciplina + '-' + vdata + '">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</font></a>' +
                                '</div>');

                        $.each(valueSala.conteudo, function (i, v) {
                            console.log(valueSala.conteudo);

                            $('.ulSala' + valueSala.iddisciplina + '-' + vdata).
                                append('<li class="time-label" style="margin-right: 0px;">' +
                                    '<span style="background-color:#CCC;width:100%">' +
                                    '<p style="text-aling:left;color:black;text-align: justify; text-justify: inter-word;">' + v.texto.toUpperCase() + '</p>' +
                                    '</span>' +
                                    '</li>');

                            $.each(v.doc, function (ii, vv) {
                                $('.ulSala' + valueSala.iddisciplina + '-' + vdata).
                                    append('<li><a style="margin-top:1em;" data-id="' + vv.id + '" target="_blank" href="#" class="btn btn-app btn-block">' +
                                        '<span class="badge bg-yellow">' + vv.id + '</span>' +
                                        '<i class="fa fa-paperclip"></i>' +
                                        '<font style="vertical-align: inherit;">' + vv.descricao +
                                        '</font>' +
                                        '</a></li>');
                            });

                            $('.btn-app').attr("data-loading-text", "<i class='fa fa-circle-o-notch fa-spin'></i> Processando");
                            $('.btn-app').off('click').on('click', botao_appClick);
                        });
                    });

                }
            });
        }
    });
}

function tarefaClick(e) {
    e.preventDefault();

    aguarda();

    $('#modaltitulo').text($(this).find('strong').text());

    if (parseInt($(".fotoAtual").attr("data-escola")) === 80) {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: { 'Escola': $(".fotoAtual").attr("data-escola"), 'Codigo': $(".fotoAtual").attr("data-codigo") },
            url: "https://www.api.sistema2.com.br/WebApiSae/Bloqueado",
            success: function (data) {
                /*if (data.bloqueado === true) {
                    exibeErro080();
                } else {
                    tarefa();
                }*/
                tarefa();
            }
        });
    } else {
        tarefa();
    }    
}