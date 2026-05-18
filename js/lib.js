var vs = "";
var $dados = {};
var $alunos = [];
var $local = [];
var $isiPhone = false;
var vEscola = undefined;
var vRM = undefined;
var vTipoAcesso = undefined;
var vCiclo = undefined;
var vCurso = undefined;
var vTurma = undefined;
var vAno = '2026';
var vNomeAluno = undefined;
var vUniqueID = undefined;
var vSenhaNet = undefined;
var id = undefined;

$(document).ready(function () {
    // Abre o modal de loading IMEDIATAMENTE, antes de qualquer outra inicialização.
    // O splash em #preloadSplash continua visível por baixo, evitando qualquer flash do conteúdo.
    $('#exampleModal2').modal({ backdrop: 'static', keyboard: false, show: true });

    // Garante que o app sempre será revelado, em qualquer cenário.
    // Idempotente — pode ser chamado várias vezes sem efeito colateral.
    var appRevealed = false;
    window.revealApp = function () {
        if (appRevealed) return;
        appRevealed = true;
        $('body').addClass('app-ready');
        $('#exampleModal2').modal('hide');
        // Remove backdrops órfãos que o Bootstrap pode deixar
        setTimeout(function () { $('.modal-backdrop').remove(); }, 350);
    };

    // Rede de segurança: se o AJAX inicial demorar mais que 15s, libera mesmo assim
    // para o usuário ver o app (ou ao menos a tela vazia) em vez de splash eterno.
    setTimeout(function () { window.revealApp(); }, 15000);

    $isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());

    $(window).scroll(function () {
        var inicio = 100;

        if ($(this).scrollTop() > 100) {
            $('.scroll-up').fadeIn();
            $('<div class="scroll-up" style="position:fixed;bottom:0;right:0;margin-right:2em;margin-bottom:3.5em;opacity: 0.6;" ><a href="#totop" ><img style="opacity:1.6;" width="40" height="40" alt="To Top" src="./images/top.png"></a></div >').appendTo('#content');
        } else {
            $('.scroll-up').fadeOut();
        }

        $('a[href="#totop"]').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });
    });

    vEscola = $("#codEscola").val();    
	vUniqueID = $("#uniqueID").val();
    $('#nroserie').text(vUniqueID);
	id = $.trim($("#Id").val());
    vs = $('#vs').val();
    $('.navbar-left').hide();
    if ($("#codEscola").val() === "80") {
        $('#lbEscola').removeClass('hidden').html('<strong>FORTES</strong>');
//        $('.home').hide();
        $('#exc-aluno').hide();
//        $('#idRegistro').hide();
        $('#opSaida').remove();
        $('#dvCurso').removeClass('col-xs-5').removeClass('col-sm-5').addClass('col-sm-7').addClass('col-xs-7');
        $('#dvTurma').removeClass('col-xs-2').removeClass('col-sm-2').addClass('col-sm-5').addClass('col-xs-5');

        /*$('body').empty().html('<div class="text-center" style="margin-top: 20px;">' +
            '<img id="logo" src="#" style="height: 100px; width: auto;" /></div ><div class="row box-body"><div style="margin: 20px;"><div class="alert alert-warning alert-dismissible">' +
            '<h4><i class="icon fa fa-warning"></i> Oops!</h4>' +
            'aplicativo em manutenção.' +
            '</div></div></div><div class="text-center">' +
            '<div><a class="btn btn-success" href="https://www.fortesformacaotecnica.com.br/area-do-aluno" target="_blank">Ir para o portal do aluno</a></div>'+
            '</div>');

        $('#logo').attr('src', './images/80.png');

        return false;*/
    }

    $("#banner1").attr("src", "./images/" + $("#codEscola").val() + "banner1.png");
    $("#banner2").attr("src", "./images/" + $("#codEscola").val() + "banner2.png");
    $("#banner3").attr("src", "./images/" + $("#codEscola").val() + "banner3.png");

    $("body").removeClass();
    $("body").addClass("hold-transition layout-top-nav fixed");

    $('#cliqueNroSerie').off('click').on('click', function (e) {
        e.preventDefault();

        var $btn = $(this);
        var texto = $('#nroserie').text();

        function feedbackSucesso() {
            // Feedback visual rápido no próprio botão
            $btn.addClass('is-copied');
            setTimeout(function () { $btn.removeClass('is-copied'); }, 1500);

            // Toast
            $.toast({
                text: "Número de série copiado!",
                hideAfter: 2500,
                position: 'bottom-center',
                showHideTransition: 'fade',
                bgColor: '#28a7a8',
                textColor: '#ffffff'
            });
        }

        function feedbackErro() {
            $.toast({
                text: "Não foi possível copiar. Tente novamente.",
                hideAfter: 3000,
                position: 'bottom-center',
                showHideTransition: 'fade',
                bgColor: '#c0392b',
                textColor: '#ffffff'
            });
        }

        // Estratégia 1: Clipboard API moderna (HTTPS, navegadores recentes)
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto)
                .then(feedbackSucesso)
                .catch(function () {
                    // Estratégia 2: fallback para execCommand
                    try {
                        var sampleTextarea = document.createElement("textarea");
                        sampleTextarea.value = texto;
                        sampleTextarea.setAttribute('readonly', '');
                        sampleTextarea.style.position = 'fixed';
                        sampleTextarea.style.left = '-9999px';
                        document.body.appendChild(sampleTextarea);
                        sampleTextarea.select();
                        var ok = document.execCommand("copy");
                        document.body.removeChild(sampleTextarea);
                        if (ok) { feedbackSucesso(); } else { feedbackErro(); }
                    } catch (err) {
                        feedbackErro();
                    }
                });
            return;
        }

        // Estratégia 2 (direto, sem Clipboard API disponível)
        try {
            var sampleTextarea = document.createElement("textarea");
            sampleTextarea.value = texto;
            sampleTextarea.setAttribute('readonly', '');
            sampleTextarea.style.position = 'fixed';
            sampleTextarea.style.left = '-9999px';
            document.body.appendChild(sampleTextarea);
            sampleTextarea.select();
            var ok = document.execCommand("copy");
            document.body.removeChild(sampleTextarea);
            if (ok) { feedbackSucesso(); } else { feedbackErro(); }
        } catch (err) {
            feedbackErro();
        }
    });

	$('#lbEscola').removeClass('hidden');
    
	switch ($("#codEscola").val()) {
        case "8":
            $("#lbEscola").text('Colégio Ponto Alto');
            break;
        case "21":
            $("#lbEscola").text('Colégio Sistema 2');
            break;
        case "23":
            $("#lbEscola").text('Vitória Régia Centro Educacional');
            break;
        case "11":
            $("#lbEscola").text('Colégio Gregor Mendel');
            break;
        case "13":
            $("#lbEscola").text('Escola Marissol');
            break;
        case "14":
            $("#lbEscola").text('Escola Tempo de Criança');
            break;
        case "16":
            $("#lbEscola").text('Colégio Gregor Mendel');
            break;
        case "34":
            $("#lbEscola").text('Escola Patamares');
            break;
        case "61":
            $("#lbEscola").text('Escola Nova Nossa Infância');
            break;
        case "69":
            $("#lbEscola").text('Escola Sonho de Criança');
            break;
        case "80":
            break;
        case "86":
            $("#lbEscola").text('Villa Criar - Escola e Centro de Estudos');
            break;
        case "92":
            $("#lbEscola").text('Escola Omega');
            break;
        case "93":
            $("#lbEscola").text('Escola Recanto de Viver');
            break;
        case "104":
            $("#lbEscola").text('CERV');
            break;
        case "109":
            $("#lbEscola").text('COOPEMA');
            break;
        case "112":
            $("#lbEscola").text('Colégio Gabriel Arcanjo');
            break;
        case "131":
            $("#lbEscola").text('Educcar');
            break;
        case "132":
            $("#lbEscola").text('Colégio Augusto Comte');
            break;
        case "143":
            $("#lbEscola").text('Guadalupe');
            break;
        case "148":
            $("#lbEscola").text('Gurilândia');
            break;
        case "152":
            $("#lbEscola").text('Brincando e Construindo');
            break;
        case "155":
            $("#lbEscola").text('Colégio Marcodes');
            break;
        case "157":
            $("#lbEscola").text('Escola Traços e Letras');
            break;
        case "158":
            $("#lbEscola").text('Colégio Perspectiva');
            break;
        case "174":
            $("#lbEscola").text('Colégio Arte');
            break;
        case "177":
            $("#lbEscola").text('Escola Medalha Milagrosa');
            break;
        case "179":
            $("#lbEscola").text('Colégio Master System');
            break;
        case "181":
            $("#lbEscola").text('Escola Maria Bernarda');
            break;
        case "185":
            $("#lbEscola").text('Colégio Favo');
            break;
        case "191":
            $("#lbEscola").text('Instituto Nossa Senhora do Salette');
            break;
        case "198":
            $("#lbEscola").text('Casa Bambini');
            break;
        case "200":
            $("#lbEscola").text('Escola Moderninha de Valéria');
            break;
        case "205":
            $("#lbEscola").text('Escola Gira Girou');
            break;
        case "208":
            $("#lbEscola").text('Instituto Comenius');
            break;
        case "215":
            $("#lbEscola").text('Colégio Atenas');
            break;
        case "216":
            $("#lbEscola").text('Escola Reino Encantado');
            break;
        case "218":
            $("#lbEscola").text('Colégio Crescimento');
            break;
        case "223":
            $("#lbEscola").text('Pet Parque Resort');
            break;
        case "229":
            $("#lbEscola").text('Centro Educacional Potência');
            break;
        case "243":
            $("#lbEscola").text('Escola Ponto de Partida');
            break;
        case "145":
            $("#lbEscola").text('ENSC');
            break;
        case "241":
            $("#lbEscola").text('YBÁ');
            break;
        case "247":
            $("#lbEscola").text('ENSC');
            break;
        case "149":
            $("#lbEscola").text('EBB');
            break;
        case "133":
            $("#lbEscola").text('Cooeps');
            break;
        case "183":
            $("#lbEscola").text('Cooeps Arraial');
            break;
			
        default:
    }

    $("#idRegistro").attr('href', './registro.php?codescola='+vEscola+'&uniqueid='+vUniqueID+'&id='+id+'&vs='+vs);

    $(".menu").off('click');

