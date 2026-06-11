export type UserRole = "customer" | "merchant";

export type LoginForm = {
  email: string;
  password: string;
  role: UserRole;
};

export type SignUpForm = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  // merchant-only
  businessName?: string;
  businessType?: string;
  state?: string;
};
