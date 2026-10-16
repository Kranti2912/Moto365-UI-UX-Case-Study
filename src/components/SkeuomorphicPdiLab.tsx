import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  calculatePdiReportMetrics,
  type PdiSubsystem,
} from '../utils/caseStudyLogic';
import { INITIAL_PDI_SUBSYSTEMS } from '../data/caseStudyData';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  RotateCcw,
  ExternalLink,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Activity,
  Gauge,
  Zap,
  Car,
  Wrench,
  Search,
  CheckCheck,
  Cpu,
  Radio,
  FileText,
  Disc,
  CircleDot,
} from 'lucide-react';

interface CarPanelMeasurement {
  id: string;
  name: string;
  microns: number;
  factoryRange: string;
  isRepainted: boolean;
  notes: string;
}

export const SkeuomorphicPdiLab: React.FC = () => {
  const [subsystems, setSubsystems] = useState<PdiSubsystem[]>(INITIAL_PDI_SUBSYSTEMS);
  const [paintTolerance, setPaintTolerance] = useState<number>(140);
  const [viewMode, setViewMode] = useState<'console' | 'html-preview'>('console');
  const [selectedVehicle, setSelectedVehicle] = useState<'tata-safari' | 'used-octavia' | 'new-thar' | 'used-330i'>('tata-safari');
  const [copiedHtml, setCopiedHtml] = useState(false);

  // Hardware Console interactive states
  const [activeConsoleTool, setActiveConsoleTool] = useState<'checklist' | 'paint' | 'obd' | 'tyres'>('checklist');
  const [isScanningEcu, setIsScanningEcu] = useState(false);
  const [ecuScanComplete, setEcuScanComplete] = useState(true);
  const [selectedPanelId, setSelectedPanelId] = useState<string>('panel-hood');

  // Customer Report active tab
  const [reportActiveTab, setReportActiveTab] = useState<'summary' | 'paint-heatmap' | 'obd-scan' | 'tyres-brakes' | 'itemized-cost'>('summary');

  const metrics = calculatePdiReportMetrics(subsystems, paintTolerance);

  const vehiclePresets = {
    'tata-safari': {
      title: '2024 Tata Safari Accomplished+ Dark Edition',
      regNo: 'KA03 ND 4921',
      pdiId: '#PDI011088',
      vin: 'MAT623497N1049281',
      odometer: '14,200 km',
      inspectionType: '180-Point Certified PDI',
      reportUrl: 'https://assist.inspektai.in/r/hJZdYMnaWgwuRYDo/',
      date: '14 Oct 2024',
      inspector: 'Kishore M. (Lead PDI Specialist)',
      fuel: 'Kryotec 2.0L Diesel · Automatic',
      engineSpecs: '170 PS · 350 Nm · 6-Speed AT',
      location: 'Bangalore East Hub, Karnataka',
      color: 'Oberon Black Metallic',
    },
    'used-octavia': {
      title: '2022 Škoda Octavia L&K 2.0 TSI',
      regNo: 'MH02 EK 8812',
      pdiId: '#PDI009412',
      vin: 'TMBJB7NE4N0019482',
      odometer: '28,410 km',
      inspectionType: 'Used Car 180-Point PDI',
      reportUrl: 'https://assist.inspektai.in/r/hJZdYMnaWgwuRYDo/',
      date: '18 Nov 2024',
      inspector: 'Amit Sharma (Field PDI Lead)',
      fuel: '2.0 TSI Petrol · 7-Speed DSG',
      engineSpecs: '190 PS · 320 Nm · 7-Speed DSG',
      location: 'Mumbai Central Hub, Maharashtra',
      color: 'Lava Blue Metallic',
    },
    'new-thar': {
      title: '2026 Mahindra Thar Roxx AX7L 4WD',
      regNo: 'DL01 TC 2026',
      pdiId: '#PDI012480',
      vin: 'MA1TA2WR6T2084119',
      odometer: '42 km',
      inspectionType: 'New Car Dealership Yard PDI',
      reportUrl: 'https://assist.inspektai.in/r/hJZdYMnaWgwuRYDo/',
      date: '02 Dec 2024',
      inspector: 'Rahul Verma (QC Inspector)',
      fuel: 'mStallion TGDi · 4WD',
      engineSpecs: '177 PS · 380 Nm · 6-Speed AT 4×4',
      location: 'Gurugram Yard Hub, Haryana',
      color: 'Deep Forest Green',
    },
    'used-330i': {
      title: '2021 BMW 330i M Sport (G20)',
      regNo: 'TS09 FN 3300',
      pdiId: '#PDI008761',
      vin: 'WBA5R12090F992310',
      odometer: '34,900 km',
      inspectionType: 'Used Car Enthusiast PDI',
      reportUrl: 'https://assist.inspektai.in/r/hJZdYMnaWgwuRYDo/',
      date: '05 Jan 2025',
      inspector: 'Karthik Rao (Senior Specialist)',
      fuel: 'B48 2.0L Turbo · 8-Speed Steptronic',
      engineSpecs: '258 PS · 400 Nm · 8-Speed Sport AT',
      location: 'Hyderabad Hitec Hub, Telangana',
      color: 'Portimao Blue Metallic',
    },
  };

  const activeCar = vehiclePresets[selectedVehicle];

  // Car Body Panels with laser paint measurements
  const carPanels: CarPanelMeasurement[] = [
    {
      id: 'panel-hood',
      name: 'Bonnet / Hood',
      microns: 112,
      factoryRange: '100–125 µm',
      isRepainted: false,
      notes: 'Uniform OEM clearcoat. Zero stone chips or clear peel.',
    },
    {
      id: 'panel-roof',
      name: 'Roof Panel',
      microns: 108,
      factoryRange: '95–120 µm',
      isRepainted: false,
      notes: 'Original robot-applied factory paint. Sunroof seals pristine.',
    },
    {
      id: 'panel-f-left',
      name: 'Front Left Fender',
      microns: 118,
      factoryRange: '100–130 µm',
      isRepainted: false,
      notes: 'OEM primer and finish. Fastener torque marks intact.',
    },
    {
      id: 'panel-f-right',
      name: 'Front Right Fender',
      microns: 115,
      factoryRange: '100–130 µm',
      isRepainted: false,
      notes: 'Factory spec. No fender apron distortion.',
    },
    {
      id: 'panel-d-door',
      name: 'Driver Door (FL)',
      microns: 114,
      factoryRange: '100–130 µm',
      isRepainted: false,
      notes: 'Original factory coating. Door hinge pins factory aligned.',
    },
    {
      id: 'panel-r-door',
      name: 'Rear Right Door (RR)',
      microns: 122,
      factoryRange: '100–130 µm',
      isRepainted: false,
      notes: 'OEM paint depth. Window channel weather-stripping verified.',
    },
    {
      id: 'panel-quarter',
      name: 'Rear Left Quarter Panel',
      microns: subsystems[1].hasAnomaly ? 185 : 124,
      factoryRange: '100–135 µm',
      isRepainted: subsystems[1].hasAnomaly || subsystems[1].paintMicrons > paintTolerance,
      notes: subsystems[1].hasAnomaly
        ? 'Secondary clearcoat blend and putty detected near wheel arch.'
        : 'Factory original paint verified across 8 probe points.',
    },
    {
      id: 'panel-boot',
      name: 'Tailgate / Boot Lid',
      microns: 116,
      factoryRange: '100–130 µm',
      isRepainted: false,
      notes: 'Factory paint depth. Defogger lines and hydraulic struts nominal.',
    },
  ];

  const currentPanel = carPanels.find((p) => p.id === selectedPanelId) || carPanels[0];

  // Tyre Measurements
  const tyreHealth = [
    { position: 'Front Left', depthMm: 5.2, healthPct: 86, brand: 'Bridgestone Turanza 235/60 R18', status: 'Optimal' },
    { position: 'Front Right', depthMm: 5.1, healthPct: 85, brand: 'Bridgestone Turanza 235/60 R18', status: 'Optimal' },
    { position: 'Rear Left', depthMm: 4.8, healthPct: 80, brand: 'Bridgestone Turanza 235/60 R18', status: 'Good' },
    { position: 'Rear Right', depthMm: 4.9, healthPct: 82, brand: 'Bridgestone Turanza 235/60 R18', status: 'Good' },
    { position: 'Spare Wheel', depthMm: 7.2, healthPct: 100, brand: 'Steel Rim Emergency Spare', status: 'Unused / 100%' },
  ];

  const toggleSubsystemAnomaly = (id: string) => {
    setSubsystems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              hasAnomaly: !item.hasAnomaly,
              paintMicrons:
                item.id === 'sys-paint'
                  ? !item.hasAnomaly
                    ? 185
                    : 115
                  : item.paintMicrons,
            }
          : item
      )
    );
  };

  const resetAllNominal = () => {
    setSubsystems((prev) =>
      prev.map((item) => ({
        ...item,
        hasAnomaly: false,
        paintMicrons: 112,
      }))
    );
    setPaintTolerance(140);
  };

  const triggerEcuScan = () => {
    setIsScanningEcu(true);
    setEcuScanComplete(false);
    setTimeout(() => {
      setIsScanningEcu(false);
      setEcuScanComplete(true);
    }, 1200);
  };

  const copyLiveReportSnippet = () => {
    const snippet = `<!-- InspektAI Live HTML PDI Report (${activeCar.title} · ${activeCar.pdiId}) -->
<section class="inspektai-live-report" data-vin="${activeCar.vin}" data-score="${metrics.overallHealthScore}">
  <header style="background: linear-gradient(90deg, #FB5C2E 0%, #DD38C8 100%); height: 4px;"></header>
  <div style="padding: 24px; font-family: system-ui, sans-serif;">
    <h2>${activeCar.title} — ${metrics.verdictLabel}</h2>
    <p>Report ${activeCar.pdiId} · Passed ${metrics.passedCheckpoints}/${metrics.totalCheckpoints} Points · Est. Refurbishment: INR ${metrics.totalRepairEstimateInr.toLocaleString('en-IN')}</p>
    <p>Live verified link: ${activeCar.reportUrl}</p>
  </div>
</section>`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(snippet).catch(() => {});
    }
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const downloadStandaloneHtmlReport = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>InspektAI · PDI Report – ${activeCar.title} · ${activeCar.pdiId}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #FAF7F6; color: #121212; padding: 32px 16px; }
    .report-card { max-width: 920px; margin: 0 auto; background: #fff; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.06); border: 1px solid #E5E5E5; overflow: hidden; }
    .topbar { height: 6px; background: linear-gradient(90deg, #FB5C2E 0%, #DD38C8 50%, #6366F1 100%); }
    .header { padding: 32px; border-bottom: 1px solid #EFEFEF; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; background: #FFF1EC; color: #FB5C2E; text-transform: uppercase; margin-bottom: 8px; }
    .title { font-size: 24px; font-weight: 800; color: #09090B; }
    .meta { font-size: 12px; color: #71717A; margin-top: 6px; }
    .score-container { padding: 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .score-box { background: #FAFAFA; border: 1px solid #E4E4E7; border-radius: 16px; padding: 24px; }
    .score-num { font-size: 40px; font-weight: 900; color: #09090B; }
    .table-container { padding: 0 32px 32px; }
    table { width: 100%; border-collapse: collapse; border: 1px solid #E4E4E7; border-radius: 12px; overflow: hidden; }
    th { background: #FAFAFA; padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #71717A; border-bottom: 1px solid #E4E4E7; }
    td { padding: 14px 16px; border-top: 1px solid #F4F4F5; font-size: 13px; }
    .pill-ok { background: #ECFDF5; color: #047857; padding: 4px 10px; border-radius: 999px; font-weight: 700; font-size: 11px; display: inline-block; }
    .pill-warn { background: #FFFBEB; color: #B45309; padding: 4px 10px; border-radius: 999px; font-weight: 700; font-size: 11px; display: inline-block; }
    .footer { padding: 20px 32px; background: #FAFAFA; border-top: 1px solid #EFEFEF; font-size: 11px; color: #A1A1AA; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <div class="report-card">
    <div class="topbar"></div>
    <div class="header">
      <span class="badge">Verified InspektAI Report · ${activeCar.pdiId}</span>
      <h1 class="title">${activeCar.title}</h1>
      <p class="meta">VIN: ${activeCar.vin} · Odometer: ${activeCar.odometer} · Reg: ${activeCar.regNo} · Date: ${activeCar.date}</p>
    </div>
    <div class="score-container">
      <div class="score-box">
        <div style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Overall Health Score</div>
        <div class="score-num">${metrics.overallHealthScore}<span style="font-size: 18px; font-weight: 400; color: #A1A1AA;">/100</span></div>
        <div style="font-size: 13px; font-weight: 700; color: #059669; margin-top: 4px;">${metrics.verdictLabel}</div>
      </div>
      <div class="score-box">
        <div style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Refurbishment Leverage</div>
        <div class="score-num" style="color: #FF4D15;">INR ${metrics.totalRepairEstimateInr.toLocaleString('en-IN')}</div>
        <div style="font-size: 12px; color: #71717A; margin-top: 4px;">Documented repair deduction</div>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>SUBSYSTEM</th>
            <th>CHECKPOINTS</th>
            <th>PAINT DEPTH</th>
            <th>STATUS</th>
            <th style="text-align: right;">EST. REFURBISHMENT</th>
          </tr>
        </thead>
        <tbody>
          ${subsystems
            .map((sub) => {
              const isFlagged = sub.hasAnomaly || sub.paintMicrons > paintTolerance;
              return `<tr>
                <td><strong>${sub.name}</strong><br><span style="color: #71717A; font-size: 11px;">${sub.findingSummary}</span></td>
                <td>${sub.checkpoints} pts checked</td>
                <td>${sub.paintMicrons} µm</td>
                <td><span class="${isFlagged ? 'pill-warn' : 'pill-ok'}">${isFlagged ? 'Attention Required' : 'Factory Spec'}</span></td>
                <td style="text-align: right; font-weight: 700;">INR ${isFlagged ? sub.repairEstimateInr.toLocaleString('en-IN') : '0'}</td>
              </tr>`;
            })
            .join('')}
        </tbody>
      </table>
    </div>
    <div class="footer">
      <span>Inspector: ${activeCar.inspector}</span>
      <span>Live Link: ${activeCar.reportUrl}</span>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `InspektAI-PDI-Report-${activeCar.pdiId.replace('#', '')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="pdi-lab" className="py-20 border-t border-zinc-200 bg-[#FAFAFA]">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="text-xs text-[#FF4D15] font-bold uppercase tracking-wider font-mono-tabular mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              02. Interactive Product Artifact · InspektAI & Inspector OS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 max-w-2xl text-balance">
              Field Inspector Hardware Console & Customer Live HTML Report
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
              Replacing static 40-page PDFs with high-precision diagnostic instruments and responsive live web reports. Buyers get instant transparency and verified repair negotiation numbers—driving a 45%–60% surge in conversion.
            </p>
          </div>

          {/* Primary View Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-zinc-200 shadow-xs shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('console')}
              className={`px-5 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all flex items-center gap-2 ${
                viewMode === 'console'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#FF4D15]" />
              Inspector Hardware Console
            </button>
            <button
              type="button"
              onClick={() => setViewMode('html-preview')}
              className={`px-5 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all flex items-center gap-2 ${
                viewMode === 'html-preview'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5 text-[#00E575]" />
              Customer Live HTML Report
            </button>
          </div>
        </motion.div>

        {/* Selected Element Container: Minimal, Interactive, Clean Website Style */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm"
        >
          {/* Top Control Bar: Vehicle Preset Selector & Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-400 font-mono-tabular font-bold uppercase tracking-wider mr-1">
                Vehicle:
              </span>
              {(
                [
                  { id: 'tata-safari', label: '2024 Tata Safari (Live #PDI011088)' },
                  { id: 'used-octavia', label: '2022 Škoda Octavia' },
                  { id: 'new-thar', label: '2026 Thar Roxx' },
                  { id: 'used-330i', label: '2021 BMW 330i' },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedVehicle(preset.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-all ${
                    selectedVehicle === preset.id
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={resetAllNominal}
                className="bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 px-3.5 py-1.5 rounded-full text-xs font-bold text-zinc-700 flex items-center gap-1.5 transition-all"
                title="Reset all checkpoints to nominal factory condition"
              >
                <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
                Reset Checkpoints
              </button>
              <a
                href={activeCar.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFF1EC] text-[#FF4D15] hover:bg-[#FFE5DC] border border-[#FFD0C0] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Real Report Link
              </a>
            </div>
          </div>

          {/* =========================================================================
              VIEW 1: INSPECTOR HARDWARE CONSOLE (Clean, Minimal & Interactive)
          ========================================================================= */}
          {viewMode === 'console' && (
            <div className="space-y-6">
              {/* Console Diagnostic Sub-Navigation / Tool Palette */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-zinc-50 border border-zinc-200 rounded-2xl">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTool('checklist')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      activeConsoleTool === 'checklist'
                        ? 'bg-white text-zinc-950 shadow-xs border border-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
                    }`}
                  >
                    <CheckCheck className="w-3.5 h-3.5 text-[#FF4D15]" />
                    180-Point Defect Switchboard
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTool('paint')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      activeConsoleTool === 'paint'
                        ? 'bg-white text-zinc-950 shadow-xs border border-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5 text-[#FF4D15]" />
                    Laser Paint Micrometer (µm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTool('obd')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      activeConsoleTool === 'obd'
                        ? 'bg-white text-zinc-950 shadow-xs border border-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5 text-[#00E575]" />
                    OBD-II CAN-Bus Live Feed
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTool('tyres')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      activeConsoleTool === 'tyres'
                        ? 'bg-white text-zinc-950 shadow-xs border border-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
                    }`}
                  >
                    <Disc className="w-3.5 h-3.5 text-zinc-700" />
                    Tyre Tread Depth (mm)
                  </button>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-lg text-xs font-mono-tabular">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-zinc-600 font-semibold">Console Connected</span>
                  <span className="text-zinc-400 font-normal">· Bluetooth 5.3 Low Latency</span>
                </div>
              </div>

              {/* Main Console Workspace: 2-Column Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 Columns: Active Diagnostic Tool View */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Tool A: 180-Point Defect Switchboard */}
                  {activeConsoleTool === 'checklist' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-zinc-950">
                            Subsystem Telemetry & Field Defect Toggles
                          </h3>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Click any subsystem card to simulate discovering or clearing a vehicle defect during field inspection.
                          </p>
                        </div>
                        <span className="text-xs font-mono-tabular bg-zinc-100 text-zinc-700 font-bold px-2.5 py-1 rounded-md border border-zinc-200">
                          VIN · {activeCar.vin}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {subsystems.map((sub) => {
                          const isFlagged = sub.hasAnomaly || sub.paintMicrons > paintTolerance;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => toggleSubsystemAnomaly(sub.id)}
                              aria-pressed={isFlagged}
                              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                                isFlagged
                                  ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300 shadow-xs'
                                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-xs'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-xs font-mono-tabular text-zinc-500 font-medium">
                                  {sub.code} · {sub.checkpoints} pts
                                </span>
                                <span className="text-[11px] font-mono-tabular font-bold flex items-center gap-1">
                                  {isFlagged ? (
                                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                                      FLAGGED
                                    </span>
                                  ) : (
                                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                      NOMINAL
                                    </span>
                                  )}
                                </span>
                              </div>
                              <div className="text-sm font-bold text-zinc-900 mb-1">
                                {sub.name}
                              </div>
                              <p className="text-xs text-zinc-500 line-clamp-2">
                                {isFlagged
                                  ? sub.findingSummary
                                  : 'All sensor telemetry and mechanical tolerances verified within factory threshold.'}
                              </p>
                              {isFlagged && (
                                <div className="mt-2 text-xs font-mono-tabular font-bold text-[#FF4D15] flex items-center justify-between">
                                  <span>Deduction Leverage:</span>
                                  <span>INR {sub.repairEstimateInr.toLocaleString('en-IN')}</span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Laser Paint Depth Slider */}
                      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <label
                            htmlFor="paint-slider"
                            className="text-xs font-bold text-zinc-800 flex items-center gap-2"
                          >
                            <Sliders className="w-3.5 h-3.5 text-[#FF4D15]" />
                            Laser Paint Gauge Repaint Threshold (µm)
                          </label>
                          <span className="text-xs font-mono-tabular text-[#FF4D15] font-bold">
                            {paintTolerance} µm (Rear Quarter: {subsystems[1].paintMicrons} µm)
                          </span>
                        </div>
                        <input
                          id="paint-slider"
                          type="range"
                          min={100}
                          max={220}
                          step={5}
                          value={paintTolerance}
                          onChange={(e) => setPaintTolerance(Number(e.target.value))}
                          className="w-full accent-[#FF4D15] cursor-pointer h-2 bg-zinc-200 rounded-lg"
                        />
                        <div className="flex justify-between text-[11px] font-mono-tabular text-zinc-400 mt-1">
                          <span>100 µm (Strict OEM Factory)</span>
                          <span>140 µm (Standard PDI Limit)</span>
                          <span>220 µm (Repaint / Putty)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tool B: Laser Paint Micrometer Panel Map */}
                  {activeConsoleTool === 'paint' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-zinc-950">
                          Digital Paint Thickness Gauge (Ultrasonic Laser Probe)
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Tap on any exterior body panel to position the laser probe and measure microns in real time.
                        </p>
                      </div>

                      {/* Interactive Panel Selector Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {carPanels.map((panel) => {
                          const isSelected = panel.id === selectedPanelId;
                          const isOver = panel.microns > paintTolerance;
                          return (
                            <button
                              key={panel.id}
                              type="button"
                              onClick={() => setSelectedPanelId(panel.id)}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                                  : isOver
                                  ? 'bg-amber-50 text-zinc-900 border-amber-300'
                                  : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300'
                              }`}
                            >
                              <div className="text-[11px] font-mono-tabular opacity-70 mb-1">
                                {panel.name}
                              </div>
                              <div className="text-lg font-bold font-mono-tabular">
                                {panel.microns} <span className="text-xs font-normal">µm</span>
                              </div>
                              <div className="text-[10px] font-mono-tabular mt-1 font-semibold flex items-center gap-1">
                                {isOver ? (
                                  <span className={isSelected ? 'text-amber-300' : 'text-amber-700'}>
                                    Repainted panel
                                  </span>
                                ) : (
                                  <span className={isSelected ? 'text-emerald-300' : 'text-emerald-700'}>
                                    Factory OEM
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Detailed Panel Probe Readout */}
                      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                          <div>
                            <span className="text-xs text-zinc-400 font-mono-tabular uppercase font-bold">
                              Selected Body Panel
                            </span>
                            <div className="text-base font-bold text-zinc-900 mt-0.5">
                              {currentPanel.name}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-zinc-400 font-mono-tabular uppercase font-bold">
                              Measured Thickness
                            </span>
                            <div className="text-2xl font-black font-mono-tabular text-zinc-950">
                              {currentPanel.microns} µm
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-zinc-500 font-medium">OEM Standard Window:</span>
                            <div className="font-bold font-mono-tabular text-zinc-800 mt-0.5">
                              {currentPanel.factoryRange}
                            </div>
                          </div>
                          <div>
                            <span className="text-zinc-500 font-medium">Structural Diagnosis:</span>
                            <div className="font-bold text-zinc-800 mt-0.5">
                              {currentPanel.isRepainted ? 'Non-Factory Clearcoat Blend' : 'Original Factory Primer & Clear'}
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-600 bg-white p-3 rounded-xl border border-zinc-200 leading-relaxed">
                          {currentPanel.notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tool C: OBD-II CAN-Bus Live Feed */}
                  {activeConsoleTool === 'obd' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-zinc-950">
                            OBD-II CAN-Bus Live ECU Telemetry
                          </h3>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Direct connection with onboard engine control modules, transmission ECU, ABS, and airbag gateway.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={triggerEcuScan}
                          disabled={isScanningEcu}
                          className="btn-moto-black px-4 py-2 text-xs font-bold flex items-center gap-2 shrink-0 shadow-xs"
                        >
                          <Zap className={`w-3.5 h-3.5 text-[#00E575] ${isScanningEcu ? 'animate-spin' : ''}`} />
                          {isScanningEcu ? 'Scanning 14 ECUs...' : 'Run Live ECU Scan'}
                        </button>
                      </div>

                      {/* 4 Sensor Digital Dials */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-center">
                          <span className="text-[10px] text-zinc-400 font-mono-tabular font-bold uppercase">
                            Engine Idle
                          </span>
                          <div className="text-xl font-bold font-mono-tabular text-zinc-900 mt-1">
                            820 <span className="text-xs font-normal text-zinc-500">RPM</span>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold">Zero Hunting</span>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-center">
                          <span className="text-[10px] text-zinc-400 font-mono-tabular font-bold uppercase">
                            Coolant Temp
                          </span>
                          <div className="text-xl font-bold font-mono-tabular text-zinc-900 mt-1">
                            91 <span className="text-xs font-normal text-zinc-500">°C</span>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold">Normal Operating</span>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-center">
                          <span className="text-[10px] text-zinc-400 font-mono-tabular font-bold uppercase">
                            12V Battery
                          </span>
                          <div className="text-xl font-bold font-mono-tabular text-zinc-900 mt-1">
                            12.8 <span className="text-xs font-normal text-zinc-500">V</span>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold">Alternator 14.2V</span>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-center">
                          <span className="text-[10px] text-zinc-400 font-mono-tabular font-bold uppercase">
                            MIL Light / DTC
                          </span>
                          <div className="text-xl font-bold font-mono-tabular text-emerald-600 mt-1">
                            0 Codes
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold">All Systems OK</span>
                        </div>
                      </div>

                      {/* ECU Protocol Stream */}
                      <div className="bg-zinc-950 text-zinc-300 font-mono-tabular text-xs rounded-2xl p-4 space-y-1.5 border border-zinc-800">
                        <div className="flex items-center justify-between text-zinc-400 pb-2 mb-2 border-b border-zinc-800 text-[11px]">
                          <span>OBD PROTOCOL: ISO 15765-4 (CAN 11/500)</span>
                          <span className="text-[#00E575]">● PROTOCOL SYNCHRONIZED</span>
                        </div>
                        <div className="text-zinc-400">[0.012s] QUERY 01 00 → PID SUPPORT: 01-20 [RESPONSE: 41 00 BE 3E B8 11]</div>
                        <div className="text-zinc-400">[0.045s] QUERY 01 01 → DTC STATUS: MIL OFF, 0 FAULT CODES STORED</div>
                        <div className="text-zinc-300">[0.082s] SCAN ECM (ENGINE CONTROL): P0000 NO CODES STORED</div>
                        <div className="text-zinc-300">[0.118s] SCAN TCM (TRANSMISSION): NO SHIFT HARSHNESS ADAPTATION ERRORS</div>
                        <div className="text-zinc-300">[0.165s] SCAN ABS / ESC: WHEEL SPEED SENSORS FL/FR/RL/RR ALL MATCHING</div>
                        <div className="text-emerald-400">[0.210s] SCAN SRS AIRBAG: SQUIB RESISTANCE 2.2 OHM NOMINAL ACROSS 6 AIRBAGS</div>
                      </div>
                    </div>
                  )}

                  {/* Tool D: Tyre Tread Depth (mm) */}
                  {activeConsoleTool === 'tyres' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-zinc-950">
                          Digital Tyre & Brake Wear Depth Scanner
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Tread depth laser gauge readings across all 4 wheel stations and emergency spare tyre.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {tyreHealth.map((tyre) => (
                          <div
                            key={tyre.position}
                            className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-zinc-900">
                                  {tyre.position}
                                </span>
                                <span className="text-xs font-mono-tabular bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                                  {tyre.status}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-500 mt-0.5">
                                {tyre.brand}
                              </p>
                            </div>

                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <div className="text-xs text-zinc-400 font-mono-tabular">Tread Depth</div>
                                <div className="text-lg font-bold font-mono-tabular text-zinc-900">
                                  {tyre.depthMm} <span className="text-xs font-normal">mm</span>
                                </div>
                              </div>
                              <div className="w-24">
                                <div className="flex justify-between text-[10px] font-mono-tabular text-zinc-500 mb-1">
                                  <span>Health</span>
                                  <span>{tyre.healthPct}%</span>
                                </div>
                                <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                                  <div
                                    className="bg-emerald-500 h-full rounded-full"
                                    style={{ width: `${tyre.healthPct}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right 5 Columns: Live Calculated Telemetry Readout & Buyer Verdict */}
                <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-200">
                      <div>
                        <div className="text-xs text-zinc-400 font-mono-tabular font-bold uppercase tracking-wider">
                          LIVE PDI TELEMETRY OUTPUT
                        </div>
                        <h4 className="text-base font-bold text-zinc-950 mt-0.5">
                          {activeCar.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono-tabular text-zinc-600 bg-white px-2.5 py-1 rounded-md border border-zinc-200 font-medium">
                        {activeCar.odometer}
                      </span>
                    </div>

                    {/* Overall Score & Leverage Metric Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs">
                        <div className="text-xs text-zinc-500 font-medium">Overall Health Score</div>
                        <div
                          data-testid="pdi-health-score"
                          className="text-3xl font-extrabold font-mono-tabular text-zinc-950 mt-1"
                        >
                          {metrics.overallHealthScore}
                          <span className="text-sm text-zinc-400 font-normal">/100</span>
                        </div>
                        <div className="text-xs text-emerald-600 mt-1 font-mono-tabular font-bold">
                          {metrics.passedCheckpoints} of {metrics.totalCheckpoints} pts passed
                        </div>
                      </div>

                      <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs">
                        <div className="text-xs text-zinc-500 font-medium">Negotiation Leverage</div>
                        <div
                          data-testid="pdi-repair-estimate"
                          className="text-2xl font-extrabold font-mono-tabular text-zinc-950 mt-1"
                        >
                          INR {metrics.totalRepairEstimateInr.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-zinc-500 mt-1">
                          Est. repair deduction
                        </div>
                      </div>
                    </div>

                    {/* Buyer Verdict Box */}
                    <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs">
                      <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-1 font-mono-tabular">
                        Automated Buyer Recommendation
                      </div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {metrics.verdictLabel}
                        </span>
                        <span className="text-xs font-mono-tabular font-bold text-[#FF4D15]">
                          {metrics.flaggedSubsystems} Flagged
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                        By presenting verified repair estimates alongside defect sensor logs in an instant live report, buyers gain genuine leverage instead of stalling purchases.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={copyLiveReportSnippet}
                      className="bg-white border border-zinc-200 hover:border-zinc-300 px-4 py-2 rounded-xl text-xs font-bold text-zinc-700 hover:text-black flex items-center gap-2 transition-all shadow-xs"
                    >
                      {copiedHtml ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Copied Embed Snippet
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#FF4D15]" />
                          Copy Embed Snippet
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewMode('html-preview')}
                      className="btn-moto-black px-5 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <FileCode2 className="w-3.5 h-3.5 text-[#00E575]" />
                      Preview Live Customer HTML Report
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: CUSTOMER LIVE HTML REPORT
              (Modeled after https://assist.inspektai.in/r/hJZdYMnaWgwuRYDo/)
          ========================================================================= */}
          {viewMode === 'html-preview' && (
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
              {/* Rainbow Gradient Line (Official InspektAI branding) */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#FB5C2E] via-[#DD38C8] to-[#6366F1]" />

              <div className="p-6 sm:p-8 space-y-6">
                {/* Header Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#FB5C2E] flex items-center justify-center text-white text-xs font-bold">
                        ★
                      </div>
                      <span className="text-xl font-extrabold tracking-tight text-zinc-950">
                        InspektAI
                      </span>
                      <span className="text-xs font-mono-tabular bg-[#FFF1EC] text-[#FB5C2E] font-bold px-2.5 py-0.5 rounded-full">
                        {activeCar.pdiId}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-zinc-950 tracking-tight">
                      PDI Report — {activeCar.title}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono-tabular">
                      VIN: {activeCar.vin} · Reg: {activeCar.regNo} · Odometer: {activeCar.odometer} · Engine: {activeCar.fuel}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <a
                      href="https://assist.inspektai.in/r/hJZdYMnaWgwuRYDo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-zinc-300 hover:border-zinc-900 px-4 py-2 rounded-xl text-xs font-bold text-zinc-900 flex items-center gap-1.5 shadow-xs transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#FB5C2E]" />
                      Open Live assist.inspektai.in URL
                    </a>
                    <button
                      type="button"
                      onClick={downloadStandaloneHtmlReport}
                      className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-xl text-xs font-bold text-zinc-900 flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-zinc-600" />
                      Download HTML Report
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('console')}
                      className="btn-moto-black px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      ← Back to Field Console
                    </button>
                  </div>
                </div>

                {/* Score Hero Card */}
                <div className="p-0.5 rounded-2xl bg-gradient-to-r from-[#FB5C2E] via-[#DD38C8] to-[#6366F1] shadow-xs">
                  <div className="bg-white rounded-[14px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                      {/* Radial Score Gauge */}
                      <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#F0ECEB"
                            strokeWidth="10"
                            fill="transparent"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#15803C"
                            strokeWidth="10"
                            strokeDasharray={264}
                            strokeDashoffset={264 - (264 * metrics.overallHealthScore) / 100}
                            strokeLinecap="round"
                            fill="transparent"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-extrabold font-mono-tabular text-zinc-950">
                            {metrics.overallHealthScore}
                          </span>
                          <span className="text-[10px] font-mono-tabular text-zinc-400">
                            /100
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono-tabular">
                          OVERALL PDI HEALTH SCORE
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {metrics.verdictLabel}
                        </div>
                        <p className="text-xs text-zinc-600 max-w-md leading-relaxed">
                          Your vehicle is in good condition with normal wear & tear. Certified for ownership with documented refurbishment observations.
                        </p>
                      </div>
                    </div>

                    <div className="border-t sm:border-t-0 sm:border-l border-zinc-200 pt-4 sm:pt-0 sm:pl-8 text-center sm:text-right space-y-1 shrink-0">
                      <div className="text-xs text-zinc-400 font-medium font-mono-tabular uppercase tracking-wider">
                        Negotiation Leverage
                      </div>
                      <div className="text-3xl font-extrabold font-mono-tabular text-zinc-950">
                        INR {metrics.totalRepairEstimateInr.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-emerald-600 font-medium">
                        Documented deduction value
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5 Key Metric Facts Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                      CHECKPOINTS
                    </div>
                    <div className="text-lg font-bold font-mono-tabular text-zinc-900 mt-1">
                      {metrics.passedCheckpoints} / {metrics.totalCheckpoints}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">180-Point Rigor</div>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                      PAINT THICKNESS
                    </div>
                    <div className="text-lg font-bold font-mono-tabular text-zinc-900 mt-1">
                      {subsystems[1].paintMicrons} µm
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Threshold: {paintTolerance} µm</div>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                      OBD-II DIAGNOSTICS
                    </div>
                    <div className="text-lg font-bold font-mono-tabular text-emerald-600 mt-1">
                      0 DTC Codes
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">ECU All Clean</div>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                      TYRE HEALTH
                    </div>
                    <div className="text-lg font-bold font-mono-tabular text-zinc-900 mt-1">
                      5.0 mm
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">~85% Tread Life</div>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 col-span-2 sm:col-span-1">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                      REFURBISHMENT
                    </div>
                    <div className="text-lg font-bold font-mono-tabular text-[#FF4D15] mt-1">
                      INR {metrics.totalRepairEstimateInr.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Verified Estimate</div>
                  </div>
                </div>

                {/* Report Section Tabs */}
                <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-3">
                  <button
                    type="button"
                    onClick={() => setReportActiveTab('summary')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      reportActiveTab === 'summary'
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                    }`}
                  >
                    180-Point Checkpoints Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportActiveTab('paint-heatmap')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      reportActiveTab === 'paint-heatmap'
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                    }`}
                  >
                    Paint Thickness Heatmap (12 Panels)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportActiveTab('obd-scan')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      reportActiveTab === 'obd-scan'
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                    }`}
                  >
                    OBD-II ECU Scan Log
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportActiveTab('tyres-brakes')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      reportActiveTab === 'tyres-brakes'
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                    }`}
                  >
                    Tyres & Brakes Wear Report
                  </button>
                </div>

                {/* Tab 1: 180-Point Checkpoints Table */}
                {reportActiveTab === 'summary' && (
                  <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-mono-tabular">
                          <th className="py-3 px-4 font-bold">SUBSYSTEM</th>
                          <th className="py-3 px-4 font-bold">CHECKPOINTS</th>
                          <th className="py-3 px-4 font-bold">SENSOR TELEMETRY</th>
                          <th className="py-3 px-4 font-bold">STATUS</th>
                          <th className="py-3 px-4 text-right font-bold">EST. REFURBISHMENT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 text-sm">
                        {subsystems.map((sub) => {
                          const isFlagged = sub.hasAnomaly || sub.paintMicrons > paintTolerance;
                          return (
                            <tr key={sub.id} className="hover:bg-zinc-50/70 transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-zinc-900">{sub.name}</div>
                                <div className="text-xs text-zinc-500 mt-0.5">
                                  {sub.findingSummary}
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-mono-tabular text-xs text-zinc-600">
                                {sub.checkpoints} pts checked
                              </td>
                              <td className="py-3.5 px-4 font-mono-tabular text-xs text-zinc-600">
                                {sub.paintMicrons} µm
                              </td>
                              <td className="py-3.5 px-4">
                                {isFlagged ? (
                                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                                    Attention Required
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    Factory Spec
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 text-right font-mono-tabular text-xs font-bold text-zinc-900">
                                {isFlagged
                                  ? `INR ${sub.repairEstimateInr.toLocaleString('en-IN')}`
                                  : 'INR 0'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab 2: Paint Thickness Heatmap */}
                {reportActiveTab === 'paint-heatmap' && (
                  <div className="space-y-4">
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-zinc-800">
                          Laser Paint Micrometer Calibration & Standard Tolerances
                        </span>
                        <span className="text-xs font-mono-tabular text-zinc-500">
                          OEM Spec: 95–135 µm
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Readings between 90 µm and 135 µm reflect untouched OEM robot paint. Readings above 140 µm indicate clearcoat blending; readings above 180 µm confirm body filler/putty application.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {carPanels.map((panel) => {
                        const isRepainted = panel.microns > paintTolerance;
                        return (
                          <div
                            key={panel.id}
                            className={`p-4 rounded-xl border ${
                              isRepainted
                                ? 'bg-amber-50/70 border-amber-300'
                                : 'bg-white border-zinc-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-zinc-900">
                                {panel.name}
                              </span>
                              <span
                                className={`text-[10px] font-mono-tabular font-bold px-2 py-0.5 rounded-full ${
                                  isRepainted
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {isRepainted ? 'REPAINTED' : 'OEM FACTORY'}
                              </span>
                            </div>
                            <div className="text-2xl font-black font-mono-tabular text-zinc-950 mt-1">
                              {panel.microns} <span className="text-xs font-normal text-zinc-400">µm</span>
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-1">
                              Factory range: {panel.factoryRange}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tab 3: OBD-II ECU Scan Log */}
                {reportActiveTab === 'obd-scan' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                        <div className="text-zinc-400 font-mono-tabular uppercase font-bold text-[10px]">ECU HEALTH</div>
                        <div className="text-base font-bold text-emerald-600 mt-1">100% Passed</div>
                      </div>
                      <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                        <div className="text-zinc-400 font-mono-tabular uppercase font-bold text-[10px]">CHECK ENGINE LIGHT</div>
                        <div className="text-base font-bold text-zinc-900 mt-1">OFF (Normal)</div>
                      </div>
                      <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                        <div className="text-zinc-400 font-mono-tabular uppercase font-bold text-[10px]">STORED DTCs</div>
                        <div className="text-base font-bold text-emerald-600 mt-1">0 Faults</div>
                      </div>
                      <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                        <div className="text-zinc-400 font-mono-tabular uppercase font-bold text-[10px]">BATTERY CRANK VOLTAGE</div>
                        <div className="text-base font-bold text-zinc-900 mt-1">10.4 V (Healthy)</div>
                      </div>
                    </div>

                    <div className="border border-zinc-200 rounded-xl overflow-hidden text-xs">
                      <div className="bg-zinc-50 px-4 py-2.5 border-b border-zinc-200 font-bold font-mono-tabular text-zinc-700">
                        DIAGNOSTIC CONTROLLER LOG · VIN {activeCar.vin}
                      </div>
                      <div className="divide-y divide-zinc-100 font-mono-tabular">
                        <div className="p-3 flex items-center justify-between">
                          <span>Engine Control Module (ECM)</span>
                          <span className="text-emerald-600 font-bold">PASS · NO FAULTS</span>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <span>Transmission Control Unit (TCU)</span>
                          <span className="text-emerald-600 font-bold">PASS · NO FAULTS</span>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <span>Anti-Lock Braking System (ABS)</span>
                          <span className="text-emerald-600 font-bold">PASS · NO FAULTS</span>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <span>Supplemental Restraint System (Airbag)</span>
                          <span className="text-emerald-600 font-bold">PASS · NO FAULTS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Tyres & Brakes */}
                {reportActiveTab === 'tyres-brakes' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {tyreHealth.slice(0, 4).map((t) => (
                        <div key={t.position} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                          <div className="text-xs font-bold text-zinc-900 mb-1">{t.position} Tyre</div>
                          <div className="text-2xl font-bold font-mono-tabular text-zinc-950">
                            {t.depthMm} <span className="text-xs font-normal text-zinc-500">mm</span>
                          </div>
                          <div className="text-xs text-zinc-500 mt-1">{t.brand}</div>
                          <div className="mt-3 flex items-center justify-between text-xs font-mono-tabular">
                            <span className="text-zinc-400">Remaining Life</span>
                            <span className="font-bold text-emerald-600">{t.healthPct}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Metadata */}
                <div className="flex flex-wrap items-center justify-between text-xs text-zinc-400 font-mono-tabular pt-4 border-t border-zinc-200">
                  <span>Inspector: {activeCar.inspector} · {activeCar.location}</span>
                  <span>Report Certified by InspektAI Neural Engine v3.4</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
