// Show the main content after the page loads
window.onload = function () {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }, 1500); // Loader for 1.5s
};

// Handle game iframe loading
document.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    var gameName = link.textContent;
    console.log("Loading " + gameName + "...");

    document.getElementById('loader').style.display = 'block';
    document.getElementById('content').style.display = 'none';

    var iframe = document.getElementById('gameFrame');
    if (iframe) {
      iframe.onload = function () {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
      };
    }
  });
});

// 🌊 Updated proxy logic using UV Static
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let url = document.getElementById('urlInput').value.trim();
  if (!url) return;

  // Auto-prefix https://
  if (!url.startsWith('http')) {
    url = 'https://' + url;
  }

  // Encode the URL using UV Static
  const encoded = __uv$config.encodeUrl(url);
  const proxyUrl = __uv$config.prefix + encoded;

  // Stealth mode: about:blank injection
  if (document.getElementById('blankMode').checked) {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html><head><title>Tide Surf</title>
        <script src="/uv/uv.bundle.js"></script>
        <script src="/uv/uv.config.js"></script>
        <script src="/uv/uv.client.js"></script>
        </head>
        <body style="margin:0;height:100vh;">
          <iframe src="${proxyUrl}" style="border:none;width:100%;height:100%;"></iframe>
        </body></html>
      `);
    } else {
      alert('Popup blocked! Please allow popups.');
    }
  } else {
    // Standard in-page redirect
    window.location.href = proxyUrl;
  }
});

// ✅ Register UV service worker for proper proxy behavior
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/uv/uv.sw.js', { scope: '/uv/' })
    .then(() => console.log('✅ UV Service Worker registered'))
    .catch(err => console.error('❌ UV Service Worker registration failed:', err));
}
