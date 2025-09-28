/**
 * computeRisk.ts
 * Purpose: Encapsulate the risk calculation logic derived from the SCCCG-AML-2025 document.
 * Produces RiskResult with explanations for Baseline, Post-Induction, and Post-Consolidation-1.
 */

import {
  BaselineState,
  ConsolidationState,
  GeneKey,
  InductionState,
  RiskResult,
  RiskLevel
} from './types'

/**
 * Helper: Checks whether any of the provided keys is selected in a list.
 */
function anySelected(selected: GeneKey[], keys: GeneKey[]): boolean {
  return keys.some(k => selected.includes(k))
}

/**
 * Baseline risk calculation based on Table 2 and Table 3 summary rules.
 * - Favorable vs Intermediate vs Adverse gene buckets
 * - Special cases: NPM1+FLT3-ITD AR≥0.5 → not favorable; CBF+KIT D816V → not favorable
 * - WBC>100 shifts low→intermediate
 */
export function computeBaselineRisk(state: BaselineState): RiskResult {
  const reasons: string[] = []

  const hasFavorableRaw = state.favorable.length > 0
  const hasIntermediate = state.intermediate.length > 0
  const hasAdverse = state.adverse.length > 0

  // Identify special components inside favorable for further adjustments.
  const hasNPM1 = state.favorable.includes(GeneKey.NPM1)
  const hasCBF =
    state.favorable.includes(GeneKey.RUNX1_RUNX1T1) ||
    state.favorable.includes(GeneKey.CBFB_MYH11)

  // Is FLT3-ITD selected in any group (intermediate bucket in our schema)
  const hasFLT3ITD = state.intermediate.includes(GeneKey.FLT3_ITD)
  const flt3AR = state.flt3ITDAllelicRatio ?? null

  // Adjustments that make "favorable" no longer count as favorable
  let adjustedFavorable = [...state.favorable]
  if (hasNPM1 && hasFLT3ITD && flt3AR !== null && flt3AR >= 0.5) {
    // NPM1 with FLT3-ITD AR≥0.5 → considered intermediate by the guideline note
    reasons.push('NPM1 + FLT3-ITD (AR≥0.5) → not favorable, treated as intermediate')
    adjustedFavorable = adjustedFavorable.filter(k => k !== GeneKey.NPM1)
  }
  if (hasCBF && state.hasKITD816V) {
    reasons.push('CBF (t(8;21)/inv(16)) + KIT D816V → not favorable, treated as intermediate')
    adjustedFavorable = adjustedFavorable.filter(
      k => k !== GeneKey.RUNX1_RUNX1T1 && k !== GeneKey.CBFB_MYH11
    )
  }

  const hasFavorable = adjustedFavorable.length > 0

  // Direct rule interactions
  if (hasAdverse && !hasFavorable) {
    reasons.push('Adverse gene(s) present without favorable genes → High risk')
    return { level: 'high', reasons }
  }

  if (hasAdverse && hasFavorable) {
    reasons.push('Favorable + Adverse genes together → Shift to Intermediate')
    return { level: 'intermediate', reasons }
  }

  if (hasFavorable) {
    if (state.wbc !== null && state.wbc > 100) {
      reasons.push('Favorable genes, but WBC>100×10^9/L at diagnosis → Shift to Intermediate')
      return { level: 'intermediate', reasons }
    }
    reasons.push('Favorable genes without adverse modifiers → Low risk')
    return { level: 'low', reasons }
  }

  if (hasIntermediate || hasFLT3ITD) {
    reasons.push('Intermediate-risk gene(s) present → Intermediate risk')
    return { level: 'intermediate', reasons }
  }

  reasons.push('No specific risk-defining genes selected → Default to Intermediate risk')
  return { level: 'intermediate', reasons }
}

/**
 * Post-induction risk calculation per Table 3.
 * - If NR → High
 * - If CR + BM flow <0.1% and blood WT1 drop >1 log → Low
 * - If inconsistent → Intermediate
 * - Else → Intermediate
 */
