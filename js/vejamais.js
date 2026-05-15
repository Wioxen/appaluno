var arrAgenda1 = ["SEQUÊNCIA", "ALMANAQUE", "AGENDA"];
function exibeVeja(data) {
    $("#exampleModal1").modal('hide');
    $('.modal-body2').css('height', 'calc(100% - 70px)');
    $('.modal-footer2').hide();

    $('.modal-body2').html('<ul class="list-group list-group-flush"></ul>');

    //$(".modal-body2 > ul").append('<a href="'+'http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + $(".fotoAtual").attr("data-escola") + '&url=' + 'https://www.google.com/'+'" target="blank">Google</a>');

    $.each(data, function (index, value) {
        $(".modal-body2 > ul").append('<li class="list-group-item botaoVejaMais" data-id="' + value.Id + '" style="padding-top: 0px;padding-bottom: 0px;">'+
            ((value.dataHora.split(' ')[1] == undefined) ?
             '<p class="text-right">&nbsp;</p>' + value.Descricao.toUpperCase() + '<p id="loadvj' + value.Id + '" class="text-right"></p>'  :
             '<p class="text-right"><i class="fa fa-calendar"></i> <span style="margin-right: 10px;">' + value.dataHora.split(' ')[0] + '</span> <i class="fa fa-clock-o"></i> ' + value.dataHora.split(' ')[1]+'</p>' + value.Descricao.toUpperCase() + '<p id="loadvj' + value.Id + '" class="text-right"></p>')+
            '</li>');
                 //if (arrAgenda1.indexOf(value.Descricao.split(' ')[0]) == -1) {
        //    console.log(value.Descricao.split(' ')[0]);
        //}
    });

    $('.modal-header2').addClass('bg-' + $("#cor").val());
    $('#myModal').modal('show');

    $(".botaoVejaMais").click(function () {
        var _this = $(this);
        $("#loadvj" + _this.attr('data-id')).empty();
        jQuery.ajax({
            type: "GET",
            dataType: "json",
            url: 'https://www.api.sistema2.com.br/webapisae/api/vejaMais/' + _this.attr('data-id'),
            beforeSend: function () {
                $("#loadvj" + _this.attr('data-id')).html('<img src="images/simple_loading.gif" style="height: 32px; width: auto;">');
            },
            success: function (data) {
                var _href = 'http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + data.Escola + '&url=' + data.Link;

                var isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());

                if (isiPhone) {
                    if (vs === "1")
                        _href = data.Link;
                }

                setTimeout(function () {
                    console.log('2.2.2');
                    $("#loadvj" + _this.attr('data-id')).empty();
                    window.open(_href, '_blank');
                }, 500);
            }
        });
    });
}


function carregaVeja($this,codEscola, matricula) {
    jQuery.ajax({
        type: "POST",
        "headers": { "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f" },
        dataType: "json",
        url: "https://www.api.sistema2.com.br/webapisae/api/buscaVejaMais",
        data: { 'Escola': codEscola, 'Codigo': matricula },
        //beforeSend: aguarda,
        error: function (xhr, status, errorThrown) {
            $('#exampleModal1').modal('hide');

            if (parseInt($(".fotoAtual").attr("data-escola")) === 80) {
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
        success: exibeVeja
    });
}

function cliqueVeja(event) {
    event.preventDefault();

    aguarda();

    $this = $(this);

    $("#idTitulo").text($this.text());
    $('#modalfoto').attr('src', $('#imgfoto').attr('src'));
    $('#modaltitulo').text($this.find('strong').text());
    $('.modal-header2').addClass('bg-' + $("#cor").val());

    var matricula = $(".fotoAtual").attr("data-codigo");
    var codEscola = $(".fotoAtual").attr("data-escola");

    if (parseInt(codEscola) === 80) {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: { 'Escola': codEscola, 'Codigo': matricula },
            url: "https://www.api.sistema2.com.br/WebApiSae/Bloqueado",
            success: function (data) {
                if (data.bloqueado === true) {
                    exibeErro080();
                } else {
                    jQuery.ajax({
                        type: "POST",
                        dataType: "json",
                        data: { 'Escola': codEscola, 'Codigo': matricula },
                        url: "https://www.api.sistema2.com.br/webapisae/api/seinet/vm",
                        beforeSend: aguarda,
                        error: exibeErro,
                        success: exibeVeja
                    });
                }
            }
        });
    } else {
        carregaVeja($this, codEscola, matricula);
    }
}
