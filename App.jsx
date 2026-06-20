import React, { useState, useRef } from 'react'
import InvoiceForm from './components/InvoiceForm'
import InvoicePreview, { calcTotals, fmt } from './components/InvoicePreview'
import { PrinterIcon, ArrowLeftIcon, CheckCircleIcon } from './components/Icons'
/* ─── Default form state ─────────────────────────────────────────── */
const DEFAULT_FORM = {
  invoiceNumber : 'INV-001',
  invoiceDate   : new Date().toISOString().split('T')[0],
  dueDate       : '',
  currency      : 'USD',
  fromName      : '',
  fromEmail     : '',
  fromAddress   : '',
  clientName    : '',
  clientEmail   : '',
  clientAddress : '',
  items         : [{ description: '', quantity: '', price: '' }],
  taxRate       : '',
  discount      : '',
  notes         : '',
}
/* ─── Toast notification ─────────────────────────────────────────── */
function Toast({ message, show }) {
  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-500 text-white 
                  px-5 py-3.5 rounded-2xl shadow-2xl font-semibold text-sm transition-all duration-500
                  ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
    >
      <CheckCircleIcon className="w-5 h-5" />
      {message}
    </div>
  )
}
/* ─── App ────────────────────────────────────────────────────────── */
export default function App() {
  const [form, setForm]           = useState(DEFAULT_FORM)
  const [showPreview, setShowPreview] = useState(false)
  const [toast, setToast]         = useState({ show: false, message: '' })
  const printRef                  = useRef(null)
  /* Show a brief toast */
  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }
  /* Validate before generating */
  const handleGenerate = () => {
    if (!form.invoiceNumber.trim()) return showToast('Please enter an invoice number.')
    if (!form.clientName.trim())   return showToast('Please enter a client name.')
    const hasItems = form.items.some(
      (i) => i.description.trim() || parseFloat(i.price) > 0
    )
    if (!hasItems) return showToast('Please add at least one line item.')
    setShowPreview(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  /* Native browser print */
  const handlePrint = () => {
    window.print()
    showToast('Print dialog opened!')
  }
  /* Reset everything */
  const handleReset = () => {
    setForm({
      ...DEFAULT_FORM,
      invoiceDate: new Date().toISOString().split('T')[0],
      items      : [{ description: '', quantity: '', price: '' }],
    })
    setShowPreview(false)
  }
  const { total } = calcTotals(form)
  const currFmt   = (n) => fmt(n, form.currency || 'USD')
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 relative">
      {/* ── Animated background orbs ── */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      {/* ── Toast ── */}
      <Toast show={toast.show} message={toast.message} />
      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ══ HEADER ══════════════════════════════════════════════ */}
        <header className="no-print glass border-b border-white/10 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-black">⚡</span>
              </div>
              <div>
                <h1 className="text-lg font-black text-white leading-tight tracking-tight">
                  Invoice Generator
                </h1>
                <p className="text-brand-300 text-xs font-medium hidden sm:block">
                  Professional invoices, instantly
                </p>
              </div>
            </div>
            {/* Right side */}
            <div className="flex items-center gap-3">
              {showPreview && (
                <>
                  {/* Total chip */}
                  <div className="hidden sm:flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                    <span className="text-brand-300 text-xs font-semibold uppercase tracking-wider">Total</span>
                    <span className="text-white font-black text-lg">{currFmt(total)}</span>
                  </div>
                  {/* Print */}
                  <button
                    id="print-invoice-btn"
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white text-brand-600 font-bold text-sm 
                               rounded-xl hover:bg-brand-50 transition-all duration-200 active:scale-95 shadow-lg"
                  >
                    <PrinterIcon />
                    <span className="hidden sm:inline">Print / Save PDF</span>
                  </button>
                  {/* Back */}
                  <button
                    id="back-to-form-btn"
                    onClick={() => setShowPreview(false)}
                    className="flex items-center gap-2 px-4 py-2.5 glass border border-white/20 text-white 
                               font-semibold text-sm rounded-xl hover:bg-white/10 transition-all duration-200 active:scale-95"
                  >
                    <ArrowLeftIcon />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                </>
              )}
              {!showPreview && (
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white text-xs font-medium">Ready</span>
                </div>
              )}
            </div>
          </div>
        </header>
        {/* ══ HERO STRIP ══════════════════════════════════════════ */}
        {!showPreview && (
          <div className="no-print py-10 px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 
                            text-brand-300 text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
              <span>✦</span> Free Professional Invoice Tool
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Create Beautiful{' '}
              <span className="text-gradient">Invoices</span>
            </h2>
            <p className="mt-3 text-brand-200 text-base max-w-xl mx-auto">
              Fill in the details, add your line items, and generate a print-ready invoice in seconds.
            </p>
          </div>
        )}
        {/* ══ CONTENT ═════════════════════════════════════════════ */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
          {showPreview ? (
            /* ── Preview mode ── */
            <div className="max-w-4xl mx-auto pt-6">
              {/* Action bar */}
              <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-brand-200 text-sm font-medium">Invoice preview ready</span>
                </div>
                <div className="flex gap-3">
                  <button
                    id="print-invoice-btn-2"
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 
                               text-white font-bold text-sm rounded-xl btn-glow hover:from-brand-700 hover:to-brand-600 
                               transition-all duration-200 active:scale-95"
                  >
                    <PrinterIcon />
                    Print / Save PDF
                  </button>
                  <button
                    id="back-to-edit-btn"
                    onClick={() => setShowPreview(false)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 
                               text-white font-semibold text-sm rounded-xl hover:bg-white/15 
                               transition-all duration-200 active:scale-95"
                  >
                    <ArrowLeftIcon />
                    Edit
                  </button>
                </div>
              </div>
              {/* Invoice document */}
              <InvoicePreview ref={printRef} form={form} />
              {/* Digital Heroes link */}
              <div className="no-print mt-8 flex justify-center">
                <a
                  id="digital-heroes-link"
                  href="https://digitalheroesco.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r 
                             from-brand-600 to-indigo-600 text-white font-bold text-sm rounded-2xl 
                             btn-glow hover:from-brand-700 hover:to-indigo-700 transition-all duration-300 
                             active:scale-95 uppercase tracking-widest shadow-xl"
                >
                  <span className="text-lg group-hover:animate-bounce">🦸</span>
                  Built for Digital Heroes
                  <span className="text-brand-200 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </a>
              </div>
            </div>
          ) : (
            /* ── Form mode ── */
            <div className="max-w-6xl mx-auto">
              <InvoiceForm
                form={form}
                setForm={setForm}
                onGenerate={handleGenerate}
                onReset={handleReset}
              />
              {/* Digital Heroes link (always visible) */}
              <div className="mt-8 flex justify-center">
                <a
                  id="digital-heroes-link-form"
                  href="https://digitalheroesco.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r 
                             from-brand-600 to-indigo-600 text-white font-bold text-sm rounded-2xl 
                             btn-glow hover:from-brand-700 hover:to-indigo-700 transition-all duration-300 
                             active:scale-95 uppercase tracking-widest shadow-xl"
                >
                  <span className="text-lg group-hover:animate-bounce">🦸</span>
                  Built for Digital Heroes
                  <span className="text-brand-200 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </a>
              </div>
            </div>
          )}
        </main>
        {/* ══ FOOTER ══════════════════════════════════════════════ */}
        <footer className="no-print glass border-t border-white/10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <p className="text-brand-200 text-sm font-medium">
                Developed by{' '}
                <span className="font-bold text-white">Bhimavarapu Bhavana</span>
                {' '}|{' '}
                <a
                  href="mailto:bhimavarapubhavana513@gmail.com"
                  className="text-brand-300 hover:text-white underline underline-offset-2 transition-colors duration-150"
                >
                  bhimavarapubhavana513@gmail.com
                </a>
              </p>
              <div className="flex items-center gap-2 text-brand-400 text-xs">
                <span>⚡</span>
                <span>Invoice Generator · {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
