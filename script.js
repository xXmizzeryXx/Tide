window.onload = function() {
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('content').style.display = 'block';
    }, 1500); // Loader for 1.5s
  };
  
  document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let url = document.getElementById('urlInput').value.trim();
  
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }
  
    if (document.getElementById('blankMode').checked) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html><head><title>Tide Surf</title></head>
          <body style="margin:0;height:100vh;">
            <iframe src="${url}" style="border:none;width:100%;height:100%;"></iframe>
          </body></html>
        `);
      } else {
        alert('Popup blocked! Please allow popups.');
      }
    } else {
      window.location.href = url;
    }
  });
  