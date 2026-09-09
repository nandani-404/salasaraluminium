'use client';

import React, { useState } from 'react';
import { Heart, Share2, Check } from 'lucide-react';

export default function ArticleLikeShareBar({ initialLikes = 12 }: { initialLikes?: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // fallback to clipboard
      }
    }
    
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
      <button
        onClick={handleLike}
        className={`inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
          hasLiked
            ? 'bg-rose-50 text-rose-600 border-rose-200'
            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
        }`}
      >
        <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-600 text-rose-600' : 'text-gray-500'}`} />
        <span>{hasLiked ? 'LIKED' : 'LIKE THIS POST'}</span>
        <span className="bg-white/80 px-2 py-0.5 rounded-full text-[11px] font-bold border border-gray-200/60 ml-1">
          {likes}
        </span>
      </button>

      <div className="flex items-center space-x-2 text-xs text-gray-500 relative">
        <span className="font-semibold uppercase text-[10px] tracking-wider">Share</span>
        <button
          onClick={handleShare}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-[#0B1F3A] hover:text-white transition-all cursor-pointer"
          title="Share or Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
        </button>
        {copied && (
          <span className="absolute -top-8 right-0 bg-[#0B1F3A] text-white text-[10px] py-1 px-2.5 rounded shadow">
            Link copied!
          </span>
        )}
      </div>
    </div>
  );
}
