import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <button id='update-button'>Buscar e Instalar Update</button>
    <button id='skip-waiting-button'>Activar Update</button>

    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// Code provided by chatGPT to replace the npm package `@3m1/service-worker-updater`
// This code adds functions to both buttons above: checks for SW updates and activates the update
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js", { scope: "/" });
      console.log("Service worker registered:", registration);

      const updateButton = document.getElementById("update-button");
      const skipWaitingButton = document.getElementById("skip-waiting-button");

      updateButton.addEventListener("click", async () => {
        await registration.update();
        console.log("Service worker updated.");
      });

      skipWaitingButton.addEventListener("click", async () => {
        if (registration.waiting) {
          await registration.waiting.postMessage({ type: "SKIP_WAITING" });
          console.log("Sent SKIP_WAITING message to service worker.");
        };
      });

      if (registration.waiting) {
        updateButton.disabled = false;
        skipWaitingButton.disabled = false;
      }

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              updateButton.disabled = false;
              skipWaitingButton.disabled = false;
            } else {
              console.log("Service worker installed for the first time.");
            }
          }
        });
      });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
        console.log("Service worker controller changed.");
      });

      navigator.serviceWorker.addEventListener("message", event => {
        if (event.data.type === "SKIP_WAITING_RESULT") {
          window.location.reload();
          console.log("Received SKIP_WAITING_RESULT message from service worker.");
        }
      });
    } catch (err) {
      console.error("Service worker registration failed:", err);
    }
  });
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
