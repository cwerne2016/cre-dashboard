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
    value: '$284M', change: '+7.2% YOY', trend: 'positive',
    sparkline: [242,251,259,248,263,271,265,274,278,281,279,284],
  },
  {
    id: 'op-margin', label: 'Operating Margin', section: 'financial', type: 'percent',
    value: '22.4%', change: '+1.1% YOY', trend: 'positive',
    sparkline: [20.1,20.8,21.2,20.9,21.4,21.8,21.5,22.0,22.1,22.3,22.2,22.4],
  },
  {
    id: 'ebitda-margin', label: 'EBITDA Margin', section: 'financial', type: 'percent',
    value: '31.8%', change: '+0.8% YOY', trend: 'positive',
    sparkline: [29.4,30.1,30.5,30.2,30.8,31.1,30.9,31.4,31.5,31.7,31.6,31.8],
  },
  {
    id: 'roa', label: 'Return on Assets', section: 'financial', type: 'percent',
    value: '5.9%', change: '+0.3% YOY', trend: 'positive',
    sparkline: [5.1,5.2,5.5,5.4,5.6,5.7,5.8,5.9],
  },
  {
    id: 'talent', label: 'Talent', section: 'financial', type: 'talent',
    value: '842', sub: 'Associates', change: '+34 YOY', trend: 'positive',
    secondary: { value: '214', label: 'Contractors', change: '+12 YOY' },
    sparkline: [798,808,815,818,825,830,835,838,840,842],
  },
  // Section 2: Balance Sheet
  {
    id: 'total-assets', label: 'Total Assets', section: 'balance', type: 'dollar',
    value: '$8.86B', change: '+4.2% YOY', trend: 'positive',
    sparkline: [8.21,8.34,8.41,8.48,8.52,8.58,8.62,8.66,8.70,8.75,8.81,8.86],
  },
  {
    id: 'liquidity', label: 'Liquidity Position', section: 'balance', type: 'dollar',
    value: '$412M', change: '-3.1% YOY', trend: 'negative',
    sparkline: [445,438,431,427,422,418,416,414,413,412],
  },
  {
    id: 'cap-dev', label: 'Capital in Development', section: 'balance', type: 'percent',
    value: '18.3%', sub: 'of Total Assets', change: '+2.1% YOY', trend: 'neutral',
    sparkline: [15.2,15.8,16.4,16.9,17.1,17.4,17.8,18.0,18.1,18.2,18.3,18.3],
  },
  {
    id: 'debt-ratio', label: 'Debt Ratio', section: 'balance', type: 'percent',
    value: '47.2%', sub: 'External 31.4% | Internal 15.8%', change: '-0.8% YOY', trend: 'positive',
    sparkline: [49.1,48.8,48.5,48.2,47.9,47.7,47.5,47.4,47.3,47.2],
  },
  // Section 3: Cash Flow
  {
    id: 'op-cf', label: 'Operating Cash Flow', section: 'cashflow', type: 'dollar',
    value: '$156M', change: '+5.3% YOY', trend: 'positive',
    sparkline: [121,128,134,129,138,142,140,148,151,154,155,156],
  },
  {
    id: 'free-cf', label: 'Free Cash Flow', section: 'cashflow', type: 'dollar',
    value: '$89M', change: '-8.2% YOY', trend: 'negative',
    sparkline: [98,102,107,101,104,108,105,96,93,91,90,89],
  },
  {
    id: 'fin-cf', label: 'Financing Cash Flow', section: 'cashflow', type: 'dollar',
    value: '$(42M)', sub: 'Net debt repaid', change: null, trend: 'neutral',
    sparkline: [-38,-40,-39,-41,-42,-40,-41,-43,-42,-41,-42,-42],
  },
]

