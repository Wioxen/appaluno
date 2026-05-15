function exibeAgenda(data) {
    $("#exampleModal1 > div > div > div.modal-header > button").trigger('click');
    var escola = $(".fotoAtual").attr("data-escola");
    $('#content').empty();
    $('#content').append('<div class="row" style="min-height: 250px;padding: 10px">' +
        '<div class="col-md-12">' +
        '<div class="box box-default">' +
        '<div class="box-body">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
    
    $.each(data, function (index, value) {
        if (value.Descricao.split(' ')[0] == "AGENDA") {
            console.log(value.Descricao)
            $("#content > div > div > div > div").append('<div class="box-header with-border">' +
                '<i class="fa fa fa-hand-o-up"></i>' +
                '<h3 class="box-title">' +
                '<a target="_blank" class="botaoVejaMais" data-id="' + value.Id + '" data-link="http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + escola + '&url=' + value.Link + '">' + value.Descricao + '</a>' +
                '</h3> ' +
                '</div>');
        }
    });

    $.each($(".botaoVejaMais"), function (a, b) {
        var _this = $(this);
        var vejaApi = 'https://www.api.sistema2.com.br/webapisae/api/vejaMais/' + _this[0].attributes[2].value;
        $.getJSON(vejaApi, function (data) {
            if (data.dtLiberacao == null) {
                _this.attr('href', _this.attr('data-link'));
            }
        });
    });
}


function cliqueAgenda(event) {
    event.preventDefault();
    $(".mn").removeClass("active");
    $(this).addClass("active");
    $("#idTitulo").text($(this).text());
    var matricula = $(".fotoAtual").attr("data-codigo");
    var codEscola = $(".fotoAtual").attr("data-escola");

    jQuery.ajax({
        type: "GET",
        "headers": { "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
        dataType: "json",
        url: "http://www.sistema2.com.br/webapisae/api/buscaVejaMais?Escola=" + codEscola + "&Codigo=" + matricula,
        beforeSend: aguarda,
        error: exibeErro,
        success: exibeAgenda
    });
    $('body').loadingModal('destroy');
}
