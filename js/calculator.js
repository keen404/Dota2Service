import { MMR_PER_GAME, PRICING_TIERS } from "./config.js";

export function getPricingTier(mmr) {
  return PRICING_TIERS.find(({ min, max }) => mmr >= min && mmr <= max);
}

export function calculateBonus(startMmr, mmrDifference) {
  const targetMmr = startMmr + mmrDifference;

  return PRICING_TIERS.reduce((total, { min, max, bonusFee }) => {
    const tierStart = Math.max(startMmr + 1, min);
    const tierEnd = Math.min(targetMmr, max);
    const mmrInTier = Math.max(0, tierEnd - tierStart + 1);
    return total + mmrInTier * bonusFee;
  }, 0);
}

export function calculatePrice(startMmr, targetMmr, winRate) {
  const mmrDifference = targetMmr - startMmr;
  const netMmrPerGame = MMR_PER_GAME * (2 * winRate / 100 - 1);
  const games = Math.ceil(mmrDifference / netMmrPerGame - 1e-9);
  const tier = getPricingTier(targetMmr);
  if (!tier) {
    throw new RangeError(`Unsupported starting MMR: ${startMmr}`);
  }
  const timePrice = games * tier.baseFee;
  const mmrPrice = calculateBonus(startMmr, mmrDifference);
  const total = timePrice + mmrPrice;

  return {
    mmrDifference,
    games,
    timePrice,
    mmrPrice,
    total,
    averagePrice: total / mmrDifference,
    tier,
  };
}
