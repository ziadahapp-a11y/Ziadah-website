import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "@emran-alhaddad/saudi-riyal-font";
import "./index.css";

/** نطاق زيادة الأساسي بدون www — إعادة توجيه مباشرة للـ canonical (www) */
if (typeof window !== "undefined" && window.location.hostname === "ziadah.app") {
  const { pathname, search, hash } = window.location;
  window.location.replace(`https://www.ziadah.app${pathname}${search}${hash}`);
}

if (typeof window !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
