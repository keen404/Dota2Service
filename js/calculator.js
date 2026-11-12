import { PRICING_TIERS } from "./config.js";

export function calculatePrice(startMmr, targetMmr) {
  const mmrDifference = targetMmr - startMmr;
  const total = PRICING_TIERS.reduce((sum, { min, max, pricePerMmr }) => {
    const tierStart = Math.max(startMmr + 1, min);
    const tierEnd = Math.min(targetMmr, max);
    const mmrInTier = Math.max(0, tierEnd - tierStart + 1);
    return sum + mmrInTier * pricePerMmr;
  }, 0);

  return {
    mmrDifference,
    total,
    averagePrice: mmrDifference > 0 ? total / mmrDifference : 0,
  };
}
