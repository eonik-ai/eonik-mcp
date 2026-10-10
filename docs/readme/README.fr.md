<div align="center">
  <a href="https://www.eonik.ai"><img src="https://www.eonik.ai/logo.svg" alt="eonik" width="160" /></a>
  <h1>eonik</h1>
  <p><strong>Des pubs finies, on-brand, sans le sale boulot.</strong></p>
  <p>
    <a href="../../README.md">English</a> ·
    <a href="README.es.md">Español</a> ·
    <a href="README.pt-BR.md">Português</a> ·
    <strong>Français</strong> ·
    <a href="README.hi.md">हिन्दी</a> ·
    <a href="README.zh-CN.md">简体中文</a> ·
    <a href="README.ja.md">日本語</a> ·
    <a href="README.ko.md">한국어</a>
  </p>
</div>

Votre designer crée le master. eonik fait toutes les tailles que demande votre plan média, fidèles à la marque, dans l'app eonik sur votre Mac ([télécharger](https://www.eonik.ai/download)). Demandez-le depuis Claude, ChatGPT, Cursor, Codex ou VS Code : rien n'est créé, modifié ou envoyé sans votre accord.

Connexion : ajoutez `https://api.eonik.ai/mcp` comme connecteur et connectez-vous. Pour les hôtes qui lancent des serveurs locaux :

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

`EONIK_BRAND_ID` est obligatoire si vous avez plusieurs marques : eonik ne devine jamais de quel client il s'agit.

[Télécharger pour Mac](https://www.eonik.ai/download) · éditeur gratuit · macOS 15+ · Apple silicon
