function declaracaoirClick(e) {
    var $this = $(this);

    $('.modal-body2').css('height', 'calc(100% - 70px)');
    $('.modal-footer2').hide();
    $('#modalfoto').attr('src', $('#imgfoto').attr('src'));
    $('#modaltitulo').text($(this).find('strong').text());

    $.ajax({
        type: "GET",
        dataType: "json",
        beforeSend: aguarda,
        url: "https://www.api.sistema2.com.br/WebApiSae/api/seinet/ir?codEscola=" + $(".fotoAtual").attr("data-escola") + "&pMatricula=" + $(".fotoAtual").attr("data-codigo"),
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

            $('.modal-body2').html('<div style="padding: 10px;"></div>');

            $.each(data, function (i, v) {
                $(".modal-body2 > div").append(
                    '<button data-ano="' + v.ANO + '" id="ir-' + v.ANO + '" class="btn-ir btn btn-default btn-block bg-' + $('#cor').val() + '" style="float: left;font-size: 20px;">DEMONSTRATIVO DO ANO DE ' + v.ANO + ' <i class="fa fa-angle-right" style="float: right;font-size: 30px;"></i></button>');
                $('#ir-' + v.ANO).attr("data-loading-text", "<i class='fa fa-circle-o-notch fa-spin'></i>  Processando...");
            });

            $('.btn-ir').off('click').on('click', irClick);

            $('.modal-header2').addClass('bg-' + $("#cor").val());

            $("#idTitulo").text($this.text());
            $('#modalfoto').attr('src', $('#imgfoto').attr('src'));
            $('#modaltitulo').text($this.find('strong').text());

            $('#myModal').modal('show');
        }
    });
}

function irClick(e) {
    var $this = $(this);

    e.preventDefault();

    var $isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());

    if ($isiPhone) {
        var $href = "ir.html?codEscola=" + $(".fotoAtual").attr("data-escola") + "&codigo=" + $(".fotoAtual").attr("data-codigo") + "&ano=" + $this.attr('data-ano');
        setTimeout(function () {
            window.open($href, '_blank');
        }, 600);
    } else {
        var $url = "https://www.sistema2.com.br/appaluno/ir.html?codEscola=" + $(".fotoAtual").attr("data-escola") + "&codigo=" + $(".fotoAtual").attr("data-codigo") + "&ano=" + $this.attr('data-ano');

        var $href2 = 'https://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + $(".fotoAtual").attr("data-escola") + '&url=' + $url;

        setTimeout(function () {
            window.open($href2, '_blank');
        }, 600);
    }
}