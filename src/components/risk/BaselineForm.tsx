/**
 * BaselineForm.tsx
 * Purpose: UI for initial (diagnosis) inputs and gene selections to estimate baseline risk.
 * Notes:
 * - Gene lists are curated based on the guideline's Table 2.
 * - Includes special modifiers: KIT D816V and FLT3-ITD allelic ratio.
 */

import React from 'react'
import { BaselineState, GeneKey, GeneOption } from './types'

/** Favorable gene options */
const FAVORABLE: GeneOption[] = [
  { id: GeneKey.RUNX1_RUNX1T1, label: 't(8;21)/RUNX1-RUNX1T1' },
  { id: GeneKey.CBFB_MYH11, label: 'inv(16)/t(16;16)/CBFB-MYH11' },
  { id: GeneKey.NPM1, label: 'NPM1 突变', hint: '合并 FLT3-ITD 且AR≥0.5 → 非“好”' },
  { id: GeneKey.CEBPA_BZIP, label: 'CEBPA-bZIP 突变' },
  { id: GeneKey.KMT2A_MLLT11, label: 't(1;11)/KMT2A-MLLT11（少见）' }
]

/** Intermediate gene options */
const INTERMEDIATE: GeneOption[] = [
  { id: GeneKey.T9_11_MLLT3_KMT2A, label: 't(9;11)/MLLT3-KMT2A' },
  { id: GeneKey.NUP98_KDM5A_CHR13, label: 'NUP98-KDM5A（伴13号异常）' },
  { id: GeneKey.T1_22_RBM15_MKL1, label: 't(1;22)/RBM15-MKL1' },
  { id: GeneKey.T8_16_KAT6A_CREBBP, label: 't(8;16)/KAT6A-CREBBP' },
  { id: GeneKey.FLT3_ITD, label: 'FLT3-ITD', hint: 'AR用于修正规则' }
]

/** Adverse gene/cytogenetic options */
const ADVERSE: GeneOption[] = [
  { id: GeneKey.COMPLEX_KARYOTYPE, label: '复杂核型（≥3异常）' },
  { id: GeneKey.MONOSOMAL_KARYOTYPE, label: '单体核型' },
  { id: GeneKey.T6_9_DEK_NUP214, label: 't(6;9)/DEK-NUP214' },
  { id: GeneKey.OTHER_KMT2A, label: '其他KMT2A重排（不含t(1;11)/t(9;11)）' },
  { id: GeneKey.BCR_ABL1, label: 't(9;22)/BCR-ABL1' },
  { id: GeneKey.INV16_CBFA2T3_GLIS2, label: 'inv(16)(p13.3q24.3)/CBFA2T3-GLIS2' },
  { id: GeneKey.NUP98_NSD1, label: 't(5;11)/NUP98-NSD1' },
  { id: GeneKey.PICALM_MLLT10, label: 't(10;11)/PICALM-MLLT10' },
  { id: GeneKey.T7_12_MNX1_ETV6, label: 't(7;12)/MNX1-ETV6' },
  { id: GeneKey.INV3_T3_3_GATA2_MECOM, label: 'inv(3)/t(3;3)/GATA2/MECOM(EVI1)' },
  { id: GeneKey.MINUS5_DEL5Q, label: '-5 或 del(5q)' },
  { id: GeneKey.MINUS7, label: '-7' },
  { id: GeneKey.ABN17P, label: '-17/abn(17p)' },
  { id: GeneKey.TP53_VAF_GT10, label: 'TP53 突变（VAF>10%）' },
  { id: GeneKey.MYELOID_MUT_SET, label: 'RUNX1/ASXL1/等不良突变集' }
]

/**
 * Props for BaselineForm
 */
export interface BaselineFormProps {
  value: BaselineState
  onChange: (next: BaselineState) => void
}

/**
 * Utility to toggle a gene in a bucket.
 */
function toggleGene(list: GeneKey[], gene: GeneKey, checked: boolean): GeneKey[] {
  if (checked) {
    if (!list.includes(gene)) return [...list, gene]
    return list
  }
  return list.filter(k => k !== gene)
}

/**
 * BaselineForm component
 * Collects gene selections, WBC, KIT D816V, and FLT3-ITD AR if selected.
 */