// ─── BU breakdown data per KPI ────────────────────────────────────────────────
export const BU_BREAKDOWN_DATA = {
  revenue: [
    { bu: 'RE Properties',            value: 84,   display: '$84M',   yoyDelta: '+8.1%' },
    { bu: 'RE Urban',                 value: 41,   display: '$41M',   yoyDelta: '+5.3%' },
    { bu: 'RE Investment Properties', value: 89,   display: '$89M',   yoyDelta: '+12.4%' },
    { bu: 'RE Communities',           value: 32,   display: '$32M',   yoyDelta: '+4.1%' },
    { bu: 'RE Regional Development',  value: 18,   display: '$18M',   yoyDelta: '-3.1%' },
    { bu: 'Family Office',            value: 20,   display: '$20M',   yoyDelta: '+9.7%' },
    { bu: 'Other (Non-RE)',           value: 11,   display: '$11M',   yoyDelta: '+2.1%' },
  ],
  'op-margin': [
    { bu: 'RE Properties',            value: 24.1, display: '24.1%', enterprise: 22.4 },
    { bu: 'RE Urban',                 value: 18.2, display: '18.2%', enterprise: 22.4 },
    { bu: 'RE Investment Properties', value: 26.8, display: '26.8%', enterprise: 22.4 },
    { bu: 'RE Communities',           value: 19.4, display: '19.4%', enterprise: 22.4 },
    { bu: 'RE Regional Development',  value: 14.2, display: '14.2%', enterprise: 22.4 },
    { bu: 'Family Office',            value: 28.4, display: '28.4%', enterprise: 22.4 },
    { bu: 'Other (Non-RE)',           value: 12.1, display: '12.1%', enterprise: 22.4 },
  ],
  'ebitda-margin': [
    { bu: 'RE Properties',            value: 33.2, display: '33.2%', enterprise: 31.8 },
    { bu: 'RE Urban',                 value: 27.4, display: '27.4%', enterprise: 31.8 },
    { bu: 'RE Investment Properties', value: 37.1, display: '37.1%', enterprise: 31.8 },
    { bu: 'RE Communities',           value: 28.8, display: '28.8%', enterprise: 31.8 },
    { bu: 'RE Regional Development',  value: 24.1, display: '24.1%', enterprise: 31.8 },
    { bu: 'Family Office',            value: 38.2, display: '38.2%', enterprise: 31.8 },
    { bu: 'Other (Non-RE)',           value: 22.4, display: '22.4%', enterprise: 31.8 },
  ],
  'roa': [
    { bu: 'RE Properties',            value: 6.4,  display: '6.4%',  enterprise: 5.9 },
    { bu: 'RE Urban',                 value: 4.2,  display: '4.2%',  enterprise: 5.9 },
    { bu: 'RE Investment Properties', value: 7.1,  display: '7.1%',  enterprise: 5.9 },
    { bu: 'RE Communities',           value: 4.8,  display: '4.8%',  enterprise: 5.9 },
    { bu: 'RE Regional Development',  value: 3.2,  display: '3.2%',  enterprise: 5.9 },
    { bu: 'Family Office',            value: 8.1,  display: '8.1%',  enterprise: 5.9 },
    { bu: 'Other (Non-RE)',           value: 2.8,  display: '2.8%',  enterprise: 5.9 },
  ],
  'total-assets': [
    { bu: 'RE Properties',            value: 2400, display: '$2.4B',  yoyDelta: '+3.8%' },
    { bu: 'RE Urban',                 value: 1100, display: '$1.1B',  yoyDelta: '+6.2%' },
    { bu: 'RE Investment Properties', value: 3800, display: '$3.8B',  yoyDelta: '+4.9%' },
    { bu: 'RE Communities',           value: 890,  display: '$890M',  yoyDelta: '+2.1%' },
    { bu: 'RE Regional Development',  value: 670,  display: '$670M',  yoyDelta: '+7.4%' },
    { bu: 'Family Office',            value: 1400, display: '$1.4B',  yoyDelta: '+2.8%' },
    { bu: 'Other (Non-RE)',           value: 310,  display: '$310M',  yoyDelta: '+1.4%' },
  ],
  'liquidity': [
    { bu: 'RE Properties',            value: 118,  display: '$118M',  yoyDelta: '-2.4%' },
    { bu: 'RE Urban',                 value: 72,   display: '$72M',   yoyDelta: '-4.1%' },
    { bu: 'RE Investment Properties', value: 142,  display: '$142M',  yoyDelta: '-1.8%' },
    { bu: 'RE Communities',           value: 48,   display: '$48M',   yoyDelta: '-3.7%' },
    { bu: 'RE Regional Development',  value: 18,   display: '$18M',   yoyDelta: '-8.2%' },
    { bu: 'Family Office',            value: 14,   display: '$14M',   yoyDelta: '-6.1%' },
    { bu: 'Other (Non-RE)',           value: 8,    display: '$8M',    yoyDelta: '-5.2%' },
  ],
  'cap-dev': [
    { bu: 'RE Properties',            value: 8.2,  display: '8.2%',  enterprise: 18.3 },
    { bu: 'RE Urban',                 value: 34.1, display: '34.1%', enterprise: 18.3 },
    { bu: 'RE Investment Properties', value: 12.4, display: '12.4%', enterprise: 18.3 },
    { bu: 'RE Communities',           value: 22.1, display: '22.1%', enterprise: 18.3 },
    { bu: 'RE Regional Development',  value: 48.2, display: '48.2%', enterprise: 18.3 },
    { bu: 'Family Office',            value: 4.1,  display: '4.1%',  enterprise: 18.3 },
    { bu: 'Other (Non-RE)',           value: 3.2,  display: '3.2%',  enterprise: 18.3 },
  ],
  'debt-ratio': [
    { bu: 'RE Properties',            value: 41.3, display: '41.3%', enterprise: 47.2 },
    { bu: 'RE Urban',                 value: 58.2, display: '58.2%', enterprise: 47.2 },
    { bu: 'RE Investment Properties', value: 44.1, display: '44.1%', enterprise: 47.2 },
    { bu: 'RE Communities',           value: 51.2, display: '51.2%', enterprise: 47.2 },
    { bu: 'RE Regional Development',  value: 52.8, display: '52.8%', enterprise: 47.2 },
    { bu: 'Family Office',            value: 38.4, display: '38.4%', enterprise: 47.2 },
    { bu: 'Other (Non-RE)',           value: 22.1, display: '22.1%', enterprise: 47.2 },
  ],
  'op-cf': [
    { bu: 'RE Properties',            value: 48,   display: '$48M',   yoyDelta: '+6.1%' },
    { bu: 'RE Urban',                 value: 22,   display: '$22M',   yoyDelta: '+4.4%' },
    { bu: 'RE Investment Properties', value: 54,   display: '$54M',   yoyDelta: '+7.8%' },
    { bu: 'RE Communities',           value: 18,   display: '$18M',   yoyDelta: '+3.2%' },
    { bu: 'RE Regional Development',  value: 8,    display: '$8M',    yoyDelta: '+1.1%' },
    { bu: 'Family Office',            value: 6,    display: '$6M',    yoyDelta: '+2.9%' },
    { bu: 'Other (Non-RE)',           value: 4,    display: '$4M',    yoyDelta: '+0.8%' },
  ],
  'free-cf': [
    { bu: 'RE Properties',            value: 31,   display: '$31M',   yoyDelta: '-6.8%' },
    { bu: 'RE Urban',                 value: 11,   display: '$11M',   yoyDelta: '-9.2%' },
    { bu: 'RE Investment Properties', value: 29,   display: '$29M',   yoyDelta: '-4.1%' },
    { bu: 'RE Communities',           value: 8,    display: '$8M',    yoyDelta: '-7.3%' },
    { bu: 'RE Regional Development',  value: 6,    display: '$6M',    yoyDelta: '-11.4%' },
    { bu: 'Family Office',            value: 4,    display: '$4M',    yoyDelta: '-5.8%' },
    { bu: 'Other (Non-RE)',           value: 2,    display: '$2M',    yoyDelta: '-3.4%' },
  ],
  'fin-cf': [
    { bu: 'RE Properties',            value: 8,    display: '-$8M',   yoyDelta: '+4.2%' },
    { bu: 'RE Urban',                 value: 6,    display: '-$6M',   yoyDelta: '+2.8%' },
    { bu: 'RE Investment Properties', value: 14,   display: '-$14M',  yoyDelta: '+6.1%' },
    { bu: 'RE Communities',           value: 7,    display: '-$7M',   yoyDelta: '+3.4%' },
    { bu: 'RE Regional Development',  value: 4,    display: '-$4M',   yoyDelta: '+1.9%' },
    { bu: 'Family Office',            value: 3,    display: '-$3M',   yoyDelta: '+5.2%' },
    { bu: 'Other (Non-RE)',           value: 1,    display: '-$1M',   yoyDelta: null },
  ],
  'talent': [
    { bu: 'RE Properties',            associates: 210, contractors: 58 },
    { bu: 'RE Urban',                 associates: 124, contractors: 31 },
    { bu: 'RE Investment Properties', associates: 198, contractors: 52 },
    { bu: 'RE Communities',           associates: 148, contractors: 42 },
    { bu: 'RE Regional Development',  associates: 96,  contractors: 18 },
    { bu: 'Family Office',            associates: 66,  contractors: 13 },
    { bu: 'Other (Non-RE)',           associates: 0,   contractors: 0 },
  ],
}

