export function SectionCard({ icon, title, children, className = "" }) {
  return (
    <section
      className={`rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden ${className}`}
    >
      <header className="flex items-center gap-3 bg-brand-dark px-4 py-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
          <img src={icon} alt="" className="h-4 w-4 object-contain" />
        </span>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
          {title}
        </h2>
      </header>
      <div className="p-5">{children}</div>
    </section>
  )
}

export function Label({ children, required }) {
  return (
    <label className="mb-1.5 block text-[13px] font-medium text-brand-green">
      {children}
      {required && <span className="ml-0.5 text-red-600">*</span>}
    </label>
  )
}

const fieldBase =
  "w-full rounded-md border border-brand-olive/40 bg-brand-cream/40 px-3 py-2 text-sm text-brand-green placeholder-brand-olive/60 outline-none transition focus:border-brand-olive focus:ring-2 focus:ring-brand-olive/30"

export function TextInput({ label, required, error, ...props }) {
  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      <input className={fieldBase} {...props} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function TextArea({ label, required, error, ...props }) {
  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      <textarea rows={4} className={`${fieldBase} resize-none`} {...props} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function Select({ label, required, error, options, placeholder, ...props }) {
  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      <div className="relative">
        <select
          className={`${fieldBase} appearance-none pr-9 ${
            props.value ? "text-brand-green" : "text-brand-olive/60"
          }`}
          {...props}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-brand-green">
              {opt}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-olive"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function RadioGroup({ label, required, name, options, value, onChange, error }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {label && (
        <span className="text-[13px] font-medium text-brand-green">
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </span>
      )}
      <div className="flex items-center gap-6">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-2 text-sm text-brand-green"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 accent-brand-olive"
            />
            {opt}
          </label>
        ))}
      </div>
      {error && <p className="w-full text-xs text-red-600">{error}</p>}
    </div>
  )
}
