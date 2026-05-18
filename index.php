<?php
// Versão dos assets — incremente sempre que alterar JS/CSS para forçar refresh
// no navegador dos usuários (cache busting).
$ASSET_VERSION = '20260517a';
?>
<!DOCTYPE html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="shortcut icon" type="image/png" href="http://www.sistema1.net/professor/images/logotipo.png" />
    <link rel="canonical" href="http://www.sistema2.com.br" />
    <meta name="keywords" content="seinet, Sistema 2 Softwares, SEI net, Sei.net SEINET, Portal do aluno, Sistema Escolar Integrado, aplicativo escolar, aplicativo escolar aplicativo escolar gratuito, aplicativo escolar premium, aplicativo escolar baixar, aplicativo escolar global, escolar entrar, aplicativo escolar versão web" />
    <meta name="description" content="Hoje a Sistema 2 Software é uma empresa consolidada no mercado nacional tendo como seu foco a satisfação dos seus clientes, com agilidade e rapidez no suporte técnico com o compromisso de sempre estar oferecendo o melhor." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="Sistema 2 Software" />
    <meta property="og:title" content="SEI Web | Aplicativo do ALuno | Sistema 2 Softwares" />
    <meta property="og:image" content="http://www.sistema2.com.br/images/logo.png" />
    <meta property="og:description" content="Hoje a Sistema 2 Software é uma empresa consolidada no mercado nacional tendo como seu foco a satisfação dos seus clientes, com agilidade e rapidez no suporte técnico com o compromisso de sempre estar oferecendo o melhor." />
    <meta property="og:url" content="http://www.sistema2.com.br" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>Aplicativo Escolar para Alunos e Responsáveis | Sistema 2 Softwares</title>

    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css" />
    <!-- Font Awesome -->
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css" />
    <!-- Ionicons -->
    <link rel="stylesheet" href="bower_components/Ionicons/css/ionicons.min.css" />
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css" />
    <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href="css/estilo.css?v=<?php echo $ASSET_VERSION; ?>" rel="stylesheet" />
    <!-- Google Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic" />
    <link href="css/jquery.loadingModal.css" rel="stylesheet" />
    <script src="//code.jquery.com/jquery-3.2.1.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.css" />
    <link rel="stylesheet" href="css/jquery.toast.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js"></script>
    <style>
        .modal-fullscreen {
            width: 100vw;
            max-width: none;
            height: 100%;
            margin: 0
        }

            .modal-fullscreen .modal-content {
                height: 100%;
                border: 0;
                border-radius: 0
            }

            .modal-fullscreen .modal-footer, .modal-fullscreen .modal-header {
                border-radius: 0
            }

            .modal-fullscreen .modal-body {
                overflow-y: auto
            }

        @media (max-width:575.98px) {
            .modal-fullscreen-sm-down {
                width: 100vw;
                max-width: none;
                height: 100%;
                margin: 0
            }

                .modal-fullscreen-sm-down .modal-content {
                    height: 100%;
                    border: 0;
                    border-radius: 0
                }

                .modal-fullscreen-sm-down .modal-footer, .modal-fullscreen-sm-down .modal-header {
                    border-radius: 0
                }

                .modal-fullscreen-sm-down .modal-body {
                    overflow-y: auto
                }
        }

        @media (max-width:767.98px) {
            .modal-fullscreen-md-down {
                width: 100vw;
                max-width: none;
                height: 100%;
                margin: 0
            }

                .modal-fullscreen-md-down .modal-content {
                    height: 100%;
                    border: 0;
                    border-radius: 0
                }

                .modal-fullscreen-md-down .modal-footer, .modal-fullscreen-md-down .modal-header {
                    border-radius: 0
                }

                .modal-fullscreen-md-down .modal-body {
                    overflow-y: auto
                }
        }

        @media (max-width:991.98px) {
            .modal-fullscreen-lg-down {
                width: 100vw;
                max-width: none;
                height: 100%;
                margin: 0
            }

                .modal-fullscreen-lg-down .modal-content {
                    height: 100%;
                    border: 0;
                    border-radius: 0
                }

                .modal-fullscreen-lg-down .modal-footer, .modal-fullscreen-lg-down .modal-header {
                    border-radius: 0
                }

                .modal-fullscreen-lg-down .modal-body {
                    overflow-y: auto
                }
        }

        @media (max-width:1199.98px) {
            .modal-fullscreen-xl-down {
                width: 100vw;
                max-width: none;
                height: 100%;
                margin: 0
            }

                .modal-fullscreen-xl-down .modal-content {
                    height: 100%;
                    border: 0;
                    border-radius: 0
                }

                .modal-fullscreen-xl-down .modal-footer, .modal-fullscreen-xl-down .modal-header {
                    border-radius: 0
                }

                .modal-fullscreen-xl-down .modal-body {
                    overflow-y: auto
                }
        }

        @media (max-width:1399.98px) {
            .modal-fullscreen-xxl-down {
                width: 100vw;
                max-width: none;
                height: 100%;
                margin: 0
            }

                .modal-fullscreen-xxl-down .modal-content {
                    height: 100%;
                    border: 0;
                    border-radius: 0
                }

                .modal-fullscreen-xxl-down .modal-footer, .modal-fullscreen-xxl-down .modal-header {
                    border-radius: 0
                }

                .modal-fullscreen-xxl-down .modal-body {
                    overflow-y: auto
                }
        }
    </style>

    <!-- ===== Estilo do loading (mesmo padrão do loading.php) ===== -->
    <style>
        /* Backdrop totalmente branco e opaco (cobre tudo que estiver atrás) */
        .splash-modal-backdrop.modal-backdrop {
            background: #ffffff;
            opacity: 1 !important;
        }

        /* O modal em si ocupa a tela inteira */
        .splash-modal {
            padding: 0 !important;
        }

        .splash-modal .modal-dialog {
            width: 100vw;
            max-width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .splash-modal .modal-content {
            width: 100vw;
            height: 100vh;
            background: #ffffff;
            border: 0;
            border-radius: 0;
            box-shadow: none;
        }

        .splash-modal .splash-body {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: #ffffff;
        }

        /* Container do logo + spinner ao redor */
        .splash-modal .logo-ring {
            position: relative;
            width: 180px;
            height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: splashRise 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes splashRise {
            from { opacity: 0; transform: scale(0.94); }
            to   { opacity: 1; transform: scale(1); }
        }

        /* Spinner externo (anel) */
        .splash-modal .logo-ring::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: #28a7a8;
            border-right-color: rgba(40, 167, 168, 0.3);
            animation: splashSpin 1.1s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
            box-shadow: 0 0 30px rgba(40, 167, 168, 0.15);
        }

        @keyframes splashSpin {
            to { transform: rotate(360deg); }
        }

        /* Logo central */
        .splash-modal .splash-logo {
            width: 130px;
            height: 130px;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: splashPulse 2.2s ease-in-out infinite;
        }

        .splash-modal .splash-logo img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            display: block;
            border: 0;
            box-shadow: none;
        }

        @keyframes splashPulse {
            0%, 100% { transform: scale(1);    filter: brightness(1); }
            50%      { transform: scale(1.04); filter: brightness(1.05); }
        }

        /* Bloco de texto abaixo do logo */
        .splash-modal .splash-info {
            margin-top: 32px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 14px;
            animation: splashRise 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        .splash-modal .splash-title {
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0.5px;
            color: #1a1a1a;
            text-align: center;
            margin: 0;
        }

        .splash-modal .splash-subtitle {
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(0, 0, 0, 0.45);
            text-align: center;
            margin: 0;
        }

        /* Spinner de 3 bolinhas */
        .splash-modal .splash-dots {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 4px;
        }

        .splash-modal .splash-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #28a7a8;
            display: inline-block;
            animation: splashDot 1.2s ease-in-out infinite both;
        }

        .splash-modal .splash-dots span:nth-child(1) { animation-delay: -0.32s; }
        .splash-modal .splash-dots span:nth-child(2) { animation-delay: -0.16s; }
        .splash-modal .splash-dots span:nth-child(3) { animation-delay: 0s; }

        @keyframes splashDot {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40%           { transform: scale(1);   opacity: 1; }
        }

        @media (max-width: 480px) {
            .splash-modal .logo-ring   { width: 150px; height: 150px; }
            .splash-modal .splash-logo { width: 108px; height: 108px; }
            .splash-modal .splash-title    { font-size: 15px; }
            .splash-modal .splash-subtitle { font-size: 11px; }
        }
    </style>

    <!-- ===== CSS de pré-loading: oculta o app até a requisição inicial concluir ===== -->
    <style>
        /* Esconde TODO o conteúdo do app antes do bootstrap da página */
        html, body { background: #ffffff; }
        body > .wrapper { visibility: hidden; }
        body.app-ready > .wrapper { visibility: visible; }

        /* Splash inicial enquanto JS ainda não rodou (antes do modal abrir).
           Garante fundo branco com logo + spinner ANTES de qualquer modal. */
        #preloadSplash {
            position: fixed;
            inset: 0;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
        }
        body.app-ready #preloadSplash { display: none; }

        #preloadSplash .pl-ring {
            position: relative;
            width: 180px;
            height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #preloadSplash .pl-ring::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: #28a7a8;
            border-right-color: rgba(40, 167, 168, 0.3);
            animation: plSpin 1.1s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
            box-shadow: 0 0 30px rgba(40, 167, 168, 0.15);
        }
        @keyframes plSpin { to { transform: rotate(360deg); } }
        #preloadSplash .pl-logo {
            width: 130px;
            height: 130px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: plPulse 2.2s ease-in-out infinite;
        }
        #preloadSplash .pl-logo img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        @keyframes plPulse {
            0%, 100% { transform: scale(1);    filter: brightness(1); }
            50%      { transform: scale(1.04); filter: brightness(1.05); }
        }
    </style>

    <!-- ===== Estilo do botão "adicionar usuário" no menu ===== -->
    <style>
        .navbar-custom-menu .register-btn {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 10px 14px !important;
            min-width: 48px;
            min-height: 48px;
            color: #ffffff !important;
        }

        .navbar-custom-menu .register-btn:hover,
        .navbar-custom-menu .register-btn:focus,
        .navbar-custom-menu .register-btn:active {
            background: rgba(255, 255, 255, 0.10) !important;
            color: #ffffff !important;
        }

        .navbar-custom-menu .register-btn .register-icon {
            position: relative;
            display: inline-block;
            width: 28px;
            height: 28px;
            line-height: 0;
        }

        .navbar-custom-menu .register-btn .register-user {
            width: 28px;
            height: 28px;
            color: #ffffff;
            display: block;
        }

        .navbar-custom-menu .register-btn .register-plus {
            position: absolute;
            width: 16px;
            height: 16px;
            right: -6px;
            bottom: -4px;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25));
            transition: transform 0.15s ease;
        }

        .navbar-custom-menu .register-btn:hover .register-plus {
            transform: scale(1.12);
        }

        /* Pulsa sutilmente para chamar a atenção sem ser irritante */
        @keyframes registerPulse {
            0%, 100% { transform: scale(1); }
            50%      { transform: scale(1.06); }
        }
        .navbar-custom-menu .register-btn .register-plus {
            animation: registerPulse 2.4s ease-in-out infinite;
        }

        /* Telas pequenas: ícone ainda maior e padding generoso para toque */
        @media (max-width: 768px) {
            .navbar-custom-menu .register-btn {
                padding: 8px 12px !important;
                min-width: 52px;
            }
            .navbar-custom-menu .register-btn .register-icon,
            .navbar-custom-menu .register-btn .register-user {
                width: 32px;
                height: 32px;
            }
            .navbar-custom-menu .register-btn .register-plus {
                width: 18px;
                height: 18px;
                right: -7px;
                bottom: -5px;
            }
        }
    </style>

    <!-- ===== Estilo do botão "alunos" e da sidebar lateral ===== -->
    <style>
        /* Força o .navbar-left a ficar visível em qualquer viewport.
           Anula display:none herdado do AdminLTE / estilo.css em mobile. */
        .main-header .navbar-left {
            display: block !important;
            float: left !important;
            visibility: visible !important;
            opacity: 1 !important;
        }

        /* Garante que o LI funciona dentro de uma .navbar-brand (AdminLTE/BS3 são restritivos) */
        .main-header .navbar-left .navbar-brand {
            padding: 0 !important;
            height: auto !important;
            min-height: 50px !important;
            width: auto !important;
            line-height: 1 !important;
            display: flex !important;
            align-items: center;
            margin: 0 !important;
            float: left !important;
            overflow: visible !important;
        }

        .main-header .navbar-left .navbar-brand > li {
            display: inline-flex !important;
            float: none !important;
            list-style: none !important;
            visibility: visible !important;
            opacity: 1 !important;
        }

        .main-header .navbar-left .navbar-brand > li > a {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            color: #ffffff !important;
            visibility: visible !important;
            opacity: 1 !important;
        }

        /* Botão na navbar-left (ao lado do home) — visibilidade FORÇADA */
        .main-header .navbar-left .students-li {
            display: inline-flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            float: none !important;
            position: relative !important;
        }

        .main-header .navbar-left a.students-btn,
        .main-header .navbar-left .students-btn {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            position: relative !important;
            padding: 14px 16px !important;
            min-width: 56px !important;
            min-height: 50px !important;
            width: auto !important;
            height: auto !important;
            color: #ffffff !important;
            line-height: 1 !important;
            text-decoration: none !important;
            visibility: visible !important;
            opacity: 1 !important;
            background: transparent !important;
            overflow: visible !important;
            float: left !important;
        }

        .main-header .navbar-left .students-btn:hover,
        .main-header .navbar-left .students-btn:focus,
        .main-header .navbar-left .students-btn:active {
            background: rgba(255, 255, 255, 0.12) !important;
            color: #ffffff !important;
            text-decoration: none !important;
        }

        .main-header .navbar-left .students-btn .students-icon {
            display: inline-block !important;
            width: 30px !important;
            height: 30px !important;
            line-height: 0 !important;
            visibility: visible !important;
            opacity: 1 !important;
            overflow: visible !important;
        }

        .main-header .navbar-left .students-btn .students-icon svg {
            width: 30px !important;
            height: 30px !important;
            color: #ffffff !important;
            stroke: #ffffff !important;
            fill: none !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }

        /* Badge com contador de alunos */
        .main-header .navbar-left .students-btn .students-count {
            position: absolute !important;
            top: 6px;
            right: 6px;
            min-width: 20px;
            height: 20px;
            padding: 0 5px;
            background: #f39c12 !important;
            color: #ffffff !important;
            font-size: 11px;
            font-weight: 700;
            line-height: 16px;
            text-align: center;
            border-radius: 10px;
            border: 2px solid #ffffff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            display: none;
        }

        .main-header .navbar-left .students-btn .students-count.has-count {
            display: inline-block !important;
        }

        @media (max-width: 768px) {
            .main-header .navbar-left .students-btn {
                padding: 12px 14px !important;
                min-width: 56px !important;
            }
            .main-header .navbar-left .students-btn .students-icon,
            .main-header .navbar-left .students-btn .students-icon svg {
                width: 32px !important;
                height: 32px !important;
            }
        }

        /* Esconde visualmente o botão "home" antigo (mantém no DOM para JS legado
           que faz $('.home').trigger('click') continuar funcionando). */
        .main-header .navbar-left .navbar-brand > li.home {
            display: none !important;
        }

        /* Esconde visualmente o btnAlunos antigo (dropdown da direita com a fotinha).
           Mantém no DOM para que JS legado que faz $('#btnAlunos').trigger('click') ou
           similar continue funcionando sem erros. */
        .main-header .navbar-custom-menu li.dropdown.user.user-menu {
            display: none !important;
        }

        /* ===== Tema teal aplicado ao header principal e ao nm-title =====
           Mesmo gradiente + bolhas decorativas do header da sidebar.
           Sobrescreve o skin-green do AdminLTE. */

        /* Cabeçalho principal */
        .main-header .navbar,
        .main-header .navbar-static-top {
            position: relative !important;
            background: linear-gradient(135deg, #28a7a8 0%, #1f8a8b 50%, #166e6f 100%) !important;
            border-color: transparent !important;
            color: #ffffff !important;
            overflow: hidden;
        }

        /* Bolhas de luz decorativas no main-header (mesma estética do header da sidebar) */
        .main-header .navbar::before {
            content: "";
            position: absolute;
            top: -40px;
            right: -30px;
            width: 160px;
            height: 160px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.16), transparent 70%);
            pointer-events: none;
            z-index: 0;
        }
        .main-header .navbar::after {
            content: "";
            position: absolute;
            bottom: -60px;
            left: -20px;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.10), transparent 70%);
            pointer-events: none;
            z-index: 0;
        }

        /* Garante que os botões e conteúdos fiquem acima das bolhas */
        .main-header .navbar > .container,
        .main-header .navbar-left,
        .main-header .navbar-custom-menu {
            position: relative;
            z-index: 1;
        }

        /* Container da navbar: vira flex para centralizar os filhos verticalmente
           usando a altura real do container, qualquer que seja. */
        .main-header .navbar > .container {
            display: flex !important;
            align-items: center !important;
        }

        /* Mantém o menu da direita (com o idRegistro) realmente à direita
           depois do .container ter virado flex (o float: right deixa de funcionar). */
        .main-header .navbar-custom-menu {
            margin-left: auto !important;
            float: none !important;
        }

        /* lbEscola: centralizado verticalmente acompanhando a altura real do .container pai */
        .main-header #lbEscola {
            display: inline-flex !important;
            align-items: center !important;
            align-self: center !important;
            height: auto !important;
            line-height: 1 !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            color: #ffffff !important;
            font-weight: 600;
            text-decoration: none !important;
        }
        .main-header #lbEscola:hover,
        .main-header #lbEscola:focus {
            color: #ffffff !important;
            text-decoration: none !important;
        }
        /* Mantém o lbEscola escondido enquanto tem .hidden — o JS remove a classe quando popula o texto */
        .main-header #lbEscola.hidden {
            display: none !important;
        }

        /* nm-title — barra com o nome do aluno em destaque, mesmo tema */
        #nm-title {
            position: relative;
            background: linear-gradient(135deg, #28a7a8 0%, #1f8a8b 50%, #166e6f 100%) !important;
            color: #ffffff !important;
            border: 0 !important;
            padding: 14px 18px 12px !important;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(22, 110, 111, 0.18);
        }
        #nm-title::before {
            content: "";
            position: absolute;
            top: -30px;
            right: -20px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.14), transparent 70%);
            pointer-events: none;
        }
        #nm-title::after {
            content: "";
            position: absolute;
            bottom: -50px;
            left: -15px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.10), transparent 70%);
            pointer-events: none;
        }
        #nm-title > .text-center {
            position: relative;
            z-index: 1;
        }
        #nm-title .nomeAluno {
            color: #ffffff !important;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.3px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
        }
        /* Tira a linha <hr> herdada para a faixa ficar limpa */
        #nm-title hr {
            display: none !important;
        }

        /* Box-footer: remove padding vertical para a lista de info ficar
           encostada nas bordas superior e inferior do bloco. */
        .box-footer {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }

        /* ===== Lista de informações do aluno (Curso / Turma / Opção de saída) =====
           Layout em 3 linhas x 2 colunas: label à esquerda, valor à direita. */
        .aluno-info-list {
            list-style: none;
            margin: 0;
            padding: 4px 0;
        }

        .aluno-info-row {
            display: grid;
            grid-template-columns: minmax(120px, 38%) 1fr;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-bottom: 1px solid #f0f0f0;
            min-height: 44px;
        }
        .aluno-info-row:last-child {
            border-bottom: 0;
        }

        .aluno-info-label {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            color: #6b6b6b;
            line-height: 1.25;
        }

        .aluno-info-value {
            font-size: 13px;
            font-weight: 600;
            color: #1a1a1a;
            line-height: 1.25;
            text-align: right;
            word-break: break-word;
        }
        /* Quando o valor está vazio, mostra um traço discreto */
        .aluno-info-value:empty::before {
            content: "—";
            color: #c0c0c0;
            font-weight: 500;
        }

        /* ===== Headers dos modais (myModal, myModal2, myModal3, myModal4) =====
           Mesmo gradiente teal do main-header e da sidebar.
           Não afeta .splash-modal (fundo branco proposital) nem modais Bootstrap
           internos que não tenham essa estrutura customizada. */
        #myModal  .modal-header,
        #myModal2 .modal-header,
        #myModal3 .modal-header,
        #myModal4 .modal-header {
            position: relative;
            background: linear-gradient(135deg, #28a7a8 0%, #1f8a8b 50%, #166e6f 100%) !important;
            color: #ffffff !important;
            border-bottom: 0 !important;
            padding: 16px 18px !important;
            overflow: hidden;
            border-radius: 0 !important;
        }

        /* Bolhas decorativas — mesma estética do header da sidebar */
        #myModal  .modal-header::before,
        #myModal2 .modal-header::before,
        #myModal3 .modal-header::before,
        #myModal4 .modal-header::before {
            content: "";
            position: absolute;
            top: -30px;
            right: -20px;
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.16), transparent 70%);
            pointer-events: none;
            z-index: 0;
        }
        #myModal  .modal-header::after,
        #myModal2 .modal-header::after,
        #myModal3 .modal-header::after,
        #myModal4 .modal-header::after {
            content: "";
            position: absolute;
            bottom: -50px;
            left: -15px;
            width: 110px;
            height: 110px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.10), transparent 70%);
            pointer-events: none;
            z-index: 0;
        }

        /* Conteúdo (imagem, título, botão close) acima das bolhas */
        #myModal  .modal-header > *,
        #myModal2 .modal-header > *,
        #myModal3 .modal-header > *,
        #myModal4 .modal-header > * {
            position: relative;
            z-index: 1;
        }

        /* Título do modal em branco */
        #myModal  .modal-header h4,
        #myModal2 .modal-header h4,
        #myModal3 .modal-header h4,
        #myModal4 .modal-header h4 {
            color: #ffffff !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
            margin: 6px 0 0 !important;
        }

        /* Imagem (foto do aluno) com borda branca destacada sobre o gradiente */
        #myModal  .modal-header img.img-circle,
        #myModal2 .modal-header img.img-circle,
        #myModal3 .modal-header img.img-circle,
        #myModal4 .modal-header img.img-circle,
        #myModal  .modal-header img.modal-foto,
        #myModal2 .modal-header img.modal-foto,
        #myModal3 .modal-header img.modal-foto,
        #myModal4 .modal-header img.modal-foto {
            border: 2px solid rgba(255, 255, 255, 0.95) !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
        }

        /* Ícone "fechar" (imagem PNG close.png) com filtro para ficar branco */
        #myModal  .modal-header img.close,
        #myModal2 .modal-header img.close,
        #myModal3 .modal-header img.close,
        #myModal4 .modal-header img.close {
            filter: brightness(0) invert(1);
            opacity: 0.92;
            transition: opacity 0.15s;
        }
        #myModal  .modal-header img.close:hover,
        #myModal2 .modal-header img.close:hover,
        #myModal3 .modal-header img.close:hover,
        #myModal4 .modal-header img.close:hover {
            opacity: 1;
        }

        /* Anula qualquer classe bg-* que o JS antigo pudesse ter aplicado */
        .modal-header2[class*="bg-"] {
            background: linear-gradient(135deg, #28a7a8 0%, #1f8a8b 50%, #166e6f 100%) !important;
        }

        /* ===== Sidebar ===== */
        .alunos-sidebar-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.25s ease, visibility 0s linear 0.25s;
            z-index: 99998;
            -webkit-backdrop-filter: blur(2px);
            backdrop-filter: blur(2px);
        }
        .alunos-sidebar-backdrop.is-open {
            opacity: 1;
            visibility: visible;
            transition: opacity 0.25s ease, visibility 0s linear;
        }

        .alunos-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 320px;
            max-width: 88vw;
            background: #ffffff;
            box-shadow: 4px 0 20px rgba(0, 0, 0, 0.18);
            transform: translateX(-100%);
            transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 99999;
            display: flex;
            flex-direction: column;
            -webkit-overflow-scrolling: touch;
        }
        .alunos-sidebar.is-open {
            transform: translateX(0);
        }

        .alunos-sidebar-header {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 22px 18px 20px;
            background: linear-gradient(135deg, #28a7a8 0%, #1f8a8b 50%, #166e6f 100%);
            color: #ffffff;
            flex: 0 0 auto;
            overflow: hidden;
        }

        /* Decoração de fundo: bolha luminosa sutil no canto */
        .alunos-sidebar-header::before {
            content: "";
            position: absolute;
            top: -40px;
            right: -30px;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%);
            pointer-events: none;
        }
        .alunos-sidebar-header::after {
            content: "";
            position: absolute;
            bottom: -60px;
            left: -20px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%);
            pointer-events: none;
        }

        .alunos-sidebar-header__brand {
            display: flex;
            align-items: center;
            gap: 14px;
            flex: 1 1 auto;
            min-width: 0;
            position: relative;
            z-index: 1;
        }

        .alunos-sidebar-header__icon {
            flex: 0 0 auto;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.18);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.25),
                0 4px 10px rgba(0, 0, 0, 0.12);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
        }

        .alunos-sidebar-header__icon svg {
            width: 28px;
            height: 28px;
        }

        .alunos-sidebar-header__text {
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .alunos-sidebar-title {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 0.2px;
            line-height: 1.15;
        }

        .alunos-sidebar-subtitle {
            margin: 0;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.82);
            letter-spacing: 0.3px;
            line-height: 1.2;
            display: flex;
            align-items: baseline;
            gap: 5px;
        }
        .alunos-sidebar-subtitle__label {
            opacity: 0.88;
        }

        .alunos-sidebar-close {
            background: rgba(255, 255, 255, 0.12);
            border: 0;
            width: 36px;
            height: 36px;
            padding: 0;
            color: #ffffff;
            cursor: pointer;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            transition: background 0.15s ease, transform 0.1s ease;
            flex: 0 0 auto;
            position: relative;
            z-index: 1;
        }
        .alunos-sidebar-close:hover {
            background: rgba(255, 255, 255, 0.22);
            color: #ffffff;
        }
        .alunos-sidebar-close:active {
            transform: scale(0.94);
        }
        .alunos-sidebar-close svg { width: 18px; height: 18px; }

        .alunos-sidebar-body {
            flex: 1 1 auto;
            overflow-y: auto;
            overscroll-behavior: contain;
        }

        .alunos-list {
            list-style: none;
            margin: 0;
            padding: 6px 0;
        }

        .alunos-list .aluno-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 18px;
            cursor: pointer;
            border: 0;
            background: transparent;
            width: 100%;
            text-align: left;
            transition: background 0.12s ease;
            border-bottom: 1px solid #f1f1f1;
        }
        .alunos-list .aluno-item:hover,
        .alunos-list .aluno-item:focus {
            background: #f5fbfb;
            outline: none;
        }
        .alunos-list .aluno-item.is-active {
            background: #e8f6f7;
        }

        .alunos-list .aluno-avatar {
            flex: 0 0 auto;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #e0e0e0 url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='8' r='4'/><path d='M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8'/></svg>") center/60% no-repeat;
            overflow: hidden;
            border: 2px solid #ffffff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        }
        .alunos-list .aluno-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .alunos-list .aluno-info {
            flex: 1 1 auto;
            min-width: 0;
        }
        .alunos-list .aluno-nome {
            font-size: 14.5px;
            font-weight: 600;
            color: #1a1a1a;
            line-height: 1.25;
            margin: 0 0 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .alunos-list .aluno-rm {
            font-size: 11.5px;
            font-weight: 600;
            color: #28a7a8;
            letter-spacing: 0.3px;
            margin: 0 0 2px;
            font-family: "SF Mono", "Menlo", "Consolas", monospace;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .alunos-list .aluno-meta {
            font-size: 12px;
            color: #777;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .alunos-list .aluno-chevron {
            flex: 0 0 auto;
            color: #b8b8b8;
        }
        .alunos-list .aluno-chevron svg { width: 18px; height: 18px; }

        .alunos-empty {
            display: none;
            padding: 28px 18px;
            text-align: center;
            color: #888;
            font-size: 14px;
        }
        .alunos-empty.is-visible { display: block; }

        .alunos-sidebar-body::-webkit-scrollbar { width: 6px; }
        .alunos-sidebar-body::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.18);
            border-radius: 3px;
        }

        /* Footer fixo da sidebar com botão de copiar nº de série */
        .alunos-sidebar-footer {
            flex: 0 0 auto;
            border-top: 1px solid #e8e8e8;
            padding: 12px;
            background: #fafafa;
        }

        .copy-serial-btn {
            display: block;
            width: 100%;
            border: 0;
            border-radius: 10px;
            padding: 12px 14px;
            background: linear-gradient(180deg, #28a7a8 0%, #1f8a8b 100%);
            color: #ffffff;
            font-weight: 600;
            font-size: 13px;
            letter-spacing: 0.2px;
            cursor: pointer;
            box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.18),
                0 2px 8px rgba(40, 167, 168, 0.28);
            transition: transform 0.08s ease, box-shadow 0.15s ease, filter 0.15s;
        }

        .copy-serial-btn:hover {
            filter: brightness(1.05);
            box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.22),
                0 4px 12px rgba(40, 167, 168, 0.38);
        }

        .copy-serial-btn:active {
            transform: translateY(1px);
        }

        /* Feedback temporário após copiar */
        .copy-serial-btn.is-copied {
            background: linear-gradient(180deg, #27ae60 0%, #1f8c4d 100%);
            box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.22),
                0 2px 10px rgba(39, 174, 96, 0.42);
        }

        /* Alterna ícones e texto conforme o estado is-copied */
        .copy-serial-btn .copy-serial-icon--check,
        .copy-serial-btn .copy-serial-title--copied { display: none; }

        .copy-serial-btn.is-copied .copy-serial-icon--default,
        .copy-serial-btn.is-copied .copy-serial-title--default { display: none; }

        .copy-serial-btn.is-copied .copy-serial-icon--check,
        .copy-serial-btn.is-copied .copy-serial-title--copied { display: inline-block; }

        /* Garante que o toast fica acima da sidebar (z-index 99999) */
        .jq-toast-wrap {
            z-index: 100001 !important;
        }

        .copy-serial-label {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
        }

        .copy-serial-icon {
            flex: 0 0 auto;
            width: 18px;
            height: 18px;
            color: #ffffff;
        }

        .copy-serial-text {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            min-width: 0;
            text-align: left;
        }

        .copy-serial-title {
            font-size: 13px;
            font-weight: 600;
            line-height: 1.2;
            color: #ffffff;
        }

        /* O nroserie fica escondido visualmente, mas continua no DOM porque o
           lib.js faz $('#nroserie').text(vUniqueID) para populá-lo e depois
           $('#nroserie').text() para ler o valor a ser copiado. */
        .copy-serial-value {
            position: absolute !important;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    </style>

    <script src="https://www.google.com/recaptcha/api.js"></script>
</head>

<body class="hold-transition skin-green layout-top-nav fixed">

    <!-- Splash inicial: aparece IMEDIATAMENTE, antes mesmo do JS rodar -->
    <div id="preloadSplash" aria-hidden="true">
        <div class="pl-ring">
            <div class="pl-logo">
                <img src="./images/<?php echo htmlspecialchars($_GET['codescola'] ?? '', ENT_QUOTES, 'UTF-8'); ?>.png"
                     alt="" onerror="this.style.display='none'" />
            </div>
        </div>
    </div>

    <a id="bTeste" href="#"></a>

    <form id="formMain">
		<input type="hidden" id="codEscola" name="codEscola" value="<?php echo htmlspecialchars($_GET['codescola'] ?? '0', ENT_QUOTES, 'UTF-8'); ?>" />
		<input type="hidden" id="uniqueID"  name="uniqueID"  value="<?php echo htmlspecialchars($_GET['uniqueid']  ?? '',  ENT_QUOTES, 'UTF-8'); ?>" />
		<input type="hidden" id="Id"        name="Id"        value="<?php echo htmlspecialchars($_GET['id']        ?? '',  ENT_QUOTES, 'UTF-8'); ?>" />
		<input type="hidden" id="vs"        name="vs"        value="<?php echo htmlspecialchars($_GET['vs']        ?? '',  ENT_QUOTES, 'UTF-8'); ?>" />
    </form>

    <input id="cor" type="hidden" />

    <div class="wrapper">

        <header class="main-header">
            <nav class="navbar navbar-static-top">
                <div class="container">
                    <div class="navbar-left">
                        <ul class="nav navbar-brand">
                            <li class="home">
                                <a href="#" class="aMenu">
                                    <i class="fa fa-home"></i>
                                </a>
                            </li>
                        </ul>
                        <a id="btnAlunosSidebar" href="#" class="students-btn" aria-label="Lista de alunos" aria-controls="alunosSidebar" aria-expanded="false">
                            <span class="students-icon" aria-hidden="true">
                                <!-- Ícone "users" estilo line -->
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </span>
                            <span class="students-count" id="alunosCount" aria-hidden="true"></span>
                        </a>
                    </div>
                    <a href="#" id="lbEscola" class="navbar-brand hidden"></a>
                    <!-- Navbar Right Menu -->
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li class="dropdown notifications-menu">
                                <ul class="dropdown-menu">
                                    <li id="headerMessage" class="header"></li>
                                    <li>
                                        <ul id="menuMessage" class="menu">
                                            <li id="laguarde" class="text-center hidden">
                                                <!-- start notification -->
                                                <img src="http://gifimage.net/wp-content/uploads/2017/09/ajax-loading-gif-4.gif" />
                                            </li>
                                            <!-- end notification -->
                                        </ul>
                                    </li>
                                    <li class="footer"><a href="#">...</a></li>
                                </ul>
                            </li>
                            <!-- User Account Menu -->
                            <li class="dropdown user user-menu">
                                <!-- Menu Toggle Button -->
                                <a id="btnAlunos" href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <!-- The user image in the navbar-->
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyxTXrNGGViGR3bNDrEBHq-bB_VDuInAknd8Q9r_nf2SndrNf_PQ" class="user-image fotoAtual" alt="User Image" style="border: 2px solid #fff;" />
                                    <!-- hidden-xs hides the username on small devices so only the image appears. -->
                                    <span class="hidden-xs nomeAluno"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <!-- The user image in the menu -->
                                    <li class="user-header">
                                        <img src="#" class="img-circle fotoAtual" alt="User Image" style="height: 80px; width: 80px;" />
                                        <p>
                                            <span class="nomeAluno"></span>
                                        </p>
                                    </li>
                                    <li>
                                        <ul class="list-group list-group-flush" style="margin-bottom: 0px;">
                                            <li class="list-group-item">
                                                <strong id="lbcodigo">14</strong>
                                                <i id="exc-aluno" class="fa fa-trash-o" style="float: right; color: red;"></i>
                                            </li>
                                        </ul>
                                    </li>
                                    <!-- Menu Body -->
                                    <li id="liAlunos" class="user-body">
                                        <div id="dvAlunos" class="row" style="margin-left: -20px; margin-right: 0px;">
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a id="idRegistro" href="#" class="register-btn" aria-label="Adicionar aluno">
                                    <span class="register-icon">
                                        <!-- Silhueta do usuário (estilo line, traços limpos) -->
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                             class="register-user" aria-hidden="true">
                                            <circle cx="12" cy="8" r="4"></circle>
                                            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path>
                                        </svg>
                                        <!-- Badge "+" no canto inferior direito -->
                                        <svg viewBox="0 0 24 24" class="register-plus" aria-hidden="true">
                                            <circle cx="12" cy="12" r="11" fill="#2196f3"
                                                    stroke="#ffffff" stroke-width="2"></circle>
                                            <path d="M12 7v10 M7 12h10" stroke="#ffffff" stroke-width="3"
                                                  stroke-linecap="round" fill="none"></path>
                                        </svg>
                                    </span>
                                    <span class="label label-warning"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- /.navbar-custom-menu -->
                </div>
                <!-- /.container-fluid -->
            </nav>
        </header>
        <div class="content-wrapper" style="padding-top: 30px;">
            <div class="widget-user-image" style="position: absolute; z-index: 999; margin-left: 20px; margin-top: 27%;">
                <img id="imgfoto" class="img-circle fotoAtual" src="https://img.ibxk.com.br/2017/06/22/22100428046161.jpg" alt="User Avatar" style="width: 85px; height: 85px; border: 2px solid #fff;" />
            </div>

            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel"
                style="margin-top:20px; min-height: 146px; max-height: 350px; background-color: white;">
                <div class="carousel-inner" style="width: 100%;">
                    <div class="item">
                        <img id="banner1" src="#" alt="First slide" style="max-height: 350px;" />
                    </div>
                    <div class="item">
                        <img id="banner2" src="#" alt="Second slide" style="max-height: 350px;" />
                    </div>
                    <div class="item active">
                        <img id="banner3" src="#" alt="Third slide" style="max-height: 350px;" />
                    </div>
                </div>
            </div>

            <div id="nm-title" style="border: 1px solid #fff; padding-top: 10px; color: whitesmoke;">
                <div class="text-center">
                    <strong class="nomeAluno"></strong>
                    <hr style="margin-top: 10px; margin-bottom: 0px;" />
                </div>
            </div>
            <div class="row">
                <div class="box" style="margin-bottom: 0px; border-top: 0px;">
                    <div class="box box-widget widget-user" style="margin-bottom: 0px;">
                        <div id="boxInicio" class="boxInicio">
                        </div>
                    </div>
                    <div class="box-footer">
                        <ul class="aluno-info-list">
                            <li id="dvCurso" class="aluno-info-row">
                                <span class="aluno-info-label">CURSO</span>
                                <span class="aluno-info-value nomeCurso"></span>
                            </li>
                            <li id="dvTurma" class="aluno-info-row">
                                <span id="label-turma" class="aluno-info-label">TURMA</span>
                                <span class="aluno-info-value nometurma"></span>
                            </li>
                            <li id="opSaida" class="aluno-info-row">
                                <span class="aluno-info-label">OPÇÃO DE SAÍDA</span>
                                <span class="aluno-info-value saida"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="content"></div>
        </div>

    </div>

    <div id="snackbar">Copiado!</div>

    <footer id="nav" class="main-footer text-center navbar-fixed-bottom" style="padding: 3px;">
        <button id="btn-not" class="notificacao btn btn-block" style="border: 0px; padding: 0px;">
            <i class="fa fa-bell"></i>
            <p class="text-center text-sm text-uppercase"><span id="texto-notificacoes">Notificações</span></p>
        </button>
    </footer>

    <!-- ===== Sidebar de Alunos ===== -->
    <div class="alunos-sidebar-backdrop" id="alunosBackdrop" aria-hidden="true"></div>
    <aside class="alunos-sidebar" id="alunosSidebar" aria-label="Lista de alunos" aria-hidden="true">
        <header class="alunos-sidebar-header">
            <div class="alunos-sidebar-header__brand">
                <span class="alunos-sidebar-header__icon" aria-hidden="true">
                    <!-- Ícone: prancheta com pessoa (representando "lista/registro de alunos") -->
                    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor"
                         stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <!-- Prancheta -->
                        <rect x="5" y="5" width="18" height="20" rx="2.5" ry="2.5"
                              fill="rgba(255,255,255,0.14)" stroke="currentColor"></rect>
                        <!-- Aba da prancheta no topo -->
                        <rect x="10" y="3" width="8" height="4" rx="1" ry="1"
                              fill="currentColor" stroke="currentColor"></rect>
                        <!-- Cabeça do aluno -->
                        <circle cx="14" cy="12.5" r="2.2" fill="rgba(255,255,255,0.95)" stroke="none"></circle>
                        <!-- Ombros / corpo -->
                        <path d="M10 18c0-2.2 1.8-3.6 4-3.6s4 1.4 4 3.6"
                              fill="rgba(255,255,255,0.95)" stroke="none"></path>
                        <!-- Linhas da "ficha" abaixo -->
                        <line x1="9.5" y1="20.5" x2="18.5" y2="20.5" stroke="rgba(255,255,255,0.6)"></line>
                        <line x1="9.5" y1="22.5" x2="16" y2="22.5" stroke="rgba(255,255,255,0.5)"></line>
                    </svg>
                </span>
                <div class="alunos-sidebar-header__text">
                    <h3 class="alunos-sidebar-title">Alunos</h3>
                    <p class="alunos-sidebar-subtitle">
                        <span id="alunosCountHeader">—</span>
                        <span class="alunos-sidebar-subtitle__label" id="alunosCountLabel">cadastrado</span>
                    </p>
                </div>
            </div>
            <button type="button" class="alunos-sidebar-close" id="btnCloseSidebar" aria-label="Fechar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </header>

        <div class="alunos-sidebar-body">
            <ul class="alunos-list" id="alunosList" role="listbox">
                <!-- itens renderizados via JS pelo lib.js a partir de $alunos -->
            </ul>

            <div class="alunos-empty" id="alunosEmpty">
                <span>Nenhum aluno encontrado.</span>
            </div>
        </div>

        <footer class="alunos-sidebar-footer">
            <!-- O id "cliqueNroSerie" preserva o handler existente em lib.js.
                 O <span id="nroserie"> também: lib.js faz $('#nroserie').text(vUniqueID). -->
            <button type="button" id="cliqueNroSerie" class="copy-serial-btn">
                <span class="copy-serial-label">
                    <!-- Ícone padrão: copy -->
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="copy-serial-icon copy-serial-icon--default" aria-hidden="true">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <!-- Ícone exibido após copiar: check -->
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
                         class="copy-serial-icon copy-serial-icon--check" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span class="copy-serial-text">
                        <span class="copy-serial-title copy-serial-title--default">Copiar número de série</span>
                        <span class="copy-serial-title copy-serial-title--copied">Copiado!</span>
                        <span id="nroserie" class="copy-serial-value"></span>
                    </span>
                </span>
            </button>
        </footer>
    </aside>

    <div class="modal fade splash-modal" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen" role="document">
            <div class="modal-content">
                <div class="modal-body splash-body">
                    <div class="logo-ring">
                        <div class="splash-logo">
                            <img id="imgModal2" alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
                        </div>
                    </div>

                    <div class="splash-info">
                        <p class="splash-title">Consultando Servidor</p>
                        <p class="splash-subtitle">Aguarde</p>
                        <div class="splash-dots" aria-hidden="true">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade splash-modal" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen" role="document">
            <div class="modal-content">
                <div class="modal-body splash-body">
                    <div class="logo-ring">
                        <div class="splash-logo">
                            <img id="imgModal" alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
                        </div>
                    </div>

                    <div class="splash-info">
                        <p class="splash-title">Consultando Servidor</p>
                        <p class="splash-subtitle">Aguarde</p>
                        <div class="splash-dots" aria-hidden="true">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="control-sidebar-bg"></div>
    <div class="modal fade" id="myModal">
        <div class="modal-dialog modal-dialog2">
            <div class="modal-content modal-content2">
                <div class="modal-header modal-header2 text-center">
                    <img class="close" src="images/close.png" data-dismiss="modal" aria-hidden="true" style="height: 40px; width: auto; float: right; margin-top: 0px;" />
                    <img id="modalfoto" class="img-circle" src="#" style="height: 45px; width: 45px; float: left; padding: 0px; border: 2px solid #fff;" />
                    <h4 id="modaltitulo" style="font-weight: 700;">xxx</h4>
                </div>
                <div class="container"></div>
                <div class="modal-body modal-body2" style="padding: 0px;"></div>
                <div class="modal-footer modal-footer2">
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="myModal2">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <img class="close" src="images/close.png" data-dismiss="modal" aria-hidden="true" style="height: 40px; width: auto; float: right; margin-top: 0px;" />
                    <img class="modal-foto img-circle" src="#" style="height: 45px; width: 45px; float: left; padding: 0px; border: 2px solid #fff;" />
                    <h4 style="font-weight: 700;">xxx</h4>
                </div>
                <div class="modal-body" style="padding: 0px; text-align: justify; text-justify: inter-word;min-height: calc(100vh - 160px); overflow-y: auto;"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-block" data-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="myModal3">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <img class="close" src="images/close.png" data-dismiss="modal" aria-hidden="true" style="height: 40px; width: auto; float: right; margin-top: 0px;" />
                    <img class="modal-foto img-circle" src="#" style="height: 45px; width: 45px; float: left; padding: 0px; border: 2px solid #fff;" />
                    <h4 style="font-weight: 700;">xxx</h4>
                </div>
                <div class="modal-body" style="text-align: justify; text-justify: inter-word;max-height: calc(100vh - 190px); overflow-y: auto;"></div>
                <div class="modal-footer">
                    <button id="RenovarOk" type="button" class="btn btn-success btn-block">Continuar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="myModal4">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <img class="close" src="images/close.png" data-dismiss="modal" aria-hidden="true" style="height: 40px; width: auto; float: right; margin-top: 0px;" />
                    <img class="modal-foto img-circle" src="#" style="height: 45px; width: 45px; float: left; padding: 0px; border: 2px solid #fff;" />
                    <h4 style="font-weight: 700;">xxx</h4>
                </div>
                <div class="modal-body" style="text-align: justify; text-justify: inter-word;min-height: calc(100vh - 190px); overflow-y: auto;"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-block" data-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap 3.3.7 -->
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- SlimScroll -->
    <script src="bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="bower_components/fastclick/lib/fastclick.js"></script>
    <!-- AdminLTE App -->
    <script src="dist/js/adminlte.min.js"></script>
    <!-- AdminLTE for demo purposes -->

    <script src="js/funcoes.js?v=<?php echo $ASSET_VERSION; ?>"></script>

    <script src="dist/js/demo.js"></script>
    <script src="js/jquery.loadingModal.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/lib.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/tarefa.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/cotidiano.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/ocorrencia.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/notificacao.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/boletim.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/nota.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/boleto.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/alunos.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/eventos.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/galeria.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/enquete.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/gradeaula.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/video.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/documento.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/contato.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/vejamais.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/agenda.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/atividade.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="dist/clipboard.min.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/jquery.toast.js?v=<?php echo $ASSET_VERSION; ?>"></script>
    <script src="js/ir.js?v=<?php echo $ASSET_VERSION; ?>"></script>

    <!-- Ao abrir o modal de loading, pinta o backdrop do Bootstrap de branco -->
    <script>
        $(document).on('show.bs.modal', '.splash-modal', function () {
            // executa logo após o Bootstrap injetar o .modal-backdrop no DOM
            setTimeout(function () {
                $('.modal-backdrop').last().addClass('splash-modal-backdrop');
            }, 0);

            // Garante que o logo fique visível mesmo se foi escondido por um erro anterior
            $(this).find('#imgModal, #imgModal2').css('display', '');
        });
        $(document).on('hidden.bs.modal', '.splash-modal', function () {
            $('.modal-backdrop.splash-modal-backdrop').removeClass('splash-modal-backdrop');
        });

        // Trata erro de carregamento do logo: só esconde se o src real (não o placeholder) falhar
        $(document).on('error', '#imgModal, #imgModal2', function () {
            var src = this.getAttribute('src') || '';
            // Ignora erros do placeholder transparente em base64
            if (src.indexOf('data:image') === 0) return;
            // Loga e mantém a imagem oculta — o anel girando continua visível
            console.warn('Splash logo não pôde ser carregado:', src);
            this.style.display = 'none';
        });
    </script>

    <!-- ===== Sidebar de Alunos: open/close + render ===== -->
    <script>
    (function () {
        console.log('[sidebar-alunos] script carregado — v20260516o');

        var $backdrop      = $('#alunosBackdrop');
        var $sidebar       = $('#alunosSidebar');
        var $list          = $('#alunosList');
        var $empty         = $('#alunosEmpty');
        var $count         = $('#alunosCount');           // badge no botão da navbar
        var $countHeader   = $('#alunosCountHeader');     // número no subtítulo do header
        var $countLabel    = $('#alunosCountLabel');      // "cadastrado" / "cadastrados"

        function escapeHtml(s) {
            if (s === null || s === undefined) return '';
            return String(s)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function openSidebar() {
            $backdrop.addClass('is-open').attr('aria-hidden', 'false');
            $sidebar.addClass('is-open').attr('aria-hidden', 'false');
            $('#btnAlunosSidebar').attr('aria-expanded', 'true');
            $('body').css('overflow', 'hidden'); // trava scroll do fundo
        }

        function closeSidebar() {
            $backdrop.removeClass('is-open').attr('aria-hidden', 'true');
            $sidebar.removeClass('is-open').attr('aria-hidden', 'true');
            $('#btnAlunosSidebar').attr('aria-expanded', 'false');
            $('body').css('overflow', '');
        }

        // Renderiza a lista a partir do array de alunos vindo da API
        // Chamado pelo lib.js depois que $alunos é populado.
        // Também usa-se window.$alunos como fallback se já estiver no escopo global.
        window.renderAlunosSidebar = function (alunos) {
            if (!alunos && typeof window.$alunos !== 'undefined') alunos = window.$alunos;
            alunos = alunos || [];

            $list.empty();

            // Atualiza textos do header (contagem + label singular/plural)
            $countHeader.text(alunos.length);
            $countLabel.text(alunos.length === 1 ? 'cadastrado' : 'cadastrados');

            if (alunos.length === 0) {
                $empty.addClass('is-visible');
                $count.removeClass('has-count').text('');
                $countLabel.text('Nenhum aluno');
                $countHeader.text('');
                return;
            }

            $empty.removeClass('is-visible');
            $count.addClass('has-count').text(alunos.length > 99 ? '99+' : alunos.length);

            // Pega o codigo do aluno atualmente "ativo" (a fotoAtual)
            var codigoAtivo = $('.fotoAtual').first().attr('data-codigo') || '';

            var html = '';
            for (var i = 0; i < alunos.length; i++) {
                var a = alunos[i] || {};
                var nome      = escapeHtml(a.Descricao || '');
                var codigo    = escapeHtml(a.Codigo || '');
                // RM no mesmo formato usado pelo lib.js: 6 dígitos prefixados com zeros
                var rmFormatado = a.Codigo
                    ? 'RM - ' + ('000000' + String(a.Codigo)).slice(-6)
                    : '';
                var rmSafe    = escapeHtml(rmFormatado);
                var escola    = escapeHtml(a.Escola || '');
                var curso     = escapeHtml(a.Curso || '');
                var turma     = a.Turma ? String(a.Turma).trim() : '';
                var turmaSafe = escapeHtml(turma);
                var codCurso  = escapeHtml(a.CodCurso || '');
                var foto      = (a.Foto || '').replace('https://digite1.websiteseguro.com', 'http://digite.com.br');
                var fotoSafe  = escapeHtml(foto);
                var senhaNet  = escapeHtml(a.SenhaNet || '');
                var tipoAcesso= escapeHtml(a.TipoAcesso || '');
                var ciclo     = escapeHtml(a.Ciclo || '');
                var alunoCurso= escapeHtml(a.alunoCurso || '');
                var alunoTurma= escapeHtml(a.alunoTurma || '');
                var meta      = (curso ? curso : '') + (turma ? ' · ' + turmaSafe : '');
                var ativoCls  = (String(codigo) === String(codigoAtivo)) ? ' is-active' : '';

                // O .aluno-item carrega TODOS os data-* que o trocaAlunoClick (e
                // outros handlers do app) possam ler. Mantém compatibilidade com
                // a forma como a .fotoAtual é populada no lib.js.
                html += ''
                    + '<li>'
                    +   '<button type="button" class="aluno-item' + ativoCls + '"'
                    +     ' data-codigo="' + codigo + '"'
                    +     ' data-index="' + i + '"'
                    +     ' data-escola="' + escola + '"'
                    +     ' data-curso="' + curso + '"'
                    +     ' data-turma="' + turmaSafe + '"'
                    +     ' data-codcurso="' + codCurso + '"'
                    +     ' data-passnet="' + senhaNet + '"'
                    +     ' data-tipoacesso="' + tipoAcesso + '"'
                    +     ' data-ciclo="' + ciclo + '"'
                    +     ' data-alunocurso="' + alunoCurso + '"'
                    +     ' data-alunoturma="' + alunoTurma + '">'
                    +     '<span class="aluno-avatar">'
                    +       (foto ? '<img src="' + fotoSafe + '" alt="" onerror="this.remove()" />' : '')
                    +     '</span>'
                    +     '<span class="aluno-info">'
                    +       '<p class="aluno-nome">' + (nome || '(sem nome)') + '</p>'
                    +       (rmSafe ? '<p class="aluno-rm">' + rmSafe + '</p>' : '')
                    +       (meta ? '<p class="aluno-meta">' + meta + '</p>' : '')
                    +     '</span>'
                    +     '<span class="aluno-chevron" aria-hidden="true">'
                    +       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
                    +     '</span>'
                    +   '</button>'
                    + '</li>';
            }

            $list.html(html);
        };

        // Abre a sidebar — handler delegado + direto, para máxima compatibilidade
        function handleSidebarOpen(e) {
            console.log('[sidebar-alunos] click capturado em btnAlunosSidebar');
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            try {
                console.log('[sidebar-alunos] $alunos disponível?', typeof window.$alunos, window.$alunos && window.$alunos.length);
                window.renderAlunosSidebar();
            } catch (err) {
                console.error('[sidebar-alunos] erro ao renderizar:', err);
            }
            openSidebar();
            console.log('[sidebar-alunos] sidebar aberta, classe is-open:', $sidebar.hasClass('is-open'));
            return false;
        }

        // Handler delegado (funciona mesmo se o elemento for re-renderizado)
        $(document).on('click', '#btnAlunosSidebar', handleSidebarOpen);
        // Também ligado diretamente como reforço (em caso de event.stopPropagation por terceiros)
        $('#btnAlunosSidebar').on('click', handleSidebarOpen);

        // Fechar: botão X, backdrop, ESC
        $(document).on('click', '#btnCloseSidebar, #alunosBackdrop', closeSidebar);
        $(document).on('keydown', function (e) {
            if (e.key === 'Escape' && $sidebar.hasClass('is-open')) closeSidebar();
        });

        // Clique num aluno da lista — chama aplicarAluno (definida no lib.js)
        // que aplica os dados do aluno selecionado em toda a interface.
        $(document).on('click', '.aluno-item', function (e) {
            var $item  = $(this);
            var codigo = $item.data('codigo');
            var idx    = parseInt($item.data('index'), 10);
            closeSidebar();

            // Busca o objeto do aluno: primeiro pelo índice, depois pelo código.
            var aluno = null;
            if (window.$alunos && window.$alunos.length) {
                if (!isNaN(idx) && window.$alunos[idx]) {
                    aluno = window.$alunos[idx];
                } else {
                    for (var i = 0; i < window.$alunos.length; i++) {
                        if (String(window.$alunos[i].Codigo) === String(codigo)) {
                            aluno = window.$alunos[i];
                            break;
                        }
                    }
                }
            }

            if (!aluno) {
                console.warn('[sidebar-alunos] aluno não encontrado em window.$alunos (codigo=' + codigo + ')');
                return;
            }

            if (typeof window.aplicarAluno !== 'function') {
                console.warn('[sidebar-alunos] window.aplicarAluno não está definida ainda — verifique se lib.js v20260516y+ foi carregado');
                return;
            }

            try {
                window.aplicarAluno(aluno);

                // Marca o item ativo na lista
                $('.aluno-item').removeClass('is-active');
                $item.addClass('is-active');
            } catch (err) {
                console.error('[sidebar-alunos] erro em aplicarAluno:', err);
            }
        });
    })();
    </script>
</body>
</html>