export function computeInductionRisk(state: InductionState): RiskResult {
  const reasons: string[] = []

  if (!state.crAchieved) {
    reasons.push('Induction end: hematologic NR → High risk')
    return { level: 'high', reasons }
  }

  const flow = state.bmFlowPercent
  const wt1 = state.bloodWT1LogDrop

  const flowGood = flow !== null && flow < 0.1
  const wt1Good = wt1 !== null && wt1 > 1

  if (flowGood && wt1Good) {
    reasons.push('CR with BM flow <0.1% and blood WT1 drop >1 log → Low risk')
    return { level: 'low', reasons }
  }

  if ((flow !== null && !flowGood) || (wt1 !== null && !wt1Good)) {
    reasons.push('CR but flow/WT1 not meeting low-risk thresholds → Intermediate risk')
    return { level: 'intermediate', reasons }
  }

  reasons.push('CR but incomplete data; defaulting to Intermediate per guideline intent')
  return { level: 'intermediate', reasons }
}

/**
 * Post-consolidation-1 risk calculation per Table 3.
 * - High if any:
 *   - flow >0.1% OR WT1 drop <1 log
 *   - MLLT3-KMT2A drop <2 logs
 *   - NPM1 >2% (if baseline positive)
 * - Low if any:
 *   - For CBF positive: CBF log drop >3
 *   - For NPM1 positive: NPM1 log drop >3
 *   - If none of above genes at baseline: flow <0.1% AND WT1 drop >2 logs (inconsistent → intermediate)
 * - Else Intermediate
 *
 * Requires knowledge of which gene categories were positive at baseline to decide which branch to use for "low".
 */
export function computeConsolidationRisk(
  state: ConsolidationState,
  baseline: BaselineState
): RiskResult {
  const reasons: string[] = []

  const flow = state.bmFlowPercent
  const wt1 = state.bloodWT1LogDrop

  // Direct High-risk triggers
  if (flow !== null && flow > 0.1) {
    reasons.push('Consolidation-1: BM flow MRD >0.1% → High risk')
    return { level: 'high', reasons }
  }
  if (wt1 !== null && wt1 < 1) {
    reasons.push('Consolidation-1: blood WT1 drop <1 log → High risk')
    return { level: 'high', reasons }
  }
  if (state.mllt3KMT2ALogDrop !== null && state.mllt3KMT2ALogDrop < 2) {
    reasons.push('Consolidation-1: MLLT3-KMT2A drop <2 logs → High risk')
    return { level: 'high', reasons }
  }
  if (state.npm1Percent !== null && state.npm1Percent > 2) {
    reasons.push('Consolidation-1: NPM1 mutation >2% → High risk')
    return { level: 'high', reasons }
  }

  // Identify baseline gene presence
  const hadCBF =
    baseline.favorable.includes(GeneKey.RUNX1_RUNX1T1) ||
    baseline.favorable.includes(GeneKey.CBFB_MYH11)
  const hadNPM1 = baseline.favorable.includes(GeneKey.NPM1)
  const hadMLLT3 = baseline.intermediate.includes(GeneKey.T9_11_MLLT3_KMT2A)

  // Low-risk checks per guideline
  if (hadCBF && state.cbfLogDrop !== null && state.cbfLogDrop > 3) {
    reasons.push('Consolidation-1: CBF fusion log drop >3 → Low risk')
    return { level: 'low', reasons }
  }
  if (hadNPM1 && state.npm1LogDrop !== null && state.npm1LogDrop > 3) {
    reasons.push('Consolidation-1: NPM1 log drop >3 → Low risk')
    return { level: 'low', reasons }
  }

  const hadNoneOfAbove = !hadCBF && !hadNPM1
  if (hadNoneOfAbove) {
    const flowGood = flow !== null && flow < 0.1
    const wt1Good = wt1 !== null && wt1 > 2
    if (flowGood && wt1Good) {
      reasons.push(
        'Consolidation-1 (no CBF/NPM1 at baseline): BM flow <0.1% and blood WT1 drop >2 logs → Low risk'
      )
      return { level: 'low', reasons }
    }
    if ((flow !== null && !flowGood) || (wt1 !== null && !wt1Good)) {
      reasons.push(
        'Consolidation-1 (no CBF/NPM1): flow/WT1 not meeting low-risk thresholds → Intermediate risk'
      )
      return { level: 'intermediate', reasons }
    }
  }

  // If none of the above conditions hit, default to Intermediate
  reasons.push('Consolidation-1: criteria for Low/High not met → Intermediate risk')
  return { level: 'intermediate', reasons }
}

/**
 * Utility: color mapping for RiskLevel.
 */
export function riskColor(level: RiskLevel): string {
  switch (level) {
    case 'low':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300'
    case 'intermediate':
      return 'bg-amber-100 text-amber-800 border-amber-300'
    case 'high':
      return 'bg-rose-100 text-rose-800 border-rose-300'
    default:
      return ''
  }
}
