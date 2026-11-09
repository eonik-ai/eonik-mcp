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

eonik आपके प्रतिस्पर्धियों के विज्ञापनों पर नज़र रखता है, आपके अपने विज्ञापन पढ़ता है, और आपके Mac पर eonik ऐप में किसी विज्ञापन का हर साइज़ ब्रांड के अनुरूप बनाता है ([डाउनलोड](https://www.eonik.ai/download))। Claude, ChatGPT, Cursor, Codex या VS Code से कहें: ब्रांड सेट करना, प्रतिस्पर्धी और आपके अपने विज्ञापन किसी भी असिस्टेंट से चलते हैं; बनाना और साइज़ बदलना आपके Mac पर होता है। जब तक आप न कहें, कुछ भी बनाया, बदला या भेजा नहीं जाता।

एक कमांड से अपने सभी असिस्टेंट जोड़ें: `npx eonik-mcp init` (हर असिस्टेंट पहली बार eonik में साइन इन कराता है; कोई की कॉपी नहीं होती)। या `https://api.eonik.ai/mcp` को कनेक्टर के रूप में जोड़ें और साइन इन करें। जिन होस्ट को लोकल प्रोसेस चाहिए:

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

`EONIK_BRAND_ID` वैकल्पिक है: एक से ज़्यादा ब्रांड हों तो आप बातचीत में चुनते हैं, और eonik कभी अंदाज़ा नहीं लगाता कि काम किस क्लाइंट का है।

[Mac के लिए डाउनलोड करें](https://www.eonik.ai/download) · एडिटर मुफ़्त · macOS 15+ · Apple silicon
