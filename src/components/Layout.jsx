import { Link, useLocation } from 'react-router-dom'

// Power BI-style dark header
export function AppHeader() {
  return (
    <header
      className="shrink-0 flex items-center justify-between px-4"
      style={{ background: '#252423', height: 48 }}
    >
      {/* Left: icon + brand name */}
      <div className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="6" height="7" rx="1" fill="#118DFF" opacity="0.9" />
          <rect x="9" y="1" width="8" height="4" rx="1" fill="#118DFF" opacity="0.6" />
          <rect x="9" y="7" width="8" height="10" rx="1" fill="#118DFF" opacity="0.8" />
          <rect x="1" y="10" width="6" height="7" rx="1" fill="#118DFF" opacity="0.5" />
        </svg>
        <span style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 600, letterSpacing: '0.01em' }}>
          RE Group
        </span>
      </div>

      {/* Right: user info */}
      <div className="flex items-center gap-2">
        <span style={{ color: '#C8C6C4', fontSize: 13 }}>Connor Wernecke</span>
        <div
          className="flex items-center justify-center text-xs font-semibold"
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#3B3A39',
            color: '#C8C6C4',
            border: '1px solid #605E5C',
          }}
        >
          CW
        </div>
      </div>
    </header>
  )
}

// Power BI-style tab bar
export function TabBar() {
  const location = useLocation()

  const tabs = [
    { label: 'Executive', to: '/' },
    { label: 'Business Units', to: '/bu' },
  ]

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <nav
      className="shrink-0 flex items-end px-4"
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E0DDD9',
        height: 40,
      }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.to)
        return (
          <Link
            key={tab.to}
            to={tab.to}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '100%',
              padding: '0 16px',
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              color: active ? '#252423' : '#605E5C',
              textDecoration: 'none',
              borderBottom: active ? '2px solid #118DFF' : '2px solid transparent',
              transition: 'color 0.1s, border-color 0.1s',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}

// Main page shell — header + tab bar + content
export function PageShell({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <TabBar />
      <main className="flex-1 overflow-auto" style={{ background: '#F3F2F1' }}>
        {children}
      </main>
    </div>
  )
}