export const BU_CONTEXT_STRIPS = {
  'revenue':        { total: 'Company Total: $284M',  best: 'Best: RE Inv. Props $89M',      worst: 'Worst: RE Regional $18M',        avg: null },
  'op-margin':      { total: null,                    best: 'Best: Family Office 28.4%',      worst: 'Worst: RE Regional 14.2%',       avg: 'Enterprise Avg: 22.4%' },
  'ebitda-margin':  { total: null,                    best: 'Best: Family Office 38.2%',      worst: 'Worst: RE Regional 24.1%',       avg: 'Enterprise Avg: 31.8%' },
  'roa':            { total: null,                    best: 'Best: Family Office 8.1%',       worst: 'Worst: RE Regional 3.2%',        avg: 'Enterprise Avg: 5.9%' },
  'total-assets':   { total: 'Company Total: $8.86B', best: 'Best: RE Inv. Props $3.8B',     worst: 'Worst: RE Communities $890M',    avg: null },
  'liquidity':      { total: 'Company Total: $412M',  best: 'Best: RE Inv. Props $142M',     worst: 'Worst: RE Regional $18M',        avg: null },
  'cap-dev':        { total: null,                    best: 'Highest: RE Regional 48.2%',    worst: 'Lowest: Family Office 4.1%',     avg: 'Enterprise Avg: 18.3%' },
  'debt-ratio':     { total: null,                    best: 'Lowest: Family Office 38.4%',   worst: 'Highest: RE Urban 58.2%',        avg: 'Enterprise Avg: 47.2%' },
  'op-cf':          { total: 'Company Total: $156M',  best: 'Best: RE Inv. Props $54M',      worst: 'Worst: Family Office $6M',       avg: null },
  'free-cf':        { total: 'Company Total: $89M',   best: 'Best: RE Properties $31M',      worst: 'Worst: Family Office $4M',       avg: null },
  'fin-cf':         { total: 'Company Total: $(42M)', best: 'Largest: RE Inv. Props $(14M)', worst: 'Smallest: Family Office $(3M)',  avg: null },
  'talent':         { total: 'Total: 1,056',          best: 'Largest: RE Properties 268',    worst: 'Smallest: Family Office 79',     avg: null },
}
