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

eonik surveille les publicités de vos concurrents, lit les vôtres et réalise toutes les tailles d'une publicité, fidèles à la marque, dans l'app eonik sur votre Mac ([télécharger](https://www.eonik.ai/download)). Demandez-le depuis Claude, ChatGPT, Cursor, Codex ou VS Code : configurer la marque, les concurrents et vos propres publicités fonctionnent depuis n'importe quel assistant ; créer et décliner les tailles se fait sur votre Mac. Rien n'est créé, modifié ni envoyé tant que vous ne l'avez pas dit.

Connectez tous vos assistants en une commande : `npx eonik-mcp init` (chaque assistant vous connecte à eonik la première fois ; aucune clé n'est copiée). Ou ajoutez `https://api.eonik.ai/mcp` comme connecteur et connectez-vous. Pour les hôtes qui ont besoin d'un processus local :

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

`EONIK_BRAND_ID` est facultatif : avec plusieurs marques, vous choisissez dans la conversation, et eonik ne devine jamais de quel client il s'agit.

[Télécharger pour Mac](https://www.eonik.ai/download) · éditeur gratuit · macOS 15+ · Apple silicon
