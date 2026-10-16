/**
 * Main JavaScript Application Engine
 * Pure Vanilla JavaScript & Three.js (No React)
 */
import { Automotive3DViewer } from './threeScene.js';

// Vehicle Presets Data
export const VEHICLES = {
  'tata-safari': {
    title: '2024 Tata Safari Accomplished+ Dark Edition',
    regNo: 'KA03 ND 4921',
    pdiId: '#PDI011088',
    vin: 'MAT623497N1049281',
    odometer: '14,200 km',
    fuel: 'Kryotec 2.0L Diesel · Automatic',
    colorHex: 0x18181B, // Oberon Black
    reportUrl: 'https://assist.inspektai.in/r/hJZdYMnaWgwuRYDo/',
    inspector: 'Kishore M. (Lead PDI Specialist) · Bangalore East Hub',
  },
  'used-octavia': {
    title: '2022 Škoda Octavia L&K 2.0 TSI',
    regNo: 'MH02 EK 8812',
    pdiId: '#PDI009412',
    vin: 'TMBJB7NE4N0019482',
    odometer: '28,410 km',
    fuel: '2.0 TSI Petrol · 7-Speed DSG',
    colorHex: 0x1E3A8A, // Lava Blue
    reportUrl: 'https://assist.inspektai.in/r/hJZdYMnaWgwuRYDo/',
    inspector: 'Amit Sharma (Field PDI Lead) · Mumbai Central Hub',
  },
  'new-thar': {
    title: '2026 Mahindra Thar Roxx AX7L 4WD',
    regNo: 'DL01 TC 2026',
    pdiId: '#PDI012480',
    vin: 'MA1TA2WR6T2084119',
    odometer: '42 km',
    fuel: 'mStallion TGDi · 4WD',
    colorHex: 0x14532D, // Deep Forest Green
    reportUrl: 'https://assist.inspektai.in/r/hJZdYMnaWgwuRYDo/',
    inspector: 'Rahul Verma (QC Inspector) · Gurugram Yard Hub',
  },
  'used-330i': {
    title: '2021 BMW 330i M Sport (G20)',
    regNo: 'TS09 FN 3300',
    pdiId: '#PDI008761',
    vin: 'WBA5R12090F992310',
    odometer: '34,900 km',
    fuel: 'B48 2.0L Turbo · 8-Speed Steptronic',
    colorHex: 0x2563EB, // Portimao Blue
    reportUrl: 'https://assist.inspektai.in/r/hJZdYMnaWgwuRYDo/',
    inspector: 'Karthik Rao (Senior Specialist) · Hyderabad Hitec Hub',
  },
};

// Subsystem Checkpoint Specs
export let subsystems = [
  { id: 'sys-powertrain', name: 'Engine, Transmission & ECU Diagnostics', code: 'ENG-01', checkpoints: 42, baseScore: 96, paintMicrons: 110, hasAnomaly: false, findingSummary: 'CAN-bus scanned: 0 fault codes stored. Fuel trims nominal at +1.2%.', repairEstimateInr: 12500 },
  { id: 'sys-paint', name: 'Exterior Body Panels & Paint Microns', code: 'EXT-02', checkpoints: 38, baseScore: 92, paintMicrons: 115, hasAnomaly: false, findingSummary: 'Rear left quarter panel factory clearcoat uniform. Zero putty detected.', repairEstimateInr: 18500 },
  { id: 'sys-undercarriage', name: 'Suspension, Steering & Fluid Leaks', code: 'SUS-03', checkpoints: 32, baseScore: 95, paintMicrons: 112, hasAnomaly: false, findingSummary: 'Lower control arm bushings pliable; damper rebound rates factory matched.', repairEstimateInr: 14000 },
  { id: 'sys-brakes', name: 'Braking System & Tyre Tread Wear', code: 'BRK-04', checkpoints: 28, baseScore: 94, paintMicrons: 116, hasAnomaly: false, findingSummary: 'Front pads 7.2mm remaining (~85% life). Disc rotors runout < 0.03mm.', repairEstimateInr: 9200 },
  { id: 'sys-cabin', name: 'Cabin Ergonomics & ADAS Sensors', code: 'CAB-05', checkpoints: 24, baseScore: 98, paintMicrons: 108, hasAnomaly: false, findingSummary: '360° camera calibrated; AC evaporator cools to 6.2°C in 90 seconds.', repairEstimateInr: 7800 },
  { id: 'sys-roadtest', name: 'Dynamic Road Test & NVH Analysis', code: 'DYN-06', checkpoints: 16, baseScore: 96, paintMicrons: 114, hasAnomaly: false, findingSummary: 'Gear transitions crisp under load; steering rack zero dead-zone at 80 km/h.', repairEstimateInr: 21000 },
];

