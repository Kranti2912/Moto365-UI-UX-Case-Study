import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePdiReportMetrics,
  simulateOperationsImpact,
  validateReviewRequest,
  type PdiSubsystem,
} from './caseStudyLogic.ts';

const sampleSubsystems: PdiSubsystem[] = [
  {
    id: 'engine-obd',
    name: 'Engine & OBD-II Telemetry',
    code: 'SYS-01',
    checkpoints: 42,
    baseScore: 96,
    paintMicrons: 115,
    hasAnomaly: false,
    findingSummary: 'Zero fault codes across ECM/TCM modules; compression nominal.',
    repairEstimateInr: 14500,
  },
  {
    id: 'paint-chassis',
    name: 'Laser Paint & Chassis Geometry',
    code: 'SYS-02',
    checkpoints: 38,
    baseScore: 94,
    paintMicrons: 118,
    hasAnomaly: false,
    findingSummary: 'Factory clearcoat 110–122µm across all pillars and panels.',
    repairEstimateInr: 18000,
  },
];

test('calculatePdiReportMetrics computes Certified Grade A when no anomalies exist', () => {
  const result = calculatePdiReportMetrics(sampleSubsystems, 140);
  assert.equal(result.totalCheckpoints, 80);
  assert.equal(result.passedCheckpoints, 80);
  assert.equal(result.flaggedSubsystems, 0);
  assert.equal(result.totalRepairEstimateInr, 0);
  assert.equal(result.verdictLabel, 'Certified Grade A');
  assert.ok(result.overallHealthScore >= 94);
});

test('calculatePdiReportMetrics flags anomaly and calculates repair estimate accurately', () => {
  const flagged = [
    sampleSubsystems[0],
    {
      ...sampleSubsystems[1],
      hasAnomaly: true,
      paintMicrons: 215,
      repairEstimateInr: 18000,
    },
  ];
  const result = calculatePdiReportMetrics(flagged, 140);
  assert.equal(result.flaggedSubsystems, 1);
  assert.equal(result.totalRepairEstimateInr, 18000);
  assert.equal(result.verdictLabel, 'Minor Refurbishment Advisory');
  assert.ok(result.overallHealthScore < 94);
});

test('simulateOperationsImpact reproduces verified case study metrics (20% booking reduction, 40% ops speedup, 45-60% sales lift)', () => {
  const sim = simulateOperationsImpact({
    monthlyInspections: 320,
    garageJobCards: 240,
    aiAutomationEnabled: true,
    tecdocIntegrated: true,
  });

  assert.equal(sim.bookingTimeSavedPercent, 20);
  assert.equal(sim.opsSpeedupPercent, 40);
  assert.ok(sim.projectedSalesLiftPercent >= 45 && sim.projectedSalesLiftPercent <= 60);
  assert.ok(sim.bookingTimeMinutes < 6.5);
});

test('validateReviewRequest rejects invalid email or empty fields', () => {
  assert.equal(
    validateReviewRequest({
      recruiterName: '',
      companyOrTeam: 'Linear',
      email: 'alex@linear.app',
      interestRole: 'Product Designer',
      notes: '',
    }).valid,
    false
  );

  assert.equal(
    validateReviewRequest({
      recruiterName: 'Alex',
      companyOrTeam: 'Linear',
      email: 'invalid-email',
      interestRole: 'Product Designer',
      notes: '',
    }).valid,
    false
  );

  assert.equal(
    validateReviewRequest({
      recruiterName: 'Alex Rivera',
      companyOrTeam: 'Stripe Design',
      email: 'alex@stripe.com',
      interestRole: 'Senior Product Designer',
      notes: 'Impressed by the live PDI report architecture.',
    }).valid,
    true
  );
});
