import { Link, useLocation } from 'react-router-dom'
import { BUSINESS_UNITS } from '../data/stubs'

const BU_DOT = {
  blue: 'bg-blue-400', teal: 'bg-teal-400', amber: 'bg-amber-400',
  green: 'bg-green-400', purple: 'bg-purple-400', pink: 'bg-pink-400',
}

export function AppHeader({ title, centered = false }) {
  return (
    <header className="bg-surface border-b border-border px-8 py-0 flex items-center" style={{ minHeight: 52 }}>
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-6 h-6 bg-brand rounded flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity=".9"/>
            <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity=".6"/>
            <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity=".6"/>
            <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity=".3"/>
          </svg>
        </div>
        <span className="font-display text-md text-ink tracking-tight">RE Group</span>
      </div>
      {centered
        ? <h1 className="flex-1 text-center text-md font-medium text-ink">{title}</h1>
        : <div className="h-4 w-px bg-border mx-4" />
      }
      {!centered && <h1 className="text-md font-medium text-ink flex-1">{title}</h1>}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-full bg-brand-subtle border border-brand/20 flex items-center justify-center text-xs font-medium text-brand">JD</div>
      </div>
    </header>
  )
}

export function Sidebar() {
  const location = useLocation()
  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <aside className="w-48 shrink-0 bg-surface border-r border-border flex flex-col py-4 px-2.5">
      <nav className="flex flex-col gap-0.5">
        <p className="text-2xs font-medium text-ink-tertiary uppercase tracking-widest px-3 mb-2">Dashboards</p>
        <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <rect x="1" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <rect x="7.5" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <rect x="1" y="7.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          Executive
        </Link>
        <p className="text-2xs font-medium text-ink-tertiary uppercase tracking-widest px-3 mt-3 mb-2">Business Units</p>
        {BUSINESS_UNITS.map((bu) => (
          <Link key={bu.id} to={`/bu/${bu.slug}`} className={`nav-item ${isActive(`/bu/${bu.slug}`) ? 'active' : ''}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${BU_DOT[bu.color]}`} />
            <span className="truncate text-xs">{bu.name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-3 border-t border-border px-3">
        <p className="text-2xs text-ink-tertiary">Data as of today</p>
      </div>
    </aside>
  )
}

export function Breadcrumb({ crumbs }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-ink-tertiary mb-5">
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-border">/</span>}
          {c.to
            ? <Link to={c.to} className="hover:text-brand transition-colors">{c.label}</Link>
            : <span className="text-ink-secondary font-medium">{c.label}</span>
          }
        </span>
      ))}
    </nav>
  )
}

export function PageShell({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
