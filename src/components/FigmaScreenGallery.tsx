import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FIGMA_SCREENS,
  FIGMA_DESIGN_URL,
  type FigmaScreenItem,
} from '../data/caseStudyData';
import {
  Figma,
  ExternalLink,
  Maximize2,
  X,
  Eye,
  Layers,
} from 'lucide-react';

export const FigmaScreenGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [lightboxItem, setLightboxItem] = useState<FigmaScreenItem | null>(null);

  const categories = [
    { id: 'all', label: 'All UI Artifacts (6)' },
    { id: 'landing', label: 'Landing Pages' },
    { id: 'mobile', label: 'Booking & PDI App' },
    { id: 'report', label: 'Live HTML PDI Report' },
    { id: 'dashboard', label: 'MotoDoc & Club Dashboards' },
    { id: 'branding', label: 'Moto365 Rebrand' },
  ];

  const filteredScreens =
    selectedCategory === 'all'
      ? FIGMA_SCREENS
      : FIGMA_SCREENS.filter((item) => item.category === selectedCategory);

  return (
    <section id="screens" className="py-20 border-t border-zinc-200 bg-[#FBFBFC]">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Header & Direct Figma Link with Slide-up & Fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="text-xs text-[#FF0055] font-bold uppercase tracking-wider font-mono-tabular mb-2">
              05. Design System & Production UI Gallery · Figma Node 0-1
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 max-w-2xl text-balance">
              140+ Screens Designed, Shipped & Verified in Production
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
              Inspect the production screens across InspektAI, Assist Booking, MotoDoc × TecDoc, and Moto365 Club. Click any artifact card to open the full-resolution UX specification lightbox or launch the source Figma file directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowAnnotations((v) => !v)}
              className="bg-white border border-zinc-300 hover:border-zinc-400 px-5 py-2.5 rounded-full text-xs font-bold text-zinc-800 flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-[#FF5500]" />
              {showAnnotations ? 'Hide UX Callouts' : 'Show UX Callouts'}
            </button>
            <a
              href={FIGMA_DESIGN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-moto-black px-6 py-2.5 text-xs font-bold flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
            >
              <Figma className="w-3.5 h-3.5 text-[#E6FF00]" />
              Open Source Figma File
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Interactive Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-zinc-100 p-1.5 rounded-full mb-8 border border-zinc-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-black text-white shadow-sm'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Screen Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScreens.map((screen, idx) => (
            <motion.article
              key={screen.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: (idx % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="skeuo-chassis rounded-2xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-shadow"
            >
              <div>
                {/* Media Container with Fallback & Measured Scrim */}
                <div className="relative h-52 bg-zinc-900 overflow-hidden border-b border-white/10">
                  <img
                    src={screen.previewImage}
                    alt={screen.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono-tabular text-zinc-200">
                    <span>{screen.product}</span>
                    <button
                      type="button"
                      onClick={() => setLightboxItem(screen)}
                      aria-label={`Inspect ${screen.title}`}
                      className="skeuo-button px-2.5 py-1.5 rounded-lg text-xs text-white flex items-center gap-1"
                    >
                      <Maximize2 className="w-3 h-3 text-[#F59E0B]" />
                      Inspect Spec
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[11px] font-mono-tabular text-[#F59E0B]">
                      {screen.figmaNodeLabel}
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug mt-0.5">
                      {screen.title}
                    </h3>
                  </div>
                </div>

                {/* Problem / Decision Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-zinc-300">
                      UX Friction Identified
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      {screen.problemSolved}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-zinc-300">
                      Architectural Solution
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      {screen.designDecision}
                    </p>
                  </div>

                  {showAnnotations && (
                    <div className="skeuo-recessed rounded-xl p-3 space-y-1.5">
                      <div className="text-[11px] font-mono-tabular text-[#F59E0B] flex items-center gap-1.5">
                        <Layers className="w-3 h-3" />
                        KEY COMPONENT HIGHLIGHTS
                      </div>
                      {screen.uiHighlights.map((hl, i) => (
                        <div
                          key={i}
                          className="text-xs text-zinc-300 flex items-start gap-2"
                        >
                          <span className="font-mono-tabular text-zinc-500">·</span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Proof & Live Link */}
              <div className="px-5 py-3.5 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                <span className="font-mono-tabular text-emerald-400 font-medium truncate">
                  {screen.impactStat}
                </span>
                <a
                  href={screen.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#F59E0B] font-medium flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  Visit Live Site
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <div className="skeuo-chassis rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b border-white/10">
                <div>
                  <div className="text-xs font-mono-tabular text-[#F59E0B]">
                    {lightboxItem.figmaNodeLabel} · {lightboxItem.product}
                  </div>
                  <h3 id="lightbox-title" className="text-2xl font-bold text-white mt-1">
                    {lightboxItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxItem(null)}
                  aria-label="Close specification modal"
                  className="skeuo-button p-2 rounded-lg text-zinc-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                  <img
                    src={lightboxItem.previewImage}
                    alt={lightboxItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                </div>
                <div className="lg:col-span-5 space-y-4">
                  <div className="skeuo-recessed rounded-xl p-4">
                    <div className="text-xs font-mono-tabular text-zinc-400">
                      VERIFIED PRODUCTION OUTCOME
                    </div>
                    <div className="text-base font-bold text-[#F59E0B] mt-1">
                      {lightboxItem.impactStat}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Problem Solved
                    </div>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                      {lightboxItem.problemSolved}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      UX & Engineering Execution
                    </div>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                      {lightboxItem.designDecision}
                    </p>
                  </div>
                  <div className="pt-3 flex flex-wrap gap-3">
                    <a
                      href={lightboxItem.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skeuo-amber-cta px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      Open {lightboxItem.product}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={FIGMA_DESIGN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skeuo-button px-4 py-2 rounded-lg text-xs font-medium text-white flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <Figma className="w-3.5 h-3.5 text-[#F59E0B]" />
                      Inspect in Figma
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
