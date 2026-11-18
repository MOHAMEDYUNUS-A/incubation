# MASTeR Incubation Foundation (MIF) — Digital Ecosystem Platform

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22-darkblue?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest Passed](https://img.shields.io/badge/Vitest-5%20Passed-brightgreen?logo=vitest)](https://vitest.dev/)

An enterprise digital incubation portal developed for **MASTeR Incubation Foundation (MIF)** at **M.A.M. College of Engineering and Technology (MAMCET)**, Siruganur, Trichy, Tamil Nadu. MIF is a **Section 8 company registered under the Companies Act, 2013** and recognised as a **StartupTN Pre-Incubation Centre**.

---

## 🏛️ Verified Institutional Profile

- **Legal Entity**: A Section 8 Company registered under the Companies Act, 2013
- **Recognition**: StartupTN Recognised Pre-Incubation Centre (Govt. of Tamil Nadu)
- **Institution**: M.A.M. College of Engineering and Technology (MAMCET)
- **Location**: Trichy - Chennai Trunk Road, Siruganur, Trichy, Tamil Nadu - 621 105
- **Official Portal**: [https://mamcet.edu.in/](https://mamcet.edu.in/)
- **Incubation Leadership**:
  - **Incubation Manager**: Mr. M. Santhosh Kumar (`+91 9361697702`, `incubationmanager@mamcet.com`)
  - **Incubation Coordinator**: Ms. Hemalatha Balakrishnan (`+91 6381945574`, `hemalathabalakrishnan.ece@mamcet.com`)

---

## ⚙️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Frontend** | React 18, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui components |
| **Animation & Scroll** | GSAP, ScrollTrigger, Lenis smooth scrolling, Framer Motion |
| **Icons** | Lucide React |
| **Database & ORM** | MySQL 8.0+, Prisma ORM |
| **Forms & Validation** | React Hook Form, Zod |
| **Testing** | Vitest, Playwright |
| **Deployment Target** | Hostinger Cloud Enterprise Managed Node.js |

---

## 🚀 Key Modules & Pages

1. **Homepage (`/`)** — 14 sequential, dynamic sections:
   - **Section 01**: Full-screen dynamic hero with cinematic background carousel, masked typography reveals, and instant CTAs.
   - **Section 02**: Foundation Introduction, Section 8 credentials, and Vision & Mission (M1 to M5).
   - **Section 03**: Impact & Institutional Footprint highlights.
   - **Section 04**: 7 Priority Engineering Focus Areas (AI & Data Science, Renewable Energy, Digital Tech, Advanced Manufacturing, IoT & Smart Systems, Sustainable Infrastructure, Other Innovations).
   - **Section 05**: 4-Stage Incubation Pathway & 6 Core Incubation Services.
   - **Section 06**: Startup Portfolio with keyword search and category filtering.
   - **Section 07**: Campus Infrastructure & Hardware Prototyping Labs.
   - **Section 08**: Mentors & Advisory Ecosystem directory.
   - **Section 09**: Events, Workshops, and Interactive Seat Registration dialog.
   - **Section 10**: MASTeR AI Innovation Hub with instant Idea Diagnostic, Readiness Scorecard, and Pitch Structure.
   - **Section 11**: Founder Testimonials and Perspectives.
   - **Section 12**: Statutory & Ecosystem Affiliations (StartupTN, MAMCET, AICTE, IIC, NBA).
   - **Section 13**: High-conversion Application CTA.
   - **Section 14**: Verified Leadership Contacts, Address, and Bulletins subscription.
2. **Dedicated Pages**:
   - `/about`: Detailed governance, Vision, and Mission M1–M5.
   - `/focus-areas`: Full technical subtracks for each of the 7 domains.
   - `/programs`: In-depth breakdown of the 4 incubation stages and deliverables.
   - `/startups`: Filterable showcase of resident cohort ventures.
   - `/facilities`: Lab capacities, equipment specifications, and booking inquiry.
   - `/events`: Calendar of upcoming bootcamps, ideathons, and masterclasses.
   - `/resources`: Downloadable pitch deck templates, TANSEED guide, and patent search guidelines.
   - `/apply`: Complete multi-step incubation intake form with client & server Zod validation.
   - `/contact`: Verified direct phone/email channels and inquiry dispatch.
   - `/admin`: Operations dashboard with application pipeline, status changer, and screening analytics.
3. **Floating AI Assistant (MASTeR AI Copilot)**:
   - Available across the entire website with quick prompt chips, structured eligibility guidance, and zero-latency local diagnostic fallback.

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Test Suite
```bash
npm test
```

### 5. Production Build
```bash
npm run build
```

---

## ☁️ Hostinger Cloud Enterprise Deployment

1. Connect this Git repository in Hostinger hPanel under **Node.js Applications**.
2. Select **Node.js version 20.x or 22.x**.
3. Set **Application Root** to `/` and **Startup File** to:
   ```bash
   node_modules/next/dist/bin/next start
   ```
4. Configure environment variables in hPanel matching `.env.example`:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `DATABASE_URL=mysql://<user>:<password>@<host>:3306/<database>`
   - `NEXTAUTH_SECRET=<your-random-secret>`
5. Run the build step:
   ```bash
   npm install && npx prisma generate && npm run build
   ```
