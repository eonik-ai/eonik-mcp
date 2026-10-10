<div align="center">
  <a href="https://www.eonik.ai"><img src="https://www.eonik.ai/logo.svg" alt="eonik" width="160" /></a>
  <h1>eonik</h1>
  <p><strong>成品、符合品牌的广告，少做杂活。</strong></p>
  <p>
    <a href="../../README.md">English</a> ·
    <a href="README.es.md">Español</a> ·
    <a href="README.pt-BR.md">Português</a> ·
    <a href="README.fr.md">Français</a> ·
    <a href="README.hi.md">हिन्दी</a> ·
    <strong>简体中文</strong> ·
    <a href="README.ja.md">日本語</a> ·
    <a href="README.ko.md">한국어</a>
  </p>
</div>

设计师制作主稿，eonik 在你 Mac 上的 eonik 应用中，按品牌规范制作投放计划所需的每一个尺寸（[下载](https://www.eonik.ai/download)）。可以从 Claude、ChatGPT、Cursor、Codex 或 VS Code 发起：在你确认之前，不会制作、修改或发送任何内容。

连接：将 `https://api.eonik.ai/mcp` 添加为连接器并登录。对于运行本地服务器的客户端：

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

如果你有多个品牌，必须设置 `EONIK_BRAND_ID`：eonik 从不猜测这是哪个客户的工作。

[下载 Mac 版](https://www.eonik.ai/download) · 编辑器永久免费 · macOS 15+ · Apple silicon
