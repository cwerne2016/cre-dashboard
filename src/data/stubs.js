// ─── Business Units ───────────────────────────────────────────────────────────
export const BUSINESS_UNITS = [
  {
    id: 're-properties', slug: 're-properties', name: 'RE Properties',
    description: 'Core commercial property portfolio', color: 'blue',
    colorHex: '#378ADD', colorBg: '#E6F1FB', colorDark: '#0C447C',
    rag: 'on-track',
    headline: 'Occupancy 94.2%',
    sparkPoints: '0,16 8,12 16,13 24,8 32,9 40,5 48,3',
    kpiSummary: { aum: '$2.4B', noi: '$142M', occupancy: '94.2%', yoy: '+3.1%' },
  },
  {
    id: 're-urban', slug: 're-urban', name: 'RE Urban',
    description: 'Urban mixed-use developments', color: 'teal',
    colorHex: '#1D9E75', colorBg: '#E1F5EE', colorDark: '#085041',
    rag: 'watch',
    headline: 'Pre-leasing 71%',
    sparkPoints: '0,12 8,10 16,13 24,9 32,13 40,11 48,14',
    kpiSummary: { aum: '$1.1B', noi: '$68M', occupancy: '91.7%', yoy: '+5.4%' },
  },
  {
    id: 're-investment-properties', slug: 're-investment-properties', name: 'RE Investment Properties',
    description: 'Investment-grade asset acquisitions', color: 'amber',
    colorHex: '#BA7517', colorBg: '#FAEEDA', colorDark: '#633806',
    rag: 'on-track',
    headline: 'IRR 9.4% vs 8.8%',
    sparkPoints: '0,16 8,14 16,13 24,14 32,11 40,12 48,9',
    kpiSummary: { aum: '$3.8B', noi: '$231M', occupancy: '97.1%', yoy: '+1.9%' },
  },
  {
    id: 're-communities', slug: 're-communities', name: 'RE Communities',
    description: 'Residential community developments', color: 'green',
    colorHex: '#639922', colorBg: '#EAF3DE', colorDark: '#27500A',
    rag: 'watch',
    headline: 'Rental growth +6.8%',
    sparkPoints: '0,18 8,14 16,16 24,11 32,13 40,8 48,6',
    kpiSummary: { aum: '$890M', noi: '$52M', occupancy: '88.3%', yoy: '+7.2%' },
  },
  {
    id: 're-regional-development', slug: 're-regional-development', name: 'RE Regional Development',
    description: 'Regional land & development pipeline', color: 'purple',
    colorHex: '#7F77DD', colorBg: '#EEEDFE', colorDark: '#3C3489',
    rag: 'on-track',
    headline: 'Dev margin 22.1%',
    sparkPoints: '0,20 8,16 16,17 24,12 32,8 40,5 48,2',
    kpiSummary: { aum: '$670M', noi: '$28M', occupancy: '—', yoy: '+12.1%' },
  },
  {
    id: 'family-office', slug: 'family-office', name: 'Family Office',
    description: 'Private wealth & investment management', color: 'pink',
    colorHex: '#D4537E', colorBg: '#FBEAF0', colorDark: '#72243E',
    rag: 'on-track',
    headline: 'Return 11.8% vs 9.2%',
    sparkPoints: '0,14 8,11 16,12 24,8 32,6 40,4 48,2',
    kpiSummary: { aum: '$1.4B', noi: '$94M', occupancy: '—', yoy: '+8.6%' },
  },
]

