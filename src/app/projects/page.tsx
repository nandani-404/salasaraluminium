'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS, Project } from '@/lib/data';
import { Building, Home, Factory, ArrowUpRight } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'industrial'>('all');
  const { openEnquiryModal } = useEnquiry();

  const filteredProjects = PROJECTS.filter((p) =>
    activeFilter === 'all' ? true : p.segment === activeFilter
  );

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#E5E3DC]">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold text-[#B08D57] uppercase tracking-widest">
            Portfolio & Case Studies
          </span>
          <h1 className="text-4xl font-serif font-bold text-[#22262A]">
            Completed Architectural Installations
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Explore real-world applications of Salasar extrusion profiles across luxury residential villas, high-rise commercial towers, and industrial solar PV infrastructure.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mt-8 flex items-center space-x-2">
          {(['all', 'residential', 'commercial', 'industrial'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-semibold rounded-md uppercase tracking-wider transition-colors ${
                activeFilter === filter
                  ? 'bg-[#22262A] text-white shadow-sm'
                  : 'bg-white border border-[#E5E3DC] text-gray-700 hover:border-[#B08D57]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden border border-[#E5E3DC] hover:border-[#B08D57] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#22262A]/90 text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded">
                    {project.location} • {project.completionYear}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-semibold text-[#B08D57] uppercase tracking-wider block">
                    {project.segment} Application
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#22262A] group-hover:text-[#B08D57] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-3 border-t border-[#E5E3DC]">
                    <span className="text-[11px] font-semibold text-gray-400 block mb-1.5">
                      Profiles Supplied:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.productsUsed.map((p, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#FAF9F6] border border-[#E5E3DC] text-[#22262A] px-2 py-0.5 rounded font-medium"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() =>
                    openEnquiryModal({
                      product: `Project Case Study Inquiry: ${project.title}`,
                      segment: project.segment,
                    })
                  }
                  className="w-full py-2.5 bg-[#22262A] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B08D57] transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Enquire for Similar Project</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B08D57]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
