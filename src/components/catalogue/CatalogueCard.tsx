import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { CatalogueProduct } from '@/data/products';

/**
 * Server-rendered catalogue card. Deliberately has no client-side state: the
 * product name, SKU code, description and link must all exist in the initial
 * HTML so the page is complete for crawlers and with JavaScript disabled.
 */
export default function CatalogueCard({
  product,
  priority = false,
}: {
  product: CatalogueProduct;
  priority?: boolean;
}) {
  return (
    <article className="bg-white border border-[#E2E8F0] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0B1F3A]/40 transition-all flex flex-col justify-between group">
      <Link
        href={`/product/${product.slug}`}
        className="relative h-36 sm:h-56 bg-white overflow-hidden border-b border-[#E2E8F0] flex items-center justify-center"
      >
        <Image
          src={product.image}
          alt={`${product.name} (${product.sku}) — aluminium hardware supplied in Raipur`}
          width={300}
          height={300}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 p-2 sm:p-3"
        />
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#0B1F3A] text-[#D4AF37] text-[10px] sm:text-[11px] font-mono font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-xs z-10 border border-[#D4AF37]/30">
          {product.sku}
        </span>
      </Link>

      <div className="p-2.5 sm:p-4 space-y-1.5 flex-1">
        <h3 className="text-sm sm:text-base font-extrabold text-[#0B1F3A] leading-tight">
          <Link href={`/product/${product.slug}`} className="hover:text-[#8A6408] transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3">
          {product.shortDescription}
        </p>
        {product.finishes.length > 0 && (
          <p className="pt-0.5 text-xs text-[#64748B]">
            <span className="font-semibold text-[#0B1F3A]">Finishes: </span>
            {product.finishes.join(', ')}
          </p>
        )}
        {product.sizes.length > 0 && (
          <p className="text-xs text-[#64748B]">
            <span className="font-semibold text-[#0B1F3A]">Sizes: </span>
            {product.sizes.join(', ')}
          </p>
        )}
      </div>

      <div className="p-2.5 sm:p-4 pt-0">
        <Link
          href={`/product/${product.slug}`}
          className="w-full min-h-11 px-3 bg-[#0B1F3A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          <span>View specifications</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
