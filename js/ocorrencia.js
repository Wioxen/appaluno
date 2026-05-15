function ocorrenciaClick(event) {
    event.preventDefault();

    $('.modal-body2').css('height', 'calc(100% - 70px)');
    $('.modal-footer2').hide();
    $('#modalfoto').attr('src', $('#imgfoto').attr('src'));
    $('#modaltitulo').text($(this).find('strong').text());

    $("#exampleModal1").modal('hide');

    $.ajax({
        type: "POST",
        "headers": {
            "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f"
        },
        dataType: "json",
        url: "http://www.sistema2.com.br/WebApiSae/api/buscaOcorrencia",
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
            /*$(".modal-backdrop").remove();
            $(".modal-backdrop").hide();
            $("#exampleModal1 > div > div > div.modal-header > button").trigger('click');*/

            var vscript = '<ul class="timeline">';
            var vData = "";
            $.each(data, function (index, value) {
                if (vData !== value.Data.substr(0, 10)) {
                    /*vscript = vscript + '<li class="time-label">';
                    vscript = vscript + '<span class="bg-' + $("#cor").val() + '">';
                    vscript = vscript + value.Data.substr(0, 2) + " " + zMesExtenso(value.Data.substr(3, 2)).substr(0, 3) + ". " + value.Data.substr(6, 4);
                    vscript = vscript + '</span>';
                    vscript = vscript + '</li>';*/
                    vscript = vscript + '<li class="time-label" style="padding-top: 0px;padding: 0px;"><span class="bg-' + $('#cor').val() + '"> <i class="fa fa-calendar" style="margin-right: 10px;"></i> ' + zMesExt(value.Data.substr(0, 10)) + '</li>';
                }

                vscript = vscript + '<li>';
                vscript = vscript + '<li> <a><img class="fotoOcorrencia" data-codigo="' + value.Matricula + '" src="data:image/jpeg;base64,' + localStorage.getItem("img" + value.Codigo) + '" alt="Foto"></a>';
                vscript = vscript + '<div class="timeline-item">';
/*                if (value.Hora.substr(0, 5) !== "00:00") {
                    vscript = vscript + '<span class="time"><i class="fa fa-clock-o"></i> ' + value.Hora.substr(0, 5) + '</span>';
                }*/
                vscript = vscript + '<div class="timeline-header">';
                switch (value.Positivo) {
                    case "N": vscript = vscript + '<i class="fa fa-square text-red"></i>';
                        break;
                    case "P": vscript = vscript + '<i class="fa fa-square text-green"></i>';
                        break;
                    case "U": vscript = vscript + '<i class="fa fa-square text-aqua"></i>';
                        break;
                }
                vscript = vscript + ' <span style="font-weight:bold;font-size: 14px;">' + value.Descricao + '</span>';
                if ((value.Hora.substr(0, 5) !== "00:00") && ($.trim(value.Hora) !== ':  :')) {
                    vscript = vscript + '<span class="time" style="float: right;"><i class="fa fa-clock-o"></i> ' + value.Hora.substr(0, 5) + '</span>';
                }
                vscript = vscript + '</div>';
                vscript = vscript + '<div class="timeline-body">';
                vscript = vscript + '<div>';
//                vscript = vscript + '<p style="text-align: right;"><span class="time"><i class="fa fa-calendar"></i> ' + value.Data.split('/')[0] + ' de ' + zMesExtenso(value.Data.split('/')[1]) + ' de ' + value.Data.substr(6, 4) + '</span>';
                vscript = vscript + '</p>';

                vscript = vscript + '<p style="text-align: justify;text-justify:inter-word;" class="message">' + value.Detalhe + '</p>';
                vscript = vscript + '<p style="text-align: right;" class="message">RELATOR -> ' + value.Relator + '</p>';
                vscript = vscript + '</div>';
                vscript = vscript + '</div>';
                vscript = vscript + '<div class="timeline-footer">';
                vscript = vscript + '<div class="row">';

                if (value.Email !== "") {                    
                    vscript = vscript + '<div class="col-xs-6"><a class="btn btn-default btn-block btn-oco" href="mailto://' + value.Email + '" target="_blank" class="btn btn-default btn-xs" style="font-size:22px"><i class="fa fa-envelope fa-oco"></i></a></div>';
                }
                if (value.Telefone !== "") {
                    vscript = vscript + '<div class="col-xs-6"><a class="btn btn-default btn-block btn-oco" href="tel://' + value.Telefone + '" target="_blank" style="font-size:22px" ><i class="fa fa-phone fa-oco"></i></a></div>';
                }

                vscript = vscript + '</div>';
                vscript = vscript + '</div>';
                vscript = vscript + '</div>';
                vscript = vscript + '</li>';

                vData = value.Data.substr(0, 10);
                
            });
            

            vscript = vscript + '</ul>';

            $('#exampleModal1').modal('hide');
            $('.modal-header2').addClass('bg-' + $("#cor").val());
            $('#myModal .modal-body').html("<div class='row' style='margin-top: 10px; margin-left: 0px;'><div class='col-md-12'>" + vscript + "</div></div>");

            $.each($('.fotoOcorrencia'), function (a, b) {
                var _this = $(this);
                var $aluno = $alunos[$alunos.findIndex(obj => obj.Codigo === _this[0].attributes[1].value)];
                _this[0].attributes[2].value = $aluno.Foto;
            });

            $('.btn-oco').css('background-color', $('#boxInicio').css('background-color'));
            $('.fa-oco').css('color', 'white');
            
            $('#myModal').modal('show');

            setTimeout(function () {
                $('#myModal .modal-body').scrollTop(0);
            }, 300);

            /*$("#content").empty();
            $("#content").html("<div class='row' style='margin-top: 10px; margin-left: 0px;'><div class='col-md-12'>" + vscript + "</div></div>");

            $.each($('.fotoOcorrencia'), function (a, b) {
                var _this = $(this);
                var $aluno = $alunos[$alunos.findIndex(obj => obj.Codigo === _this[0].attributes[1].value)];
                _this[0].attributes[2].value = $aluno.Foto;
            });*/
        }
    });


}