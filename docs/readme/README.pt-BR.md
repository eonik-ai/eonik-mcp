<div align="center">
  <a href="https://www.eonik.ai"><img src="https://www.eonik.ai/logo.svg" alt="eonik" width="160" /></a>
  <h1>eonik</h1>
  <p><strong>Anúncios prontos e on-brand, sem o trabalho braçal.</strong></p>
  <p>
    <a href="../../README.md">English</a> ·
    <a href="README.es.md">Español</a> ·
    <strong>Português</strong> ·
    <a href="README.fr.md">Français</a> ·
    <a href="README.hi.md">हिन्दी</a> ·
    <a href="README.zh-CN.md">简体中文</a> ·
    <a href="README.ja.md">日本語</a> ·
    <a href="README.ko.md">한국어</a>
  </p>
</div>

Seu designer cria a peça-mestre. O eonik faz todos os tamanhos que o seu plano de mídia pede, fiéis à marca, no app eonik no seu Mac ([baixar](https://www.eonik.ai/download)). Peça pelo Claude, ChatGPT, Cursor, Codex ou VS Code: nada é criado, alterado ou enviado até você dizer.

Conectar: adicione `https://api.eonik.ai/mcp` como conector e entre na sua conta. Para hosts que rodam servidores locais:

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

`EONIK_BRAND_ID` é obrigatório se você tiver mais de uma marca: o eonik nunca adivinha de qual cliente é o trabalho.

[Baixar para Mac](https://www.eonik.ai/download) · editor grátis · macOS 15+ · Apple silicon
