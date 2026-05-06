/**
 * Optional (legacy): in-document zoom via ?ziadah_iframe_zoom=
 * The landing page now scales the iframe to ~70% with CSS (.ld-frame transform),
 * snippet is not needed unless you embed the store elsewhere without that CSS.
 * Values 2–100 are treated as a percent (70 → 70%).
 * Mobile preview on ziadah.app uses an inner iframe + fixed bootstrap viewport (~390px)
 * so Zid themes see real mobile breakpoints; this file does not drive that behavior.
 */
(function () {
  if (window.self === window.top) return;
  var raw = null;
  try {
    raw = new URL(window.location.href).searchParams.get("ziadah_iframe_zoom");
  } catch (e) {
    return;
  }
  if (raw == null || raw === "") return;
  var z = parseFloat(raw);
  if (z > 2 && z <= 100) z = z / 100;
  if (!(z > 0.25 && z <= 2)) return;
  document.documentElement.style.zoom = String(z);
})();