// ─── Executive KPI groups ─────────────────────────────────────────────────────
export const EXEC_KPIS = [
  {
    id: 'balance-sheet', label: 'Balance Sheet', linkLabel: 'Total Assets',
    primary: '$8.86B', sub: 'Total assets', change: '+4.2%', trend: 'up',
    chartType: 'grouped-bar',
    expand: {
      title: 'Total Assets — trend & detail',
      meta: 'Last 8 quarters · vs prior year',
      stats: [
        { label: 'Current',    value: '$8.86B',  note: 'YTD FY2025' },
        { label: 'Prior year', value: '$8.50B',  note: 'FY2024' },
        { label: 'YoY change', value: '+$360M',  note: '+4.2%', positive: true },
        { label: '8Q CAGR',    value: '3.8%',    note: 'Steady growth' },
      ],
    },
  },
  {
    id: 'income-statement', label: 'Income Statement', linkLabel: 'Net Income',
    primary: '$521M', sub: 'Net income', change: '+3.8%', trend: 'up',
    secondary: { label: 'Margin', value: '18.4%', note: '+0.6pp YoY' },
    chartType: 'dual-line',
    expand: {
      title: 'Net Income — trend & detail',
      meta: 'Last 8 quarters · vs prior year',
      stats: [
        { label: 'Net income',  value: '$521M',  note: 'YTD FY2025' },
        { label: 'Margin',      value: '18.4%',  note: '+0.6pp YoY' },
        { label: 'YoY change',  value: '+$19M',  note: '+3.8%', positive: true },
        { label: 'Best quarter',value: 'Q4\'24', note: '$148M' },
      ],
    },
  },
  {
    id: 'cash-flow', label: 'Cash Flow', linkLabel: 'Change in Cash',
    primary: '$(42M)', sub: 'Change in cash', change: '-8.2%', trend: 'down',
    negative: true,
    chartType: 'pos-neg-bar',
    expand: {
      title: 'Cash Flow — trend & detail',
      meta: 'Last 8 quarters · quarterly waterfall',
      stats: [
        { label: 'Change in cash', value: '$(42M)', note: 'YTD FY2025', negative: true },
        { label: 'Of beg. cash',   value: '-8.2%',  note: 'Watch threshold', negative: true },
        { label: 'Best quarter',   value: 'Q3\'23', note: '+$72M' },
        { label: 'Positive qtrs',  value: '5 / 8',  note: 'Last 2 negative' },
      ],
    },
  },
  {
    id: 'talent', label: 'Talent', linkLabel: 'Our Team',
    primary: '842', sub: 'Associates', change: '+34', trend: 'up',
    secondary: { label: 'Contractors', value: '214', note: '+12 YoY' },
    chartType: 'dual-area',
    expand: {
      title: 'Our Team — headcount trend',
      meta: 'Last 8 quarters · associates & contractors',
      stats: [
        { label: 'Associates',    value: '842',   note: '+34 YoY' },
        { label: 'Contractors',   value: '214',   note: '+12 YoY' },
        { label: 'Total',         value: '1,056', note: 'FY2025 YTD' },
        { label: '8Q growth',     value: '+14.2%',note: 'Associates', positive: true },
      ],
    },
  },
]

// ─── BU header KPIs (mirrors exec, scoped) ────────────────────────────────────
export const BU_HEADER_KPIS = {
  're-properties': [
    { id: 'bs', label: 'Balance Sheet', primary: '$2.4B',   sub: 'Total assets',  change: '+2.8%', trend: 'up' },
    { id: 'is', label: 'Income Statement', primary: '$142M', sub: 'Net income',   change: '+3.1%', trend: 'up', secondary: { label: 'Margin', value: '59.2%', note: '+1.1pp' } },
    { id: 'cf', label: 'Cash Flow',  primary: '$18M',  sub: 'Change in cash', change: '+2.4%', trend: 'up' },
    { id: 'tm', label: 'Talent',     primary: '186',   sub: 'Associates',     change: '+12',   trend: 'up', secondary: { label: 'Contractors', value: '44', note: '+3 YoY' } },
  ],
  're-urban': [
    { id: 'bs', label: 'Balance Sheet', primary: '$1.1B',  sub: 'Total assets', change: '+5.4%', trend: 'up' },
    { id: 'is', label: 'Income Statement', primary: '$68M', sub: 'Net income',  change: '+5.4%', trend: 'up', secondary: { label: 'Margin', value: '61.8%', note: '+0.8pp' } },
    { id: 'cf', label: 'Cash Flow',  primary: '$(6M)',  sub: 'Change in cash', change: '-2.1%', trend: 'down', negative: true },
    { id: 'tm', label: 'Talent',     primary: '94',    sub: 'Associates',     change: '+6',    trend: 'up', secondary: { label: 'Contractors', value: '28', note: '+4 YoY' } },
  ],
  're-investment-properties': [
    { id: 'bs', label: 'Balance Sheet', primary: '$3.8B',  sub: 'Total assets', change: '+1.9%', trend: 'up' },
    { id: 'is', label: 'Income Statement', primary: '$231M', sub: 'Net income', change: '+1.9%', trend: 'up', secondary: { label: 'Margin', value: '60.8%', note: '+0.3pp' } },
    { id: 'cf', label: 'Cash Flow',  primary: '$31M',  sub: 'Change in cash', change: '+4.1%', trend: 'up' },
    { id: 'tm', label: 'Talent',     primary: '142',   sub: 'Associates',     change: '+8',    trend: 'up', secondary: { label: 'Contractors', value: '36', note: '+2 YoY' } },
  ],
  're-communities': [
    { id: 'bs', label: 'Balance Sheet', primary: '$890M', sub: 'Total assets',  change: '+7.2%', trend: 'up' },
    { id: 'is', label: 'Income Statement', primary: '$52M', sub: 'Net income',  change: '+7.2%', trend: 'up', secondary: { label: 'Margin', value: '58.4%', note: '+0.6pp' } },
    { id: 'cf', label: 'Cash Flow',  primary: '$(4M)', sub: 'Change in cash', change: '-3.1%', trend: 'down', negative: true },
    { id: 'tm', label: 'Talent',     primary: '124',   sub: 'Associates',     change: '+8',    trend: 'up', secondary: { label: 'Contractors', value: '31', note: '+2 YoY' } },
  ],
  're-regional-development': [
    { id: 'bs', label: 'Balance Sheet', primary: '$670M', sub: 'Total assets',  change: '+12.1%', trend: 'up' },
    { id: 'is', label: 'Income Statement', primary: '$28M', sub: 'Net income',  change: '+12.1%', trend: 'up', secondary: { label: 'Margin', value: '22.1%', note: '+2.4pp' } },
    { id: 'cf', label: 'Cash Flow',  primary: '$9M',   sub: 'Change in cash', change: '+6.2%', trend: 'up' },
    { id: 'tm', label: 'Talent',     primary: '68',    sub: 'Associates',     change: '+5',    trend: 'up', secondary: { label: 'Contractors', value: '22', note: '+3 YoY' } },
  ],
  'family-office': [
    { id: 'bs', label: 'Balance Sheet', primary: '$1.4B',  sub: 'Portfolio AUM', change: '+8.6%', trend: 'up' },
    { id: 'is', label: 'Income Statement', primary: '$94M', sub: 'Net income',   change: '+8.6%', trend: 'up', secondary: { label: 'Return', value: '11.8%', note: 'vs 9.2% bmk' } },
    { id: 'cf', label: 'Cash Flow',  primary: '$22M',  sub: 'Net new capital', change: '+14.2%', trend: 'up' },
    { id: 'tm', label: 'Talent',     primary: '38',    sub: 'Associates',      change: '+4',    trend: 'up', secondary: { label: 'Contractors', value: '12', note: '+1 YoY' } },
  ],
}

