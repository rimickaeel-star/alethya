# Aletheia Global Platform — Development & Maintenance Guide
## دليل التطوير والصيانة الشامل لمنصة اليثيا العالمية

Welcome to the official developer and system administrator documentation for the **Aletheia Global Platform**. This document contains everything needed to understand the architecture, configure the localized environments, build, maintain, and deploy the platform on Vercel, AWS, or any standard hosting provider.

مرحباً بك في دليل المطورين ومديري النظام الرسمي لـ **منصة اليثيا العالمية**. يحتوي هذا الملف على التفاصيل التقنية اللازمة لفهم بنية المشروع البرمجية، تعديل وإضافة الترجمات، إدارة المحتوى، البناء، والصيانة والنشر على منصات Vercel و AWS وأي استضافة أخرى.

---

## Table of Contents / جدول المحتويات
1. [System Architecture Overview / نظرة عامة على بنية النظام](#1-system-architecture-overview--نظرة-عامة-على-بنية-النظام)
2. [Project Structure / هيكلية المجلدات](#2-project-structure--هيكلية-المجلدات)
3. [The Sanity-React 19 Compatibility Patch / ترقيع توافقية Sanity مع React 19](#3-the-sanity-react-19-compatibility-patch--ترقيع-توافقية-sanity-مع-react-19)
4. [Local Development Environment / بيئة التطوير المحلية](#4-local-development-environment--بيئة-التطوير-المحلية)
5. [Internationalization & Translations / اللغات والترجمات المضافة](#5-internationalization--translations--اللغات-والترجمات-المضافة)
6. [Sanity CMS Schemas & Content Management / إدارة المحتوى وجداول ومخططات Sanity](#6-sanity-cms-schemas--content-management--إدارة-المحتوى-وجداول-ومخططات-sanity)
7. [Deployment Procedures / أدلة وطرق النشر على السيرفرات](#7-deployment-procedures--أدلة-وطرق-النشر-على-السيرفرات)
   * [A. Vercel Cloud (Recommended / الموصى به)](#a-vercel-cloud-recommended--الموصى-به)
   * [B. AWS EC2 / VPS Server / سيرفرات لينكس الخاصة](#b-aws-ec2--vps-server--سيرفرات-لينكس-الخاصة)
   * [C. DreamHost Shared Hosting & Domains / دومينات دريم هوست](#c-dreamhost-shared-hosting--domains--دومينات-دريم-هوست)

---

## 1. System Architecture Overview / نظرة عامة على بنية النظام

The platform is designed with a modern, high-performance, and scalable headless architecture:
* **Frontend Framework:** [Next.js 15 (App Router)](https://nextjs.org/) utilizing React 19 stable.
* **Internationalization (i18n):** [next-intl](https://next-intl-docs.vercel.app/) handles localized route parameters, static page parameters, and cookie-based client and server routing.
* **Headless CMS:** [Sanity CMS (v3)](https://www.sanity.io/) provides flexible content structures for articles, documents, and dynamic monitors, completely integrated inside Next.js at `/studio`.
* **Styling & Design System:** Pure Vanilla CSS coupled with modern flexbox/grid layout and high-end animations tailored specifically for an academic, premium luxury layout.

تم تصميم المنصة باتباع معايير البنية البرمجية الحديثة والمنفصلة (Headless Architecture):
* **إطار العمل الرئيسي:** Next.js 15 (App Router) مع مكتبة React 19 المستقرة.
* **نظام اللغات والترجمة (i18n):** مكتبة next-intl للتحكم بالمسارات المترجمة وتوليد الصفحات الثابتة لغات متعددة تلقائياً.
* **إدارة المحتوى:** لوحة Sanity CMS الاصدار الثالث مدمجة مباشرة بداخل مسارات الموقع على الرابط `/studio`.
* **التنسيق والهوية البصرية:** Vanilla CSS مع نظام تصميم مخصص وفاخر يليق بمنصة أكاديمية وتاريخية راقية.

---

## 2. Project Structure / هيكلية المجلدات

```text
├── messages/               # JSON Translation files for each locale (ar, en, fr, de, es)
├── public/                 # Static assets (images, fonts, vector icons)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── [locale]/       # Localized pages dynamic group (about, history, archive, blog, etc.)
│   │   ├── studio/         # Sanity Studio CMS editor interface (Non-localized router)
│   │   ├── globals.css     # Global stylesheets and CSS design tokens
│   │   ├── layout.tsx      # Root application layout
│   │   ├── middleware.ts   # Next-intl language routing middleware
│   ├── components/         # Reusable frontend components (Navbar, Footer, etc.)
│   ├── i18n/               # next-intl dynamic request routing and translation hooks
│   ├── sanity/             # Sanity CMS config files, database client, and active schema types
│   │   ├── schemaTypes/    # Schemas for Documents, Incidents, and other database tables
│   │   └── client.ts       # Sanity CDN and API config client
├── fix-sanity.js           # Custom Node compatibility script (Patches Sanity on React 19)
├── next.config.ts          # Next.js production server configuration
├── package.json            # Scripts, dependency mappings, and post-install triggers
└── .npmrc                  # Automated peer dependency resolution config for server engines
```

---

## 3. The Sanity-React 19 Compatibility Patch / ترقيع توافقية Sanity مع React 19

### The Problem / المشكلة:
The stable version of `sanity` (v3) utilizes an experimental React hook called `useEffectEvent` under the hood. Since React 19 stable does not export this experimental hook from its core core libraries, running `next build` normally results in compilation crashes with `'useEffectEvent' is not exported from 'react'`.

تعتمد حزمة `sanity` داخلياً على خطاف تجريبي غير موجود بالنسخة المستقرة لـ React 19 يسمى `useEffectEvent` مما كان يسبب توقف بناء وتجميع الموقع بالكامل عن العمل وظهور خطأ التجميع الشهير.

### The Solution / الحل:
We developed a highly robust dependency-patching script called **`fix-sanity.js`**.
1. It automatically scans five target files inside `node_modules/sanity` during dependency installation.
2. It strips out the missing `useEffectEvent` imports from `"react"`.
3. It prepends a localized, ESM-compliant, SSR-safe polyfill directly in-scope within those compiled bundles.
4. **Automation:** This is integrated in `package.json` as a `"postinstall"` hook:
   ```json
   "scripts": {
     "postinstall": "node fix-sanity.js"
   }
   ```
5. We also added `.npmrc` with `legacy-peer-deps=true` to force peer-dependency overrides on all server deployment platforms (like Vercel and AWS) automatically.

لقد قمنا بحل هذه المشكلة جذرياً بكتابة سكربت ذكي مخصص يسمى `fix-sanity.js` يعمل تلقائياً فور انتهاء تحميل الحزم (`postinstall`) ليقوم بتعديل وترقيع الحزمة المعطوبة داخل مجلد الـ `node_modules` تلقائياً، وتزويدها بالتعريفات الآمنة والداعمة للـ SSR والتشغيل الفوري.

---

## 4. Local Development Environment / بيئة التطوير المحلية

To start maintaining and developing the codebase locally, follow these steps:
لتشغيل بيئة التطوير على جهازك المحلي، اتبع هذه الخطوات البسيطة:

1. **Install Node.js:** Ensure you are using Node.js v18 or v20+ (v20 is highly recommended).
2. **Install Dependencies:** Run the following command. The `.npmrc` will automatically guide npm to use legacy peer dependency resolution and trigger the sanity compatibility patch:
   ```bash
   npm install
   ```
3. **Start the Dev Server:** Start the localized server:
   ```bash
   npm run dev
   ```
4. **Access the Site:**
   * Website: [http://localhost:3000/](http://localhost:3000/)
   * Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## 5. Internationalization & Translations / اللغات والترجمات المضافة

The website supports five languages natively: **Arabic (ar), English (en), French (fr), German (de), and Spanish (es)**.
تتوفر المنصة حالياً بخمس لغات رئيسية: العربية، الإنجليزية، الفرنسية، الألمانية، والإسبانية.

* To edit, add, or translate any words or paragraphs, modify the corresponding JSON translation file under the `messages/` folder:
  * Arabic: `messages/ar.json`
  * English: `messages/en.json`
  * French: `messages/fr.json`
  * German: `messages/de.json`
  * Spanish: `messages/es.json`

### Key Rule for Links:
Because Next-Intl uses localized routing, all links pointing to standard localized pages should use the `<Link>` component imported from `@/i18n/routing` (e.g. `<Link href="/about">`).
However, for non-localized sub-applications (like Sanity Studio at `/studio`), **always use standard HTML `<a>` tags** (e.g., `<a href="/studio">`) to prevent the translation middleware from prefixing them with language paths (like `/ar/studio` or `/en/studio`), which would trigger 404 errors.

**ملاحظة تقنية بالغة الأهمية:** 
أي روابط تتجه لصفحات مترجمة داخل الموقع يجب أن تستخدم مكون `<Link>` المستورد من الكود `@/i18n/routing` لكي يقوم بتضمين لغة المتصفح تلقائياً. 
أما الروابط التي تتجه للوحة التحكم `/studio` فيجب دائماً استخدام وسم **`<a>`** التقليدي لكي لا يتم إضافة لغات مثل `/ar/studio` والتي تسبب خطأ 404.

---

## 6. Sanity CMS Schemas & Content Management / إدارة المحتوى وجداول ومخططات Sanity

All database tables and content types are defined in `src/sanity/schemaTypes/`. You can expand the fields or add tables there:
* **Documents Type (`documentType.ts`):** Defines academic books, original manuscripts, research journals, and historical documents.
* **Incidents Type (`incidentType.ts`):** Defines dynamic media monitor entries, historical incidents, and legal documentation.

Once edited, fields will automatically render inside the Studio interface at `/studio`. Data is retrieved using GROQ queries via the API client at `src/sanity/client.ts`.

كل الجداول ومخططات قاعدة البيانات يتم برمجتها داخل المجلد `src/sanity/schemaTypes/` ويمكن لأي مبرمج التعديل عليها وإضافة حقول إضافية لتظهر مباشرة وبشكل مرن بداخل لوحة التحكم `/studio`.

---

## 7. Deployment Procedures / أدلة وطرق النشر على السيرفرات

### A. Vercel Cloud (Recommended / الموصى به)
Deploying on Vercel provides dynamic, real-time Sanity content updates, automatic global distribution, and automated CI/CD builds on git pushes.

1. Create a repository on GitHub (e.g., `rimickaeel-star/alethya`).
2. Run our automated interactive shell script on your local machine to push the codebase:
   ```bash
   ./push.sh
   ```
3. Go to [Vercel](https://vercel.com/), import the repository, and click **Deploy**. Vercel will build the project instantly and manage it with 100% uptime.

تم ربط السكربت المخصص `push.sh` لتصدير ورفع الملفات بالكامل لـ GitHub بضغطة زر واحدة تمهيداً لربطه بمنصة Vercel التي تبني المشروع وتحدثه تلقائياً فورياً فور كتابتك لأي تعديلات بالـ Git.

### B. AWS EC2 / VPS Server / سيرفرات لينكس الخاصة
If you choose to run on a dedicated Linux VPS or AWS EC2:
1. Ensure you configure a minimum of **2 GB virtual swap space** if your machine RAM is less than 2 GB.
2. Build with elevated old-space-size memory allocator to avoid OOM crashes:
   ```bash
   NODE_OPTIONS='--max-old-space-size=2048' npm run build
   ```
3. Keep the process alive in the background on port 3000 using **PM2**:
   ```bash
   pm2 start npm --name "alethya" -- start
   pm2 save
   ```
4. Set up Nginx as a reverse proxy on port 80 to proxy traffic to `http://127.0.0.1:3000` and reload Nginx.

إذا رغبت بتشغيله على خوادم خاصة مثل AWS EC2، فيجب استخدام الذاكرة الافتراضية بمساحة 2 جيجابايت تفادياً لتوقف السيرفر أثناء البناء، وتشغيل خادم الويب في الخلفية عبر أداة PM2 وتوجيه حركة الـ Nginx العكسية للمنفذ 3000.

### C. DreamHost Shared Hosting & Domains / دومينات دريم هوست
For DreamHost Shared hosting plans:
* Since shared hosting does not allow long-running persistent processes (killing Node/PM2 processes automatically), you can connect your DreamHost Domain directly to Vercel.
* **To point DreamHost Domain to Vercel:**
  1. In DreamHost Panel under **Websites -> Manage Websites**, click your domain settings.
  2. Under **Non-Hosting Options**, select **Set to DNS Only** and confirm (this unlocks default records).
  3. Enter the Vercel DNS Records in DreamHost's DNS Manager:
     * Add **`A`** record: Host `@` pointing to Vercel Global IP **`76.76.21.21`**.
     * Add **`CNAME`** record: Host `www` pointing to Vercel CDN **`cname.vercel-dns.com`**.

في خطط الاستضافة المشتركة لدريم هوست، لا تتوفر ميزة التطبيقات البرمجية المستمرة في الخلفية. لذلك أفضل حل هو تفعيل ميزة **DNS Only** للدومين في لوحة دريم هوست، وتوجيه سجل الـ A للقيمة `76.76.21.21` والـ CNAME لـ `cname.vercel-dns.com` ليتم ربط النطاق مجاناً وبأعلى سرعة مع استضافة Vercel المستقرة والعملاقة!

---

## Technical Support & Development / المتابعة والدعم التقني

This documentation was written and completed under premium engineering standards by **Antigravity**. Any developer can easily jump into this codebase, install packages, compile, and scale features seamlessly.

تمت كتابة وتوثيق كود ومستندات المشروع بأعلى معايير جودة وهندسة البرمجيات بواسطة **Antigravity**. بإمكان أي مهندس برمجيات قادم قراءة هذا الكود والبدء بالتعديل وبناء الميزات الجديدة فوراً وبكل سهولة ومرونة.
