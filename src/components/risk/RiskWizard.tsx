/**
 * RiskWizard.tsx
 * Purpose: Orchestrate the 3-step AML risk stratification with forms and real-time results.
 * - Step 1: Baseline
 * - Step 2: Post-Induction
 * - Step 3: Post-Consolidation-1
 */

import React, { useMemo, useState } from 'react'
import BaselineForm from './BaselineForm'
import InductionForm from './InductionForm'
import ConsolidationForm from './ConsolidationForm'
import SummaryPanel from './SummaryPanel'
import { BaselineState, ConsolidationState, InductionState, RiskResult } from './types'
import { computeBaselineRisk, computeConsolidationRisk, computeInductionRisk } from './computeRisk'
import RiskBadge from './RiskBadge'

/**
 * Step indicator component with minimal styling and keyboard navigation support.
 */
const Stepper: React.FC<{
  step: number
  onStepChange: (s: number) => void
}> = ({ step, onStepChange }) => {
  const items = [
    { id: 1, label: '初诊分层' },
    { id: 2, label: '诱导后' },
    { id: 3, label: '巩固①后' }
  ]
  return (
    <nav aria-label="步骤" className="flex gap-2">
      {items.map(it => (
        <button
          key={it.id}
          className={`rounded-full px-3 py-1 text-sm font-medium border ${
            step === it.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => onStepChange(it.id)}
        >
          {it.label}
        </button>
      ))}
    </nav>
  )
}

/**
 * RiskWizard
 * Holds the state, renders step forms, and shows the live summary panel.
 */
const RiskWizard: React.FC = () => {
  const [step, setStep] = useState(1)

  const [baseline, setBaseline] = useState<BaselineState>({
    favorable: [],
    intermediate: [],
    adverse: [],
    wbc: null,
    hasKITD816V: false,
    flt3ITDAllelicRatio: null
  })

  const [induction, setInduction] = useState<InductionState>({
    crAchieved: false,
    bmFlowPercent: null,
    bloodWT1LogDrop: null
  })

  const [consolidation, setConsolidation] = useState<ConsolidationState>({
    bmFlowPercent: null,
    bloodWT1LogDrop: null,
    cbfLogDrop: null,
    npm1LogDrop: null,
    npm1Percent: null,
    mllt3KMT2ALogDrop: null
  })

  const baselineResult: RiskResult = useMemo(() => computeBaselineRisk(baseline), [baseline])
  const inductionResult: RiskResult = useMemo(() => computeInductionRisk(induction), [induction])
  const consolidationResult: RiskResult = useMemo(
    () => computeConsolidationRisk(consolidation, baseline),
    [consolidation, baseline]
  )

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <header className="flex items-center justify-between">
          <Stepper step={step} onStepChange={setStep} />
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-gray-600">当前阶段风险</span>
            <RiskBadge level={step === 1 ? baselineResult.level : step === 2 ? inductionResult.level : consolidationResult.level} />
          </div>
        </header>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          {step === 1 && (
            <>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">初诊分层</h3>
              <p className="mb-4 text-sm text-gray-600">
                选择已知基因/染色体异常与起始血象。系统将自动考虑关键联动（如 NPM1+FLT3-ITD、CBF+KIT D816V、WBC&gt;100 等）。
              </p>
              <BaselineForm value={baseline} onChange={setBaseline} />
            </>
          )}
          {step === 2 && (
            <>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">诱导结束</h3>
              <p className="mb-4 text-sm text-gray-600">
                勾选血液学CR并填入 MRD 指标。若未达CR，将直接判定为高危。
              </p>
              <InductionForm value={induction} onChange={setInduction} />
            </>
          )}
          {step === 3 && (
            <>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">巩固①结束</h3>
              <p className="mb-4 text-sm text-gray-600">
                根据初诊基因（CBF/NPM1/MLLT3-KMT2A）补充相关 PCR 下降值；并填写流式与WT1。系统将套用相应阈值。
              </p>
              <ConsolidationForm value={consolidation} onChange={setConsolidation} baseline={baseline} />
            </>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            上一步
          </button>
          <button
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            onClick={() => setStep(s => Math.min(3, s + 1))}
            disabled={step === 3}
          >
            下一步
          </button>
        </div>
      </div>

      <div>
        <SummaryPanel
          baseline={baselineResult}
          induction={inductionResult}
          consolidation={consolidationResult}
        />
      </div>
    </div>
  )
}

export default RiskWizard