//    var _url = './Default.aspx?codEscola=' + $("#codEscola").val() + '&uniqueID=' + $("#uniqueID").val() + '&Id=' + $("#Id").val();

    //$('body').append('<form id="atualiza" action="/"></form>');

    var $data = {};
    $data.ESCOLA = $.trim($("#codEscola").val());
    $data.UNIQUEID = $.trim($("#uniqueID").val());

    $.ajax({
        type: "POST",
        "headers": {
            "Authorization": "Bearer a6db2e47da0e40e8be13aaa93287b14f"
        },
        dataType: "json",
        url: "https://www.api.sistema2.com.br/WebApiSae/api/appaluno",
        data: $data,
        success:
            function (data) {
                try {
                $dados = data;
                $alunos = $dados.alunos;
                $local = $dados.local;

                $.each($alunos, function (index, value) {
                    if (index === 0) {
                        if (($local !== undefined) && ($local !== null))
                            $dados_local = $local[$local.findIndex(obj => obj.codigo === value.Codigo)];

                        $('#lbcodigo').text('RM - ' + ('000000' + value.Codigo).slice(-6));
                        //$(".nomeAluno").text(value.Descricao.split(' ')[0] + ' ' + value.Descricao.substr(value.Descricao.lastIndexOf(' ') + 1));
                        $(".nomeAluno").text(value.Descricao);
                        $(".saida").text(value.SaidaDoAluno);
                        $(".fotoAtual").attr("src", value.Foto.replace('https://digite1.websiteseguro.com','http://digite.com.br'));

                        if (($dados_local === undefined) || ($dados_local === null)) {
                            $(".nomeCurso").text(value.Curso.toUpperCase());
                            $(".nometurma").text(value.Turma);
                            $(".fotoAtual").attr("data-alunoCurso", value.alunoCurso);
                        } else {
                           if ($.inArray(vEscola, ['80']) !== -1){
                               $(".nomeCurso").text($dados_local.dcurso.toUpperCase());
                               $(".nometurma").text($dados_local.dturma);
                               $('#label-turma').text($dados_local.turma);
                               $(".fotoAtual").attr("data-alunoCurso", $dados_local.cursoId);
                               if ($dados_local.foto !== null)
                                   $(".fotoAtual").attr("src", "data:image/jpg;base64," + $dados_local.foto);
                           } else {
                               $(".nomeCurso").text(value.Curso.toUpperCase());
                               $(".nometurma").text(value.Turma);
                               $(".fotoAtual").attr("data-alunoCurso", value.alunoCurso);
                           }
                        }

                        $(".nro").text(value.Nro);

                        $(".fotoAtual").attr("alt", value.Descricao.substr(0, 28));

                        $(".fotoAtual").attr("data-escola", value.Escola);
                        $(".fotoAtual").attr("data-codigo", value.Codigo);
                        $(".fotoAtual").attr("data-tipoacesso", value.TipoAcesso);
                        $(".fotoAtual").attr("data-passnet", value.SenhaNet);
                        $(".fotoAtual").attr("data-cursoturma", value.Curso + value.Turma.trim());
                        $(".fotoAtual").attr("data-codcurso", value.CodCurso);
                        $(".fotoAtual").attr("data-curso", value.Curso.replace(' ', '').replace('°', '').trim());
                        $(".fotoAtual").attr("data-turma2", $.trim(value.CodCurso) +'-'+ $.trim(value.Turma));
                        $(".fotoAtual").attr("data-alunoTurma", value.alunoTurma);
                        $(".fotoAtual").attr("data-ciclo", value.Ciclo);
                        
                        vRM = value.Codigo;
                        vTipoAcesso = value.TipoAcesso;
                        vCiclo = value.Ciclo;
                        vCurso = value.CodCurso;
                        vTurma = value.Turma.trim();
                        vNomeAluno = $.trim($(".nomeAluno").text());
                        vSenhaNet = value.SenhaNet;

                        $(".home").off('click').on('click', homeClick).trigger('click');

                        $("#btnAlunos").off('click').on('click', alunosClick);
                    }
                });

                // Expõe lista para a sidebar e renderiza
                window.$alunos = $alunos;
                if (typeof window.renderAlunosSidebar === 'function') {
                    try { window.renderAlunosSidebar($alunos); } catch (e2) {}
                }

                // Dados já carregados e DOM populado: revela o app e fecha o loading
                window.revealApp();

                //$('#atualiza').submit();
                } catch (e) {
                    // Se houve qualquer exceção processando os dados, ainda assim revela o app
                    if (window.console && console.error) {
                        console.error('Erro ao processar dados do appaluno:', e);
                    }
                    window.revealApp();
                }
            },
        beforeSend: aguarda2,
        error: function (request, status, error) {
            // Esconde o splash inicial enquanto navega, evita ficar com tela em branco
            window.revealApp();
            window.location.href = './registro.php?codescola='+vEscola+'&uniqueid='+vUniqueID+'&id='+id+'&vs='+vs;
        },
        // SEMPRE roda, mesmo se houver exceção dentro do success.
        // Última rede de segurança contra splash eterno.
        complete: function () {
            window.revealApp();
        }
    });
});