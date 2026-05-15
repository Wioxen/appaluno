function clickAniversario() {
    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: "http://www.sistema1.net/api/api/mbAlunoTurma/" + $('.fotoAtual').attr('data-escola') + "," + $('.fotoAtual').attr('data-codigo') + "",
        beforeSend: aguarda,
        error: exibeErro,
        success: function (data) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;

            $('#content').empty();

            $('#content').append('<br><div class="col-md-6">' +
                '<div class="box box-default">' +
                '<div class="box-header with-border">' +
                '<div class="box-body no-padding">' +
                '<ul class="users-list clearfix">' +
                '</ul>' +
                '</div>' +
                '<div class="box-footer text-center">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div><br>');
            $.each(data, function (index, value) {
                if (value.dtnasc.split('/')[1] == mm) {
                    $('.users-list').append('<li>' +
                        '<img src=' + value.foto + ' class="img-responsive">' +
                        '<span class="users-list-date">' + value.descricao.split(' ')[0] + '</span>' +
                        '<span class="users-list-date">' + value.dtnasc + '</span>' +
                        '</li>');
                }
            });
        }
    });
    $('body').loadingModal('destroy');
}
