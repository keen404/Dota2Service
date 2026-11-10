import { calculatePrice } from "./calculator.js";
import { COMPARISON_WIN_RATES } from "./config.js";

const formatNumber = (value) => Math.round(value).toLocaleString("th-TH");

const getElement = (id) => document.getElementById(id);

function clearResults() {
  getElement("res").innerHTML = "";
  getElement("cmp").innerHTML = "";
}

function renderResult(result) {
  getElement("res").innerHTML = [
    `<div><b>${formatNumber(result.games)}</b><span>จำนวนเกมที่ต้องเล่น</span></div>`,
    `<div><b>${formatNumber(result.timePrice)} ฿</b><span>ค่าประกันเวลารวม</span></div>`,
    `<div><b>${formatNumber(result.mmrPrice)} ฿</b><span>ค่าโบนัส MMR รวม (+${formatNumber(result.mmrDifference)} MMR)</span></div>`,
    `<div class="tot"><b>${formatNumber(result.total)} ฿</b><span>ราคารวมโดยประมาณ</span></div>`,
    `<div class="tot"><b>${result.averagePrice.toFixed(2)} ฿</b><span>ราคาเฉลี่ยสุทธิต่อ 1 MMR</span></div>`,
  ].join("");
}

function renderComparison(startMmr, targetMmr, selectedWinRate) {
  const winRates = COMPARISON_WIN_RATES.includes(selectedWinRate)
    ? COMPARISON_WIN_RATES
    : [...COMPARISON_WIN_RATES, selectedWinRate].sort((a, b) => b - a);
  const rows = winRates.map((winRate, index) => {
    const result = calculatePrice(startMmr, targetMmr, winRate);
    const classes = [
      winRate === selectedWinRate ? "hl" : "",
      index === 0 ? "best" : "",
    ].filter(Boolean).join(" ");

    return `<tr class="${classes}"><td>${winRate}%</td><td>${formatNumber(result.games)}</td><td>${formatNumber(result.timePrice)} ฿</td><td>${formatNumber(result.mmrPrice)} ฿</td><td>${formatNumber(result.total)} ฿</td><td>${result.averagePrice.toFixed(2)} ฿</td></tr>`;
  });
  const header = "<tr><th>Win Rate</th><th>จำนวนเกม</th><th>ค่าประกันเวลา</th><th>ค่าโบนัส MMR</th><th>รวม</th><th>เฉลี่ย/MMR</th></tr>";

  getElement("cmp").innerHTML = header + rows.join("");
}

export function updateCalculator() {
  const startMmr = +getElement("cur").value;
  const targetMmr = +getElement("tgt").value;
  const winRate = +getElement("wr").value;
  const error = getElement("err");

  if (!(startMmr >= 0) || !(targetMmr > startMmr)) {
    error.textContent = "MMR เป้าหมายต้องมากกว่า MMR ปัจจุบัน";
    clearResults();
    return;
  }
  if (!(winRate > 50 && winRate <= 100)) {
    error.textContent = "Win Rate ต้องมากกว่า 50% และไม่เกิน 100%";
    clearResults();
    return;
  }

  error.textContent = "";
  renderResult(calculatePrice(startMmr, targetMmr, winRate));
  renderComparison(startMmr, targetMmr, winRate);

  Array.from(getElement("chips").children).forEach((chip) => {
    chip.classList.toggle("on", +chip.dataset.w === winRate);
  });
}
