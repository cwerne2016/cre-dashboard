import { useParams } from 'react-router-dom'
import { AppHeader, PageShell, Breadcrumb } from '../components/Layout'
import { DrilldownTable } from '../components/DrilldownTable'
import { BUSINESS_UNITS, BU_BODY_KPIS, DRILLDOWN_ROWS } from '../data/stubs'

export default function KpiDrilldown() {
  const { slug, kpiId } = useParams()
  const bu       = BUSINESS_UNITS.find(b => b.slug === slug)
  const bodyKpis = BU_BODY_KPIS[slug] || []
  const kpi      = bodyKpis.find(k => k.id === kpiId)
  const rows     = DRILLDOWN_ROWS[kpiId] || DRILLDOWN_ROWS.default

  if (!bu || !kpi) {
    return <PageShell><div className="p-8 text-ink-tertiary">KPI not found.</div></PageShell>
  }

  return (
    <PageShell>
      <AppHeader title={`${kpi.label} — Detail`} centered />
      <div className="px-8 py-6">
        <Breadcrumb crumbs={[
          { label: 'Executive Dashboard', to: '/' },
          { label: bu.name, to: `/bu/${slug}` },
          { label: kpi.label },
        ]} />

        {/* KPI summary strip */}
        <div className="bg-surface border border-border rounded-lg px-6 py-4 mb-6 flex items-center gap-8 shadow-card">
          <div>
            <p className="text-xs text-ink-tertiary uppercase tracking-wide mb-1">{kpi.label}</p>
            <p className="font-display text-3xl font-semibold text-ink">{kpi.value}</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <p className="text-sm text-ink-secondary">{kpi.sub}</p>
          <div className="ml-auto">
            <div className="w-4 h-4 rounded-full shrink-0 mr-2 inline-block" style={{ background: bu.colorHex }} />
            <span className="text-sm font-medium text-ink">{bu.name}</span>
          </div>
        </div>

        <DrilldownTable rows={rows} kpiLabel={kpi.label} />
      </div>
    </PageShell>
  )
}
