import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BU_BODY_KPIS, BU_KPI_EXPAND } from '../data/stubs'
import {
  GroupedBarChart, HorizontalBarChart, ProgressBarChart,
  LineChart, StackedBarChart, BarTargetChart, BulletChart,
} from './Charts'

function VizCard({ kpi, bu, active, onClick }) {
  const c = bu.colorHex
  const bg = bu.colorBg

  const chart = (() => {
    switch (kpi.chartType) {
      case 'grouped-bar':
        return <GroupedBarChart color={c}
          labels={getLabels(kpi.id)} thisYear={getThisYear(kpi.id)} lastYear={getLastYear(kpi.id)} />
      case 'horizontal-bar':
        return <HorizontalBarChart color={c} labels={getHLabels(kpi.id)} values={getHValues(kpi.id)} />
      case 'progress':
        return <ProgressBarChart color={c} colorBg={bg} pct={getPct(kpi.id)} label={kpi.sub} sublabel="" />
      case 'line':
        return <LineChart color={c} thisYear={getLineData(kpi.id)} lastYear={getLineDataLY(kpi.id)} labels={getLineLabels(kpi.id)} />
      case 'stacked-bar':
        return <StackedBarChart colorA={c} colorB={bg}
          labelsA={getStackA(kpi.id)} labelsB={getStackB(kpi.id)}
          xLabels={getStackX(kpi.id)} valuesA={getStackVA(kpi.id)} valuesB={getStackVB(kpi.id)} />
      case 'bar-target':
        return <BarTargetChart color={c} values={getBTValues(kpi.id)} target={getBTTarget(kpi.id)} labels={getBTLabels(kpi.id)} />
      case 'dual-line':
        return <LineChart color={c} thisYear={getLineData(kpi.id)} lastYear={getLineDataLY(kpi.id)} labels={getLineLabels(kpi.id)} />
      case 'bar':
        return <GroupedBarChart color={c}
          labels={getLabels(kpi.id)} thisYear={getThisYear(kpi.id)} lastYear={getLastYear(kpi.id)} />
      case 'bullet':
        return <BulletChart color={c} value={1.84} max={3} floor={1.25} label="vs 1.25x covenant floor" />
      default:
        return <LineChart color={c} thisYear={[4,5,4,6,5,7,6,8]} labels={['Q1','Q2','Q3','Q4','Q1','Q2','Q3','Q4']} />
    }
  })()

  return (
    <div
      className={`kpi-card ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-ink-secondary">{kpi.label}</p>
        {active && <span className="text-2xs px-1.5 py-0.5 rounded" style={{ background: bu.colorBg, color: bu.colorDark }}>Selected</span>}
      </div>
      {chart}
    </div>
  )
}

function KpiStatCard({ kpi, bu, active, onClick }) {
  return (
    <div className={`kpi-card ${active ? 'active' : ''}`} onClick={onClick}>
      <p className="text-2xs text-ink-tertiary uppercase tracking-wide mb-2">{kpi.label}</p>
      <p className="font-display text-2xl font-semibold text-ink leading-none mb-1">{kpi.value}</p>
      <p className="text-xs text-ink-tertiary leading-snug">{kpi.sub}</p>
      {active && (
        <p className="text-2xs mt-2 flex items-center gap-1" style={{ color: bu.colorHex }}>
          <span>▼</span> See detail below
        </p>
      )}
    </div>
  )
}

export function BuBodyKpis({ slug, bu }) {
  const navigate = useNavigate()
  const kpis = BU_BODY_KPIS[slug] || []
  const [activeIdx, setActiveIdx] = useState(0)

  const active = kpis[activeIdx]
  const expandData = active ? BU_KPI_EXPAND[active.id] : null

  const select = (i) => setActiveIdx(i)

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium text-ink">Key Metrics</h2>
          <p className="text-xs text-ink-tertiary mt-0.5">Click a stat or chart to view trend detail</p>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Left sidebar */}
        <div className="flex flex-col gap-3" style={{ width: 160, flexShrink: 0 }}>
          {kpis.map((kpi, i) => (
            <KpiStatCard key={kpi.id} kpi={kpi} bu={bu} active={activeIdx === i} onClick={() => select(i)} />
          ))}
        </div>

        {/* Right viz grid */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 gap-3">
            {kpis.map((kpi, i) => (
              <VizCard key={kpi.id} kpi={kpi} bu={bu} active={activeIdx === i} onClick={() => select(i)} />
            ))}
          </div>

          {/* Expand panel */}
          {expandData && (
            <div className="mt-3 bg-surface border border-border rounded-lg p-4 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-ink">{expandData.title}</span>
                <button
                  onClick={() => navigate(`/bu/${slug}/kpi/${active.id}`)}
                  className="text-xs flex items-center gap-1 px-2.5 py-1.5 rounded border border-brand/30 bg-brand-subtle text-brand hover:bg-brand hover:text-white transition-colors"
                >
                  View data table →
                </button>
              </div>
              {/* Trend line */}
              <div className="mb-3 overflow-hidden">
                <LineChart
                  color={bu.colorHex}
                  thisYear={[4,5,4.5,6,5.5,7,6.5,8]}
                  lastYear={[3,4,3.5,5,4.5,6,5.5,7]}
                  labels={["Q1'23","Q2'23","Q3'23","Q4'23","Q1'24","Q2'24","Q3'24","Q4'24"]}
                />
              </div>
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border">
                {expandData.stats.map(([label, value, note], i) => (
                  <div key={i} className="bg-canvas rounded px-3 py-2">
                    <p className="text-2xs text-ink-tertiary uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-sm font-medium text-ink">{value}</p>
                    <p className="text-2xs text-ink-tertiary mt-0.5">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Chart data helpers ───────────────────────────────────────────────────────

function getLabels(id) {
  const m = {
    'occupancy':    ['Office','Retail','Indus','Mixed'],
    'home-sales':   ['Lndmk','Legacy','Pecan','Harvest','Wolf R'],
    'avg-price':    ['<400','400-450','450-500','500-550','550-700','700+'],
    'starts':       ['SW','NW','SE','NE','Central','West'],
    'developments': ['CBD','InnerE','InnerN','Outer'],
    'mixed-use':    ['Q1','Q2','Q3','Q4','Q1\'25'],
    'allocation':   ['Q1','Q2','Q3','Q4','Q1\'25','Q2\'25'],
  }
  return m[id] || ['Q1','Q2','Q3','Q4','Q1\'25']
}
function getThisYear(id) {
  const m = {
    'occupancy':    [91,96,98,88],
    'home-sales':   [52,48,38,42,24],
    'avg-price':    [18,28,42,38,24,12],
    'starts':       [48,38,42,34,28,24],
    'developments': [3,2,1,2],
    'mixed-use':    [64,64,65,63,64],
    'allocation':   [58,58,58,58,58,58],
  }
  return m[id] || [42,48,44,52,50,56,54,60]
}
function getLastYear(id) {
  const m = {
    'occupancy':    [89,94,97,86],
    'home-sales':   [58,54,44,48,28],
    'avg-price':    [14,24,38,34,20,10],
    'starts':       [42,32,36,28,22,18],
    'developments': [2,2,1,1],
    'mixed-use':    [62,63,64,62,63],
    'allocation':   [55,56,57,57,58,58],
  }
  return m[id] || [36,42,38,46,44,50,48,54]
}
function getHLabels(id) {
  const m = {
    'noi':          ['150 Collins','Southgate','Port Melb','200 Queen','Richmond'],
    'noi-precinct': ['CBD Core','Inner East','Outer','Southbank'],
    'inventory':    ['Landmark','Legacy','Pecan Sq','Harvest','Wolf Ranch'],
    'land-bank':    ['South West','North','East','Inner','South','West'],
  }
  return m[id] || ['A','B','C','D','E']
}
function getHValues(id) {
  const m = {
    'noi':          [28.4,14.2,11.8,10.9,9.1],
    'noi-precinct': [41,17,10,8],
    'inventory':    [4820,3740,2680,1920,1643],
    'land-bank':    [142,98,72,56,34,18],
  }
  return m[id] || [80,60,50,40,30]
}
function getPct(id) {
  const m = { 'preleasing': 71, 'lots-settled': 60, 'liquidity': 18 }
  return m[id] || 65
}
function getLineData(id) {
  const m = {
    'wale':       [5.2,5.1,5.0,4.9,4.9,4.8,4.8,4.8],
    'cap-rate':   [6.4,6.3,6.2,6.1,6.0,5.9,5.8,5.8],
    'dev-margin': [18.2,19.1,19.8,20.4,21.0,21.6,22.0,22.1],
    'aum':        [1.18,1.22,1.26,1.29,1.31,1.34,1.37,1.40],
    'sales-pace': [3.8,3.6,3.9,3.5,3.2,3.0,2.9,2.82],
  }
  return m[id] || [4,5,4.5,6,5.5,7,6.5,8]
}
function getLineDataLY(id) {
  const m = {
    'wale':       [5.4,5.3,5.2,5.1,5.1,5.0,5.0,4.9],
    'cap-rate':   [6.6,6.5,6.4,6.3,6.2,6.1,6.0,6.0],
    'dev-margin': [16.0,16.8,17.4,18.0,18.8,19.2,19.6,19.8],
    'aum':        [1.06,1.09,1.12,1.15,1.18,1.22,1.25,1.29],
    'sales-pace': [4.2,4.0,4.3,3.9,3.6,3.4,3.2,3.2],
  }
  return m[id] || [3,4,3.5,5,4.5,6,5.5,7]
}
function getLineLabels(id) {
  return ["Q1'23","Q2'23","Q3'23","Q4'23","Q1'24","Q2'24","Q3'24","Q4'24"]
}
function getStackA(id) { return id === 'total-return' ? 'Income' : id === 'allocation' ? 'RE' : 'This yr' }
function getStackB(id) { return id === 'total-return' ? 'Capital' : id === 'allocation' ? 'Other' : 'Last yr' }
function getStackX(id) {
  const m = {
    'total-return': ["Q1'23","Q2'23","Q3'23","Q4'23","Q1'24","Q2'24"],
    'leases':       ["Q1'23","Q2'23","Q3'23","Q4'23","Q1'24","Q2'24"],
    'allocation':   ["Q1'23","Q2'23","Q3'23","Q4'23","Q1'24","Q2'25"],
  }
  return m[id] || ["Q1","Q2","Q3","Q4","Q1'25","Q2'25"]
}
function getStackVA(id) {
  const m = {
    'total-return': [5.2,5.4,5.6,5.8,5.8,5.8],
    'leases':       [580,590,598,605,608,612],
    'allocation':   [58,58,58,58,58,58],
  }
  return m[id] || [5,5.2,5.4,5.6,5.8,5.8]
}
function getStackVB(id) {
  const m = {
    'total-return': [3.8,4.2,4.6,5.0,5.2,5.4],
    'leases':       [20,18,22,18,16,14],
    'allocation':   [42,42,42,42,42,42],
  }
  return m[id] || [4.0,4.2,4.4,4.6,4.8,5.0]
}
function getBTValues(id) {
  const m = {
    'irr':     [8.2,8.5,8.8,9.1,9.4,9.4],
    'returns': [9.8,10.2,10.8,11.2,11.5,11.8],
  }
  return m[id] || [8,8.4,8.8,9.2,9.6,9.8]
}
function getBTTarget(id) {
  const m = { 'irr': 8.8, 'returns': 9.2 }
  return m[id] || 9.0
}
function getBTLabels(id) {
  return ["Q3'23","Q4'23","Q1'24","Q2'24","Q3'24","YTD"]
}
