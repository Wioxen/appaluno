function boletoClick(event) {
    if (event) event.preventDefault();

    var vEscola   = $(".fotoAtual").attr("data-escola");
    var vRM       = $(".fotoAtual").attr("data-codigo");
    var vSenhaNet = $(".fotoAtual").attr("data-passnet");

    window.open(`https://alunoapp.sistema2.com.br/url.php?codescola=${vEscola}&url=https://alunoapp.sistema2.com.br/boleto.php?codescola=${vEscola}&codigo=${vRM}&senhanet=${vSenhaNet}`);
}
