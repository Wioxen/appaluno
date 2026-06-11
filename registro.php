<?php
/**
 * registro.php — Tela de login (cadastro/registro do aluno)
 *
 * Parâmetros esperados na URL:
 *   ?codescola=10          → código da escola (envia para a API e usa na imagem)
 *   ?id=42                 → IdSeiAlunoRegistro (envia para a API)
 *   ?deviceid=ABC123       → repassado no redirect de sucesso
 *   ?devicetoken=xyz       → repassado no redirect de sucesso
 *
 * Fluxo:
 *   1. Usuário preenche Matrícula (Codigo) e Senha (SenhaNet)
 *   2. POST para https://sistema2.com.br/WebApiSae/api/seialunocadastro
 *      enviando { Escola, Codigo, SenhaNet, IdSeiAlunoRegistro }
 *   3. 200/201 → redireciona para alunoapp.sistema2.com.br/index.php com os parâmetros
 *      500     → toast "Falha ao se comunicar com o serviço"
 *      outros  → toast "Dados inválidos"
 */

// ===== Leitura segura dos parâmetros GET =====
$codescola   = isset($_GET['codescola'])   ? preg_replace('/[^0-9]/', '', $_GET['codescola']) : '';
$id          = isset($_GET['id'])          ? preg_replace('/[^0-9]/', '', $_GET['id'])        : '';
$deviceid    = isset($_GET['deviceid'])    ? trim($_GET['deviceid'])                          : '';
$devicetoken = isset($_GET['devicetoken']) ? trim($_GET['devicetoken'])                       : '';

// Logo do cliente — sempre ./images/{codescola}.png
$logoUrl = './images/' . $codescola . '.png';

