<?php
// Headers para evitar cache (importante para WebView do Delphi FMX)
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Expires: 0");

// Captura dos parâmetros via GET
$escola   = isset($_GET['escola'])   ? htmlspecialchars($_GET['escola'])   : '';
$codcurso = isset($_GET['codcurso']) ? htmlspecialchars($_GET['codcurso']) : '';
$turma    = isset($_GET['turma'])    ? htmlspecialchars($_GET['turma'])    : '';
$ano      = isset($_GET['ano'])      ? htmlspecialchars($_GET['ano'])      : '';
$op       = isset($_GET['op'])       ? intval($_GET['op'])                 : 1;
$debug    = isset($_GET['debug'])    ? true : false;

$nome = isset($_GET['nome']) ? htmlspecialchars($_GET['nome']) : '';

// URLs dos PDFs individuais
$urlNarrativasPDF = "https://digite1.websiteseguro.com/seinet/241-YBA/NarrativasIndividuais" . $ano . "/" . $nome . ".PDF";
$urlNarrativas    = "https://docs.google.com/gview?embedded=1&url=" . $urlNarrativasPDF;
$urlFicha         = "https://digite1.websiteseguro.com/seinet/241-YBA/FichaDeIndicadoresIndividuais" . $ano . "/" . $nome . ".PDF";

