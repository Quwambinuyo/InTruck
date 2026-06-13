import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Field, SelectField } from "./FormField";
import Button from "../../ui/Button";
import RolePicker from "../../ui/RolePicker";
import SectionLabel from "../../ui/SectionLabel";
import type { UserRole } from "./types";
import {
  getPasswordStrength,
  STRENGTH_LABELS,
  STRENGTH_COLORS,
  NIGERIAN_STATES,
  BUSINESS_TYPES,
  rules,
} from "../../utils/utils";

type SignUpForm = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  businessName?: string;
  businessType?: string;
  state?: string;
};

export default function SignUp() {
  const navigate = useNavigate();
  const [businessTypeOpen, setBusinessTypeOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "customer",
      businessName: "",
      businessType: "",
      state: "",
    },
  });

  const role = watch("role");
  const password = watch("password");
  const isMerchant = role === "merchant";

  const strength = getPasswordStrength(password);
  const strengthLabel = STRENGTH_LABELS[strength];
  const strengthColor = STRENGTH_COLORS[strength];

  async function onSubmit(data: SignUpForm) {
    await new Promise((r) => setTimeout(r, 1400));
    navigate(
      data.role === "merchant" ? "/merchant/dashboard" : "/customer/dashboard",
    );
  }

  const getButtonText = () => {
    if (isSubmitting) return "Creating account…";
    return isMerchant ? "Create Merchant Account" : "Create Account";
  };

  return (
    <AuthLayout
      heading={`Join\nInTruck.`}
      subheading={
        isMerchant
          ? "List your trucks, reach thousands of clients, and grow your haulage business across Nigeria."
          : "Post jobs, find verified drivers, and get your materials delivered  fast."
      }
      panelStat={{
        value: "2,400+",
        label: "Verified drivers ready to haul",
      }}
    >
      <div className="w-full max-w-[600px] mx-auto">
        <div className="mb-8">
          <h1
            className="text-black uppercase leading-none mb-2"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 5vw, 3rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Create account
          </h1>

          <p className="text-black/60 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:text-black/70 transition-colors"
            >
              Sign in →
            </Link>
          </p>
        </div>

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RolePicker
              value={field.value}
              onChange={(r: UserRole) => field.onChange(r)}
            />
          )}
        />

        {isMerchant && (
          <div className="flex items-start gap-3 px-4 py-3 bg-black text-white mb-6">
            <svg
              className="w-4 h-4 text-white flex-shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>

            <p className="text-white/80 text-xs leading-relaxed font-medium">
              Merchant accounts are verified within 24 hrs. Have your CAC or
              NAFDAC number ready.
            </p>
          </div>
        )}

        <div className="bg-white border border-black/10 p-5 mb-4">
          <SectionLabel>Personal details</SectionLabel>

          <div className="flex flex-col gap-4 mt-4">
            <Field
              label="Full name"
              type="text"
              placeholder="Emeka Okafor"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register("fullName", rules.fullName)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Email address"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email", rules.email)}
              />

              <Field
                label="Phone number"
                type="tel"
                placeholder="0812 345 6789"
                autoComplete="tel"
                error={errors.phone?.message}
                {...register("phone", rules.phone)}
              />
            </div>
          </div>
        </div>

        {isMerchant && (
          <div className="bg-white border border-black/10 p-5 mb-4">
            <SectionLabel>Business details</SectionLabel>

            <div className="flex flex-col gap-4 mt-4">
              <Field
                label="Business name"
                type="text"
                placeholder="Okafor Haulage Ltd"
                error={errors.businessName?.message}
                {...register("businessName", rules.businessName(isMerchant))}
              />

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="businessType"
                  control={control}
                  rules={rules.businessType(isMerchant)}
                  render={({ field }) => (
                    <SelectField
                      label="Business type"
                      options={BUSINESS_TYPES}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      error={errors.businessType?.message}
                      placeholder="Select type"
                      open={businessTypeOpen}
                      setOpen={setBusinessTypeOpen}
                    />
                  )}
                />

                <Controller
                  name="state"
                  control={control}
                  rules={rules.state(isMerchant)}
                  render={({ field }) => (
                    <SelectField
                      label="Operating state"
                      options={NIGERIAN_STATES}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      error={errors.state?.message}
                      placeholder="Select state"
                      open={stateOpen}
                      setOpen={setStateOpen}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-black/10 p-5 mb-5">
          <SectionLabel>Security</SectionLabel>

          <div className="flex flex-col gap-4 mt-4">
            <div>
              <Field
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register("password", rules.password)}
              />

              {password && (
                <div className="mt-2.5">
                  <div className="flex gap-1 mb-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1"
                        style={{
                          backgroundColor:
                            i <= strength ? strengthColor : "#E5E5E5",
                        }}
                      />
                    ))}
                  </div>

                  <p
                    className="text-xs font-medium"
                    style={{ color: strengthColor }}
                  >
                    {strengthLabel}
                  </p>
                </div>
              )}
            </div>

            <Field
              label="Confirm password"
              type="password"
              placeholder="Re-enter password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", rules.confirmPassword(password))}
            />
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer mb-6 group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-4 h-4 border-2 border-black/30 peer-checked:border-black peer-checked:bg-black transition-all" />
            <svg
              className="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8l3.5 3.5 6.5-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="text-black/60 text-xs leading-relaxed">
            I agree to InTruck's{" "}
            <Link to="/terms" className="text-black font-semibold underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-black font-semibold underline">
              Privacy Policy
            </Link>
            {isMerchant && ", and consent to business verification checks"}.
          </span>
        </label>

        <Button
          onClick={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          variant={isMerchant ? "merchant" : "customer"}
          className="bg-primary"
        >
          {getButtonText()}
        </Button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-black/40 text-[10px] uppercase tracking-[0.2em] font-semibold">
            or continue with
          </span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        <button
          type="button"
          className="w-full py-3.5 border-2 border-black/10 hover:border-black/30 hover:bg-black/5 bg-white text-black text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-150"
        >
          <GoogleIcon />
          Sign up with Google
        </button>
      </div>
    </AuthLayout>
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
