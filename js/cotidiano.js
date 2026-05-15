function cotidianoClick(event) {
    $.ajax({
        type: "POST",
        "headers": {
            "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f"
        },
        dataType: "json",
        url: "http://www.sistema2.com.br/WebApiSae/api/BuscaCotidiano",
        data: { 'Escola': $(".fotoAtual").attr("data-escola"), 'Codigo': $(".fotoAtual").attr("data-codigo"), 'Categoria': $(this).data('codigo') },
        beforeSend: aguarda,
        error: exibeErro,
        success: function (data) {

            var _Data = "";
            var vscript = '<ul class="timeline">';

            $.each(data, function (index, value) {
                if (_Data != value.Data.substr(0, 10)) {
                    vData = value.Data.substr(0, 10);
                    vscript = vscript + '<li class="time-label">';
                    vscript = vscript + '<span class="bg-' + $("#cor").val() + '">';
                    vscript = vscript + value.Data.substr(0, 2) + " " + zMesExtenso(value.Data.substr(3, 2)).substr(0, 3) + ". " + value.Data.substr(6, 4);
                    vscript = vscript + '</span>    ';
                    vscript = vscript + '</li>';
                    vscript = vscript + '<li>';
                    vscript = vscript + '<li> <a><img class="fotoOcorrencia" src="data:image/jpeg;base64,' + localStorage.getItem("img" + $(".fotoAtual").attr("data-codigo")) + '" alt="Message User Image"></a>';
                    vscript = vscript + '<i></i>';
                    vscript = vscript + '<div class="timeline-item">';
                    vscript = vscript + '<div class="box box-default color-palette-box"><div class="box-body item">';
                    vscript = vscript + '<ul class="nav nav-pills nav-stacked" id="' + value.Data.substr(0, 10).replace('/', '').replace('/', '') + '">';
                    vscript = vscript + '</ul>';
                    vscript = vscript + '</div></div></div>';
                    vscript = vscript + '</li>';
                }
                _Data = value.Data.substr(0, 10);
            });

            vscript = vscript + '</ul>';

            $("#content").empty();
            $("#content").html("<div class='row' style='margin-top: 10px; margin-left: 0px;'><div class='col-md-12'> " + vscript + "</div></div>");
            $.each(data, function (index, value) {
                switch (index) {
                    case 0:
                        $("#" + value.Data.substr(0, 10).replace('/', '').replace('/', '')).append('<tr><th align="center" style="padding-left:10px;">Cotidiano</th><th align="center" style="padding-left:10px;">Item</th></tr>');
                        break;
                }
                //$("#" + value.Data.substr(0, 10).replace('/', '').replace('/', '')).append('<tr">' + value.Cotidiano + ':</tr>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + value.Item + '<td><img style="width:15px" src="' + value.Imagem + '"/></td>');
                $("#" + value.Data.substr(0, 10).replace('/', '').replace('/', '')).append('<tr style="border-bottom:1pt solid #E9E9E9"><td style="border-right:1pt solid #EEEFF0;padding:10px" align="left"><span class="badge" style="width:95%;padding-left:10px;">' + value.Cotidiano + '</span><td align="left">&nbsp;&nbsp;&nbsp;<span>' + value.Item + '<br>&nbsp;&nbsp;&nbsp;<img style="width:15px;margin-bottom:0.5em;" src="' + value.Imagem + '"/></span></td></tr>');
            });
            $('body').loadingModal('destroy');
        }
    });
}