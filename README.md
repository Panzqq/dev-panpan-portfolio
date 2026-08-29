# ⚡ DEV_PANPAN // 3D CYBER-NEOBRUTALIST PORTFOLIO & TERMINAL 🚀

A cutting-edge, high-voltage **Cyber-Neobrutalist Developer Portfolio** featuring an **Interactive 3D Robot (Three.js / React Three Fiber)**, a **Real-Time Interactive CLI Terminal**, a **Cyberpunk 3D Preloader**, and a **Custom Animated Cursor**.

Built with **Next.js 14 (App Router)**, **React 18**, **Three.js / @react-three/fiber / @react-three/drei**, **Tailwind CSS**, and **Framer Motion**.

---

## 🌟 Highlights & Features

### 🤖 1. Interactive 3D Cyber Robot (`components/Hero3D.tsx`)
- **Procedural Cyber Mech Model**: Built with Three.js primitives & glowing emissive materials (Cyan, Neon Pink, Acid Lime).
- **Mouse Tracking**: Robot head & chassis smoothly orient towards the visitor's cursor using interpolation (`lerp`).
- **Organic Hover & Breathing**: Idle floating, pulsing energy reactor core, and rotating cyber energy rings.
- **Orbiting Tech Stack Badges**: Floating 3D HTML badges (JavaScript, Node.js, React, Next.js, TypeScript) orbiting around the robot at different radii.
- **Mobile & Performance Optimized**: `dpr={[1, 1.5]}`, low-overhead lighting, hardware-accelerated shaders, and responsive canvas scaling.

### ⏳ 2. 3D Cyber Preloader Screen (`components/Preloader.tsx`)
- High-tech loading screen with simulated WebGL shader compilation progress (`0% -> 100%`).
- Smooth exit reveal transition powered by Framer Motion.

### 🎯 3. Custom Animated Cursor (`components/CustomCursor.tsx`)
- Spring-physics glowing follower ring with neon cyan/yellow hover expansion.
- Automatically disabled on touch screens / mobile devices for zero interference.

### 💻 4. Interactive CLI Terminal (`components/Terminal.tsx`)
- **CLI Shell**: Real interactive shell with executable commands (`help`, `neofetch`, `skills`, `projects`, `stats`, `matrix`, `about`, `contact`, `sudo`, `clear`).
- **Neofetch View**: Hardware specs, OS telemetry, and dev vitals.
- **Matrix Rain View**: Live 60FPS HTML5 digital rain canvas animation.
- **Quick Execute Chips**: Fast 1-click execution chips for desktop and mobile.

### 🎨 5. Neobrutalism Design System
- Hard drop shadows (`4px 4px #000`, `6px 6px #000`, neon glows).
- Tactile physical button clicks (`btn-brutal`).
- Caution ticker banners and dual-direction tech marquee tapes.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 14** (App Router) |
| 3D Engine | **Three.js**, **@react-three/fiber**, **@react-three/drei** |
| Language | **TypeScript 5** (Strict Mode) |
| Styling | **Tailwind CSS v3** (Custom Neobrutal Tokens) |
| Animations | **Framer Motion v11** + HTML5 Canvas |
| Icons | **Lucide React** |
| Fonts | **Inter** (Google Fonts) + Monospace |
| Deployment | **Vercel** (1-Click Ready) |

---

## 🚀 Quick Start (Local Run)

```bash
# 1. Masuk ke direktori
cd dev-panpan-portfolio

# 2. Install dependencies (termasuk three.js & R3F)
npm install

# 3. Jalankan development server
npm run dev
```

Buka **http://localhost:3000** di browser Anda.

---

## 🌐 Deploy to Vercel

1. Buka [Vercel](https://vercel.com/new) dan import repository **`Panzqq/dev-panpan-portfolio`**.
2. Klik **Deploy** — selesai dalam ~1 menit! 🎉

---

Made with ☕ and 🔥 by **Dev panpan**