// ─── BU body KPIs ─────────────────────────────────────────────────────────────
export const BU_BODY_KPIS = {
  're-properties': [
    { id: 'occupancy',   label: 'Occupancy Rate',  value: '94.2%',   sub: 'Across all assets',    chartType: 'grouped-bar' },
    { id: 'noi',         label: 'NOI',             value: '$142M',   sub: 'Top 3 = 61% of total', chartType: 'horizontal-bar' },
    { id: 'leases',      label: 'Active Leases',   value: '612',     sub: '42 expiring (12mo)',   chartType: 'stacked-bar' },
    { id: 'wale',        label: 'WALE',            value: '4.8 yrs', sub: '-0.1 vs prior year',   chartType: 'line' },
  ],
  're-urban': [
    { id: 'preleasing',  label: 'Pre-leasing %',   value: '71%',     sub: '3 developments active', chartType: 'progress' },
    { id: 'noi-precinct',label: 'NOI by Precinct', value: '$68M',    sub: 'CBD Core leads $41M',   chartType: 'horizontal-bar' },
    { id: 'developments',label: 'Active Devs',     value: '3',       sub: '2 pending planning',    chartType: 'grouped-bar' },
    { id: 'mixed-use',   label: 'Mixed-Use Split', value: '64/36',   sub: 'Commercial/Residential',chartType: 'grouped-bar' },
  ],
  're-investment-properties': [
    { id: 'irr',         label: 'Portfolio IRR',   value: '9.4%',    sub: 'vs 8.8% benchmark',    chartType: 'bar-target' },
    { id: 'cap-rate',    label: 'Avg Cap Rate',    value: '5.8%',    sub: '-20bps YoY compression',chartType: 'line' },
    { id: 'total-return',label: 'Total Return',    value: '11.2%',   sub: 'Income 5.8% + Cap 5.4%',chartType: 'stacked-bar' },
    { id: 'dscr',        label: 'DSCR',            value: '1.84x',   sub: 'vs 1.25x covenant',    chartType: 'bullet' },
  ],
  're-communities': [
    { id: 'home-sales',  label: 'YTD Home Sales',  value: '204',     sub: 'LYTD: 273',            chartType: 'grouped-bar' },
    { id: 'avg-price',   label: 'Avg Sales Price', value: '$554K',   sub: 'LYTD: $565K',          chartType: 'bar' },
    { id: 'inventory',   label: 'Total Homes',     value: '14,803',  sub: 'Across all communities',chartType: 'horizontal-bar' },
    { id: 'sales-pace',  label: 'Sales Pace',      value: '2.82',    sub: 'vs 3.79 last year',    chartType: 'dual-line' },
  ],
  're-regional-development': [
    { id: 'land-bank',   label: 'Land Bank Value', value: '$420M',   sub: '8,400 ha · 6 regions', chartType: 'horizontal-bar' },
    { id: 'lots-settled',label: 'Lots Settled YTD',value: '680',     sub: 'Target 1,140',         chartType: 'progress' },
    { id: 'dev-margin',  label: 'Dev Margin',      value: '22.1%',   sub: 'vs 18% target',        chartType: 'line' },
    { id: 'starts',      label: 'Construction Starts', value: '214', sub: 'Target 380 FY',        chartType: 'grouped-bar' },
  ],
  'family-office': [
    { id: 'aum',         label: 'Portfolio AUM',   value: '$1.4B',   sub: '+8.6% YoY',            chartType: 'line' },
    { id: 'allocation',  label: 'Asset Allocation',value: '4 classes',sub: 'RE 58% · Eq 22% · FI 12% · Alt 8%', chartType: 'stacked-bar' },
    { id: 'returns',     label: 'Investment Return',value: '11.8%',  sub: 'vs 9.2% benchmark',    chartType: 'bar-target' },
    { id: 'liquidity',   label: 'Liquidity Ratio', value: '18.4%',   sub: 'vs 15% policy floor',  chartType: 'progress' },
  ],
}

