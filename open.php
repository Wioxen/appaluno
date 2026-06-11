<?php
/**
 * loading.php — Splash minimalista: apenas logo + spinner
 */

// ===== Configuração =====
// Lê o codescola via GET, atribuído do jeito que vem
$codescola = isset($_GET['codescola']) ? $_GET['codescola'] : '';

// Lê os demais parâmetros do dispositivo via GET, atribuídos do jeito que vêm:
// - deviceid    : identificador do aparelho
// - devicetoken : token de push (FCM/APNs)
// - os          : sistema operacional (ex.: android, ios)
$deviceid    = isset($_GET['deviceid'])    ? $_GET['deviceid']    : '';
$devicetoken = isset($_GET['devicetoken']) ? $_GET['devicetoken'] : '';
$os          = isset($_GET['os'])          ? $_GET['os']          : '';

// Monta o caminho da imagem; se não vier codescola, usa um logo padrão
$logoUrl = $codescola !== ''
    ? './images/' . $codescola . '.png'
    : './images/logo.png';

// Escape para HTML
$logoUrlSafe = htmlspecialchars($logoUrl, ENT_QUOTES, 'UTF-8');

// Data e hora atual no formato yyyy-MM-dd HH:mm:ss
$dataHora = date('Y-m-d H:i:s');

// Monta o payload do registro do aluno/dispositivo para a Web API
$registro = [
    'Token'    => $devicetoken,
    'UniqueID' => $deviceid,
    'Tipo'     => $os,
    'DataHora' => $dataHora,
    'Inativo'  => 'N',
    'DeviceID' => $deviceid,
    'Escola'   => $codescola,
];

// Parâmetros originais do open.php, repassados nos redirecionamentos
$params = [
    'codescola'   => $codescola,
    'deviceid'    => $deviceid,
    'devicetoken' => $devicetoken,
    'os'          => $os,
];

// Disponibiliza os dados para o JavaScript de forma segura
$jsonFlags = JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT;
$registroJson = json_encode($registro, $jsonFlags);
$paramsJson   = json_encode($params, $jsonFlags);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta name="theme-color" content="#ffffff" />
    <title>Carregando...</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            height: 100%;
            width: 100%;
            overflow: hidden;
        }

        body {
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-font-smoothing: antialiased;
        }

        /* Container do logo + spinner ao redor */
        .logo-ring {
            position: relative;
            width: 180px;
            height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: rise 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes rise {
            from { opacity: 0; transform: scale(0.94); }
            to   { opacity: 1; transform: scale(1); }
        }

        /* Spinner externo (anel) */
        .logo-ring::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: #28a7a8;
            border-right-color: rgba(40, 167, 168, 0.3);
            animation: spin 1.1s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
            box-shadow: 0 0 30px rgba(40, 167, 168, 0.15);
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Logo central */
        .logo {
            width: 130px;
            height: 130px;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulseLogo 2.2s ease-in-out infinite;
        }

        .logo img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            display: block;
        }

        @keyframes pulseLogo {
            0%, 100% { transform: scale(1);    filter: brightness(1); }
            50%      { transform: scale(1.04); filter: brightness(1.05); }
        }

        @media (max-width: 480px) {
            .logo-ring { width: 150px; height: 150px; }
            .logo      { width: 108px; height: 108px; }
        }
    </style>
</head>
<body>

    <div class="logo-ring">
        <div class="logo">
            <img src="<?php echo $logoUrlSafe; ?>" alt="" onerror="this.style.display='none'" />
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script>
        // Payload do registro montado no servidor
        var registro = <?php echo $registroJson; ?>;
        // Parâmetros originais do open.php, repassados no redirecionamento
        var params   = <?php echo $paramsJson; ?>;

        // Monta a query string com os parâmetros do open.php + o id retornado
        function montarUrl(destino, id) {
            var query = $.param($.extend({}, params, { id: id }));
            return destino + '?' + query;
        }

        $.ajax({
            url: 'https://sistema2.com.br/WebApiSae/api/seialunoregistro',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer a6db2e47da0e40e8be13aaa93287b14f'
            },
            contentType: 'application/json',
            data: JSON.stringify(registro),
            success: function (resposta) {
                var destino = (resposta && resposta.qte === 0) ? 'registro.php' : 'index.php';
                window.location.href = montarUrl(destino, resposta ? resposta.id : '');
            },
            error: function (xhr, status, erro) {
                console.error('Falha ao enviar registro:', status, erro, xhr.responseText);
            }
        });
    </script>

</body>
</html>
