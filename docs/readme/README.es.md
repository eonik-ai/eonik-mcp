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

Tu diseñador crea el máster. eonik hace todos los tamaños que pide tu plan de medios, fieles a la marca, en la app de eonik en tu Mac ([descargar](https://www.eonik.ai/download)). Pídelo desde Claude, ChatGPT, Cursor, Codex o VS Code: nada se crea, cambia ni envía hasta que tú lo digas.

Conectar: añade `https://api.eonik.ai/mcp` como conector e inicia sesión. Para hosts que ejecutan servidores locales:

```json
{
  "mcpServers": {
    "eonik": {
      "command": "npx",
      "args": ["-y", "eonik-mcp"],
      "env": { "EONIK_API_KEY": "eonk_live_...", "EONIK_BRAND_ID": "..." }
    }
  }
}
```

`EONIK_BRAND_ID` es obligatorio si tienes más de una marca: eonik nunca adivina de qué cliente es el trabajo.

[Descargar para Mac](https://www.eonik.ai/download) · editor gratis · macOS 15+ · Apple silicon