// Car Panels for Laser Micrometer & 3D Viewer Focus
export const PANELS = [
  { id: 'panel-hood', key: 'hood', name: 'Bonnet / Hood', microns: 112, factoryRange: '100–125 µm', notes: 'Uniform OEM clearcoat. Zero stone chips or clear peel.' },
  { id: 'panel-roof', key: 'roof', name: 'Roof Panel', microns: 108, factoryRange: '95–120 µm', notes: 'Original robot-applied factory paint. Sunroof seals pristine.' },
  { id: 'panel-f-left', key: 'hood', name: 'Front Left Fender', microns: 118, factoryRange: '100–130 µm', notes: 'OEM primer and finish. Fastener torque marks intact.' },
  { id: 'panel-f-right', key: 'hood', name: 'Front Right Fender', microns: 115, factoryRange: '100–130 µm', notes: 'Factory spec. No fender apron distortion.' },
  { id: 'panel-d-door', key: 'door', name: 'Driver Door (FL)', microns: 114, factoryRange: '100–130 µm', notes: 'Original factory coating. Door hinge pins factory aligned.' },
  { id: 'panel-r-door', key: 'door', name: 'Rear Right Door (RR)', microns: 122, factoryRange: '100–130 µm', notes: 'OEM paint depth. Window channel weather-stripping verified.' },
  { id: 'panel-quarter', key: 'quarter', name: 'Rear Left Quarter', microns: 124, factoryRange: '100–135 µm', notes: 'Factory original paint verified across 8 probe points.' },
  { id: 'panel-boot', key: 'tailgate', name: 'Tailgate / Boot Lid', microns: 116, factoryRange: '100–130 µm', notes: 'Factory paint depth. Defogger lines and hydraulic struts nominal.' },
];

export const TYRES = [
  { position: 'Front Left', depthMm: 5.2, healthPct: 86, brand: 'Bridgestone Turanza 235/60 R18', status: 'Optimal' },
  { position: 'Front Right', depthMm: 5.1, healthPct: 85, brand: 'Bridgestone Turanza 235/60 R18', status: 'Optimal' },
  { position: 'Rear Left', depthMm: 4.8, healthPct: 80, brand: 'Bridgestone Turanza 235/60 R18', status: 'Good' },
  { position: 'Rear Right', depthMm: 4.9, healthPct: 82, brand: 'Bridgestone Turanza 235/60 R18', status: 'Good' },
  { position: 'Spare Wheel', depthMm: 7.2, healthPct: 100, brand: 'Steel Rim Emergency Spare', status: 'Unused / 100%' },
];

let selectedVehicleKey = 'tata-safari';
let paintTolerance = 140;
let selectedPanelId = 'panel-hood';
let viewer3D = null;

