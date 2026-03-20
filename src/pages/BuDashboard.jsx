import { useParams } from 'react-router-dom'
import { AppHeader, PageShell, Breadcrumb } from '../components/Layout'
import { ExecKpiStrip } from '../components/ExecKpiStrip'
import { BuBodyKpis } from '../components/BuBodyKpis'
import { BUSINESS_UNITS, BU_HEADER_KPIS } from '../data/stubs'

export default function BuDashboard() {
  const { slug } = useParams()
  const bu = BUSINESS_UNITS.find(b => b.slug === slug)

  if (!bu) {
    return (
      <PageShell>
        <div className="p-8 text-ink-tertiary">Business unit not found.</div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <AppHeader title={`${bu.name} — Dashboard`} centered />
      <div className="px-8 py-6">
        <Breadcrumb crumbs={[
          { label: 'Executive Dashboard', to: '/' },
          { label: bu.name },
        ]} />

        {/* Color accent bar */}
        <div className="h-1 w-14 rounded-full mb-6" style={{ background: bu.colorHex }} />

        {/* Header KPI strip — same structure as exec, scoped to BU */}
        <section className="mb-8">
          <ExecKpiStrip compact buSlug={slug} subBuLabel={bu.name} />
        </section>

        <div className="border-t border-border mb-8" />

        {/* BU body KPIs */}
        <BuBodyKpis slug={slug} bu={bu} />
      </div>
    </PageShell>
  )
}
