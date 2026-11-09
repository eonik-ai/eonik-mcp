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

eonik 关注你的竞争对手的广告，读取你自己的广告，并在你 Mac 上的 eonik 应用中把一条广告做成所有尺寸，符合品牌规范（[下载](https://www.eonik.ai/download)）。在 Claude、ChatGPT、Cursor、Codex 或 VS Code 中提出要求：设置品牌、竞争对手和你自己的广告在任何助手中都可用；制作和调整尺寸在你的 Mac 上完成。在你确认之前，不会制作、修改或发送任何内容。

一条命令连接你所有的助手：`npx eonik-mcp init`（每个助手第一次使用时会让你登录 eonik；无需复制任何密钥）。或者将 `https://api.eonik.ai/mcp` 添加为连接器并登录。需要本地进程的宿主：

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

`EONIK_BRAND_ID` 是可选的：如果你有多个品牌，在对话中选择即可，eonik 从不猜测是哪个客户的工作。

[下载 Mac 版](https://www.eonik.ai/download) · 编辑器免费 · macOS 15+ · Apple silicon
