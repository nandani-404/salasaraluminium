import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/data';
import JsonLd from '@/components/JsonLd';
import { getArticleSchema, getBreadcrumbSchema, getFaqSchema } from '@/lib/jsonld';
import { Clock, User, Eye, Heart, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import ArticleClientCTA from './ArticleClientCTA';
import ArticleLikeShareBar from './ArticleLikeShareBar';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  if (!post) return {};

  const cleanTitle = post.title.length > 38 ? `${post.title.substring(0, 35)}...` : post.title;
  const cleanDesc = post.excerpt.length > 158 ? `${post.excerpt.substring(0, 155)}...` : post.excerpt;

  return {
    title: cleanTitle,
    description: cleanDesc,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = getArticleSchema(post);
  const faqSchema = getFaqSchema(post.qaBlocks);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: post.title, item: `/blog/${post.slug}` },
  ]);

  // Clean raw markdown heading syntax (### / ---) for clean visual reading
  const cleanContent = post.content
    .replace(/^###\s+/gm, '')
    .replace(/^####\s+/gm, '')
    .replace(/^---\s*$/gm, '');

  return (
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-24 bg-white min-h-screen">
      <JsonLd schema={articleSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={breadcrumbSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Category Pill */}
        <div className="mb-4 text-left">
          <span className="inline-block bg-[#F3F4F6] text-[#0B1F3A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
            {post.category}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight text-left mb-6">
          {post.title}
        </h1>

        {/* Author Meta Info Bar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-500 pb-8 border-b border-gray-100 text-left">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {post.author.charAt(0)}
            </div>
            <span className="font-semibold text-gray-900">{post.author}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-gray-500">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{post.date}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-gray-500">
            <span>{post.readTime}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-gray-500">
            <Eye className="w-3.5 h-3.5 text-gray-400" />
            <span>124 views</span>
          </div>

          <div className="flex items-center space-x-1.5 text-gray-500">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>12 Likes</span>
          </div>
        </div>

        {/* Main Cover Image - Premium Full-Width Cover Frame */}
        <div className="my-8 relative h-72 sm:h-[450px] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/80 shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover w-full h-full"
          />
        </div>

        {/* Body Section */}
        <div className="pt-6 text-left">
          <div className="w-full space-y-8 text-left">
            {/* Excerpt / Intro Paragraph */}
            <p className="text-base text-gray-700 leading-relaxed font-medium text-left">
              {post.excerpt}
            </p>

            {/* Q&A / Answer Block if available */}
            {post.qaBlocks && post.qaBlocks.length > 0 && (
              <div className="p-6 bg-[#FAF9F6] rounded-xl border-l-4 border-l-[#C9A227] border border-[#E8E6E1] space-y-3">
                <div className="flex items-center space-x-2 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-[#C9A227]" />
                  <span>Technical QA Reference</span>
                </div>
                {post.qaBlocks.map((qa, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-bold text-sm text-[#0B1F3A]">{qa.question}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{qa.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Main Content Body - Clean Styled Sections without Asterisks or Raw Markdown Symbols */}
            <div className="space-y-10 text-left pt-2">
              {post.slug === 'dealers-guide-to-salasar-aluminium-door-kit-range' && (
                <div className="space-y-8 text-left">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-[#0B1F3A]">Comprehensive Overview of the SA-33 Aluminium Door Kit</h2>
                    <p className="text-gray-700 leading-relaxed">
                      The SA-33 Aluminium Door Kit is Salasar&apos;s flagship architectural hardware package designed specifically for residential and commercial aluminium door fabricators, contractors, and retail dealers.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#0B1F3A]">Available Premium Finishes</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="font-bold text-[#0B1F3A] min-w-[170px]">Matte Black (Powder Coated):</span>
                        <span>Ultra-sleek electro-statically applied finish with high UV and scratch resistance.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-bold text-[#0B1F3A] min-w-[170px]">Brown / Chocolate:</span>
                        <span>Deep rich brown tone perfectly matched for wooden texture aluminium profiles.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-bold text-[#0B1F3A] min-w-[170px]">Champion (Satin Finish):</span>
                        <span>Luxurious Champagne/Gold metallic finish for premium interior suites.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-bold text-[#0B1F3A] min-w-[170px]">Matt Silver (Anodized):</span>
                        <span>Classic architectural anodized silver with anti-fingerprint coating.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-bold text-[#0B1F3A] min-w-[170px]">CP (Chrome Plated):</span>
                        <span>Mirror polish chrome finish engineered for moisture and humidity resistance.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#0B1F3A]">Complete Assembly Components</h3>
                    <p className="text-gray-700">Every SA-33 Door Kit standard box comes with factory-calibrated components:</p>
                    <ul className="space-y-2.5 text-gray-700 pl-4 list-disc">
                      <li><strong className="text-[#0B1F3A]">Pair of Heavy Aluminium Pull Handles:</strong> Ergonomically shaped for smooth touch and grip.</li>
                      <li><strong className="text-[#0B1F3A]">Mortise Cylinder & Latch Assembly:</strong> Brass key cylinder mechanism with smooth spring bolt action.</li>
                      <li><strong className="text-[#0B1F3A]">Matching Tower Bolts (Top & Bottom):</strong> High shear-strength locking bolts for security.</li>
                      <li><strong className="text-[#0B1F3A]">Heavy Duty Floor & Wall Door Stoppers:</strong> Cushioned rubber buffer to prevent glass and profile impact.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#0B1F3A]">Wholesale Ordering & Technical Support</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Salasar Aluminium & Hardware supplies full carton packs with custom branding options for wholesale distributors across Raipur, Bilaspur, Durg, Bhilai, and pan-Chhattisgarh.
                    </p>
                  </div>
                </div>
              )}

              {post.slug === 'choosing-the-right-door-closer-aluminium-vs-ss-vs-capsule' && (
                <div className="space-y-8 text-left">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-[#0B1F3A]">How to Select the Ideal Overhead Door Closer</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Selecting the right door closer ensures occupant safety, smooth latching, acoustic sealing, and prolonged door frame lifespan.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#0B1F3A]">Comparison of Salasar Door Closer Series</h3>
                    
                    <div className="space-y-3 bg-[#FAF9F6] p-5 rounded-xl border border-[#E8E6E1]">
                      <h4 className="font-bold text-[#0B1F3A] text-lg">1. SA-42 Aluminium Hydraulic Door Closer (Light to Medium Duty)</h4>
                      <p className="text-sm text-gray-700"><strong className="text-[#0B1F3A]">Door Weight:</strong> Up to 45 - 65 kg</p>
                      <p className="text-sm text-gray-700"><strong className="text-[#0B1F3A]">Max Door Width:</strong> 950 mm</p>
                      <p className="text-sm text-gray-700"><strong className="text-[#0B1F3A]">Ideal Application:</strong> Residential interior doors, office wooden doors, aluminium section doors.</p>
                    </div>

                    <div className="space-y-3 bg-[#FAF9F6] p-5 rounded-xl border border-[#E8E6E1]">
                      <h4 className="font-bold text-[#0B1F3A] text-lg">2. SA-43 Stainless Steel Finish Heavy Door Closer (Medium Duty Commercial)</h4>
                      <p className="text-sm text-gray-700"><strong className="text-[#0B1F3A]">Door Weight:</strong> Up to 65 - 85 kg</p>
                      <p className="text-sm text-gray-700"><strong className="text-[#0B1F3A]">Max Door Width:</strong> 1100 mm</p>
                      <p className="text-sm text-gray-700"><strong className="text-[#0B1F3A]">Features:</strong> Dual valve speed control (closing speed & latching speed), fire-rated hydraulic oil.</p>
                    </div>

                    <div className="space-y-3 bg-[#FAF9F6] p-5 rounded-xl border border-[#E8E6E1]">
                      <h4 className="font-bold text-[#0B1F3A] text-lg">3. SA-44 Capsule Heavy Hydraulic Door Closer (Heavy Commercial High-Traffic)</h4>
                      <p className="text-sm text-gray-700"><strong className="text-[#0B1F3A]">Door Weight:</strong> Up to 80 - 120 kg</p>
                      <p className="text-sm text-gray-700"><strong className="text-[#0B1F3A]">Max Door Width:</strong> 1250 mm</p>
                      <p className="text-sm text-gray-700"><strong className="text-[#0B1F3A]">Features:</strong> Heavy-duty rack and pinion mechanism, heavy capsule body housing, anti-freeze hydraulic fluid.</p>
                    </div>
                  </div>
                </div>
              )}

              {post.slug !== 'dealers-guide-to-salasar-aluminium-door-kit-range' &&
               post.slug !== 'choosing-the-right-door-closer-aluminium-vs-ss-vs-capsule' && (
                <div className="space-y-6 text-left">
                  {cleanContent
                    .split('\n\n')
                    .map((paragraph, idx) => {
                      const trimmed = paragraph.trim();
                      if (!trimmed) return null;
                      
                      const isTitle = trimmed.length < 80 && !trimmed.endsWith('.');
                      if (isTitle) {
                        return (
                          <h3 key={idx} className="text-xl font-bold text-[#0B1F3A] pt-3">
                            {trimmed.replace(/\*/g, '')}
                          </h3>
                        );
                      }
                      return (
                        <p key={idx} className="text-gray-700 leading-relaxed text-base">
                          {trimmed.replace(/\*\*/g, '').replace(/\*/g, '')}
                        </p>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Interactive Enquire Section */}
            <div className="pt-6 border-t border-gray-100">
              <ArticleClientCTA postTitle={post.title} />
            </div>

            {/* Working Interactive Like & Share Bar */}
            <ArticleLikeShareBar initialLikes={12} />

            {/* Author Profile Card Box */}
            <div className="p-6 bg-[#FAF9F6] rounded-xl border border-[#E8E6E1] flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-lg font-bold shrink-0">
                {post.author.charAt(0)}
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-sm font-bold text-[#0B1F3A]">Written by {post.author}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Technical Hardware & Aluminium Engineering Team at Salasar Aluminium & Hardware, Raipur. Expert guidance on door kits, closers, shower hinges, and architectural fittings.
                </p>
                <div className="pt-2 flex items-center space-x-3 text-[11px] font-semibold text-[#C9A227]">
                  <Link href="/contact" className="hover:underline">Contact Desk</Link>
                  <span>•</span>
                  <Link href="/products" className="hover:underline">Product Catalog</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Read Next Cards Section */}
        {otherPosts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-gray-100 text-left">
            <h3 className="text-xl font-bold text-[#0B1F3A] mb-6">Read Next</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2.5 sm:gap-6">
              {otherPosts.map((op) => (
                <Link
                  key={op.slug}
                  href={`/blog/${op.slug}`}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="p-2.5 sm:p-5 space-y-1.5 sm:space-y-3">
                    <div className="relative h-28 sm:h-44 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-1 sm:p-2">
                      <Image
                        src={op.image}
                        alt={op.title}
                        fill
                        className="object-contain w-full h-full p-1 sm:p-2 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#C9A227]">
                      {op.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-base text-[#0B1F3A] group-hover:text-[#C9A227] transition-colors leading-tight sm:leading-snug line-clamp-2">
                      {op.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-1 sm:line-clamp-2 leading-relaxed">
                      {op.excerpt}
                    </p>
                  </div>
                  <div className="px-2.5 pb-2.5 sm:px-5 sm:pb-5 flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                    <span className="truncate">{op.date}</span>
                    <span className="font-bold text-[#0B1F3A] flex items-center space-x-1 group-hover:translate-x-1 transition-transform shrink-0">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



