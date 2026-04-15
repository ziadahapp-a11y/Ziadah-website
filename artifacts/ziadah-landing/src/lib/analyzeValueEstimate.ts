/**
 * Rough incremental revenue estimate from catalog + traffic inputs.
 * For illustration only — not a financial guarantee.
 */

export type AnchorGroupInput = {
  anchor: { price: number | null };
  recommendations: Array<{ price: number | null; role: string }>;
};

export type ValueEstimateResult = {
  monthlyOrders: number;
  baselineMonthlyRevenue: number;
  estimatedIncrementalMonthly: number;
  upliftVsBaselinePercent: number;
  assumptionsNote: "full" | "partial_defaults";
};

const DEFAULT_VISITORS = 5000;
const DEFAULT_CONV = 0.02;
const DEFAULT_AOV = 200;

function meanPositivePrices(prices: number[]): number {
  const ok = prices.filter((p) => p > 0);
  if (ok.length === 0) return DEFAULT_AOV;
  return ok.reduce((a, b) => a + b, 0) / ok.length;
}

export function estimateAnalyzeOpportunity(
  groups: AnchorGroupInput[],
  monthlyUsers: number | null | undefined,
  conversionRatePct: number | null | undefined,
  avgOrderValue: number | null | undefined,
): ValueEstimateResult {
  const visitors =
    monthlyUsers != null && monthlyUsers > 0 ? monthlyUsers : DEFAULT_VISITORS;
  const conv =
    conversionRatePct != null && conversionRatePct > 0
      ? Math.min(conversionRatePct / 100, 0.5)
      : DEFAULT_CONV;
  const aovFallback =
    avgOrderValue != null && avgOrderValue > 0 ? avgOrderValue : null;

  const allRecPrices = groups.flatMap((g) =>
    g.recommendations.map((r) => r.price).filter((p): p is number => p != null && p > 0),
  );
  const anchorPrices = groups.map((g) => g.anchor.price).filter((p): p is number => p != null && p > 0);

  const meanRec = meanPositivePrices(allRecPrices);
  const meanAnchor = meanPositivePrices(anchorPrices.length ? anchorPrices : allRecPrices);

  const aov = aovFallback ?? (meanAnchor > 0 ? meanAnchor : DEFAULT_AOV);

  const monthlyOrders = Math.round(visitors * conv);
  const baselineMonthlyRevenue = monthlyOrders * aov;

  /** Attach rate to at least one recommended SKU */
  const attachRate = 0.09;
  /** Share of orders where incremental item is accepted */
  const incrementalAttach = Math.min(0.35, attachRate + groups.length * 0.02);

  let incrementalPerOrder = 0;
  for (const g of groups) {
    const recs = g.recommendations;
    let cross = 0;
    let up = 0;
    let crossN = 0;
    let upN = 0;
    for (const r of recs) {
      const p = r.price;
      if (p == null || p <= 0) continue;
      if (r.role === "cross_sell") {
        cross += p;
        crossN += 1;
      } else {
        up += p;
        upN += 1;
      }
    }
    const avgCross = crossN ? cross / crossN : meanRec * 0.85;
    const avgUp = upN ? up / upN : meanRec * 1.15;
    incrementalPerOrder += avgCross * 0.12 + Math.max(0, avgUp - (g.anchor.price ?? meanAnchor)) * 0.08;
  }
  if (incrementalPerOrder <= 0) {
    incrementalPerOrder = meanRec * 0.1;
  }

  const estimatedIncrementalMonthly = monthlyOrders * incrementalAttach * incrementalPerOrder;
  const upliftVsBaselinePercent =
    baselineMonthlyRevenue > 0
      ? (estimatedIncrementalMonthly / baselineMonthlyRevenue) * 100
      : 0;

  const assumptionsNote: "full" | "partial_defaults" =
    monthlyUsers && conversionRatePct && avgOrderValue ? "full" : "partial_defaults";

  return {
    monthlyOrders,
    baselineMonthlyRevenue,
    estimatedIncrementalMonthly,
    upliftVsBaselinePercent,
    assumptionsNote,
  };
}
