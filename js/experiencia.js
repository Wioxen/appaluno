function experienciaClick(event) {
    var count = 0;
    $.ajax({
        type: "GET",
        "headers": {
            "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f"
        },
        dataType: "json",
        url: "http://www.sistema2.com.br/webapisae/api/buscaAppNot?Escola=" + $("#codEscola").val() + "&uniqueID=" + $("#uniqueID").val(),
        beforeSend: aguarda,
        error: exibeErro,
        success: function (data) {
            var vscript = '<div class="row box-body" style="1px solid #e6e6e6">' +
                '<div class="col-md-6" style="1px solid #e6e6e6">' +
                '<div class="box box-solid" style="1px solid #e6e6e6">' +
                '<div class="box-body">';

            $.each(data, function (index, value) {
                if (value.Link.indexOf("Experiência") != -1) {
                    vscript = vscript + '<div class="user-block">' +
                        '<img class="img-circle" src="data:image/jpeg;base64,' + localStorage.getItem("img" + value.Codigo) + '" alt="' + localStorage.getItem("img" + value.Codigo) + '">' +
                        '<span class="username"><a href="#">' + value.Titulo + ' </a></span>' +
                        '<span class="description">' + value.Data.split(' ')[0].split('/')[0] + ' de ' + value.Data.split(' ')[0].split('/')[1] + ' de ' + value.Data.split(' ')[0].split('/')[2] + '</span>' +
                        '<span class="description">' + value.Data.split(' ')[1].split(':')[0] + 'h' + value.Data.split(' ')[1].split(':')[1] + 'min</span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="box-body">' +
                        '<p style="text-align: justify; text-justify: inter-word;">' + value.Texto + '</p>' +
                        isImagem +
                        isEnquete +
                        isOcorrencia +
                        isExperiencia +
                        '<div>' +
                        '</div><hr><div class="clearfix"><br></div>';
                }
            });

            vscript = vscript + '</div></div></div>';

            $("#content").empty();
            $("#content").html(vscript);
            $('body').loadingModal('destroy');

            $(".docs").click(function (e) {
                e.preventDefault();
                $.fancybox.open({
                    src: $(this).attr('data-link'),
                    type: 'iframe',
                    opts: {
                        afterShow: function (instance, current) {
                            console.info('done!');
                        }
                    }
                });
            });

            $(".fancybox").fancybox({
                afterShow: function () {
                    $('.notificacao').trigger('click');
                    $('.fancybox-button--share').remove();
                },
                helpers: {
                    title: {
                        type: 'inside'
                    }, //<-- add a comma to separate the following option
                    buttons: {} //<-- add this for buttons
                },
                closeBtn: false, // you will use the buttons now
                arrows: false
            });

            $(".phone").on("click", function () {
                document.location.href = "tel:" + $(this).attr('data-phone');
            });

            $(".mail").on("click", function (e) {
                document.location.href = "mailto:" + $(this).attr('data-mail');
            });
        }
    });

}