/* tarefa.js — versão 20260516b
   Marcador para confirmar no DevTools/Network qual versão está carregando.
   Procure no Console por: console "tarefa.js v20260516b carregado". */
console.log('tarefa.js v20260516b carregado');

var $pagina = 1;
var $thisButton = undefined;

/**
 * Fecha o exampleModal1 mesmo em race condition.
 * Bootstrap ignora .modal('hide') chamado durante a animação de show — esta
 * função aguarda o evento 'shown.bs.modal' se necessário, e como rede de
 * segurança força o fechamento após 600ms removendo classes e backdrop.
 */
 
 
function fecharLoadingModal() {
    var $m = $('#exampleModal1');
    if ($m.length === 0) return;

    // Se ainda não terminou de abrir, registra um listener para fechar depois
    if (!$m.hasClass('in') && !$m.hasClass('show')) {
        $m.one('shown.bs.modal', function () { $m.modal('hide'); });
    }
    // E tenta fechar imediatamente também
    $m.modal('hide');

    // Rede de segurança: força fechamento após 600ms se o Bootstrap não respondeu
    setTimeout(function () {
        if ($m.is(':visible')) {
            $m.removeClass('in show').css('display', 'none').attr('aria-hidden', 'true');
            $('body').removeClass('modal-open').css('padding-right', '');
            $('.modal-backdrop').remove();
        }
    }, 600);
}

