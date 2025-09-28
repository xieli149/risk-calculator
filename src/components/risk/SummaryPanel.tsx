/**
 * SummaryPanel.tsx
 * Purpose: Show risk results for all 3 stages with explanations.
 */

import React from 'react'
import RiskBadge from './RiskBadge'
import { RiskResult } from './types'

export interface SummaryPanelProps {
  baseline: RiskResult
  induction: RiskResult
  consolidation: RiskResult
}

const Section: React.FC<{ title: string; result: RiskResult }> = ({ title, result }) => {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <RiskBadge level={result.level} />
      </div>
      <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
        {result.reasons.map((r, idx) => (
          <li key={idx}>{r}</li>
        ))}
      </ul>
    </div>
  )
}

/**
 * SummaryPanel
 * Displays Baseline, Post-Induction, and Post-Consolidation-1 results.
 */
const SummaryPanel: React.FC<SummaryPanelProps> = ({ baseline, induction, consolidation }) => {
  return (
    <aside className="space-y-4">
      <Section title="初诊分层" result={baseline} />
      <Section title="诱导后" result={induction} />
      <Section title="巩固①后" result={consolidation} />
      <div className="rounded-md bg-blue-50 p-3 text-xs text-blue-800">
        本工具基于 SCCCG-AML-2025 文件要点，供临床参考，不能替代专业医疗判断。
      </div>
    </aside>
  )
}

export default SummaryPanel
