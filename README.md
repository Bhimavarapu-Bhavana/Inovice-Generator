# Inovice-Generator
# ⚡ Invoice Generator
A professional, responsive, and print-ready Invoice Generator built with **React + Vite + Tailwind CSS**. Ready for one-click Vercel deployment.
---
## ✨ Features
- 📝 **Dynamic invoice form** — Invoice number, date, due date, currency
- 🏢 **From / To sections** — Business and client details
- ➕ **Multi-line items** — Add/remove rows with auto-calculated totals
- 💰 **Auto-calculations** — Subtotal, tax %, discount %, and grand total
- 🖨️ **Print / Save PDF** — Native browser print with clean print styles
- 📱 **Fully responsive** — Mobile-first layout
- 🎨 **Premium dark UI** — Glassmorphism, animated gradient orbs, micro-animations
- 🦸 **Digital Heroes link** — [Built for Digital Heroes](https://digitalheroesco.com)
---
## 🚀 Getting Started
### 1. Install dependencies
```bash
npm install
```
### 2. Run dev server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
### 3. Build for production
```bash
npm run build
```
---
## 🌐 Deploy to Vercel
### Option A — Vercel CLI
```bash
npx vercel
```
### Option B — GitHub Import
1. Push this folder to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Framework: **Vite** (auto-detected)
5. Click **Deploy** 🚀
The `vercel.json` SPA rewrite rule is already included.
---
## 📁 Project Structure
```
invoice-generator/
├── public/
│   └── invoice-icon.svg      # SVG favicon
├── src/
│   ├── components/
│   │   ├── Icons.jsx          # Inline SVG icons
│   │   ├── InvoiceForm.jsx    # Input form
│   │   ├── InvoicePreview.jsx # Printable invoice document
│   │   └── UI.jsx             # Shared UI primitives
│   ├── App.jsx                # Main app shell
│   ├── index.css              # Global styles + print styles
│   └── main.jsx               # React entry point
├── index.html                 # HTML shell with SEO meta tags
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json                # SPA routing for Vercel
```
---
## 👤 Credits
Developed by **Bhimavarapu Bhavana**  
📧 bhimavarapubhavana513@gmail.com
Built for [Digital Heroes](https://digitalheroesco.com) 