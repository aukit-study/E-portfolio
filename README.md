# 💻 E-Portfolio & Admin Dashboard

ระบบแฟ้มสะสมผลงาน (E-Portfolio) และแดชบอร์ดจัดการผลงาน (Admin Dashboard) รูปแบบใหม่ที่สะอาดตา เรียบหรู และทันสมัย ออกแบบและพัฒนาอินเทอร์เฟซเพื่อตอบสนองการใช้งานในทุกอุปกรณ์ (Responsive Web Design) ควบคู่กับแอนิเมชันที่ไหลลื่น

---

## 🌟 ฟีเจอร์หลัก (Key Features)

- **Featured Projects & Experience (แบบรวมหัวข้อ):** แสดงประวัติการทำงานคู่กับรายการผลงานโปรเจกต์ทั้งหมดของคุณในที่เดียว ช่วยให้ผู้เยี่ยมชมเห็นประวัติการพัฒนาทักษะได้สะดวกขึ้น
- **Dynamic Category Filter (ตัวกรองหมวดหมู่):** 
  - แท็บปุ่มกดเลือกดูผลงานแบ่งตามประเภทผลงานที่กำหนด เช่น *Work Experience*, *Production Project*, *Personal Project*, *Competition Project* เป็นต้น
  - คาร์ดรายการแสดงผลจะเลื่อนขึ้นและโหลดภาพด้วยแอนิเมชันอย่างนุ่มนวลแบบเหลื่อมเวลากัน (Staggered Animation 50ms)
  - กรณีสลับไปหมวดหมู่ที่ยังไม่มีการเพิ่มผลงาน ระบบจะแสดงข้อความแจ้งล่วงหน้าอย่างเหมาะสม
- **Self-Development Section (การพัฒนาตนเอง):** จัดแสดงบันทึกเส้นทางการศึกษาเพิ่มเติมโดยแยกเป็น 2 หัวข้อย่อยเคียงข้างกันในสไตล์โมเดิร์นคาร์ด:
  1. 🏆 **Certifications** (เกียรติบัตร / ใบรับรอง)
  2. 🎤 **Workshops & Events** (การเข้าร่วมอบรม / งานสัมมนา)
- **Supabase Integration (เชื่อมฐานข้อมูลคลาวด์):** ดึงข้อมูลต่างๆ มานำเสนอแบบไดนามิกผ่าน REST API
- **Local Fallback (ระบบสแตนด์บายข้อมูล):** มีชุดข้อมูลตัวอย่าง (Mock Data) สำรองทำงานทันทีเมื่อการเชื่อมต่อฐานข้อมูลหลักขัดข้องหรือเกิดข้อผิดพลาด API คีย์ เพื่อให้โครงสร้างเว็บไซต์แสดงผลได้อย่างสวยงามตลอดเวลา
- **Clean Architecture (แยกโค้ดและคอนฟิก):** สคริปต์ JavaScript และตัวแปรระบบความปลอดภัยทั้งหมดถูกจัดเก็บแยกสัดส่วนออกจากไฟล์โครงสร้าง HTML ชัดเจน

---

## 📂 โครงสร้างโฟลเดอร์โครงการ (File Structure)

```text
my-portfolio/
│
├── index.html            # หน้าแสดงผลงานหลัก (Main Portfolio Page)
├── admin.html            # หน้าควบคุมแบบฟอร์มเพื่อบันทึกผลงาน (Admin Panel)
├── README.md             # ไฟล์อธิบายรายละเอียดโครงการนี้
│
└── js/                   # โฟลเดอร์เก็บสคริปต์ JavaScript
    ├── config.js         # จุดตั้งค่าคีย์ API และ URL การเชื่อมต่อฐานข้อมูล
    ├── index.js          # ตรรกะประมวลผลและการเรนเดอร์ข้อมูลของหน้าแรก
    └── admin.js          # ระบบรับส่งข้อมูลฟอร์มจากหน้าแอดมินไปยังฐานข้อมูล
```

