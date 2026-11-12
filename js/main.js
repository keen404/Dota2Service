import { updateCalculator } from "./dom.js";
import { initializeAnalytics } from "./analytics.js";
import { MAX_MMR } from "./config.js";

["cur", "tgt"].forEach((id) => {
  document.getElementById(id).max = MAX_MMR;
});

["cur", "tgt"].forEach((id) => {
  document.getElementById(id).addEventListener("input", updateCalculator);
});

updateCalculator();
initializeAnalytics();
