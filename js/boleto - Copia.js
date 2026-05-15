function copiar_linha_digitavel(e) {
    e.preventDefault();

    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = $(this).attr('data-ld');
    sampleTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);

    $.toast({
        text: "Linha digitável copiada com sucesso",
        hideAfter: 3000,
        position: 'bottom-center',
        showHideTransition: 'fade'
    });
}

function boletoClick(event) {
    $('.modal-body2').css('height', 'calc(100% - 70px)');
    $('.modal-footer2').hide();
    $('#modalfoto').attr('src', $('#imgfoto').attr('src'));
    $('#modaltitulo').text($(this).find('strong').text());

    $.ajax({
        type: "POST",
        "headers": {
            "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f"
        },
        dataType: "json",
        url: "http://www.sistema2.com.br/WebApiSae/api/boleto",
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
            $(".modal-backdrop").remove();
            $(".modal-backdrop").hide();
            $("#exampleModal1 > div > div > div.modal-header > button").trigger('click');
            /*var vscript = '<div class="row box-body">' +
                '<div class="col-md-6">' +
                '<div class="box box-solid">' +
                '<!-- /.box-header -->' +
                '<div class="box-body">' +
                '<div class="box-group" id="accordion">';*/

            $('.modal-body2').html('<div class="panel-group" id="accordion"></div>');

            $.each(data, function (index, value) {
                var vtexto = value.DItemDeConsumo.toUpperCase().substr(0, 20);
                $('#accordion').append(
                    '  <div class="panel panel-default">' +
                    '    <div id="panel-heading' + index + '" class="panel-heading bg-' + $("#cor").val() + '">' +
                    '      <h4 class="panel-title">' +
                    '        <a style="color: #FFFFFF;text-decoration: none;" id="clique' + index + '" class="btn-block botao" data-toggle="collapse" data-parent="#accordion" href="#collapse' + index + '"><i class="fa fa-barcode" style="margin-right: 10px;"></i> ' + vtexto+
                    '<small style="float: right;" class="label label-default bg-white">'+value.DtVencimento+'</small>' +'</a>' +
                    '      </h4>' +
                    '    </div>' +
                    '    <div id="collapse' + index + '" class="panel-collapse collapse"><ul class="list-group list-group-flush"></ul></div>' +
                    '    </div>' +
                    '  </div>');

                $('#collapse' + index + ' .list-group-flush').append('<li class="list-group-item d-flex justify-content-between align-items-center">' +
                    '<p class="text-right"><strong style="font-size: 20px;">R$ ' + parseFloat(value.Valor, 10).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.").toString() + '</strong></p>' +
                    '<div class="row" style="padding-left: 10px; padding-right: 10px; margin-bottom: 5px;">' +
                    '<a data-clipboard-target="#foo' + index + '" data-ld="' + value.LD + '" class="ld btn btn-default btn-flat btn-block"><i class="fa fa-copy"></i> Copiar Linha Digitável</a>' +
                    '</div> ' +
                    '<div class="row" style="padding-left: 10px; padding-right: 10px;">' +
                    '<a class="btn btn-default btn-flat btn-block" id="boleto' + index + '"' +
                    ' href="./url.ashx?codEscola=' + $("#codEscola").val() + '&url=http://www.digite.com.br/services/printBoleto.php?codEscola=' + $(".fotoAtual").attr("data-escola") + '&codigo=' + $(".fotoAtual").attr("data-codigo") + '&token=' + value.Token + '"><i class="fa fa-link"></i> Visualizar Boleto</a>' +
                    '</div> ' +
                    '</li>');

                /*vscript = vscript +
                    '<div class="panel box">' +
                    '<div class="box-header with-border">' +
                    '<h4 class="box-title">' +
                    '<i class="fa fa-plus" style="color:#448ABC" aria-hidden="true"></i>&nbsp;&nbsp;<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + index + '">' +
                    (value.DItemDeConsumo.substr(0, 1).toUpperCase() +
                        value.DItemDeConsumo.substr(1).toLowerCase()).substr(0, 16) + '</a>' +
                    '</h4>' +
                    '<span class="label label-default" style="float: right;">' + value.DtVencimento +'</span>' +
                    '</div>' +
                    '<div id="collapse' + index + '" class="panel-collapse collapse">' +
                    '<div class="box-body">' +
                    '<p class="text-right"><strong>R$ ' + parseFloat(value.Valor, 10).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.").toString() +'</strong></p>'+
                    //'<div class="col-xs-7"><span id="foo' + index + '" style="font-size: 0.6em;">' + value.LD.replace('.', '').replace('.', '').replace('.', '') + '</span></div>' +
                    '<div class="row" style="margin-bottom: 5px;">' +
                    '<a data-clipboard-target="#foo' + index + '" data-ld="' + value.LD +'" class="ld btn btn-default btn-flat btn-block"><i class="fa fa-copy"></i> Copiar Linha Digitável</a>' +
                    '</div> ' +
                    '<div class="row">' +
                    '<a class="btn btn-default btn-flat btn-block" id="boleto' + index + '"'+
                    ' href="./url.ashx?codEscola=' + $("#codEscola").val() + '&url=http://www.sistema2.com.br/boleto/boleto2.php?codigobanco=' + value.CodBanco +
                    '&demonstrativo1=' + value.Demonstrativo1 +
                    '&demonstrativo2=' + value.Sacado4 +
                    '&valor_cobrado=' + value.Valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.") +
                    '&dataVenc=' + value.DtVencimento +
                    '&sacado=' + value.Sacado1 +
                    '&nosso_numero=' + value.NNro +
                    '&cedente=' + value.Cedente +
                    '&codigoCedente=' + value.CodigoCedente +
                    '&numero_documento=' + value.NroDoc +
                    '&cpf_cnpj=' + value.CNPJ +
                    '&endereco1=' + value.Sacado2 +
                    '&endereco2=' + value.Sacado3 +
                    '&instrucoes1=' + value.Mensagem +
                    '&LD=' + value.LD +
                    '&CB=' + value.CB +
                    '&carteira=' + value.CarteiradeCobranca +
                    '&data-escola=' + $("#codEscola").val() + '" ><i class="fa fa-print"></i> Visualizar Boleto</a>' +
                    '</div> ' +
                    '</div>' +
                    '</div>' +
                    '</div>';*/
            });

            /*vscript = vscript + '</div></div></div></div>';

            $("#content").empty();
            $("#content").html(vscript);
            $('body').loadingModal('destroy');*/
            $('.ld').off('click').on('click', copiar_linha_digitavel);

            $('.modal-header2').addClass('bg-' + $("#cor").val());
            $('.botao').first().trigger('click');
            $('#myModal').modal('show');
        }
    });
};