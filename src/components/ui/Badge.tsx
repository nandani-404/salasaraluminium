import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'taupe' | 'espresso' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium border';
  
  const variants = {
    gold: 'bg-[#B08D57]/10 text-[#8B6D3F] border-[#B08D57]/30',
    taupe: 'bg-[#D8D1C4]/20 text-[#2B2620] border-[#D8D1C4]',
    espresso: 'bg-[#2B2620] text-[#FAF7F0] border-[#2B2620]',
    outline: 'bg-transparent text-[#2B2620] border-[#D8D1C4]',
  };

  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
