import { useState, useRef, useEffect } from "react";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type DatePickerProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

export function DatePicker({ label, value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const today = new Date();

  const parsed = value ? new Date(value) : null;
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const selectDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  };

  const displayValue = parsed
    ? `${DAYS[parsed.getDay()]}, ${parsed.getDate()} ${MONTHS[parsed.getMonth()].slice(0, 3)} ${parsed.getFullYear()}`
    : "";

  const isSelected = (day: number) => {
    if (!parsed) return false;
    return (
      parsed.getFullYear() === viewYear &&
      parsed.getMonth() === viewMonth &&
      parsed.getDate() === day
    );
  };

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  return (
    <div
      ref={ref}
      style={{ position: "relative", zIndex: open ? 5 : 1 }}
      className="flex flex-col gap-2"
    >
      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderRadius: 12,
          border: `1px solid ${open ? "#000" : "rgba(0,0,0,0.15)"}`,
          background: "#fff",
          padding: "12px 16px",
          fontSize: 14,
          color: displayValue ? "#000" : "rgba(0,0,0,0.4)",
          boxShadow: open ? "0 0 0 2px rgba(0,0,0,0.08)" : "none",
          outline: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <FaCalendarAlt style={{ color: "rgba(0,0,0,0.3)", flexShrink: 0 }} />
        <span style={{ flex: 1 }}>{displayValue || "Select date"}</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
            overflow: "hidden",
            zIndex: 9999,
            minWidth: 280,
          }}
        >
          <div
            style={{
              padding: "14px 16px 10px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button
                type="button"
                onClick={prevMonth}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: 4,
                  borderRadius: 8,
                  color: "#000",
                }}
              >
                <FaChevronLeft size={12} />
              </button>
              <span style={{ fontWeight: 700, fontSize: 14 }}>
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: 4,
                  borderRadius: 8,
                  color: "#000",
                }}
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>

          <div style={{ padding: "10px 12px 14px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
                marginBottom: 6,
              }}
            >
              {DAYS.map((d) => (
                <div
                  key={d}
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.35)",
                    padding: "2px 0",
                  }}
                >
                  {d[0]}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
              }}
            >
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`e-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => {
                  const selected = isSelected(day);
                  const past = isPast(day);
                  const todayMark = isToday(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={past}
                      onClick={() => selectDay(day)}
                      style={{
                        border: "none",
                        borderRadius: 8,
                        padding: "6px 2px",
                        fontSize: 13,
                        fontWeight: selected ? 700 : todayMark ? 600 : 400,
                        background: selected
                          ? "#000"
                          : todayMark
                            ? "rgba(0,0,0,0.06)"
                            : "transparent",
                        color: selected
                          ? "#fff"
                          : past
                            ? "rgba(0,0,0,0.2)"
                            : "#000",
                        cursor: past ? "not-allowed" : "pointer",
                        textAlign: "center",
                      }}
                    >
                      {day}
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