const BaselineForm: React.FC<BaselineFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-6">
      <section aria-labelledby="favorable">
        <h3 id="favorable" className="text-base font-semibold text-gray-900">预后好（Favorable）</h3>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {FAVORABLE.map(opt => (
            <label key={opt.id} className="flex items-start gap-2 rounded-md border p-3 hover:bg-gray-50">
              <input
                type="checkbox"
                className="mt-1"
                checked={value.favorable.includes(opt.id)}
                onChange={e =>
                  onChange({
                    ...value,
                    favorable: toggleGene(value.favorable, opt.id, e.target.checked)
                  })
                }
              />
              <div className="text-sm">
                <div className="font-medium">{opt.label}</div>
                {opt.hint && <div className="text-gray-500">{opt.hint}</div>}
              </div>
            </label>
          ))}
        </div>
        <div className="mt-3 rounded-md border p-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={value.hasKITD816V}
              onChange={e => onChange({ ...value, hasKITD816V: e.target.checked })}
            />
            <span className="text-sm text-gray-800">KIT D816V（若合并 CBF → 由“好”转“中”）</span>
          </label>
        </div>
      </section>

      <section aria-labelledby="intermediate">
        <h3 id="intermediate" className="text-base font-semibold text-gray-900">预后中等（Intermediate）</h3>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {INTERMEDIATE.map(opt => (
            <label key={opt.id} className="flex items-start gap-2 rounded-md border p-3 hover:bg-gray-50">
              <input
                type="checkbox"
                className="mt-1"
                checked={value.intermediate.includes(opt.id)}
                onChange={e =>
                  onChange({
                    ...value,
                    intermediate: toggleGene(value.intermediate, opt.id, e.target.checked)
                  })
                }
              />
              <div className="text-sm">
                <div className="font-medium">{opt.label}</div>
                {opt.hint && <div className="text-gray-500">{opt.hint}</div>}
              </div>
            </label>
          ))}
        </div>

        {value.intermediate.includes(GeneKey.FLT3_ITD) && (
          <div className="mt-3 grid grid-cols-1 gap-3 rounded-md border p-3 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 whitespace-nowrap">FLT3-ITD 等位基因比率</label>
              <input
                type="number"
                step="0.01"
                min={0}
                className="w-full rounded border px-2 py-1"
                placeholder="如 0.50"
                value={value.flt3ITDAllelicRatio ?? ''}
                onChange={e =>
                  onChange({
                    ...value,
                    flt3ITDAllelicRatio: e.target.value === '' ? null : Number(e.target.value)
                  })
                }
              />
              <span className="text-sm text-gray-500">AR</span>
            </div>
            <p className="text-xs text-gray-500">
              若合并 NPM1 且 AR≥0.5，则 NPM1 不再计入“预后好”，整体趋向中危。
            </p>
          </div>
        )}
      </section>

      <section aria-labelledby="adverse">
        <h3 id="adverse" className="text-base font-semibold text-gray-900">预后差（Adverse）</h3>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {ADVERSE.map(opt => (
            <label key={opt.id} className="flex items-start gap-2 rounded-md border p-3 hover:bg-gray-50">
              <input
                type="checkbox"
                className="mt-1"
                checked={value.adverse.includes(opt.id)}
                onChange={e =>
                  onChange({
                    ...value,
                    adverse: toggleGene(value.adverse, opt.id, e.target.checked)
                  })
                }
              />
              <div className="text-sm">
                <div className="font-medium">{opt.label}</div>
                {opt.hint && <div className="text-gray-500">{opt.hint}</div>}
              </div>
            </label>
          ))}
        </div>
      </section>

      <section aria-labelledby="wbc">
        <h3 id="wbc" className="text-base font-semibold text-gray-900">起始血象</h3>
        <div className="mt-3 flex items-center gap-2">
          <label className="text-sm text-gray-700 whitespace-nowrap">初诊 WBC</label>
          <input
            type="number"
            min={0}
            step="1"
            className="w-40 rounded border px-2 py-1"
            placeholder="单位：×10^9/L"
            value={value.wbc ?? ''}
            onChange={e => onChange({ ...value, wbc: e.target.value === '' ? null : Number(e.target.value) })}
          />
          <span className="text-sm text-gray-500">×10^9/L</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          若仅“预后好”基因且 WBC&gt;100×10^9/L，按规则转为中危。
        </p>
      </section>
    </div>
  )
}

export default BaselineForm
