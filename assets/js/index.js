<script>
  function runStealthMode() {
    const title = "Google";
    const icon = "https://www.google.com/favicon.ico";
    const src = window.location.href;

    const popup = window.open("about:blank", "_blank");

    if (!popup || popup.closed) {
      alert("Popup blocked. Please allow popups for stealth mode to work.");
      return;
    }

    popup.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <link rel="icon" href="${icon}">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              height: 100%;
              overflow: hidden;
              background: #fff;
            }
            iframe {
              width: 100%;
              height: 100%;
              border: none;
            }
          </style>
        </head>
        <body>
          <iframe src="${src}" allowfullscreen></iframe>
        </body>
      </html>
    `);
    popup.document.close();

    // Redirect the current window back to Google
    window.location.href = "https://www.google.com";
  }

  window.addEventListener("load", () => {
    const stealth = JSON.parse(localStorage.getItem("stealthModeEnabled")) || false;
    const checkbox = document.getElementById("blankMode");
    if (checkbox) {
      checkbox.checked = stealth;

      if (stealth) runStealthMode();

      checkbox.addEventListener("change", function () {
        const isChecked = checkbox.checked;
        localStorage.setItem("stealthModeEnabled", JSON.stringify(isChecked));
        if (isChecked) runStealthMode();
      });
    }
  });

  // Example: search form that proxies queries through Ultraviolet
  document.getElementById('searchForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    let query = document.getElementById('urlInput').value.trim();
    if (!query) return;

    const rawUrl = generateSearchUrl(query);
    const encoded = __uv$config.encodeUrl(rawUrl);
    const proxyUrl = __uv$config.prefix + encoded;

    window.location.href = proxyUrl;
  });

  function generateSearchUrl(query) {
    try {
      const url = new URL(query);
      return url.toString();
    } catch {
      try {
        const url = new URL(`https://${query}`);
        if (url.hostname.includes('.')) return url.toString();
      } catch {}
    }
    return `https://duckduckgo.com/search?q=${encodeURIComponent(query)}&source=web`;
  }
</script>
