# মাহিনের AI নোট (Mahin's AI Note)

> কৃত্রিম বুদ্ধিমত্তা ও মেশিন লার্নিং নিয়ে বাংলায় ব্যক্তিগত ব্লগ সাইট।

---

## 🛠️ টেক স্ট্যাক
- **Next.js (App Router, JavaScript)**
- **Tailwind CSS v4** (স্বয়ংক্রিয় লাইট ও ডার্ক মোড সাপোর্ট)
- **Neon Postgres** (`@neondatabase/serverless`)
- **Auth:** JWT (`jose`), `httpOnly` secure cookie
- **ফন্ট:** Noto Sans Bengali

---

## 🚀 আপনার করণীয় (ধাপে ধাপে গাইড)

প্রজেক্টের পুরো কোডবেস তৈরি ও টেস্ট করা শেষ। নিচে শুধু যে কাজগুলো আপনাকে ব্রাউজার/কনসোলে করতে হবে তা ধারাবাহিকভাবে দেওয়া হলো:

### ১. Neon Postgres ডাটাবেস তৈরি
1. [neon.tech](https://neon.tech) এ গিয়ে একটি ফ্রি অ্যাকাউন্ট খুলুন বা লগইন করুন।
2. একটি নতুন প্রোজেক্ট তৈরি করুন (যেমন: `mahin-ai-note`)।
3. ড্যাশবোর্ড থেকে **Connection String** কপি করুন (এটি দেখতে এমন হবে: `postgresql://username:password@ep-xyz.neon.tech/neondb?sslmode=require`)।

### ২. টেবিলে স্কিমা রান করা
1. Neon কনসোলের বাঁ পাশের মেনু থেকে **SQL Editor** এ যান।
2. প্রজেক্টের `schema.sql` ফাইলের ভেতরের SQL কোডটুকু পেস্ট করে **Run** চাপুন:
   ```sql
   CREATE TABLE IF NOT EXISTS posts (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_posts_created_at_desc ON posts (created_at DESC);
   ```

### ৩. `.env.local` ফাইল কনফিগারেশন
1. `mahin-ai-note` ফোল্ডারে `.env.example` ফাইলটির একটি কপি তৈরি করে নাম দিন `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. `.env.local` ফাইলটি খুলে ৩টি মান বসান:
   - `DATABASE_URL`: ১ নম্বর ধাপে প্রাপ্ত আপনার Neon connection string
   - `ADMIN_PASSWORD`: আপনার পছন্দের অ্যাডমিন পাসওয়ার্ড (লগইন করার জন্য)
   - `JWT_SECRET`: কমপক্ষে ৩২ অক্ষরের একটি শক্তিশালী র‍্যান্ডম সিক্রেট কি (যেমন: `openssl rand -base64 32` দিয়ে তৈরি বা যেকোনো দীর্ঘ স্ট্রিং)

### ৪. লোকাল পরিবেশে চালানো ও পরীক্ষা
`mahin-ai-note` ডিরেক্টরিতে ঢুকে চালান:
```bash
cd mahin-ai-note
npm run dev
```
ব্রাউজারে যান:
- হোমে সব পোস্ট দেখতে: `http://localhost:3000`
- অ্যাডমিন লগইন করতে: `http://localhost:3000/login`
- আপনার নির্ধারিত পাসওয়ার্ড দিয়ে লগইন করে `/admin` থেকে পোস্ট প্রকাশ করুন।
- লগআউট বাটন ও রেসপন্সিভনেস পরীক্ষা করুন।

### ৫. GitHub এ পুশ করা
প্রজেক্টের রুট থেকে গিট কমিট ও পুশ করুন:
```bash
git add .
git commit -m "feat: complete mahin-ai-note blog platform"
git push origin main
```

### ৬. Render এ ডিপ্লয় (Web Service)
1. [render.com](https://render.com) এ লগইন করে **New +** → **Web Service** সিলেক্ট করুন।
2. আপনার GitHub রিপোজিটরি (`Mahin_AI_Note`) কানেক্ট করুন।
3. সেটিংস দিন:
   - **Root Directory:** `mahin-ai-note`
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. **Environment Variables** সেকশনে নিচের ৩টি ভ্যারিয়েবল যোগ করুন:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
5. **Deploy Web Service** এ ক্লিক করুন।

> ℹ️ **নোট:** Render এর ফ্রি প্ল্যানে টানা ১৫ মিনিট কোনো রিকোয়েস্ট না এলে সার্ভিসটি স্লিপ/ঘুমে চলে যায়, ফলে প্রথম লোডে ৩০-৫০ সেকেন্ড সময় লাগতে পারে। আপনি চাইলে একই প্রোজেক্ট কোনো স্লিপ বিলম্ব ছাড়া খুব সহজে **Vercel** এ এক ক্লিকেই ডিপ্লয় করতে পারেন (`vercel.com` এ ইমপোর্ট করে ৩টি env দিলেই চলবে)।
