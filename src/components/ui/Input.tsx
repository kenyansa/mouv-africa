import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}

export function Input({ label, containerClassName = '', className = '', ...rest }: InputProps) {
  return (
    <label className={`block text-sm font-semibold text-[#193f32] ${containerClassName}`}>
      {label}
      <input
        className={`mt-2 w-full rounded-xl border border-[#dfe5dc] px-4 py-3 text-sm text-[#193f32] outline-none transition focus:border-[#cf6a4c] ${className}`}
        {...rest}
      />
    </label>
  );
}