// Calculation Engine
export function calculateMetrics() {
  const totalPoints = subsystems.reduce((sum, s) => sum + s.checkpoints, 0);
  let flaggedCount = 0;
  let totalDeduction = 0;
  let weightedScoreSum = 0;

  subsystems.forEach(sub => {
    const isFlagged = sub.hasAnomaly || sub.paintMicrons > paintTolerance;
    if (isFlagged) {
      flaggedCount++;
      totalDeduction += sub.repairEstimateInr;
      weightedScoreSum += (sub.baseScore - 18) * sub.checkpoints;
    } else {
      weightedScoreSum += sub.baseScore * sub.checkpoints;
    }
  });

  const overallHealthScore = Math.max(50, Math.min(100, Math.round(weightedScoreSum / totalPoints)));
  const passedCheckpoints = totalPoints - (flaggedCount * 6);

  let verdictLabel = 'Certified Pass with Minor Leverage';
  if (overallHealthScore >= 92 && flaggedCount === 0) {
    verdictLabel = 'Pristine · Factory Certified Grade A';
  } else if (overallHealthScore < 80 || flaggedCount >= 3) {
    verdictLabel = 'Caution · Significant Refurbishment Needed';
  }

  return {
    totalPoints,
    passedCheckpoints,
    flaggedCount,
    totalDeduction,
    overallHealthScore,
    verdictLabel,
  };
}

