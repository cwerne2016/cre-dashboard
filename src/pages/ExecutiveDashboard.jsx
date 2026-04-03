import { useState } from 'react'
import { PageShell } from '../components/Layout'
import { LineChart, BarTargetChart, MiniDonutChart } from '../components/Charts'
import { EXEC_KPIS, BU_BREAKDOWN_DATA, BU_CONTEXT_STRIPS } from '../data/stubs'

// ─── Month label helper (single letter) ───────────────────────────────────────
const MONTH_LETTERS = ['J','F','M','A','M','J','J','A','S','O','N','D']
function lastNMonths(n) {
  // End at March 2025 (index 2)
  return Array.from({ length: n }, (_, i) => MONTH_LETTERS[((2 - (n - 1 - i)) % 12 + 12) % 12])
}

// ─── Per-KPI blue-family color (slight variation per card position) ───────────
const KPI_COLORS = {
  'revenue':        '#118DFF',
  'op-margin':      '#0C7FE8',
  'ebitda-margin':  '#1499FF',
  'roa':            '#0870CC',
  'talent':         '#118DFF',
  'total-assets':   '#1A8FFF',
  'liquidity':      '#0C7AE0',
  'cap-dev':        '#1590F0',
  'debt-ratio':     '#0868C0',
  'op-cf':          '#1A94FF',
  'free-cf':        '#0C82EC',
  'fin-cf':         '#0868B8',
}

// ─── Trend-based sparkline color ──────────────────────────────────────────────
function trendColor(trend) {
  if (trend === 'positive') return '#107C10'
  if (trend === 'negative') return '#A80000'
  return '#B5720A'
}

// ─── Trend arrow ──────────────────────────────────────────────────────────────
function TrendArrow({ trend }) {
  if (trend === 'positive') return <span style={{ color: '#107C10' }}>↑</span>
  if (trend === 'negative') return <span style={{ color: '#A80000' }}>↓</span>
  return <span style={{ color: '#7A7574' }}>→</span>
}

// ─── Change badge ─────────────────────────────────────────────────────────────
function ChangeBadge({ change, trend }) {
  if (!change) return null
  const colors = {
    positive: { color: '#107C10', bg: '#DFF6DD' },
    negative: { color: '#A80000', bg: '#FDE7E9' },
    neutral:  { color: '#7A7574', bg: '#F3F2F1' },
  }
  const c = colors[trend] || colors.neutral
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      fontSize: 13, fontWeight: 600,
      color: c.color, background: c.bg,
      borderRadius: 3, padding: '2px 7px',
    }}>
      <TrendArrow trend={trend} /> {change}
    </span>
  )
}

// ─── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 18, fontWeight: 700, color: '#252423',
      marginBottom: 14, textAlign: 'center',
      letterSpacing: '0.01em',
    }}>
      {children}
    </div>
  )
}

// ─── Section container style ──────────────────────────────────────────────────
const sectionContainerStyle = {
  background: '#FFFFFF',
  borderRadius: 8,
  border: '1px solid #E0DDD9',
  padding: '20px 24px',
  boxShadow: '0 1.6px 3.6px rgba(0,0,0,0.13), 0 0.3px 0.9px rgba(0,0,0,0.1)',
}

