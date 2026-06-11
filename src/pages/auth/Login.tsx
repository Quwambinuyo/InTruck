import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import RoleToggle from "../../ui/RoleToggle";
import { Field } from "./FormField";
import Button from "../../ui/Button";
import type { UserRole } from "./types";
import { rules } from "../../utils/utils";

type LoginForm = {
  email: string;
  password: string;
  role: UserRole;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
      role: "customer",
    },
  });

  const role = watch("role");

  async function onSubmit(data: LoginForm) {
    await new Promise((r) => setTimeout(r, 1200));
    navigate(
      data.role === "merchant" ? "/merchant/dashboard" : "/customer/dashboard",
    );
  }

  const getButtonText = () => {
    if (isSubmitting) return "Signing in…";
    return `Sign in as ${role === "merchant" ? "Merchant" : "Customer"}`;
  };

  return (
    <AuthLayout
      heading={`Welcome\nback.`}
      subheading="Log in to manage your jobs, track deliveries, and connect with Nigeria's largest InTrucking network."
      panelStat={{ value: "48,000+", label: "Trips completed this year" }}
    >
      <div className="mb-8">
        <h1
          className="text-[#0F172A] uppercase leading-none mb-1"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "2.6rem",
          }}
        >
          Sign in
        </h1>
        <p className="text-[#64748B] text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#1E40AF] font-semibold hover:text-[#1D4ED8] transition-colors"
          >
            Create one free
          </Link>
        </p>
      </div>

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <RoleToggle
            value={field.value}
            onChange={(r: UserRole) => field.onChange(r)}
            label="Signing in as"
          />
        )}
      />

      <div className="flex flex-col gap-4 mb-2">
        <Field
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email", rules.email)}
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password", rules.loginPassword)}
        />
      </div>

      <div className="flex justify-end mb-6">
        <Link
          to="/forgot-password"
          className="text-xs text-[#64748B] hover:text-[#1E40AF] transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        onClick={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
        variant={role === "merchant" ? "merchant" : "customer"}
      >
        {getButtonText()}
      </Button>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[#94A3B8] text-xs uppercase tracking-widest">
          or
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <button
        type="button"
        className="w-full py-3.5 border-2 border-slate-200 hover:border-slate-300 bg-white text-[#0F172A] text-sm font-semibold flex items-center justify-center gap-3 transition-colors"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="text-center text-[#94A3B8] text-xs mt-8 leading-relaxed">
        By signing in you agree to InTruck's{" "}
        <Link to="/terms" className="underline hover:text-[#64748B]">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="underline hover:text-[#64748B]">
          Privacy Policy
        </Link>
        .
      </p>
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
