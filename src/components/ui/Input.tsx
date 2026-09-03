import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[11px] uppercase tracking-widest text-[#2B2620]/70 mb-2 font-medium">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-[#FFFFFF] border border-[#D8D1C4] text-[#2B2620] placeholder-[#2B2620]/40 text-sm focus-ring transition-colors ${
          error ? 'border-red-500' : 'focus:border-[#B08D57]'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
