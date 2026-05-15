<?php
/**
 * loading.php — Splash minimalista: apenas logo + spinner
 */

// ===== Configuração =====
// Lê o codEscola via GET e sanitiza (só dígitos, evita path traversal tipo ?codEscola=../../etc)
$codEscola = isset($_GET['codEscola']) ? preg_replace('/[^0-9]/', '', $_GET['codEscola']) : '';

// Monta o caminho da imagem; se não vier codEscola, usa um logo padrão
$logoUrl = $codEscola !== ''
    ? './images/' . $codEscola . '.png'
    : './images/logo.png';

// Escape para HTML
$logoUrlSafe = htmlspecialchars($logoUrl, ENT_QUOTES, 'UTF-8');
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

</body>
</html>
