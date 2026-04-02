import { useState } from 'react'
import { PageShell } from '../components/Layout'
import { EXEC_KPIS, BU_BREAKDOWN_DATA } from '../data/stubs'

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
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        fontSize: 11,
        fontWeight: 500,
        color: c.color,
        background: c.bg,
        borderRadius: 2,
        padding: '1px 5px',
      }}
    >
      <TrendArrow trend={trend} /> {change}
    </span>
  )
}

// ─── Standard KPI card ────────────────────────────────────────────────────────
function KpiCard({ kpi, active, onClick }) {
  return (
    <div
      className="kpi-card"
      onClick={onClick}
      style={active ? {
        borderLeft: '2px solid #118DFF',
        background: '#EBF4FF',
        cursor: 'pointer',
      } : { cursor: 'pointer' }}
    >
      <div
        style={{
          fontSize: 11,
          color: '#8A8886',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {kpi.label}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: '#252423',
          lineHeight: 1.1,
          marginBottom: 4,
        }}
      >
        {kpi.value}
      </div>
      {kpi.sub && (
        <div style={{ fontSize: 11, color: '#8A8886', marginBottom: 4 }}>
          {kpi.sub}
        </div>
      )}
      {kpi.change && <ChangeBadge change={kpi.change} trend={kpi.trend} />}
    </div>
  )
}

