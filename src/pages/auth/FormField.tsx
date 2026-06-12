import { type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
};

export function Field({
  label,
  error,
  hint,
  type,
  className,
  icon,
  ...props
}: FieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 text-sm">
            {icon}
          </span>
        )}

        <input
          type={type}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all duration-200 ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-black/15 focus:border-black focus:ring-2 focus:ring-black/10"
          } ${icon ? "pl-9" : ""}`}
          {...props}
        />
      </div>

      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
      {!error && hint && <p className="text-xs text-black/40">{hint}</p>}
    </div>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextAreaField({
  label,
  error,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60">
        {label}
      </label>

      <textarea
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none resize-none transition-all duration-200 ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-black/15 focus:border-black focus:ring-2 focus:ring-black/10"
        }`}
        {...props}
      />

      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  error?: string;
  value: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  options: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SelectField({
  label,
  error,
  value,
  open,
  setOpen,
  options,
  placeholder,
  onChange,
  className,
}: SelectFieldProps) {
  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder;

  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 ${
            value ? "text-black" : "text-black/40"
          } ${
            error
              ? "border-red-500"
              : "border-black/15 hover:border-black/30 focus:border-black"
          }`}
        >
          <span className="truncate">{selectedLabel}</span>

          <span
            className={`ml-3 text-black/40 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <ChevronIcon />
          </span>
        </button>

        {open && (
          <div className="absolute z-50 mt-2 w-full max-h-52 overflow-y-auto rounded-xl border border-black/10 bg-white shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-black/5 ${
                  value === option.value
                    ? "bg-black text-white hover:bg-black"
                    : "text-black"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
    </div>
  );
}

type TruckOption = {
  id: string;
  label: string;
  desc: string;
};

type TruckTypeFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: TruckOption[];
  className?: string;
};

export function TruckSelectCard({
  label,
  value,
  onChange,
  options,
  className,
}: TruckTypeFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60">
        {label}
      </label>

      <div className="grid grid-cols-2 gap-2.5">
        {options.map((t) => {
          const active = value === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={`rounded-xl border p-3 text-left transition ${
                active
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-white hover:border-black/30"
              }`}
            >
              <p className="text-sm font-bold leading-tight">{t.label}</p>
              <p
                className={`text-xs mt-0.5 ${
                  active ? "text-white/60" : "text-black/40"
                }`}
              >
                {t.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