// ─── KPI card header bar ──────────────────────────────────────────────────────
function CardHeader({ label, active }) {
  return (
    <div style={{
      padding: '10px 14px',
      display: 'flex', alignItems: 'center',
      background: active ? '#0F2B47' : '#1B3A5C',
      transition: 'background 0.15s',
      minHeight: 46,
    }}>
      <span style={{
        fontSize: 13, fontWeight: 700, color: '#FFFFFF',
        letterSpacing: '0.06em', textTransform: 'uppercase',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {label}
      </span>
    </div>
  )
}

// ─── Mini in-card chart (visual-first — chart is the anchor) ─────────────────
function KpiMiniChart({ kpi }) {
  const sp = kpi.sparkline
  if (!sp || sp.length === 0) return null

  const kpiColor = KPI_COLORS[kpi.id] ?? '#118DFF'
  const tc = trendColor(kpi.trend)
  const badgeBg = tc === '#107C10' ? 'rgba(223,246,221,0.88)' : tc === '#A80000' ? 'rgba(253,231,233,0.88)' : 'rgba(255,244,206,0.88)'
  const arrow = tc === '#107C10' ? '↑' : tc === '#A80000' ? '↓' : '→'

  const wrapStyle = { position: 'relative', width: '100%', paddingTop: 4, paddingBottom: 4 }

  // Overlaid change badge — top-right corner of chart area
  const overlayBadge = kpi.change ? (
    <div style={{
      position: 'absolute', top: 8, right: 4, zIndex: 2,
      fontSize: 11, fontWeight: 700, color: tc,
      background: badgeBg, borderRadius: 4, padding: '2px 6px',
      lineHeight: 1.3, whiteSpace: 'nowrap',
      boxShadow: '0 1px 3px rgba(0,0,0,0.10)',
    }}>
      {arrow} {kpi.change}
    </div>
  ) : null

  if (kpi.id === 'ebitda-margin') {
    return (
      <div style={wrapStyle}>
        {overlayBadge}
        <BarTargetChart values={sp.slice(-6)} target={22.4} labels={lastNMonths(6)} color={kpiColor} />
      </div>
    )
  }

  if (kpi.id === 'roa') {
    return (
      <div style={wrapStyle}>
        {overlayBadge}
        <BarTargetChart
          values={sp}
          target={6.5}
          labels={["Q1'24","Q2'24","Q3'24","Q4'24","Q1'25","Q2'25","Q3'25","Q4'25"]}
          color={kpiColor}
        />
      </div>
    )
  }

  // Default: trend-colored sparkline with area fill
  return (
    <div style={wrapStyle}>
      {overlayBadge}
      <LineChart thisYear={sp.slice(-6)} labels={lastNMonths(6)} color={tc} fill={true} />
    </div>
  )
}

// ─── Standard KPI card (visual-first layout) ─────────────────────────────────
function KpiCard({ kpi, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#FFFFFF',
        borderRadius: 4,
        border: '1px solid #E0DDD9',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: active
          ? '0 0 0 2px #118DFF, 0 1.6px 3.6px rgba(0,0,0,0.13)'
          : '0 1.6px 3.6px rgba(0,0,0,0.13), 0 0.3px 0.9px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.15s',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <CardHeader label={kpi.label} active={active} />

      {/* Chart area — the visual anchor */}
      <div style={{ padding: '10px 12px 4px 12px', background: '#FAFAFA' }}>
        <KpiMiniChart kpi={kpi} />
      </div>

      {/* Metric display below chart */}
      <div style={{ padding: '8px 14px 14px 14px', flex: 1 }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: '#252423', lineHeight: 1.1, marginBottom: 4 }}>
          {kpi.value}
        </div>
        {kpi.sub && (
          <div style={{ fontSize: 13, color: '#8A8886' }}>{kpi.sub}</div>
        )}
      </div>
    </div>
  )
}

// ─── Talent card (visual-first: large centered donut) ────────────────────────
function TalentCard({ kpi, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#FFFFFF',
        borderRadius: 4,
        border: '1px solid #E0DDD9',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: active
          ? '0 0 0 2px #118DFF, 0 1.6px 3.6px rgba(0,0,0,0.13)'
          : '0 1.6px 3.6px rgba(0,0,0,0.13), 0 0.3px 0.9px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.15s',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <CardHeader label={kpi.label} active={active} />

      {/* Large centered donut — the visual anchor */}
      <div style={{
        padding: '16px 12px 8px 12px',
        background: '#FAFAFA',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <MiniDonutChart valueA={842} valueB={214} colorA="#118DFF" colorB="#9FC8FF" size={130} />
      </div>

      {/* Stats below donut */}
      <div style={{ padding: '10px 14px 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Associates */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: '#118DFF', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 22, fontWeight: 700, color: '#252423' }}>{kpi.value}</span>
            <span style={{ fontSize: 13, color: '#605E5C' }}>{kpi.sub}</span>
          </div>
          <ChangeBadge change={kpi.change} trend={kpi.trend} />
        </div>
        {/* Divider */}
        <div style={{ borderTop: '1px solid #E0DDD9' }} />
        {/* Contractors */}
        {kpi.secondary && (
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#9FC8FF', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 22, fontWeight: 700, color: '#252423' }}>{kpi.secondary.value}</span>
              <span style={{ fontSize: 13, color: '#605E5C' }}>{kpi.secondary.label}</span>
            </div>
            <ChangeBadge change={kpi.secondary.change} trend="positive" />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Filter bar ───────────────────────────────────────────────────────────────
function FilterBar({ period, onPeriod }) {
  return (
    <div style={{
      height: 50, background: '#FFFFFF', borderBottom: '1px solid #E0DDD9',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 14, color: '#605E5C', fontWeight: 500 }}>Period:</span>
        {['Month', 'QTD', 'YTD'].map((p) => (
          <button
            key={p}
            onClick={() => onPeriod(p)}
            style={{
              fontSize: 13, fontWeight: 500, padding: '4px 14px', borderRadius: 12,
              border: period === p ? 'none' : '1px solid #E0DDD9',
              background: period === p ? '#118DFF' : 'transparent',
              color: period === p ? '#FFFFFF' : '#605E5C',
              cursor: 'pointer', transition: 'all 0.1s',
            }}
          >
            {p}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
          <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="#8A8886" strokeWidth="1.2" fill="none" />
          <line x1="1" y1="5" x2="12" y2="5" stroke="#8A8886" strokeWidth="1.2" />
          <line x1="4" y1="1" x2="4" y2="3.5" stroke="#8A8886" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="9" y1="1" x2="9" y2="3.5" stroke="#8A8886" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 13, color: '#8A8886' }}>As of March 2025</span>
      </div>
    </div>
  )
}

// ─── BU Bar Chart — all non-talent KPIs, sorted descending ───────────────────
function BuBarChart({ data, kpiColor = '#118DFF', deltaLabel = 'YOY' }) {
  const sorted = [...data].sort((a, b) => b.value - a.value)
  const maxVal = Math.max(...sorted.map((d) => d.value), 1)
  const labelW = 148, barMaxW = 320, valueW = 72, deltaW = 72, paddingL = 10
  const totalW = labelW + paddingL + barMaxW + valueW + deltaW + 16
  const headerH = 26
  const rowH = 44
  const barH = 20
  const totalH = sorted.length * rowH + headerH + 10

  const shortLabel = (bu) =>
    bu.replace('RE ', '').replace('Investment Properties', 'Inv. Props').replace('Regional Development', 'Regional Dev')

  return (
    <svg width="100%" height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}
      preserveAspectRatio="xMinYMid meet" style={{ display: 'block', maxWidth: 760 }}>
      {/* Column header */}
      <text x={totalW} y={headerH - 5} textAnchor="end" fontSize="12"
        fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif" fontWeight="600">
        {deltaLabel}
      </text>

      {sorted.map((d, i) => {
        const y = headerH + i * rowH + rowH / 2
        const bw = (d.value / maxVal) * barMaxW
        const barX = labelW + paddingL
        // Compute delta: prefer yoyDelta, fall back to enterprise comparison
        const delta = d.yoyDelta !== undefined
          ? d.yoyDelta
          : d.enterprise != null
            ? `${d.value >= d.enterprise ? '+' : ''}${(d.value - d.enterprise).toFixed(1)}%`
            : '—'
        const deltaColor = !delta || delta === '—' ? '#7A7574'
          : delta.startsWith('+') ? '#107C10' : '#A80000'
        return (
          <g key={i}>
            <text x={labelW} y={y} textAnchor="end" fontSize="14"
              fill="#605E5C" fontFamily="'Segoe UI', system-ui, sans-serif"
              dominantBaseline="central">
              {shortLabel(d.bu)}
            </text>
            {/* Track */}
            <rect x={barX} y={y - barH / 2} width={barMaxW} height={barH} rx="3" fill="#E0DDD9" />
            {/* Fill */}
            <rect x={barX} y={y - barH / 2} width={bw} height={barH} rx="3"
              fill={kpiColor} opacity={0.55 + 0.45 * (d.value / maxVal)} />
            {/* Value */}
            <text x={barX + bw + 7} y={y} fontSize="14" fill="#252423"
              fontFamily="'Segoe UI', system-ui, sans-serif"
              dominantBaseline="central" fontWeight="600">
              {d.display}
            </text>
            {/* Delta column */}
            <text x={totalW} y={y} textAnchor="end" fontSize="13"
              fill={deltaColor} fontFamily="'Segoe UI', system-ui, sans-serif"
              dominantBaseline="central" fontWeight="700">
              {delta}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── BU Percent Table — % KPIs, sorted descending ────────────────────────────
function BuPercentTable({ data, kpiLabel }) {
  const sorted = [...data].sort((a, b) => b.value - a.value)
  return (
    <table className="data-table" style={{ maxWidth: 700, fontSize: 15 }}>
      <thead>
        <tr>
          <th style={{ fontSize: 13 }}>Business Unit</th>
          <th style={{ textAlign: 'right', fontSize: 13 }}>{kpiLabel}</th>
          <th style={{ textAlign: 'right', fontSize: 13 }}>vs Enterprise Avg</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, i) => {
          const delta = row.enterprise != null ? +(row.value - row.enterprise).toFixed(1) : null
          const trend = delta == null ? 'neutral' : delta >= 0 ? 'positive' : 'negative'
          return (
            <tr key={i} style={{ background: i % 2 === 1 ? '#FAF9F8' : '#FFFFFF' }}>
              <td style={{ color: '#252423', padding: '10px 12px' }}>{row.bu}</td>
              <td style={{ textAlign: 'right', fontWeight: 700, color: '#252423', padding: '10px 12px' }}>{row.display}</td>
              <td style={{ textAlign: 'right', padding: '10px 12px' }}>
                {delta != null ? (
                  <ChangeBadge change={`${delta >= 0 ? '+' : ''}${delta}pp`} trend={trend} />
                ) : (
                  <span style={{ color: '#8A8886', fontSize: 13 }}>—</span>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// ─── BU Talent Table ──────────────────────────────────────────────────────────
function BuTalentTable({ data }) {
  return (
    <table className="data-table" style={{ maxWidth: 580, fontSize: 15 }}>
      <thead>
        <tr>
          <th style={{ fontSize: 13 }}>Business Unit</th>
          <th style={{ textAlign: 'right', fontSize: 13 }}>Associates</th>
          <th style={{ textAlign: 'right', fontSize: 13 }}>Contractors</th>
          <th style={{ textAlign: 'right', fontSize: 13 }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 1 ? '#FAF9F8' : '#FFFFFF' }}>
            <td style={{ color: '#252423', padding: '10px 12px' }}>{row.bu}</td>
            <td style={{ textAlign: 'right', color: '#252423', padding: '10px 12px' }}>{row.associates}</td>
            <td style={{ textAlign: 'right', color: '#605E5C', padding: '10px 12px' }}>{row.contractors}</td>
            <td style={{ textAlign: 'right', fontWeight: 700, color: '#252423', padding: '10px 12px' }}>
              {row.associates + row.contractors}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ─── Context strip ────────────────────────────────────────────────────────────
function ContextStrip({ strips }) {
  if (!strips) return null
  const pills = [strips.total, strips.avg, strips.best, strips.worst].filter(Boolean)
  if (pills.length === 0) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
      {pills.map((text, i) => (
        <span key={i} style={{
          fontSize: 13, color: '#605E5C',
          background: '#F3F2F1', border: '1px solid #E0DDD9',
          borderRadius: 12, padding: '5px 14px', whiteSpace: 'nowrap',
        }}>
          {text}
        </span>
      ))}
    </div>
  )
}

// ─── BU Breakdown Panel (inline, drops below active section) ──────────────────
function BuBreakdownPanel({ kpiObj, breakdownData, contextStrips }) {
  return (
    <div style={{
      marginTop: 18,
      background: '#FAFBFF',
      border: '1px solid #C8DBFF',
      borderRadius: 8,
      padding: '20px 24px',
      boxShadow: '0 2px 8px rgba(17,141,255,0.08)',
      animation: 'fadeIn 0.2s ease-in',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 4 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#252423' }}>
          ▶ {kpiObj.label} — Business Unit Breakdown
        </span>
      </div>
      <div style={{ fontSize: 13, color: '#8A8886', marginBottom: 18 }}>
        Click a KPI card above to change
      </div>

      {/* Visualization */}
      {breakdownData && (kpiObj.type === 'dollar' || kpiObj.type === 'percent') && (
        <BuBarChart
          data={breakdownData}
          kpiColor={KPI_COLORS[kpiObj.id] ?? '#118DFF'}
          deltaLabel={kpiObj.type === 'percent' ? 'vs Avg' : 'YOY'}
        />
      )}
      {breakdownData && kpiObj.type === 'talent' && <BuTalentTable data={breakdownData} />}
      {!breakdownData && (
        <div style={{ color: '#8A8886', fontSize: 15 }}>No breakdown data available for this KPI.</div>
      )}

      {/* Context strip */}
      <ContextStrip strips={contextStrips} />
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ExecutiveDashboard() {
  const [period, setPeriod] = useState('YTD')
  const [selectedKpi, setSelectedKpi] = useState('revenue')

  const financialKpis  = EXEC_KPIS.filter((k) => k.section === 'financial')
  const balanceKpis    = EXEC_KPIS.filter((k) => k.section === 'balance')
  const cashflowKpis   = EXEC_KPIS.filter((k) => k.section === 'cashflow')

  const selectedKpiObj = EXEC_KPIS.find((k) => k.id === selectedKpi)
  const breakdownData  = selectedKpiObj ? BU_BREAKDOWN_DATA[selectedKpi] : null
  const contextStrips  = BU_CONTEXT_STRIPS[selectedKpi] ?? null

  return (
    <PageShell>
      <FilterBar period={period} onPeriod={setPeriod} />

      <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* ── Section 1: Financial Performance ── */}
        <div style={sectionContainerStyle}>
          <SectionLabel>Financial Performance</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 0.85fr', gap: 12, alignItems: 'stretch' }}>
            {financialKpis.map((kpi) =>
              kpi.type === 'talent' ? (
                <TalentCard key={kpi.id} kpi={kpi}
                  active={selectedKpi === kpi.id}
                  onClick={() => setSelectedKpi(kpi.id)} />
              ) : (
                <KpiCard key={kpi.id} kpi={kpi}
                  active={selectedKpi === kpi.id}
                  onClick={() => setSelectedKpi(kpi.id)} />
              )
            )}
          </div>
          {selectedKpiObj?.section === 'financial' && breakdownData && (
            <BuBreakdownPanel
              key={selectedKpi}
              kpiObj={selectedKpiObj}
              breakdownData={breakdownData}
              contextStrips={contextStrips}
            />
          )}
        </div>

        {/* ── Section 2: Balance Sheet ── */}
        <div style={sectionContainerStyle}>
          <SectionLabel>Balance Sheet</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'stretch' }}>
            {balanceKpis.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi}
                active={selectedKpi === kpi.id}
                onClick={() => setSelectedKpi(kpi.id)} />
            ))}
          </div>
          {selectedKpiObj?.section === 'balance' && breakdownData && (
            <BuBreakdownPanel
              key={selectedKpi}
              kpiObj={selectedKpiObj}
              breakdownData={breakdownData}
              contextStrips={contextStrips}
            />
          )}
        </div>

        {/* ── Section 3: Cash Flow ── */}
        <div style={sectionContainerStyle}>
          <SectionLabel>Cash Flow</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, alignItems: 'stretch' }}>
            {cashflowKpis.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi}
                active={selectedKpi === kpi.id}
                onClick={() => setSelectedKpi(kpi.id)} />
            ))}
          </div>
          {selectedKpiObj?.section === 'cashflow' && breakdownData && (
            <BuBreakdownPanel
              key={selectedKpi}
              kpiObj={selectedKpiObj}
              breakdownData={breakdownData}
              contextStrips={contextStrips}
            />
          )}
        </div>

        {/* ── Operational Snapshot placeholder ── */}
        <div style={{
          background: '#FFFFFF', border: '1px dashed #E0DDD9', borderRadius: 6,
          height: 90, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <div style={{ fontSize: 16, color: '#8A8886', fontWeight: 500 }}>
            Operational Snapshot KPIs — Coming Soon
          </div>
          <div style={{ fontSize: 13, color: '#8A8886' }}>
            Operational metrics by business unit will be defined in a future iteration
          </div>
        </div>

      </div>
    </PageShell>
  )
}
