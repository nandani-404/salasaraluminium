import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowRight, Clock, User, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Hardware Guides & Technical Specs',
  description: 'Trade buyer guides for aluminium door kits, door closers, shower hinges, and wholesale hardware distribution in Raipur, Chhattisgarh.',
  alternates: {
    canonical: '/blog',
  },
};

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-16">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E6E1] hover:border-[#C9A227] shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer block"
            >
              <div>
                <div className="relative h-32 sm:h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#0B1F3A] text-[#C9A227] text-[8.5px] sm:text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded shadow z-10 border border-[#C9A227]/30">
                    {post.category}
                  </div>
                </div>

                <div className="p-2.5 sm:p-6 space-y-1.5 sm:space-y-3">
                  <div className="flex items-center space-x-2 sm:space-x-4 text-[10px] sm:text-xs text-gray-400">
                    <span className="flex items-center space-x-1 truncate">
                      <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A227] shrink-0" />
                      <span className="truncate">{post.author}</span>
                    </span>
                    <span className="flex items-center space-x-1 shrink-0">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A227] shrink-0" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-xs sm:text-xl font-serif font-bold text-[#0B1F3A] group-hover:text-[#C9A227] transition-colors leading-tight sm:leading-snug line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Direct FAQ Highlight */}
                  {post.qaBlocks && post.qaBlocks.length > 0 && (
                    <div className="pt-3 border-t border-[#E8E6E1] space-y-2 hidden sm:block">
                      {post.qaBlocks.slice(0, 2).map((faq, i) => (
                        <div key={i} className="bg-[#FAF9F6] p-3 rounded-lg border border-[#E8E6E1] space-y-1">
                          <p className="text-xs font-bold text-[#0B1F3A] flex items-center space-x-1">
                            <HelpCircle className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                            <span>{faq.question}</span>
                          </p>
                          <p className="text-[11px] text-gray-600 leading-relaxed pl-4">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-1 sm:pt-2 text-[10px] sm:text-xs font-bold text-[#C9A227] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
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
