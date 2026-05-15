function alunosClick(event) {
    $(".alunos").remove();
    $("#dvAlunos").html('<div id="dvload2" class="col-xs-12 text-center">'+
        '<a href="#" class="">'+
            '<img src="images/simple_loading.gif" style="width: 50px;" />'+
        '</a>'+
    '</div>');

    $("#dvAlunos").empty();

    $.each($alunos, function (i, v) {
        //var vnome = v.Descricao.split(' ')[0] + ' ' + v.Descricao.substr(v.Descricao.lastIndexOf(' ') + 1);
        var vnome = v.Descricao;
        var vfoto = v.Foto.replace('https://digite1.websiteseguro.com','http://digite.com.br');
        var $turma = $.trim(v.CodCurso) + '-' + $.trim(v.Turma);

        $("#dvAlunos").append('<div class="alunos col-xs-3 text-center ' + (($(".fotoAtual").attr("data-codigo") === v.Codigo) ? "hidden" : "") + '""><a id="aluno-'+v.Codigo+'" href="#" data-nome="' + vnome + '" data-curso="' + v.Curso +
            '" data-turma="' + v.Turma + '" data-codigo="' + v.Codigo + '" data-saida="' + v.SaidaDoAluno +
            '" data-tipoacesso="' + v.TipoAcesso + '"' +
            '" data-alunoCurso="' + v.alunoCurso + '"' +
            '" data-alunoTurma="' + v.alunoTurma + '"' +
            '" data-ciclo="' + v.Ciclo + '"' +
            '" data-escola="' + v.Escola + '"  data-passnet="' + v.SenhaNet + '" data-codcurso="' + v.CodCurso + '" data-cursoturma="' + v.Curso + v.Turma.trim() + '" data-turma2="' + $turma + '" class="ialunos"><img id="img' + v.Codigo + '" src="'+vfoto+'" class="img-circle" alt="' + vnome + '" style="height: 60px; width: 60px; margin-bottom: 5px;"></a>' +
            '</div>');

        if (($local !== undefined) && ($local !== null)) {
            $dados_local = $local[$local.findIndex(obj => obj.codigo === v.Codigo)];
        }

        if (($dados_local !== undefined) && ($dados_local !== null)&& ($.inArray(vEscola, ['80']) !== -1)) {
            $('#aluno-' + v.Codigo).attr('data-curso', $dados_local.dcurso.toUpperCase());
            $('#aluno-' + v.Codigo).attr('data-turma', $dados_local.dturma.toUpperCase());
            if ($dados_local.foto !== null)
                $("#img" + v.Codigo).attr("src", "data:image/jpg;base64," + $dados_local.foto);
        }
    });

    $(".ialunos").off('click').on('click', trocaAlunoClick);
}

function trocaAlunoClick(event) {
    if (($local !== undefined) && ($local !== null) && ($.inArray(vEscola, ['80']) !== -1)) {
        $dados_local = $local[$local.findIndex(obj => obj.codigo === $(this).attr('data-codigo'))];
        if (($dados_local !== undefined) && ($dados_local !== null)) {
            $('#label-turma').text($dados_local.turma.toUpperCase());
        }
    }

    $(".nomeAluno").text($(this).attr('data-nome'));
    $(".nomeCurso").text($(this).attr('data-curso').toUpperCase());
    $(".saida").text($(this).attr('data-saida'));
    $(".nometurma").text($(this).attr('data-turma'));
    $(".fotoAtual").attr("alt", $(this).attr('data-nome').substr(0, 28));
    $(".fotoAtual").attr("src", $("#img" + $(this).attr('data-codigo')).attr("src"));
    $(".fotoAtual").attr("data-escola", $(this).attr('data-escola'));
    $(".fotoAtual").attr("data-codigo", $(this).attr('data-codigo'));
    $(".fotoAtual").attr("data-tipoacesso", $(this).attr('data-tipoacesso'));
    $(".fotoAtual").attr("data-passnet", $(this).attr('data-passnet'));
    $(".fotoAtual").attr("data-cursoturma", $(this).attr('data-cursoturma'));
    $(".fotoAtual").attr("data-curso", $(this).attr('data-curso').replace('°','').trim());
    $(".fotoAtual").attr("data-codcurso", $(this).attr('data-codcurso'));
    $(".fotoAtual").attr("data-turma2", $(this).attr('data-turma2'));
    $(".fotoAtual").attr("data-alunoCurso", $(this).attr('data-alunoCurso'));
    $(".fotoAtual").attr("data-alunoTurma", $(this).attr('data-alunoTurma'));
    $(".fotoAtual").attr("data-ciclo", $(this).attr('data-ciclo'));

    $('#lbcodigo').text('RM - ' + ('000000' + $(this).attr('data-codigo')).slice(-6));

    vRM = $(this).attr('data-codigo');
    vTipoAcesso = $(this).attr('data-tipoacesso');
    vCiclo = $(this).attr('data-ciclo');
    vCurso = $(this).attr('data-codcurso');
    vTurma = $(this).attr('data-turma');
    vNomeAluno = $.trim($(".nomeAluno").text());
    vSenhaNet = $(this).attr('data-passnet');
   
    

    $(".home").off('click').on('click', homeClick).click();
}