import React from 'react';
import { ProductSpec } from '@/lib/data/products';

interface SpecsTableProps {
  specs: ProductSpec[];
}

export function SpecsTable({ specs }: SpecsTableProps) {
  return (
    <div className="w-full bg-[#FFFFFF] border border-[#D8D1C4] overflow-hidden shadow-luxury">
      <div className="bg-[#FAF7F0] px-6 py-4 border-b border-[#D8D1C4]">
        <h4 className="font-serif text-base text-[#2B2620]">Technical & Architectural Specifications</h4>
      </div>
      <table className="w-full text-left text-xs divide-y divide-[#D8D1C4]/60">
        <tbody>
          {specs.map((spec, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAF7F0]/40'}>
              <td className="px-6 py-3.5 font-medium text-[#2B2620]/70 uppercase tracking-wider w-1/3 border-r border-[#D8D1C4]/40">
                {spec.label}
              </td>
              <td className="px-6 py-3.5 text-[#2B2620] font-normal">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
