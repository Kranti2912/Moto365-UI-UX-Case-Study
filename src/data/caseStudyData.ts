import { PdiSubsystem } from '../utils/caseStudyLogic';

export const GENERATED_IMAGES = {
  heroEcosystem: '/src/assets/images/hero_moto365_ecosystem_1792070253608.jpg',
  inspektAiPdi: '/src/assets/images/inspektai_pdi_inspection_1792070254776.jpg',
  motodocGarage: '/src/assets/images/motodoc_tecdoc_garage_1792070255602.jpg',
  moto365Club: '/src/assets/images/moto365_club_community_1792070255767.jpg',
};

export const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/cBTljpC1SByFHeEdXu2xf5/Internship-work?node-id=0-1&t=r3NIC6faFIB42x4Q-1';

export interface LiveProductEntry {
  id: string;
  name: string;
  brandKey: 'club' | 'inspektai' | 'motodoc' | 'akademie';
  formerName: string;
  roleFocus: string;
  category: 'pdi' | 'garage' | 'community' | 'brand' | 'training';
  liveUrl: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  tagline: string;
  heroHeadline: string;
  accentColor: string;
  blobClass: string;
  problemStatement: string;
  uxSolution: string;
  keyMetric: string;
  metricContext: string;
  image: string;
  deliverables: string[];
  tecdocOrAiNote: string;
}

