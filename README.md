# Inovice-Generator
# ⚡ Invoice Generator
> **Live Demo:** [https://inovice-generator-alpha.vercel.app](https://inovice-generator-alpha.vercel.app)

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
- - 🌐 *Live Deployment* — Hosted on Vercel for instant access
---
## 🚀 Getting Started
## 🚀 How to Run Locally
1. **Clone the repository:**
   `git clone https://github.com/Bhimavarapu-Bhavana/Inovice-Generator.git`
2. **Install dependencies:**
   `npm install`
3. **Run dev server:**
   `npm run dev`
   *Open [http://localhost:5173](http://localhost:5173) in your browser.*

## 🌐 Live Access
You can use the live version of this tool here: [Invoice Generator](https://inovice-generator-alpha.vercel.app)
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
