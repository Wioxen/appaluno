<?php
/**
 * tarefa.php — Timeline de tarefas (agenda) do aluno
 *
 * Parâmetros GET:
 *   ?codescola=241   → Escola (enviado para a API)
 *   ?codigo=13       → Código/RM do aluno (enviado para a API)
 *   ?pagina=1        → página inicial (default 1)
 *
 * Endpoint (POST, query string + corpo vazio):
 *   https://api.sistema2.com.br/WebApiSaeCore/api/carregatarefa?escola=&codigo=&pagina=
 *   Resposta: [ { id, codigo, data, disciplina, descricao, casasala, coddisciplina, conteudo, casa, sala }, ... ]
 *
 * Documentos da tarefa (opcional):
 *   GET  .../api/tarefadoc?escola=&tarefacodigo=   → [ { id, descricao, casasala }, ... ]
 *   POST .../api/tarefadoc/{id}                    → { arquivo: url }
 *
 * As tarefas são exibidas em ordem decrescente de data.
 * Os anexos abrem via window.open (no Android: imagem nativa; demais via Google Docs).
 */

// ===== Parâmetros de entrada (do jeito que vêm) =====
$codescola = isset($_GET['codescola']) ? $_GET['codescola'] : '';
$codigo    = isset($_GET['codigo'])    ? $_GET['codigo']    : '';
$pagina    = isset($_GET['pagina'])    ? (int) $_GET['pagina'] : 1;
if ($pagina < 1) { $pagina = 1; }

