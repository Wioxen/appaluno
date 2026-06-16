<?php
/**
 * boleto.php — Lista de boletos do aluno
 *
 * Parâmetros GET:
 *   ?codescola=241   → Escola
 *   ?codigo=13       → Código/RM do aluno
 *   ?senhanet=XXXXX  → Senha do aluno (SenhaNet)
 *
 * Endpoint (GET):
 *   https://api-boleto.digite.com.br/boletobancario?escola=&codigo=&senhanet=
 *   Resposta: [ { dItemDeConsumo, dtVencimento, valor, ld, token }, ... ]  (404 = sem boletos)
 *
 * - Botão "Linha Digitável": copia a propriedade ld para a área de transferência.
 * - Botão "Visualizar Boleto": abre via url.php (redirect.php com o token).
 */

// ===== Parâmetros de entrada (do jeito que vêm) =====
$codescola = isset($_GET['codescola']) ? $_GET['codescola'] : '';
$codigo    = isset($_GET['codigo'])    ? $_GET['codigo']    : '';
$senhanet  = isset($_GET['senhanet'])  ? $_GET['senhanet']  : '';

$jsonFlags = JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT;
$bootJson = json_encode([
    'codescola' => $codescola,
    'codigo'    => $codigo,
    'senhanet'  => $senhanet,
], $jsonFlags);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta name="theme-color" content="#28a7a8" />
    <title>Boletos</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <style>
        :root { --brand: #28a7a8; --brand-dark: #1f8a8b; }
        * { box-sizing: border-box; }
        html, body {
            margin: 0; padding: 0; min-height: 100vh; background: #f5f6f7;
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            -webkit-font-smoothing: antialiased; color: #1a1a1a;
        }

        .wrap { max-width: 640px; margin: 0 auto; padding: 18px 16px 40px; }

        /* ===== HEADER COM GRADIENTE (padrão yba-compartilha) ===== */
        .hero-card {
            background: linear-gradient(135deg, #2bb6b7 0%, #1f8a8b 100%);
            border-radius: 20px; padding: 24px; color: #fff; position: relative;
            overflow: hidden; margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(31, 138, 139, 0.25);
        }
        .hero-card::before {
            content: ''; position: absolute; top: -40px; right: -40px;
            width: 180px; height: 180px; background: rgba(255, 255, 255, 0.08); border-radius: 50%;
        }
        .hero-card::after {
            content: ''; position: absolute; bottom: -60px; right: 40px;
            width: 120px; height: 120px; background: rgba(255, 255, 255, 0.05); border-radius: 50%;
        }
        .hero-header {
            display: flex; align-items: center; gap: 14px; margin-bottom: 12px;
            position: relative; z-index: 1;
        }
        .hero-icon {
            width: 48px; height: 48px; background: rgba(255, 255, 255, 0.2); border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); flex-shrink: 0;
            overflow: hidden; border: 2px solid #fff;
        }
        .hero-icon i { font-size: 22px; color: #fff; }
        .hero-icon img { width: 100%; height: 100%; object-fit: cover; display: none; }
        .hero-icon.has-foto img { display: block; }
        .hero-icon.has-foto i { display: none; }
        .hero-title { font-size: 20px; font-weight: 700; line-height: 1.2; margin: 0; }
        .hero-subtitle {
            font-size: 14px; opacity: 0.9; font-weight: 400; line-height: 1.5;
            position: relative; z-index: 1;
        }

        /* ===== Lista de boletos ===== */
        .boleto-list { display: flex; flex-direction: column; gap: 12px; }
        .boleto-card {
            background: #ffffff; border: 1px solid #ececec; border-radius: 14px;
            padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,.05);
        }
        .boleto-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
        .boleto-title { font-size: 15px; font-weight: 600; color: #16494a; line-height: 1.3; }
        .boleto-status {
            flex-shrink: 0; font-size: 11.5px; font-weight: 700; line-height: 1;
            padding: 5px 11px; border-radius: 999px; white-space: nowrap;
        }
        .st-vencido { background: #fdecea; color: #c0392b; }
        .st-hoje    { background: #ffd84d; color: #5c4500; }
        .st-aberto  { background: #e7f3ef; color: #1f8a5b; }
        .boleto-meta { font-size: 12.5px; color: #777; margin-top: 6px; }
        .boleto-valor { font-size: 22px; font-weight: 700; color: #1a1a1a; margin: 8px 0 14px; }
        .boleto-actions { display: flex; flex-direction: column; gap: 8px; }
        .boleto-btn {
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            width: 100%; padding: 11px 16px; border-radius: 10px; cursor: pointer;
            font-size: 14px; font-weight: 600; border: 0;
        }
        .boleto-btn svg, .boleto-btn i { font-size: 16px; }
        .btn-ld, .btn-ver { background: #eef4f4; color: var(--brand-dark); border: 1px solid #d7e7e7; }
        .btn-ld:active, .btn-ver:active { background: #e2efef; }

        /* Estados */
        .state { text-align: center; color: #777; padding: 60px 20px; font-size: 15px; }
        .state .spinner {
            width: 44px; height: 44px; margin: 0 auto 16px; border-radius: 50%;
            border: 3px solid rgba(40,167,168,.2); border-top-color: var(--brand);
            animation: spin .9s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Toast */
        .toast-msg {
            position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%) translateY(10px);
            background: #1a1a1a; color: #fff; padding: 12px 18px; border-radius: 10px;
            font-size: 14px; box-shadow: 0 6px 20px rgba(0,0,0,.25); opacity: 0;
            transition: opacity .25s, transform .25s; z-index: 9999; pointer-events: none;
            max-width: 90%; text-align: center;
        }
        .toast-msg.show { opacity: 1; transform: translateX(-50%) translateY(0); }
    </style>
</head>
<body>

    <div class="wrap">

        <!-- HEADER COM GRADIENTE -->
        <div class="hero-card">
            <div class="hero-header">
                <div class="hero-icon" id="heroIcon">
                    <i class="bi bi-upc-scan"></i>
                    <img alt="" onerror="this.style.display='none'" />
                </div>
                <h1 class="hero-title">BOLETOS</h1>
            </div>
            <div class="hero-subtitle">Segunda via dos seus boletos.</div>
        </div>

        <div id="lista" class="boleto-list" style="display:none;"></div>
        <div id="state" class="state"><div class="spinner"></div>Carregando boletos...</div>
    </div>

    <div class="toast-msg" id="toast"></div>

    <script>
        var BOOT = <?php echo $bootJson; ?>;
        var API_BOLETO = 'https://api-boleto.digite.com.br/boletobancario';
        var REDIRECT   = 'https://boleto.digite.com.br/redirect.php';
        var FOTO_API   = 'https://api.sistema2.com.br/WebApiSae/api/fotoaluno';
        var FOTO_BASE  = 'https://digite1.websiteseguro.com/fotoaluno/';
        var TOKEN      = 'Bearer a6db2e47da0e40e8be13aaa93287b14f';

        // Nunca armazenar em cache as requisições AJAX
        $.ajaxSetup({ cache: false });

        function escapeHtml(s) {
            return String(s == null ? '' : s)
                .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }

        function setState(msg, spinner) {
            var $s = $('#state');
            if (!msg) { $s.hide(); return; }
            $s.html((spinner ? '<div class="spinner"></div>' : '') + escapeHtml(msg)).show();
        }

        // R$ 1.234,56
        function formatMoeda(v) {
            var n = parseFloat(v);
            if (isNaN(n)) return 'R$ 0,00';
            return 'R$ ' + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
        }

        var toastTimer = null;
        function showToast(msg) {
            var $t = $('#toast').text(msg).addClass('show');
            if (toastTimer) clearTimeout(toastTimer);
            toastTimer = setTimeout(function () { $t.removeClass('show'); }, 2500);
        }

        // Copia a linha digitável para a área de transferência (compatível com WebView)
        function copiarLD(texto) {
            if (!texto) return;
            var ok = false;
            try {
                var ta = document.createElement('textarea');
                ta.value = texto;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.focus();
                ta.select();
                ta.setSelectionRange(0, ta.value.length);
                ok = document.execCommand('copy');
                document.body.removeChild(ta);
            } catch (e) { ok = false; }

            if (ok) { showToast('Linha digitável copiada!'); return; }

            // Fallback assíncrono (navegadores/WebViews que bloqueiam execCommand)
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(texto).then(
                    function () { showToast('Linha digitável copiada!'); },
                    function () { showToast('Não foi possível copiar.'); }
                );
                return;
            }
            showToast('Não foi possível copiar.');
        }

        function montarUrlBoleto(b) {
            return REDIRECT + '?codEscola=' + BOOT.codescola +
                   '&codigo=' + BOOT.codigo + '&token=' + (b.token || '');
        }

        // Status do boleto pela data de vencimento (dd/MM/yyyy)
        function statusVenc(dt) {
            var m = String(dt || '').match(/(\d{2})\/(\d{2})\/(\d{4})/);
            if (!m) return null;
            var venc = new Date(+m[3], +m[2] - 1, +m[1]);
            var h = new Date();
            var hoje = new Date(h.getFullYear(), h.getMonth(), h.getDate());
            if (venc.getTime() < hoje.getTime()) {
                var dias = Math.round((hoje.getTime() - venc.getTime()) / 86400000);
                return { label: 'Vencido há ' + dias + (dias === 1 ? ' dia' : ' dias'), cls: 'st-vencido' };
            }
            if (venc.getTime() === hoje.getTime()) return { label: 'Vence hoje', cls: 'st-hoje' };
            var dias = Math.round((venc.getTime() - hoje.getTime()) / 86400000);
            return { label: 'Vence em ' + dias + (dias === 1 ? ' dia' : ' dias'), cls: 'st-aberto' };
        }

        function render(lista) {
            var $l = $('#lista').empty();

            lista.forEach(function (b) {
                var titulo = (b.dItemDeConsumo || 'Boleto');
                var st = statusVenc(b.dtVencimento);
                var $card = $(
                    '<div class="boleto-card">' +
                        '<div class="boleto-head">' +
                            '<span class="boleto-title">' + escapeHtml(titulo) + '</span>' +
                            (st ? '<span class="boleto-status ' + st.cls + '">' + st.label + '</span>' : '') +
                        '</div>' +
                        (b.dtVencimento ? '<div class="boleto-meta">Vencimento: ' + escapeHtml(b.dtVencimento) + '</div>' : '') +
                        '<div class="boleto-valor">' + formatMoeda(b.valor) + '</div>' +
                        '<div class="boleto-actions">' +
                            '<button type="button" class="boleto-btn btn-ld" data-ld="' + escapeHtml(b.ld) + '">' +
                                '<i class="bi bi-files"></i> Linha Digitável' +
                            '</button>' +
                            '<button type="button" class="boleto-btn btn-ver" data-url="' + escapeHtml(montarUrlBoleto(b)) + '">' +
                                '<i class="bi bi-upc-scan"></i> Ver Boleto' +
                            '</button>' +
                        '</div>' +
                    '</div>'
                );
                $l.append($card);
            });

            $l.show();
        }

        function carregar() {
            setState('Carregando boletos...', true);
            $.ajax({
                url: API_BOLETO + '?escola=' + encodeURIComponent(BOOT.codescola) +
                                  '&codigo=' + encodeURIComponent(BOOT.codigo) +
                                  '&senhanet=' + encodeURIComponent(BOOT.senhanet),
                method: 'GET',
                dataType: 'json',
                cache: false,
                timeout: 20000
            })
            .done(function (resp) {
                var lista = Array.isArray(resp) ? resp
                          : (resp && Array.isArray(resp.data) ? resp.data : []);
                if (lista.length === 0) {
                    setState('Nenhum boleto encontrado.', false);
                } else {
                    setState('', false);
                    render(lista);
                }
            })
            .fail(function () {
                // 404 = sem boletos
                setState('Nenhum boleto encontrado.', false);
            });
        }

        // ===== Foto do aluno no header =====
        function carregarFotoAluno() {
            $.ajax({
                url: FOTO_API, method: 'GET', headers: { 'Authorization': TOKEN },
                data: { Escola: BOOT.codescola, Codigo: BOOT.codigo }, dataType: 'json', timeout: 15000
            })
            .done(function (resp) {
                var url = (resp && resp.Foto) ? FOTO_BASE + resp.Foto : null;
                if (!url) return;
                $('#heroIcon img').attr('src', url);
                $('#heroIcon').addClass('has-foto');
            });
        }

        // Copiar linha digitável
        $(document).on('click', '.btn-ld', function () {
            copiarLD($(this).attr('data-ld'));
        });

        // Visualizar boleto (via url.php)
        $(document).on('click', '.btn-ver', function () {
            var url = $(this).attr('data-url');
            if (url) window.open(url, '_blank');
        });

        carregarFotoAluno();
        carregar();
    </script>

</body>
</html>
