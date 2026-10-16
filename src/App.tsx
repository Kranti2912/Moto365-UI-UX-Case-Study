import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LIVE_PRODUCTS,
  FIGMA_DESIGN_URL,
  GENERATED_IMAGES,
} from './data/caseStudyData';
import { MotoBentoGrid } from './components/MotoBentoGrid';
import { SubBrandLockup } from './components/MotoLogo';
import { SkeuomorphicPdiLab } from './components/SkeuomorphicPdiLab';
import { RebrandSplitConsole } from './components/RebrandSplitConsole';
import { FigmaScreenGallery } from './components/FigmaScreenGallery';
import { validateReviewRequest } from './utils/caseStudyLogic';
import {
  ExternalLink,
  Figma,
  ArrowUpRight,
  CheckCircle2,
  Send,
  Wrench,
  ShieldCheck,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [activeProductId, setActiveProductId] = useState<string>(LIVE_PRODUCTS[0].id);
  const [tecdocVinQuery, setTecdocVinQuery] = useState<string>('TMBJB7NE4N0019482');
  const [selectedPartCategory, setSelectedPartCategory] = useState<'brakes' | 'timing' | 'suspension'>('brakes');

  // Hiring Manager / Recruiter Walkthrough Request Form State
  const [recruiterName, setRecruiterName] = useState('');
  const [companyOrTeam, setCompanyOrTeam] = useState('');
  const [email, setEmail] = useState('');
  const [interestRole, setInterestRole] = useState('Product & UI/UX Designer (Full-Stack / AI Ops)');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedReviews, setSubmittedReviews] = useState<
    Array<{ name: string; company: string; role: string; timestamp: string }>
  >([]);

  const tecdocCatalogLookup = {
    brakes: {
      oemCode: 'TECDOC-8DB-355-023',
      partName: 'Brembo Prime Front Ceramic Brake Pad Set',
      fitmentStatus: 'Exact VIN Match · Octavia 2.0 TSI / Superb B8',
      installLaborMins: 45,
      priceInr: 'INR 6,850',
    },
    timing: {
      oemCode: 'TECDOC-CT1188WP2',
      partName: 'Continental Timing Chain & Water Pump Kit',
      fitmentStatus: 'Exact VIN Match · EA888 Gen3B Engine',
      installLaborMins: 160,
      priceInr: 'INR 19,400',
    },
    suspension: {
      oemCode: 'TECDOC-22-230522',
      partName: 'Bilstein B4 OE Replacement Front Strut Assembly',
      fitmentStatus: 'Exact VIN Match · MQB Platform 55mm Strut',
      installLaborMins: 90,
      priceInr: 'INR 14,200',
    },
  };

  const activePart = tecdocCatalogLookup[selectedPartCategory];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateReviewRequest({
      recruiterName,
      companyOrTeam,
      email,
      interestRole,
      notes,
    });

    if (!validation.valid) {
      setFormError(validation.error || 'Please check your input fields.');
      return;
    }

    setFormError(null);
    setSubmittedReviews((prev) => [
      {
        name: recruiterName.trim(),
        company: companyOrTeam.trim(),
        role: interestRole,
        timestamp: 'Confirmed for Live Figma Walkthrough',
      },
      ...prev,
    ]);
    setRecruiterName('');
    setCompanyOrTeam('');
    setEmail('');
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans">
      {/* Top Rainbow Spectrum Bar from Reference Image */}
      <div className="spectrum-bar" />

      {/* Clean White Top Bar matching Reference Image */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-4">
          {/* Brand Lockup */}
          <a href="#top" className="flex items-center gap-2 group">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950 font-sans">
                UI/UX Live project
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-zinc-700"
          >
            <a href="#products" className="hover:text-black transition-colors">
              Products
            </a>
            <a href="#pdi-lab" className="hover:text-black transition-colors">
              PDI Lab
            </a>
            <a href="#rebrand-split" className="hover:text-black transition-colors">
              Rebrand Split
            </a>
            <a href="#ux-process" className="hover:text-black transition-colors">
              UX Process
            </a>
            <a href="#screens" className="hover:text-black transition-colors">
              Figma Screens
            </a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#top"
              onClick={(e) => {
                if (window.history.length > 1) {
                  e.preventDefault();
                  window.history.back();
                }
              }}
              className="btn-moto-black px-5 py-2.5 text-xs font-bold shadow-sm whitespace-nowrap cursor-pointer"
            >
              Go Back
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Section: Clean White with Subtle Polygonal Grey Facet + Script Motto */}
        <section className="hero-facet-bg pt-14 pb-20 sm:pt-20 sm:pb-24 border-b border-zinc-200">
          <div className="max-w-[1240px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Signature Cursive Motto from Screenshot */}
              <div className="font-script text-3xl sm:text-4xl text-zinc-900 font-bold tracking-wide mb-2">
                Own. Drive. Thrive.
              </div>

              {/* Signature Massive Headline from Screenshot */}
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-zinc-950 leading-[1.05] max-w-4xl text-balance">
                India’s first next-generation vehicle lifetime ecosystem
              </h1>

              {/* Case Study Context & Executive Overview */}
              <p className="mt-6 text-base sm:text-xl text-zinc-600 leading-relaxed max-w-3xl">
                From February 2025 at Automoto through the April 2026 corporate split into <strong className="text-zinc-950 font-bold">Moto365</strong>, I served as lead product designer, brand architect, live HTML engineer, and AI operations lead—shipping 5 production platforms that drove a <strong className="text-zinc-950 font-bold">45%–60% sales lift</strong>, <strong className="text-zinc-950 font-bold">20% reduced booking time</strong>, and <strong className="text-zinc-950 font-bold">40% faster operations</strong>.
              </p>

              {/* Primary Action Buttons & Live URLs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#products"
                  className="btn-moto-black px-8 py-3.5 text-sm font-bold flex items-center gap-2 shadow-md whitespace-nowrap"
                >
                  Explore 4 Ecosystem Pillars
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Live Production Deployments Bar */}
              <div className="mt-10 pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-y-2 text-xs text-zinc-500 font-medium">
                <span className="font-mono-tabular text-zinc-900 font-bold mr-2 uppercase tracking-wider">
                  Live Platforms:
                </span>
                <a
                  href="https://www.inspektai.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-800 hover:text-[#FF4D15] underline underline-offset-4"
                >
                  inspektai.in
                </a>
                <span className="mx-2 text-zinc-400">·</span>
                <a
                  href="https://assist.inspektai.in/start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-800 hover:text-[#FF4D15] underline underline-offset-4"
                >
                  assist.inspektai.in/start
                </a>
                <span className="mx-2 text-zinc-400">·</span>
                <a
                  href="https://moto365.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-800 hover:text-[#FF4D15] underline underline-offset-4"
                >
                  moto365.in
                </a>
                <span className="mx-2 text-zinc-400">·</span>
                <a
                  href="https://motodoc.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-800 hover:text-[#FF0055] underline underline-offset-4"
                >
                  motodoc.in
                </a>
                <span className="mx-2 text-zinc-400">·</span>
                <a
                  href="https://www.moto365.club/app/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-800 hover:text-[#7B2CBF] underline underline-offset-4"
                >
                  moto365.club/app/dashboard
                </a>
              </div>
            </motion.div>

            {/* 4 Dark Bento Product Cards exactly like Screenshot */}
            <div id="products" className="mt-14">
              <MotoBentoGrid
                onSelectProduct={(id) => setActiveProductId(id)}
                activeProductId={activeProductId}
              />
            </div>

            {/* Verified Performance Metric Pills with Staggered Scroll Entrance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {[
                {
                  label: 'INSPEKTAI CONVERSION',
                  color: 'text-[#FF4D15]',
                  value: '+45%–60%',
                  title: 'Increase in Sales',
                  desc: 'Live HTML inspection reports replaced opaque PDFs.',
                },
                {
                  label: 'ASSIST BOOKING FUNNEL',
                  color: 'text-[#000000]',
                  value: '-20%',
                  title: 'Reduced Booking Time',
                  desc: 'Streamlined assist.inspektai.in/start into a 3-step selector.',
                },
                {
                  label: 'MOTODOC × TECDOC OS',
                  color: 'text-[#FF0055]',
                  value: '+40%',
                  title: 'Faster Operations & Admin',
                  desc: 'Unified job cards, VIN lookup & auto customer estimates.',
                },
                {
                  label: 'APRIL 2026 REBRAND',
                  color: 'text-[#5B45FF]',
                  value: '100%',
                  title: 'Zero-Downtime Transition',
                  desc: 'Automoto split into Moto365 without breaking live user apps.',
                },
              ].map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`text-[11px] font-mono-tabular font-bold ${metric.color} uppercase tracking-wider`}>
                    {metric.label}
                  </div>
                  <div className="text-3xl font-extrabold font-mono-tabular text-zinc-950 mt-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-bold text-zinc-800 mt-1">
                    {metric.title}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {metric.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            PRODUCT 1: MOTO365 CLUB (The Super App for Automobile Lifestyle)
            Layout matching screenshot: Left text, Right electric yellow blob with mockup
        ========================================================================= */}
        <section id="moto365-club" className="py-24 border-b border-zinc-200 bg-white overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Brand lockup + Editorial copy with Slide-up & Fade-in */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-6"
              >
                <SubBrandLockup brand="club" />
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                  The Super App for Automobile Lifestyle
                </h2>
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                  Moto365 Club is a thriving automotive community where the passion for mobility never stops. From discovering hidden car culture and joining unforgettable drives to accessing trusted services, upgrades, events, and industry insights, everything comes together in one connected ecosystem.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Built for enthusiasts, vehicle owners, explorers, and the endlessly curious, the community brings like-minded people together to share experiences, knowledge, and opportunities. More than just a platform, Moto365 Club transforms everyday vehicle ownership into a richer, more engaging journey driven by connection, discovery, and a shared love for all things automotive.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="https://www.moto365.club/app/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-moto-black px-7 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    EXPLORE MOTO365 CLUB
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={FIGMA_DESIGN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-zinc-100 hover:bg-zinc-200 px-6 py-3.5 rounded-full text-xs font-bold text-zinc-800 flex items-center gap-2"
                  >
                    <Figma className="w-3.5 h-3.5 text-black" />
                    Club Dashboard UI in Figma
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Electric Yellow Organic Blob with Mockups */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]"
              >
                <div className="absolute w-[440px] h-[440px] sm:w-[500px] sm:h-[500px] blob-yellow opacity-95 transition-transform duration-500 hover:rotate-3" />

                {/* Overlaid UI Mockup Containers */}
                <div className="relative z-10 w-full max-w-[480px]">
                  {/* Tablet Web Dashboard Mockup with Micro-interaction */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl p-4 shadow-2xl border-4 border-black transform -rotate-2 hover:rotate-0 transition-transform"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-200 text-xs font-mono-tabular">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        <span className="text-zinc-600 font-bold ml-2">moto365.club/app</span>
                      </div>
                      <span className="text-zinc-400">Verified Member</span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="col-span-2 rounded-xl overflow-hidden h-36 bg-zinc-900">
                        <img
                          src={GENERATED_IMAGES.moto365Club}
                          alt="Moto365 Club Community"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="col-span-1 bg-zinc-50 rounded-xl p-2.5 flex flex-col justify-between text-[11px]">
                        <div>
                          <div className="font-bold text-zinc-900">Weekend Run</div>
                          <div className="text-zinc-500 text-[10px]">Sunday, 6:00 AM</div>
                          <div className="mt-1 text-xs font-bold text-emerald-600">42 Cars RSVP</div>
                        </div>
                        <div className="bg-black text-white text-center py-1 rounded-md font-bold text-[10px]">
                          Join Convoy
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Mobile App Screen Floating on top with Micro-interaction */}
                  <motion.div
                    whileHover={{ y: -6, rotate: 1 }}
                    transition={{ duration: 0.25 }}
                    className="absolute -bottom-8 -right-4 w-44 bg-zinc-950 text-white rounded-2xl p-3 shadow-2xl border-2 border-zinc-800 transform rotate-3"
                  >
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-2">
                      <span>Live Garage</span>
                      <span className="text-[#E6FF00] font-bold">● LIVE</span>
                    </div>
                    <div className="bg-zinc-900 rounded-lg p-2 text-[11px]">
                      <div className="font-bold text-white">BMW 330i M Sport</div>
                      <div className="text-[9px] text-zinc-400">Stage 1 ECU + Remus</div>
                      <div className="mt-1 text-[10px] font-bold text-[#E6FF00]">
                        ✓ InspektAI Score 96
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PRODUCT 2: INSPEKTAI (AI-Powered Automotive Inspection Engine)
            Layout matching screenshot: Left fiery orange blob with Inspection Summary, Right copy
        ========================================================================= */}
        <section id="inspektai" className="py-24 border-b border-zinc-200 bg-[#FAFAFA] overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Fiery Orange Blob with Inspection Summary Tablet Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] order-2 lg:order-1"
              >
                <div className="absolute w-[440px] h-[440px] sm:w-[500px] sm:h-[500px] blob-orange opacity-95 transition-transform duration-500 hover:scale-105" />

                {/* Inspection Summary Tablet UI Card matching screenshot with Micro-interaction */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(255, 77, 21, 0.22)' }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10 w-full max-w-[460px] bg-white rounded-2xl p-5 sm:p-6 shadow-2xl border-4 border-black"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
                    <div className="font-extrabold text-sm text-zinc-900 tracking-tight">
                      Inspection Summary
                    </div>
                    <span className="text-[10px] font-mono-tabular bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                      CERTIFIED PDI
                    </span>
                  </div>

                  {/* Score & Car Visualization matching screenshot */}
                  <div className="flex items-center gap-4 mb-5">
                    {/* Circular Score Badge 81 Good */}
                    <div className="w-20 h-20 rounded-full border-4 border-emerald-400 flex flex-col items-center justify-center shrink-0">
                      <span className="text-2xl font-extrabold font-mono-tabular text-zinc-950">
                        81
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-bold text-zinc-900">
                        <span>Good</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-snug">
                        Your vehicle is in good condition with normal wear & tear.
                      </p>
                    </div>
                  </div>

                  {/* Red Car Profile Illustration Container */}
                  <div className="bg-zinc-50 rounded-xl p-2.5 mb-5 flex items-center justify-center h-28 overflow-hidden relative">
                    <img
                      src={GENERATED_IMAGES.inspektAiPdi}
                      alt="Car Inspection Profile"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* 6 Subsystem Status Grid matching screenshot */}
                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className="bg-zinc-50 rounded-lg p-2.5 border border-zinc-100">
                      <div className="text-[10px] text-zinc-400 font-medium">Engine</div>
                      <div className="text-emerald-600 font-bold mt-0.5">Good</div>
                    </div>
                    <div className="bg-zinc-50 rounded-lg p-2.5 border border-zinc-100">
                      <div className="text-[10px] text-zinc-400 font-medium">Brakes</div>
                      <div className="text-emerald-600 font-bold mt-0.5">Good</div>
                    </div>
                    <div className="bg-amber-50/60 rounded-lg p-2.5 border border-amber-200">
                      <div className="text-[10px] text-zinc-500 font-medium">Suspension</div>
                      <div className="text-amber-600 font-bold mt-0.5">Warning</div>
                    </div>
                    <div className="bg-zinc-50 rounded-lg p-2.5 border border-zinc-100">
                      <div className="text-[10px] text-zinc-400 font-medium">Tyres</div>
                      <div className="text-emerald-600 font-bold mt-0.5">Good</div>
                    </div>
                    <div className="bg-amber-50/60 rounded-lg p-2.5 border border-amber-200">
                      <div className="text-[10px] text-zinc-500 font-medium">Battery</div>
                      <div className="text-amber-600 font-bold mt-0.5">Attention</div>
                    </div>
                    <div className="bg-zinc-50 rounded-lg p-2.5 border border-zinc-100">
                      <div className="text-[10px] text-zinc-400 font-medium">Fluids</div>
                      <div className="text-emerald-600 font-bold mt-0.5">Good</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column: Editorial Copy + Button */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-6 order-1 lg:order-2"
              >
                <SubBrandLockup brand="inspektai" />
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                  AI-Powered Automotive Inspection Engine
                </h2>
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                  InspektAI is a next-generation automotive intelligence platform transforming vehicle inspections into data-driven decision intelligence. Powered by AI, advanced diagnostics, and predictive analytics, it delivers deeper insights into vehicle condition, authenticity, risk, and future ownership costs.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  The platform enables consumers, dealerships, and mobility businesses to make faster, smarter, and more confident decisions. By turning complex vehicle data into clear, actionable intelligence, InspektAI is redefining trust and transparency across the automotive ecosystem.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="https://www.inspektai.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-moto-black px-7 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    EXPLORE INSPEKTAI
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#pdi-lab"
                    className="bg-[#FF4D15] hover:bg-[#E03E0B] text-white px-6 py-3.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Launch Interactive PDI Lab
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PRODUCT 3: MOTODOC (Next-Gen Garage Operating System)
            Layout matching screenshot: Left text, Right hot crimson circle with tablet & VAHAN 4.0
        ========================================================================= */}
        <section id="motodoc" className="py-24 border-b border-zinc-200 bg-white overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Brand Lockup + Copy with Slide-up */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-6"
              >
                <SubBrandLockup brand="motodoc" />
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                  Next-Gen Garage Operating System
                </h2>
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                  MotoDoc is a next-generation automotive technology platform transforming how vehicle service and mobility businesses operate. Powered by AI, data intelligence, and automation, it unifies diagnostics, inspections, service management, and vehicle insights into a seamless digital ecosystem.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  The platform enables businesses to make faster, smarter decisions, improve operational efficiency, and deliver exceptional customer experiences. By bridging the gap between automotive expertise and modern technology, MotoDoc is building the digital foundation for the future of connected, intelligent mobility.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="https://motodoc.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-moto-black px-7 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    EXPLORE MOTODOC
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Interactive TecDoc Part Lookup Mini-Module */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 mt-6">
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-zinc-500 mb-3">
                    <span className="font-bold text-[#FF0055] flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5" />
                      TECDOC OEM INTEGRATION DEMO
                    </span>
                    <span>VAHAN 4.0 Verified</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {(['brakes', 'timing', 'suspension'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedPartCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                          selectedPartCategory === cat
                            ? 'bg-black text-white'
                            : 'bg-white border border-zinc-200 text-zinc-600 hover:text-black'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-zinc-200 text-xs space-y-1">
                    <div className="flex justify-between font-mono-tabular text-zinc-400">
                      <span>{activePart.oemCode}</span>
                      <span className="font-bold text-zinc-900">{activePart.priceInr}</span>
                    </div>
                    <div className="font-bold text-zinc-900">{activePart.partName}</div>
                    <div className="text-zinc-500 flex justify-between pt-1">
                      <span>{activePart.fitmentStatus}</span>
                      <span className="text-emerald-600 font-bold font-mono-tabular">
                        {activePart.installLaborMins}m labor
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Hot Crimson Circle with Vertical Tablet & VAHAN 4.0 Badge */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]"
              >
                <div className="absolute w-[420px] h-[420px] sm:w-[480px] sm:h-[480px] blob-crimson opacity-95 transition-transform duration-500 hover:scale-105" />

                {/* Vertical Tablet Running MotoDoc with Micro-interaction */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(255, 0, 85, 0.22)' }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10 w-full max-w-[340px] bg-white rounded-3xl p-5 shadow-2xl border-4 border-black"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200 text-xs font-bold text-zinc-900">
                    <span>Customer details</span>
                    <span className="text-zinc-400 font-normal">#JC-09701</span>
                  </div>

                  <div className="space-y-3 mt-3 text-xs">
                    <div className="bg-zinc-50 rounded-lg p-2.5 space-y-0.5">
                      <div className="text-[10px] text-zinc-400">Vehicle details</div>
                      <div className="font-bold text-zinc-900">Škoda Octavia L&K 2.0 TSI</div>
                      <div className="text-zinc-500 text-[11px] font-mono-tabular">
                        KA 01 AB 0234 · Petrol · 2022
                      </div>
                    </div>

                    <div className="bg-zinc-50 rounded-lg p-2.5">
                      <div className="text-[10px] text-zinc-400">Service History</div>
                      <div className="text-zinc-800 text-[11px] font-medium mt-0.5">
                        60,000 km Major Service + DSG Fluid
                      </div>
                    </div>
                  </div>

                  {/* VAHAN 4.0 Badge from screenshot */}
                  <div className="mt-6 pt-3 border-t border-zinc-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-black" />
                      <div className="text-left">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-black">
                          VAHAN 4.0
                        </div>
                        <div className="text-[9px] text-zinc-400">MoRTH Govt API</div>
                      </div>
                    </div>
                    <div className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full">
                      Linked
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PRODUCT 4: MOTO AKADEMIE & CORPORATE REBRAND SPLIT
            Layout matching screenshot: Left purple arched blob with workshop photos, Right copy
        ========================================================================= */}
        <section id="moto-akademie" className="py-24 border-b border-zinc-200 bg-[#FAFAFA] overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Royal Purple Arched Blob with Training Workshop Photo Montage */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] order-2 lg:order-1"
              >
                <div className="absolute w-[440px] h-[460px] sm:w-[480px] sm:h-[500px] blob-purple opacity-95 transition-transform duration-500 hover:scale-105" />

                {/* Overlaid Photo Montage matching screenshot */}
                <div className="relative z-10 w-full max-w-[440px] space-y-3">
                  <motion.div
                    whileHover={{ y: -4, rotate: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl p-2.5 shadow-2xl border-4 border-black transform -rotate-2"
                  >
                    <div className="rounded-xl overflow-hidden h-36 bg-zinc-900">
                      <img
                        src={GENERATED_IMAGES.heroEcosystem}
                        alt="Automotive Training Workshop"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 transform rotate-1">
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white rounded-xl p-2 shadow-xl border-2 border-black"
                    >
                      <div className="rounded-lg overflow-hidden h-28 bg-zinc-900">
                        <img
                          src={GENERATED_IMAGES.inspektAiPdi}
                          alt="Hands-On EV Diagnostic Session"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white rounded-xl p-2 shadow-xl border-2 border-black"
                    >
                      <div className="rounded-lg overflow-hidden h-28 bg-zinc-900">
                        <img
                          src={GENERATED_IMAGES.motodocGarage}
                          alt="Workshop Bay Training"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Editorial Copy with Slide-up */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-6 order-1 lg:order-2"
              >
                <SubBrandLockup brand="akademie" />
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                  Transforming India's Automotive Training
                </h2>
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                  Moto Akademie is a next-generation automotive learning platform designed to build the workforce of tomorrow’s mobility industry. Combining hands-on training, industry-led programs, and real-world automotive expertise, it equips learners with practical skills in EV technology, diagnostics, vehicle servicing, and workshop operations.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  The platform bridges the gap between traditional education and industry readiness through immersive learning experiences and career-focused certifications. Backed by advanced automotive technology and service ecosystems, Moto Akademie empowers aspiring professionals to thrive in an evolving, technology-driven automotive landscape.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="#rebrand-split"
                    className="btn-moto-black px-7 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    INSPECT APRIL 2026 REBRAND SPLIT
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            DEEP-DIVE CASE STUDY ARTIFACTS
        ========================================================================= */}
        {/* Artifact 1: Tactile PDI Hardware Console & Live HTML Report */}
        <SkeuomorphicPdiLab />

        {/* Artifact 2: April 2026 Split Studio & Multiple Hats Explorer */}
        <RebrandSplitConsole />

        {/* Artifact 3: 140+ Figma Screen Gallery & Lightbox */}
        <FigmaScreenGallery />

        {/* =========================================================================
            CONTACT / WALKTHROUGH SCHEDULER
        ========================================================================= */}
        <section id="hire-review" className="py-20 border-t border-zinc-200 bg-white">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-5"
              >
                <div className="text-xs font-mono-tabular font-bold text-[#FF4D15] uppercase tracking-wider">
                  06. Ready for High-Ownership Product & Design Roles
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 text-balance">
                  Looking for a Designer Who Ships Live Products & Wears Multiple Hats?
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                  From February 2025 at Automoto through the April 2026 transition to Moto365, I proved that thoughtful UI/UX, tactile visual craft, and AI workflow automation directly move revenue (+45%–60% sales) and operational speed (+40% faster admin flow).
                </p>

                <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-3 shadow-sm">
                  <div className="text-xs font-mono-tabular text-zinc-400 font-bold uppercase tracking-wider">
                    DIRECT VERIFICATION LINKS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <a
                      href={FIGMA_DESIGN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 p-3 rounded-xl text-zinc-900 font-bold flex items-center justify-between"
                    >
                      <span>Figma Master File (Node 0-1)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#FF5500]" />
                    </a>
                    <a
                      href="https://www.inspektai.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 p-3 rounded-xl text-zinc-900 font-bold flex items-center justify-between"
                    >
                      <span>InspektAI (inspektai.in)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#FF5500]" />
                    </a>
                    <a
                      href="https://assist.inspektai.in/start"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 p-3 rounded-xl text-zinc-900 font-bold flex items-center justify-between"
                    >
                      <span>Assist Funnel (3-Step PDI)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#FF5500]" />
                    </a>
                    <a
                      href="https://motodoc.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 p-3 rounded-xl text-zinc-900 font-bold flex items-center justify-between"
                    >
                      <span>MotoDoc × TecDoc (motodoc.in)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#FF0055]" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm"
              >
                <h3 className="text-lg font-bold text-zinc-950 mb-1">
                  Schedule a Live Portfolio & Architecture Walkthrough
                </h3>
                <p className="text-xs text-zinc-500 mb-5">
                  Let's connect for a 1-on-1 walkthrough of the Figma files, live HTML report architecture, or the April 2026 rebrand migration.
                </p>

                <form onSubmit={handleReviewSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="recruiter-name" className="block text-xs font-semibold text-zinc-700 mb-1">
                        Your Name
                      </label>
                      <input
                        id="recruiter-name"
                        type="text"
                        placeholder="e.g. Maya Patel"
                        value={recruiterName}
                        onChange={(e) => setRecruiterName(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-950 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label htmlFor="recruiter-company" className="block text-xs font-semibold text-zinc-700 mb-1">
                        Company / Design Team
                      </label>
                      <input
                        id="recruiter-company"
                        type="text"
                        placeholder="e.g. Cred / Ather / Studio"
                        value={companyOrTeam}
                        onChange={(e) => setCompanyOrTeam(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-950 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="recruiter-email" className="block text-xs font-semibold text-zinc-700 mb-1">
                        Work Email
                      </label>
                      <input
                        id="recruiter-email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-950 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label htmlFor="recruiter-role" className="block text-xs font-semibold text-zinc-700 mb-1">
                        Role Focus
                      </label>
                      <select
                        id="recruiter-role"
                        value={interestRole}
                        onChange={(e) => setInterestRole(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-950 focus:outline-none focus:border-black"
                      >
                        <option value="Product & UI/UX Designer (Full-Stack / AI Ops)">
                          Product & UI/UX Designer
                        </option>
                        <option value="Design Systems & Brand Architect">
                          Design Systems & Brand Architect
                        </option>
                        <option value="Founding Designer / Generalist">
                          Founding Designer / Generalist
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="recruiter-notes" className="block text-xs font-semibold text-zinc-700 mb-1">
                      Specific Topic or Feature to Inspect (Optional)
                    </label>
                    <input
                      id="recruiter-notes"
                      type="text"
                      placeholder="e.g. Live HTML PDI report code, TecDoc API mapping, or April 2026 split"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-950 focus:outline-none focus:border-black"
                    />
                  </div>

                  {formError && (
                    <div
                      role="alert"
                      className="text-xs text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5"
                    >
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full btn-moto-black py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Confirm Walkthrough Request
                  </button>
                </form>

                {submittedReviews.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-zinc-200 space-y-2">
                    <div className="text-xs font-mono-tabular text-emerald-600 font-bold">
                      ✓ WALKTHROUGH SCHEDULED
                    </div>
                    {submittedReviews.map((rev, idx) => (
                      <div
                        key={idx}
                        className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-zinc-900">{rev.name}</span>
                          <span className="text-zinc-500"> · {rev.company}</span>
                        </div>
                        <span className="font-mono-tabular text-[#FF4D15] font-bold">
                          {rev.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
