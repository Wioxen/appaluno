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
        setTimeout(function () {
            //$('#btnAlunos').trigger('click');

            var sampleTextarea = document.createElement("textarea");
            document.body.appendChild(sampleTextarea);
            sampleTextarea.value = $('#nroserie').text();
            sampleTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(sampleTextarea);

            $.toast({
                text: "Texto copiado com sucesso",
                hideAfter: 3000,
                position: 'bottom-center',
                showHideTransition: 'fade'
            });
        }, 1);
    });

    switch ($("#codEscola").val()) {
        case "8":
            $("body").addClass('skin-blue');
            $(".box-header").css('border-top-color', '#4589BA');
            $("#lbEscola").text('Colégio Ponto Alto');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "21":
            $("body").addClass('skin-green');
            $(".box-header").css('border-top-color', '#13A75A');
            $("#lbEscola").text('Colégio Sistema 2');
            $(".boxInicio").css('background-color', '#13A75A');
            $("#cor").val('green');
            break;
        case "23":
            $("body").addClass('skin-green');
            $(".box-header").css('border-top-color', '#13A75A');
            $("#lbEscola").text('Vitória Régia Centro Educacional');
            $(".boxInicio").css('background-color', '#13A75A');
            $(".info-box-icon").css('background-color', '#13A75A');
            $("#cor").val('green');
            break;
        case "11":
            $("body").addClass('skin-red');
            $("#lbEscola").text('Colégio Gregor Mendel');
            $(".boxInicio").css('background-color', '#D94F3E');
            $("#cor").val('red');
            break;
        case "13":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Escola Marissol');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "14":
            $("body").addClass('skin-purple');
            $("#lbEscola").text('Escola Tempo de Criança');
            $(".boxInicio").css('background-color', '#6256A4');
            $("#cor").val('purple');
            break;
        case "16":
            $("body").addClass('skin-red');
            $("#lbEscola").text('Colégio Gregor Mendel');
            $(".boxInicio").css('background-color', '#D94F3E');
            $("#cor").val('red');
            break;
        case "34":
            $("body").addClass('skin-red');
            $("#lbEscola").text('Escola Patamares');
            $(".boxInicio").css('background-color', '#D94F3E');
            $("#cor").val('red');
            break;
        case "61":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Escola Nova Nossa Infância');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "69":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Escola Sonho de Criança');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "80":
            $("body").addClass('skin-green');
            $(".boxInicio").css('background-color', '#13A75A');
            $("#cor").val('green');
            break;
        case "86":
            $("body").addClass('skin-red');
            $("#lbEscola").text('Villa Criar - Escola e Centro de Estudos');
            $(".boxInicio").css('background-color', '#D94F3E');
            $("#cor").val('red');
            break;
        case "92":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Escola Omega');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "93":
            $("body").addClass('skin-purple');
            $("#lbEscola").text('Escola Recanto de Viver');
            $(".boxInicio").css('background-color', '#6256A4');
            $("#cor").val('purple');
            break;
        case "104":
            $("body").addClass('skin-green');
            $(".box-header").css('border-top-color', '#13A75A');
            $("#lbEscola").text('CERV');
            $(".boxInicio").css('background-color', '#13A75A');
            $("#cor").val('green');
            break;
        case "109":
            $("body").addClass('skin-green');
            $(".box-header").css('border-top-color', '#13A75A');
            $("#lbEscola").text('COOPEMA');
            $(".boxInicio").css('background-color', '#13A75A');
            $("#cor").val('green');
            break;
        case "112":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Colégio Gabriel Arcanjo');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "131":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Educcar');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "132":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Colégio Augusto Comte');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "143":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Guadalupe');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "148":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Gurilândia');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "152":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Brincando e Construindo');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "155":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Colégio Marcodes');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "157":
            $("body").addClass('skin-green');
            $(".box-header").css('border-top-color', '#13A75A');
            $("#lbEscola").text('Escola Traços e Letras');
            $(".boxInicio").css('background-color', '#13A75A');
            $("#cor").val('green');
            break;
        case "158":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Colégio Perspectiva');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "174":
            $("body").addClass('skin-red');
            $("#lbEscola").text('Colégio Arte');
            $(".boxInicio").css('background-color', '#D94F3E');
            $("#cor").val('red');
            break;
        case "177":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Escola Medalha Milagrosa');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "179":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Colégio Master System');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "181":
            $("body").addClass('skin-green');
            $(".box-header").css('border-top-color', '#13A75A');
            $("#lbEscola").text('Escola Maria Bernarda');
            $(".boxInicio").css('background-color', '#13A75A');
            $("#cor").val('green');
            break;
        case "185":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Colégio Favo');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "191":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Instituto Nossa Senhora do Salette');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "198":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Casa Bambini');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "200":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Escola Moderninha de Valéria');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "205":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Escola Gira Girou');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "208":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Instituto Comenius');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "215":
            $("body").addClass('skin-green');
            $("#lbEscola").text('Colégio Atenas');
            $(".boxInicio").css('background-color', '#4BCA64');
            $("#cor").val('blue');
            break;
        case "216":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Escola Reino Encantado');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "218":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Colégio Crescimento');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "223":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Pet Parque Resort');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "229":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Centro Educacional Potência');
            $(".boxInicio").css('background-color', '#4589BA');
            $("#cor").val('blue');
            break;
        case "243":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('Escola Ponto de Partida');
            $(".boxInicio").css('background-color', '#3A417B');
            $("#cor").val('blue');
            break;
        case "145":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('ENSC');
            $(".boxInicio").css('background-color', '#3A417B');
            $("#cor").val('blue');
            break;
        case "241":
            $('#lbEscola').removeClass('hidden');
            $("body").addClass('skin-green');
            $("#lbEscola").text('Escola YBÁ');
            $(".boxInicio").css('background-color', '#D94F3E');
            $("#cor").val('green');
            break;
        case "247":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('ENSC');
            $(".boxInicio").css('background-color', '#3A417B');
            $("#cor").val('blue');
            break;
        case "149":
            $("body").addClass('skin-blue');
            $("#lbEscola").text('EBB');
            $(".boxInicio").css('background-color', '#3A417B');
            $("#cor").val('blue');
            break;
        default:
            $("body").addClass('skin-green');
            $("#cor").val('green');
            $(".boxInicio").css('background-color', '#D94F3E');
    }

    console.log($(".navbar").css('background-color'));

    $('#nm-title').css('background-color', $(".navbar").css('background-color'));
//    $('#nav').css('background-color', $(".navbar").css('background-color'));
    $('#btn-not').css('background-color', 'white');
    //$('#btn-not').css('color', '#fff');
  
    $(".lb").addClass('lb label pull bg-' + $("#cor").val() + '-gradient');

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