import { GOATCOUNTER_SITE_URL } from "./config.js";

export function initializeAnalytics() {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.dataset.goatcounter = `${GOATCOUNTER_SITE_URL}/count`;
  document.head.appendChild(script);
}