export const LIVE_PRODUCTS: LiveProductEntry[] = [
  {
    id: 'moto365-club',
    name: 'Moto365 Club',
    brandKey: 'club',
    formerName: 'Automoto Enthusiast Hub',
    roleFocus: 'Community UX · Digital Garages · Convoy Route Telemetry',
    category: 'community',
    liveUrl: 'https://www.moto365.club/app/dashboard',
    tagline: 'The super app for automobile lifestyle.',
    heroHeadline: 'The Super App for Automobile Lifestyle',
    accentColor: '#E6FF00',
    blobClass: 'blob-yellow',
    problemStatement:
      'Moto365 Club is a thriving automotive community where the passion for mobility never stops. From discovering hidden car culture and joining unforgettable drives to accessing trusted services, upgrades, events, and industry insights, everything comes together in one connected ecosystem.',
    uxSolution:
      'Built for enthusiasts, vehicle owners, explorers, and the endlessly curious, the community brings like-minded people together to share experiences, knowledge, and opportunities. More than just a platform, Moto365 Club transforms everyday vehicle ownership into a richer, more engaging journey driven by connection, discovery, and a shared love for all things automotive.',
    keyMetric: '3.2× Member Retention',
    metricContext: 'Cross-linked verified PDI ownership badges directly into club garages',
    image: GENERATED_IMAGES.moto365Club,
    deliverables: [
      'Digital Garage Build Logs & Spec Sheets',
      'Sunday Morning Convoy RSVP & Live Pit Stops',
      'Verified InspektAI Vehicle Badge Integration',
      'Dark-Mode Community Web Dashboard',
    ],
    tecdocOrAiNote:
      'Integrated live PDI health badges onto club member profiles, allowing verified car builds to stand out.',
  },
  {
    id: 'inspektai',
    name: 'InspektAI',
    brandKey: 'inspektai',
    formerName: 'Automoto PDI Division',
    roleFocus: 'Lead UI/UX · Conversion Funnel · Live HTML Report Engine',
    category: 'pdi',
    liveUrl: 'https://www.inspektai.in/',
    secondaryUrl: 'https://assist.inspektai.in/start',
    secondaryLabel: 'assist.inspektai.in/start',
    tagline: 'AI-powered automotive inspection engine.',
    heroHeadline: 'AI-Powered Automotive Inspection Engine',
    accentColor: '#FF4D15',
    blobClass: 'blob-orange',
    problemStatement:
      'InspektAI is a next-generation automotive intelligence platform transforming vehicle inspections into data-driven decision intelligence. Powered by AI, advanced diagnostics, and predictive analytics, it delivers deeper insights into vehicle condition, authenticity, risk, and future ownership costs.',
    uxSolution:
      'The platform enables consumers, dealerships, and mobility businesses to make faster, smarter, and more confident decisions. By turning complex vehicle data into clear, actionable intelligence, InspektAI is redefining trust and transparency across the automotive ecosystem.',
    keyMetric: '+45%–60% Sales Increase',
    metricContext: '20% reduction in booking time via guided assist.inspektai.in/start',
    image: GENERATED_IMAGES.inspektAiPdi,
    deliverables: [
      'inspektai.in High-Trust Marketing Landing Page',
      'assist.inspektai.in/start 3-Step Vehicle Selector',
      'Mobile-First Live HTML Customer Report',
      'Inspector Field App with Laser Micrometer Sync',
    ],
    tecdocOrAiNote:
      'Automated raw OBD-II diagnostic payload to HTML report generation in 8 seconds via LLM reasoning pipeline.',
  },
  {
    id: 'motodoc',
    name: 'MotoDoc',
    brandKey: 'motodoc',
    formerName: 'Automoto Garage Suite',
    roleFocus: 'B2B SaaS UX · TecDoc Catalog Integration · Admin Dashboards',
    category: 'garage',
    liveUrl: 'https://motodoc.in/',
    tagline: 'Next-gen garage management system.',
    heroHeadline: 'Next-Gen Garage Operating System',
    accentColor: '#FF0055',
    blobClass: 'blob-crimson',
    problemStatement:
      'MotoDoc is a next-generation automotive technology platform transforming how vehicle service and mobility businesses operate. Powered by AI, data intelligence, and automation, it unifies diagnostics, inspections, service management, and vehicle insights into a seamless digital ecosystem.',
    uxSolution:
      'The platform enables businesses to make faster, smarter decisions, improve operational efficiency, and deliver exceptional customer experiences. By bridging the gap between automotive expertise and modern technology, MotoDoc is building the digital foundation for the future of connected, intelligent mobility.',
    keyMetric: '40% Faster Operations',
    metricContext: 'Unified job cards, TecDoc part lookup, and automated Bay Admin dashboards',
    image: GENERATED_IMAGES.motodocGarage,
    deliverables: [
      'motodoc.in B2B SaaS Product Landing Page',
      'Official TecDoc 18,000+ OEM Part Resolver',
      'Multi-Bay Service Advisor & Admin Dashboard',
      'VAHAN 4.0 Registration & Telemetry Integration',
    ],
    tecdocOrAiNote:
      'Direct TecDoc OEM catalog pairing with VAHAN 4.0 vehicle databases for zero-error part fitment.',
  },
  {
    id: 'moto-akademie',
    name: 'Moto Akademie',
    brandKey: 'akademie',
    formerName: 'Automoto Training Division & Corporate Split',
    roleFocus: 'Training Platform UX · Corporate Split Architecture · Operations',
    category: 'training',
    liveUrl: 'https://moto365.in/',
    tagline: 'Transforming India’s automotive training.',
    heroHeadline: 'Transforming India’s Automotive Training',
    accentColor: '#5B45FF',
    blobClass: 'blob-purple',
    problemStatement:
      'Moto Akademie is a next-generation automotive learning platform designed to build the workforce of tomorrow’s mobility industry. Combining hands-on training, industry-led programs, and real-world automotive expertise, it equips learners with practical skills in EV technology, diagnostics, vehicle servicing, and workshop operations.',
    uxSolution:
      'The platform bridges the gap between traditional education and industry readiness through immersive learning experiences and career-focused certifications. Backed by advanced automotive technology and service ecosystems, Moto Akademie empowers aspiring professionals to thrive in an evolving, technology-driven automotive landscape.',
    keyMetric: '100% Zero-Downtime Split',
    metricContext: 'Rebranded all training and service products under Moto365 in April 2026',
    image: GENERATED_IMAGES.heroEcosystem,
    deliverables: [
      'Automotive Diagnostic & EV Curriculum UX',
      'Hands-On Workshop Bay Cohort Scheduler',
      'April 2026 Corporate Split & Rebrand Migration',
      'Certification & Inspector Badging System',
    ],
    tecdocOrAiNote:
      'Bridged real ground operations and academy training into direct PDI inspector placement pipelines.',
  },
];

