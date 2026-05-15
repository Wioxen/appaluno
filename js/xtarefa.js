function zMesExt(zdata) {
    var vMes = zdata.split('/')[1];
    var semana = [
        "DOMINGO",//0
        "SEGUNDA-FEIRA",//1
        "TERÇA-FEIRA",//2
        "QUARTA-FEIRA",//3
        "QUINTA-FEIRA",//4
        "SEXTA-FEIRA",//5
        "SÁBADO"];//6
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

function icoHtml(pExt, pLink, pDesc, pId, pEscola) {
    if (pLink.indexOf('youtube') != -1) {
        return '<a style="margin-top:1em;"  id="' + pId + '" target="_blank" title="' + pDesc + '"  href="' + pLink + '" class="btn btn-app">' +
            '<span class="badge bg-yellow">' + pId + '</span>' +
            ' <i class="fa fa-youtube-play"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' + pDesc + '' +
            '</font></font></a>';
    } else {
        if (pLink.indexOf('https') != -1) {
            return '<a style="margin-top:1em;" id="' + pId + '" target="_blank" title="' + pDesc + '"  href="' + pLink + '" class="btn btn-app">' +
                '<span class="badge bg-bg-aqua">' + pId + '</span>' +
                ' <i class="fa fa-internet-explorer"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' + pDesc + '' +
                '</font></font></a>';
        }
    }
    switch (pExt) {
        case "png":
        case "jpg":
            return '<a id="' + pId + '" target="_blank" title="' + pDesc + '"  href="' + pLink + '" class="btn btn-app">' +
                ' <i class="fa fa-picture-o"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' + pDesc + '' +
                '</font></font></a>';
            break;
        case "pdf":
            return '<a style="margin-top:1em;"  id="' + pId + '" target="_blank" title="' + pDesc + '"  href="' + pLink + '" class="btn btn-app">' +
                '<span class="badge bg-yellow">' + pId + '</span>' +
                ' <i class="fa fa-file-pdf-o"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' + pDesc + '' +
                '</font></font></a>';
            break;
        case "MOV":
        case "mov":
            return '<a style="margin-top:1em;"  id="' + pId + '" target="_blank" title="' + pDesc + '"  href="' + pLink + '" class="btn btn-info btn-xs" style="margin:0.5em">' +
                '<span class="badge bg-bg-purple">' + pId + '</span>' +
                '<i class="fa fa-file-video-o" aria-hidden="true"></i>&nbsp;&nbsp;' +
                '<font style="vertical-align: inherit;font-weight:bold">' + pDesc + ' </font></a>';
            break;
        case "DOC":
        case "doc":
        case "DOCX":
        case "docx":
            return '<a style="margin-top:1em;"  id="' + pId + '" target="_blank" title="' + pDesc + '"  href="' + pLink + '" class="btn btn-info btn-xs" style="margin:0.5em">' +
                '<span class="badge bg-bg-purple">' + pId + '</span>' +
                '<i class="fa fa-file-word-o" aria-hidden="true"></i>&nbsp;&nbsp;' +
                '<font style="vertical-align: inherit;font-weight:bold">' + pDesc + ' </font></a>';
            break;
        default:
            return '<a style="margin-top:1em;" id="' + pId + '" target="_blank" title="' + pDesc + '"  href="' + pLink + '" class="btn btn-app">' +
                '<span class="badge bg-bg-aqua">' + pId + '</span>' +
                ' <i class="fa fa-hand-o-up"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' + pDesc + '' +
                '</font></font></a>';
            break;
    }
}

function exibeTarefa(data) {
    $(".modal-backdrop").remove();
    $(".modal-backdrop").hide();
    $("#exampleModal1 > div > div > div.modal-header > button").trigger('click');
    localStorage.setItem('lsAluno', JSON.stringify(data));
    var lsAluno = JSON.parse(localStorage.getItem('lsAluno'));

    $("#content").empty();
    $("#content").append('<div class="row coluna" style="margin-top: 10px; margin-left: -0.5em;">' +
        '<div class="col-md-12">' +
        //'<div>' +
        //'<a class="btn btn-default" data-toggle="modal" data-target="#exampleModal" style="width:100%"><i class="fa fa-list"></i> Filtrar por Data</a>' +
        //'</div></br></hr>' +
        '<ul class="timeline">' +
        '</ul>' +
        '</div></div>');
    
    var divModal = '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Para filtrar, selecione uma data abaixo: </h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div id="divdata" class="row">' +
        '<ul class="nav nav-tabs col-xs-3" id="myTab1" role="tablist" style="border:none">' +
        '</ul>' +
        '<div class="tab-content col-xs-9" id="myTabContent1">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('.coluna').append(divModal);


    /*variaveis*/
    var vDisicplina = "";
    var vData = "";
    var vTexto = "";
    var vEscola = $(".fotoAtual").attr("data-escola");
    var arrData = [];
    var arrMes = [];
    var arrDisciplina = [];
    /*variaveis*/

    /*fazendo data*/
    $.each(data, function (index, value) {
        if (value.Sala != "" || value.Casa != "") {
            arrMes.push(value.Data.split(' ')[0].split('/')[1]);
            arrData.push(value.Data.split(' ')[0]);
            arrDisciplina.push(value.CodDisciplina + '-' + value.Disciplina.split(' ')[0]);
            if (vData != value.Data.substr(0, 10).replace('/', '').replace('/', '')) {

                $("#content > div > div > ul.timeline").append('<li style="font-weight: 600;padding: 5px;display: inline-block;border-radius: 4px;} data-datetarefa="' +
                    value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="' + value.Data.substr(0, 10).replace('/', '').replace('/', '')+' time-label liTarefaData liData' +
                    value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                    '<span class="bg" style="background-color:#CCC;">' +
                    '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                    '</font></font><i class="fa fa-calendar"></i>&nbsp;' + zMesExt(value.Data.substr(0, 10)) + '</span>' +
                    '</li>' +
                    '<li date-datetarefa="' +
                    value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="liTarefaCorpo liCorpo' +
                    value.Data.substr(0, 10) + '">' +
                    '<div class="box-group" id="acc' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                    '</div>' +
                    '</li>');
            }
            if (value.Casa != "") {
                if (!$("#collapseCasa" + value.Data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                    $('#acc' + value.Data.substr(0, 10).replace('/', '').replace('/', '')).append(
                        '<div class="panel box box-default">' +
                        '<div class="box-header with-border" style="color: #444;">' +
                        '<h4 style="color: #444;" class="box-title">' +
                        '<a style="color: #444;" data-toggle="collapse" data-parent="acc' +
                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" href="#collapseCasa' +
                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" >' +
                        '<font style="vertical-align: inherit;" style="color: #444;">' +
                        '<font style="vertical-align: inherit;">' +
                        '<i class="fa fa-home" aria-hidden="true"></i>&nbsp;TAREFA DE CASA' +
                        '</font></font></a>' +
                        '</h4>' +
                        '</div>' +
                        '<div id="collapseCasa' +
                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in">' +
                        '<div style="text-align:justify" class="box-bodyCasa' +
                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
            }
            if (value.Sala != "") {
                if (!$("#collapseSala" + value.Data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                    if ((value.Sala != "") || ((value.Descricao != "....") && (value.CasaSala == "S"))) {
                        $('#acc' + value.Data.substr(0, 10).replace('/', '').replace('/', '')).append(
                            '<div class="panel box box-default">' +
                            '<div class="box-header with-border" style="color: #444;">' +
                            '<h4 style="color: #444;" class="box-title">' +
                            '<a style="color: #444;" data-toggle="collapse" data-parent="acc' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" href="#collapseSala' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" >' +
                            '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                            '<i class="fa fa-book" aria-hidden="true"></i>&nbsp;TAREFA DE SALA' +
                            '</font></font></a>' +
                            '</h4>' +
                            '</div>' +
                            '<div id="collapseSala' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in">' +
                            '<div data-i="' + $("#collapseSala" + value.Data.substr(0, 10).replace('/', '').replace('/', '')).length + '" style="text-align:justify" class="box-bodySala' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '"></div>' +
                            '</div>' +
                            '</div>' +
                            '</div>');
                    }
                }
            }


            vData = value.Data.substr(0, 10).replace('/', '').replace('/', '');
        }
    });
    /*fazendo data*/
    /*Array filtrado Mes para botao filtrar data*/
    arrMesFilter = arrMes.filter(function (item, pos) {
        return arrMes.indexOf(item) == pos;
    });
    arrDataFilter = arrData.filter(function (item, pos) {
        return arrData.indexOf(item) == pos;
    });
    arrDisciplinaFilter = arrDisciplina.filter(function (item, pos) {
        return arrDisciplina.indexOf(item) == pos;
    });
    /*Array filtrado Mes para botao filtrar data*/
    /*append mes li tab*/
    $.each(arrMesFilter, function (a, b) {
        $('#myTab1').append('<li class="nav-item">' +
            '<a style="font-weight:bold" class="nav-link" id="' + b + '-tab" data-toggle="tab" href="#' +
            b + '" role="tab" aria-controls="home" aria-selected="true">' +
            zMesExtenso(b) + '</a>' +
            '</li>');
        $('#myTabContent1').append('<div class="tab-pane fade" id="' +
            b + '" role="tabpanel" aria-labelledby="home-tab">' +
            '<div class="list-container">' +
            '<div class="list-group ul' + b + '"">' +
            '</div>' +
            '</div>' +
            '</div>');
    });
    /*fazendo mes li tab*/
    /*append data da tarefa em li tab*/
    $.each(arrDataFilter, function (a, b) {
        $.each($('#myTab1 > li > a'), function (c, d) {
            if (b.split('/')[1] == d.id.split('-')[0]) {
                $('.ul' + b.split('/')[1]).append('<a class="list-group-item list-group-item-action" style="font-weight:bold" data-dttarefa="' + b + '">' +
                    '<i class="fa fa-arrow-right"></i> ' + b + '</br>' + zMesExt(b).split('<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')[0] + '' +
                    '</a>');
            }
        });
    });
    $("#myTab1 > li:first-child").click(function () {
        $("#myTab1 > li").removeClass('active');
        $(this).addClass('active');
        $(this).find('a').attr('aria-expanded', true);
        $("#myTabContent1 div").removeClass('active in');
        $("#myTabContent1 div:first-child").removeClass('active in');
        $("#myTabContent1 div:first-child").addClass('active in');
    });
    /*append data da tarefa em li tab*/
    /*show modal*/
    $('#exampleModal').on('shown.bs.modal', function (e) {
        $(".list-group > a").removeClass('active');
        $("#myTab1 > li:first-child").trigger('click');
        $(".list-group-item").on('click', function (e) {
            $(this).toggleClass('active ' + $(this).attr('data-dttarefa').replaceAll('/', '') + '');
            if (e.currentTarget.classList[3]) {
                $.each($(".liTarefaData"), function (a, b) {
                    if (e.currentTarget.classList[3] != $(this)[0].dataset.datetarefa) {
                        $(this).fadeOut();
                    } else {
                        $(this).fadeIn();
                    }
                });
                $.each($(".liTarefaCorpo"), function (a, b) {
                    if (e.currentTarget.classList[3] != $(this)[0].classList[1].replaceAll('/', '').replace('liCorpo', '')) {
                        $(this).fadeOut();
                    } else {
                        $(this).fadeIn();
                    }
                });
            }
            $("#exampleModal > div > div > div.modal-header > button").trigger('click');
        });
    })
    /*show modal*/

    /*fazendo disciplina*/
    $.each(data, function (index, value) {
        if (vDisicplina != value.CodDisciplina + value.Data.substr(0, 10).replace('/', '').replace('/', '') +
            value.CasaSala + value.Codigo) {
            if ((value.Casa != "") || ((value.Descricao != "....") && (value.CasaSala == "C"))) {
                if (!$("#collapseCasa" + value.CodDisciplina +
                    value.Data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                    $('.box-bodyCasa' + value.Data.substr(0, 10).replace('/', '').replace('/', '')).
                        append('<div class="timeline-body bodyCasa' + value.CodDisciplina +
                            value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                            '<div class="box-group" id="accordion">' +
                            '<div class="box-header with-border">' +
                            '<a data-toggle="collapse" data-parent="#accordion" href="#collapseCasa' +
                            value.CodDisciplina + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" aria-expanded="true" class=""><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                            '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                            '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp; ' + value.Disciplina + '</font>' +
                            '<div id="collapseCasa' + value.CodDisciplina +
                            value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in" aria-expanded="true">' +
                            '<div class="casa' + value.CodDisciplina +
                            value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                            '<br><ul class="timeline ulCasa' + value.CodDisciplina +
                            value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '</font></a>' +
                            '</div>');
                }
            }
            if ((value.Sala != "") || ((value.Descricao != "....") && (value.CasaSala == "S"))) {
                if (!$("#collapseSala" + value.CodDisciplina +
                    value.Data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                    $('.box-bodySala' + value.Data.substr(0, 10).replace('/', '').replace('/', '')).
                        append('<div class="timeline-body bodySala' + value.CodDisciplina +
                            value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                            '<div class="box-group" id="accordion">' +
                            '<div class="box-header with-border">' +
                            '<a data-toggle="collapse" data-parent="#accordion" href="#collapseSala' +
                            value.CodDisciplina + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" aria-expanded="true" class=""><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                            '<p><font style="vertical-align: inherit;">' +
                            '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp; ' +
                            value.Disciplina + '</font></p > ' +
                            '<div id="collapseSala' + value.CodDisciplina +
                            value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in" aria-expanded="true">' +
                            '<div class="sala' + value.CodDisciplina +
                            value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                            '<div class="timeline ulSala' + value.CodDisciplina +
                            value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +

                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</font></a>' +
                            '</div>');
                }
            }
        }
        vDisicplina = value.CodDisciplina + value.Data.substr(0, 10).replace('/', '').replace('/', '') +
            value.CasaSala + value.Codigo;
    });
    /*fazendo disciplina*/

    /*fazendo footer*/
    $.each(data, function (a, b) {

        if ((b.Casa != "") || ((b.Descricao != "....") && (b.CasaSala == "C"))) {
            vCasaSala = "C";
            if (b.Descricao == "....") {
                vTexto = b.Casa;
            }
            else {
                vTexto = b.Descricao;
            }
            $('.ulCasa' + b.CodDisciplina + b.Data.substr(0, 10).replace('/', '').replace('/', '')).
                append('<li class="time-label">' +
                    '<span style="background-color:#CCC;width:100%">' +
                    '<p style="text-aling:left;color:black;text-align: justify; text-justify: inter-word;">' + vTexto.toUpperCase() + '</p>' +
                    '</span>' +
                    '</li>' +
                    '<li class="footerCasa' + b.CodDisciplina +
                    b.Data.substr(0, 10).replace('/', '').replace('/', '') + b.Codigo + '">' +
                    '</li>');
        }

        if ((b.Sala != "") || ((b.Descricao != "....") && (b.CasaSala == "S"))) {
            vCasaSala = "S";
            if (b.Descricao == "....") {
                vTexto = b.Sala;
            }
            else {
                vTexto = b.Descricao;
            }
            $('.ulSala' + b.CodDisciplina + b.Data.substr(0, 10).replace('/', '').replace('/', '')).
                append('<li class="time-label">' +
                    '<span class="bg-gray" >' +
                    '<p style="text-aling:left;color:black;text-align: justify; text-justify: inter-word;">' + vTexto.toUpperCase() + '</p>' +
                    '</span>' +
                    '</li>' +
                    '<li class="footerSala' + b.CodDisciplina +
                    b.Data.substr(0, 10).replace('/', '').replace('/', '') + b.Codigo + '">' +
                    '</li>');
        }
    });
    /*fazenodo footer*/
    /*fazendo files*/
    /* fazendo files */
    $.each(data, function (a, b) {
        $.each(b.Files, function (c, d) {
            if (b.Files.length != 0) {
                switch (b.Files[c].CasaSala) {
                    case "C":
                        $('.footerCasa' + b.CodDisciplina + b.Data.substr(0, 10).replace('/', '').replace('/', '') + b.Codigo).
                            append(icoHtml(b.Files[c].Ext, b.Files[c].Link, b.Files[c].Descricao, b.Files[c].Id, vEscola));
                        break;
                    case "S":
                        $('.footerSala' + b.CodDisciplina + b.Data.substr(0, 10).replace('/', '').replace('/', '') + b.Codigo).
                            append(icoHtml(b.Files[c].Ext, b.Files[c].Link, b.Files[c].Descricao, b.Files[c].Id, vEscola));
                        break;
                    default:
                }
                $('#' + b.Files[c].Id + '').click(function () {
                    var isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());
                    if (isiPhone) {
                        if (vs === "1")
                            window.open(b.Files[c].Link, '_blank');

                        if (vs === "")
                            window.open('http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + vEscola + '&url=' + b.Files[c].Link + '', '_blank');
                    }
                    var isAndroid = / Android/i.test(navigator.userAgent.toLowerCase());
                    if (isAndroid) {
                        window.open('http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + vEscola + '&url=' + b.Files[c].Link + '', '_blank');
                    }

                    return false;
                });
            } else {
                $('.footer' + b.CodDisciplina + b.Data.substr(0, 10).replace('/', '').replace('/', '')).append('x');
            }
        });
    });
    /* fazendo files */
    $('body').loadingModal('destroy');

    /*config tamanho do texto*/
    $(".vTxt").each(function (a, b) {
        if ($(this).width() > $(window).width() - 60) {
            $(this).width($(window).width() - 190);
        }
    });
    $(".bg-gray").css('max-width', $(window).width());
    /*config tamanho do texto*/
    $("#content").append('<div class="row container"><button class="btn btn-block" id="btnMaisTarefa" style="margin-botom:3em;background-color:' + $("body > div.wrapper > header > nav").css('background-color') + ';color:white;font-weight:bold">VEJA MAIS</button>' +
        '</div>');
    var tCount1 = 1;
    $('#btnMaisTarefa').on('click', function (e) {
        tCount1++;
        
        $.ajax({
            type: "POST",
            headers: { Authorization: "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
            dataType: "json",
            url: "https://www.api.sistema2.com.br/WebApiSae/api/carregatarefa",
            data: {
                'Escola': $(".fotoAtual").attr("data-escola"),
                'Codigo': $(".fotoAtual").attr("data-codigo"),
                'pagina': tCount1
            },
            beforeSend: function () {
                $('#exampleModal1').modal('show');
                $('#exampleModal1').find('modal-header').empty();
                $('#imgModal').attr('src', './images/' + $(".fotoAtual").attr('data-escola') + '.png');
                $("#exampleModal1 > div > div > div.modal-footer.text-center").empty();
                $("#exampleModal1 > div > div > div.modal-footer.text-center").html("<h4 class='alert-heading animate__animated animate__backInLeft text-center'>Aguarde...</h4><h4 class='animate__animated animate__backInLeft text-center'>Consultando informações no servidor</b><h4>");
                setTimeout(function () {
                    // after 1000ms, call the `setTimeout` callback
                    // In the meantime, continue executing code below
                    setTimeout(function () {
                        setTimeout(function () {
                            $("#exampleModal1 > div > div > div.modal-footer.text-center").html("<h4 class='alert-heading animate__animated animate__backInLeft text-center'>Aguarde...</h4><h4 class='animate__animated animate__backInLeft text-center'>Estamos preparando o ambiente</b><h4>");
                        }, 4000)
                        //function1() //runs second after 1100ms
                    }, 4000)
                    $("#exampleModal1 > div > div > div.modal-footer.text-center").html("<h4 class='alert-heading animate__animated animate__backInLeft text-center'>Aguarde...</h4><h4 class='animate__animated animate__backInLeft text-center'>Concluindo o processo</b><h4>");
                    //function2() //runs first, after 1000ms
                }, 2000);
            },
            error: function () {
                $('#exampleModal1').modal('hide');
                return false;
            },
            success: function (data) {
                $('#exampleModal1').modal('hide');
                /*variaveis*/
                var vDisicplina = "";
                var vData = "";
                var vTexto = "";
                var vEscola = $(".fotoAtual").attr("data-escola");
                var arrData = [];
                var arrMes = [];
                var arrDisciplina = [];
                /*variaveis*/
                
                /*fazendo data*/
                $.each(data, function (index, value) {
                    if (value.Sala != "" || value.Casa != "") {
                        arrMes.push(value.Data.split(' ')[0].split('/')[1]);
                        arrData.push(value.Data.split(' ')[0]);
                        arrDisciplina.push(value.CodDisciplina + '-' + value.Disciplina.split(' ')[0]);
                        if (vData != value.Data.substr(0, 10).replace('/', '').replace('/', '')) {
                            if (!$("#content > div > div > ul.timeline > li").hasClass('' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '')) {
                                $("#content > div > div > ul.timeline").append('<li class="' + value.Data.substr(0, 10).replace('/', '').replace('/', '')+'" style="font-weight: 600;padding: 5px;display: inline-block;border-radius: 4px"  data-datetarefa="' +
                                    value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="time-label liTarefaData liData' +
                                    value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                    '<span class="bg" style="background-color:#CCC;font-weight: 600;padding: 5px;display: inline-block;border-radius: 4px;}">' +
                                    '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                    '</font></font><i class="fa fa-calendar"></i>&nbsp;' + zMesExt(value.Data.substr(0, 10)) + '</span>' +
                                    '</li>' +
                                    '<li date-datetarefa="' +
                                    value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="liTarefaCorpo liCorpo' +
                                    value.Data.substr(0, 10) + '">' +
                                    '<div class="box-group" id="acc' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                    '</div>' +
                                    '</li>');
                            }
                        }
                        if (value.Casa != "") {
                            if (!$("#collapseCasa" + value.Data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                                $('#acc' + value.Data.substr(0, 10).replace('/', '').replace('/', '')).append(
                                    '<div class="panel box box-default">' +
                                    '<div class="box-header with-border" style="color: #444;">' +
                                    '<h4 style="color: #444;" class="box-title">' +
                                    '<a style="color: #444;" data-toggle="collapse" data-parent="acc' +
                                    value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" href="#collapseCasa' +
                                    value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" >' +
                                    '<font style="vertical-align: inherit;" style="color: #444;">' +
                                    '<font style="vertical-align: inherit;">' +
                                    '<i class="fa fa-home" aria-hidden="true"></i>&nbsp;TAREFA DE CASA' +
                                    '</font></font></a>' +
                                    '</h4>' +
                                    '</div>' +
                                    '<div id="collapseCasa' +
                                    value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in">' +
                                    '<div style="text-align:justify" class="box-bodyCasa' +
                                    value.Data.substr(0, 10).replace('/', '').replace('/', '') + '"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>');
                            }
                        }
                        if (value.Sala != "") {
                            if (!$("#collapseSala" + value.Data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                                if ((value.Sala != "") || ((value.Descricao != "....") && (value.CasaSala == "S"))) {
                                    $('#acc' + value.Data.substr(0, 10).replace('/', '').replace('/', '')).append(
                                        '<div class="panel box box-default">' +
                                        '<div class="box-header with-border" style="color: #444;">' +
                                        '<h4 style="color: #444;" class="box-title">' +
                                        '<a style="color: #444;" data-toggle="collapse" data-parent="acc' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" href="#collapseSala' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" >' +
                                        '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                        '<i class="fa fa-book" aria-hidden="true"></i>&nbsp;TAREFA DE SALA' +
                                        '</font></font></a>' +
                                        '</h4>' +
                                        '</div>' +
                                        '<div id="collapseSala' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in">' +
                                        '<div data-i="' + $("#collapseSala" + value.Data.substr(0, 10).replace('/', '').replace('/', '')).length + '" style="text-align:justify" class="box-bodySala' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '"></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>');
                                }
                            }
                        }
                        vData = value.Data.substr(0, 10).replace('/', '').replace('/', '');
                    }
                });
                /*fazendo data*/
                /*Array filtrado Mes para botao filtrar data*/
                arrMesFilter = arrMes.filter(function (item, pos) {
                    return arrMes.indexOf(item) == pos;
                });
                arrDataFilter = arrData.filter(function (item, pos) {
                    return arrData.indexOf(item) == pos;
                });
                arrDisciplinaFilter = arrDisciplina.filter(function (item, pos) {
                    return arrDisciplina.indexOf(item) == pos;
                });
                /*Array filtrado Mes para botao filtrar data*/
                /*append mes li tab*/
                $.each(arrMesFilter, function (a, b) {
                    $('#myTab1').append('<li class="nav-item">' +
                        '<a style="font-weight:bold" class="nav-link" id="' + b + '-tab" data-toggle="tab" href="#' +
                        b + '" role="tab" aria-controls="home" aria-selected="true">' +
                        zMesExtenso(b) + '</a>' +
                        '</li>');
                    $('#myTabContent1').append('<div class="tab-pane fade" id="' +
                        b + '" role="tabpanel" aria-labelledby="home-tab">' +
                        '<div class="list-container">' +
                        '<div class="list-group ul' + b + '"">' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                });
                /*fazendo mes li tab*/
                /*append data da tarefa em li tab*/
                $.each(arrDataFilter, function (a, b) {
                    $.each($('#myTab1 > li > a'), function (c, d) {
                        if (b.split('/')[1] == d.id.split('-')[0]) {
                            $('.ul' + b.split('/')[1]).append('<a class="list-group-item list-group-item-action" style="font-weight:bold" data-dttarefa="' + b + '">' +
                                '<i class="fa fa-arrow-right"></i> ' + b + '</br>' + zMesExt(b).split('<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')[0] + '' +
                                '</a>');
                        }
                    });
                });
                $("#myTab1 > li:first-child").click(function () {
                    $("#myTab1 > li").removeClass('active');
                    $(this).addClass('active');
                    $(this).find('a').attr('aria-expanded', true);
                    $("#myTabContent1 div").removeClass('active in');
                    $("#myTabContent1 div:first-child").removeClass('active in');
                    $("#myTabContent1 div:first-child").addClass('active in');
                });
                /*append data da tarefa em li tab*/
                /*show modal*/
                $('#exampleModal').on('shown.bs.modal', function (e) {
                    $(".list-group > a").removeClass('active');
                    $("#myTab1 > li:first-child").trigger('click');
                    $(".list-group-item").on('click', function (e) {
                        $(this).toggleClass('active ' + $(this).attr('data-dttarefa').replaceAll('/', '') + '');
                        if (e.currentTarget.classList[3]) {
                            $.each($(".liTarefaData"), function (a, b) {
                                if (e.currentTarget.classList[3] != $(this)[0].dataset.datetarefa) {
                                    $(this).fadeOut();
                                } else {
                                    $(this).fadeIn();
                                }
                            });
                            $.each($(".liTarefaCorpo"), function (a, b) {
                                if (e.currentTarget.classList[3] != $(this)[0].classList[1].replaceAll('/', '').replace('liCorpo', '')) {
                                    $(this).fadeOut();
                                } else {
                                    $(this).fadeIn();
                                }
                            });
                        }
                        $("#exampleModal > div > div > div.modal-header > button").trigger('click');
                    });
                })
                /*show modal*/

                /*fazendo disciplina*/
                $.each(data, function (index, value) {
                    if (vDisicplina != value.CodDisciplina + value.Data.substr(0, 10).replace('/', '').replace('/', '') +
                        value.CasaSala + value.Codigo) {
                        if ((value.Casa != "") || ((value.Descricao != "....") && (value.CasaSala == "C"))) {
                            if (!$("#collapseCasa" + value.CodDisciplina +
                                value.Data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                                $('.box-bodyCasa' + value.Data.substr(0, 10).replace('/', '').replace('/', '')).
                                    append('<div class="timeline-body bodyCasa' + value.CodDisciplina +
                                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                        '<div class="box-group" id="accordion">' +
                                        '<div class="box-header with-border">' +
                                        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseCasa' +
                                        value.CodDisciplina + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" aria-expanded="true" class=""><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                        '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                        '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp; ' + value.Disciplina + '</font>' +
                                        '<div id="collapseCasa' + value.CodDisciplina +
                                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in" aria-expanded="true">' +
                                        '<div class="casa' + value.CodDisciplina +
                                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                        '<br><ul class="timeline ulCasa' + value.CodDisciplina +
                                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                        '</ul>' +
                                        '</div>' +
                                        '</div>' +
                                        '</font></a>' +
                                        '</div>');
                            }
                        }
                        if ((value.Sala != "") || ((value.Descricao != "....") && (value.CasaSala == "S"))) {
                            if (!$("#collapseSala" + value.CodDisciplina +
                                value.Data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                                $('.box-bodySala' + value.Data.substr(0, 10).replace('/', '').replace('/', '')).
                                    append('<div class="timeline-body bodySala' + value.CodDisciplina +
                                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                        '<div class="box-group" id="accordion">' +
                                        '<div class="box-header with-border">' +
                                        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseSala' +
                                        value.CodDisciplina + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" aria-expanded="true" class=""><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                        '<p><font style="vertical-align: inherit;">' +
                                        '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp; ' +
                                        value.Disciplina + '</font></p > ' +
                                        '<div id="collapseSala' + value.CodDisciplina +
                                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in" aria-expanded="true">' +
                                        '<div class="sala' + value.CodDisciplina +
                                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                        '<div class="timeline ulSala' + value.CodDisciplina +
                                        value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">' +

                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</font></a>' +
                                        '</div>');
                            }
                        }
                    }
                    vDisicplina = value.CodDisciplina + value.Data.substr(0, 10).replace('/', '').replace('/', '') +
                        value.CasaSala + value.Codigo;
                });
                /*fazendo disciplina*/

                /*fazendo footer*/
                $.each(data, function (a, b) {

                    if ((b.Casa != "") || ((b.Descricao != "....") && (b.CasaSala == "C"))) {
                        vCasaSala = "C";
                        if (b.Descricao == "....") {
                            vTexto = b.Casa;
                        }
                        else {
                            vTexto = b.Descricao;
                        }
                        $('.ulCasa' + b.CodDisciplina + b.Data.substr(0, 10).replace('/', '').replace('/', '')).
                            append('<li class="time-label">' +
                                '<span style="background-color:#CCC;width:100%">' +
                                '<p style="text-aling:left;color:black;text-align: justify; text-justify: inter-word;">' + vTexto.toUpperCase() + '</p>' +
                                '</span>' +
                                '</li>' +
                                '<li class="footerCasa' + b.CodDisciplina +
                                b.Data.substr(0, 10).replace('/', '').replace('/', '') + b.Codigo + '">' +
                                '</li>');
                    }

                    if ((b.Sala != "") || ((b.Descricao != "....") && (b.CasaSala == "S"))) {
                        vCasaSala = "S";
                        if (b.Descricao == "....") {
                            vTexto = b.Sala;
                        }
                        else {
                            vTexto = b.Descricao;
                        }
                        $('.ulSala' + b.CodDisciplina + b.Data.substr(0, 10).replace('/', '').replace('/', '')).
                            append('<li class="time-label">' +
                                '<span class="bg-gray" >' +
                                '<p style="text-aling:left;color:black;text-align: justify; text-justify: inter-word;">' + vTexto.toUpperCase() + '</p>' +
                                '</span>' +
                                '</li>' +
                                '<li class="footerSala' + b.CodDisciplina +
                                b.Data.substr(0, 10).replace('/', '').replace('/', '') + b.Codigo + '">' +
                                '</li>');
                    }
                });
                /*fazenodo footer*/
                /*fazendo files*/
                /* fazendo files */
                $.each(data, function (a, b) {
                    $.each(b.Files, function (c, d) {
                        if (b.Files.length != 0) {
                            switch (b.Files[c].CasaSala) {
                                case "C":
                                    $('.footerCasa' + b.CodDisciplina + b.Data.substr(0, 10).replace('/', '').replace('/', '') + b.Codigo).
                                        append(icoHtml(b.Files[c].Ext, b.Files[c].Link, b.Files[c].Descricao, b.Files[c].Id, vEscola));
                                    break;
                                case "S":
                                    $('.footerSala' + b.CodDisciplina + b.Data.substr(0, 10).replace('/', '').replace('/', '') + b.Codigo).
                                        append(icoHtml(b.Files[c].Ext, b.Files[c].Link, b.Files[c].Descricao, b.Files[c].Id, vEscola));
                                    break;
                                default:
                            }
                            $('#' + b.Files[c].Id + '').click(function () {
                                var isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());
                                if (isiPhone) {
                                    if (vs === "1")
                                        window.open(b.Files[c].Link, '_blank');

                                    if (vs === "")
                                        window.open('http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + vEscola + '&url=' + b.Files[c].Link + '', '_blank');
                                }
                                var isAndroid = / Android/i.test(navigator.userAgent.toLowerCase());
                                if (isAndroid) {
                                    window.open('http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + vEscola + '&url=' + b.Files[c].Link + '', '_blank');
                                }

                                return false;
                            });
                        } else {
                            $('.footer' + b.CodDisciplina + b.Data.substr(0, 10).replace('/', '').replace('/', '')).append('x');
                        }
                    });
                });
                /* fazendo files */

            }
        });
    });
    $(window).on("scroll", function () {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            
        }
    });
}

function tarefaClick(event) {
    var tCount = 0;
    tCount++;
    if ($(window).width() <= 768) {
        $('a[data-toggle="push-menu"]').trigger('click');
    }
    $(".mn").removeClass("active");
    $(this).addClass("active");
    $("#idTitulo").text($(this).text());
    $.ajax({
        type: "POST",
        headers: { "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
        dataType: "json",
        url: "http://www.sistema2.com.br/WebApiSae/api/carregatarefa",
        data: {
            'Escola': $(".fotoAtual").attr("data-escola"),
            'Codigo': $(".fotoAtual").attr("data-codigo"),
            'pagina': tCount
        },
        beforeSend: aguarda,
        error: exibeErro,
        success: exibeTarefa
    });
}