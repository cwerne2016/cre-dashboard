import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BUSINESS_UNITS } from '../data/stubs'
import {
  GroupedBarChart, HorizontalBarChart, ProgressBarChart,
  LineChart, StackedBarChart, BarTargetChart,
} from './Charts'

// ─── RAG badge ────────────────────────────────────────────────────────────────
function RagBadge({ rag }) {
  const map = {
    'on-track': 'bg-positive-bg text-positive',
    'watch':    'bg-yellow-50 text-yellow-700',
    'at-risk':  'bg-negative-bg text-negative',
  }
  const labels = { 'on-track': 'On track', 'watch': 'Watch', 'at-risk': 'At risk' }
  return <span className={`text-2xs font-medium px-1.5 py-0.5 rounded ${map[rag]}`}>{labels[rag]}</span>
}

// ─── Sparkline ────────────────────────────────────────────────────────────────
function Spark({ points, color }) {
  return (
    <svg width="52" height="22" viewBox="0 0 52 22">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Mini viz for card expand ─────────────────────────────────────────────────
function BuMiniViz({ bu }) {
  const c = bu.colorHex
  const bg = bu.colorBg
  switch (bu.slug) {
    case 're-properties':
      return <GroupedBarChart color={c} labels={['Office','Retail','Indus','Mixed']} thisYear={[91,96,98,88]} lastYear={[89,94,97,86]} />
    case 're-urban':
      return <ProgressBarChart color={c} colorBg={bg} pct={71} label="Pre-leasing committed" sublabel="3 developments in construction" />
    case 're-investment-properties':
      return <BarTargetChart color={c} values={[8.2,8.5,8.8,9.1,9.4,9.4]} target={8.8} labels={['Q3\'23','Q4\'23','Q1\'24','Q2\'24','Q3\'24','YTD']} />
    case 're-communities':
      return <LineChart color={c} thisYear={[42,38,44,36,40,34,30,26]} lastYear={[36,32,38,30,34,28,24,20]} labels={['Q1','Q2','Q3','Q4','Q1','Q2','Q3','Q4']} />
    case 're-regional-development':
      return <ProgressBarChart color={c} colorBg={bg} pct={60} label="Lots settled YTD: 680 of 1,140" sublabel="840 releasing H2 · on track" />
    case 'family-office':
      return <StackedBarChart colorA={c} colorB="#F4C0D1" labelsA="RE" labelsB="Other" xLabels={['Q1','Q2','Q3','Q4','Q1','Q2']} valuesA={[58,58,58,58,58,58]} valuesB={[42,42,42,42,42,42]} />
    default:
      return null
  }
}

// ─── Scorecard table row ──────────────────────────────────────────────────────
function TableRow({ bu, expanded, onToggle, onNavigate }) {
  return (
    <>
      <tr
        className="cursor-pointer hover:bg-canvas transition-colors"
        onClick={() => onToggle(bu.id)}
      >
        <td className="py-2.5 px-4 border-b border-border">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: bu.colorBg }}>
            <span className="text-2xs font-medium" style={{ color: bu.colorDark }}>{bu.name.slice(3, 5).toUpperCase()}</span>
          </div>
        </td>
        <td className="py-2.5 px-4 border-b border-border">
          <span className="text-sm font-medium text-ink">{bu.name}</span>
        </td>
        <td className="py-2.5 px-4 border-b border-border"><RagBadge rag={bu.rag} /></td>
        <td className="py-2.5 px-4 border-b border-border text-right">
          <p className="text-sm font-medium text-ink">{bu.kpiSummary.aum}</p>
          <p className="text-2xs text-positive">{bu.kpiSummary.yoy}</p>
        </td>
        <td className="py-2.5 px-4 border-b border-border text-right">
          <p className="text-sm font-medium text-ink">{bu.kpiSummary.noi}</p>
        </td>
        <td className="py-2.5 px-4 border-b border-border">
          <p className="text-xs text-ink-secondary">{bu.headline}</p>
        </td>
        <td className="py-2.5 px-4 border-b border-border">
          <Spark points={bu.sparkPoints} color={bu.colorHex} />
        </td>
        <td className="py-2.5 px-4 border-b border-border">
          <span className={`text-ink-tertiary text-xs transition-transform inline-block ${expanded ? 'rotate-90' : ''}`}>›</span>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={8} className="px-4 pb-4 border-b border-border bg-canvas">
            <div className="pt-3 flex gap-6 items-start">
              {/* Spine */}
              <div className="grid grid-cols-3 gap-3 shrink-0">
                {[
                  { l: 'AUM', v: bu.kpiSummary.aum, c: bu.kpiSummary.yoy },
                  { l: 'NOI', v: bu.kpiSummary.noi, c: '' },
                  { l: 'Occupancy', v: bu.kpiSummary.occupancy, c: '' },
                ].map((m, i) => (
                  <div key={i} className="bg-surface border border-border rounded px-3 py-2 min-w-[90px]">
                    <p className="text-2xs text-ink-tertiary uppercase tracking-wide mb-1">{m.l}</p>
                    <p className="text-md font-medium font-display text-ink">{m.v}</p>
                    {m.c && <p className="text-2xs text-positive">{m.c}</p>}
                  </div>
                ))}
              </div>
              {/* Mini viz */}
              <div className="flex-1 min-w-0">
                <p className="text-2xs text-ink-tertiary uppercase tracking-wide mb-2">Headline metric</p>
                <BuMiniViz bu={bu} />
              </div>
              {/* Nav button */}
              <div className="shrink-0 self-center">
                <button
                  onClick={(e) => { e.stopPropagation(); onNavigate(bu.slug) }}
                  className="flex items-center gap-1.5 text-xs px-3 py-2 rounded border border-brand/30 bg-brand-subtle text-brand hover:bg-brand hover:text-white transition-colors"
                >
                  Open dashboard
                  <span>→</span>
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ─── Card grid item ───────────────────────────────────────────────────────────
function BuCard({ bu, onNavigate }) {
  return (
    <div
      className="bg-surface border border-border rounded-lg p-5 shadow-card cursor-pointer hover:shadow-lift hover:border-brand/30 transition-all group"
      onClick={() => onNavigate(bu.slug)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded flex items-center justify-center shrink-0" style={{ background: bu.colorBg }}>
            <span className="text-xs font-medium" style={{ color: bu.colorDark }}>{bu.name.slice(3, 5).toUpperCase()}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-ink leading-tight">{bu.name}</p>
            <RagBadge rag={bu.rag} />
          </div>
        </div>
        <span className="text-ink-tertiary group-hover:text-brand transition-colors text-sm">→</span>
      </div>

      {/* Spine */}
      <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-border">
        <div>
          <p className="text-2xs text-ink-tertiary uppercase tracking-wide mb-0.5">AUM</p>
          <p className="text-sm font-medium font-display text-ink">{bu.kpiSummary.aum}</p>
          <p className="text-2xs text-positive">{bu.kpiSummary.yoy}</p>
        </div>
        <div>
          <p className="text-2xs text-ink-tertiary uppercase tracking-wide mb-0.5">NOI</p>
          <p className="text-sm font-medium font-display text-ink">{bu.kpiSummary.noi}</p>
        </div>
        <div>
          <p className="text-2xs text-ink-tertiary uppercase tracking-wide mb-0.5">Occupancy</p>
          <p className="text-sm font-medium font-display text-ink">{bu.kpiSummary.occupancy}</p>
        </div>
      </div>

      {/* Mini viz */}
      <BuMiniViz bu={bu} />

      {/* Headline callout */}
      <p className="text-xs text-ink-tertiary mt-2">{bu.headline}</p>
    </div>
  )
}

// ─── Main BU section component ────────────────────────────────────────────────
export function BuSection() {
  const [view, setView] = useState('table')
  const [expandedId, setExpandedId] = useState(null)
  const navigate = useNavigate()

  const toggle = (id) => setExpandedId(prev => prev === id ? null : id)

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium text-ink">Business Units</h2>
          <p className="text-xs text-ink-tertiary mt-0.5">
            {view === 'table' ? 'Click a row to expand · click button to open BU dashboard' : 'Click a card to open BU dashboard'}
          </p>
        </div>
        {/* Toggle */}
        <div className="flex items-center border border-border rounded overflow-hidden">
          <button
            onClick={() => setView('table')}
            className={`px-3 py-1.5 text-xs transition-colors ${view === 'table' ? 'bg-brand text-white' : 'bg-surface text-ink-secondary hover:bg-canvas'}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline mr-1">
              <rect x="0" y="0" width="12" height="2.5" rx="0.5" fill="currentColor"/>
              <rect x="0" y="4" width="12" height="2.5" rx="0.5" fill="currentColor" opacity=".7"/>
              <rect x="0" y="8" width="12" height="2.5" rx="0.5" fill="currentColor" opacity=".4"/>
            </svg>
            Table
          </button>
          <button
            onClick={() => setView('grid')}
            className={`px-3 py-1.5 text-xs transition-colors border-l border-border ${view === 'grid' ? 'bg-brand text-white' : 'bg-surface text-ink-secondary hover:bg-canvas'}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline mr-1">
              <rect x="0" y="0" width="5.5" height="5.5" rx="1" fill="currentColor"/>
              <rect x="6.5" y="0" width="5.5" height="5.5" rx="1" fill="currentColor" opacity=".7"/>
              <rect x="0" y="6.5" width="5.5" height="5.5" rx="1" fill="currentColor" opacity=".7"/>
              <rect x="6.5" y="6.5" width="5.5" height="5.5" rx="1" fill="currentColor" opacity=".4"/>
            </svg>
            Cards
          </button>
        </div>
      </div>

      {view === 'table' ? (
        <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-card">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-canvas">
                <th className="py-2 px-4 border-b border-border w-10"></th>
                <th className="py-2 px-4 border-b border-border text-left text-2xs font-medium text-ink-tertiary uppercase tracking-wide">Business Unit</th>
                <th className="py-2 px-4 border-b border-border text-left text-2xs font-medium text-ink-tertiary uppercase tracking-wide">Status</th>
                <th className="py-2 px-4 border-b border-border text-right text-2xs font-medium text-ink-tertiary uppercase tracking-wide">AUM</th>
                <th className="py-2 px-4 border-b border-border text-right text-2xs font-medium text-ink-tertiary uppercase tracking-wide">NOI</th>
                <th className="py-2 px-4 border-b border-border text-left text-2xs font-medium text-ink-tertiary uppercase tracking-wide">Headline Metric</th>
                <th className="py-2 px-4 border-b border-border text-left text-2xs font-medium text-ink-tertiary uppercase tracking-wide">Trend</th>
                <th className="py-2 px-4 border-b border-border w-8"></th>
              </tr>
            </thead>
            <tbody>
              {BUSINESS_UNITS.map(bu => (
                <TableRow
                  key={bu.id}
                  bu={bu}
                  expanded={expandedId === bu.id}
                  onToggle={toggle}
                  onNavigate={(slug) => navigate(`/bu/${slug}`)}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BUSINESS_UNITS.map(bu => (
            <BuCard key={bu.id} bu={bu} onNavigate={(slug) => navigate(`/bu/${slug}`)} />
          ))}
        </div>
      )}
    </section>
  )
}
