import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/data';
import JsonLd from '@/components/JsonLd';
import { getArticleSchema, getBreadcrumbSchema, getFaqSchema } from '@/lib/jsonld';
import { ArrowLeft, Clock, User, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import ArticleClientCTA from './ArticleClientCTA';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Technical Guide`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = getArticleSchema(post);
  const faqSchema = getFaqSchema(post.qaBlocks);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Blog & Resources', item: '/blog' },
    { name: post.title, item: `/blog/${post.slug}` },
  ]);

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] min-h-screen">
      <JsonLd schema={articleSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={breadcrumbSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-[#22262A] mb-6 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Knowledge Guides</span>
        </Link>

        {/* Article Meta Header */}
        <div className="space-y-4 pb-8 border-b border-[#E5E3DC]">
          <span className="text-xs font-semibold text-[#B08D57] uppercase tracking-widest">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#22262A] leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </div>

        {/* Main Cover Image */}
        <div className="my-8 relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-sm border border-[#E5E3DC]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* AEO Direct Question & Answer Blocks */}
        {post.qaBlocks && post.qaBlocks.length > 0 && (
          <div className="my-8 p-6 bg-white rounded-2xl border-l-4 border-l-[#B08D57] border border-[#E5E3DC] space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 text-[#B08D57] text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Key Answer Summary (AEO / Snippet Reference)</span>
            </div>
            {post.qaBlocks.map((qa, i) => (
              <div key={i} className="space-y-1 text-xs">
                <p className="font-serif font-bold text-sm text-[#22262A]">{qa.question}</p>
                <p className="text-gray-600 leading-relaxed bg-[#FAF9F6] p-3 rounded border border-[#E5E3DC]/60">
                  {qa.answer}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Main Article Content */}
        <article className="prose max-w-none text-[#22262A] text-sm leading-relaxed space-y-6 pt-4">
          <div className="whitespace-pre-line leading-relaxed font-normal text-gray-700">
            {post.content}
          </div>
        </article>

        {/* Client Interactive Enquire Banner */}
        <ArticleClientCTA postTitle={post.title} />
      </div>
    </div>
  );
}
