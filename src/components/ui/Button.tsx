import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const variants = {
    primary: "bg-primary-600 text-white shadow-md shadow-primary-900/10 hover:shadow-lg hover:bg-primary-700 focus-visible:outline-primary-600",
    secondary: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus-visible:outline-primary-600",
    accent: "bg-cta-500 text-white shadow-md shadow-cta-900/10 hover:shadow-lg hover:bg-cta-600 focus-visible:outline-cta-500",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
