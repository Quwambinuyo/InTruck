import { useState, useRef, useEffect } from "react";
import { FaClock } from "react-icons/fa";

const HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i === 0 ? 12 : i).padStart(2, "0"),
);
const MINUTES = ["00", "15", "30", "45"];

type TimePickerProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

export function TimePicker({ label, value, onChange }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      const hNum = parseInt(h);
      setPeriod(hNum >= 12 ? "PM" : "AM");
      const h12 = hNum % 12 === 0 ? 12 : hNum % 12;
      setHour(String(h12).padStart(2, "0"));
      setMinute(m);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const confirm = () => {
    let h = parseInt(hour);
    if (period === "AM" && h === 12) h = 0;
    if (period === "PM" && h !== 12) h += 12;
    onChange(`${String(h).padStart(2, "00")}:${minute}`);
    setOpen(false);
  };

  const displayValue = value ? `${hour}:${minute} ${period}` : "";

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
        <FaClock style={{ color: "rgba(0,0,0,0.3)", flexShrink: 0 }} />
        <span style={{ flex: 1 }}>{displayValue || "Select time"}</span>
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
            minWidth: 220,
          }}
        >
          <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.4)",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Hour
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 4,
                }}
              >
                {HOURS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHour(h)}
                    style={{
                      border: "none",
                      borderRadius: 8,
                      padding: "7px 4px",
                      fontSize: 13,
                      fontWeight: hour === h ? 700 : 400,
                      background: hour === h ? "#000" : "rgba(0,0,0,0.04)",
                      color: hour === h ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.4)",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Minute
              </p>
              <div style={{ display: "flex", gap: 6 }}>
                {MINUTES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMinute(m)}
                    style={{
                      flex: 1,
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 4px",
                      fontSize: 13,
                      fontWeight: minute === m ? 700 : 400,
                      background: minute === m ? "#000" : "rgba(0,0,0,0.04)",
                      color: minute === m ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    :{m}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.4)",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Period
              </p>
              <div style={{ display: "flex", gap: 6 }}>
                {(["AM", "PM"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    style={{
                      flex: 1,
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 4px",
                      fontSize: 13,
                      fontWeight: period === p ? 700 : 400,
                      background: period === p ? "#000" : "rgba(0,0,0,0.04)",
                      color: period === p ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={confirm}
              style={{
                width: "100%",
                border: "none",
                borderRadius: 10,
                padding: "10px",
                fontSize: 14,
                fontWeight: 700,
                background: "#000",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
