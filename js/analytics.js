import { GOATCOUNTER_SITE_URL } from "./config.js";

export function initializeAnalytics() {
  if (document.querySelector("script[data-goatcounter]")) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.dataset.goatcounter = `${GOATCOUNTER_SITE_URL}/count`;
  document.head.appendChild(script);
}
