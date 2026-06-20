import React, { forwardRef } from 'react'
/**
 * Calculate totals from form data
 */
export function calcTotals(form) {
  const subtotal = form.items.reduce((sum, item) => {
    const qty   = parseFloat(item.quantity) || 0
    const price = parseFloat(item.price)    || 0
    return sum + qty * price
  }, 0)
  const discountRate  = parseFloat(form.discount) || 0
  const taxRate       = parseFloat(form.taxRate)  || 0
  const discountAmt   = subtotal * (discountRate / 100)
  const afterDiscount = subtotal - discountAmt
  const taxAmt        = afterDiscount * (taxRate / 100)
  const total         = afterDiscount + taxAmt
  return { subtotal, discountAmt, taxAmt, total }
}
/**
 * Format a number as currency string
 */
export function fmt(n, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.length === 3 ? currency : 'USD',
  }).format(n)
}
/**
 * Status badge colours
 */
function StatusBadge({ status = 'UNPAID' }) {
  const map = {
    PAID:    { bg: '#d1fae5', color: '#065f46', label: 'PAID' },
    UNPAID:  { bg: '#fee2e2', color: '#991b1b', label: 'UNPAID' },
    PENDING: { bg: '#fef3c7', color: '#92400e', label: 'PENDING' },
  }
  const s = map[status] || map.UNPAID
  return (
    <span
      style={{ background: s.bg, color: s.color }}
      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
    >
      {s.label}
    </span>
  )
}
/**
 * InvoicePreview – printable invoice document
 * Uses forwardRef so react-to-print can target it
 */
const InvoicePreview = forwardRef(function InvoicePreview({ form }, ref) {
  const currency    = (form.currency || 'USD').trim()
  const { subtotal, discountAmt, taxAmt, total } = calcTotals(form)
  const currFmt = (n) => fmt(n, currency)
  const formatDate = (d) => {
    if (!d) return '—'
    try { return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
    catch { return d }
  }
  return (
    <div
      ref={ref}
      id="invoice-preview"
      className="bg-white rounded-3xl shadow-2xl overflow-hidden fade-up"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Hero Header ── */}
      <div className="relative bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 px-10 pt-10 pb-16 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                              radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          {/* Left: Business info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-black">
                {(form.fromName || 'B').charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  {form.fromName || 'Your Business'}
                </h1>
                {form.fromEmail && (
                  <p className="text-brand-200 text-sm mt-0.5">{form.fromEmail}</p>
                )}
              </div>
            </div>
            {form.fromAddress && (
              <p className="text-brand-100 text-sm">{form.fromAddress}</p>
            )}
          </div>
          {/* Right: INVOICE badge */}
          <div className="text-right">
            <div className="inline-block bg-white/15 border border-white/25 rounded-2xl px-6 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-200 mb-1">
                Invoice
              </p>
              <p className="text-3xl font-black text-white">
                #{form.invoiceNumber || '001'}
              </p>
            </div>
            <div className="mt-3 space-y-1 text-sm text-brand-100">
              <div className="flex gap-2 justify-end">
                <span className="font-medium text-brand-200">Date:</span>
                <span>{formatDate(form.invoiceDate)}</span>
              </div>
              {form.dueDate && (
                <div className="flex gap-2 justify-end">
                  <span className="font-medium text-brand-200">Due:</span>
                  <span>{formatDate(form.dueDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ── Bill To / Status ── */}
      <div className="px-10 -mt-6 relative z-10">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              Bill To
            </p>
            <h2 className="text-lg font-bold text-gray-800">
              {form.clientName || 'Client Name'}
            </h2>
            {form.clientEmail && (
              <p className="text-sm text-gray-500 mt-0.5">{form.clientEmail}</p>
            )}
            {form.clientAddress && (
              <p className="text-sm text-gray-400 mt-0.5">{form.clientAddress}</p>
            )}
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <StatusBadge status="UNPAID" />
            <p className="text-2xl font-black text-brand-600">
              {currFmt(total)}
            </p>
            <p className="text-xs text-gray-400">Total Due</p>
          </div>
        </div>
      </div>
      {/* ── Line Items Table ── */}
      <div className="px-10 mt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest pb-3 border-b-2 border-gray-100 w-1/2">
                Description
              </th>
              <th className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest pb-3 border-b-2 border-gray-100 w-1/6">
                Qty
              </th>
              <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-widest pb-3 border-b-2 border-gray-100 w-1/6">
                Unit Price
              </th>
              <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-widest pb-3 border-b-2 border-gray-100 w-1/6">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {form.items.filter((i) => i.description || i.quantity || i.price).length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-300 text-sm italic">
                  No items added yet
                </td>
              </tr>
            ) : (
              form.items
                .filter((i) => i.description || i.quantity || i.price)
                .map((item, i) => {
                  const qty   = parseFloat(item.quantity) || 0
                  const price = parseFloat(item.price)    || 0
                  const amt   = qty * price
                  return (
                    <tr
                      key={i}
                      className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-gray-50/40' : 'bg-white'}`}
                    >
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-gray-800 text-sm">
                          {item.description || '—'}
                        </p>
                      </td>
                      <td className="py-4 text-center text-gray-600 text-sm font-medium">
                        {qty}
                      </td>
                      <td className="py-4 text-right text-gray-600 text-sm font-medium">
                        {currFmt(price)}
                      </td>
                      <td className="py-4 text-right font-bold text-gray-800 text-sm">
                        {currFmt(amt)}
                      </td>
                    </tr>
                  )
                })
            )}
          </tbody>
        </table>
      </div>
      {/* ── Totals ── */}
      <div className="px-10 mt-6 flex justify-end">
        <div className="w-full sm:w-72 space-y-2">
          {/* Subtotal */}
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold">{currFmt(subtotal)}</span>
          </div>
          {/* Discount */}
          {parseFloat(form.discount) > 0 && (
            <div className="flex justify-between text-sm text-emerald-600">
              <span>Discount ({form.discount}%)</span>
              <span className="font-semibold">− {currFmt(discountAmt)}</span>
            </div>
          )}
          {/* Tax */}
          {parseFloat(form.taxRate) > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax ({form.taxRate}%)</span>
              <span className="font-semibold">{currFmt(taxAmt)}</span>
            </div>
          )}
          {/* Divider */}
          <div className="border-t-2 border-brand-100 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="font-black text-gray-800 text-base">Total Due</span>
              <span className="font-black text-brand-600 text-2xl">
                {currFmt(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ── Notes ── */}
      {form.notes && (
        <div className="px-10 mt-8">
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5">
            <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">
              Notes & Terms
            </p>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {form.notes}
            </p>
          </div>
        </div>
      )}
      {/* ── Footer Bar ── */}
      <div className="px-10 mt-10 mb-10">
        <div className="bg-gradient-to-r from-gray-50 to-brand-50 border border-gray-100 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-400 text-center sm:text-left">
            <span className="font-semibold text-gray-500">Thank you for your business!</span>
            <br />
            Please make payment by the due date shown above.
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-100 flex items-center justify-center">
              <span className="text-brand-600 text-xs font-black">⚡</span>
            </div>
            <p className="text-xs font-semibold text-brand-500">
              Powered by Invoice Generator
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})
export default InvoicePreview
