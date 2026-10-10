<div align="center">
  <a href="https://www.eonik.ai"><img src="https://www.eonik.ai/logo.svg" alt="eonik" width="160" /></a>
  <h1>eonik</h1>
  <p><strong>완성된 온브랜드 광고, 잡일 없이.</strong></p>
  <p>
    <a href="../../README.md">English</a> ·
    <a href="README.es.md">Español</a> ·
    <a href="README.pt-BR.md">Português</a> ·
    <a href="README.fr.md">Français</a> ·
    <a href="README.hi.md">हिन्दी</a> ·
    <a href="README.zh-CN.md">简体中文</a> ·
    <a href="README.ja.md">日本語</a> ·
    <strong>한국어</strong>
  </p>
</div>

디자이너가 마스터를 만들면, eonik이 미디어 플랜에 필요한 모든 사이즈를 브랜드에 맞게 Mac의 eonik 앱에서 만듭니다([다운로드](https://www.eonik.ai/download)). Claude, ChatGPT, Cursor, Codex, VS Code에서 요청하세요. 직접 결정하기 전에는 아무것도 만들거나 바꾸거나 보내지 않습니다.

연결: `https://api.eonik.ai/mcp`를 커넥터로 추가하고 로그인하세요. 로컬 서버를 실행하는 호스트의 경우:

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

브랜드가 둘 이상이면 `EONIK_BRAND_ID`가 필요합니다. eonik은 어떤 클라이언트의 작업인지 절대 추측하지 않습니다.

[Mac용 다운로드](https://www.eonik.ai/download) · 에디터 무료 · macOS 15+ · Apple silicon
