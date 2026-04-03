// ─── Shared tiny chart primitives (all SVG, no external lib) ─────────────────
// Power BI palette: #118DFF accent, #E0DDD9 track/bg

const W = 260
const H = 120
const BASE = H - 22

function ChartBase({ children, height = H }) {
  return (
    <div style={{ width: '100%', maxWidth: W, height }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="xMidYMid meet">
        <line x1="0" y1={height - 10} x2={W} y2={height - 10} stroke="#E0DDD9" strokeWidth="0.5" />
        {children}
      </svg>
    </div>
  )
}

export function GroupedBarChart({ color = '#118DFF', labels = [], thisYear = [], lastYear = [] }) {
  const max = Math.max(...thisYear, ...lastYear, 1)
  const n = labels.length
  const slotW = W / n
  const barW = Math.min(slotW * 0.28, 18)
  const gap = 3
  const maxH = BASE - 10

  return (
    <ChartBase>
      {labels.map((lbl, i) => {
        const cx = slotW * i + slotW / 2
        const lyH = (lastYear[i] / max) * maxH
        const tyH = (thisYear[i] / max) * maxH
        return (
          <g key={i}>
            <rect x={cx - barW - gap / 2} y={BASE - lyH} width={barW} height={lyH} rx="2" fill={color} opacity=".25" />
            <rect x={cx + gap / 2} y={BASE - tyH} width={barW} height={tyH} rx="2" fill={color} opacity=".8" />
            <text x={cx} y={H - 1} textAnchor="middle" fontSize="10" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{lbl}</text>
          </g>
        )
      })}
      <g>
        <rect x={W - 70} y={4} width={8} height={6} rx="1" fill={color} opacity=".25" />
        <text x={W - 59} y={9} fontSize="10" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif" dominantBaseline="central">Prior yr</text>
        <rect x={W - 28} y={4} width={8} height={6} rx="1" fill={color} opacity=".8" />
        <text x={W - 17} y={9} fontSize="10" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif" dominantBaseline="central">TY</text>
      </g>
    </ChartBase>
  )
}

export function HorizontalBarChart({ color = '#118DFF', labels = [], values = [], displayValues = [] }) {
  const max = Math.max(...values, 1)
  const n = labels.length
  const rowH = (H - 10) / n
  const maxW = W - 90

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: W }} preserveAspectRatio="xMidYMid meet">
      {labels.map((lbl, i) => {
        const y = i * rowH + rowH / 2
        const bw = (values[i] / max) * maxW
        const display = displayValues && displayValues[i] ? displayValues[i] : String(values[i])
        return (
          <g key={i}>
            <text x={82} y={y} textAnchor="end" fontSize="8" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif" dominantBaseline="central">{lbl}</text>
            {/* Track */}
            <rect x={88} y={y - 5} width={maxW} height={10} rx="2" fill="#E0DDD9" />
            {/* Fill */}
            <rect x={88} y={y - 5} width={bw} height={10} rx="2" fill={color} opacity={0.5 + 0.5 * (values[i] / max)} />
            <text x={92 + bw} y={y} fontSize="8" fill={color} fontFamily="'Segoe UI', system-ui, sans-serif" dominantBaseline="central" fontWeight="500">{display}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function ProgressBarChart({ color = '#118DFF', colorBg = '#E0DDD9', pct = 0, label = '', sublabel = '' }) {
  const filled = Math.min(pct, 100) / 100 * (W - 20)
  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: W }} preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="32" width={W - 20} height="14" rx="7" fill={colorBg} />
      <rect x="0" y="32" width={filled} height="14" rx="7" fill={color} opacity=".75" />
      <text x={filled + 4} y="42" fontSize="10" fill={color} fontFamily="'Segoe UI', system-ui, sans-serif" dominantBaseline="central" fontWeight="500">{pct}%</text>
      <text x="0" y="62" fontSize="9" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{label}</text>
      <text x="0" y="76" fontSize="9" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{sublabel}</text>
    </svg>
  )
}

export function LineChart({ color = '#118DFF', thisYear = [], lastYear = [], labels = [], fill = false }) {
  const all = [...thisYear, ...lastYear].filter(Boolean)
  const max = Math.max(...all, 1)
  const min = Math.min(...all, 0)
  const range = max - min || 1
  const n = thisYear.length
  const xStep = (W - 20) / (n - 1)
  const scaleY = (v) => BASE - ((v - min) / range) * (BASE - 15)

  const tyPoints = thisYear.map((v, i) => `${20 + i * xStep},${scaleY(v)}`).join(' ')
  const lyPoints = lastYear.length ? lastYear.map((v, i) => `${20 + i * xStep},${scaleY(v)}`).join(' ') : null
  const firstX = 20
  const lastX = 20 + (n - 1) * xStep
  const areaPoints = [
    `${firstX},${BASE}`,
    ...thisYear.map((v, i) => `${20 + i * xStep},${scaleY(v)}`),
    `${lastX},${BASE}`,
  ].join(' ')

  return (
    <ChartBase>
      {fill && <polygon points={areaPoints} fill={color} opacity="0.12" />}
      {lyPoints && <polyline points={lyPoints} fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="4 3" opacity=".4" strokeLinecap="round" strokeLinejoin="round" />}
      <polyline points={tyPoints} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {thisYear.map((v, i) => <circle key={i} cx={20 + i * xStep} cy={scaleY(v)} r={i === thisYear.length - 1 ? 3.5 : 2.5} fill={color} />)}
      {labels.map((lbl, i) => (
        <text key={i} x={20 + i * xStep} y={H - 1} textAnchor="middle" fontSize="10" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{lbl}</text>
      ))}
    </ChartBase>
  )
}

export function StackedBarChart({ colorA = '#118DFF', colorB = '#71C6FF', labelsA = 'Series A', labelsB = 'Series B', xLabels = [], valuesA = [], valuesB = [] }) {
  const maxes = valuesA.map((v, i) => v + valuesB[i])
  const max = Math.max(...maxes, 1)
  const n = xLabels.length
  const slotW = W / n
  const barW = Math.min(slotW * 0.5, 28)
  const maxH = BASE - 10

  return (
    <ChartBase>
      {xLabels.map((lbl, i) => {
        const cx = slotW * i + slotW / 2
        const hA = (valuesA[i] / max) * maxH
        const hB = (valuesB[i] / max) * maxH
        return (
          <g key={i}>
            <rect x={cx - barW / 2} y={BASE - hA - hB} width={barW} height={hB} rx="2" fill={colorB} opacity=".8" />
            <rect x={cx - barW / 2} y={BASE - hA} width={barW} height={hA} rx="0" fill={colorA} opacity=".8" />
            <text x={cx} y={H - 1} textAnchor="middle" fontSize="10" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{lbl}</text>
          </g>
        )
      })}
      <rect x={W - 100} y={4} width={8} height={6} rx="1" fill={colorA} opacity=".8" />
      <text x={W - 89} y={9} fontSize="10" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif" dominantBaseline="central">{labelsA}</text>
      <rect x={W - 42} y={4} width={8} height={6} rx="1" fill={colorB} opacity=".8" />
      <text x={W - 31} y={9} fontSize="10" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif" dominantBaseline="central">{labelsB}</text>
    </ChartBase>
  )
}

export function BarTargetChart({ color = '#118DFF', values = [], target = 0, labels = [] }) {
  const max = Math.max(...values, target, 1) * 1.15
  const n = labels.length
  const slotW = W / n
  const barW = Math.min(slotW * 0.5, 30)
  const maxH = BASE - 10
  const targetY = BASE - (target / max) * maxH

  return (
    <ChartBase>
      <line x1="0" y1={targetY} x2={W} y2={targetY} stroke="#A80000" strokeWidth="1.2" strokeDasharray="4 3" />
      <text x={W - 2} y={targetY - 4} textAnchor="end" fontSize="10" fill="#A80000" fontFamily="'Segoe UI', system-ui, sans-serif">target</text>
      {labels.map((lbl, i) => {
        const cx = slotW * i + slotW / 2
        const bh = (values[i] / max) * maxH
        const above = values[i] >= target
        return (
          <g key={i}>
            <rect x={cx - barW / 2} y={BASE - bh} width={barW} height={bh} rx="2" fill={color} opacity={above ? 0.8 : 0.5} />
            <text x={cx} y={H - 1} textAnchor="middle" fontSize="10" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{lbl}</text>
          </g>
        )
      })}
    </ChartBase>
  )
}

export function BulletChart({ color = '#118DFF', value = 0, max = 0, floor = 0, label = '' }) {
  const trackW = W - 20
  const floorX = (floor / max) * trackW
  const valueX = (value / max) * trackW

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: W }} preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="36" width={trackW} height="16" rx="8" fill="#E0DDD9" />
      <rect x="0" y="36" width={valueX} height="16" rx="8" fill={color} opacity=".75" />
      <line x1={floorX} y1="30" x2={floorX} y2="58" stroke="#A80000" strokeWidth="2" strokeLinecap="round" />
      <text x={floorX} y="66" textAnchor="middle" fontSize="8" fill="#A80000" fontFamily="'Segoe UI', system-ui, sans-serif">floor</text>
      <text x={valueX + 4} y="47" fontSize="9" fill={color} fontFamily="'Segoe UI', system-ui, sans-serif" dominantBaseline="central" fontWeight="500">{value}x</text>
      <text x="0" y="80" fontSize="9" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{label}</text>
    </svg>
  )
}

