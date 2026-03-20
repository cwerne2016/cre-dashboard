import { useState } from 'react'
import { EXEC_KPIS } from '../data/stubs'
import { TrendExpandChart } from './Charts'

function ChangePill({ change, trend }) {
  const pos = trend === 'up'
  const neg = trend === 'down'
  return (
    <span className={`text-2xs font-medium px-1.5 py-0.5 rounded ${pos ? 'bg-positive-bg text-positive' : neg ? 'bg-negative-bg text-negative' : 'bg-neutral-bg text-neutral'}`}>
      {change}
    </span>
  )
}

function ExpandPanel({ kpi, color }) {
  const { expand, chartType } = kpi
  return (
    <div className="border border-border border-t-0 rounded-b-lg bg-surface px-5 pt-4 pb-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-ink">{expand.title}</span>
        <span className="text-xs text-ink-tertiary">{expand.meta}</span>
      </div>
      <div className="mb-2">
        <TrendExpandChart chartType={chartType} color={color} />
      </div>
      <div className="grid grid-cols-4 gap-3 pt-3 border-t border-border mt-2">
        {expand.stats.map((s, i) => (
          <div key={i} className="bg-canvas rounded px-3 py-2">
            <p className="text-2xs text-ink-tertiary uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-md font-medium ${s.negative ? 'text-negative' : s.positive ? 'text-positive' : 'text-ink'}`}>{s.value}</p>
            <p className="text-2xs text-ink-tertiary mt-0.5">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const GROUP_COLORS = {
  'balance-sheet': '#185FA5',
  'income-statement': '#1D9E75',
  'cash-flow': '#C0392B',
  'talent': '#1D3557',
}

export function ExecKpiStrip({ compact = false, subBuLabel = null }) {
  const [activeId, setActiveId] = useState(null)

  const toggle = (id) => setActiveId(prev => prev === id ? null : id)

  return (
    <div>
      {/* Strip */}
      <div className={`flex border border-border rounded-t-lg overflow-hidden bg-surface ${activeId ? '' : 'rounded-b-lg'}`}>
        {/* Filters */}
        <div className="shrink-0 border-r border-border px-4 py-3 flex flex-col gap-2 justify-center" style={{ minWidth: 148 }}>
          <div>
            <p className="text-2xs text-ink-tertiary uppercase tracking-wide mb-1">Date range</p>
            <select className="text-xs border border-border rounded px-2 py-1 bg-canvas text-ink w-full focus:outline-none focus:ring-1 focus:ring-brand/30">
              <option>FY 2025 YTD</option>
              <option>FY 2024</option>
              <option>Q2 FY2025</option>
              <option>Q1 FY2025</option>
            </select>
          </div>
          <div>
            <p className="text-2xs text-ink-tertiary uppercase tracking-wide mb-1">{subBuLabel ? 'Sub-BU' : "BU's included"}</p>
            <select className="text-xs border border-border rounded px-2 py-1 bg-canvas text-ink w-full focus:outline-none focus:ring-1 focus:ring-brand/30">
              {subBuLabel
                ? <><option>All</option><option>Landmark</option><option>Legacy</option></>
                : <><option>All BUs</option><option>RE Properties</option><option>RE Urban</option></>
              }
            </select>
          </div>
        </div>

        {/* Metric groups */}
        {EXEC_KPIS.map((kpi) => {
          const isActive = activeId === kpi.id
          const color = GROUP_COLORS[kpi.id]
          return (
            <button
              key={kpi.id}
              onClick={() => toggle(kpi.id)}
              className={`flex-1 text-left px-4 py-3 border-r border-border last:border-r-0 transition-colors duration-100
                         ${isActive ? 'bg-canvas' : 'bg-surface hover:bg-canvas/60'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xs font-medium uppercase tracking-wide underline decoration-dotted" style={{ color }}>
                  {kpi.label}
                </span>
                <span className={`text-ink-tertiary transition-transform duration-200 text-xs ${isActive ? 'rotate-180' : ''}`}>▾</span>
              </div>
              <p className={`font-display font-semibold leading-none mb-1 ${compact ? 'text-xl' : 'text-2xl'} ${kpi.negative ? 'text-negative' : 'text-ink'}`}>
                {kpi.primary}
              </p>
              <p className="text-2xs text-ink-tertiary mb-2">{kpi.sub}</p>
              <div className="flex items-center gap-1.5">
                <ChangePill change={kpi.change} trend={kpi.trend} />
                <span className="text-2xs text-ink-tertiary">vs PY</span>
              </div>
              {kpi.secondary && (
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-2xs text-ink-tertiary uppercase tracking-wide">{kpi.secondary.label}</p>
                  <p className="text-sm font-medium text-ink">{kpi.secondary.value}</p>
                  <p className="text-2xs text-ink-tertiary">{kpi.secondary.note}</p>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Expand panel */}
      {activeId && (() => {
        const kpi = EXEC_KPIS.find(k => k.id === activeId)
        return <ExpandPanel kpi={kpi} color={GROUP_COLORS[activeId]} />
      })()}
    </div>
  )
}
