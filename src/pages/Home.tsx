/**
 * Home.tsx
 * Purpose: Landing page with a hero section and the AML risk stratification wizard.
 * Notes:
 * - No routing changes; this is the main visible content per requirements.
 * - Uses Tailwind for layout; no dependency on shadcn/ui to keep it portable here.
 */

import React from 'react'
import RiskWizard from '../components/risk/RiskWizard'

/**
 * HomePage
 * Renders header, brief description, an illustrative image, and the RiskWizard.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative isolate overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                儿童 AML 危险度分层助手（SCCCG-AML-2025）
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                基于协作方案（简明版）提炼的规则，交互式判断“低危 / 中危 / 高危”。包含初诊、诱导后、巩固①后三阶段，
                并给出可解释的判定依据。结果仅供临床参考，不替代专业判断。
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="#wizard"
                  className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  开始评估
                </a>
                <a
                  href="#about"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  使用说明
                </a>
              </div>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border">
              {/* Smart placeholder image per ImageInsertion rule */}
              <img src="https://pub-cdn.sider.ai/u/U0L5HYRVY4/web-coder/68bfec5770ddcc6cca3689d2/resource/6474cd40-619d-48f1-acdb-f975b4240336.jpg" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main id="wizard" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">交互式评估</h2>
          <p className="mt-1 text-sm text-gray-600">
            按步骤填写关键指标，系统自动计算每一阶段的危险度，并显示触发的规则条款。
          </p>
        </div>
        <RiskWizard />
      </main>

      <section id="about" className="mx-auto max-w-6xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border bg-white p-4">
          <h3 className="text-base font-semibold text-gray-900">使用说明与来源</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>初诊基因：依照表2（预后好/中/差）进行选择，规则中纳入重要特例。</li>
            <li>诱导后：根据 CR、流式与 WT1 的阈值判断低危/中危，高危由 NR 直接触发。</li>
            <li>巩固①后：优先判定高危条件；若不满足，依据 CBF/NPM1 的 PCR 下降值或（无这两类基因时）流式+WT1 组合判定低危；其余为中危。</li>
            <li>工具覆盖了方案中明确、可量化的阈值与关键备注，仍需结合临床全貌综合判断。</li>
          </ul>
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-gray-500 sm:px-6 lg:px-8">
          来源：SCCCG-AML-2025 协作方案简明版（用户提供文档）。本页仅供参考。
        </div>
      </footer>
    </div>
  )
}
