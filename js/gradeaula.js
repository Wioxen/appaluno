function aula() {
    console.log('aula');

    var verPDF = ["14"];
    if ($.inArray($(".fotoAtual").attr("data-escola"), verPDF) !== -1) {
        var _url = 'https://digite1.websiteseguro.com/cliente/' + $.trim($(this).text()) + '_' + $(".fotoAtual").attr("data-escola") + '_' + $('.fotoAtual').attr('data-turma2').toUpperCase() +'.pdf';

        var _href = 'http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + $(".fotoAtual").attr("data-escola") + '&url=' + _url;

        var isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());

        if (isiPhone) {
            if (vs === "1")
                _href = _url;
        }

        window.open(_href, '_blank');
    } else {
        jQuery.ajax({
            type: "POST",
            "headers": { "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
            dataType: "json",
            url: "https://www.api.sistema2.com.br/WebApiSae/api/buscaAula",
            data: { 'Escola': $(".fotoAtual").attr("data-escola"), 'Codigo': $(".fotoAtual").attr("data-codigo") },
            beforeSend: aguarda,
            error: function () {
                $('#exampleModal1').modal('hide');
                $.toast({
                    text: "Nenhum registro foi encontrado",
                    hideAfter: 3000,
                    position: 'bottom-center',
                    showHideTransition: 'fade'
                });
            },
            success: function (data) {
                console.log(data);

                $('#exampleModal1').modal('hide');
                $('.modal-body2').html('<div class="panel-group" id="accordion"></div>');
                $.each(data.data, function (index, value) {
                    var vtexto = "";
                    switch (value.id) {
                        case "1": vtexto = "";
                            break;
                        case "2": vtexto = "Segunda";
                            break;
                        case "3": vtexto = "Terça";
                            break;
                        case "4": vtexto = "Quarta";
                            break;
                        case "5": vtexto = "Quinta";
                            break;
                        case "6": vtexto = "Sexta";
                            break;
                        case "7": vtexto = "Sábado";
                            break;
                    }
                    $('#accordion').append(
                        '  <div class="panel panel-default">' +
                        '    <div id="panel-heading' + value.id + '" class="panel-heading bg-' + $("#cor").val() + '">' +
                        '      <h4 class="panel-title">' +
                        '        <a style="color: #FFFFFF;text-decoration: none;" id="clique' + value.id + '" class="btn-block" data-toggle="collapse" data-parent="#accordion" href="#collapse' + value.id + '"><i class="fa fa-calendar" style="margin-right: 10px;"></i> ' + vtexto + '</a>' +
                        '      </h4>' +
                        '    </div>' +
                        '    <div id="collapse' + value.id + '" class="panel-collapse collapse"><ul class="list-group list-group-flush"></ul></div>' +
                        '    </div>' +
                        '  </div>');

                    $.each(value.aula, function (i, v) {
                        $('#collapse' + value.id + ' .list-group-flush').append('<li class="list-group-item d-flex justify-content-between align-items-center">' +
                            '<p><strong>' + v.disciplina + '</strong>' +
                            '    <span style="float: right;"><i class="fa fa-clock-o"></i> ' + v.horaI + ' - ' + v.horaF + '</span></p>' +
                            '<p class="label label-default" style="float: right; font-size: 100%;"><i class="fa fa-graduation-cap"></i> ' + v.docente.split(' ')[0] + '</p></br>' +
                            //'<p><button class="btn btn-small text-center">xxxxxxxx</button></p>'+
                            '  </li>');
                    });
                });

                $('#clique' + data.dia).append('<small style="float: right;" class="label label-default label-warning">HOJE</small>');
                $('#clique' + data.dia).trigger('click');

                $('.modal-header2').addClass('bg-' + $("#cor").val());
                $('#myModal').modal('show');
            }
        });
    }
}

function cliqueAula(e) {
    e.preventDefault();

    $('.modal-body2').css('height', 'calc(100% - 70px)');
    $('.modal-footer2').hide();
    $('#modalfoto').attr('src', $('#imgfoto').attr('src'));
    $('#modaltitulo').text($(this).find('strong').text());

    console.log($.trim($(this).text()).toUpperCase());

    aguarda();

    setTimeout(aula, 3000);
}