import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-sans tracking-widest text-xs uppercase transition-all duration-300 focus-ring cursor-pointer select-none';

  const variants = {
    primary: 'bg-[#B08D57] hover:bg-[#8B6D3F] text-white shadow-luxury hover:shadow-luxury-hover border border-[#B08D57]',
    secondary: 'bg-[#2B2620] hover:bg-[#1A1714] text-[#FAF7F0] shadow-luxury border border-[#2B2620]',
    outline: 'bg-transparent text-[#2B2620] border border-[#2B2620] hover:bg-[#2B2620] hover:text-[#FAF7F0]',
    ghost: 'bg-transparent text-[#2B2620] hover:bg-[#EAE5DC] border border-transparent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3.5 text-xs',
    lg: 'px-8 py-4 text-xs',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
