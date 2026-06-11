import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import RoleToggle from "./RoleToggle";
import { Field, SelectField } from "./FormField";
import type { SignUpForm, UserRole } from "./types";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
].map((s) => ({ value: s, label: s }));

const BUSINESS_TYPES = [
  { value: "owner_operator", label: "Owner-Operator (1–5 trucks)" },
  { value: "fleet_company", label: "Fleet Company (6–50 trucks)" },
  { value: "logistics_firm", label: "Logistics Firm (50+ trucks)" },
  { value: "aggregator", label: "Aggregator / Broker" },
];

const INITIAL: SignUpForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "customer",
  businessName: "",
  businessType: "",
  state: "",
};

type FieldErrors = Partial<Record<keyof SignUpForm, string>>;

function validate(form: SignUpForm): FieldErrors {
  const e: FieldErrors = {};
  if (!form.fullName.trim()) e.fullName = "Full name is required.";
  if (!form.email) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = "Enter a valid email address.";
  if (!form.phone) e.phone = "Phone number is required.";
  else if (!/^(\+?234|0)[789]\d{9}$/.test(form.phone.replace(/\s/g, "")))
    e.phone = "Enter a valid Nigerian phone number.";
  if (!form.password) e.password = "Password is required.";
  else if (form.password.length < 8)
    e.password = "Password must be at least 8 characters.";
  if (!form.confirmPassword)
    e.confirmPassword = "Please confirm your password.";
  else if (form.password !== form.confirmPassword)
    e.confirmPassword = "Passwords don't match.";
  if (form.role === "merchant") {
    if (!form.businessName?.trim())
      e.businessName = "Business name is required.";
    if (!form.businessType) e.businessType = "Select your business type.";
    if (!form.state) e.state = "Select your operating state.";
  }
  return e;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignUpForm>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  function set<K extends keyof SignUpForm>(key: K, value: SignUpForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit() {
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Scroll to first error
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    navigate(
      form.role === "merchant" ? "/merchant/dashboard" : "/customer/dashboard",
    );
  }

  const isMerchant = form.role === "merchant";

  // Password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#EF4444", "#EAB308", "#22C55E", "#16A34A"][
    strength
  ];

  return (
    <AuthLayout
      heading={`Join\nInTruck.`}
      subheading={
        isMerchant
          ? "List your trucks, reach thousands of clients, and grow your InTruckage business across Nigeria."
          : "Post jobs, find verified drivers, and get your materials delivered — fast."
      }
      panelStat={{
        value: "2,400+",
        label: "Verified drivers ready to InTruck",
      }}
    >
      {/* Heading */}
      <div className="mb-7">
        <h1
          className="text-[#0F172A] uppercase leading-none mb-1"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "2.6rem",
          }}
        >
          Create account
        </h1>
        <p className="text-[#64748B] text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#1E40AF] font-semibold hover:text-[#1D4ED8] transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Role toggle */}
      <RoleToggle
        value={form.role}
        onChange={(r: UserRole) => set("role", r)}
        label="Register as"
      />

      {/* Merchant extra badge */}
      {isMerchant && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-[#F97316]/8 border border-[#F97316]/20 mb-5">
          <svg
            className="w-4 h-4 text-[#F97316] flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <p className="text-[#C2410C] text-xs font-medium">
            Merchant accounts are verified within 24 hrs. You'll need your CAC
            or NAFDAC number.
          </p>
        </div>
      )}

      {/* Personal info */}
      <div className="flex flex-col gap-4 mb-4">
        <Field
          label="Full name"
          type="text"
          placeholder="Emeka Okafor"
          value={form.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          error={errors.fullName}
          autoComplete="name"
        />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            error={errors.email}
            autoComplete="email"
          />
          <Field
            label="Phone number"
            type="tel"
            placeholder="0812 345 6789"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            error={errors.phone}
            autoComplete="tel"
          />
        </div>

        {/* Merchant fields */}
        {isMerchant && (
          <>
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#F8FAFC] px-3 text-[#94A3B8] text-[10px] uppercase tracking-[0.15em] font-semibold">
                  Business details
                </span>
              </div>
            </div>

            <Field
              label="Business name"
              type="text"
              placeholder="Okafor InTruckage Ltd"
              value={form.businessName ?? ""}
              onChange={(e) => set("businessName", e.target.value)}
              error={errors.businessName}
            />

            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label="Business type"
                options={BUSINESS_TYPES}
                value={form.businessType ?? ""}
                onChange={(v) => set("businessType", v)}
                error={errors.businessType}
                placeholder="Select type"
              />
              <SelectField
                label="Operating state"
                options={NIGERIAN_STATES}
                value={form.state ?? ""}
                onChange={(v) => set("state", v)}
                error={errors.state}
                placeholder="Select state"
              />
            </div>
          </>
        )}

        {/* Password section divider */}
        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#F8FAFC] px-3 text-[#94A3B8] text-[10px] uppercase tracking-[0.15em] font-semibold">
              Security
            </span>
          </div>
        </div>

        <div>
          <Field
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            error={errors.password}
            autoComplete="new-password"
          />
          {/* Strength bar */}
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 transition-all duration-300"
                    style={{
                      backgroundColor:
                        i <= strength ? strengthColor : "#E2E8F0",
                    }}
                  />
                ))}
              </div>
              <p className="text-xs" style={{ color: strengthColor }}>
                {strengthLabel}
              </p>
            </div>
          )}
        </div>

        <Field
          label="Confirm password"
          type="password"
          placeholder="Re-enter password"
          value={form.confirmPassword}
          onChange={(e) => set("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
      </div>

      {/* Terms checkbox */}
      <label className="flex items-start gap-3 cursor-pointer mb-6 mt-2 group">
        <div className="relative mt-0.5">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-4 h-4 border-2 border-slate-300 peer-checked:border-[#1E40AF] peer-checked:bg-[#1E40AF] transition-all" />
        </div>
        <span className="text-[#64748B] text-xs leading-relaxed">
          I agree to InTruck's{" "}
          <Link to="/terms" className="text-[#1E40AF] underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-[#1E40AF] underline">
            Privacy Policy
          </Link>
          {isMerchant && ", and consent to business verification checks"}.
        </span>
      </label>

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-4 bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-60 text-white font-bold text-sm uppercase tracking-wide transition-all duration-150 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Spinner />
            Creating account…
          </>
        ) : isMerchant ? (
          "Create Merchant Account"
        ) : (
          "Create Customer Account"
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[#94A3B8] text-xs uppercase tracking-widest">
          or
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Google */}
      <button
        type="button"
        className="w-full py-3.5 border-2 border-slate-200 hover:border-slate-300 bg-white text-[#0F172A] text-sm font-semibold flex items-center justify-center gap-3 transition-colors mb-2"
      >
        <GoogleIcon />
        Sign up with Google
      </button>
    </AuthLayout>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
