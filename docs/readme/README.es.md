<div align="center">
  <a href="https://www.eonik.ai"><img src="https://www.eonik.ai/logo.svg" alt="eonik" width="160" /></a>
  <h1>eonik</h1>
  <p><strong>Anuncios terminados y on-brand, sin el trabajo pesado.</strong></p>
  <p>
    <a href="../../README.md">English</a> ·
    <strong>Español</strong> ·
    <a href="README.pt-BR.md">Português</a> ·
    <a href="README.fr.md">Français</a> ·
    <a href="README.hi.md">हिन्दी</a> ·
    <a href="README.zh-CN.md">简体中文</a> ·
    <a href="README.ja.md">日本語</a> ·
    <a href="README.ko.md">한국어</a>
  </p>
</div>

eonik vigila los anuncios de tus competidores, lee los tuyos y hace todos los tamaños de un anuncio, fieles a la marca, en la app de eonik en tu Mac ([descargar](https://www.eonik.ai/download)). Pídelo desde Claude, ChatGPT, Cursor, Codex o VS Code: configurar la marca, los competidores y tus propios anuncios funcionan desde cualquier asistente; crear y adaptar tamaños se hace en tu Mac. Nada se crea, cambia ni envía hasta que tú lo digas.

Conectar todos tus asistentes con un comando: `npx eonik-mcp init` (cada asistente te pide iniciar sesión en eonik la primera vez; no se copia ninguna clave). O añade `https://api.eonik.ai/mcp` como conector e inicia sesión. Para hosts que necesitan un proceso local:

```json
{
  "mcpServers": {
    "eonik": {
      "command": "npx",
      "args": ["-y", "eonik-mcp"],
      "env": { "EONIK_API_KEY": "eonk_live_..." }
    }
  }
}
```

`EONIK_BRAND_ID` es opcional: si tienes más de una marca, eliges en la conversación, y eonik nunca adivina de qué cliente es el trabajo.

[Descargar para Mac](https://www.eonik.ai/download) · editor gratis · macOS 15+ · Apple silicon
