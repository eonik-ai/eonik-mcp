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

O eonik acompanha os anúncios dos seus concorrentes, lê os seus e faz todos os tamanhos de um anúncio, fiéis à marca, no app eonik no seu Mac ([baixar](https://www.eonik.ai/download)). Peça pelo Claude, ChatGPT, Cursor, Codex ou VS Code: configurar a marca, os concorrentes e os seus próprios anúncios funcionam em qualquer assistente; criar e adaptar tamanhos acontece no seu Mac. Nada é criado, alterado ou enviado até você dizer.

Conecte todos os seus assistentes com um comando: `npx eonik-mcp init` (cada assistente pede login no eonik na primeira vez; nenhuma chave é copiada). Ou adicione `https://api.eonik.ai/mcp` como conector e faça login. Para hosts que precisam de um processo local:

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

`EONIK_BRAND_ID` é opcional: com mais de uma marca, você escolhe na conversa, e o eonik nunca adivinha de qual cliente é o trabalho.

[Baixar para Mac](https://www.eonik.ai/download) · editor grátis · macOS 15+ · Apple silicon
