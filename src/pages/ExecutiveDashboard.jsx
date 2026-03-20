import { AppHeader, PageShell, Breadcrumb } from '../components/Layout'
import { ExecKpiStrip } from '../components/ExecKpiStrip'
import { BuSection } from '../components/BuSection'

export default function ExecutiveDashboard() {
  return (
    <PageShell>
      <AppHeader title="RE Group — Executive Dashboard" centered />
      <div className="px-8 py-6">
        <Breadcrumb crumbs={[{ label: 'Executive Dashboard' }]} />
        <section className="mb-8">
          <ExecKpiStrip />
        </section>
        <div className="border-t border-border mb-8" />
        <BuSection />
      </div>
    </PageShell>
  )
}
