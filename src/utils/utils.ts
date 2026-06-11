export const NIGERIAN_STATES = [
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

export const BUSINESS_TYPES = [
  { value: "owner_operator", label: "Owner-Operator (1–5 trucks)" },
  { value: "fleet_company", label: "Fleet Company (6–50 trucks)" },
  { value: "logistics_firm", label: "Logistics Firm (50+ trucks)" },
  { value: "aggregator", label: "Aggregator / Broker" },
];

export const rules = {
  fullName: { required: "Full name is required." },

  email: {
    required: "Email is required.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address.",
    },
  },

  loginPassword: {
    required: "Password is required.",
  },

  phone: {
    required: "Phone number is required.",
    validate: (v: string) =>
      /^(\+?234|0)[789]\d{9}$/.test(v.replace(/\s/g, "")) ||
      "Enter a valid Nigerian phone number.",
  },

  password: {
    required: "Password is required.",
    minLength: { value: 8, message: "Password must be at least 8 characters." },
  },

  confirmPassword: (password: string) => ({
    required: "Please confirm your password.",
    validate: (v: string) => v === password || "Passwords don't match.",
  }),

  businessName: (isMerchant: boolean) => ({
    validate: (v?: string) =>
      !isMerchant || !!v?.trim() || "Business name is required.",
  }),

  businessType: (isMerchant: boolean) => ({
    validate: (v?: string) =>
      !isMerchant || !!v || "Select your business type.",
  }),

  state: (isMerchant: boolean) => ({
    validate: (v?: string) =>
      !isMerchant || !!v || "Select your operating state.",
  }),
};

export const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
export const STRENGTH_COLORS = ["", "#EF4444", "#EAB308", "#22C55E", "#16A34A"];

export function getPasswordStrength(password: string): number {
  if (!password) return 0;
  let s = 0;
  if (password.length >= 8) s++;
  if (/[A-Z]/.test(password)) s++;
  if (/[0-9]/.test(password)) s++;
  if (/[^A-Za-z0-9]/.test(password)) s++;
  return s;
}