export const INITIAL_PDI_SUBSYSTEMS: PdiSubsystem[] = [
  {
    id: 'sys-engine',
    name: 'Engine & OBD-II ECU Scan',
    code: 'OBD-01',
    checkpoints: 44,
    baseScore: 97,
    paintMicrons: 112,
    hasAnomaly: false,
    findingSummary: 'Zero DTC fault codes; turbo boost pressure & injectors within 2% OEM spec.',
    repairEstimateInr: 16500,
  },
  {
    id: 'sys-paint',
    name: 'Laser Paint & Body Micrometer',
    code: 'PNT-02',
    checkpoints: 36,
    baseScore: 95,
    paintMicrons: 185,
    hasAnomaly: true,
    findingSummary: 'Rear Right Quarter Panel shows 185µm repainted clearcoat (filler putty detected).',
    repairEstimateInr: 8500,
  },
  {
    id: 'sys-brakes',
    name: 'Brakes, Rotors & Suspension',
    code: 'BRK-03',
    checkpoints: 32,
    baseScore: 94,
    paintMicrons: 115,
    hasAnomaly: false,
    findingSummary: 'Front Brembo pads at 7.4mm life remaining; strut rebound symmetrical.',
    repairEstimateInr: 12400,
  },
  {
    id: 'sys-electrical',
    name: 'Battery, Alternator & HV Bus',
    code: 'ELC-04',
    checkpoints: 28,
    baseScore: 96,
    paintMicrons: 110,
    hasAnomaly: false,
    findingSummary: 'AGM Battery State of Health at 94% (14.1V charging under load).',
    repairEstimateInr: 9200,
  },
  {
    id: 'sys-interior',
    name: 'Cabin Ergonomics & ADAS Sensors',
    code: 'CAB-05',
    checkpoints: 24,
    baseScore: 98,
    paintMicrons: 108,
    hasAnomaly: false,
    findingSummary: '360° camera calibration verified; AC evaporator cools to 6.2°C in 90s.',
    repairEstimateInr: 7800,
  },
  {
    id: 'sys-roadtest',
    name: 'Dynamic Road Test & NVH',
    code: 'DYN-06',
    checkpoints: 16,
    baseScore: 96,
    paintMicrons: 114,
    hasAnomaly: false,
    findingSummary: 'DCT gear shifts crisp under load; steering rack zero play at 80 km/h.',
    repairEstimateInr: 21000,
  },
];

export interface RoleHatSpec {
  id: string;
  title: string;
  period: string;
  summary: string;
  responsibilities: string[];
  artifactTitle: string;
  artifactMetric: string;
  codeOrSystemSnippet: string;
}

