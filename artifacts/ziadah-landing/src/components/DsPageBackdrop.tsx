/**
 * Soft brand-green/cyan atmosphere behind marketing pages (same family as Analyze).
 * Place once inside PageShell; keep section content at z-index ≥ 1.
 */
export default function DsPageBackdrop() {
  return (
    <div className="ds-page-atmos" aria-hidden>
      <div className="ds-page-atmos__orb ds-page-atmos__orb--a" />
      <div className="ds-page-atmos__orb ds-page-atmos__orb--b" />
    </div>
  );
}