function tarefa() {
    $.ajax({
        type: "POST",
        headers: { "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
        dataType: "json",
        url: "https://api.sistema2.com.br/WebApiSaeCore/api/carregatarefa?escola=" + $(".fotoAtual").attr("data-escola") + "&codigo=" + $(".fotoAtual").attr("data-codigo") + "&pagina=" + $pagina,
        //beforeSend: aguarda,
        error: function () {
            if ($thisButton !== undefined) {
                $thisButton.button('reset');
            }

            fecharLoadingModal();

            $.toast({
                text: "Nenhum registro foi encontrado",
                hideAfter: 3000,
                position: 'top-center',
                showHideTransition: 'fade'
            });
        },
        success: function (data) {
            fecharLoadingModal();

            if (data.totalCount === 0) {
                $.toast({
                    text: "Nenhum registro foi encontrado",
                    hideAfter: 3000,
                    position: 'top-center',
                    showHideTransition: 'fade'
                });

                return false;
            }

            var vDisicplina = "";
            var vData = "";
            var vTexto = "";

            /*fazendo data*/
            $.each(data, function (index, value) {
                if (value.sala !== "" || value.casa !== "") {
                    if (vData !== value.data.substr(0, 10).replace('/', '').replace('/', '')) {
                        $("#content > ul").append('<li class="time-label liData' + value.data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                            '<span class="bg-' + $('#cor').val() + '"><i class="fa fa-calendar"></i> ' + zMesExt(value.data.substr(0, 10)) + '</span>' +
                            '</li>' +
                            '<li class="liCorpo' + value.data.substr(0, 10) + '">' +
                            '<div class="box-group" id="acc' + value.data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                            '</div>' +
                            '</li>');
                    }
                    if (value.casa != "") {
                        if (!$("#collapseCasa" + value.data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                            $('#acc' + value.data.substr(0, 10).replace('/', '').replace('/', '')).append(
                                '<div class="panel box box-default">' +
                                '<div class="box-header with-border" style="color: #444;">' +
                                '<a style="color: #444;" data-toggle="collapse" data-parent="acc' + value.data.substr(0, 10).replace('/', '').replace('/', '') + '" href="#collapseCasa' + value.data.substr(0, 10).replace('/', '').replace('/', '') + '" >' +
                                '<i class="fa fa-home" aria-hidden="true"></i>&nbsp;TAREFA DE CASA' +
                                '</a>' +
                                '</div>' +
                                '<div id="collapseCasa' + value.data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in">' +
                                '<div style="text-align:justify" class="box-bodyCasa' + value.data.substr(0, 10).replace('/', '').replace('/', '') + '"></div>' +
                                '</div>' +
                                '</div>' +
                                '</div>');
                        }
                    }
                    if (value.sala !== "") {
                        if (!$("#collapseSala" + value.data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                            if ((value.sala != "") || ((value.descricao != "....") && (value.casasala == "S"))) {
                                $('#acc' + value.data.substr(0, 10).replace('/', '').replace('/', '')).append(
                                    '<div class="panel box box-default">' +
                                    '<div class="box-header with-border" style="color: #444;">' +
                                    '<a style="color: #444;" data-toggle="collapse" data-parent="acc' + value.data.substr(0, 10).replace('/', '').replace('/', '') + '" href="#collapseSala' + value.data.substr(0, 10).replace('/', '').replace('/', '') + '" >' +
                                    '<i class="fa fa-book" aria-hidden="true"></i>&nbsp;TAREFA DE SALA' +
                                    '</a>' +
                                    '</div>' +
                                    '<div id="collapseSala' + value.data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in">' +
                                    '<div data-i="' + $("#collapseSala" + value.data.substr(0, 10).replace('/', '').replace('/', '')).length + '" style="text-align:justify" class="box-bodySala' + value.data.substr(0, 10).replace('/', '').replace('/', '') + '"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>');
                            }
                        }
                    }
                    vData = value.data.substr(0, 10).replace('/', '').replace('/', '');
                }
            });

            /*fazendo data*/

            /*fazendo disciplina*/
            $.each(data, function (index, value) {
                if (vDisicplina != value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + value.casasala + value.codigo) {
                    if ((value.casa != "") || ((value.descricao != "....") && (value.casasala == "C"))) {
                        if (!$("#collapseCasa" + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                            $('.box-bodyCasa' + value.data.substr(0, 10).replace('/', '').replace('/', '')).
                                append('<div class="timeline-body bodyCasa' + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                    '<div class="box-group" id="accordion">' +
                                    '<div class="box-header with-border">' +
                                    '<a data-toggle="collapse" data-parent="#accordion" href="#collapseCasa' + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + '" aria-expanded="true" class="">' +
                                    '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp; ' + value.disciplina +
                                    '<div id="collapseCasa' + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in" aria-expanded="true">' +
                                    '<div class="casa' + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                    '<br><ul class="timeline ulCasa' + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                    '</ul>' +
                                    '</div>' +
                                    '</div>' +
                                    '</a>' +
                                    '</div>');
                        }
                    }
                    if ((value.sala !== "") || ((value.descricao !== "....") && (value.casasala === "S"))) {
                        if (!$("#collapseSala" + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '')).length) {
                            $('.box-bodySala' + value.data.substr(0, 10).replace('/', '').replace('/', '')).
                                append('<div class="timeline-body bodySala' + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                    '<div class="box-group" id="accordion">' +
                                    '<div class="box-header with-border">' +
                                    '<a data-toggle="collapse" data-parent="#accordion" href="#collapseSala' + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + '" aria-expanded="true" class="">' +
                                    '<p>' +
                                    '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp; ' + value.disciplina + '</p>' +
                                    '<div id="collapseSala' + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + '" class="panel-collapse collapse in" aria-expanded="true">' +
                                    '<div class="sala' + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                    '<ul class="timeline ulSala' + value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + '">' +
                                    '</ul>' +
                                    '</div>' +
                                    '</div>' +
                                    '</a>' +
                                    '</div>');
                        }
                    }
                }
                vDisicplina = value.coddisciplina + value.data.substr(0, 10).replace('/', '').replace('/', '') + value.casasala + value.codigo;
            });
            /*fazendo disciplina*/

            /*fazendo footer*/
            $.each(data, function (a, b) {
                if ((b.casa !== "") || ((b.descricao !== "....") && (b.casasala === "C"))) {

                    vCasaSala = "C";
                    if (b.descricao === "....") {
                        vTexto = b.casa;

                    }
                    else {
                        vTexto = b.descricao;
                    }

                    $('.ulCasa' + b.coddisciplina + b.data.substr(0, 10).replace('/', '').replace('/', '')).
                        append('<li class="time-label" style="padding-top: 0px;padding: 0px;">' +
                            '<span class="bg-gray btn-block">' +
                            '<p style="text-align: justify;text-justify: inter-word;" rel="' + vTexto.toUpperCase() + '">' + vTexto.toUpperCase() + '<p>' +
                            '</span>' +
                            '</li>' +
                            '<li class="footerC-' + b.coddisciplina + b.data.substr(0, 10).replace('/', '').replace('/', '') + b.codigo + '">' +
                            '</li>');
                }

                if ((b.sala !== "") || ((b.descricao !== "....") && (b.casasala === "S"))) {
                    vCasaSala = "S";
                    if (b.descricao === "....") {
                        vTexto = b.sala;
                    }
                    else {
                        vTexto = b.descricao;
                    }

                    $('.ulSala' + b.coddisciplina + b.data.substr(0, 10).replace('/', '').replace('/', '')).
                        append('<li class="time-label" style="padding-top: 0px;padding: 0px;">' +
                            '<span class="bg-gray">' +
                            '<p style="text-align: justify;text-justify: inter-word;" rel="' + vTexto.toUpperCase() + '">' + vTexto.toUpperCase() + '<p>' +
                            '</span>' +
                            '</li>' +
                            '<li class="footerS-' + b.coddisciplina + b.data.substr(0, 10).replace('/', '').replace('/', '') + b.codigo + '">' +
                            '</li>');
                }
            });
            /*fazenodo footer*/
            /*fazendo files*/
            $.each(data, function (a, b) {
                $.ajax({
                    type: "GET",
                    headers: { Authorization: "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
                    datatype: 'json',
                    contentType: 'application/json',
                    url: "https://api.sistema2.com.br/WebApiSaeCore/api/tarefadoc?escola=" + $(".fotoAtual").attr("data-escola") + "&tarefacodigo=" + b.codigo,
                    success: function (data) {
                        $.each(data, function (i, v) {
                            $('.footer' + v.casasala + "-" + b.coddisciplina + b.data.substr(0, 10).replace('/', '').replace('/', '') + b.codigo).
                                append('<button class="btn btn-light btn-app btn-block" style="margin-top:1em;" data-id="' + v.id + '">' +
                                       '<span class="badge bg-yellow">' + b.id + '</span>' +
                                       '<i class="fa fa-link"></i>' +
                                       v.descricao +
                                       '</button>');
                        });

                        $('.btn-app').attr("data-loading-text", "<i class='fa fa-circle-o-notch fa-spin'></i> Processando");
                        $('.btn-app').off('click').on('click', botao_appClick);
                    }
                });
            });

            $('#btnMaisTarefa').button('reset');
            $("#aguarde").hide();

            if ($('#myModal:visible').length === 0) {
                $('#myModal').modal('show');
                setTimeout(function (e) {
                    $('#myModal .modal-body').scrollTop(0);
                }, 200);
            }
        }
    });
}

function botao_appClick(e) {
    e.preventDefault();

    var $this = $(this);

    jQuery.ajax({
        type: "POST",
        "headers": { "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
        dataType: "json",
        url: "https://api.sistema2.com.br/webapisaecore/api/tarefadoc/" + $(this).attr('data-id'),
        beforeSend: function () {
            $this.button('loading');
        },
        error: function (jqXHR) {
            $this.button('reset');

            $.toast({
                text: jqXHR.responseText,
                hideAfter: 5000,
                position: 'top-center',
                showHideTransition: 'fade'
            });
        },
        success: function (data) {
            var $link = data.arquivo;
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
        vMes.toUpperCase().substr(0, 3) + ' DE ' +
        zdata.split('/')[2];
}

function tarefaClick(e) {
    e.preventDefault();

    var vEscola = $(".fotoAtual").attr("data-escola");
    var vCodigo = $(".fotoAtual").attr("data-codigo");
    window.open(`https://alunoapp.sistema2.com.br/url.php?codescola=${vEscola}&url=https://alunoapp.sistema2.com.br/tarefa.php?codescola=${vEscola}&codigo=${vCodigo}&pagina=1`);
}
