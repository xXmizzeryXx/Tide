// Show the main content after the page loads
window.onload = function() {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 1500); // Loader for 1.5s
};

// Handle game iframe loading
document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        var gameName = link.textContent;
        console.log("Loading " + gameName + "...");

        // Show loader before game loads
        document.getElementById('loader').style.display = 'block';
        document.getElementById('content').style.display = 'none';
        
        // Hide loader once the iframe content has loaded
        var iframe = document.getElementById('gameFrame');
        iframe.onload = function() {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        };
    });
});

// Handle search form submission (this code stays the same as in the original script)
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
