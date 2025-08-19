import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// Register service worker only in production
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/ServiceWorker.js")
      .then((reg) => console.log("✅ Service Worker registered:", reg))
      .catch((err) => console.log("❌ Service Worker failed:", err));
  });
}
