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

eonik は競合の広告を見守り、あなた自身の広告を読み、Mac の eonik アプリで広告のすべてのサイズをブランドどおりに作ります（[ダウンロード](https://www.eonik.ai/download)）。Claude、ChatGPT、Cursor、Codex、VS Code から頼めます。ブランドの設定、競合、自社の広告はどのアシスタントからでも使えます。制作とサイズ展開は Mac で行います。あなたが言うまで、何も作られず、変更も送信もされません。

すべてのアシスタントを 1 つのコマンドで接続：`npx eonik-mcp init`（各アシスタントが初回に eonik へのサインインを求めます。キーのコピーは不要です）。または `https://api.eonik.ai/mcp` をコネクタとして追加してサインインします。ローカルプロセスが必要なホストの場合：

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

`EONIK_BRAND_ID` は任意です。ブランドが複数あれば会話の中で選びます。eonik はどのクライアントの作業かを推測しません。

[Mac 版をダウンロード](https://www.eonik.ai/download) · エディタは無料 · macOS 15+ · Apple silicon
