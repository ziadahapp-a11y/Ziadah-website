import { Helmet } from "react-helmet-async";
import ActivationFilm from "@/pages/home/ActivationFilm";

/** The activation film at 1920x1080 on a bare page, for recording it frame by
 *  frame. Not linked from anywhere, not in the sitemap, and kept out of indexes. */
export default function FilmRender() {
  return (
    <>
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      {/* The site's own header and footer would sit on top of the recording. */}
      <style>{".site-header, .site-footer, footer, [data-header] { display: none !important; } body { overflow: hidden; }"}</style>
      <div style={{ position: "fixed", inset: 0, background: "#fff" }}>
        <ActivationFilm capture />
      </div>
    </>
  );
}
