import { Link, useLocation } from 'react-router-dom'

export function AppHeader() {
  return (
    <header
      className="shrink-0"
      style={{ background: '#252423', height: 80, display: 'flex', alignItems: 'center', padding: '0 20px', position: 'relative' }}
    >
      {/* Left: icon */}
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
        <svg width="26" height="26" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="6" height="7" rx="1" fill="#118DFF" opacity="0.9" />
          <rect x="9" y="1" width="8" height="4" rx="1" fill="#118DFF" opacity="0.6" />
          <rect x="9" y="7" width="8" height="10" rx="1" fill="#118DFF" opacity="0.8" />
          <rect x="1" y="10" width="6" height="7" rx="1" fill="#118DFF" opacity="0.5" />
        </svg>
      </div>

      {/* Center: brand — absolutely centered */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#FFFFFF', fontSize: 38, fontWeight: 700, letterSpacing: '0.01em', lineHeight: 1 }}>
          RE Group
        </span>
      </div>

      {/* Right: user info */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, zIndex: 1 }}>
        <span style={{ color: '#C8C6C4', fontSize: 13 }}>Connor Wernecke</span>
        <div
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#3B3A39', color: '#C8C6C4',
            border: '1px solid #605E5C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600,
          }}
        >
          CW
        </div>
      </div>
    </header>
  )
}

export function TabBar() {
  const location = useLocation()

  const tabs = [
    { label: 'Executive', to: '/' },
    { label: 'Business Units', to: '/bu' },
  ]

  return (
    <nav
      className="shrink-0"
      style={{
        background: '#DDD9D4',
        height: 76,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 20px',
        gap: 6,
        borderBottom: '2px solid #C8C6C4',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.to === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(tab.to)
        return (
          <Link
            key={tab.to}
            to={tab.to}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              height: isActive ? 66 : 60,
              padding: '0 28px',
              fontSize: 29,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#1B3A5C' : '#605E5C',
              textDecoration: 'none',
              background: isActive ? '#FFFFFF' : '#ECEAE7',
              border: '1.5px solid #C8C6C4',
              borderBottom: isActive ? '2px solid #FFFFFF' : '1.5px solid #C8C6C4',
              borderRadius: '6px 6px 0 0',
              marginBottom: isActive ? -2 : 0,
              boxShadow: isActive ? '0 -2px 8px rgba(0,0,0,0.10)' : 'none',
              transition: 'background 0.12s, color 0.12s, box-shadow 0.12s',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            {/* Tab icon */}
            {isActive ? (
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <rect x="1" y="1" width="5" height="6" rx="1" fill="#118DFF" opacity="0.9" />
                <rect x="8" y="1" width="7" height="3" rx="1" fill="#118DFF" opacity="0.6" />
                <rect x="8" y="6" width="7" height="9" rx="1" fill="#118DFF" opacity="0.8" />
                <rect x="1" y="9" width="5" height="6" rx="1" fill="#118DFF" opacity="0.5" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.45 }}>
                <rect x="1" y="1" width="5" height="6" rx="1" fill="#605E5C" />
                <rect x="8" y="1" width="7" height="3" rx="1" fill="#605E5C" />
                <rect x="8" y="6" width="7" height="9" rx="1" fill="#605E5C" />
                <rect x="1" y="9" width="5" height="6" rx="1" fill="#605E5C" />
              </svg>
            )}
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
