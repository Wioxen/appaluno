var VerMarticula = ["205", "174","152","177"];
var codEscola = $(".fotoAtual").attr("data-escola");

if ($.inArray(codEscola, VerMarticula) != -1) {
    $('.btnMatricula').append('<form name="form" method="post" action="http://www.sistema2.com.br/Matricula/Default.aspx">' +
        '<label></label>' +
        '<input type="hidden" name="codEscola" id="codEscola" value="' + codEscola + '">' +
        '<input type="submit" class="btn btn-primary" value="FAÇA A SUA MATRÍCULA 2021">' +
        '</form>');
} else {
    
}