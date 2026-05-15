function cliqueAula() {
    $('#modalfoto').attr('src', $('#imgfoto').attr('src'));
    $('#modaltitulo').text($(this).find('strong').text());
    //$('#imgModal').attr('src', "./images/" + $("#codEscola").val() + ".png");

    //$('#exampleModal1').modal('show');
    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: "https://www.api.sistema2.com.br/WebApiSae/api/aula?Escola=" + $(".fotoAtual").attr("data-escola") + "&Codigo=" + $(".fotoAtual").attr("data-codigo"),
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
            $('#exampleModal1').modal('hide');
            $('.modal-body2').html('<div class="panel-group" id="accordion"></div>');
            $.each(data.data, function (index, value) {
                var vtexto = "";
                switch (value.id) {
                    case "1": vtexto = "";
                        break;
                    case "2": vtexto =  "Segunda";
                        break;
                    case "3": vtexto =  "Terça";
                        break;
                    case "4": vtexto =  "Quarta";
                        break;
                    case "5": vtexto =  "Quinta";
                        break;
                    case "6": vtexto =  "Sexta";
                        break;
                    case "7": vtexto =  "Sábado";
                        break;
                }
                $('#accordion').append(
                    '  <div class="panel panel-default">' +
                    '    <div id="panel-heading' + value.id + '" class="panel-heading bg-' + $("#cor").val()+'">' +
                    '      <h4 class="panel-title">' +
                    '        <a style="color: #FFFFFF;text-decoration: none;" id="clique' + value.id + '" class="btn-block" data-toggle="collapse" data-parent="#accordion" href="#collapse' + value.id + '"><i class="fa fa-calendar" style="margin-right: 10px;"></i> ' + vtexto + '</a>' +
                    '      </h4>' +
                    '    </div>' +
                    '    <div id="collapse' + value.id +'" class="panel-collapse collapse"><ul class="list-group list-group-flush"></ul></div>' +
                    '    </div>' +
                    '  </div>');

                $.each(value.aula, function (i, v) {
                    $('#collapse' + value.id + ' .list-group-flush').append('<li class="list-group-item d-flex justify-content-between align-items-center">' +
                        '<p><strong>' + v.disciplina +'</strong>'+
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
/*function cliqueAula() {

    $('#content').empty();
    $('#content').append('<div class="box-body">' +
        '<div class="box box-body box-solid box-default">' +
        '<div>' +
        '<select class="form-control vAula">' +
        '<option value="2">Segunda-feira</option>' +
        '<option value="3">Terça-feira</option>' +
        '<option value="4">Quarta-feira</option>' +
        '<option value="5">Quinta-feira</option>' +
        '<option value="6">Sexta-feira</option>' +
        '</select>' +
        '</div>' +
        '<div class="abc">' +
        '<div class="box box-solid">' +
        '<div class="box-body no-padding">' +
        '<ul class="nav nav-pills nav-stacked">' +
        '</ul>' +
        ' </div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');

    $('.vAula').on('change', function () {
        $('.box-title').text($(this).text());
        console.log($(this).attr("data-dia"));
        jQuery.ajax({
            type: "POST",
            "headers": {
                "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f"
            },
            dataType: "json",
            url: "http://www.sistema2.com.br/WebApiSae/api/BuscaAula",
            data: { 'Escola': $(".fotoAtual").attr("data-escola"), 'Codigo': $(".fotoAtual").attr("data-codigo"), 'Dia': $(this).val() },
            beforeSend: aguarda,
            error: exibeErro,
            success: function (data) {
                $(".modal-backdrop").remove();
                $(".modal-backdrop").hide();
                $("#exampleModal1 > div > div > div.modal-header > button").trigger('click');
                $('body').loadingModal('destroy');
                $('.nav-stacked').empty();
                var color = ["bg-green"];
                var pd = "";
                var a = 0;
                var vDisc = "";
                $.each(data, function (i, v) {
                    a = i+1;
                    for (var ii = 0; ii < i; ii++) {
                        color.push("bg-yellow", "bg-aqua", "bg-red", "bg-green");
                    }
                    if (i == 0) {
                        $('.nav-stacked').append('<div class="col-md-3 col-sm-6 col-xs-12" style="margin-top:1em">' +
                            '<div class="info-box">' +
                            '<span class="info-box-icon ' + color[i] + '" style="font-size:20px">' +
                            '<i class="ion ion-ios-gear-outline">' + a + 'º</i></span > ' +
                            '<i class="ion ion-ios-gear-outline">&nbsp;&nbsp;&nbsp;&nbsp;' + v.Inicio + ' às ' + v.Fim + '</i></span > ' +
                            '<div class="info-box-content">' +
                            '<span class="info-box-text">' + v.Descricao.split("</br>")[1] + '</span>' +
                            '<span class="info-box-number">' + v.Descricao.split("</br>")[0] + '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>');
                    } else {
                        if (vDisc == v.Descricao.split("</br>")[0]) {
                            $('.nav-stacked').append('<div class="col-md-3 col-sm-6 col-xs-12" style="margin-top:-1.1em">' +
                                '<div class="info-box">' +
                                '<span class="info-box-icon ' + color[i - 1] + '" style="font-size:20px">' +
                                '<i class="ion ion-ios-gear-outline">' + a + 'º</i></span> ' +
                                '<i class="ion ion-ios-gear-outline">&nbsp;&nbsp;&nbsp;&nbsp;' + v.Inicio + ' às ' + v.Fim + '</i></span > ' +
                                '<div class="info-box-content">' +
                                '<span class="info-box-text">' + v.Descricao.split("</br>")[1] + '</span>' +
                                '<span class="info-box-number">' + v.Descricao.split("</br>")[0] + '</span>' +
                                '</div>' +
                                '</div>' +
                                '</div>');
                        } else {
                            $('.nav-stacked').append('<div class="col-md-3 col-sm-6 col-xs-12" style="margin-top:-1.1em">' +
                                '<div class="info-box">' +
                                '<span class="info-box-icon ' + color[i] + '" style="font-size:20px">' +
                                '<i class="ion ion-ios-gear-outline">' + a + 'º</i></span > ' +
                                '<i class="ion ion-ios-gear-outline">&nbsp;&nbsp;&nbsp;&nbsp;' + v.Inicio + ' às ' + v.Fim + '</i></span > ' +
                                '<div class="info-box-content">' +
                                '<span class="info-box-text">' + v.Descricao.split("</br>")[1] + '</span>' +
                                '<span class="info-box-number">' + v.Descricao.split("</br>")[0] + '</span>' +
                                '</div>' +
                                '</div>' +
                                '</div>');
                        }
                        
                    }
                    pd = v.Descricao.split("</br>")[1] + v.Descricao.split("</br>")[1]
                    vDisc = v.Descricao.split("</br>")[0];
                    //$('.nav-stacked').append('<li class="active" style="padding:0.5em">' +
                    //    '<a>' + v.Aula + 'º Horário <i class="fa fa-clock-o"></i>' + v.Inicio + ' às ' + v.Fim + '</a>' +
                    //    '<a><i class="fa fa-user-o"></i> Professor: ' + v.Descricao.split("</br>")[1] + '</a>' +
                    //    '<a><i class="fa fa-window-maximize"></i> Disciplina: ' + v.Descricao.split("</br>")[0] + '</a>' +
                    //    '</li>');
                });
            }

        });
    })

    $('.vAula').trigger('change');
    $('body').loadingModal('destroy');
};
*/