// Render Subsystem Cards
export function renderSubsystems() {
  const grid = document.getElementById('subsystems-grid');
  if (!grid) return;

  grid.innerHTML = subsystems.map(sub => {
    const isFlagged = sub.hasAnomaly || sub.paintMicrons > paintTolerance;
    return `
      <button
        type="button"
        onclick="window.automotoApp.toggleAnomaly('${sub.id}')"
        class="text-left p-4 rounded-2xl border transition-all cursor-pointer ${
          isFlagged
            ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300 shadow-xs'
            : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-xs'
        }"
      >
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-xs font-mono-tabular text-zinc-500 font-medium">
            ${sub.code} · ${sub.checkpoints} pts
          </span>
          <span class="text-[11px] font-mono-tabular font-bold">
            ${
              isFlagged
                ? `<span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full inline-flex items-center gap-1">⚠️ FLAGGED</span>`
                : `<span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full inline-flex items-center gap-1">✓ NOMINAL</span>`
            }
          </span>
        </div>
        <div class="text-sm font-bold text-zinc-900 mb-1">${sub.name}</div>
        <p class="text-xs text-zinc-500 line-clamp-2">
          ${isFlagged ? sub.findingSummary : 'All sensor telemetry and mechanical tolerances verified within factory threshold.'}
        </p>
        ${
          isFlagged
            ? `<div class="mt-2 text-xs font-mono-tabular font-bold text-[#FF4D15] flex items-center justify-between">
                <span>Deduction Leverage:</span>
                <span>INR ${sub.repairEstimateInr.toLocaleString('en-IN')}</span>
              </div>`
            : ''
        }
      </button>
    `;
  }).join('');

  renderReportTable();
  updateReadoutDisplays();
}

// Render Customer Report Table
export function renderReportTable() {
  const tbody = document.getElementById('report-table-body');
  if (!tbody) return;

  tbody.innerHTML = subsystems.map(sub => {
    const isFlagged = sub.hasAnomaly || sub.paintMicrons > paintTolerance;
    return `
      <tr class="hover:bg-zinc-50/70 transition-colors">
        <td class="py-3.5 px-4">
          <div class="font-bold text-zinc-900">${sub.name}</div>
          <div class="text-xs text-zinc-500 mt-0.5">${sub.findingSummary}</div>
        </td>
        <td class="py-3.5 px-4 font-mono-tabular text-xs text-zinc-600">${sub.checkpoints} pts checked</td>
        <td class="py-3.5 px-4 font-mono-tabular text-xs text-zinc-600">${sub.paintMicrons} µm</td>
        <td class="py-3.5 px-4">
          ${
            isFlagged
              ? `<span class="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-bold">⚠️ Attention Required</span>`
              : `<span class="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-xs font-bold">✓ Factory Spec</span>`
          }
        </td>
        <td class="py-3.5 px-4 text-right font-mono-tabular text-xs font-bold text-zinc-900">
          INR ${isFlagged ? sub.repairEstimateInr.toLocaleString('en-IN') : '0'}
        </td>
      </tr>
    `;
  }).join('');
}

// Update Readout Displays
export function updateReadoutDisplays() {
  const m = calculateMetrics();

  const scoreNum = document.getElementById('score-display-num');
  if (scoreNum) scoreNum.innerHTML = `${m.overallHealthScore}<span class="text-sm text-zinc-400 font-normal">/100</span>`;

  const checkStr = document.getElementById('checkpoints-passed-str');
  if (checkStr) checkStr.innerText = `${m.passedCheckpoints} of ${m.totalPoints} pts passed`;

  const repairNum = document.getElementById('repair-estimate-num');
  if (repairNum) repairNum.innerText = `INR ${m.totalDeduction.toLocaleString('en-IN')}`;

  const verdictLabel = document.getElementById('verdict-label-str');
  if (verdictLabel) {
    verdictLabel.innerHTML = `<span class="text-emerald-600">✓</span> ${m.verdictLabel}`;
  }

  const flaggedCount = document.getElementById('flagged-count-str');
  if (flaggedCount) flaggedCount.innerText = `${m.flaggedCount} Flagged`;

  const rScoreNum = document.getElementById('report-score-num');
  if (rScoreNum) rScoreNum.innerText = m.overallHealthScore;

  const rSvgCircle = document.getElementById('report-svg-circle');
  if (rSvgCircle) {
    const dashOffset = 264 - (264 * m.overallHealthScore) / 100;
    rSvgCircle.setAttribute('stroke-dashoffset', dashOffset.toString());
  }

  const rVerdictBadge = document.getElementById('report-verdict-badge');
  if (rVerdictBadge) {
    rVerdictBadge.innerHTML = `<span class="text-emerald-600">✓</span> ${m.verdictLabel}`;
  }

  const rRepairNum = document.getElementById('report-repair-num');
  if (rRepairNum) rRepairNum.innerText = `INR ${m.totalDeduction.toLocaleString('en-IN')}`;

  const rKpiCheck = document.getElementById('report-kpi-checkpoints');
  if (rKpiCheck) rKpiCheck.innerText = `${m.passedCheckpoints} / ${m.totalPoints}`;

  const rKpiRefurb = document.getElementById('report-kpi-refurb');
  if (rKpiRefurb) rKpiRefurb.innerText = `INR ${m.totalDeduction.toLocaleString('en-IN')}`;

  const rKpiPaint = document.getElementById('report-kpi-paint');
  if (rKpiPaint) rKpiPaint.innerText = `${subsystems[1].paintMicrons} µm`;
}

// Toggle Anomaly
export function toggleAnomaly(id) {
  subsystems = subsystems.map(item => {
    if (item.id === id) {
      const nextAnomaly = !item.hasAnomaly;
      return {
        ...item,
        hasAnomaly: nextAnomaly,
        paintMicrons: item.id === 'sys-paint' ? (nextAnomaly ? 185 : 115) : item.paintMicrons,
      };
    }
    return item;
  });

  const quarterPanel = PANELS.find(p => p.id === 'panel-quarter');
  if (quarterPanel) {
    quarterPanel.microns = subsystems[1].hasAnomaly ? 185 : 124;
  }

  renderSubsystems();
  renderPaintPanels();

  // If paint anomaly was toggled, focus 3D car on quarter panel
  if (id === 'sys-paint' && viewer3D) {
    viewer3D.focusPanel('quarter');
  }
}

// Reset All Checkpoints
export function resetAllCheckpoints() {
  subsystems = subsystems.map(s => ({
    ...s,
    hasAnomaly: false,
    paintMicrons: 112,
  }));
  paintTolerance = 140;
  const slider = document.getElementById('paint-tolerance-input');
  if (slider) slider.value = '140';
  updatePaintTolerance(140);
  renderSubsystems();
  renderPaintPanels();
  if (viewer3D) {
    viewer3D.focusPanel('hood');
  }
}

// Update Paint Tolerance
export function updatePaintTolerance(val) {
  paintTolerance = val;
  const label = document.getElementById('slider-val-label');
  if (label) {
    label.innerText = `${val} µm (Rear Quarter: ${subsystems[1].paintMicrons} µm)`;
  }
  renderSubsystems();
  renderPaintPanels();
}

// Select Vehicle
export function selectVehicle(key) {
  selectedVehicleKey = key;
  const veh = VEHICLES[key];

  document.querySelectorAll('.veh-btn').forEach(btn => {
    if (btn.getAttribute('data-veh') === key) {
      btn.className = 'veh-btn px-3.5 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-all bg-zinc-950 text-white shadow-xs';
    } else {
      btn.className = 'veh-btn px-3.5 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-all bg-zinc-100 text-zinc-700 hover:bg-zinc-200';
    }
  });

  const cVin = document.getElementById('console-vin-badge');
  if (cVin) cVin.innerText = `VIN · ${veh.vin}`;

  const cTitle = document.getElementById('console-vehicle-title');
  if (cTitle) cTitle.innerText = veh.title;

  const cOdo = document.getElementById('console-vehicle-odo');
  if (cOdo) cOdo.innerText = veh.odometer;

  const liveLink = document.getElementById('live-report-link');
  if (liveLink) liveLink.href = veh.reportUrl;

  const rBadge = document.getElementById('report-pdi-badge');
  if (rBadge) rBadge.innerText = veh.pdiId;

  const rTitle = document.getElementById('report-vehicle-title');
  if (rTitle) rTitle.innerText = `PDI Report — ${veh.title}`;

  const rMeta = document.getElementById('report-vehicle-meta');
  if (rMeta) rMeta.innerText = `VIN: ${veh.vin} · Reg: ${veh.regNo} · Odometer: ${veh.odometer} · Engine: ${veh.fuel}`;

  const rInspector = document.getElementById('report-inspector-meta');
  if (rInspector) rInspector.innerText = `Inspector: ${veh.inspector}`;

  // Update 3D car color
  if (viewer3D && veh.colorHex) {
    viewer3D.setCarColor(veh.colorHex);
  }

  updateReadoutDisplays();
}

// Switch Primary View Mode
export function switchViewMode(mode) {
  const consoleContainer = document.getElementById('view-console-container');
  const reportContainer = document.getElementById('view-report-container');
  const btnConsole = document.getElementById('btn-mode-console');
  const btnReport = document.getElementById('btn-mode-report');

  if (mode === 'console') {
    if (consoleContainer) consoleContainer.classList.remove('hidden');
    if (reportContainer) reportContainer.classList.add('hidden');
    if (btnConsole) btnConsole.className = 'px-5 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all bg-zinc-950 text-white shadow-xs flex items-center gap-2';
    if (btnReport) btnReport.className = 'px-5 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 flex items-center gap-2';
  } else {
    if (consoleContainer) consoleContainer.classList.add('hidden');
    if (reportContainer) reportContainer.classList.remove('hidden');
    if (btnConsole) btnConsole.className = 'px-5 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 flex items-center gap-2';
    if (btnReport) btnReport.className = 'px-5 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all bg-zinc-950 text-white shadow-xs flex items-center gap-2';
  }
}

// Switch Console Tool Tab
export function switchConsoleTab(toolKey) {
  const tools = ['checklist', 'paint', 'obd', 'tyres'];
  tools.forEach(t => {
    const view = document.getElementById(`tool-view-${t}`);
    const btn = document.getElementById(`tab-btn-${t}`);
    if (t === toolKey) {
      if (view) view.classList.remove('hidden');
      if (btn) btn.className = 'console-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 bg-white text-zinc-950 shadow-xs border border-zinc-200';
    } else {
      if (view) view.classList.add('hidden');
      if (btn) btn.className = 'console-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 text-zinc-600 hover:text-zinc-950';
    }
  });

  if (toolKey === 'paint' && viewer3D) {
    viewer3D.focusPanel('hood');
  }
}

// Render Paint Panels
export function renderPaintPanels() {
  const grid = document.getElementById('paint-panels-grid');
  if (!grid) return;

  grid.innerHTML = PANELS.map(panel => {
    const isSelected = panel.id === selectedPanelId;
    const isOver = panel.microns > paintTolerance;
    return `
      <button
        type="button"
        onclick="window.automotoApp.selectPaintPanel('${panel.id}')"
        class="p-3 rounded-xl border text-left transition-all ${
          isSelected
            ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
            : isOver
            ? 'bg-amber-50 text-zinc-900 border-amber-300'
            : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300'
        }"
      >
        <div class="text-[11px] font-mono-tabular opacity-70 mb-1">${panel.name}</div>
        <div class="text-lg font-bold font-mono-tabular">
          ${panel.microns} <span class="text-xs font-normal">µm</span>
        </div>
        <div class="text-[10px] font-mono-tabular mt-1 font-semibold">
          ${
            isOver
              ? `<span class="${isSelected ? 'text-amber-300' : 'text-amber-700'}">Repainted panel</span>`
              : `<span class="${isSelected ? 'text-emerald-300' : 'text-emerald-700'}">Factory OEM</span>`
          }
        </div>
      </button>
    `;
  }).join('');

  renderActivePanelDetail();
}

export function selectPaintPanel(id) {
  selectedPanelId = id;
  const panel = PANELS.find(p => p.id === id);
  renderPaintPanels();

  if (viewer3D && panel && panel.key) {
    viewer3D.focusPanel(panel.key);
  }
}

export function renderActivePanelDetail() {
  const detail = document.getElementById('active-panel-detail');
  if (!detail) return;
  const panel = PANELS.find(p => p.id === selectedPanelId) || PANELS[0];
  const isRepainted = panel.microns > paintTolerance;

  detail.innerHTML = `
    <div class="flex items-center justify-between pb-3 border-b border-zinc-200">
      <div>
        <span class="text-xs text-zinc-400 font-mono-tabular uppercase font-bold">Selected Body Panel</span>
        <div class="text-base font-bold text-zinc-900 mt-0.5">${panel.name}</div>
      </div>
      <div class="text-right">
        <span class="text-xs text-zinc-400 font-mono-tabular uppercase font-bold">Measured Thickness</span>
        <div class="text-2xl font-black font-mono-tabular text-zinc-950">${panel.microns} µm</div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 text-xs">
      <div>
        <span class="text-zinc-500 font-medium">OEM Standard Window:</span>
        <div class="font-bold font-mono-tabular text-zinc-800 mt-0.5">${panel.factoryRange}</div>
      </div>
      <div>
        <span class="text-zinc-500 font-medium">Structural Diagnosis:</span>
        <div class="font-bold text-zinc-800 mt-0.5">
          ${isRepainted ? 'Non-Factory Clearcoat Blend Detected' : 'Original Factory Primer & Clear'}
        </div>
      </div>
    </div>
    <p class="text-xs text-zinc-600 bg-white p-3 rounded-xl border border-zinc-200 leading-relaxed">
      ${panel.notes}
    </p>
  `;
}

// Render Tyres
export function renderTyres() {
  const container = document.getElementById('tyres-list-container');
  if (!container) return;

  container.innerHTML = TYRES.map(t => `
    <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold text-zinc-900">${t.position}</span>
          <span class="text-xs font-mono-tabular bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
            ${t.status}
          </span>
        </div>
        <p class="text-xs text-zinc-500 mt-0.5">${t.brand}</p>
      </div>
      <div class="flex items-center gap-6">
        <div class="text-right">
          <div class="text-xs text-zinc-400 font-mono-tabular">Tread Depth</div>
          <div class="text-lg font-bold font-mono-tabular text-zinc-900">
            ${t.depthMm} <span class="text-xs font-normal">mm</span>
          </div>
        </div>
        <div class="w-24">
          <div class="flex justify-between text-[10px] font-mono-tabular text-zinc-500 mb-1">
            <span>Health</span>
            <span>${t.healthPct}%</span>
          </div>
          <div class="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
            <div class="bg-emerald-500 h-full rounded-full" style="width: ${t.healthPct}%;"></div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Run ECU Scan Simulation
export function runEcuScan() {
  const btn = document.getElementById('btn-scan-ecu');
  const text = document.getElementById('scan-btn-text');
  if (!btn || !text) return;

  btn.disabled = true;
  text.innerText = 'Scanning 14 ECUs...';

  setTimeout(() => {
    btn.disabled = false;
    text.innerText = 'Run Live ECU Scan';
    const log = document.getElementById('obd-terminal-log');
    if (log) {
      log.innerHTML += `
        <div class="text-emerald-400 pt-2 border-t border-zinc-800">
          [+1.200s] RE-SCAN COMPLETED: 14/14 ECUs RESPONDING · 0 FAULT CODES STORED (100% HEALTHY)
        </div>
      `;
      log.scrollTop = log.scrollHeight;
    }
  }, 1200);
}

// Copy Report Snippet
export function copyReportSnippet() {
  const veh = VEHICLES[selectedVehicleKey];
  const m = calculateMetrics();
  const snippet = `<!-- InspektAI Live HTML PDI Report (${veh.title} · ${veh.pdiId}) -->\n<section class="inspektai-report" data-vin="${veh.vin}" data-score="${m.overallHealthScore}">\n  <h2>${veh.title} — ${m.verdictLabel}</h2>\n  <p>Report ${veh.pdiId} · Passed ${m.passedCheckpoints}/${m.totalPoints} Points · Leverage: INR ${m.totalDeduction.toLocaleString('en-IN')}</p>\n  <p>Verified URL: ${veh.reportUrl}</p>\n</section>`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(snippet);
  }

  const text = document.getElementById('copy-btn-text');
  if (text) {
    text.innerText = 'Copied Snippet!';
    setTimeout(() => { text.innerText = 'Copy Embed Snippet'; }, 2000);
  }
}