// ─── BU body KPI expand stats ─────────────────────────────────────────────────
export const BU_KPI_EXPAND = {
  // RE Properties
  'occupancy':    { title: 'Occupancy Rate — trend & detail', stats: [['Rate','94.2%','Current'],['Prior year','93.9%','FY2024'],['YoY','+ 0.3pp','Improving'],['Target','95.0%','FY2025']] },
  'noi':          { title: 'NOI — trend & detail',            stats: [['NOI','$142M','YTD FY2025'],['Prior year','$138M','FY2024'],['YoY change','+$4M','+3.1%'],['Top asset','150 Collins','$28.4M']] },
  'leases':       { title: 'Active Leases — detail',          stats: [['Active','612','Current'],['Expiring 12mo','42','Leases'],['In renewal','68%','29 of 42'],['New signed YTD','18','leases']] },
  'wale':         { title: 'WALE — trend & detail',           stats: [['WALE','4.8 yrs','Current'],['Prior year','4.9 yrs','FY2024'],['YoY','-0.1 yrs','Slight decline'],['Portfolio target','5.0 yrs','FY2025']] },
  // RE Urban
  'preleasing':   { title: 'Pre-leasing — commitment detail', stats: [['Committed','71%','3 active devs'],['By value','$48M','of $68M pipeline'],['Best dev','CBD Tower','88% committed'],['Target','80%','by completion']] },
  'noi-precinct': { title: 'NOI by Precinct — detail',        stats: [['Total NOI','$68M','YTD FY2025'],['CBD Core','$41M','60% of total'],['Inner East','$17M','25% of total'],['Outer','$10M','15% of total']] },
  'developments': { title: 'Active Developments — detail',    stats: [['Active','3','Under construction'],['Pending','2','Planning approval'],['Pipeline value','$620M','Total GDV'],['Avg completion','18 mo','Est. delivery']] },
  'mixed-use':    { title: 'Mixed-Use Split — detail',        stats: [['Commercial','64%','Of revenue'],['Residential','36%','Of revenue'],['Commercial NOI','$43M','YTD'],['Resi NOI','$25M','YTD']] },
  // RE Investment
  'irr':          { title: 'Portfolio IRR — trend & detail',  stats: [['IRR','9.4%','Current'],['Benchmark','8.8%','Target'],['Outperformance','+0.6pp','Above benchmark'],['3yr avg','8.9%','Rolling']] },
  'cap-rate':     { title: 'Cap Rate — compression trend',    stats: [['Cap rate','5.8%','Current'],['Prior year','6.0%','FY2024'],['Compression','-20bps','YoY'],['Market avg','5.5%','CBD office']] },
  'total-return': { title: 'Total Return — income vs capital',stats: [['Total return','11.2%','1yr'],['Income return','5.8%','Yield'],['Capital growth','5.4%','Appreciation'],['Benchmark','9.6%','Index']] },
  'dscr':         { title: 'DSCR — covenant compliance',      stats: [['DSCR','1.84x','Current'],['Covenant floor','1.25x','Minimum'],['Headroom','0.59x','Buffer'],['Lowest asset','1.42x','Still compliant']] },
  // RE Communities
  'home-sales':   { title: 'YTD Home Sales — trend & detail', stats: [['YTD sales','204','FY2025'],['LYTD sales','273','FY2024'],['YoY change','-69','-25.3%'],['Best quarter','Q3\'24','84 sales']] },
  'avg-price':    { title: 'Avg Sales Price — trend',         stats: [['YTD avg','$554K','FY2025'],['LYTD avg','$565K','FY2024'],['YoY change','-$11K','-1.9%'],['Peak quarter','Q2\'24','$581K']] },
  'inventory':    { title: 'Inventory — community breakdown',  stats: [['Total','14,803','Homes'],['Largest','Landmark','4,820 units'],['Smallest','Wolf Ranch','1,643 units'],['QoQ change','+142','New additions']] },
  'sales-pace':   { title: 'Sales Pace — TY vs LY',           stats: [['TY pace','2.82','/month'],['LY pace','3.79','/month'],['YoY change','-0.97','-25.6%'],['Peak month','Apr\'24','4.21']] },
  // RE Regional
  'land-bank':    { title: 'Land Bank — regional breakdown',  stats: [['Total value','$420M','8,400 ha'],['Regions','6','Active'],['Largest','South West','$142M'],['Avg $/ha','$50K','Blended']] },
  'lots-settled': { title: 'Lots Settled — vs target',        stats: [['Settled YTD','680','Lots'],['FY target','1,140','Lots'],['Progress','60%','On track'],['Releasing H2','840','Planned']] },
  'dev-margin':   { title: 'Development Margin — trend',      stats: [['Margin','22.1%','Current'],['Target','18.0%','FY2025'],['Outperformance','+4.1pp','Above target'],['Prior year','19.8%','FY2024']] },
  'starts':       { title: 'Construction Starts — detail',    stats: [['YTD starts','214','FY2025'],['FY target','380','Full year'],['Progress','56%','On track'],['Largest region','South West','84 starts']] },
  // Family Office
  'aum':          { title: 'Portfolio AUM — growth trend',    stats: [['AUM','$1.4B','Current'],['Prior year','$1.29B','FY2024'],['YoY growth','+$110M','+8.6%'],['5yr CAGR','11.2%','Since inception']] },
  'allocation':   { title: 'Asset Allocation — breakdown',    stats: [['Real estate','58%','$812M'],['Equities','22%','$308M'],['Fixed income','12%','$168M'],['Alternatives','8%','$112M']] },
  'returns':      { title: 'Investment Return — vs benchmark',stats: [['Return','11.8%','1yr'],['Benchmark','9.2%','Index'],['Alpha','+2.6pp','Outperformance'],['3yr avg','10.4%','Rolling']] },
  'liquidity':    { title: 'Liquidity Ratio — vs policy',     stats: [['Ratio','18.4%','Current'],['Policy floor','15.0%','Minimum'],['Headroom','3.4pp','Buffer'],['Prior quarter','17.1%','Q3 FY25']] },
}

