"use client"

/* Reescrito sin Radix UI, usando HTML nativo */
export function RadioGroup({ children, value, onChange, name, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`} role="group">
      {children({ value, onChange, name })}
    </div>
  )
}

export function RadioItem({ value, name, onChange, checked, children, className = "" }) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="w-4 h-4 accent-primary"
      />
      <span className="text-sm text-foreground">{children}</span>
    </label>
  )
}