---

## ⚙️ วิธีการเริ่มต้นใช้งาน (Setup Instructions)

### 1. กำหนดค่าการเชื่อมต่อฐานข้อมูล (Supabase Configuration)
เปิดไฟล์ [js/config.js](file:computer/my-portfolio/js/config.js) จากนั้นระบุ URL โครงการและ Anon API Key ที่ได้รับจากหน้าเว็บบอร์ดบริการ Supabase:

```javascript
const SUPABASE_URL = "https://your-project-ref.supabase.co";
const SUPABASE_KEY = "your-anon-public-api-key";
```

### 2. โครงสร้างตารางในฐานข้อมูล (Supabase Table Schemas)
เพื่อให้ระบบดึงข้อมูลได้สมบูรณ์ ใน Supabase ของคุณควรจัดทำตารางและเปิดสิทธิ์การเข้าถึงดังนี้:

#### 1) ตาราง `projects` (ตารางผลงาน)
- **คอลัมน์:**
  - `id` (int8 / serial, Primary Key)
  - `title` (text)
  - `role` (text)
  - `type` (text) - เช่น `Production Project`, `Personal Project`
  - `description` (text)
  - `target_audience` (text)
  - `problem_solved` (text)
  - `what_i_learned` (text)
  - `tech_stack` (text) - เช่น `React, Tailwind CSS`
  - `github_url` (text)
  - `is_visible` (boolean)
  - `is_favorite` (boolean)

#### 2) ตาราง `experiences` (ตารางประวัติทำงาน)
- **คอลัมน์:**
  - `id` (int8, Primary Key)
  - `duration` (text) - เช่น `2024 - Present`
  - `role` (text)
  - `company_name` (text)
  - `description` (text)
  - `is_visible` (boolean)

#### 3) ตาราง `activities` (ตารางกิจกรรมการพัฒนาตนเอง)
- **คอลัมน์:**
  - `id` (int8, Primary Key)
  - `title` (text)
  - `role` (text) - ต้องระบุค่าให้ถูกต้องเพื่อจัดหมวดหมู่:
    - หมวดหมู่ **Certifications:** ใช้คำว่า `Certifications` หรือ `Certification`
    - หมวดหมู่ **Workshops & Events:** ใช้คำว่า `Workshops & Events`, `Workshop` หรือ `Event`
  - `description` (text)
  - `image_url` (text, optional)
  - `is_visible` (boolean)

### 3. เปิดนโยบายความปลอดภัยฐานข้อมูล (RLS Policies)
รันสคริปต์นี้ในแท็บ **SQL Editor** ของ Supabase เพื่ออนุญาตให้ทุกคนเข้าถึงการแสดงผลและส่งข้อมูลจากฟอร์มแอดมิน:

```sql
-- อนุญาตสิทธิ์ตาราง projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select" ON public.projects FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public insert" ON public.projects FOR INSERT TO anon WITH CHECK (true);

-- อนุญาตสิทธิ์ตาราง experiences
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select" ON public.experiences FOR SELECT TO anon USING (true);

-- อนุญาตสิทธิ์ตาราง activities
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select" ON public.activities FOR SELECT TO anon USING (true);
```

---

## 🚀 การเปิดแสดงผล (Running Locally)
1. ติดตั้งส่วนขยาย **Live Server** ใน VS Code หรือโปรแกรมเว็บเซิร์ฟเวอร์จำลอง
2. คลิกขวาที่ไฟล์ `index.html` แล้วเลือก **Open with Live Server**
3. เบราว์เซอร์จะเปิดหน้าเว็บพอร์ตโฟลิโอของคุณที่ลิงก์ด่านล่างโดยอัตโนมัติ:
   - หน้าหลัก: `http://localhost:5500/index.html`
   - หน้าบันทึกผลงานแอดมิน: `http://localhost:5500/admin.html`
