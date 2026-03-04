# CS4 RPG Game

เกมแนว **Turn-based RPG** ที่พัฒนาด้วย React + Zustand โดยเน้นระบบต่อสู้, ด่าน (Stage), สกิล, ไอเท็ม และร้านค้าในหน้าเดียว

## คุณสมบัติหลัก

- ⚔️ ระบบต่อสู้แบบผลัดเทิร์น (ผู้เล่น/ศัตรู)
- 🗺️ ระบบเลือกด่าน 5 ด่าน พร้อมเงื่อนไขเลเวลปลดล็อก
- 👾 ศัตรูหลายประเภท พร้อมค่าสถานะและของดรอป
- ✨ ระบบสกิล (โจมตี/ฮีล/บัฟ/ดีบัฟ)
- 🎒 ระบบไอเท็ม, กระเป๋า, อุปกรณ์สวมใส่
- 🏪 ร้านค้าสำหรับซื้อ-ขายไอเท็ม
- 📜 Battle Log แสดงเหตุการณ์แบบเรียลไทม์
- 🏆 หน้าผลลัพธ์เมื่อชนะ/แพ้

## Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **State Management:** Zustand (+ devtools middleware)
- **Styling:** Tailwind CSS + CSS ปกติ

## โครงสร้างโปรเจกต์ (สำคัญ)

```text
src/
  components/      # UI และคอมโพเนนต์เกม เช่น Hero, Enemy, Shop, BattleLog
  data/            # ข้อมูลด่าน ศัตรู สกิล และไอเท็ม
  pages/           # หน้าเกมหลัก
  store/           # Zustand store และ game logic
public/images/     # รูปตัวละคร ศัตรู ฉากหลัง และ assets อื่นๆ
```

## การติดตั้งและรันโปรเจกต์

> แนะนำ Node.js 18.x และ npm 8.x ตามที่กำหนดใน `package.json`

1) ติดตั้ง dependencies

```bash
npm install
```

2) รันโหมดพัฒนา

```bash
npm run dev
```

3) Build สำหรับ production

```bash
npm run build
```

4) พรีวิว production build

```bash
npm run preview
```

## Scripts ที่ใช้บ่อย

- `npm run dev` — เริ่ม dev server
- `npm run start` — alias ของ vite (ใช้เหมือน dev)
- `npm run build` — build โปรเจกต์
- `npm run preview` — ดูผลลัพธ์จาก build

## วิธีเล่น (ย่อ)

1. เข้าเกมและเลือกเมนูด่าน (Stage)
2. เลือกด่านที่ปลดล็อกได้ตามเลเวลตัวละคร
3. ระหว่างต่อสู้ให้เลือก **โจมตี / ใช้สกิล / ใช้ไอเท็ม**
4. ชนะเพื่อรับ EXP, Gold และของรางวัล
5. ใช้ร้านค้าและอุปกรณ์เพื่อเตรียมตัวสำหรับด่านถัดไป

## Deployment

โปรเจกต์มี `vercel.json` สำหรับรองรับ SPA routing โดย rewrite ทุกเส้นทางไปที่ `index.html` สามารถ deploy บน Vercel ได้ทันที

## หมายเหตุ

- ไฟล์ `node_modules/` และ `dist/` ไม่ควรถูกแก้ไขโดยตรง
- รูปภาพที่ใช้ในเกมอยู่ใน `public/images/`
