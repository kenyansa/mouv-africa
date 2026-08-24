import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-[#193f32] text-white hover:bg-[#122e24]',
  secondary: 'bg-[#cf6a4c] text-white hover:bg-[#b9563a]',
  ghost: 'border border-[#dfe5dc] text-[#193f32] hover:border-[#193f32]',
};

export function Button({
  variant = 'primary',
  loading,
  disabled,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`rounded-xl px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}
