/**
 * RiskBadge.tsx
 * Purpose: Visual badge for showing risk level with consistent colors and accessible labels.
 */

import React from 'react'
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react'
import { RiskLevel } from './types'
import { riskColor } from './computeRisk'

/**
 * Props for RiskBadge component.
 */
interface RiskBadgeProps {
  level: RiskLevel
  className?: string
}

/**
 * RiskBadge
 * Displays a colored badge with icon and label for a risk level.
 */
const RiskBadge: React.FC<RiskBadgeProps> = ({ level, className }) => {
  const color = riskColor(level)
  const label = level === 'low' ? '低危' : level === 'intermediate' ? '中危' : '高危'
  const Icon =
    level === 'low' ? ShieldCheck : level === 'intermediate' ? Shield : ShieldAlert

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-sm font-medium ${color} ${className ?? ''}`}
      role="status"
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" aria-hidden />
      {label}
    </span>
  )
}

export default RiskBadge
