<div align="center">
  <a href="https://www.eonik.ai"><img src="https://www.eonik.ai/logo.svg" alt="eonik" width="160" /></a>
  <h1>eonik</h1>
  <p><strong>पूरी, ऑन-ब्रांड ऐड्स — बिना भारी मेहनत के।</strong></p>
  <p>
    <a href="../../README.md">English</a> ·
    <a href="README.es.md">Español</a> ·
    <a href="README.pt-BR.md">Português</a> ·
    <a href="README.fr.md">Français</a> ·
    <strong>हिन्दी</strong> ·
    <a href="README.zh-CN.md">简体中文</a> ·
    <a href="README.ja.md">日本語</a> ·
    <a href="README.ko.md">한국어</a>
  </p>
</div>

आपका डिज़ाइनर मास्टर बनाता है। eonik आपके मीडिया प्लान में माँगा गया हर साइज़ ब्रांड के हिसाब से बनाता है, आपके Mac पर eonik ऐप में ([डाउनलोड](https://www.eonik.ai/download))। Claude, ChatGPT, Cursor, Codex या VS Code से कहिए: आपके कहे बिना कुछ भी बनता, बदलता या भेजा नहीं जाता।

कनेक्ट करें: `https://api.eonik.ai/mcp` को कनेक्टर के रूप में जोड़ें और साइन इन करें। लोकल सर्वर चलाने वाले होस्ट के लिए:

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

एक से ज़्यादा ब्रांड हों तो `EONIK_BRAND_ID` ज़रूरी है: eonik कभी अंदाज़ा नहीं लगाता कि काम किस क्लाइंट का है।

[Mac के लिए डाउनलोड](https://www.eonik.ai/download) · एडिटर मुफ़्त · macOS 15+ · Apple silicon
