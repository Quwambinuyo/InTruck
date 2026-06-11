import type { ReactNode } from "react";
import Spinner from "./Spinner";

type SubmitButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "customer" | "merchant";
  fullWidth?: boolean;
  className?: string;
};

export default function SubmitButton({
  children,
  isLoading = false,
  disabled = false,
  onClick,
  type = "button",
  variant = "customer",
  fullWidth = true,
  className = "",
}: SubmitButtonProps) {
  const getVariantClasses = () => {
    if (variant === "merchant") {
      return "bg-[#F97316] hover:bg-[#EA580C] hover:shadow-orange-500/25";
    }
    return "bg-[#1E40AF] hover:bg-[#1D4ED8] hover:shadow-blue-500/25";
  };

  const widthClass = fullWidth ? "w-full" : "";

  if (isLoading) {
    return (
      <button
        type="button"
        disabled
        className={`${widthClass} py-4 bg-[#94A3B8] disabled:opacity-60 text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-not-allowed ${className}`}
      >
        <Spinner />
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${widthClass} py-4 ${getVariantClasses()} text-white font-bold text-sm uppercase tracking-wide transition-all duration-150 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
