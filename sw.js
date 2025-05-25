importScripts('/active/uv/uv.bundle.js');
importScripts('/active/uv/uv.config.js');
importScripts(__uv$config.sw || '/active/uv/uv.sw.js')

const sw = new UVServiceWorker();

self.addEventListener('fetch', event =>
    event.respondWith(
        sw.fetch(event)
    )
);