// Download Standalone HTML Report
export function downloadHtmlReportFile() {
  const veh = VEHICLES[selectedVehicleKey];
  const m = calculateMetrics();
  const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>InspektAI PDI Report – ${veh.title}</title><style>body{font-family:sans-serif;padding:32px;background:#FAFAFA;} .card{background:#fff;padding:32px;border-radius:16px;max-width:800px;margin:0 auto;box-shadow:0 4px 20px rgba(0,0,0,0.06);}</style></head><body><div class="card"><h1>${veh.title}</h1><p>Report: ${veh.pdiId} · Score: ${m.overallHealthScore}/100</p><p>Refurbishment Leverage: INR ${m.totalDeduction.toLocaleString('en-IN')}</p><p>Live link: ${veh.reportUrl}</p></div></body></html>`;

  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `InspektAI-PDI-Report-${veh.pdiId.replace('#', '')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Scroll Reveal
export function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Attach all functions to window for onclick handlers
window.automotoApp = {
  toggleAnomaly,
  resetAllCheckpoints,
  updatePaintTolerance,
  selectVehicle,
  switchViewMode,
  switchConsoleTab,
  selectPaintPanel,
  runEcuScan,
  copyReportSnippet,
  downloadHtmlReportFile,
};

// Initialize Application & Three.js 3D Viewer
document.addEventListener('DOMContentLoaded', () => {
  renderSubsystems();
  renderPaintPanels();
  renderTyres();
  initScrollObserver();

  // Initialize Three.js 3D Automotive Diagnostic Viewer in Hero Section
  const canvasContainer = document.getElementById('three-car-viewport');
  if (canvasContainer) {
    viewer3D = new Automotive3DViewer('three-car-viewport', {
      carColor: VEHICLES[selectedVehicleKey].colorHex,
      autoRotate: true,
    });
    window.automoto3D = viewer3D;
  }
});
