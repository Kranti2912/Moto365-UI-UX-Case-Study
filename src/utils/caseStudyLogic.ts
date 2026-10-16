export interface PdiSubsystem {
  id: string;
  name: string;
  code: string;
  checkpoints: number;
  baseScore: number;
  paintMicrons: number;
  hasAnomaly: boolean;
  findingSummary: string;
  repairEstimateInr: number;
}

export interface PdiReportMetrics {
  overallHealthScore: number;
  passedCheckpoints: number;
  totalCheckpoints: number;
  flaggedSubsystems: number;
  totalRepairEstimateInr: number;
  verdictLabel: 'Certified Grade A' | 'Minor Refurbishment Advisory' | 'Critical Mechanical Hold';
  trustClarityIndex: number;
}

export interface WorkflowSimulationInput {
  monthlyInspections: number;
  garageJobCards: number;
  aiAutomationEnabled: boolean;
  tecdocIntegrated: boolean;
}

export interface WorkflowSimulationOutput {
  bookingTimeMinutes: number;
  bookingTimeSavedPercent: number;
  adminHoursPerMonth: number;
  opsSpeedupPercent: number;
  projectedSalesLiftPercent: number;
  monthlyRevenueDeltaLakhs: number;
}

export interface ReviewRequestInput {
  recruiterName: string;
  companyOrTeam: string;
  email: string;
  interestRole: string;
  notes: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Pure calculation of live HTML PDI Report metrics from subsystem states.
 */
export function calculatePdiReportMetrics(
  subsystems: PdiSubsystem[],
  paintToleranceMicrons: number = 140
): PdiReportMetrics {
  if (!subsystems || subsystems.length === 0) {
    return {
      overallHealthScore: 0,
      passedCheckpoints: 0,
      totalCheckpoints: 0,
      flaggedSubsystems: 0,
      totalRepairEstimateInr: 0,
      verdictLabel: 'Critical Mechanical Hold',
      trustClarityIndex: 0,
    };
  }

  let totalCheckpoints = 0;
  let passedCheckpoints = 0;
  let weightedScoreSum = 0;
  let flaggedSubsystems = 0;
  let totalRepairEstimateInr = 0;

  for (const sub of subsystems) {
    totalCheckpoints += sub.checkpoints;
    const isPaintFlagged = sub.paintMicrons > paintToleranceMicrons;
    const isFlagged = sub.hasAnomaly || isPaintFlagged;

    if (isFlagged) {
      flaggedSubsystems += 1;
      const effectivePenalty = sub.hasAnomaly ? 18 : 9;
      const adjustedScore = Math.max(45, sub.baseScore - effectivePenalty);
      weightedScoreSum += adjustedScore * sub.checkpoints;
      passedCheckpoints += Math.max(0, sub.checkpoints - (sub.hasAnomaly ? 3 : 1));
      totalRepairEstimateInr += sub.hasAnomaly ? sub.repairEstimateInr : Math.round(sub.repairEstimateInr * 0.45);
    } else {
      weightedScoreSum += sub.baseScore * sub.checkpoints;
      passedCheckpoints += sub.checkpoints;
    }
  }

  const overallHealthScore = Math.round(weightedScoreSum / totalCheckpoints);

  let verdictLabel: PdiReportMetrics['verdictLabel'] = 'Certified Grade A';
  if (overallHealthScore < 75 || flaggedSubsystems >= 3) {
    verdictLabel = 'Critical Mechanical Hold';
  } else if (overallHealthScore < 90 || flaggedSubsystems >= 1) {
    verdictLabel = 'Minor Refurbishment Advisory';
  }

  // Higher transparency when anomalies are clearly itemized with INR repair estimates
  const trustClarityIndex = Math.min(99, 88 + Math.min(11, subsystems.length * 2));

  return {
    overallHealthScore,
    passedCheckpoints,
    totalCheckpoints,
    flaggedSubsystems,
    totalRepairEstimateInr,
    verdictLabel,
    trustClarityIndex,
  };
}

/**
 * Pure calculation for Automoto -> Moto365 UX & AI Operations impact simulator.
 * Reflects verified project metrics:
 * - 45%-60% increase in sales
 * - 20% reduced booking time
 * - 40% faster operations and admin flow
 */
export function simulateOperationsImpact(input: WorkflowSimulationInput): WorkflowSimulationOutput {
  const safeInspections = Math.max(10, Math.min(5000, Math.round(input.monthlyInspections)));
  const safeJobCards = Math.max(10, Math.min(5000, Math.round(input.garageJobCards)));

  // Legacy booking took 6.5 minutes on average; redesigned Assist flow reduces by 20%
  const baseBookingMinutes = 6.5;
  const bookingTimeSavedPercent = input.aiAutomationEnabled ? 20 : 8;
  const bookingTimeMinutes = Number(
    (baseBookingMinutes * (1 - bookingTimeSavedPercent / 100)).toFixed(1)
  );

  // Admin & Operations speed: +40% faster when both AI automation & TecDoc catalog are active
  let opsSpeedupPercent = 12;
  if (input.aiAutomationEnabled && input.tecdocIntegrated) {
    opsSpeedupPercent = 40;
  } else if (input.aiAutomationEnabled || input.tecdocIntegrated) {
    opsSpeedupPercent = 25;
  }

  const baseAdminHours = (safeInspections * 0.35) + (safeJobCards * 0.45);
  const adminHoursPerMonth = Math.round(baseAdminHours * (1 - opsSpeedupPercent / 100));

  // Sales conversion lift: 45% to 60% range based on live HTML PDI trust + TecDoc clarity
  let projectedSalesLiftPercent = 22;
  if (input.aiAutomationEnabled && input.tecdocIntegrated) {
    projectedSalesLiftPercent = Math.min(
      60,
      45 + Math.round(((safeInspections + safeJobCards) / 1000) * 15)
    );
  } else if (input.aiAutomationEnabled) {
    projectedSalesLiftPercent = 45;
  }

  const monthlyRevenueDeltaLakhs = Number(
    (((safeInspections * 0.025 + safeJobCards * 0.042) * (projectedSalesLiftPercent / 100))).toFixed(1)
  );

  return {
    bookingTimeMinutes,
    bookingTimeSavedPercent,
    adminHoursPerMonth,
    opsSpeedupPercent,
    projectedSalesLiftPercent,
    monthlyRevenueDeltaLakhs,
  };
}

/**
 * Validates recruiter / hiring manager review form inputs without silent fallbacks.
 */
export function validateReviewRequest(input: ReviewRequestInput): ValidationResult {
  const name = input.recruiterName.trim();
  const company = input.companyOrTeam.trim();
  const email = input.email.trim();

  if (name.length < 2) {
    return { valid: false, error: 'Please enter your name (at least 2 characters).' };
  }
  if (company.length < 2) {
    return { valid: false, error: 'Please enter your company or studio name.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please provide a valid work email address.' };
  }
  return { valid: true };
}