export const MULTIPLE_HATS: RoleHatSpec[] = [
  {
    id: 'hat-uiux',
    title: 'Product & UI/UX Designer',
    period: 'Feb 2025 – Present',
    summary:
      'Designed end-to-end mobile apps, B2B SaaS dashboards, conversion landing pages, and interactive HTML inspection reports across 5 products.',
    responsibilities: [
      'Conducted field contextual inquiry with 18 PDI mechanics in bright/greasy service bays to design one-handed high-contrast touch targets.',
      'Redesigned assist.inspektai.in/start booking flow, trimming form fields from 14 to 5 and reducing booking time by 20%.',
      'Crafted interactive live HTML PDI reports that replaced static PDFs and lifted sales conversion by 45%–60%.',
    ],
    artifactTitle: 'Figma Master System (140+ Screens & Component Library)',
    artifactMetric: '-20% Booking Time · +45%–60% Sales Conversion',
    codeOrSystemSnippet:
      'Flow: Vehicle Selection → Instant Slot Lock → Inspector App Sync → Live HTML Report Link',
  },
  {
    id: 'hat-brand',
    title: 'Brand & Rebranding Architect',
    period: 'April 2026 Corporate Split',
    summary:
      'When Automoto split in April 2026 and our team transitioned to Moto365, led the complete visual identity overhaul while keeping all products live.',
    responsibilities: [
      'Designed the new Moto365 parent mark, InspektAI trust seal, MotoDoc industrial wordmark, and Moto365 Club crest.',
      'Built semantic multi-brand token architecture so landing pages and admin dashboards re-themed cleanly during the corporate split.',
      'Launched moto365.in parent ecosystem site to explain the unified product suite to investors, partners, and car owners.',
    ],
    artifactTitle: 'Automoto → Moto365 Identity & Token Migration',
    artifactMetric: '5 Live Properties Rebranded in 3 Weeks',
    codeOrSystemSnippet:
      'Brand Hierarchy: Moto365 (Parent) → InspektAI · MotoDoc × TecDoc · Moto365 Club · Inspector OS',
  },
  {
    id: 'hat-ai-ops',
    title: 'AI Workflow & Live HTML Engineer',
    period: '2025 – 2026',
    summary:
      'Built internal AI workflow automations and engineered responsive live HTML PDI report templates rendered directly from inspector field payloads.',
    responsibilities: [
      'Automated inspector voice-notes & raw OBD-II dumps into structured customer-friendly health summaries using LLM pipelines.',
      'Coded production-ready HTML/CSS interactive PDI report templates with expandable defect photo lightboxes and paint thickness heatmaps.',
      'Connected WhatsApp webhook triggers for instant report delivery and automated service bay slot assignment.',
    ],
    artifactTitle: 'Automated PDI Pipeline & Live HTML Report Renderer',
    artifactMetric: '40% Faster Operations & Admin Turnaround',
    codeOrSystemSnippet:
      'Trigger: Inspector Submits 180-Pt JSON → AI Normalizes Notes → Live HTML Report Generated in 8s',
  },
  {
    id: 'hat-ops',
    title: 'Operations & Field Strategy Lead',
    period: '2025 – 2026',
    summary:
      'Handled real-world dispatch operations, inspector quality audits, customer escalations, and TecDoc garage onboarding.',
    responsibilities: [
      'Managed daily PDI booking dispatch queues and optimized inspector travel routing across metro zones.',
      'Collaborated on the TecDoc catalog integration for MotoDoc, mapping real workshop pain points into the B2B SaaS workflow.',
      'Bridged product design and ground operations—turning every customer support call directly into a same-week UI improvement.',
    ],
    artifactTitle: 'Ground-Truth Ops Feedback Loop & Admin Console',
    artifactMetric: 'Zero Missed Inspection SLAs · 98.4% CSAT',
    codeOrSystemSnippet:
      'Ops Loop: Customer Call → Admin Queue Triage → Inspector App Patch → Live Deployment',
  },
];

export interface FigmaScreenItem {
  id: string;
  title: string;
  product: string;
  category: 'landing' | 'dashboard' | 'mobile' | 'report' | 'branding';
  liveUrl: string;
  figmaNodeLabel: string;
  problemSolved: string;
  designDecision: string;
  impactStat: string;
  previewImage: string;
  uiHighlights: string[];
}

