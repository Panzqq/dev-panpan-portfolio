# Dev panpan — Portfolio Website 🚀

A modern, minimal, and futuristic developer portfolio built with **Next.js 14 App Router**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features

- 🌑 **Dark mode** by default with cyan × purple gradient accents
- 🪟 **Glassmorphism** navbar and cards with backdrop blur
- 🎭 **Framer Motion** animations — staggered hero reveal, scroll-triggered sections, hover effects
- ⌨️ **Typewriter** role cycling in the Hero section
- 🌊 **Infinite marquee** for the tech stack
- 📊 **Animated skill bars** that fill on scroll
- 📬 **Contact form** with send state feedback
- 📱 **Fully responsive** — mobile-first
- ⚡ **Vercel-ready** — 1-click deploy

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| Icons | Lucide React |
| Font | Inter (Google Fonts) |
| Deploy | Vercel |

## 🚀 Quick Start

```bash
# 1. Clone or download the project
cd dev-panpan-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
dev-panpan-portfolio/
├── app/
│   ├── layout.tsx        # Root layout + metadata + fonts
│   ├── page.tsx          # Main page (assembles all sections)
│   └── globals.css       # Global styles + utility classes
├── components/
│   ├── Navbar.tsx        # Sticky glassmorphism navbar
│   ├── Hero.tsx          # Hero section + typewriter
│   ├── About.tsx         # About me section
│   ├── Skills.tsx        # Skills + infinite marquee + skill bars
│   ├── Projects.tsx      # Project cards grid
│   └── Contact.tsx       # Contact form + social links + footer
├── package.json
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── vercel.json           # Vercel deployment config
└── .gitignore
```

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub → Vercel (Recommended)
1. Push to GitHub: `git push origin main`
2. Go to [vercel.com](https://vercel.com) → **Import Project**
3. Select your repo → **Deploy** ✅

## 🎨 Customization

| What to change | Where |
|---------------|-------|
| Your name & taglines | `components/Hero.tsx` |
| About me text | `components/About.tsx` |
| Skills & levels | `components/Skills.tsx` |
| Projects | `components/Projects.tsx` |
| Social links & email | `components/Contact.tsx` |
| Colors & animations | `app/globals.css`, `tailwind.config.ts` |

---

Made with ❤️ by **Dev panpan**
