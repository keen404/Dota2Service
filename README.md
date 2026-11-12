# 🎮 Dota 2 Services – หน้าร้านบริการ Dota 2

เว็บไซต์หน้าร้านสำหรับบริการ Dota 2 แสดงรายละเอียดบริการ เรทราคา และมีเครื่องคิดเลขประเมินค่าบริการปั๊มแรงค์แบบโปร่งใส

**🔗 Live Demo:** [keen404.github.io/Dota2Service](https://keen404.github.io/Dota2Service/)

## ✨ ฟีเจอร์

- **แสดงบริการ 3 แบบ** พร้อมราคาชัดเจน
- **MMR Calculator** คำนวณค่าบริการปั๊มแรงค์ทันทีจาก MMR ปัจจุบัน MMR เป้าหมาย และ Win Rate ที่สมมติ
- **ตารางเปรียบเทียบ Win Rate** แสดงให้เห็นว่ายิ่งชนะบ่อย ราคาเฉลี่ยต่อ MMR ยิ่งถูกลง
- **แสดงตำแหน่งที่เล่นได้** พร้อมระดับฝีมือ
- **รองรับมือถือ** (Responsive) และรองรับ Light/Dark mode อัตโนมัติ
- **แยกโค้ดเป็น modules** ดูแลรักษาง่าย ไม่ต้องติดตั้ง ไม่มี dependency
- **ติดตามผู้เข้าชม** ด้วย GoatCounter โดยยอดดูได้เฉพาะเจ้าของผ่าน dashboard

## 💼 บริการและราคา

| บริการ | ราคา | รายละเอียด |
|---|---|---|
| เล่นเป็นเพื่อน | 66 บาท / เกม | ลูกค้าแรงค์ใดก็ได้ |
| ปั๊มแรงค์ | 15–20 บาท / เกม + ค่า MMR | คิดตาม MMR ปัจจุบันและแต้มที่เพิ่มขึ้นจริง |
| โค้ชชิ่ง 1:1 | 350 บาท / ชั่วโมง | วิเคราะห์รีเพลย์อย่างละเอียด |

### เรทค่า MMR (บริการปั๊มแรงค์)

| ช่วง MMR | แรงค์ | บาท / MMR |
|---|---|---|
| 0 – 3,000 | Herald – Crusader | 1.5 |
| 3,001 – 4,600 | Archon – Ancient | 2.0 |
| 4,601 – 5,600 | Divine | 3.0 |
| 5,601+ | Immortal | ปิดรับบริการ |

## 🧮 วิธีคำนวณของ MMR Calculator

สมมติว่าชนะได้ +25 MMR และแพ้เสีย −25 MMR ต่อเกม

```
MMR สุทธิต่อเกม  = 25 × (2 × WinRate − 1)
จำนวนเกม         = ceil((MMR เป้าหมาย − MMR ปัจจุบัน) / MMR สุทธิต่อเกม)
ค่าลงสนาม         = จำนวนเกม × ค่าลงสนามของช่วง MMR ปัจจุบัน
ค่าโบนัส MMR      = (MMR ที่เพิ่มขึ้น) × โบนัสของช่วง MMR ปัจจุบัน
ราคารวม          = ค่าประกันเวลา + ค่าโบนัส MMR
ราคาเฉลี่ยต่อ MMR = ราคารวม / MMR ที่เพิ่มขึ้น
```

> หมายเหตุ: Win Rate ต้องมากกว่า 50% และเป็นการประมาณการเท่านั้น ราคาจริงอาจแตกต่างตามผลการเล่น

## 🛠️ เทคโนโลยีที่ใช้

- HTML5 + CSS3 (CSS Variables, Grid, Flexbox)
- JavaScript (Vanilla, ไม่ใช้เฟรมเวิร์ก)
- Google Fonts (Noto Sans Thai)

## 🚀 เริ่มใช้งาน

### รันในเครื่อง

```bash
git clone https://github.com/keen404/Dota2Service.git
cd Dota2Service
```

จากนั้นเปิดไฟล์ `index.html` ด้วยเบราว์เซอร์ได้เลย

### ดูจำนวนผู้เข้าชม

สถิติผู้เข้าชมรายเดือนดูได้จาก [GoatCounter dashboard](https://2003keen.goatcounter.com/)
โดยยอดจะไม่ถูกแสดงบนหน้าเว็บแก่ผู้เข้าชมทั่วไป

### Deploy ด้วย GitHub Pages

1. ตั้งชื่อไฟล์หลักเป็น `index.html`
2. ไปที่ **Settings → Pages**
3. ที่ **Source** เลือก **Deploy from a branch** แล้วเลือก branch `main` โฟลเดอร์ `/ (root)`
4. กด **Save** รอสักครู่ เว็บจะอยู่ที่ https://keen404.github.io/Dota2Service/

## ⚙️ การปรับแต่ง

แก้ราคาได้ที่ไฟล์ [`js/config.js`](./js/config.js)

```js
export const MAX_MMR = 5600;
export const PRICING_TIERS = [
  { min: 0, max: 3000, pricePerMmr: 1.75 },
  { min: 3001, max: 4200, pricePerMmr: 2.5 },
  { min: 4201, max: 4800, pricePerMmr: 3.25 },
  { min: 4801, max: 5600, pricePerMmr: 4 },
];
```

ราคาบริการอื่นและข้อความ แก้ได้ในส่วน HTML โดยตรง ส่วนสีธีมแก้ได้ที่ CSS Variables ใน `:root`

## 📁 โครงสร้างโปรเจกต์

```
.
├── index.html   # โครงสร้างหน้าเว็บ
├── css/
│   └── style.css     # สไตล์ทั้งหมดของหน้าเว็บ
├── js/
│   ├── config.js      # ค่าคงที่และเรทราคา
│   ├── calculator.js  # logic การคำนวณ
│   ├── dom.js         # แสดงผลและจัดการ DOM
│   ├── analytics.js   # เริ่มต้นระบบติดตามผู้เข้าชม
│   └── main.js        # จุดเริ่มต้นและ event handlers
├── LICENSE
└── README.md
```

## 📞 ติดต่อ

- Facebook: [jinna.punthumongkol](https://www.facebook.com/jinna.punthumongkol/)
- Discord: [เข้าร่วมเซิร์ฟเวอร์](https://discord.gg/fUbnR6uns)

## ⚠️ ข้อสงวนสิทธิ์

- โปรเจกต์นี้ไม่ได้เกี่ยวข้องหรือได้รับการรับรองจาก Valve Corporation
- Dota 2 เป็นเครื่องหมายการค้าของ Valve Corporation
- บริการปั๊มแรงค์อาจขัดกับข้อกำหนดการใช้งานของเกม และมีความเสี่ยงต่อบัญชีของลูกค้า โปรดพิจารณาก่อนใช้บริการ

## 📄 License

[MIT](./LICENSE) © 2026 keen404