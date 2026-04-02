import { Navigate } from 'react-router-dom'

// Legacy page — routes redirect to /bu before reaching this component.
// Kept as a fallback redirect in case anything links here directly.
export default function KpiDrilldown() {
  return <Navigate to="/bu" replace />
}
