import { useState } from 'react'
import { PageShell } from '../components/Layout'
import { BUSINESS_UNITS, EXEC_KPIS, BU_BREAKDOWN_DATA } from '../data/stubs'

// ─── BU color square ──────────────────────────────────────────────────────────
const BU_COLOR_MAP = {
  blue:   '#378ADD',
  teal:   '#1D9E75',
  amber:  '#BA7517',
  green:  '#639922',
  purple: '#7F77DD',
  pink:   '#D4537E',
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const config = {
    'On Track': { dot: '#107C10', bg: '#DFF6DD', color: '#107C10' },
    'Watch':    { dot: '#7A7574', bg: '#F3F2F1', color: '#7A7574' },
    'At Risk':  { dot: '#A80000', bg: '#FDE7E9', color: '#A80000' },
  }
  const c = config[status] || config['Watch']
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 11,
        fontWeight: 500,
        color: c.color,
        background: c.bg,
        borderRadius: 2,
        padding: '2px 7px',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: c.dot,
          display: 'inline-block',
        }}
      />
      {status}
    </span>
  )
}

// ─── Change badge (inline) ────────────────────────────────────────────────────
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
        marginLeft: 4,
      }}
    >
      {change}
    </span>
  )
}

// ─── Comparison table (all BUs) ───────────────────────────────────────────────
function ComparisonTable() {
  // Build rows from BU_BREAKDOWN_DATA
  const rows = BUSINESS_UNITS.map((bu) => {
    const get = (kpiId) => {
      const d = BU_BREAKDOWN_DATA[kpiId]
      if (!d) return '-'
      const row = d.find((r) => r.bu === bu.name)
      return row ? row.display : '-'
    }
    return {
      bu,
      revenue:    get('revenue'),
      totalAssets: get('total-assets'),
      opMargin:   get('op-margin'),
      ebitdaMargin: get('ebitda-margin'),
      opCf:       get('op-cf'),
      debtRatio:  get('debt-ratio'),
      status:     bu.status,
    }
  })

  return (
    <table
      className="data-table"
      style={{ width: '100%', borderCollapse: 'collapse' }}
    >
      <thead>
        <tr>
          <th>Business Unit</th>
          <th style={{ textAlign: 'right' }}>Revenue</th>
          <th style={{ textAlign: 'right' }}>Total Assets</th>
          <th style={{ textAlign: 'right' }}>Op Margin</th>
          <th style={{ textAlign: 'right' }}>EBITDA Margin</th>
          <th style={{ textAlign: 'right' }}>Op CF</th>
          <th style={{ textAlign: 'right' }}>Debt Ratio</th>
          <th style={{ textAlign: 'center' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={row.bu.id}
            style={{
              background: i % 2 === 0 ? '#FFFFFF' : '#FAF9F8',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#F3F2F1' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? '#FFFFFF' : '#FAF9F8' }}
          >
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: BU_COLOR_MAP[row.bu.color] || '#888',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: '#252423', fontWeight: 500 }}>{row.bu.name}</span>
              </div>
            </td>
            <td style={{ textAlign: 'right', color: '#252423' }}>{row.revenue}</td>
            <td style={{ textAlign: 'right', color: '#252423' }}>{row.totalAssets}</td>
            <td style={{ textAlign: 'right', color: '#252423' }}>{row.opMargin}</td>
            <td style={{ textAlign: 'right', color: '#252423' }}>{row.ebitdaMargin}</td>
            <td style={{ textAlign: 'right', color: '#252423' }}>{row.opCf}</td>
            <td style={{ textAlign: 'right', color: '#252423' }}>{row.debtRatio}</td>
            <td style={{ textAlign: 'center' }}>
              <StatusBadge status={row.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ─── BU KPI scorecard ─────────────────────────────────────────────────────────
function BuScorecard({ bu }) {
  // Get the KPI values for this BU from BU_BREAKDOWN_DATA
  const getVal = (kpiId) => {
    const d = BU_BREAKDOWN_DATA[kpiId]
    if (!d) return null
    return d.find((r) => r.bu === bu.name) || null
  }

  const talentRow = BU_BREAKDOWN_DATA['talent']?.find((r) => r.bu === bu.name)

  const kpiDefs = EXEC_KPIS.filter((k) => k.id !== 'talent')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* BU Header */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E0DDD9',
          borderLeft: `4px solid ${BU_COLOR_MAP[bu.color]}`,
          borderRadius: 4,
          padding: '14px 16px',
          boxShadow: '0 1.6px 3.6px rgba(0,0,0,0.13), 0 0.3px 0.9px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 2,
              background: BU_COLOR_MAP[bu.color],
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#252423' }}>{bu.name}</span>
          <StatusBadge status={bu.status} />
        </div>
        <div style={{ fontSize: 13, color: '#605E5C' }}>{bu.description}</div>
      </div>

      {/* Financial Performance */}
      <div>
        <div
          style={{
            fontSize: 10, fontWeight: 600, color: '#605E5C',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
          }}
        >
          Financial Performance
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {['revenue', 'op-margin', 'ebitda-margin', 'roa'].map((kpiId) => {
            const d = getVal(kpiId)
            const kpi = EXEC_KPIS.find((k) => k.id === kpiId)
            if (!d || !kpi) return null
            return (
              <div
                key={kpiId}
                className="kpi-card"
                style={{ cursor: 'default' }}
              >
                <div style={{ fontSize: 11, color: '#8A8886', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 500 }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#252423', lineHeight: 1.1, marginBottom: 4 }}>
                  {d.display}
                </div>
              </div>
            )
          })}
          {/* Talent mini */}
          {talentRow && (
            <div className="kpi-card" style={{ cursor: 'default' }}>
              <div style={{ fontSize: 11, color: '#8A8886', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 500 }}>
                Talent
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#252423' }}>{talentRow.associates}</div>
              <div style={{ fontSize: 11, color: '#605E5C', marginBottom: 4 }}>Associates</div>
              <div style={{ borderTop: '1px solid #E0DDD9', paddingTop: 5 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#252423' }}>{talentRow.contractors}</div>
                <div style={{ fontSize: 11, color: '#605E5C' }}>Contractors</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Balance Sheet */}
      <div>
        <div
          style={{
            fontSize: 10, fontWeight: 600, color: '#605E5C',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
          }}
        >
          Balance Sheet
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {['total-assets', 'liquidity', 'cap-dev', 'debt-ratio'].map((kpiId) => {
            const d = getVal(kpiId)
            const kpi = EXEC_KPIS.find((k) => k.id === kpiId)
            if (!d || !kpi) return null
            return (
              <div key={kpiId} className="kpi-card" style={{ cursor: 'default' }}>
                <div style={{ fontSize: 11, color: '#8A8886', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 500 }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#252423', lineHeight: 1.1, marginBottom: 4 }}>
                  {d.display}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Cash Flow */}
      <div>
        <div
          style={{
            fontSize: 10, fontWeight: 600, color: '#605E5C',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
          }}
        >
          Cash Flow
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {['op-cf', 'free-cf', 'fin-cf'].map((kpiId) => {
            const d = getVal(kpiId)
            const kpi = EXEC_KPIS.find((k) => k.id === kpiId)
            if (!d || !kpi) return null
            return (
              <div key={kpiId} className="kpi-card" style={{ cursor: 'default' }}>
                <div style={{ fontSize: 11, color: '#8A8886', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 500 }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#252423', lineHeight: 1.1, marginBottom: 4 }}>
                  {d.display}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Filter bar ───────────────────────────────────────────────────────────────
function FilterBar({ period, onPeriod, selectedBu, onBuChange }) {
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
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Period selector */}
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

        {/* BU slicer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, color: '#605E5C', fontWeight: 500 }}>Business Unit:</span>
          <select
            value={selectedBu}
            onChange={(e) => onBuChange(e.target.value)}
            style={{
              fontSize: 12,
              color: '#252423',
              border: '1px solid #E0DDD9',
              borderRadius: 2,
              padding: '3px 24px 3px 8px',
              background: '#FFFFFF',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23605E5C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 7px center',
            }}
          >
            <option value="all">All Business Units</option>
            {BUSINESS_UNITS.map((bu) => (
              <option key={bu.id} value={bu.slug}>{bu.name}</option>
            ))}
          </select>
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
export default function BuDashboard() {
  const [period, setPeriod] = useState('YTD')
  const [selectedBu, setSelectedBu] = useState('all')

  const activeBu = selectedBu === 'all'
    ? null
    : BUSINESS_UNITS.find((b) => b.slug === selectedBu)

  return (
    <PageShell>
      <FilterBar
        period={period}
        onPeriod={setPeriod}
        selectedBu={selectedBu}
        onBuChange={setSelectedBu}
      />

      <div style={{ padding: '20px 24px' }}>
        {selectedBu === 'all' ? (
          /* ── All BUs comparison table ── */
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E0DDD9',
              borderRadius: 4,
              boxShadow: '0 1.6px 3.6px rgba(0,0,0,0.13), 0 0.3px 0.9px rgba(0,0,0,0.1)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #E0DDD9',
                fontSize: 14,
                fontWeight: 600,
                color: '#252423',
              }}
            >
              Business Unit Comparison
            </div>
            <div style={{ overflowX: 'auto' }}>
              <ComparisonTable />
            </div>
          </div>
        ) : (
          /* ── Single BU scorecard ── */
          activeBu && <BuScorecard bu={activeBu} />
        )}
      </div>
    </PageShell>
  )
}