export function MiniDonutChart({ valueA, valueB, colorA = '#118DFF', colorB = '#E0DDD9', size = 60 }) {
  const total = valueA + valueB
  const fracA = total > 0 ? valueA / total : 0
  const r = (size / 2) * 0.62
  const cx = size / 2
  const cy = size / 2
  const sw = size * 0.22
  const circ = 2 * Math.PI * r

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background ring */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={colorB}
        strokeWidth={sw}
        strokeDasharray={`${circ} ${circ}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* Foreground segment */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={colorA}
        strokeWidth={sw}
        strokeDasharray={`${fracA * circ} ${circ}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* Center label */}
      <text
        x={cx} y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.18}
        fontWeight="700"
        fill="#252423"
        fontFamily="'Segoe UI', system-ui, sans-serif"
      >
        {Math.round(fracA * 100)}%
      </text>
    </svg>
  )
}

export function TrendExpandChart({ chartType = 'dual-line', color = '#118DFF' }) {
  const W2 = 560, H2 = 80
  const BASE2 = H2 - 12
  const qLabels = ["Q1'23","Q2'23","Q3'23","Q4'23","Q1'24","Q2'24","Q3'24","Q4'24"]
  const n = 8
  const xStep = (W2 - 40) / (n - 1)

  const svgProps = {
    width: '100%',
    height: H2,
    viewBox: `0 0 ${W2} ${H2}`,
    preserveAspectRatio: 'xMidYMid meet',
    style: { display: 'block' },
  }

  const wrap = (inner) => (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <svg {...svgProps}>{inner}</svg>
    </div>
  )

  if (chartType === 'grouped-bar') {
    const lyVals = [68, 72, 78, 74, 80, 76, 84, 82]
    const tyVals = [74, 78, 84, 80, 86, 84, 90, 94]
    const max = 100
    const maxH = BASE2 - 10
    const barW = 16, gap = 3
    return wrap(<>
      <line x1="0" y1={BASE2} x2={W2} y2={BASE2} stroke="#E0DDD9" strokeWidth="0.5"/>
      {lyVals.map((v,i) => {
        const cx = 20 + i * xStep
        const lyH = (v/max)*maxH, tyH = (tyVals[i]/max)*maxH
        return <g key={i}>
          <rect x={cx - barW - gap/2} y={BASE2-lyH} width={barW} height={lyH} rx="2" fill={color} opacity=".2"/>
          <rect x={cx + gap/2} y={BASE2-tyH} width={barW} height={tyH} rx="2" fill={color} opacity=".75"/>
          <text x={cx} y={H2-1} textAnchor="middle" fontSize="8" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{qLabels[i]}</text>
        </g>
      })}
    </>)
  }

  if (chartType === 'pos-neg-bar') {
    const vals = [68, 54, 72, -28, -42, 61, 66, -42]
    const max = 80
    const midY = H2 / 2
    const scaleH = (v) => Math.abs(v) / max * (midY - 8)
    const barW = 40
    return wrap(<>
      <line x1="0" y1={midY} x2={W2} y2={midY} stroke="#8A8886" strokeWidth="0.8" strokeDasharray="3 3"/>
      <line x1="0" y1={BASE2} x2={W2} y2={BASE2} stroke="#E0DDD9" strokeWidth="0.5"/>
      {vals.map((v,i) => {
        const cx = 20 + i * xStep
        const h = scaleH(v)
        const pos = v >= 0
        return <g key={i}>
          <rect x={cx - barW/2} y={pos ? midY-h : midY} width={barW} height={h} rx="2" fill={pos ? '#107C10' : '#A80000'} opacity=".7"/>
          <text x={cx} y={pos ? midY-h-3 : midY+h+9} textAnchor="middle" fontSize="8" fill={pos ? '#107C10' : '#A80000'} fontFamily="'Segoe UI', system-ui, sans-serif" fontWeight="500">{v>0?'+':''}{v}</text>
          <text x={cx} y={H2-1} textAnchor="middle" fontSize="8" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{qLabels[i]}</text>
        </g>
      })}
    </>)
  }

  if (chartType === 'dual-area') {
    const assoc = [740,762,778,792,804,818,830,842]
    const contr = [190,194,198,202,204,208,211,214]
    const max = 880, minV = 160
    const scale = (v) => BASE2 - ((v-minV)/(max-minV))*(BASE2-10)
    const aPoints = assoc.map((v,i)=>`${20+i*xStep},${scale(v)}`).join(' ')
    const cPoints = contr.map((v,i)=>`${20+i*xStep},${scale(v)}`).join(' ')
    return wrap(<>
      <line x1="0" y1={BASE2} x2={W2} y2={BASE2} stroke="#E0DDD9" strokeWidth="0.5"/>
      <polyline points={cPoints} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" opacity=".5" strokeLinecap="round"/>
      <polyline points={aPoints} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {assoc.map((v,i)=><circle key={i} cx={20+i*xStep} cy={scale(v)} r={i===7?3.5:2} fill={color}/>)}
      {qLabels.map((lbl,i)=><text key={i} x={20+i*xStep} y={H2-1} textAnchor="middle" fontSize="8" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{lbl}</text>)}
    </>)
  }

  // default dual-line
  const ly = [78, 74, 72, 70, 68, 65, 63, 60]
  const ty = [74, 69, 65, 61, 57, 52, 47, 42]
  const min2 = 35, max2 = 85
  const sc = (v) => BASE2 - ((v-min2)/(max2-min2))*(BASE2-10)
  const lyPts = ly.map((v,i)=>`${20+i*xStep},${sc(v)}`).join(' ')
  const tyPts = ty.map((v,i)=>`${20+i*xStep},${sc(v)}`).join(' ')
  return wrap(<>
    <line x1="0" y1={BASE2} x2={W2} y2={BASE2} stroke="#E0DDD9" strokeWidth="0.5"/>
    <polyline points={lyPts} fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="4 3" opacity=".4" strokeLinecap="round"/>
    <polyline points={tyPts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    {ty.map((v,i)=><circle key={i} cx={20+i*xStep} cy={sc(v)} r={i===7?3.5:2} fill={color}/>)}
    {qLabels.map((lbl,i)=><text key={i} x={20+i*xStep} y={H2-1} textAnchor="middle" fontSize="8" fill="#8A8886" fontFamily="'Segoe UI', system-ui, sans-serif">{lbl}</text>)}
  </>)
}
