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

eonik은 경쟁사의 광고를 지켜보고, 여러분의 광고를 읽고, Mac의 eonik 앱에서 광고의 모든 사이즈를 브랜드에 맞게 만듭니다([다운로드](https://www.eonik.ai/download)). Claude, ChatGPT, Cursor, Codex, VS Code에서 요청하세요. 브랜드 설정, 경쟁사, 자사 광고는 어느 어시스턴트에서나 됩니다. 제작과 사이즈 변환은 Mac에서 이뤄집니다. 여러분이 말하기 전에는 아무것도 만들거나 바꾸거나 보내지 않습니다.

명령 하나로 모든 어시스턴트 연결: `npx eonik-mcp init` (각 어시스턴트가 처음 쓸 때 eonik 로그인을 요청합니다. 키를 복사할 필요가 없습니다). 또는 `https://api.eonik.ai/mcp`를 커넥터로 추가하고 로그인하세요. 로컬 프로세스가 필요한 호스트의 경우:

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

`EONIK_BRAND_ID`는 선택 사항입니다. 브랜드가 여러 개라면 대화에서 고르면 되고, eonik은 어느 고객의 작업인지 추측하지 않습니다.

[Mac용 다운로드](https://www.eonik.ai/download) · 에디터 무료 · macOS 15+ · Apple silicon
