/**
 * ConsolidationForm.tsx
 * Purpose: UI for post-consolidation-1 inputs and gene-specific MRD thresholds.
 * Shows inputs conditionally based on baseline gene selections (CBF, NPM1, MLLT3-KMT2A).
 */

import React, { useMemo } from 'react'
import { BaselineState, ConsolidationState, GeneKey } from './types'

export interface ConsolidationFormProps {
  value: ConsolidationState
  onChange: (next: ConsolidationState) => void
  baseline: BaselineState
}

const ConsolidationForm: React.FC<ConsolidationFormProps> = ({ value, onChange, baseline }) => {
  const hadCBF = useMemo(
    () =>
      baseline.favorable.includes(GeneKey.RUNX1_RUNX1T1) ||
      baseline.favorable.includes(GeneKey.CBFB_MYH11),
    [baseline.favorable]
  )
  const hadNPM1 = useMemo(
    () => baseline.favorable.includes(GeneKey.NPM1),
    [baseline.favorable]
  )
  const hadMLLT3 = useMemo(
    () => baseline.intermediate.includes(GeneKey.T9_11_MLLT3_KMT2A),
    [baseline.intermediate]
  )

  return (
    <div className="space-y-6">
      <section aria-labelledby="mrd2">
        <h3 id="mrd2" className="text-base font-semibold text-gray-900">巩固①结束后 MRD</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 whitespace-nowrap">骨髓流式</label>
            <input
              type="number"
              min={0}
              step="0.01"
              className="w-full rounded border px-2 py-1"
              placeholder="如 0.05"
              value={value.bmFlowPercent ?? ''}
              onChange={e => onChange({ ...value, bmFlowPercent: e.target.value === '' ? null : Number(e.target.value) })}
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 whitespace-nowrap">血 WT1 较初诊下降</label>
            <input
              type="number"
              min={-5}
              step="0.1"
              className="w-full rounded border px-2 py-1"
              placeholder="如 2.5"
              value={value.bloodWT1LogDrop ?? ''}
              onChange={e => onChange({ ...value, bloodWT1LogDrop: e.target.value === '' ? null : Number(e.target.value) })}
            />
            <span className="text-sm text-gray-500">log</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          高危判据：流式 &gt;0.1% 或 WT1 &lt;1 log；低危判据（无CBF/NPM1时）为流式 &lt;0.1% 且 WT1 &gt;2 log。
        </p>
      </section>

      {hadCBF && (
        <section aria-labelledby="cbf">
          <h3 id="cbf" className="text-base font-semibold text-gray-900">CBF 融合基因（如 RUNX1-RUNX1T1/CBFB-MYH11）</h3>
          <div className="mt-3 flex items-center gap-2">
            <label className="text-sm text-gray-700 whitespace-nowrap">血 PCR 较初诊下降</label>
            <input
              type="number"
              min={-5}
              step="0.1"
              className="w-48 rounded border px-2 py-1"
              placeholder="如 3.2"
              value={value.cbfLogDrop ?? ''}
              onChange={e => onChange({ ...value, cbfLogDrop: e.target.value === '' ? null : Number(e.target.value) })}
            />
            <span className="text-sm text-gray-500">log</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            低危阈值：CBF 较初诊下降 &gt;3 log。
          </p>
        </section>
      )}

      {hadNPM1 && (
        <section aria-labelledby="npm1">
          <h3 id="npm1" className="text-base font-semibold text-gray-900">NPM1</h3>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 whitespace-nowrap">血 PCR 较初诊下降</label>
              <input
                type="number"
                min={-5}
                step="0.1"
                className="w-full rounded border px-2 py-1"
                placeholder="如 3.5"
                value={value.npm1LogDrop ?? ''}
                onChange={e => onChange({ ...value, npm1LogDrop: e.target.value === '' ? null : Number(e.target.value) })}
              />
              <span className="text-sm text-gray-500">log</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 whitespace-nowrap">当前 NPM1 水平</label>
              <input
                type="number"
                min={0}
                step="0.01"
                className="w-full rounded border px-2 py-1"
                placeholder="如 0.8"
                value={value.npm1Percent ?? ''}
                onChange={e => onChange({ ...value, npm1Percent: e.target.value === '' ? null : Number(e.target.value) })}
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            低危阈值：下降 &gt;3 log；高危阈值：若仍 &gt;2%。
          </p>
        </section>
      )}

      {hadMLLT3 && (
        <section aria-labelledby="mllt3">
          <h3 id="mllt3" className="text-base font-semibold text-gray-900">MLLT3-KMT2A</h3>
          <div className="mt-3 flex items-center gap-2">
            <label className="text-sm text-gray-700 whitespace-nowrap">血 PCR 较初诊下降</label>
            <input
              type="number"
              min={-5}
              step="0.1"
              className="w-48 rounded border px-2 py-1"
              placeholder="如 2.1"
              value={value.mllt3KMT2ALogDrop ?? ''}
              onChange={e => onChange({ ...value, mllt3KMT2ALogDrop: e.target.value === '' ? null : Number(e.target.value) })}
            />
            <span className="text-sm text-gray-500">log</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            高危阈值：较初诊下降 &lt;2 log。
          </p>
        </section>
      )}
    </div>
  )
}

export default ConsolidationForm
