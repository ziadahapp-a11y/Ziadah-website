/** تمرير نافذة التصفح لأعلى — فوري لتفادي تعارض مع scroll-behavior:smooth على html */
export function scrollWindowToTop(): void {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** بعد رسم الإطار التالي (وغالباً بعد ارتفاع الصفحة الجديدة) لضمان بقاء التمرير في الأعلى */
export function scrollWindowToTopAfterPaint(): void {
  scrollWindowToTop();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollWindowToTop();
    });
  });
}