export const FIGMA_SCREENS: FigmaScreenItem[] = [
  {
    id: 'scr-inspekt-landing',
    title: 'InspektAI High-Trust Conversion Landing Page',
    product: 'inspektai.in',
    category: 'landing',
    liveUrl: 'https://www.inspektai.in/',
    figmaNodeLabel: 'Node 0:1 · InspektAI Marketing & Trust Architecture',
    problemSolved:
      'Used car buyers hesitated to pay upfront for PDI because competitor sites looked like generic lead-gen forms with no proof of diagnostic depth.',
    designDecision:
      'Placed interactive 180-point inspection previews, real OBD-II telemetry callouts, and sample HTML report cards above the fold with high-contrast amber CTAs.',
    impactStat: '+45%–60% Increase in Sales Conversion',
    previewImage: GENERATED_IMAGES.inspektAiPdi,
    uiHighlights: [
      'Interactive New vs. Used Car PDI package comparator',
      'Live preview of paint depth micrometer & ECU scan checks',
      'Direct one-click handoff to assist.inspektai.in/start',
    ],
  },
  {
    id: 'scr-assist-booking',
    title: 'InspektAI Assist — 3-Step Guided Booking Funnel',
    product: 'assist.inspektai.in/start',
    category: 'mobile',
    liveUrl: 'https://assist.inspektai.in/start',
    figmaNodeLabel: 'Node 0:1 · Assist Progressive Booking Flow',
    problemSolved:
      'Users abandoned the legacy 14-field booking form when asked for VIN and exact dealership coordinates on step one.',
    designDecision:
      'Engineered a skeuomorphic step-by-step vehicle brand/model selector with smart dealership autocomplete and instant WhatsApp slot confirmation.',
    impactStat: '20% Reduction in Booking Time',
    previewImage: GENERATED_IMAGES.heroEcosystem,
    uiHighlights: [
      'Visual car make/model tactile selector grid',
      'Deferred optional dealership details to post-payment confirmation',
      'Mobile-first thumb-zone sticky progress bar',
    ],
  },
  {
    id: 'scr-live-html-pdi',
    title: 'Interactive Live HTML PDI Customer Report',
    product: 'InspektAI Report Engine',
    category: 'report',
    liveUrl: 'https://www.inspektai.in/',
    figmaNodeLabel: 'Node 0:1 · Live HTML PDI Report & Inspector App',
    problemSolved:
      'Static PDF reports required pinching and zooming on mobile phones, hiding critical engine fault codes and repair cost breakdowns.',
    designDecision:
      'Designed and coded a responsive live HTML report with collapsible subsystem accordions, severity gauges, high-res defect zoom, and negotiate-price calculators.',
    impactStat: '99% Customer Clarity & Negotiation Confidence',
    previewImage: GENERATED_IMAGES.inspektAiPdi,
    uiHighlights: [
      'Overall Vehicle Health Score dial with tabular subsystem breakdown',
      'Interactive 6-zone car body paint thickness map (µm)',
      'Itemized INR refurbishment estimate for instant buyer price negotiation',
    ],
  },
  {
    id: 'scr-motodoc-tecdoc',
    title: 'MotoDoc × TecDoc Garage Management & Admin OS',
    product: 'motodoc.in',
    category: 'dashboard',
    liveUrl: 'https://motodoc.in/',
    figmaNodeLabel: 'Node 0:1 · MotoDoc B2B Dashboard & Landing',
    problemSolved:
      'Multi-brand workshops struggled with mismatched spare parts and manual job card tracking across 10+ service bays.',
    designDecision:
      'Created a dark-mode industrial dashboard pairing live bay status boards with embedded TecDoc OEM part schematics and automated customer billing.',
    impactStat: '40% Faster Operations & Admin Flow',
    previewImage: GENERATED_IMAGES.motodocGarage,
    uiHighlights: [
      'Real-time service bay occupancy & technician timer telemetry',
      'TecDoc VIN decoder linked directly to OEM replacement catalog',
      'Automated digital estimate approval sent to vehicle owner',
    ],
  },
  {
    id: 'scr-moto365-club',
    title: 'Moto365 Club — Enthusiast Community Webapp',
    product: 'moto365.club/app/dashboard',
    category: 'dashboard',
    liveUrl: 'https://www.moto365.club/app/dashboard',
    figmaNodeLabel: 'Node 0:1 · Moto365 Club Dashboard & Feed',
    problemSolved:
      'Car owners had no dedicated space to maintain verified service records alongside enthusiast meetups and build threads.',
    designDecision:
      'Built a modular dashboard combining a personal Digital Garage, verified InspektAI health badges, convoy route maps, and technical Q&A threads.',
    impactStat: 'Unified Community + Service Retention Loop',
    previewImage: GENERATED_IMAGES.moto365Club,
    uiHighlights: [
      'Verified Owner Garage card with live odometer & mod list',
      'Weekend convoy drive RSVP with live route checkpoints',
      'Seamless cross-navigation to book PDI or MotoDoc garage service',
    ],
  },
  {
    id: 'scr-moto365-rebrand',
    title: 'Automoto → Moto365 Corporate Split & Brand System',
    product: 'moto365.in',
    category: 'branding',
    liveUrl: 'https://moto365.in/',
    figmaNodeLabel: 'Node 0:1 · April 2026 Rebrand & Logo System',
    problemSolved:
      'In April 2026, the company split from Automoto into Moto365 while retaining the exact same product suite and team.',
    designDecision:
      'Developed an automotive precision brand system (Moto365) with modular sub-brand lockups and launched moto365.in as the parent flagship.',
    impactStat: 'Seamless Transition Across 5 Live Platforms',
    previewImage: GENERATED_IMAGES.heroEcosystem,
    uiHighlights: [
      'Precision geometric emblem inspired by 365-degree wheel telemetry',
      'Unified typography & color token system across web and mobile',
      'Clear parent-to-product navigation linking InspektAI, MotoDoc, and Club',
    ],
  },
];
