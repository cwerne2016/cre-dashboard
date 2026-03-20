import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ExecutiveDashboard from './pages/ExecutiveDashboard'
import BuDashboard        from './pages/BuDashboard'
import KpiDrilldown       from './pages/KpiDrilldown'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                        element={<ExecutiveDashboard />} />
        <Route path="/bu/:slug"                element={<BuDashboard />} />
        <Route path="/bu/:slug/kpi/:kpiId"     element={<KpiDrilldown />} />
        <Route path="*"                        element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
