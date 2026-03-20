function StatusBadge({ status }) {
  const map = { 'On track': 'badge-positive', 'Watch': 'badge-neutral', 'At risk': 'badge-negative' }
  return <span className={`badge ${map[status] || 'badge-neutral'}`}>{status}</span>
}

export function DrilldownTable({ rows, kpiLabel }) {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-card">
      <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-ink">{kpiLabel} — Property Detail</h3>
          <p className="text-xs text-ink-tertiary mt-0.5">{rows.length} properties</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="text" placeholder="Filter..." className="text-xs border border-border rounded px-2.5 py-1.5 bg-canvas w-36 focus:outline-none focus:ring-1 focus:ring-brand/30 placeholder:text-muted" />
          <select className="text-xs border border-border rounded px-2 py-1.5 bg-canvas text-ink focus:outline-none focus:ring-1 focus:ring-brand/30">
            <option>All types</option><option>Office</option><option>Retail</option><option>Industrial</option><option>Mixed</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Property</th><th>Type</th><th>Region</th>
              <th className="text-right">Value (NOI)</th>
              <th className="text-right">Occupancy</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="font-medium text-ink">{row.property}</td>
                <td>{row.type}</td>
                <td>{row.region}</td>
                <td className="text-right font-mono text-xs">{row.value}</td>
                <td className="text-right font-mono text-xs">{row.occupancy}</td>
                <td><StatusBadge status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-border bg-canvas flex items-center justify-between">
        <p className="text-xs text-ink-tertiary">Showing {rows.length} of {rows.length} properties</p>
        <button className="text-xs text-brand hover:underline">Export CSV</button>
      </div>
    </div>
  )
}