// Bearer Token
$bearerToken = "a6db2e47da0e40e8be13aaa93287b14f";
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YBA Compartilha</title>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --primary-light: #eef2ff;
            --gray-50: #f9fafb;
            --gray-100: #f3f4f6;
            --gray-200: #e5e7eb;
            --gray-400: #9ca3af;
            --gray-500: #6b7280;
            --gray-700: #374151;
            --gray-900: #1f2937;
        }

        * {
            -webkit-tap-highlight-color: transparent;
        }

        body {
            background-color: #f5f6fa;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: 100vh;
            padding: 20px 0;
        }

        .container-yba {
            max-width: 480px;
            margin: 0 auto;
            padding: 0 16px;
        }

        /* ===== HEADER COM GRADIENTE ===== */
        .hero-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 24px;
            color: white;
            position: relative;
            overflow: hidden;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(118, 75, 162, 0.25);
        }

        .hero-card::before {
            content: '';
            position: absolute;
            top: -40px;
            right: -40px;
            width: 180px;
            height: 180px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 50%;
        }

        .hero-card::after {
            content: '';
            position: absolute;
            bottom: -60px;
            right: 40px;
            width: 120px;
            height: 120px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 50%;
        }

        .hero-header {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 12px;
            position: relative;
            z-index: 1;
        }

        .hero-icon {
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            flex-shrink: 0;
        }

        .hero-icon i {
            font-size: 22px;
            color: white;
        }

        .hero-title {
            font-size: 24px;
            font-weight: 800;
            line-height: 1.2;
            margin: 0;
        }

        .hero-subtitle {
            font-size: 14px;
            opacity: 0.9;
            font-weight: 400;
            line-height: 1.5;
            position: relative;
            z-index: 1;
        }

        /* ===== CARDS ===== */
        .card-yba {
            border: none;
            border-radius: 16px;
            background: #fff;
            overflow: hidden;
            margin-bottom: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
            transition: box-shadow 0.2s, transform 0.2s;
        }

        .card-yba:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .card-header-yba {
            padding: 18px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            background: #fff;
            transition: background-color 0.2s;
            user-select: none;
        }

        .card-header-yba:hover {
            background-color: var(--gray-50);
        }

        .card-header-yba:active {
            background-color: var(--gray-100);
        }

        .card-title-yba {
            font-size: 15px;
            font-weight: 600;
            color: var(--gray-900);
            margin: 0;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .icon-wrapper {
            width: 38px;
            height: 38px;
            background: var(--primary-light);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .icon-wrapper i {
            color: var(--primary);
            font-size: 18px;
        }

        .chevron {
            transition: transform 0.3s ease;
            color: var(--gray-400);
            font-size: 14px;
        }

        .card-header-yba[aria-expanded="true"] .chevron {
            transform: rotate(180deg);
            color: var(--primary);
        }

        /* Badge de contagem no header do collapse */
        .header-badge {
            background-color: var(--primary-light);
            color: var(--primary);
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            margin-right: 10px;
            white-space: nowrap;
            animation: fadeIn 0.3s ease;
        }

        .header-right {
            display: flex;
            align-items: center;
        }

        /* ===== HEADER DE CONTAGEM ===== */
        .list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 20px 8px 20px;
            border-top: 1px solid var(--gray-100);
        }

        .list-header-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--gray-900);
        }

        .badge-count {
            background-color: var(--primary-light);
            color: var(--primary);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }

        /* ===== ITENS DA LISTA ===== */
        .item-list {
            padding: 4px 0 8px 0;
        }

        .item-card {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            text-decoration: none;
            color: inherit;
            transition: background-color 0.2s;
            cursor: pointer;
        }

        .item-card:hover {
            background-color: var(--gray-50);
            color: inherit;
        }

        .item-card:active {
            background-color: var(--gray-100);
        }

        .item-icon {
            width: 40px;
            height: 40px;
            background-color: var(--primary-light);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 14px;
            flex-shrink: 0;
        }

        .item-icon i {
            color: var(--primary);
            font-size: 18px;
        }

        .item-content {
            flex: 1;
            min-width: 0;
        }

        .item-date {
            color: var(--primary);
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 3px;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .item-date i {
            font-size: 12px;
        }

        .item-name {
            font-size: 14px;
            font-weight: 600;
            color: var(--gray-900);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .item-arrow {
            color: var(--gray-400);
            font-size: 14px;
            margin-left: 8px;
        }

        /* ===== BOTÃO NARRATIVAS ===== */
        .btn-narrativa {
            width: 100%;
            padding: 18px 20px;
            background: #fff;
            border: none;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background-color 0.2s;
            text-decoration: none;
            color: inherit;
            cursor: pointer;
        }

        .btn-narrativa:hover {
            background-color: var(--gray-50);
            color: inherit;
        }

        .btn-narrativa:active {
            background-color: var(--gray-100);
        }

        .btn-narrativa-icon {
            color: var(--gray-400);
            font-size: 14px;
            transition: transform 0.2s, color 0.2s;
        }

        .btn-narrativa:hover .btn-narrativa-icon {
            color: var(--primary);
            transform: translateX(2px);
        }

        /* ===== ESTADOS ===== */
        .loading {
            padding: 30px;
            text-align: center;
            color: var(--gray-500);
            font-size: 14px;
        }

        .empty-state {
            padding: 30px 20px;
            text-align: center;
            color: var(--gray-400);
            font-size: 14px;
        }

        .empty-state i {
            font-size: 32px;
            display: block;
            margin-bottom: 8px;
            color: var(--gray-200);
        }

        .error-state {
            padding: 20px;
            text-align: center;
            color: #dc2626;
            font-size: 13px;
            background-color: #fef2f2;
            border-radius: 10px;
            margin: 10px 20px;
        }

        .error-state i {
            display: block;
            font-size: 24px;
            margin-bottom: 6px;
        }

        /* ===== ANIMAÇÕES ===== */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .item-card {
            animation: fadeIn 0.3s ease forwards;
            opacity: 0;
        }

        .item-card:nth-child(1) { animation-delay: 0.05s; }
        .item-card:nth-child(2) { animation-delay: 0.10s; }
        .item-card:nth-child(3) { animation-delay: 0.15s; }
        .item-card:nth-child(4) { animation-delay: 0.20s; }
        .item-card:nth-child(5) { animation-delay: 0.25s; }

        /* ===== RESPONSIVO ===== */
        @media (min-width: 768px) {
            .container-yba {
                max-width: 560px;
            }
            .hero-title {
                font-size: 28px;
            }
        }
    </style>
</head>
<body>

<div class="container-yba">

    <?php if ($debug): ?>
    <div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:12px;margin-bottom:16px;font-family:monospace;font-size:11px;word-break:break-all;">
        <strong>🔍 DEBUG</strong><br>
        <strong>nome:</strong> <?php echo $nome; ?><br>
        <strong>ano:</strong> <?php echo $ano; ?><br>
        <strong>op:</strong> <?php echo $op; ?><br>
        <strong>URL Narrativas:</strong> <a href="<?php echo $urlNarrativas; ?>" target="_blank"><?php echo $urlNarrativas; ?></a><br>
        <strong>URL Ficha:</strong> <a href="<?php echo $urlFicha; ?>" target="_blank"><?php echo $urlFicha; ?></a>
    </div>
    <?php endif; ?>

    <!-- HEADER COM GRADIENTE -->
    <div class="hero-card">
        <div class="hero-header">
            <div class="hero-icon">
                <i class="bi bi-share-fill"></i>
            </div>
            <h1 class="hero-title">YBA Compartilha</h1>
        </div>
        <div class="hero-subtitle">Explore os conteúdos e atividades disponíveis para a turma.</div>
    </div>

    <?php if ($op === 2): ?>

    <!-- Ficha de Indicadores Individuais -->
    <div class="card-yba">
        <a href="<?php echo $urlFicha; ?>" target="_blank" rel="noopener" class="btn-narrativa">
            <div class="card-title-yba">
                <div class="icon-wrapper">
                    <i class="bi bi-clipboard-data-fill"></i>
                </div>
                <span>Ficha de Indicadores Individuais</span>
            </div>
            <i class="bi bi-box-arrow-up-right btn-narrativa-icon"></i>
        </a>
    </div>

    <?php else: ?>

    <!-- 1. Narrativas Individuais -->
    <div class="card-yba">
        <a href="<?php echo $urlNarrativas; ?>" target="_blank" rel="noopener" class="btn-narrativa">
            <div class="card-title-yba">
                <div class="icon-wrapper">
                    <i class="bi bi-file-earmark-person-fill"></i>
                </div>
                <span>Narrativas Individuais</span>
            </div>
            <i class="bi bi-box-arrow-up-right btn-narrativa-icon"></i>
        </a>
    </div>

    <!-- 2. Vivências Semestrais -->
    <div class="card-yba">
        <div class="card-header-yba"
             data-bs-toggle="collapse"
             data-bs-target="#vivenciasCollapse"
             aria-expanded="false"
             aria-controls="vivenciasCollapse"
             data-tipo="3"
             data-loaded="false">
            <div class="card-title-yba">
                <div class="icon-wrapper">
                    <i class="bi bi-journal-richtext"></i>
                </div>
                <span>Vivências Semestrais</span>
            </div>
            <i class="bi bi-chevron-down chevron"></i>
        </div>
        <div id="vivenciasCollapse" class="collapse">
            <div class="item-list" id="vivenciasContent">
                <div class="loading">
                    <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                    Carregando...
                </div>
            </div>
        </div>
    </div>

    <!-- 3. Percursos Investigativos -->
    <div class="card-yba">
        <div class="card-header-yba"
             data-bs-toggle="collapse"
             data-bs-target="#percursosCollapse"
             aria-expanded="false"
             aria-controls="percursosCollapse"
             data-tipo="2"
             data-loaded="false">
            <div class="card-title-yba">
                <div class="icon-wrapper">
                    <i class="bi bi-compass-fill"></i>
                </div>
                <span>Percursos Investigativos</span>
            </div>
            <i class="bi bi-chevron-down chevron"></i>
        </div>
        <div id="percursosCollapse" class="collapse">
            <div class="item-list" id="percursosContent">
                <div class="loading">
                    <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                    Carregando...
                </div>
            </div>
        </div>
    </div>

    <?php endif; ?>

</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<script>
$(document).ready(function() {

    // Parâmetros vindos do PHP
    const params = {
        escola:   "<?php echo $escola; ?>",
        codcurso: "<?php echo $codcurso; ?>",
        turma:    "<?php echo $turma; ?>",
        nome:     "<?php echo $nome; ?>"
    };

    // Configuração da API
    const apiUrl      = "https://www.api.sistema2.com.br/WebApiSaeCore/api/vejaMais";
    const bearerToken = "<?php echo $bearerToken; ?>";

    /**
     * Carrega os itens da API e atualiza o conteúdo do collapse
     */
    function carregarItens(tipo, containerId) {
        const $container = $('#' + containerId);

        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            data: {
                Escola:   params.escola,
                tipo:     tipo,
                codCurso: params.codcurso,
                turma:    params.turma
            },
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            },
            success: function(response) {
                renderItens(response, $container, tipo);
            },
            error: function(xhr, status, error) {
                $container.html(
                    '<div class="error-state">' +
                    '<i class="bi bi-exclamation-triangle"></i>' +
                    'Erro ao carregar os itens. Tente novamente.' +
                    '</div>'
                );
                console.error('Erro na API:', error, xhr.responseText);
            }
        });
    }

    /**
     * Formata uma string de data/hora para dd/MM/yy HH:mm:ss
     * Aceita vários formatos de entrada (ISO, dd/MM/yyyy HH:mm, etc.)
     */
    function formatarDataHora(dataHora) {
        if (!dataHora) return '';

        let d;

        // Se vier no formato dd/MM/yyyy HH:mm:ss ou dd/MM/yyyy HH:mm
        if (/^\d{2}\/\d{2}\/\d{4}/.test(dataHora)) {
            const partes = dataHora.split(' ');
            const dataParte = partes[0].split('/'); // [dd, MM, yyyy]
            const horaParte = (partes[1] || '00:00:00').split(':'); // [HH, mm, ss?]
            d = new Date(
                parseInt(dataParte[2]),
                parseInt(dataParte[1]) - 1,
                parseInt(dataParte[0]),
                parseInt(horaParte[0] || 0),
                parseInt(horaParte[1] || 0),
                parseInt(horaParte[2] || 0)
            );
        } else {
            // ISO ou outros formatos parseáveis pelo Date
            d = new Date(dataHora);
        }

        if (isNaN(d.getTime())) return dataHora; // retorna original se falhar

        const pad = (n) => String(n).padStart(2, '0');
        const dia    = pad(d.getDate());
        const mes    = pad(d.getMonth() + 1);
        const ano    = String(d.getFullYear()).slice(-2);
        const hora   = pad(d.getHours());
        const min    = pad(d.getMinutes());
        const seg    = pad(d.getSeconds());

        return `${dia}/${mes}/${ano} ${hora}:${min}:${seg}`;
    }

    /**
     * Retorna um objeto Date a partir de uma string (para ordenação)
     */
    function parseDataHora(dataHora) {
        if (!dataHora) return new Date(0);
        if (/^\d{2}\/\d{2}\/\d{4}/.test(dataHora)) {
            const partes = dataHora.split(' ');
            const dp = partes[0].split('/');
            const hp = (partes[1] || '00:00:00').split(':');
            return new Date(
                parseInt(dp[2]), parseInt(dp[1]) - 1, parseInt(dp[0]),
                parseInt(hp[0] || 0), parseInt(hp[1] || 0), parseInt(hp[2] || 0)
            );
        }
        const d = new Date(dataHora);
        return isNaN(d.getTime()) ? new Date(0) : d;
    }

    /**
     * Renderiza a lista de itens dentro do container
     */
    function renderItens(itens, $container, tipo) {
        // Caso a API retorne um objeto com array dentro
        if (!Array.isArray(itens)) {
            if (itens && Array.isArray(itens.itens)) {
                itens = itens.itens;
            } else if (itens && Array.isArray(itens.data)) {
                itens = itens.data;
            } else {
                itens = [];
            }
        }

        // Atualiza o badge no header do collapse
        atualizarBadge(tipo, itens.length);

        if (!itens || itens.length === 0) {
            $container.html(
                '<div class="empty-state">' +
                '<i class="bi bi-inbox"></i>' +
                'Nenhum item disponível.' +
                '</div>'
            );
            return;
        }

        // Ordena decrescente por dataHora
        itens.sort(function(a, b) {
            return parseDataHora(b.dataHora) - parseDataHora(a.dataHora);
        });

        let html = '';

        // Lista de itens
        itens.forEach(function(item) {
            const dataHora  = formatarDataHora(item.dataHora || '');
            const descricao = item.descricao || 'Sem título';
            const link      = item.link      || item.Link || item.url || item.URL || '#';

            html += '<a href="' + link + '" target="_blank" class="item-card">';
            html += '  <div class="item-icon"><i class="bi bi-journal-text"></i></div>';
            html += '  <div class="item-content">';
            if (dataHora) {
                html += '    <div class="item-date"><i class="bi bi-calendar3"></i>' + dataHora + '</div>';
            }
            html += '    <div class="item-name">' + descricao.toUpperCase() + '</div>';
            html += '  </div>';
            html += '  <i class="bi bi-chevron-right item-arrow"></i>';
            html += '</a>';
        });

        $container.html(html);
    }

    /**
     * Atualiza o badge de contagem no header do collapse
     */
    function atualizarBadge(tipo, count) {
        const $header = $('.card-header-yba[data-tipo="' + tipo + '"]');
        const $badge  = $header.find('.header-badge');
        const texto   = count + ' ' + (count === 1 ? 'item' : 'itens');

        if ($badge.length) {
            $badge.text(texto).show();
        } else {
            $header.find('.chevron').before(
                '<span class="header-badge">' + texto + '</span>'
            );
        }
    }

    /**
     * Listener para abrir o collapse e carregar os itens (apenas 1x)
     */
    $('.card-header-yba').on('click', function() {
        const $header = $(this);
        const tipo    = $header.data('tipo');
        const loaded  = $header.attr('data-loaded') === 'true';

        if (loaded) return;

        const target      = $header.data('bs-target');
        const containerId = target === '#vivenciasCollapse' ? 'vivenciasContent' : 'percursosContent';

        carregarItens(tipo, containerId);
        $header.attr('data-loaded', 'true');
    });

});
</script>

</body>
</html>
