// ─── Business Units ───────────────────────────────────────────────────────────
export const BUSINESS_UNITS = [
  {
    id: 're-properties', slug: 're-properties', name: 'RE Properties',
    description: 'Core commercial property portfolio', color: 'blue',
    colorHex: '#378ADD', colorBg: '#E6F1FB', colorDark: '#0C447C',
    status: 'On Track',
  },
  {
    id: 're-urban', slug: 're-urban', name: 'RE Urban',
    description: 'Urban mixed-use developments', color: 'teal',
    colorHex: '#1D9E75', colorBg: '#E1F5EE', colorDark: '#085041',
    status: 'Watch',
  },
  {
    id: 're-investment-properties', slug: 're-investment-properties', name: 'RE Investment Properties',
    description: 'Investment-grade asset acquisitions', color: 'amber',
    colorHex: '#BA7517', colorBg: '#FAEEDA', colorDark: '#633806',
    status: 'On Track',
  },
  {
    id: 're-communities', slug: 're-communities', name: 'RE Communities',
    description: 'Residential community developments', color: 'green',
    colorHex: '#639922', colorBg: '#EAF3DE', colorDark: '#27500A',
    status: 'Watch',
  },
  {
    id: 're-regional-development', slug: 're-regional-development', name: 'RE Regional Development',
    description: 'Regional land & development pipeline', color: 'purple',
    colorHex: '#7F77DD', colorBg: '#EEEDFE', colorDark: '#3C3489',
    status: 'At Risk',
  },
  {
    id: 'family-office', slug: 'family-office', name: 'Family Office',
    description: 'Private wealth & investment management', color: 'pink',
    colorHex: '#D4537E', colorBg: '#FBEAF0', colorDark: '#72243E',
    status: 'On Track',
  },
]

// ─── Executive KPI definitions ─────────────────────────────────────────────────
// section: which grouped section they belong to
// type: 'dollar' | 'percent' | 'talent'
// trend: 'positive' | 'negative' | 'neutral'
export const EXEC_KPIS = [
  // Section 1: Financial Performance
  {
    id: 'revenue', label: 'Revenue', section: 'financial', type: 'dollar',
    value: '$284M', change: '+7.2% vs prior period', trend: 'positive',
  },
  {
    id: 'op-margin', label: 'Operating Margin', section: 'financial', type: 'percent',
    value: '22.4%', change: '+1.1pp', trend: 'positive',
  },
  {
    id: 'ebitda-margin', label: 'EBITDA Margin', section: 'financial', type: 'percent',
    value: '31.8%', change: '+0.8pp', trend: 'positive',
  },
  {
    id: 'roa', label: 'Return on Assets', section: 'financial', type: 'percent',
    value: '5.9%', change: '+0.3pp', trend: 'positive',
  },
  {
    id: 'talent', label: 'Talent', section: 'financial', type: 'talent',
    value: '842', sub: 'Associates', change: '+34', trend: 'positive',
    secondary: { value: '214', label: 'Contractors', change: '+12' },
  },
  // Section 2: Balance Sheet
  {
    id: 'total-assets', label: 'Total Assets', section: 'balance', type: 'dollar',
    value: '$8.86B', change: '+4.2%', trend: 'positive',
  },
  {
    id: 'liquidity', label: 'Liquidity Position', section: 'balance', type: 'dollar',
    value: '$412M', change: '-3.1%', trend: 'negative',
  },
  {
    id: 'cap-dev', label: 'Capital in Development', section: 'balance', type: 'percent',
    value: '18.3%', sub: 'of Total Assets', change: '+2.1pp', trend: 'neutral',
  },
  {
    id: 'debt-ratio', label: 'Debt Ratio', section: 'balance', type: 'percent',
    value: '47.2%', sub: 'External 31.4% | Internal 15.8%', change: '-0.8pp', trend: 'positive',
  },
  // Section 3: Cash Flow
  {
    id: 'op-cf', label: 'Operating Cash Flow', section: 'cashflow', type: 'dollar',
    value: '$156M', change: '+5.3%', trend: 'positive',
  },
  {
    id: 'free-cf', label: 'Free Cash Flow', section: 'cashflow', type: 'dollar',
    value: '$89M', change: '-8.2%', trend: 'negative',
  },
  {
    id: 'fin-cf', label: 'Financing Cash Flow', section: 'cashflow', type: 'dollar',
    value: '$(42M)', sub: 'Net debt repaid', change: null, trend: 'neutral',
  },
]

