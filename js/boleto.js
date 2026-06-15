function copiar_linha_digitavel(e) {
    e.preventDefault();

    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = $(this).attr('data-ld');
    sampleTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);

    $.toast({
        text: "Linha digitável copiada com sucesso",
        hideAfter: 3000,
        position: 'bottom-center',
        showHideTransition: 'fade'
    });
}

function boletoClick(event) {
    if (event) event.preventDefault();

    var vEscola   = $(".fotoAtual").attr("data-escola");
    var vRM       = $(".fotoAtual").attr("data-codigo");
    var vSenhaNet = $(".fotoAtual").attr("data-passnet");

    window.open(`https://alunoapp.sistema2.com.br/url.php?codescola=${vEscola}&url=https://alunoapp.sistema2.com.br/boleto.php?codescola=${vEscola}&codigo=${vRM}&senhanet=${vSenhaNet}`);
}
