# 📁 โครงสร้างโฟลเดอร์รูปภาพ

## 📂 public/images/

โฟลเดอร์นี้เก็บรูปภาพทั้งหมดของเกม RPG แบ่งเป็นหมวดหมู่ดังนี้:

### 🧙‍♂️ characters/
รูปภาพตัวละครหลัก (Hero)
- `hero-idle.png` - ตัวละครยืนนิ่ง
- `hero-attack.png` - ตัวละครโจมตี
- `hero-hurt.png` - ตัวละครได้รับความเสียหาย
- `hero-victory.png` - ตัวละครชนะ

### 👹 enemies/
รูปภาพศัตรูทั้งหมด
- `slime.png` - สไลม์
- `goblin.png` - ก็อบลิน
- `skeleton.png` - โครงกระดูก
- `orc.png` - อ็อก
- `wolf.png` - หมาป่า
- `spider.png` - แมงมุมยักษ์
- `troll.png` - โทรลล์
- `dragon.png` - มังกรน้อย

### 🎒 items/
รูปภาพไอเท็มต่างๆ
- `health-potion.png` - ยารักษา
- `mana-potion.png` - ยาฟื้นฟูพลังเวทย์
- `sword.png` - ดาบ
- `shield.png` - โล่
- `bomb.png` - ระเบิด
- `poison-vial.png` - ขวดพิษ

### ✨ skills/
รูปภาพสกิลและเอฟเฟกต์
- `power-strike.png` - การโจมตีทรงพลัง
- `heal.png` - การรักษา
- `fireball.png` - ลูกไฟ
- `lightning.png` - สายฟ้า
- `ice-shard.png` - เศษน้ำแข็ง

### 🎨 ui/
รูปภาพ UI และไอคอน
- `logo.png` - โลโก้เกม
- `background.jpg` - พื้นหลัง
- `button-bg.png` - พื้นหลังปุ่ม
- `panel-bg.png` - พื้นหลังแผง

## 📏 ขนาดรูปภาพที่แนะนำ

- **ตัวละครและศัตรู**: 128x128 pixels หรือ 256x256 pixels
- **ไอเท็ม**: 64x64 pixels หรือ 128x128 pixels
- **สกิลไอคอน**: 64x64 pixels
- **พื้นหลัง**: 1920x1080 pixels (Full HD)
- **ไอคอน UI**: 32x32 pixels หรือ 64x64 pixels

## 🎨 รูปแบบไฟล์ที่รองรับ

- PNG (แนะนำสำหรับตัวละครและไอคอน)
- JPG/JPEG (แนะนำสำหรับพื้นหลัง)
- SVG (แนะนำสำหรับไอคอน UI)
- GIF (สำหรับแอนิเมชัน)

## 🚀 วิธีการใช้งาน

1. วางรูปภาพในโฟลเดอร์ที่เหมาะสม
2. ตั้งชื่อไฟล์ให้ตรงกับที่ระบุในโค้ด
3. ใช้ path แบบนี้ในโค้ด: `/images/characters/hero-idle.png`

## 📝 ตัวอย่างการใช้ในโค้ด

```jsx
// ในคอมโพเนนต์ Hero
<img 
  src="/images/characters/hero-idle.png" 
  alt="Hero" 
  className="w-24 h-24"
/>

// ในคอมโพเนนต์ Enemy
<img 
  src={`/images/enemies/${enemy.id}.png`} 
  alt={enemy.name}
  className="w-20 h-20"
/>
```

## 🎯 เคล็ดลับ

- ใช้รูปภาพขนาดเหมาะสมเพื่อประสิทธิภาพ
- ใช้ PNG สำหรับรูปที่ต้องการความโปร่งใส
- ใช้ JPG สำหรับพื้นหลังที่ไม่ต้องการความโปร่งใส
- ตั้งชื่อไฟล์ให้สอดคล้องกับ ID ในข้อมูล 