$jsonFlags = JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT;
$bootJson = json_encode([
    'codescola' => $codescola,
    'codigo'    => $codigo,
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
    <title>Agenda</title>
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
        .hero-title { font-size: 20px; font-weight: 700; line-height: 1.2; margin: 0; }
        .hero-subtitle {
            font-size: 14px; opacity: 0.9; font-weight: 400; line-height: 1.5;
            position: relative; z-index: 1;
        }

        /* Timeline */
        .timeline { position: relative; margin: 8px 0 0; padding-left: 48px; }
        .timeline::before {
            content: ""; position: absolute; left: 19px; top: 6px; bottom: 6px;
            width: 2px; background: linear-gradient(180deg, var(--brand), rgba(40,167,168,.25));
        }
        .tl-item { position: relative; margin-bottom: 18px; }
        .tl-dot {
            position: absolute; left: -48px; top: 2px;
            width: 40px; height: 40px; border-radius: 10px;
            background: var(--brand); border: 2px solid #fff;
            box-shadow: 0 0 0 2px rgba(40,167,168,.25);
            display: flex; align-items: center; justify-content: center;
            overflow: hidden; z-index: 1;
        }
        .tl-dot i { color: #fff; font-size: 16px; }
        .tl-dot img {
            width: 100%; height: 100%;
            object-fit: cover;
            aspect-ratio: 40 / 40;
            border: 0;
            text-align: center;
            user-select: none; -webkit-user-select: none;
            display: none;
        }
        .tl-dot.has-foto img { display: block; }
        .tl-dot.has-foto i { display: none; }
        .tl-date {
            font-size: 13px; color: var(--brand-dark); font-weight: 600; margin-bottom: 6px;
            display: inline-flex; align-items: center; gap: 6px;
        }
        .tl-date i { font-size: 15px; }
        .tl-card {
            background: #ffffff; border: 1px solid #ececec; border-radius: 12px;
            padding: 2px 16px; box-shadow: 0 1px 3px rgba(0,0,0,.05);
        }
        /* Collapse de Casa / Sala dentro de cada data */
        .tl-collapse { border-top: 1px solid #f0f0f0; }
        .tl-collapse:first-child { border-top: 0; }
        .tl-collapse-head {
            width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 10px;
            background: none; border: 0; padding: 12px 0; cursor: pointer;
            font-size: 14px; font-weight: 600; color: #16494a; text-align: left;
        }
        .tl-ctitle { display: inline-flex; align-items: center; gap: 8px; }
        .tl-ctitle i { color: var(--brand); font-size: 16px; }
        .tl-tipo-badge {
            display: inline-block; font-size: 12px; font-weight: 700; line-height: 1;
            padding: 5px 12px; border-radius: 999px; letter-spacing: .5px;
        }
        .tl-tipo-casa { background: #e7f3ef; color: #1f8a5b; }
        .tl-tipo-sala { background: #eaf0fb; color: #2c5fb3; }
        .tl-chevron { transition: transform .2s; color: #9aa0a6; font-size: 14px; flex-shrink: 0; }
        .tl-collapse.open .tl-chevron { transform: rotate(180deg); }
        .tl-collapse-body { display: none; padding-bottom: 8px; }
        .tl-collapse.open .tl-collapse-body { display: block; }
        .tl-disc { font-size: 14px; color: #444; line-height: 1.5; padding: 8px 0; border-top: 1px dashed #eee; }
        .tl-disc:first-child { border-top: 0; }
        .tl-disc strong { color: #16494a; }
        .tl-open {
            display: inline-flex; align-items: center; gap: 7px; margin-top: 12px; margin-right: 8px;
            padding: 8px 16px; border: 0; border-radius: 999px; cursor: pointer;
            background: linear-gradient(180deg, var(--brand) 0%, var(--brand-dark) 100%);
            color: #fff; font-size: 14px; font-weight: 600;
            box-shadow: 0 2px 8px rgba(40,167,168,.3);
        }
        .tl-open:active { transform: translateY(1px); }
        .tl-open:disabled { opacity: .6; cursor: default; }
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
                <div class="hero-icon"><i class="bi bi-journal-text"></i></div>
                <h1 class="hero-title">AGENDA</h1>
            </div>
            <div class="hero-subtitle">Tarefas de casa e de sala das disciplinas.</div>
        </div>

        <div id="timeline" class="timeline" style="display:none;"></div>
        <div id="state" class="state"><div class="spinner"></div>Carregando tarefas...</div>
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
        var API_BASE     = 'https://api.sistema2.com.br/WebApiSaeCore/api/';
        var API_TAREFA   = API_BASE + 'carregatarefa';
        var DOC_LIST_API = API_BASE + 'tarefadoc';
        var DOC_OPEN_API = API_BASE + 'tarefadoc/';
        var FOTO_API     = 'https://api.sistema2.com.br/WebApiSae/api/fotoaluno';
        var FOTO_BASE    = 'https://digite1.websiteseguro.com/fotoaluno/';
        var TOKEN        = 'Bearer a6db2e47da0e40e8be13aaa93287b14f';

        var paginaAtual = BOOT.pagina || 1;
        var temProxima  = false;
        var carregando  = false;
        var fotoAluno   = null; // url da foto do aluno (mesma p/ todas as tarefas)

        // Converte "dd/MM/yyyy HH:mm:ss" em timestamp para ordenar decrescente
        function parseData(s) {
            if (!s) return 0;
            var m = String(s).match(/(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?/);
            if (!m) return 0;
            return new Date(+m[3], +m[2] - 1, +m[1], +(m[4]||0), +(m[5]||0), +(m[6]||0)).getTime();
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

        var SEMANAS = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
        var MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

        // "dd/MM/yyyy ..." → "HOJE" se for a data corrente; senão a data por extenso
        function dataExtenso(dataStr) {
            var ts = parseData(dataStr);
            if (!ts) return (dataStr || '').split(' ')[0];
            var d = new Date(ts);
            var h = new Date();
            if (d.getFullYear() === h.getFullYear() && d.getMonth() === h.getMonth() && d.getDate() === h.getDate()) {
                return 'HOJE';
            }
            return SEMANAS[d.getDay()] + ', ' + d.getDate() + ' de ' + MESES[d.getMonth()] + ' de ' + d.getFullYear();
        }

        // Monta um collapse (Casa ou Sala) com a lista de disciplinas/textos
        function montarCollapse(icone, titulo, itens) {
            if (!itens.length) return '';
            var corpo = '';
            itens.forEach(function (it) {
                corpo += '<div class="tl-disc" data-tcod="' + escapeHtml(it.codigo) + '">' +
                            '<strong>' + escapeHtml(it.disciplina) + ':</strong> ' + escapeHtml(it.texto) +
                         '</div>';
            });
            var tipoCls = (titulo === 'CASA') ? 'tl-tipo-casa' : 'tl-tipo-sala';
            return '<div class="tl-collapse open">' +
                        '<button type="button" class="tl-collapse-head">' +
                            '<span class="tl-ctitle"><i class="bi ' + icone + '"></i>' +
                                '<span class="tl-tipo-badge ' + tipoCls + '">' + titulo + '</span>' +
                            '</span>' +
                            '<i class="bi bi-chevron-down tl-chevron"></i>' +
                        '</button>' +
                        '<div class="tl-collapse-body">' + corpo + '</div>' +
                    '</div>';
        }

        function render(lista) {
            var $tl = $('#timeline').empty();

            // Ordena decrescente pela data
            lista.sort(function (a, b) { return parseData(b.data) - parseData(a.data); });

            // Agrupa por data; dentro de cada data separa Casa e Sala
            var grupos = [], mapa = {};
            lista.forEach(function (t) {
                var dia = (t.data || '').split(' ')[0];
                if (!mapa[dia]) { mapa[dia] = { data: t.data, casa: [], sala: [] }; grupos.push(mapa[dia]); }
                var g = mapa[dia];
                var casa = (t.casa || '').trim();
                var sala = (t.sala || '').trim();
                var desc = (t.descricao || '').trim();
                var temDesc = desc && desc !== '....';
                if (casa || (temDesc && t.casasala === 'C')) {
                    g.casa.push({ disciplina: t.disciplina || 'Disciplina', texto: casa || desc, codigo: t.codigo });
                }
                if (sala || (temDesc && t.casasala === 'S')) {
                    g.sala.push({ disciplina: t.disciplina || 'Disciplina', texto: sala || desc, codigo: t.codigo });
                }
            });

            grupos.forEach(function (g) {
                var $item = $(
                    '<div class="tl-item">' +
                        '<div class="tl-dot">' +
                            '<i class="bi bi-person-fill"></i>' +
                            '<img class="tl-foto" alt="" onerror="this.style.display=\'none\'" />' +
                        '</div>' +
                        '<div class="tl-date"><i class="bi bi-calendar3"></i>' + escapeHtml(dataExtenso(g.data)) + '</div>' +
                        '<div class="tl-card">' +
                            montarCollapse('bi-house-door-fill', 'CASA', g.casa) +
                            montarCollapse('bi-easel2-fill', 'SALA', g.sala) +
                        '</div>' +
                    '</div>'
                );
                $tl.append($item);
            });

            $tl.show();
            aplicarFotoAluno();
        }

        // Abre/fecha os collapses de Casa e Sala
        $(document).on('click', '.tl-collapse-head', function () {
            $(this).closest('.tl-collapse').toggleClass('open');
        });

        function atualizarPager() {
            $('#pageInd').text('Página ' + paginaAtual);
            $('#btnPrev').prop('disabled', carregando || paginaAtual <= 1);
            $('#btnNext').prop('disabled', carregando || !temProxima);
        }

        function carregar(pagina) {
            if (carregando) return;
            carregando = true;
            $('#timeline').hide();
            setState('Carregando tarefas...', true);
            atualizarPager();

            // POST com query string e corpo vazio (mesmo padrão do app)
            $.ajax({
                url: API_TAREFA + '?escola=' + encodeURIComponent(BOOT.codescola) +
                                  '&codigo=' + encodeURIComponent(BOOT.codigo) +
                                  '&pagina=' + encodeURIComponent(pagina),
                method: 'POST',
                headers: { 'Authorization': TOKEN },
                dataType: 'json',
                timeout: 20000
            })
            .done(function (resp) {
                paginaAtual = pagina;
                var lista = Array.isArray(resp) ? resp
                          : (resp && Array.isArray(resp.data) ? resp.data : []);

                if (lista.length === 0) {
                    temProxima = false;
                    setState(pagina > 1 ? 'Não há mais tarefas.' : 'Nenhuma tarefa encontrada.', false);
                } else {
                    temProxima = true; // pode haver mais páginas
                    setState('', false);
                    render(lista);
                    carregarDocs(lista);
                    window.scrollTo(0, 0);
                }
            })
            .fail(function () {
                // 404 = sem tarefas nesta página
                temProxima = false;
                setState(pagina > 1 ? 'Não há mais tarefas.' : 'Nenhuma tarefa encontrada.', false);
            })
            .always(function () {
                carregando = false;
                atualizarPager();
                if (window.history && history.replaceState) {
                    var qs = 'codescola=' + BOOT.codescola + '&codigo=' + BOOT.codigo + '&pagina=' + paginaAtual;
                    history.replaceState(null, '', 'tarefa.php?' + qs);
                }
            });
        }

        // ===== Foto do aluno (mesma para todas as tarefas) =====
        function aplicarFotoAluno() {
            if (!fotoAluno) return;
            $('.tl-dot').each(function () {
                $(this).find('img').attr('src', fotoAluno);
                $(this).addClass('has-foto');
            });
        }
        function carregarFotoAluno() {
            $.ajax({
                url: FOTO_API, method: 'GET', headers: { 'Authorization': TOKEN },
                data: { Escola: BOOT.codescola, Codigo: BOOT.codigo }, dataType: 'json', timeout: 15000
            })
            .done(function (resp) {
                fotoAluno = (resp && resp.Foto) ? FOTO_BASE + resp.Foto : null;
                aplicarFotoAluno();
            });
        }

        // ===== Anexos da tarefa =====
        function carregarDocs(lista) {
            lista.forEach(function (t) {
                if (t.codigo == null) return;
                $.ajax({
                    url: DOC_LIST_API, method: 'GET', headers: { 'Authorization': TOKEN },
                    data: { escola: BOOT.codescola, tarefacodigo: t.codigo }, dataType: 'json', timeout: 15000
                })
                .done(function (docs) {
                    if (!Array.isArray(docs) || !docs.length) return;
                    var $alvo = $('.tl-disc[data-tcod="' + t.codigo + '"]');
                    docs.forEach(function (d) {
                        $alvo.append('<br>').append(
                            '<button type="button" class="tl-open" data-docid="' + escapeHtml(d.id) + '">' +
                                '<svg viewBox="0 0 24 24"><path d="M14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3h-7zM5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z"/></svg>' +
                                escapeHtml(d.descricao || 'Abrir documento') +
                            '</button>'
                        );
                    });
                });
            });
        }

        // Abre um arquivo respeitando o tratamento do Android
        function abrirArquivo(link) {
            if (!link) return;
            if (/android/i.test(navigator.userAgent)) {
                var ext = (link.split(/[?#]/)[0].split('.').pop() || '').toLowerCase();
                var isImg = /^(jpg|jpeg|png|gif|bmp|webp|heic|heif|tif|tiff|svg)$/.test(ext);
                if (!isImg) {
                    link = 'https://docs.google.com/gview?embedded=1&url=' + link;
                }
            }
            window.open(link, '_blank');
        }

        // Clique no anexo → busca a URL do arquivo e abre
        $(document).on('click', '.tl-open[data-docid]', function () {
            var $btn = $(this);
            var docid = $btn.attr('data-docid');
            if (!docid || $btn.prop('disabled')) return;
            $btn.prop('disabled', true);
            $.ajax({
                url: DOC_OPEN_API + encodeURIComponent(docid), method: 'POST',
                headers: { 'Authorization': TOKEN }, dataType: 'json', timeout: 20000
            })
            .done(function (resp) {
                var url = resp && resp.arquivo;
                if (url) { abrirArquivo(url); }
            })
            .always(function () { $btn.prop('disabled', false); });
        });

        $('#btnPrev').on('click', function () { if (paginaAtual > 1) carregar(paginaAtual - 1); });
        $('#btnNext').on('click', function () { if (temProxima) carregar(paginaAtual + 1); });

        // Carga inicial
        carregarFotoAluno();
        carregar(paginaAtual);
    </script>

</body>
</html>
