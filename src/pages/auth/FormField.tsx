import {
  useEffect,
  useRef,
  useMemo,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

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
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none ${
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
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none resize-none ${
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
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
  searchable?: boolean;
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
  icon,
  searchable = false,
}: SelectFieldProps) {
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const uniqueOptions = useMemo(() => {
    const seen = new Set<string>();
    return options.filter((o) => {
      const k = o.value.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [options]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) return uniqueOptions;
    return uniqueOptions.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, searchable, uniqueOptions]);

  const selectedLabel =
    uniqueOptions.find((o) => o.value === value)?.label || placeholder;

  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }
    const handleOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open, setOpen]);

  return (
    <div
      ref={wrapperRef}
      className={`flex flex-col gap-2 ${className ?? ""}`}
      style={{ position: "relative", zIndex: open ? 9999 : 1 }}
    >
      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60">
        {label}
      </label>

      <div style={{ position: "relative" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "rgba(0,0,0,0.3)",
              fontSize: 14,
            }}
          >
            {icon}
          </span>
        )}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 12,
            border: `1px solid ${error ? "#ef4444" : open ? "#000" : "rgba(0,0,0,0.15)"}`,
            background: "#fff",
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: icon ? 36 : 16,
            paddingRight: 16,
            fontSize: 14,
            color: value ? "#000" : "rgba(0,0,0,0.4)",
            boxShadow: open ? "0 0 0 2px rgba(0,0,0,0.08)" : "none",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {selectedLabel}
          </span>
          <span
            style={{
              marginLeft: 12,
              flexShrink: 0,
              color: "rgba(0,0,0,0.4)",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <ChevronIcon />
          </span>
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.1)",
              background: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              overflow: "hidden",
              zIndex: 9999,
            }}
          >
            {searchable && (
              <div
                style={{
                  padding: 8,
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${label.toLowerCase()}...`}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    border: "1px solid rgba(0,0,0,0.1)",
                    padding: "8px 12px",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            )}
            <div style={{ maxHeight: 208, overflowY: "auto" }}>
              {filteredOptions.length === 0 && (
                <div
                  style={{
                    padding: "12px 16px",
                    fontSize: 14,
                    color: "rgba(0,0,0,0.4)",
                  }}
                >
                  No results found
                </div>
              )}
              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 16px",
                    fontSize: 14,
                    background: value === option.value ? "#000" : "transparent",
                    color: value === option.value ? "#fff" : "#000",
                    border: "none",
                    cursor: "pointer",
                    display: "block",
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
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
                className={`text-xs mt-0.5 ${active ? "text-white/60" : "text-black/40"}`}
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
