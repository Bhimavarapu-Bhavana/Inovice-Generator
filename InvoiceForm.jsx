import React from 'react'
import { InputField, SectionHeader } from './UI'
import {
  DocumentTextIcon,
  CalendarIcon,
  UserIcon,
  PlusIcon,
  TrashIcon,
  TagIcon,
} from './Icon'
const DEFAULT_ITEM = { description: '', quantity: '', price: '' }
/**
 * InvoiceForm – the left-panel input form
 */
export default function InvoiceForm({ form, setForm, onGenerate, onReset }) {
  /* ── helpers ── */
  const updateField = (key, value) =>
    setForm((f) => ({ ...f, [key]: value }))
  const updateItem = (index, key, value) => {
    const items = [...form.items]
    items[index] = { ...items[index], [key]: value }
    setForm((f) => ({ ...f, items }))
  }
  const addItem = () =>
    setForm((f) => ({ ...f, items: [...f.items, { ...DEFAULT_ITEM }] }))
  const removeItem = (index) =>
    setForm((f) => ({
      ...f,
      items: f.items.filter((_, i) => i !== index),
    }))
  /* ── render ── */
  return (
    <div className="flex flex-col gap-6">
      {/* ── Invoice Details ── */}
      <div className="card-section">
        <SectionHeader>Invoice Details</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Invoice Number"
            id="invoiceNumber"
            icon={<DocumentTextIcon />}
            placeholder="INV-001"
            value={form.invoiceNumber}
            onChange={(e) => updateField('invoiceNumber', e.target.value)}
            required
          />
          <InputField
            label="Invoice Date"
            id="invoiceDate"
            icon={<CalendarIcon />}
            type="date"
            value={form.invoiceDate}
            onChange={(e) => updateField('invoiceDate', e.target.value)}
            required
          />
          <InputField
            label="Due Date"
            id="dueDate"
            icon={<CalendarIcon />}
            type="date"
            value={form.dueDate}
            onChange={(e) => updateField('dueDate', e.target.value)}
          />
          <InputField
            label="Currency"
            id="currency"
            icon={<span className="text-sm font-bold">$</span>}
            placeholder="USD"
            value={form.currency}
            onChange={(e) => updateField('currency', e.target.value.toUpperCase())}
          />
        </div>
      </div>
      {/* ── From / To ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* From */}
        <div className="card-section">
          <SectionHeader>From (Your Business)</SectionHeader>
          <div className="flex flex-col gap-3">
            <InputField
              label="Business Name"
              id="fromName"
              icon={<UserIcon />}
              placeholder="Your Company"
              value={form.fromName}
              onChange={(e) => updateField('fromName', e.target.value)}
            />
            <InputField
              label="Email"
              id="fromEmail"
              placeholder="you@company.com"
              type="email"
              value={form.fromEmail}
              onChange={(e) => updateField('fromEmail', e.target.value)}
            />
            <InputField
              label="Address"
              id="fromAddress"
              placeholder="123 Main St, City"
              value={form.fromAddress}
              onChange={(e) => updateField('fromAddress', e.target.value)}
            />
          </div>
        </div>
        {/* To */}
        <div className="card-section">
          <SectionHeader>Bill To (Client)</SectionHeader>
          <div className="flex flex-col gap-3">
            <InputField
              label="Client Name"
              id="clientName"
              icon={<UserIcon />}
              placeholder="Client Company"
              value={form.clientName}
              onChange={(e) => updateField('clientName', e.target.value)}
              required
            />
            <InputField
              label="Client Email"
              id="clientEmail"
              placeholder="client@company.com"
              type="email"
              value={form.clientEmail}
              onChange={(e) => updateField('clientEmail', e.target.value)}
            />
            <InputField
              label="Client Address"
              id="clientAddress"
              placeholder="456 Oak Ave, City"
              value={form.clientAddress}
              onChange={(e) => updateField('clientAddress', e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* ── Line Items ── */}
      <div className="card-section">
        <SectionHeader>Line Items</SectionHeader>
        {/* Column headers */}
        <div className="hidden sm:grid grid-cols-12 gap-2 mb-2 px-1">
          <span className="col-span-6 label-text">Description</span>
          <span className="col-span-2 label-text text-center">Qty</span>
          <span className="col-span-3 label-text text-center">Price</span>
          <span className="col-span-1" />
        </div>
        <div className="flex flex-col gap-3">
          {form.items.map((item, index) => (
            <div
              key={index}
              className="item-row-enter grid grid-cols-12 gap-2 items-center bg-white/50 rounded-xl p-3 border border-gray-100"
            >
              {/* Description */}
              <div className="col-span-12 sm:col-span-6">
                <label className="sm:hidden label-text">Description</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none">
                    <TagIcon />
                  </span>
                  <input
                    id={`item-desc-${index}`}
                    className="input-field pl-9"
                    placeholder="Service or product"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                  />
                </div>
              </div>
              {/* Quantity */}
              <div className="col-span-5 sm:col-span-2">
                <label className="sm:hidden label-text">Qty</label>
                <input
                  id={`item-qty-${index}`}
                  className="input-field text-center"
                  placeholder="1"
                  type="number"
                  min="0"
                  step="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                />
              </div>
              {/* Price */}
              <div className="col-span-5 sm:col-span-3">
                <label className="sm:hidden label-text">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold pointer-events-none">
                    {form.currency || '$'}
                  </span>
                  <input
                    id={`item-price-${index}`}
                    className="input-field pl-8"
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', e.target.value)}
                  />
                </div>
              </div>
              {/* Delete */}
              <div className="col-span-2 sm:col-span-1 flex justify-center">
                {form.items.length > 1 && (
                  <button
                    id={`remove-item-${index}`}
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150"
                    title="Remove item"
                  >
                    <TrashIcon />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          id="add-item-btn"
          type="button"
          onClick={addItem}
          className="mt-4 flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-brand-600 
                     bg-brand-50 hover:bg-brand-100 rounded-xl transition-all duration-200 border 
                     border-brand-200 hover:border-brand-300 group"
        >
          <PlusIcon className="group-hover:rotate-90 transition-transform duration-200" />
          Add Line Item
        </button>
      </div>
      {/* ── Notes / Tax ── */}
      <div className="card-section">
        <SectionHeader>Additional Details</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Tax (%)"
            id="taxRate"
            icon={<span className="text-sm font-bold">%</span>}
            placeholder="0"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={form.taxRate}
            onChange={(e) => updateField('taxRate', e.target.value)}
          />
          <InputField
            label="Discount (%)"
            id="discount"
            icon={<span className="text-sm font-bold">%</span>}
            placeholder="0"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={form.discount}
            onChange={(e) => updateField('discount', e.target.value)}
          />
          <div className="sm:col-span-2 flex flex-col gap-1">
            <label htmlFor="notes" className="label-text">Notes / Terms</label>
            <textarea
              id="notes"
              className="input-field resize-none h-24"
              placeholder="Payment terms, thank-you note, or any additional information…"
              value={form.notes}
              onChange={(e) => updateField('notes', e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* ── CTA Buttons ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          id="generate-invoice-btn"
          type="button"
          onClick={onGenerate}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r 
                     from-brand-600 to-brand-500 text-white font-bold text-sm rounded-2xl 
                     btn-glow hover:from-brand-700 hover:to-brand-600 transition-all duration-300 
                     active:scale-95 uppercase tracking-widest"
        >
          <span>⚡</span>
          Generate Invoice
        </button>
        <button
          id="reset-form-btn"
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-4 text-gray-600 bg-white/70 
                     border border-gray-200 font-semibold text-sm rounded-2xl hover:bg-gray-50 
                     transition-all duration-200 active:scale-95"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  )
}