// ─── Drilldown table rows ─────────────────────────────────────────────────────
export const DRILLDOWN_ROWS = {
  default: [
    { property: '150 Collins Street',    type: 'Office',     region: 'CBD',       value: '$28.4M', occupancy: '96%',  status: 'On track' },
    { property: 'Southgate Retail',      type: 'Retail',     region: 'Southbank', value: '$14.2M', occupancy: '98%',  status: 'On track' },
    { property: 'Port Melbourne Whs',    type: 'Industrial', region: 'Port',      value: '$11.8M', occupancy: '100%', status: 'On track' },
    { property: '200 Queen Street',      type: 'Office',     region: 'CBD',       value: '$10.9M', occupancy: '89%',  status: 'Watch'    },
    { property: 'Richmond Mixed Use',    type: 'Mixed',      region: 'Inner E',   value: '$9.1M',  occupancy: '91%',  status: 'On track' },
    { property: 'Docklands Tower',       type: 'Office',     region: 'Docklands', value: '$8.7M',  occupancy: '82%',  status: 'At risk'  },
    { property: 'Chadstone Office Pk',   type: 'Office',     region: 'SE',        value: '$7.4M',  occupancy: '95%',  status: 'On track' },
    { property: 'Fitzroy Terrace',       type: 'Retail',     region: 'Inner N',   value: '$6.8M',  occupancy: '97%',  status: 'On track' },
    { property: 'Tullamarine Logistics', type: 'Industrial', region: 'North',     value: '$5.9M',  occupancy: '100%', status: 'On track' },
    { property: 'St Kilda Road Office',  type: 'Office',     region: 'St Kilda',  value: '$4.6M',  occupancy: '77%',  status: 'At risk'  },
  ],
}
