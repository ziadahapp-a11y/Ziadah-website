import { useLocation } from "wouter";

export function useScrollToSection() {
  const [location, navigate] = useLocation();

  function scrollToSection(sectionId: string) {
    const id = sectionId.replace(/^#/, "");

    if (location === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate(`/#${id}`);
    }
  }

  return scrollToSection;
}
