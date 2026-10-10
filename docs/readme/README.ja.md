<div align="center">
  <a href="https://www.eonik.ai"><img src="https://www.eonik.ai/logo.svg" alt="eonik" width="160" /></a>
  <h1>eonik</h1>
  <p><strong>完成されたオンブランド広告を、雑務なしで。</strong></p>
  <p>
    <a href="../../README.md">English</a> ·
    <a href="README.es.md">Español</a> ·
    <a href="README.pt-BR.md">Português</a> ·
    <a href="README.fr.md">Français</a> ·
    <a href="README.hi.md">हिन्दी</a> ·
    <a href="README.zh-CN.md">简体中文</a> ·
    <strong>日本語</strong> ·
    <a href="README.ko.md">한국어</a>
  </p>
</div>

デザイナーがマスターを作り、eonik がメディアプランに必要なすべてのサイズを、ブランドに沿って Mac の eonik アプリで作ります（[ダウンロード](https://www.eonik.ai/download)）。Claude、ChatGPT、Cursor、Codex、VS Code から依頼できます。あなたが決めるまで、何も作成・変更・送信されません。

接続：`https://api.eonik.ai/mcp` をコネクタとして追加し、サインインします。ローカルサーバーを実行するホストの場合：

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

ブランドが複数ある場合は `EONIK_BRAND_ID` が必須です。eonik がどのクライアントの作業かを推測することはありません。

[Mac 版をダウンロード](https://www.eonik.ai/download) · エディタ無料 · macOS 15+ · Apple silicon
