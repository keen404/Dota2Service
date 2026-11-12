import { calculatePrice } from "./calculator.js";
import { MAX_MMR } from "./config.js";

const formatNumber = (value) => Math.round(value).toLocaleString("th-TH");
const getElement = (id) => document.getElementById(id);

function clearResults() {
  getElement("res").innerHTML = "";
}

function renderResult(result) {
  getElement("res").innerHTML = [
    `<div><b>+${formatNumber(result.mmrDifference)} MMR</b><span>จำนวน MMR ที่เพิ่มขึ้น</span></div>`,
    `<div class="tot"><b>${result.total.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</b><span>ราคารวมสุทธิ (บาท)</span></div>`,
    `<div><b>${result.averagePrice.toFixed(2)} ฿</b><span>ราคาเฉลี่ยต่อแต้ม (บาท / 1 MMR)</span></div>`,
  ].join("");
}

export function updateCalculator() {
  const currentInput = getElement("cur");
  const targetInput = getElement("tgt");
  const inputValues = [currentInput.value, targetInput.value];
  const error = getElement("err");

  if (inputValues.some((value) => value.trim() === "")) {
    error.textContent = "กรุณากรอก MMR ปัจจุบันและเป้าหมายให้ครบถ้วน";
    clearResults();
    return;
  }

  let startMmr = Number(currentInput.value);
  let targetMmr = Number(targetInput.value);

  if (![startMmr, targetMmr].every((value) => Number.isFinite(value) && Number.isInteger(value))) {
    error.textContent = "กรุณากรอก MMR เป็นจำนวนเต็มเท่านั้น";
    clearResults();
    return;
  }

  if (startMmr > MAX_MMR || targetMmr > MAX_MMR) {
    alert("รับบริการสูงสุดที่ 5,600 MMR (Divine 5) เท่านั้น");
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

  error.textContent = "";
  renderResult(calculatePrice(startMmr, targetMmr));
}
