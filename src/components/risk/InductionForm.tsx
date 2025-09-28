/**
 * InductionForm.tsx
 * Purpose: UI for post-induction inputs (CR status, BM flow MRD, blood WT1 log drop).
 */

import React from 'react'
import { InductionState } from './types'

export interface InductionFormProps {
  value: InductionState
  onChange: (next: InductionState) => void
}

const InductionForm: React.FC<InductionFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-6">
      <section aria-labelledby="cr">
        <h3 id="cr" className="text-base font-semibold text-gray-900">诱导结束</h3>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={value.crAchieved}
              onChange={e => onChange({ ...value, crAchieved: e.target.checked })}
            />
            <span className="text-sm text-gray-800">血液学 CR（血象回升）</span>
          </label>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          若诱导后为 NR（未达CR），按规则直接判定为高危。
        </p>
      </section>

      <section aria-labelledby="mrd">
        <h3 id="mrd" className="text-base font-semibold text-gray-900">MRD 指标</h3>
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
              placeholder="如 1.2"
              value={value.bloodWT1LogDrop ?? ''}
              onChange={e => onChange({ ...value, bloodWT1LogDrop: e.target.value === '' ? null : Number(e.target.value) })}
            />
            <span className="text-sm text-gray-500">log</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          低危阈值：流式 &lt;0.1% 且 WT1 &gt;1 log；不一致时为中危。
        </p>
      </section>
    </div>
  )
}

export default InductionForm
