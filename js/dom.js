import { calculatePrice } from "./calculator.js";
import { COMPARISON_WIN_RATES, MAX_MMR } from "./config.js";

const formatNumber = (value) => Math.round(value).toLocaleString("th-TH");

const getElement = (id) => document.getElementById(id);

function clearResults() {
  getElement("res").innerHTML = "";
  getElement("cmp").innerHTML = "";
}

function renderResult(result) {
  getElement("res").innerHTML = [
    `<div><b>${formatNumber(result.games)}</b><span>จำนวนเกมที่ต้องเล่น</span></div>`,
    `<div><b>${formatNumber(result.timePrice)} ฿</b><span>ค่าลงสนามรวม (${result.tier.baseFee} ฿/เกม)</span></div>`,
    `<div><b>${formatNumber(result.mmrPrice)} ฿</b><span>โบนัส MMR (${result.tier.bonusFee} ฿/แต้ม)</span></div>`,
    `<div class="tot"><b>${formatNumber(result.total)} ฿</b><span>ราคารวมประเมินสุทธิ (บาท)</span></div>`,
    `<div class="tot"><b>${result.averagePrice.toFixed(2)} ฿</b><span>ราคาเฉลี่ยต่อแต้ม (บาท / 1 MMR)</span></div>`,
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
  const header = "<tr><th>Win Rate</th><th>จำนวนเกม</th><th>ค่าลงสนาม</th><th>โบนัส MMR</th><th>ราคารวม</th><th>เฉลี่ย/MMR</th></tr>";

  getElement("cmp").innerHTML = header + rows.join("");
}

export function updateCalculator() {
  const currentInput = getElement("cur");
  const targetInput = getElement("tgt");
  const winRateInput = getElement("wr");
  const inputValues = [currentInput.value, targetInput.value, winRateInput.value];
  const error = getElement("err");

  if (inputValues.some((value) => value.trim() === "")) {
    error.textContent = "กรุณากรอก MMR และ Win Rate ให้ครบถ้วน";
    clearResults();
    return;
  }

  let startMmr = Number(currentInput.value);
  let targetMmr = Number(targetInput.value);
  const winRate = Number(winRateInput.value);

  if (![startMmr, targetMmr, winRate].every(Number.isFinite)) {
    error.textContent = "กรุณากรอกข้อมูลเป็นตัวเลขเท่านั้น";
    clearResults();
    return;
  }

  if (startMmr > MAX_MMR || targetMmr > MAX_MMR) {
    alert("รับบริการสูงสุดที่ 5,600 MMR");
    if (startMmr > MAX_MMR) {
      currentInput.value = MAX_MMR;
      startMmr = MAX_MMR;
    }
    if (targetMmr > MAX_MMR) {
      targetInput.value = MAX_MMR;
      targetMmr = MAX_MMR;
    }
  }
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