// ─── Talent card (dual-stat) ──────────────────────────────────────────────────
function TalentCard({ kpi, active, onClick }) {
  return (
    <div
      className="kpi-card"
      onClick={onClick}
      style={active ? {
        borderLeft: '2px solid #118DFF',
        background: '#EBF4FF',
        cursor: 'pointer',
      } : { cursor: 'pointer' }}
    >
      <div
        style={{
          fontSize: 11,
          color: '#8A8886',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        {kpi.label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#252423', lineHeight: 1.1 }}>
            {kpi.value}
          </div>
          <div style={{ fontSize: 11, color: '#605E5C' }}>{kpi.sub}</div>
          <ChangeBadge change={kpi.change} trend={kpi.trend} />
        </div>
        <div style={{ borderTop: '1px solid #E0DDD9', paddingTop: 6 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#252423', lineHeight: 1.1 }}>
            {kpi.secondary.value}
          </div>
          <div style={{ fontSize: 11, color: '#605E5C' }}>{kpi.secondary.label}</div>
          <ChangeBadge change={`+${kpi.secondary.change}`} trend="positive" />
        </div>
      </div>
    </div>
  )
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 600,
        color: '#605E5C',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  )
}

// ─── BU Breakdown — horizontal bar chart ─────────────────────────────────────
function BuBarChart({ data }) {
  const labels = data.map((d) => d.bu.replace('RE ', '').replace('Investment Properties', 'Inv. Props'))
  const values = data.map((d) => d.value)
  const displays = data.map((d) => d.display)

  // Custom SVG horizontal bar chart with proper labels
  const maxVal = Math.max(...values, 1)
  const rowH = 32
  const labelW = 130
  const barMaxW = 320
  const valueW = 70
  const totalW = labelW + barMaxW + valueW + 20
  const totalH = data.length * rowH + 8

  return (
    <svg
      width="100%"
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      preserveAspectRatio="xMinYMid meet"
      style={{ display: 'block', maxWidth: 560 }}
    >
      {data.map((d, i) => {
        const y = i * rowH + rowH / 2
        const bw = (d.value / maxVal) * barMaxW
        const barX = labelW + 8
        return (
          <g key={i}>
            <text
              x={labelW}
              y={y}
              textAnchor="end"
              fontSize="11"
              fill="#605E5C"
              fontFamily="'Segoe UI', system-ui, sans-serif"
              dominantBaseline="central"
            >
              {labels[i]}
            </text>
            {/* Track */}
            <rect
              x={barX}
              y={y - 7}
              width={barMaxW}
              height={14}
              rx="2"
              fill="#E0DDD9"
            />
            {/* Fill */}
            <rect
              x={barX}
              y={y - 7}
              width={bw}
              height={14}
              rx="2"
              fill="#118DFF"
              opacity={0.75 + 0.25 * (d.value / maxVal)}
            />
            <text
              x={barX + bw + 6}
              y={y}
              fontSize="11"
              fill="#252423"
              fontFamily="'Segoe UI', system-ui, sans-serif"
              dominantBaseline="central"
              fontWeight="500"
            >
              {d.display}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── BU Breakdown — percent table ─────────────────────────────────────────────
function BuPercentTable({ data, kpiLabel }) {
  return (
    <table className="data-table" style={{ maxWidth: 560 }}>
      <thead>
        <tr>
          <th>Business Unit</th>
          <th style={{ textAlign: 'right' }}>{kpiLabel}</th>
          <th style={{ textAlign: 'right' }}>vs Enterprise Avg</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => {
          const delta = row.enterprise != null ? +(row.value - row.enterprise).toFixed(1) : null
          const trend = delta == null ? 'neutral' : delta >= 0 ? 'positive' : 'negative'
          return (
            <tr key={i} style={{ background: i % 2 === 1 ? '#FAF9F8' : '#FFFFFF' }}>
              <td style={{ color: '#252423' }}>{row.bu}</td>
              <td style={{ textAlign: 'right', fontWeight: 600, color: '#252423' }}>{row.display}</td>
              <td style={{ textAlign: 'right' }}>
                {delta != null && (
                  <ChangeBadge
                    change={`${delta >= 0 ? '+' : ''}${delta}pp`}
                    trend={trend}
                  />
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// ─── BU Breakdown — talent table ─────────────────────────────────────────────
function BuTalentTable({ data }) {
  return (
    <table className="data-table" style={{ maxWidth: 560 }}>
      <thead>
        <tr>
          <th>Business Unit</th>
          <th style={{ textAlign: 'right' }}>Associates</th>
          <th style={{ textAlign: 'right' }}>Contractors</th>
          <th style={{ textAlign: 'right' }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 1 ? '#FAF9F8' : '#FFFFFF' }}>
            <td style={{ color: '#252423' }}>{row.bu}</td>
            <td style={{ textAlign: 'right', color: '#252423' }}>{row.associates}</td>
            <td style={{ textAlign: 'right', color: '#605E5C' }}>{row.contractors}</td>
            <td style={{ textAlign: 'right', fontWeight: 600, color: '#252423' }}>
              {row.associates + row.contractors}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ─── Filter bar ───────────────────────────────────────────────────────────────
function FilterBar({ period, onPeriod }) {
  const periods = ['Month', 'QTD', 'YTD']
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E0DDD9',
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: '#605E5C', fontWeight: 500 }}>Period:</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => onPeriod(p)}
              style={{
                fontSize: 12,
                fontWeight: 500,
                padding: '3px 10px',
                borderRadius: 10,
                border: period === p ? 'none' : '1px solid #E0DDD9',
                background: period === p ? '#118DFF' : 'transparent',
                color: period === p ? '#FFFFFF' : '#605E5C',
                cursor: 'pointer',
                transition: 'all 0.1s',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#8A8886', fontSize: 12 }}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="3" width="14" height="12" rx="1.5" stroke="#8A8886" strokeWidth="1.2"/>
          <path d="M5 1v4M11 1v4" stroke="#8A8886" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M1 7h14" stroke="#8A8886" strokeWidth="1.2"/>
        </svg>
        As of March 2025
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ExecutiveDashboard() {
  const [period, setPeriod] = useState('YTD')
  const [selectedKpi, setSelectedKpi] = useState('revenue')

  const financialKpis = EXEC_KPIS.filter((k) => k.section === 'financial')
  const balanceKpis   = EXEC_KPIS.filter((k) => k.section === 'balance')
  const cashflowKpis  = EXEC_KPIS.filter((k) => k.section === 'cashflow')

  const selectedKpiObj = EXEC_KPIS.find((k) => k.id === selectedKpi)
  const breakdownData  = BU_BREAKDOWN_DATA[selectedKpi]

  return (
    <PageShell>
      <FilterBar period={period} onPeriod={setPeriod} />

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* ── Section 1: Financial Performance ── */}
        <div>
          <SectionLabel>Financial Performance</SectionLabel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 0.8fr',
              gap: 10,
            }}
          >
            {financialKpis.map((kpi) =>
              kpi.type === 'talent' ? (
                <TalentCard
                  key={kpi.id}
                  kpi={kpi}
                  active={selectedKpi === kpi.id}
                  onClick={() => setSelectedKpi(kpi.id)}
                />
              ) : (
                <KpiCard
                  key={kpi.id}
                  kpi={kpi}
                  active={selectedKpi === kpi.id}
                  onClick={() => setSelectedKpi(kpi.id)}
                />
              )
            )}
          </div>
        </div>

        {/* ── Section 2: Balance Sheet ── */}
        <div>
          <SectionLabel>Balance Sheet</SectionLabel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 10,
            }}
          >
            {balanceKpis.map((kpi) => (
              <KpiCard
                key={kpi.id}
                kpi={kpi}
                active={selectedKpi === kpi.id}
                onClick={() => setSelectedKpi(kpi.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Section 3: Cash Flow ── */}
        <div>
          <SectionLabel>Cash Flow</SectionLabel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
            }}
          >
            {cashflowKpis.map((kpi) => (
              <KpiCard
                key={kpi.id}
                kpi={kpi}
                active={selectedKpi === kpi.id}
                onClick={() => setSelectedKpi(kpi.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ borderTop: '1px solid #E0DDD9' }} />

        {/* ── BU Breakdown Section ── */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E0DDD9',
            borderRadius: 4,
            padding: 16,
            boxShadow: '0 1.6px 3.6px rgba(0,0,0,0.13), 0 0.3px 0.9px rgba(0,0,0,0.1)',
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: '#252423' }}>
              Business Unit Breakdown
            </span>
            {selectedKpiObj && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  background: '#EBF4FF',
                  color: '#118DFF',
                  borderRadius: 2,
                  padding: '2px 8px',
                }}
              >
                {selectedKpiObj.label}
              </span>
            )}
            <span style={{ fontSize: 11, color: '#8A8886' }}>
              Click a KPI above to change
            </span>
          </div>

          {/* Visualization */}
          {breakdownData && selectedKpiObj?.type === 'dollar' && (
            <BuBarChart data={breakdownData} />
          )}
          {breakdownData && selectedKpiObj?.type === 'percent' && (
            <BuPercentTable data={breakdownData} kpiLabel={selectedKpiObj.label} />
          )}
          {breakdownData && selectedKpiObj?.type === 'talent' && (
            <BuTalentTable data={breakdownData} />
          )}
          {!breakdownData && (
            <div style={{ color: '#8A8886', fontSize: 13 }}>
              No breakdown data available for this KPI.
            </div>
          )}
        </div>

        {/* ── Operational Snapshot Placeholder ── */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px dashed #E0DDD9',
            borderRadius: 4,
            height: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <span style={{ fontSize: 13, color: '#8A8886', fontWeight: 500 }}>
            Operational Snapshot KPIs — Coming Soon
          </span>
          <span style={{ fontSize: 11, color: '#8A8886' }}>
            Operational metrics by business unit will be defined in a future iteration
          </span>
        </div>

      </div>
    </PageShell>
  )
}