// ─── BU breakdown data per KPI ────────────────────────────────────────────────
export const BU_BREAKDOWN_DATA = {
  revenue: [
    { bu: 'RE Properties',          value: 84,   display: '$84M' },
    { bu: 'RE Urban',               value: 41,   display: '$41M' },
    { bu: 'RE Investment Properties', value: 89, display: '$89M' },
    { bu: 'RE Communities',         value: 32,   display: '$32M' },
    { bu: 'RE Regional Development',value: 18,   display: '$18M' },
    { bu: 'Family Office',          value: 20,   display: '$20M' },
  ],
  'op-margin': [
    { bu: 'RE Properties',          value: 24.1, display: '24.1%', enterprise: 22.4 },
    { bu: 'RE Urban',               value: 18.2, display: '18.2%', enterprise: 22.4 },
    { bu: 'RE Investment Properties', value: 26.8, display: '26.8%', enterprise: 22.4 },
    { bu: 'RE Communities',         value: 19.4, display: '19.4%', enterprise: 22.4 },
    { bu: 'RE Regional Development',value: 14.2, display: '14.2%', enterprise: 22.4 },
    { bu: 'Family Office',          value: 28.4, display: '28.4%', enterprise: 22.4 },
  ],
  'ebitda-margin': [
    { bu: 'RE Properties',          value: 33.2, display: '33.2%', enterprise: 31.8 },
    { bu: 'RE Urban',               value: 27.4, display: '27.4%', enterprise: 31.8 },
    { bu: 'RE Investment Properties', value: 37.1, display: '37.1%', enterprise: 31.8 },
    { bu: 'RE Communities',         value: 28.8, display: '28.8%', enterprise: 31.8 },
    { bu: 'RE Regional Development',value: 24.1, display: '24.1%', enterprise: 31.8 },
    { bu: 'Family Office',          value: 38.2, display: '38.2%', enterprise: 31.8 },
  ],
  'roa': [
    { bu: 'RE Properties',          value: 6.4, display: '6.4%', enterprise: 5.9 },
    { bu: 'RE Urban',               value: 4.2, display: '4.2%', enterprise: 5.9 },
    { bu: 'RE Investment Properties', value: 7.1, display: '7.1%', enterprise: 5.9 },
    { bu: 'RE Communities',         value: 4.8, display: '4.8%', enterprise: 5.9 },
    { bu: 'RE Regional Development',value: 3.2, display: '3.2%', enterprise: 5.9 },
    { bu: 'Family Office',          value: 8.1, display: '8.1%', enterprise: 5.9 },
  ],
  'total-assets': [
    { bu: 'RE Properties',          value: 2400, display: '$2.4B' },
    { bu: 'RE Urban',               value: 1100, display: '$1.1B' },
    { bu: 'RE Investment Properties', value: 3800, display: '$3.8B' },
    { bu: 'RE Communities',         value: 890,  display: '$890M' },
    { bu: 'RE Regional Development',value: 670,  display: '$670M' },
    { bu: 'Family Office',          value: 1400, display: '$1.4B' },
  ],
  'liquidity': [
    { bu: 'RE Properties',          value: 118,  display: '$118M' },
    { bu: 'RE Urban',               value: 72,   display: '$72M' },
    { bu: 'RE Investment Properties', value: 142, display: '$142M' },
    { bu: 'RE Communities',         value: 48,   display: '$48M' },
    { bu: 'RE Regional Development',value: 18,   display: '$18M' },
    { bu: 'Family Office',          value: 14,   display: '$14M' },
  ],
  'cap-dev': [
    { bu: 'RE Properties',          value: 8.2,  display: '8.2%',  enterprise: 18.3 },
    { bu: 'RE Urban',               value: 34.1, display: '34.1%', enterprise: 18.3 },
    { bu: 'RE Investment Properties', value: 12.4, display: '12.4%', enterprise: 18.3 },
    { bu: 'RE Communities',         value: 22.1, display: '22.1%', enterprise: 18.3 },
    { bu: 'RE Regional Development',value: 48.2, display: '48.2%', enterprise: 18.3 },
    { bu: 'Family Office',          value: 4.1,  display: '4.1%',  enterprise: 18.3 },
  ],
  'debt-ratio': [
    { bu: 'RE Properties',          value: 41.3, display: '41.3%', enterprise: 47.2 },
    { bu: 'RE Urban',               value: 58.2, display: '58.2%', enterprise: 47.2 },
    { bu: 'RE Investment Properties', value: 44.1, display: '44.1%', enterprise: 47.2 },
    { bu: 'RE Communities',         value: 51.2, display: '51.2%', enterprise: 47.2 },
    { bu: 'RE Regional Development',value: 52.8, display: '52.8%', enterprise: 47.2 },
    { bu: 'Family Office',          value: 38.4, display: '38.4%', enterprise: 47.2 },
  ],
  'op-cf': [
    { bu: 'RE Properties',          value: 48,   display: '$48M' },
    { bu: 'RE Urban',               value: 22,   display: '$22M' },
    { bu: 'RE Investment Properties', value: 54,  display: '$54M' },
    { bu: 'RE Communities',         value: 18,   display: '$18M' },
    { bu: 'RE Regional Development',value: 8,    display: '$8M' },
    { bu: 'Family Office',          value: 6,    display: '$6M' },
  ],
  'free-cf': [
    { bu: 'RE Properties',          value: 31,   display: '$31M' },
    { bu: 'RE Urban',               value: 11,   display: '$11M' },
    { bu: 'RE Investment Properties', value: 29,  display: '$29M' },
    { bu: 'RE Communities',         value: 8,    display: '$8M' },
    { bu: 'RE Regional Development',value: 6,    display: '$6M' },
    { bu: 'Family Office',          value: 4,    display: '$4M' },
  ],
  'fin-cf': [
    { bu: 'RE Properties',          value: 8,    display: '-$8M' },
    { bu: 'RE Urban',               value: 6,    display: '-$6M' },
    { bu: 'RE Investment Properties', value: 14,  display: '-$14M' },
    { bu: 'RE Communities',         value: 7,    display: '-$7M' },
    { bu: 'RE Regional Development',value: 4,    display: '-$4M' },
    { bu: 'Family Office',          value: 3,    display: '-$3M' },
  ],
  'talent': [
    { bu: 'RE Properties',          associates: 210, contractors: 58 },
    { bu: 'RE Urban',               associates: 124, contractors: 31 },
    { bu: 'RE Investment Properties', associates: 198, contractors: 52 },
    { bu: 'RE Communities',         associates: 148, contractors: 42 },
    { bu: 'RE Regional Development',associates: 96,  contractors: 18 },
    { bu: 'Family Office',          associates: 66,  contractors: 13 },
  ],
}
