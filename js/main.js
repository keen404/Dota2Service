import { updateCalculator } from "./dom.js";
import { initializeAnalytics } from "./analytics.js";

["cur", "tgt", "wr"].forEach((id) => {
  document.getElementById(id).addEventListener("input", updateCalculator);
});

document.getElementById("chips").addEventListener("click", (event) => {
  const chip = event.target.closest("button[data-w]");
  if (!chip) return;

  document.getElementById("wr").value = chip.dataset.w;
  updateCalculator();
  initializeAnalytics();
});

updateCalculator();
initializeAnalytics();
