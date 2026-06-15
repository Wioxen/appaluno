<?php
/**
 * notificacao.php — Timeline de notificações do app
 *
 * Parâmetros GET:
 *   ?codescola=241        → Escola (enviado para a API)
 *   ?deviceid=ABC123      → uniqueID (enviado para a API)
 *   ?pagina=1             → página inicial (default 1)
 *
 * Endpoint (POST): https://www.api.sistema2.com.br/webapisae/api/CarregaNotificacao
 *   Body: { Escola, uniqueID, pagina }
 *   Resposta: { indicadorContinuidade: bool, data: [ { Id, Titulo, Texto, Link, Data, ... } ] }
 *
 * As notificações são exibidas em ordem decrescente de data.
 * Os links abrem via window.open(link, '_blank').
 */

// ===== Parâmetros de entrada (do jeito que vêm) =====
$codescola = isset($_GET['codescola']) ? $_GET['codescola'] : '';
$deviceid  = isset($_GET['deviceid'])  ? $_GET['deviceid']  : '';
$pagina    = isset($_GET['pagina'])    ? (int) $_GET['pagina'] : 1;
if ($pagina < 1) { $pagina = 1; }

$jsonFlags = JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT;
$bootJson = json_encode([
    'codescola' => $codescola,
    'deviceid'  => $deviceid,
    'pagina'    => $pagina,
], $jsonFlags);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta name="theme-color" content="#28a7a8" />
    <title>Notificações</title>
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

        .wrap { max-width: 640px; margin: 0 auto; padding: 18px 16px 90px; }

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
            width: 44px; height: 44px; background: rgba(255, 255, 255, 0.2); border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); flex-shrink: 0;
        }
        .hero-icon i { font-size: 22px; color: #fff; }
        .hero-title { font-size: 24px; font-weight: 700; line-height: 1.2; margin: 0; }
        .hero-subtitle {
            font-size: 14px; opacity: 0.9; font-weight: 400; line-height: 1.5;
            position: relative; z-index: 1;
        }

        /* Timeline */
        .timeline { position: relative; margin: 8px 0 0; padding-left: 48px; }
        .timeline::before {
            content: ""; position: absolute; left: 17px; top: 6px; bottom: 6px;
            width: 2px; background: linear-gradient(180deg, var(--brand), rgba(40,167,168,.25));
        }
        .tl-item { position: relative; margin-bottom: 18px; }
        .tl-dot {
            position: absolute; left: -48px; top: 2px;
            width: 36px; height: 36px; border-radius: 50%;
            background: var(--brand); border: 2px solid #fff;
            box-shadow: 0 0 0 2px rgba(40,167,168,.25);
            display: flex; align-items: center; justify-content: center;
            overflow: hidden; z-index: 1;
        }
        .tl-dot i { color: #fff; font-size: 16px; }
        .tl-dot img { width: 100%; height: 100%; object-fit: cover; display: none; }
        .tl-dot.has-foto img { display: block; }
        .tl-dot.has-foto i { display: none; }
        .tl-date { font-size: 12.5px; color: var(--brand-dark); font-weight: 600; margin-bottom: 6px; }
        .tl-card {
            background: #ffffff; border: 1px solid #ececec; border-radius: 12px;
            padding: 14px 16px; box-shadow: 0 1px 3px rgba(0,0,0,.05);
        }
        .tl-title { font-size: 15.5px; font-weight: 600; margin: 0 0 6px; color: #16494a; line-height: 1.3; }
        .tl-text { font-size: 14px; color: #444; white-space: pre-line; margin: 0; line-height: 1.45; }
        .tl-open {
            display: inline-flex; align-items: center; gap: 7px; margin-top: 12px;
            padding: 8px 16px; border: 0; border-radius: 999px; cursor: pointer;
            background: linear-gradient(180deg, var(--brand) 0%, var(--brand-dark) 100%);
            color: #fff; font-size: 14px; font-weight: 600;
            box-shadow: 0 2px 8px rgba(40,167,168,.3);
        }
        .tl-open:active { transform: translateY(1px); }
        .tl-open svg { width: 15px; height: 15px; fill: #fff; }

        /* Estados */
        .state { text-align: center; color: #777; padding: 60px 20px; font-size: 15px; }
        .state .spinner {
            width: 44px; height: 44px; margin: 0 auto 16px; border-radius: 50%;
            border: 3px solid rgba(40,167,168,.2); border-top-color: var(--brand);
            animation: spin .9s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Paginação */
        .pager {
            position: fixed; left: 0; right: 0; bottom: 0; z-index: 10;
            display: flex; align-items: center; justify-content: center; gap: 14px;
            padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
            background: rgba(255,255,255,.96); border-top: 1px solid #eaeaea;
            backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
        }
        .pager button {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 9px 18px; border: 1px solid var(--brand); border-radius: 999px;
            background: #fff; color: var(--brand-dark); font-size: 14px; font-weight: 600; cursor: pointer;
        }
        .pager button:disabled { opacity: .4; cursor: not-allowed; border-color: #ccc; color: #999; }
        .pager .page-ind { font-size: 14px; color: #555; min-width: 84px; text-align: center; }
    </style>
</head>
<body>

    <div class="wrap">

        <!-- HEADER COM GRADIENTE (padrão yba-compartilha) -->
        <div class="hero-card">
            <div class="hero-header">
                <div class="hero-icon"><i class="bi bi-bell-fill"></i></div>
                <h1 class="hero-title">Notificações</h1>
            </div>
            <div class="hero-subtitle">Acompanhe os comunicados e avisos mais recentes da escola.</div>
        </div>

        <div id="timeline" class="timeline" style="display:none;"></div>
        <div id="state" class="state"><div class="spinner"></div>Carregando notificações...</div>
    </div>

    <div class="pager">
        <button type="button" id="btnPrev" disabled>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z"/></svg>
            Anterior
        </button>
        <span class="page-ind" id="pageInd">Página 1</span>
        <button type="button" id="btnNext" disabled>
            Próxima
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8.6 16.6 13.2 12 8.6 7.4 10 6l6 6-6 6z"/></svg>
        </button>
    </div>

    <script>
        var BOOT = <?php echo $bootJson; ?>;
        var API_URL = 'https://www.api.sistema2.com.br/webapisae/api/CarregaNotificacao';
        var TOKEN   = 'Bearer a6db2e47da0e40e8be13aaa93287b14f';

        var paginaAtual = BOOT.pagina || 1;
        var temProxima  = false;
        var carregando  = false;

        // Converte "dd/MM/yyyy HH:mm:ss" em timestamp para ordenar decrescente
        function parseData(s) {
            if (!s) return 0;
            var m = String(s).match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/);
            if (!m) return 0;
            return new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5], +m[6]).getTime();
        }

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

        function render(lista) {
            var $tl = $('#timeline').empty();

            // Ordena decrescente pela data
            lista.sort(function (a, b) { return parseData(b.Data) - parseData(a.Data); });

            lista.forEach(function (n) {
                var temLink = n.Link && String(n.Link).trim() !== '';
                var $item = $(
                    '<div class="tl-item">' +
                        '<div class="tl-dot" data-codigo="' + escapeHtml(n.Codigo) + '">' +
                            '<i class="bi bi-person-fill"></i>' +
                            '<img class="tl-foto" alt="" onerror="this.style.display=\'none\'" />' +
                        '</div>' +
                        '<div class="tl-date">' + escapeHtml(n.Data) + '</div>' +
                        '<div class="tl-card">' +
                            '<p class="tl-title">' + escapeHtml(n.Titulo) + '</p>' +
                            '<p class="tl-text">' + escapeHtml(String(n.Texto || '').trim()) + '</p>' +
                            (temLink
                                ? '<button type="button" class="tl-open" data-link="' + escapeHtml(n.Link) + '">' +
                                    '<svg viewBox="0 0 24 24"><path d="M14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3h-7zM5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z"/></svg>' +
                                    'Abrir' +
                                  '</button>'
                                : '') +
                        '</div>' +
                    '</div>'
                );
                $tl.append($item);
            });

            $tl.show();
        }

        function atualizarPager() {
            $('#pageInd').text('Página ' + paginaAtual);
            $('#btnPrev').prop('disabled', carregando || paginaAtual <= 1);
            $('#btnNext').prop('disabled', carregando || !temProxima);
        }

        function carregar(pagina) {
            if (carregando) return;
            carregando = true;
            $('#timeline').hide();
            setState('Carregando notificações...', true);
            atualizarPager();

            $.ajax({
                url: API_URL,
                method: 'POST',
                headers: { 'Authorization': TOKEN },
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    Escola:   BOOT.codescola,
                    uniqueID: BOOT.deviceid,
                    pagina:   pagina
                }),
                timeout: 20000
            })
            .done(function (resp) {
                paginaAtual = pagina;
                temProxima  = !!(resp && resp.indicadorContinuidade);
                var lista   = (resp && Array.isArray(resp.data)) ? resp.data : [];

                if (lista.length === 0) {
                    setState(pagina > 1 ? 'Não há mais notificações.' : 'Nenhuma notificação encontrada.', false);
                } else {
                    setState('', false);
                    render(lista);
                    carregarFotos(lista);
                    window.scrollTo(0, 0);
                }
            })
            .fail(function () {
                setState('Falha ao carregar as notificações. Tente novamente.', false);
                temProxima = false;
            })
            .always(function () {
                carregando = false;
                atualizarPager();
                // Atualiza a URL (sem recarregar) para refletir a página atual
                if (window.history && history.replaceState) {
                    var qs = 'codescola=' + BOOT.codescola + '&deviceid=' + BOOT.deviceid + '&pagina=' + paginaAtual;
                    history.replaceState(null, '', 'notificacao.php?' + qs);
                }
            });
        }

        // ===== Foto do aluno no avatar da timeline =====
        var FOTO_API  = 'https://api.sistema2.com.br/WebApiSae/api/fotoaluno';
        var FOTO_BASE = 'https://digite1.websiteseguro.com/fotoaluno/';
        var fotoCache = {}; // Codigo -> url (string) | null

        function aplicarFoto(codigo, url) {
            if (!url) return;
            $('.tl-dot[data-codigo="' + codigo + '"]').each(function () {
                var $dot = $(this);
                $dot.find('img').attr('src', url);
                $dot.addClass('has-foto');
            });
        }

        function carregarFotos(lista) {
            var codigos = {};
            lista.forEach(function (n) { if (n.Codigo != null) codigos[n.Codigo] = true; });

            Object.keys(codigos).forEach(function (codigo) {
                if (fotoCache.hasOwnProperty(codigo)) { aplicarFoto(codigo, fotoCache[codigo]); return; }

                $.ajax({
                    url: FOTO_API,
                    method: 'GET',
                    headers: { 'Authorization': TOKEN },
                    data: { Escola: BOOT.codescola, Codigo: codigo },
                    dataType: 'json',
                    timeout: 15000
                })
                .done(function (resp) {
                    var url = (resp && resp.Foto) ? FOTO_BASE + resp.Foto : null;
                    fotoCache[codigo] = url;
                    aplicarFoto(codigo, url);
                })
                .fail(function () { fotoCache[codigo] = null; });
            });
        }

        // Abrir link da notificação
        $(document).on('click', '.tl-open', function () {
            var link = $(this).attr('data-link');
            if (!link) return;

            // No Android, abre pelo visualizador do Google. Imagens usam o viewer do
            // Drive; demais arquivos (PDF etc.) usam o viewer do Docs.
            if (/android/i.test(navigator.userAgent)) {
                var ext = (link.split(/[?#]/)[0].split('.').pop() || '').toLowerCase();
                var viewer = /^(jpg|jpeg|png|gif|bmp|webp|heic|heif|tif|tiff|svg)$/.test(ext)
                    ? 'https://drive.google.com/gview?embedded=1&url='
                    : 'https://docs.google.com/gview?embedded=1&url=';
                link = viewer + link;
            }

            window.open(link, '_blank');
        });

        $('#btnPrev').on('click', function () { if (paginaAtual > 1) carregar(paginaAtual - 1); });
        $('#btnNext').on('click', function () { if (temProxima) carregar(paginaAtual + 1); });

        // Carga inicial
        carregar(paginaAtual);
    </script>

</body>
</html>
