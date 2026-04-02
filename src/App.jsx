import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ExecutiveDashboard from './pages/ExecutiveDashboard'
import BuDashboard        from './pages/BuDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                        element={<ExecutiveDashboard />} />
        <Route path="/bu"                      element={<BuDashboard />} />
        {/* Legacy routes — redirect so nothing breaks */}
        <Route path="/bu/:slug"                element={<Navigate to="/bu" replace />} />
        <Route path="/bu/:slug/kpi/:kpiId"     element={<Navigate to="/bu" replace />} />
        <Route path="*"                        element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
