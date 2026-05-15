function clickDocumento(event) {
    event.preventDefault();

    $('.modal-body2').css('height', 'calc(100% - 70px)');
    $('.modal-footer2').hide();

    if ($local === undefined) {
        $.toast({
            text: "Nenhum registro foi encontrado",
            hideAfter: 3000,
            position: 'top-center',
            showHideTransition: 'fade'
        });

        return false;
    }

    var $aluno = $alunos[$alunos.findIndex(obj => obj.Codigo === $(".fotoAtual").attr("data-codigo"))];
    var $documentos = $local[$aluno.Id].documento;

    if (parseInt($documentos.totalCount) === 0) {
        $.toast({
            text: "Nenhum registro foi encontrado",
            hideAfter: 3000,
            position: 'top-center',
            showHideTransition: 'fade'
        });

        return false;
    }

    $("#exampleModal1").modal('hide');

    $('.modal-body2').html('<ul class="list-group list-group-flush"></ul>');

    $.each($documentos.data, function (index, value) {
        $(".modal-body2 > ul").append('<li class="list-group-item" data-id="' + value.Id + '"><h3><strong>' + value.descricao +'</strong></h3></li>');
    });

    $('.modal-header2').addClass('bg-' + $("#cor").val());
    $('#modalfoto').attr('src', $('#imgfoto').attr('src'));
    $('#modaltitulo').text($(this).find('strong').text());
    $('#myModal').modal('show');
}
