/**
 * types.ts
 * Purpose: Shared TypeScript types and enums for the AML risk stratification wizard.
 */

export type RiskLevel = 'low' | 'intermediate' | 'high'

/**
 * Gene option identifier keys for simplified mapping from the guideline tables.
 * This is a curated subset that covers the most impactful rules from Table 2.
 */
export enum GeneKey {
  RUNX1_RUNX1T1 = 'runx1Runx1t1', // t(8;21)
  CBFB_MYH11 = 'cbfbMyh11',       // inv(16)/t(16;16)
  NPM1 = 'npm1',
  CEBPA_BZIP = 'cebpaBzip',
  KMT2A_MLLT11 = 'kmt2a_mllt11',  // t(1;11) favorable (rare)

  T9_11_MLLT3_KMT2A = 't9_11_mllt3_kmt2a',
  NUP98_KDM5A_CHR13 = 'nup98_kdm5a_chr13',
  T1_22_RBM15_MKL1 = 't1_22_rbm15_mkl1',
  T8_16_KAT6A_CREBBP = 't8_16_kat6a_crebbp',
  FLT3_ITD = 'flt3_itd',

  COMPLEX_KARYOTYPE = 'complex_karyotype',
  MONOSOMAL_KARYOTYPE = 'monosomal_karyotype',
  T6_9_DEK_NUP214 = 't6_9_dek_nup214',
  OTHER_KMT2A = 'other_kmt2a',
  BCR_ABL1 = 'bcr_abl1',
  INV16_CBFA2T3_GLIS2 = 'inv16_cbfa2t3_glis2',
  NUP98_NSD1 = 'nup98_nsd1',
  PICALM_MLLT10 = 'picalm_mllt10',
  T7_12_MNX1_ETV6 = 't7_12_mnx1_etv6',
  INV3_T3_3_GATA2_MECOM = 'inv3_t3_3_gata2_mecom',
  MINUS5_DEL5Q = 'minus5_del5q',
  MINUS7 = 'minus7',
  ABN17P = 'abn17p',
  TP53_VAF_GT10 = 'tp53_vaf_gt10',
  MYELOID_MUT_SET = 'myeloid_mut_set' // RUNX1/ASXL1/SRSF2/BCOR/EZH2/SF3B1/STAG2/U2AF1/ZRSR2 or >=2 combined
}

/**
 * Gene option descriptor for UI.
 */
export interface GeneOption {
  id: GeneKey
  label: string
  hint?: string
}

export interface BaselineState {
  /** Selected favorable gene/cytogenetic options */
  favorable: GeneKey[]
  /** Selected intermediate gene/cytogenetic options */
  intermediate: GeneKey[]
  /** Selected adverse gene/cytogenetic options */
  adverse: GeneKey[]

  /** Initial WBC at diagnosis, unit: 10^9/L; null if unknown */
  wbc: number | null

  /** Modifier flags derived from the document */
  hasKITD816V: boolean
  /** If FLT3-ITD is selected, record allelic ratio; null if unknown */
  flt3ITDAllelicRatio: number | null
}

export interface InductionState {
  /** Hematologic CR at end of induction */
  crAchieved: boolean
  /** Bone marrow flow MRD (%), null if unknown */
  bmFlowPercent: number | null
  /** Blood WT1 drop vs baseline (log10), null if unknown */
  bloodWT1LogDrop: number | null
}

export interface ConsolidationState {
  /** Bone marrow flow MRD (%) after consolidation-1 */
  bmFlowPercent: number | null
  /** Blood WT1 drop (log10) after consolidation-1 vs baseline */
  bloodWT1LogDrop: number | null

  /** For CBF fusions present at diagnosis: log drop vs baseline in blood */
  cbfLogDrop: number | null

  /** For NPM1 positive at diagnosis: log drop vs baseline in blood */
  npm1LogDrop: number | null
  /** For NPM1 positive: absolute % at consolidation-1 (used for &gt;2% rule) */
  npm1Percent: number | null

  /** For MLLT3-KMT2A at diagnosis: log drop vs baseline in blood */
  mllt3KMT2ALogDrop: number | null
}

/**
 * Risk result with explanatory bullets to show users which rule fired.
 */
export interface RiskResult {
  level: RiskLevel
  reasons: string[]
}

/**
 * Overall wizard state holder.
 */
export interface WizardState {
  baseline: BaselineState
  induction: InductionState
  consolidation: ConsolidationState
}

/**
 * Utility: normalized number from input string or number; returns null if invalid.
 */
export function toNumberOrNull(val: string | number | null | undefined): number | null {
  if (val === null || val === undefined) return null
  const num = typeof val === 'number' ? val : Number(val)
  return Number.isFinite(num) ? num : null
}
