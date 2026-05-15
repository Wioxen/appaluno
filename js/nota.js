function abre_nota() {
    $('#exampleModal1').modal('hide');
    $('#myModal').modal('show');
}

function notaClick(e) {
    e.preventDefault();

    aguarda();

    $('#modalfoto').attr('src', $('#imgfoto').attr('src'));
    $('#modaltitulo').text($(this).find('strong').text());

    $('.modal-header2').addClass('bg-' + $("#cor").val());
    $('.modal-footer2').empty();

    var $escola = $(".fotoAtual").attr("data-escola");
    var $codigo = $(".fotoAtual").attr("data-codigo");

    var $url = "https://www.api.sistema2.com.br/WebApiSae/api/notas2";

    if ($escola === "80")
        $url = "https://www.api.sistema2.com.br/WebApiSae/NotaTec2";

    if (parseInt($escola) === 80) {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: { 'Escola': $escola, 'Codigo': $codigo },
            url: "https://www.api.sistema2.com.br/WebApiSae/Bloqueado",
            success: function (data) {
                if (data.bloqueado === true) {
                    exibeErro080();
                } else {
                    carregaNota2($escola, $codigo, $url);
                }
            }
        });
    } else {
        carregaNota2($escola, $codigo, $url);
    }
}

function carregaNota2($escola, $codigo, $url) {
    $.ajax({
        type: "POST",
        "headers": {
            "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f"
        },
        dataType: "json",
        url: $url,
        data: { 'Escola': $escola, 'Codigo': $codigo },
        //beforeSend: aguarda,
        error: function (xhr, status, errorThrown) {
            $('#exampleModal1').modal('hide');
            if (parseInt($escola) === 80) {
                exibeErro080(xhr.responseText);
            } else {
                $.toast({
                    text: "Nenhum registro foi encontrado",
                    hideAfter: 3000,
                    position: 'top-center',
                    showHideTransition: 'fade'
                });
            }
        },
        success: function (data) {
            $("#myModal .modal-body2").html(
                '<div class="nav-tabs-custom">' +
                '<ul id="nav-tabs-nt" class="nav nav-tabs">' +
                '</ul><div class="tab-content"></div>');

            if ($escola === "80") {
                $('#nav-tabs-nt').addClass('hidden');
            }

            if (data === null) {
                exibeErro();
                return false;
            }

            var $fields = undefined;
            var $values = undefined;

            if ($escola === "80") {
                $fields = data.Campos;
                $values = data.Valores;
            } else {
                $fields = jQuery.parseJSON(data.Campos);
                $values = jQuery.parseJSON(data.Valores);
            }

            $.each($fields, function (index, value) {
                if (($('#grp' + value.GRUPO).length === 0) && (value.GRUPO !== '5')) {
                    var $sinal = (data.Unidade === 2) ? 'º' : 'ª';
                    var $texto = (data.Unidade === 2) ? 'SEMESTRE' : (data.Unidade === 1) ? 'TRIMESTRE' : 'UNIDADE';
                    $texto = value.GRUPO + $sinal + ' ' + $texto;
                    $texto = $texto.substr(0, 6);

                    var vTab = '<li id="grp' + value.GRUPO + '" class="grp ' + value.GRUPO + '"><a class="a-grupo" id="a' + value.GRUPO + '" data-grupo=' + value.GRUPO + ' href="#tab_' + value.GRUPO + '" data-toggle="tab" style="text-align:center">' + $texto + '</a></li>';

                    $('.nav-tabs').append(vTab);

                    $('.tab-content').append('<div id="tab_' + value.GRUPO + '" class="tab-pane"></div>');

                    $('#tab_' + value.GRUPO).html('<div style="width: 100%;overflow: auto;background-color: #fff;"><table id="table' + value.GRUPO + '" class="table">' +
                        '<thead></thead>' +
                        '<tbody class="tbody"></tbody>' +
                        '</table></div>');

                    $('#table' + value.GRUPO + ' > thead').append('<th style="position: sticky;top:0;left:0;text-align:left;background-color:#DBDBFF"><span style="margin-left: 10px;">DISCIPLINA</th></tr>');

                    $('#tab_' + value.GRUPO).append('<div class="block" style="margin-top: 20px;" id="alertLegenda' + value.GRUPO + '"></div>');

                    $('#alertLegenda' + value.GRUPO).html('<div class="accordion" id="accordionExample' + value.GRUPO + '">' +
                        '<div class="card">' +
                        '<div class="card-header" id="heading' + value.GRUPO + '">' +
                        '<div role="group" aria-label="Basic example">' +
                        '<button data-toggle="collapse" data-target="#collapse' + value.GRUPO + '" aria-expanded="true" aria-controls="collapseOne" type="button" class="btn btn-block text-black"><i class="icon fa fa-info"></i> VER LEGENDA</button>' +
                        '</div>' +
                        '</div>' +
                        '<div id="collapse' + value.GRUPO + '" class="collapse" aria-labelledby="heading' + value.GRUPO + '" data-parent="#accordionExample' + value.GRUPO + '">' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }

                if ($('#th_' + value.GRUPO + '_' + value.CAMPO).length === 0) {
                    $('#table' + value.GRUPO + ' > thead').append('<th id="th_' + value.GRUPO + '_' + value.CAMPO + '" style="padding:11px;border:1px solid #FFF;text-align:center;border-radius:3px;background-color:#DBDBFF" data-grupo="' + value.GRUPO + '">' + value.COLUNA + '</th>');
                    $('#collapse' + value.GRUPO).append('<p>' + value.COLUNA + ' = ' + value.DETALHE + '</p>');
                }
            });

            $.each($fields, function (index, value) {
                /*                if ((value.CD === 'C') || (value.CAMPO.indexOf('FALTA') > -1) || (value.GRUPO === '5')) {*/
                if ((value.CD === 'C') || (value.GRUPO === '5')) {
                    if ($('#grp5').length === 0) {
                        $('.nav-tabs').append('<li id="grp5" class="5"><a data-grupo=5 href="#tab_5" data-toggle="tab" style="text-align:center">MÉDIA GERAL</a></li>');
                        $('.tab-content').append('<div id="tab_5" class="tab-pane"></div>');
                        $('#tab_5').html('<div style="width: 100%;overflow: auto;"><table id="table5" class="table">' +
                            '<thead></thead>' +
                            '<tbody class="tbody"></tbody>' +
                            '</table></div>');

                        $('#table5 > thead').append('<th style="position: sticky;left:0px;text-align:left;background-color:#DBDBFF"><span style="margin-left: 10px;">DISCIPLINA</th></tr>');

                        $('#tab_5').append('<div style="margin-top: 20px;" id="alertLegenda5"></div>');

                        $('#alertLegenda5').html('<div class="accordion" id="accordionExample5">' +
                            '<div class="card">' +
                            '<div class="card-header" id="heading5">' +
                            '<div role="group" aria-label="Basic example">' +
                            '<button data-toggle="collapse" data-target="#collapse5" aria-expanded="true" aria-controls="collapseOne" type="button" class="btn btn-block text-black"><i class="icon fa fa-info"></i>  VER LEGENDA</button>' +
                            '</div>' +
                            '</div>' +
                            '<div id="collapse5" class="collapse" aria-labelledby="heading5" data-parent="#accordionExample5">' +
                            '</div>' +
                            '</div>' +
                            '</div>');
                    }

                    if ($('#th_5_' + value.CAMPO).length === 0) {
                        $('#table5 > thead').append('<th id="th_5_' + value.CAMPO + '" style="padding:11px;border:1px solid #FFF;text-align:center;border-radius:3px;background-color:#DBDBFF">' + value.COLUNA + '</th>');
                        $('#collapse5').append('<p>' + value.COLUNA + ' = ' + value.DETALHE + '</p>');
                    }
                }
            });

            $.each($values, function (i, v) {
                $('.tbody').append('<tr class=' + v.DISCIPLINA + '>' +
                    '<td class="' + v.DISCIPLINA + '" style="position: sticky;top:0;left:0;background-color: #fff;text-align:left">' +
                    v.DDISCIPLINA+
                    '</td>' +
                    '</tr>');

                var $colunas = v.COLUNAS;

                $.each($colunas, function (idx, val) {
                    if ($fields[idx] != undefined) {
                        $('#table' + val.GRUPO + ' > tbody > tr').last().append('<td id="td_' + val.GRUPO + '_' + $fields[idx].CAMPO + '_' + v.DISCIPLINA + '" style="text-align:center;" title="' + val.VALOR + '"><span>' + val.NOTA + '</span></td>');

                        //if (($fields[idx].CD === 'C') || ($fields[idx].CAMPO.indexOf('FALTA') > -1)) {
                        if ($fields[idx].CD === 'C') {
                            if ($("#td_5_" + $fields[idx].CAMPO + "_" + v.DISCIPLINA).length === 0) {
                                $('#table5 > tbody > tr').last().append('<td id="td_5_' + $fields[idx].CAMPO + '_' + v.DISCIPLINA + '" title="' + val.VALOR + '" style="text-align:center;"><span>' + val.NOTA + '</span></td>');
                            }
                        }
                    }
                });
            });

            $('.a-grupo').first().trigger('click');

            $.ajax({
                type: "GET",
                "headers": {
                    "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f"
                },
                dataType: "json",
                url: "https://www.api.sistema2.com.br/WebApiSae/api/alunomenu?Escola=" + $escola + "&Codigo=" + $codigo + "&Ano=2025&Descricao=BOLETIM ESCOLAR",
                success: function (data) {
                    if (data !== null) {
                        var _href = 'http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + $escola + '&url=' + data.URL;

                        var isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());

                        if (isiPhone) {
                            if (vs === "1")
                                _href = data.URL;
                        }

                        $('.modal-footer2').show();
                        $('.modal-footer2').html('<a class="btn btn-block botao" style="float: right;" href="' + _href + '" target="_blank">VISUALIZAR BOLETIM</a>');
                        $('#myModal .modal-body2').css('height', 'calc(100% - 135px)');
                        $('.botao').css('background-color', $('#boxInicio').css('background-color'));
                        $('.botao').css('color', $('#modaltitulo').css('color'));
                    }
                }
            });

            $('#exampleModal1').modal('hide');
            setTimeout(function () {
                $('#myModal').modal('show');
            }, 1000);
        }
    });
}