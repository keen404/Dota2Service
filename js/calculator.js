import { BASE_PRICE, MMR_PER_GAME, MMR_SEGMENTS } from "./config.js";

export function calculateBonus(startMmr, targetMmr) {
  return MMR_SEGMENTS.reduce((total, [segmentStart, segmentEnd, price]) => {
    const mmrInSegment = Math.max(
      0,
      Math.min(segmentEnd, targetMmr) - Math.max(segmentStart, startMmr),
    );
    return total + mmrInSegment * price;
  }, 0);
}

export function calculatePrice(startMmr, targetMmr, winRate) {
  const mmrDifference = targetMmr - startMmr;
  const netMmrPerGame = MMR_PER_GAME * (2 * winRate / 100 - 1);
  const games = Math.ceil(mmrDifference / netMmrPerGame);
  const timePrice = games * BASE_PRICE;
  const mmrPrice = calculateBonus(startMmr, targetMmr);
  const total = timePrice + mmrPrice;

  return {
    mmrDifference,
    games,
    timePrice,
    mmrPrice,
    total,
    averagePrice: total / mmrDifference,
  };
}
