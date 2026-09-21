import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowRight, Clock, User, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import { BLOG_POSTS } from '@/lib/data';

export const metadata: Metadata = buildMetadata({
  title: 'Hardware Guides & How-To | Salasar Raipur',
  description:
    'Practical guides to choosing door closers, shower hinges, sliding window rollers and door kits, written for fabricators and homeowners in Chhattisgarh.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-white min-h-screen">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 border-b border-[#E8E6E1]">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest flex items-center space-x-1">
            <BookOpen className="w-4 h-4 text-[#C9A227]" />
            <span>Hardware Technical Specs & Trade Guides</span>
          </span>
          <h1 className="text-4xl font-serif font-extrabold text-[#0B1F3A]">
            Technical Guides & Hardware Specs
          </h1>
          <p className="text-gray-700 text-sm leading-relaxed">
            Direct answer guides and technical specifications for hardware dealers, fabricators, and contractors in Chhattisgarh & Pan-India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-12 space-y-8 sm:space-y-16">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-8 items-stretch">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 hover:border-[#8A6408] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full"
            >
              <div className="flex flex-col h-full justify-between">
                <div className="relative aspect-[16/10] sm:aspect-auto sm:h-64 overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-[#0B1F3A]/90 backdrop-blur-xs text-[#D4AF37] text-[8px] sm:text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-md shadow-xs z-10 border border-[#D4AF37]/30">
                    {post.category}
                  </div>
                </div>

                <div className="p-2.5 sm:p-6 flex flex-col flex-1 justify-between space-y-2 sm:space-y-3">
                  <div className="space-y-1.5 sm:space-y-3">
                    <div className="flex items-center justify-between text-[9px] sm:text-xs text-slate-500">
                      <span className="flex items-center space-x-1 truncate max-w-[85px] sm:max-w-none">
                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8A6408] shrink-0" />
                        <span className="truncate">{post.author.replace(/,.*$/, '')}</span>
                      </span>
                      <span className="flex items-center space-x-1 shrink-0 text-slate-400 font-medium">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8A6408] shrink-0" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h2 className="text-xs sm:text-xl font-bold text-[#0B1F3A] group-hover:text-[#8A6408] transition-colors leading-snug line-clamp-2 min-h-[2.4rem] sm:min-h-0">
                      {post.title}
                    </h2>

                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 min-h-[2rem] sm:min-h-0">
                      {post.excerpt}
                    </p>

                    {/* Direct FAQ Highlight (desktop only) */}
                    {post.qaBlocks && post.qaBlocks.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 space-y-2 hidden sm:block">
                        {post.qaBlocks.slice(0, 2).map((faq, i) => (
                          <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                            <p className="text-xs font-bold text-[#0B1F3A] flex items-center space-x-1">
                              <HelpCircle className="w-3.5 h-3.5 text-[#8A6408] shrink-0" />
                              <span>{faq.question}</span>
                            </p>
                            <p className="text-[11px] text-slate-600 leading-relaxed pl-4">
                              {faq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-2 sm:pt-3 border-t border-slate-100 text-[10px] sm:text-xs font-bold text-[#8A6408] flex items-center justify-between group-hover:translate-x-0.5 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
