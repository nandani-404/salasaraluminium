import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-[#2B2620]/60">
        <li>
          <Link href="/" className="hover:text-[#B08D57] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-3 h-3 text-[#D8D1C4]" />
            {item.href ? (
              <Link href={item.href} className="hover:text-[#B08D57] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#2B2620] font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
