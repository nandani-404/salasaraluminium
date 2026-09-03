import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowRight, Clock, User, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Hardware Resources & Dealer FAQ Guides | Salasar Aluminium & Hardware',
  description:
    'Trade buyer guides for aluminium door kits, door closer selection, shower hinge types, and wholesale hardware distribution in Raipur & Chhattisgarh.',
};

const ARTICLES = [
  {
    slug: 'dealers-guide-to-salasar-aluminium-door-kit-range',
    title: "A Dealer's Guide to Salasar's Aluminium Door Kit Range (SA-33)",
    excerpt: 'Detailed breakdown of finishes (Black, Brown, Champion, Matt, CP), component specifications, and sizing for aluminium door kits supplied from Raipur.',
    category: 'Product Buying Guide',
    author: 'Salasar Technical Team',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    faqs: [
      {
        question: 'What finishes are available for the SA-33 Aluminium Door Kit?',
        answer: 'The SA-33 Aluminium Door Kit is supplied in 5 finishes: Black, Brown, Champion, Matt, and CP (Chrome Plated).'
      },
      {
        question: 'What items are included in a standard door kit assembly?',
        answer: 'Each kit includes matching pull handles, mortise lock cylinder/latching bolt, tower bolts, and heavy door stoppers.'
      }
    ]
  },
  {
    slug: 'choosing-the-right-door-closer-aluminium-vs-ss-vs-capsule',
    title: 'Choosing the Right Door Closer: Aluminium vs SS vs Capsule (SA-42 to SA-44)',
    excerpt: 'Compare hydraulic force ratings, door weight limits, and pneumatic pencil closers vs heavy capsule closers for commercial entryways.',
    category: 'Technical Specification',
    author: 'Salasar Technical Team',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    faqs: [
      {
        question: 'When should a capsule door closer (SA-44) be specified over a standard closer?',
        answer: 'Capsule door closers (SA-44) are engineered for heavy high-traffic commercial doors weighing over 80kg requiring heavy hydraulic damping.'
      }
    ]
  },
  {
    slug: 'understanding-shower-hinge-types-fix-clip-wall-to-glass-glass-to-glass',
    title: 'Understanding Shower Hinge Types: 0° Fix Clip, 90° Wall-to-Glass, 180° Glass-to-Glass (SA-75 to SA-78)',
    excerpt: 'Engineering guide on CP mirror polish brass & SS shower hinges, glass cutout dimensions, and self-closing spring angles.',
    category: 'Glass Hardware Guide',
    author: 'Salasar Technical Team',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    faqs: [
      {
        question: 'What glass thickness is compatible with Salasar CP shower hinges?',
        answer: 'Salasar CP shower hinges (SA-75 to SA-78) are engineered for 8mm to 12mm toughened safety glass panels.'
      }
    ]
  },
  {
    slug: 'aluminium-hardware-wholesale-in-chhattisgarh-what-dealers-should-know',
    title: 'Aluminium Hardware Wholesale in Chhattisgarh: What Dealers & Fabricators Should Know',
    excerpt: 'Overview of B2B supply chains, direct factory pricing from Swastik Industries (Mumbai), and ready outlet stocking in Raipur.',
    category: 'Trade & Wholesale',
    author: 'Abhishek (Salasar Trade Team)',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    faqs: [
      {
        question: 'Where is the Salasar Aluminium & Hardware main store in Raipur?',
        answer: 'Shop No. 3, Salasar Aluminium & Hardware, Near Mahavir Traders, Punjab Oil Mill Road, Bhaisthan, Raipur, Chhattisgarh – 492001.'
      }
    ]
  }
];

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#E8E6E1]">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest flex items-center space-x-1">
            <BookOpen className="w-4 h-4 text-[#C9A227]" />
            <span>GEO / AEO & Trade Resource Library</span>
          </span>
          <h1 className="text-4xl font-serif font-extrabold text-[#0B1F3A]">
            Technical Guides & Dealer Resources
          </h1>
          <p className="text-gray-700 text-sm leading-relaxed">
            Direct answer guides and technical specifications for hardware dealers, fabricators, and contractors in Chhattisgarh & Pan-India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8E6E1] hover:border-[#C9A227] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1F3A] text-[#C9A227] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded shadow">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span className="flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span>{post.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-serif font-bold text-[#0B1F3A] group-hover:text-[#C9A227] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Direct FAQ Highlight for AEO */}
                  <div className="pt-3 border-t border-[#E8E6E1] space-y-2">
                    {post.faqs.map((faq, i) => (
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
