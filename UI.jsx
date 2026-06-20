import React from 'react'
/**
 * InputField – labelled form field with icon support
 */
export function InputField({ label, id, icon, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="label-text">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400 select-none pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`input-field ${icon ? 'pl-9' : ''}`}
          {...props}
        />
      </div>
    </div>
  )
}
/**
 * Section header with accent bar
 */
export function SectionHeader({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-6 rounded-full bg-gradient-to-b from-brand-400 to-brand-600" />
      <h2 className="text-base font-bold text-gray-700 uppercase tracking-widest">
        {children}
      </h2>
    </div>
  )
}
/**
 * Pill badge
 */
export function Badge({ children, color = 'indigo' }) {
  const colors = {
    indigo: 'bg-brand-100 text-brand-700',
    green:  'bg-emerald-100 text-emerald-700',
    amber:  'bg-amber-100 text-amber-700',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[color]}`}>
      {children}
    </span>
  )
}
