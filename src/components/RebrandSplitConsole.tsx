import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  simulateOperationsImpact,
} from '../utils/caseStudyLogic';
import { MULTIPLE_HATS } from '../data/caseStudyData';
import {
  ArrowRightLeft,
  Cpu,
  Layers,
  ExternalLink,
  Compass,
  Gauge,
} from 'lucide-react';

export const RebrandSplitConsole: React.FC = () => {
  const [brandEra, setBrandEra] = useState<'automoto-2025' | 'moto365-2026'>('moto365-2026');
  const [showLogoGrid, setShowLogoGrid] = useState<boolean>(true);
  const [activeHatId, setActiveHatId] = useState<string>(MULTIPLE_HATS[0].id);

  // Operations & AI Workflow Simulator State
  const [monthlyInspections, setMonthlyInspections] = useState<number>(380);
  const [garageJobCards, setGarageJobCards] = useState<number>(290);
  const [aiAutomationEnabled, setAiAutomationEnabled] = useState<boolean>(true);
  const [tecdocIntegrated, setTecdocIntegrated] = useState<boolean>(true);

  const simMetrics = simulateOperationsImpact({
    monthlyInspections,
    garageJobCards,
    aiAutomationEnabled,
    tecdocIntegrated,
  });

  const activeHat =
    MULTIPLE_HATS.find((h) => h.id === activeHatId) || MULTIPLE_HATS[0];

  return (
    <section id="rebrand-split" className="py-20 border-t border-zinc-200 bg-white">
      <div className="max-w-[1240px] mx-auto px-6 space-y-20">
        {/* Part 1: The April 2026 Corporate Split & Brand Evolution with Slide-up & Fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs text-[#5B45FF] font-bold uppercase tracking-wider font-mono-tabular mb-2">
                03. Corporate Split & Identity Architecture · Feb 2025 → April 2026
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 max-w-2xl text-balance">
                From Automoto to Moto365:
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
                Joined Automoto in February 2025 to architect the product suite from scratch. In April 2026, the company split—Automoto became a separate entity while our entire team and product ecosystem continued under the new flagship name <strong className="text-zinc-950 font-bold">Moto365</strong>.
              </p>
            </div>

            {/* Era Toggle Switch */}
            <div className="flex items-center gap-2 bg-zinc-100 p-1.5 rounded-full shrink-0 border border-zinc-200">
              <button
                type="button"
                onClick={() => setBrandEra('automoto-2025')}
                className={`px-5 py-2 text-xs font-bold rounded-full whitespace-nowrap shrink-0 transition-all ${
                  brandEra === 'automoto-2025'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                Feb 2025: Automoto Origin
              </button>
              <button
                type="button"
                onClick={() => setBrandEra('moto365-2026')}
                className={`px-5 py-2 text-xs font-bold rounded-full whitespace-nowrap shrink-0 transition-all ${
                  brandEra === 'moto365-2026'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                April 2026: Moto365 Rebrand
              </button>
            </div>
          </div>

          {/* Interactive Rebranding Comparison Deck */}
          <div className="skeuo-chassis rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 6 Cols: Interactive SVG Vector Logo & Construction Grid */}
            <div className="lg:col-span-6 skeuo-recessed rounded-xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono-tabular text-zinc-400">
                  {brandEra === 'moto365-2026'
                    ? 'MOTO365 MASTER MARK · 365° TELEMETRY GEOMETRY'
                    : 'LEGACY AUTOMOTO MARK · FEB 2025 – MAR 2026'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowLogoGrid((prev) => !prev)}
                  className="skeuo-button px-3 py-1.5 rounded-lg text-xs font-mono-tabular text-zinc-300 hover:text-white whitespace-nowrap shrink-0"
                >
                  {showLogoGrid ? 'Hide Bezier Grid' : 'Show Bezier Grid'}
                </button>
              </div>

              {/* Vector Logo Canvas */}
              <div className="my-8 flex items-center justify-center relative min-h-[210px]">
                <svg
                  viewBox="0 0 420 160"
                  className="w-full max-w-[380px] h-auto"
                  role="img"
                  aria-label="Interactive Brand Logo Geometry"
                >
                  {showLogoGrid && (
                    <g stroke="rgba(245, 158, 11, 0.18)" strokeWidth="1" strokeDasharray="3 3">
                      <line x1="0" y1="30" x2="420" y2="30" />
                      <line x1="0" y1="80" x2="420" y2="80" />
                      <line x1="0" y1="130" x2="420" y2="130" />
                      <line x1="80" y1="0" x2="80" y2="160" />
                      <line x1="150" y1="0" x2="150" y2="160" />
                      <circle cx="80" cy="80" r="52" fill="none" />
                      <circle cx="80" cy="80" r="34" fill="none" />
                    </g>
                  )}

                  {brandEra === 'moto365-2026' ? (
                    <g>
                      {/* Moto365 Precision Ring & Tachometer Needle Emblem */}
                      <circle
                        cx="80"
                        cy="80"
                        r="48"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="8"
                        strokeDasharray="245 60"
                        strokeLinecap="round"
                      />
                      <path
                        d="M58 98 L80 52 L102 98 L89 98 L80 76 L71 98 Z"
                        fill="#FFFFFF"
                      />
                      <circle cx="114" cy="48" r="6" fill="#F59E0B" />
                      <text
                        x="152"
                        y="86"
                        fill="#FFFFFF"
                        fontFamily="Bricolage Grotesque, sans-serif"
                        fontWeight="700"
                        fontSize="42"
                        letterSpacing="-1"
                      >
                        MOTO
                      </text>
                      <text
                        x="282"
                        y="86"
                        fill="#F59E0B"
                        fontFamily="Bricolage Grotesque, sans-serif"
                        fontWeight="700"
                        fontSize="42"
                        letterSpacing="-1"
                      >
                        365
                      </text>
                      <text
                        x="154"
                        y="112"
                        fill="#A1A1AA"
                        fontFamily="JetBrains Mono, monospace"
                        fontSize="11"
                        letterSpacing="1.5"
                      >
                        INSPEKTAI · MOTODOC · CLUB
                      </text>
                    </g>
                  ) : (
                    <g>
                      {/* Legacy Automoto Feb 2025 Mark */}
                      <rect
                        x="36"
                        y="36"
                        width="88"
                        height="88"
                        rx="18"
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="6"
                      />
                      <path
                        d="M56 102 L80 54 L104 102 M64 86 L96 86"
                        stroke="#FFFFFF"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <text
                        x="148"
                        y="86"
                        fill="#E4E4E7"
                        fontFamily="Bricolage Grotesque, sans-serif"
                        fontWeight="700"
                        fontSize="38"
                        letterSpacing="-0.5"
                      >
                        AUTOMOTO
                      </text>
                      <text
                        x="150"
                        y="112"
                        fill="#93C5FD"
                        fontFamily="JetBrains Mono, monospace"
                        fontSize="11"
                        letterSpacing="1"
                      >
                        2025 LEGACY IDENTITY (PRE-SPLIT)
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                <span>
                  {brandEra === 'moto365-2026'
                    ? 'Primary Accent: #F59E0B (Tachometer Amber) · Surface: #0B0C0E'
                    : 'Legacy Accent: #60A5FA (Service Blue) · Disconnected Sub-brands'}
                </span>
                <a
                  href="https://moto365.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F59E0B] hover:underline flex items-center gap-1 font-medium"
                >
                  moto365.in
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right 6 Cols: Continuity & Architecture Details */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono-tabular text-zinc-400 mb-2">
                  CONTINUITY OF PRODUCT SUITE ACROSS THE SPLIT
                </div>
                <h3 className="text-xl font-bold text-white">
                  {brandEra === 'moto365-2026'
                    ? 'April 2026: Re-hired Under Moto365 with Full Product Ownership'
                    : 'Feb 2025 – Mar 2026: Building the Zero-to-One Foundation at Automoto'}
                </h3>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                  {brandEra === 'moto365-2026'
                    ? 'When the corporate split occurred in April 2026, Automoto spun off as a separate company while all core products we designed—InspektAI, MotoDoc × TecDoc, Moto365 Club, and the Inspector PDI App—continued seamlessly under Moto365.'
                    : 'Starting in February 2025 at Automoto, I mapped the fragmented Indian automotive service landscape and designed the core screens for used/new car PDI, workshop management, and enthusiast community engagement.'}
                </p>

                <div className="mt-6 space-y-3">
                  <div className="skeuo-recessed rounded-xl p-4">
                    <div className="text-xs font-mono-tabular text-[#F59E0B]">
                      01. Design Token Decoupling
                    </div>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                      Migrated 140+ Figma screens from Automoto blue to Moto365 industrial amber/obsidian tokens in 72 hours using semantic variables.
                    </p>
                  </div>
                  <div className="skeuo-recessed rounded-xl p-4">
                    <div className="text-xs font-mono-tabular text-[#F59E0B]">
                      02. Sub-Brand Trust Preservation
                    </div>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                      Added "A Moto365 Initiative" trust lockups to InspektAI (`inspektai.in`) and MotoDoc (`motodoc.in`) so returning customers experienced zero confusion.
                    </p>
                  </div>
                  <div className="skeuo-recessed rounded-xl p-4">
                    <div className="text-xs font-mono-tabular text-[#F59E0B]">
                      03. Future-Ready E-Commerce & Services Architecture
                    </div>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                      Designed modular navigation and checkout components ready for spare-parts e-commerce and doorstep service expansion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-zinc-400">
                  Toggle era to compare brand geometry
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setBrandEra((prev) =>
                      prev === 'moto365-2026' ? 'automoto-2025' : 'moto365-2026'
                    )
                  }
                  className="skeuo-button px-4 py-2 rounded-lg text-xs font-medium text-white flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Switch to {brandEra === 'moto365-2026' ? 'Feb 2025 Automoto' : 'April 2026 Moto365'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Part 2: Wearing Multiple Hats Interactive Selector + AI Operations Simulator */}
        <motion.div
          id="ux-process"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 border-t border-zinc-200"
        >
          <div className="mb-10">
            <div className="text-xs text-[#FF4D15] font-bold uppercase tracking-wider font-mono-tabular mb-2">
              04. Cross-Functional Impact · Wearing Multiple Hats
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 max-w-2xl text-balance">
              More Than Screens: UX Research, AI Automation & Ground Operations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
              In a fast-moving automotive startup, I didn't stop at Figma handoffs. Select each role below to inspect how I combined UI/UX design, brand architecture, AI workflow engineering, and daily operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 Cols: Role Hat Selector Deck */}
            <div className="lg:col-span-7 skeuo-chassis rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                  {MULTIPLE_HATS.map((hat, idx) => (
                    <button
                      key={hat.id}
                      type="button"
                      onClick={() => setActiveHatId(hat.id)}
                      className={`p-3 rounded-xl text-left transition-all ${
                        activeHatId === hat.id
                          ? 'skeuo-button skeuo-button-active'
                          : 'skeuo-button'
                      }`}
                    >
                      <div className="text-[11px] font-mono-tabular text-[#F59E0B]">
                        HAT 0{idx + 1}
                      </div>
                      <div className="text-xs font-semibold text-white mt-1 truncate">
                        {hat.title}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="skeuo-recessed rounded-xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {activeHat.title}
                      </h3>
                      <div className="text-xs text-zinc-400 font-mono-tabular mt-0.5">
                        Active Tenure: {activeHat.period}
                      </div>
                    </div>
                    <span className="text-xs font-mono-tabular text-[#F59E0B] font-semibold">
                      {activeHat.artifactMetric}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                    {activeHat.summary}
                  </p>

                  <div className="space-y-3 mb-6">
                    {activeHat.responsibilities.map((resp, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300"
                      >
                        <span className="font-mono-tabular text-[#F59E0B] font-semibold mt-0.5">
                          0{index + 1}.
                        </span>
                        <span className="leading-relaxed">{resp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="skeuo-chassis rounded-lg p-3.5 font-mono-tabular text-xs text-zinc-300">
                    <div className="text-[11px] text-zinc-400 mb-1">
                      SYSTEM ARCHITECTURE PIPELINE · {activeHat.artifactTitle}
                    </div>
                    <div className="text-[#F59E0B]">{activeHat.codeOrSystemSnippet}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Interactive Operations & Conversion ROI Calculator */}
            <div className="lg:col-span-5 skeuo-chassis rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div>
                    <div className="text-xs font-mono-tabular text-[#F59E0B]">
                      OPERATIONS & FUNNEL SIMULATOR
                    </div>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      Verify UX & AI Workflow Impact
                    </h3>
                  </div>
                  <Gauge className="w-5 h-5 text-[#F59E0B]" />
                </div>

                {/* Sliders & Hardware Toggles */}
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <label htmlFor="monthly-pdi-slider" className="text-zinc-300">
                        Monthly InspektAI PDI Volume
                      </label>
                      <span className="font-mono-tabular text-[#F59E0B] font-semibold">
                        {monthlyInspections} cars / mo
                      </span>
                    </div>
                    <input
                      id="monthly-pdi-slider"
                      type="range"
                      min={100}
                      max={1000}
                      step={20}
                      value={monthlyInspections}
                      onChange={(e) => setMonthlyInspections(Number(e.target.value))}
                      className="w-full accent-[#F59E0B] cursor-pointer h-2 bg-zinc-800 rounded-lg"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <label htmlFor="garage-jobs-slider" className="text-zinc-300">
                        Monthly MotoDoc Garage Job Cards
                      </label>
                      <span className="font-mono-tabular text-[#F59E0B] font-semibold">
                        {garageJobCards} job cards / mo
                      </span>
                    </div>
                    <input
                      id="garage-jobs-slider"
                      type="range"
                      min={50}
                      max={800}
                      step={25}
                      value={garageJobCards}
                      onChange={(e) => setGarageJobCards(Number(e.target.value))}
                      className="w-full accent-[#F59E0B] cursor-pointer h-2 bg-zinc-800 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setAiAutomationEnabled((v) => !v)}
                      aria-pressed={aiAutomationEnabled}
                      className={`p-3 rounded-xl text-left ${
                        aiAutomationEnabled
                          ? 'skeuo-button skeuo-button-active'
                          : 'skeuo-button'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono-tabular">
                        <Cpu className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span className={aiAutomationEnabled ? 'text-emerald-400' : 'text-zinc-400'}>
                          {aiAutomationEnabled ? 'ACTIVE' : 'BYPASSED'}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-white mt-1.5">
                        AI Report & Assist Funnel
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTecdocIntegrated((v) => !v)}
                      aria-pressed={tecdocIntegrated}
                      className={`p-3 rounded-xl text-left ${
                        tecdocIntegrated
                          ? 'skeuo-button skeuo-button-active'
                          : 'skeuo-button'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono-tabular">
                        <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span className={tecdocIntegrated ? 'text-emerald-400' : 'text-zinc-400'}>
                          {tecdocIntegrated ? 'LINKED' : 'MANUAL'}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-white mt-1.5">
                        TecDoc OEM Catalog
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Resulting Telemetry Readouts */}
              <div className="skeuo-recessed rounded-xl p-4 mt-6 space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-white/[0.02]">
                    <div className="text-[11px] text-zinc-400">Sales Lift</div>
                    <div className="text-lg font-bold font-mono-tabular text-[#F59E0B] mt-0.5">
                      +{simMetrics.projectedSalesLiftPercent}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02]">
                    <div className="text-[11px] text-zinc-400">Booking Time</div>
                    <div className="text-lg font-bold font-mono-tabular text-white mt-0.5">
                      -{simMetrics.bookingTimeSavedPercent}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02]">
                    <div className="text-[11px] text-zinc-400">Ops & Admin</div>
                    <div className="text-lg font-bold font-mono-tabular text-emerald-400 mt-0.5">
                      +{simMetrics.opsSpeedupPercent}%
                    </div>
                  </div>
                </div>
                <div className="text-xs text-zinc-400 font-mono-tabular flex items-center justify-between pt-2 border-t border-white/10">
                  <span>Avg Checkout: {simMetrics.bookingTimeMinutes} mins</span>
                  <span>Admin Load: {simMetrics.adminHoursPerMonth} hrs/mo</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
