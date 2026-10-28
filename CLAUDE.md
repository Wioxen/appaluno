# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"App do Aluno": a student/parent portal for many schools, rendered inside a native mobile app's WebView (the `241-yba` pages mention a Delphi FMX WebView). It is deployed at `alunoapp.sistema2.com.br`. Code, comments and UI text are in Brazilian Portuguese, so keep new code in Portuguese too.

There is no build step, package manager, linter or test suite. PHP files only read GET params and inline them into HTML/JS. All data comes from **external REST APIs called from the browser via jQuery `$.ajax`**. There is no database or server-side logic here. Vendor assets (`bower_components/`, `dist/` = AdminLTE 2 + Bootstrap 3, `Ionicons/`, `source/` = fancybox, `lib/`) are committed and should not be edited.

## Running locally

Served by XAMPP from `C:\xampp\htdocs\appaluno`. Open in a browser with the params the native app would pass, for example:

```
http://localhost/appaluno/index.php?codescola=241&deviceid=<id>&devicetoken=<token>&os=android
```

Without `id`, `index.php` first POSTs a device registration to `seialunoregistro`. If no student is linked (`qte === 0`), a fullscreen login modal (matrícula + SenhaNet) opens. After signup it reloads `index.php` with `&id=` set. You can't do much locally without valid device/student data on the production API.

## Architecture

**`index.php` (single-page shell, ~2.3k lines):** holds the PHP entry routine (formerly `open.php`), all the HTML, the modals, the student-switch sidebar and the registration modal (inline scripts at the bottom). Hidden inputs `#codEscola`, `#uniqueID`, `#Id` and `#devicetoken` carry the URL params to the JS.

**Boot flow (`js/lib.js`):** on `$(document).ready` it shows the splash modal and sets the school name with a big `switch` on `codEscola`. It then POSTs `{ESCOLA, UNIQUEID}` to `api.sistema2.com.br/WebApiSae/api/appaluno`, which returns `{alunos, local}`. `window.aplicarAluno(aluno)` fills the UI and sets the globals (`vRM`, `vCurso`, `vTurma`, `vSenhaNet`, `vTipoAcesso`, `vCiclo`…), then triggers `homeClick`. The chosen student's RM is saved in `localStorage['rm']`. Reveal is gated: `window.revealApp()` waits for `window.__registroLiberado`, with a 15s fail-safe.

**Feature modules (`js/*.js`):** each one defines a global `xxxClick(event)` handler (`notaClick`, `tarefaClick`, `cotidianoClick`, `galeriaClick`, …). `homeClick` in `js/eventos.js` renders the home menu and binds menu CSS classes to those handlers. Per-school menu variations are hard-coded in `eventos.js` with branches on `vEscola`/`codEscola`. The modules talk to each other through the globals declared at the top of `lib.js` and the `data-*` attributes on `.fotoAtual`. Load order matters: see the `<script>` list near the end of `index.php`.

**Standalone pages:** `boleto.php`, `tarefa.php`, `notificacao.php` and `241-yba/yba-compartilha*.php` are self-contained pages, each with its own inline CSS/JS. A docblock at the top of each one documents its GET params and API endpoints. The PHP builds a `BOOT` JSON object with `json_encode` and `JSON_HEX_*` flags, and the JS reads it. `url.php` is just a logo + spinner splash for `?codescola=`.

**Per-school specifics:**
- Logos and banners live in `images/<codescola>.png` and `images/<codescola>banner{1,2,3}.png`.
- The `241-yba/` folder holds pages for school 241 (YBA). `yba-compartilha-v2.php` differs from v1 only in the PDF viewer URL (Drive `viewerng` vs Docs `gview`).
- The school year is hard-coded in `lib.js` as `vAno`.

## Conventions

- **Cache busting:** when you change any app JS/CSS loaded by `index.php`, bump `$ASSET_VERSION` at the top of `index.php` (format `YYYYMMDDx`). All of those assets are loaded with `?v=<?php echo $ASSET_VERSION; ?>`.
- **API hosts:** several are in use: `api.sistema2.com.br/WebApiSae`, `/WebApiSaeCore`, `sistema2.com.br/WebApiSae`, and `api-boleto.digite.com.br`. Most calls send a static `Authorization: Bearer …` header. Match the host and casing already used by the nearby code for the same endpoint.
- **Mixed content:** student photo URLs must go through `normalizarUrlFoto()` (rewrites `digite.com.br` to `https://digite1.websiteseguro.com`). Plain HTTP fails in the mobile WebView.
- **jQuery handlers:** they are re-bound with `.off('click').on('click', …)` because views get re-rendered. Keep that pattern so handlers don't stack.
- **Versioning:** commits are small, direct edits to `main`. New variants of a page are added as `-v2` copies next to the original rather than replacing it.
