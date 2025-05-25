const swAllowedHostnames = ["localhost", "127.0.0.1"];
const dnsResolver = "8.8.8.8";

async function registerSW() {
  console.log("Bare server: " + self.__uv$config.bare);

  if (
    location.protocol !== "https:" &&
    !swAllowedHostnames.includes(location.hostname)
  )
    throw new Error("Service workers cannot be registered without https.");

  if (!navigator.serviceWorker)
    throw new Error("Your browser doesn't support service workers.");

  try {
    const registration = await navigator.serviceWorker.register('sw.js', {
      scope: __uv$config.prefix,
    });

    const scope = new URL(registration.scope).pathname;

    if (registration) {
      console.log("Successfully registered service worker with scope: " + scope);
    } else {
      console.error("Failed to register service worker!");
    }
  } catch (error) {
    console.error("Error registering service worker: " + error.message);
  }
}

window.addEventListener('load', registerSW);