// Valores atribuídos do jeito que vêm (sem escape)
$codescolaSafe   = $codescola;
$idSafe          = $id;
$deviceidSafe    = $deviceid;
$devicetokenSafe = $devicetoken;
$logoUrlSafe     = $logoUrl;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta name="theme-color" content="#ffffff" />
    <title>Login</title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    <style>
        :root {
            --brand: #28a7a8;
            --brand-dark: #1f8a8b;
        }

        * { box-sizing: border-box; }

        html, body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            color: #1a1a1a;
        }

        /* Barra superior estilo modal */
        .top-bar {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 14px 18px;
            background: #f7f7f7;
            border-bottom: 1px solid #eaeaea;
            min-height: 52px;
        }

        .top-bar .close-btn {
            background: transparent;
            border: 0;
            padding: 4px 8px;
            color: #1e7be0;
            cursor: pointer;
            line-height: 1;
        }

        .top-bar .close-btn svg {
            width: 22px;
            height: 22px;
            stroke: #1e7be0;
        }

        /* Container */
        .login-wrap {
            width: 100%;
            max-width: 480px;
            margin: 0 auto;
            padding: 24px 24px 64px;
        }

        /* Logo do cliente */
        .client-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 8px 0 32px;
            min-height: 80px;
        }

        .client-logo img {
            max-width: 78%;
            max-height: 110px;
            object-fit: contain;
        }

        /* Título */
        .login-title {
            font-size: 28px;
            font-weight: 400;
            text-align: center;
            margin: 0 0 6px;
            color: #1a1a1a;
        }

        .login-subtitle {
            font-size: 14px;
            color: #4a4a4a;
            text-align: center;
            margin: 0 0 28px;
        }

        /* Form */
        .login-form .form-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 14px;
        }

        .login-form .form-row label {
            flex: 0 0 auto;
            min-width: 92px;
            text-align: right;
            font-size: 15px;
            color: #1a1a1a;
            font-weight: 400;
            margin: 0;
        }

        .login-form .form-row .form-control {
            flex: 1 1 auto;
            height: 38px;
            border-radius: 6px;
            border: 1px solid #c8c8c8;
            padding: 4px 10px;
            font-size: 15px;
            background: #ffffff;
            transition: border-color 0.15s, box-shadow 0.15s;
        }

        .login-form .form-row .form-control:focus {
            outline: none;
            border-color: var(--brand);
            box-shadow: 0 0 0 3px rgba(40, 167, 168, 0.18);
        }

        /* Botão de login estilo o da imagem (azul, arredondado, com ícone) */
        .login-btn-wrap {
            display: flex;
            justify-content: center;
            margin-top: 22px;
        }

        .btn-login {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 10px 28px 10px 18px;
            background: linear-gradient(180deg, #36a8e0 0%, #1a7fb8 100%);
            color: #ffffff;
            border: 0;
            border-radius: 999px;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0.5px;
            cursor: pointer;
            box-shadow:
                inset 0 1px 0 rgba(255,255,255,0.35),
                0 3px 10px rgba(26, 127, 184, 0.35);
            transition: transform 0.08s ease, box-shadow 0.15s;
        }

        .btn-login:hover:not(:disabled) {
            box-shadow:
                inset 0 1px 0 rgba(255,255,255,0.35),
                0 5px 14px rgba(26, 127, 184, 0.45);
        }

        .btn-login:active:not(:disabled) {
            transform: translateY(1px);
        }

        .btn-login:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .btn-login .icon-circle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: linear-gradient(180deg, #1a7fb8, #115a85);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .btn-login .icon-circle svg {
            width: 16px;
            height: 16px;
            fill: #ffffff;
        }

        /* Toast container */
        .toast-stack {
            position: fixed;
            top: 16px;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            z-index: 9999;
            pointer-events: none;
            padding: 0 16px;
        }

        .toast-msg {
            background: #1a1a1a;
            color: #ffffff;
            padding: 12px 18px;
            border-radius: 8px;
            font-size: 14px;
            max-width: 420px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.18);
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.25s, transform 0.25s;
            pointer-events: auto;
            text-align: center;
        }

        .toast-msg.show {
            opacity: 1;
            transform: translateY(0);
        }

        .toast-msg.toast-error   { background: #c0392b; }
        .toast-msg.toast-warning { background: #c98217; }

        /* Overlay de loading durante a requisição */
        .submit-overlay {
            position: fixed;
            inset: 0;
            background: rgba(255, 255, 255, 0.7);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9998;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
        }

        .submit-overlay.active { display: flex; }

        .submit-overlay .spinner {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 3px solid rgba(40,167,168,0.2);
            border-top-color: var(--brand);
            animation: spinit 0.9s linear infinite;
        }

        @keyframes spinit {
            to { transform: rotate(360deg); }
        }

        @media (max-width: 380px) {
            .login-form .form-row label { min-width: 84px; font-size: 14px; }
            .login-title { font-size: 24px; }
        }
    </style>
</head>
<body>

    <!-- Barra superior com X de fechar (estilo modal iOS) -->
    <div class="top-bar">
        <button type="button" class="close-btn" id="btnClose" aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6"  x2="6"  y2="18" />
                <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>
        </button>
    </div>

    <div class="login-wrap">

        <!-- Logo do cliente -->
        <div class="client-logo">
            <img id="clientLogo" src="<?php echo $logoUrlSafe; ?>" alt="Logo"
                 onerror="this.style.display='none'" />
        </div>

        <h1 class="login-title">Login</h1>
        <p class="login-subtitle">Informe os dados abaixo</p>

        <!-- Formulário -->
        <form id="loginForm" class="login-form" autocomplete="off" novalidate>
            <div class="form-row">
                <label for="inpMatricula">Matrícula:</label>
                <input type="text" id="inpMatricula" name="Codigo"
                       class="form-control" inputmode="numeric"
                       autocomplete="off" required />
            </div>

            <div class="form-row">
                <label for="inpSenha">Senha:</label>
                <input type="password" id="inpSenha" name="SenhaNet"
                       class="form-control" autocomplete="off" required />
            </div>

            <div class="login-btn-wrap">
                <button type="submit" class="btn-login" id="btnLogin">
                    <span class="icon-circle" aria-hidden="true">
                        <!-- Ícone cadeado -->
                        <svg viewBox="0 0 24 24">
                            <path d="M17 8h-1V6c0-2.76-2.24-5-5-5S6 3.24 6 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                        </svg>
                    </span>
                    Login
                </button>
            </div>
        </form>
    </div>

    <!-- Container de toasts -->
    <div class="toast-stack" id="toastStack" aria-live="polite"></div>

    <!-- Overlay de carregamento -->
    <div class="submit-overlay" id="submitOverlay" aria-hidden="true">
        <div class="spinner" role="status" aria-label="Carregando"></div>
    </div>

    <script>
        // ===== Parâmetros vindos do PHP =====
        var PARAMS = {
            codescola:   <?php echo json_encode($codescolaSafe); ?>,
            id:          <?php echo json_encode($idSafe); ?>,
            deviceid:    <?php echo json_encode($deviceidSafe); ?>,
            devicetoken: <?php echo json_encode($devicetokenSafe); ?>
        };

        var API_URL          = 'https://sistema2.com.br/WebApiSae/api/seialunocadastro';
        var API_REGISTRO_URL = 'https://sistema2.com.br/WebApiSae/api/seialunoregistro';
        var REDIRECT_URL     = 'https://alunoapp.sistema2.com.br/index.php';

        // ===== Toast =====
        function showToast(msg, type) {
            type = type || 'error';
            var $stack = $('#toastStack');
            var $t = $('<div class="toast-msg toast-' + type + '"></div>').text(msg);
            $stack.append($t);
            // força reflow para animar
            $t[0].offsetHeight;
            $t.addClass('show');

            setTimeout(function () {
                $t.removeClass('show');
                setTimeout(function () { $t.remove(); }, 300);
            }, 3500);
        }

        // ===== Overlay =====
        function setLoading(active) {
            $('#submitOverlay').toggleClass('active', !!active);
            $('#btnLogin').prop('disabled', !!active);
        }

        // ===== Redirect pós-sucesso =====
        function redirectToApp() {
            var qs =
                'codescola='    + PARAMS.codescola +
                '&deviceid='    + PARAMS.deviceid +
                '&id='          + PARAMS.id +
                '&devicetoken=' + PARAMS.devicetoken;
            window.location.href = REDIRECT_URL + '?' + qs;
        }

        // ===== Submit =====
        $('#loginForm').on('submit', function (e) {
            e.preventDefault();

            var matricula = $.trim($('#inpMatricula').val());
            var senha     = $('#inpSenha').val();

            if (matricula === '' || senha === '') {
                showToast('Preencha matrícula e senha', 'warning');
                return;
            }

            var payload = {
                Escola:              PARAMS.codescola,
                Codigo:              matricula,
                SenhaNet:            senha,
                IdSeiAlunoRegistro:  PARAMS.id
            };

            setLoading(true);

            $.ajax({
                url: API_URL,
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(payload),
                timeout: 20000
            })
            .done(function (data, textStatus, jqXHR) {
                // 200 ou 201 → sucesso
                if (jqXHR.status === 200 || jqXHR.status === 201) {
                    redirectToApp();
                } else {
                    // qualquer outro 2xx que não seja 200/201 → trata como inválido
                    setLoading(false);
                    showToast('Dados inválidos', 'error');
                }
            })
            .fail(function (jqXHR) {
                setLoading(false);
                if (jqXHR.status === 500) {
                    showToast('Falha ao se comunicar com o serviço', 'error');
                } else {
                    showToast('Dados inválidos', 'error');
                }
            });
        });

        // Botão de fechar — só permite sair se houver aluno cadastrado
        $('#btnClose').on('click', function () {
            setLoading(true);

            $.ajax({
                url: API_REGISTRO_URL,
                method: 'GET',
                data: { id: PARAMS.id },
                dataType: 'json',
                timeout: 20000
            })
            .done(function (data, textStatus, jqXHR) {
                setLoading(false);

                if (jqXHR.status !== 200) {
                    showToast('Cadastre ao menos um aluno antes de continuar', 'warning');
                    return;
                }

                // Aceita tanto data sendo um array direto quanto um objeto com array dentro
                var lista = Array.isArray(data) ? data
                          : (data && Array.isArray(data.data) ? data.data : null);

                if (!lista || lista.length === 0) {
                    showToast('Cadastre ao menos um aluno antes de continuar', 'warning');
                    return;
                }

                var primeiro = lista[0];
                var qte = primeiro && primeiro.qte != null ? Number(primeiro.qte) : 0;

                if (qte > 0) {
                    redirectToApp();
                } else {
                    showToast('Cadastre ao menos um aluno antes de continuar', 'warning');
                }
            })
            .fail(function (jqXHR) {
                setLoading(false);
                if (jqXHR.status === 500) {
                    showToast('Falha ao se comunicar com o serviço', 'error');
                } else {
                    showToast('Cadastre ao menos um aluno antes de continuar', 'warning');
                }
            });
        });

        // Foco automático na matrícula
        $(function () { $('#inpMatricula').trigger('focus'); });
    </script>

</body>
</html>
