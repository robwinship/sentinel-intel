export const SEV = {
  CRITICAL: { rank: 4 },
  HIGH:     { rank: 3 },
  MODERATE: { rank: 2 },
  LOW:      { rank: 1 },
};

export const REGIONS = ['All', 'Regional', 'Provincial', 'National', 'International'];

export const CATS = [
  'All', 'Civil Unrest', 'Terror', 'Cybersecurity', 'Infrastructure',
  'Transportation', 'Weather', 'Crime', 'Government', 'Border', 'Public Safety',
];

export const SOURCES_INIT = [
  { id: 1,  name: 'Reuters',              type: 'Newswire',        url: 'feeds.reuters.com/reuters/topNews',      region: 'International', active: true, cred: 95 },
  { id: 2,  name: 'CBC News',             type: 'TV/News',         url: 'cbc.ca/cmlink/rss-topstories',           region: 'National',      active: true, cred: 92 },
  { id: 3,  name: 'Globe and Mail',       type: 'Newspaper',       url: 'theglobeandmail.com/rss/',               region: 'National',      active: true, cred: 90 },
  { id: 4,  name: 'Public Safety Canada', type: 'Government',      url: 'publicsafety.gc.ca',                     region: 'National',      active: true, cred: 98 },
  { id: 5,  name: 'CISA Advisories',      type: 'Cybersecurity',   url: 'cisa.gov/cybersecurity-advisories',      region: 'International', active: true, cred: 99 },
  { id: 6,  name: 'Toronto Star',         type: 'Newspaper',       url: 'thestar.com',                            region: 'Provincial',    active: true, cred: 85 },
  { id: 7,  name: 'BBC World',            type: 'TV/News',         url: 'feeds.bbci.co.uk/news/world/rss.xml',    region: 'International', active: true, cred: 94 },
  { id: 8,  name: 'AP News',              type: 'Newswire',        url: 'apnews.com',                             region: 'International', active: true, cred: 93 },
  { id: 9,  name: 'RCMP News',            type: 'Law Enforcement', url: 'rcmp-grc.gc.ca',                         region: 'National',      active: true, cred: 97 },
  { id: 10, name: 'Environment Canada',   type: 'Government',      url: 'weather.gc.ca',                          region: 'National',      active: true, cred: 96 },
];

export const EVENTS_INIT = [
  {
    id: 'e1', headline: 'Major cyberattack targets Canadian financial institutions',
    source: 'CBC News', sourceType: 'TV/News', dt: '2026-03-19T08:14:00Z',
    region: 'National', cat: 'Cybersecurity', sev: 'CRITICAL',
    synopsis: 'A coordinated ransomware campaign has affected multiple Canadian banks and credit unions. Operations disrupted at three major institutions. CISA and CCCS have issued joint advisory.',
    op: 'High — payment systems may experience delays.', cyber: 'Ransomware deployment confirmed across sector.',
    travel: 'None.', bcp: 'Activate cyber response protocols immediately.',
    developing: true, url: 'https://www.cbc.ca/',
  },
  {
    id: 'e2', headline: 'Protest disrupts Toronto downtown core — transit rerouted',
    source: 'Toronto Star', sourceType: 'Newspaper', dt: '2026-03-19T07:30:00Z',
    region: 'Provincial', cat: 'Civil Unrest', sev: 'HIGH',
    synopsis: 'Several hundred demonstrators gathered at Queen and Bay, disrupting TTC routes. Police presence maintained order. Expected to continue through afternoon.',
    op: 'Office access and employee commutes affected.', cyber: 'None.',
    travel: 'Avoid downtown core until 18:00 EST.', bcp: 'Remote work recommended for downtown staff.',
    developing: true, url: 'https://www.thestar.com/',
  },
  {
    id: 'e3', headline: 'US-Canada border crossings experiencing multi-hour delays',
    source: 'Globe and Mail', sourceType: 'Newspaper', dt: '2026-03-19T06:00:00Z',
    region: 'National', cat: 'Border', sev: 'HIGH',
    synopsis: 'Enhanced screening protocols implemented at four major Canada-US border crossings. Commercial vehicle wait times exceed 4 hours. CBSA attributes to new regulatory checks.',
    op: 'Supply chain and logistics delays expected.', cyber: 'None.',
    travel: 'Allow 4–6 extra hours for cross-border travel.', bcp: 'Review just-in-time supply dependencies.',
    developing: false, url: 'https://www.theglobeandmail.com/',
  },
  {
    id: 'e4', headline: 'Severe ice storm warning issued for Ottawa-Gatineau region',
    source: 'Environment Canada', sourceType: 'Government', dt: '2026-03-19T05:45:00Z',
    region: 'Regional', cat: 'Weather', sev: 'MODERATE',
    synopsis: 'Environment Canada has issued a freezing rain warning. Accumulation of 20–30mm of ice expected overnight. Power outages and road closures are probable.',
    op: 'Facility access disruptions likely.', cyber: 'Data centre power redundancy should be verified.',
    travel: 'Avoid non-essential travel in affected area.', bcp: 'Verify backup power and remote access readiness.',
    developing: true, url: 'https://weather.gc.ca/',
  },
  {
    id: 'e5', headline: 'CISA issues critical vulnerability advisory for industrial control systems',
    source: 'CISA Advisories', sourceType: 'Cybersecurity', dt: '2026-03-19T03:00:00Z',
    region: 'International', cat: 'Cybersecurity', sev: 'CRITICAL',
    synopsis: 'CISA has published an advisory regarding a zero-day vulnerability in widely-deployed SCADA systems. Active exploitation confirmed in US energy sector. Patch not yet available.',
    op: 'Facilities using affected ICS must isolate systems.', cyber: 'Immediate network segmentation required.',
    travel: 'None.', bcp: 'Engage OT security team for emergency assessment.',
    developing: true, url: 'https://www.cisa.gov/',
  },
  {
    id: 'e6', headline: 'G7 foreign ministers condemn escalating regional conflict',
    source: 'Reuters', sourceType: 'Newswire', dt: '2026-03-18T22:00:00Z',
    region: 'International', cat: 'Government', sev: 'MODERATE',
    synopsis: 'G7 foreign ministers issued a joint statement condemning ongoing hostilities. Additional sanctions against energy exports are under discussion and may affect commodity markets.',
    op: 'Monitor supply chain exposure.', cyber: 'Heightened state-sponsored threat activity anticipated.',
    travel: 'Review travel advisories for affected region.', bcp: 'Review counterparty exposure to sanction risk.',
    developing: false, url: 'https://www.reuters.com/',
  },
  {
    id: 'e7', headline: 'Organized crime network dismantled in Montreal drug operation',
    source: 'RCMP News', sourceType: 'Law Enforcement', dt: '2026-03-18T18:30:00Z',
    region: 'Regional', cat: 'Crime', sev: 'LOW',
    synopsis: 'RCMP announced the arrest of 23 individuals in a coordinated takedown of a drug trafficking network operating across Quebec. No direct corporate or infrastructure targets identified.',
    op: 'Low.', cyber: 'None.', travel: 'None.', bcp: 'No action required.',
    developing: false, url: 'https://www.rcmp-grc.gc.ca/',
  },
  {
    id: 'e8', headline: 'Major airport systems outage grounds flights across North America',
    source: 'AP News', sourceType: 'Newswire', dt: '2026-03-19T09:00:00Z',
    region: 'International', cat: 'Transportation', sev: 'HIGH',
    synopsis: 'A software failure in air traffic management systems has caused widespread flight delays and cancellations. Cyber sabotage not yet ruled out.',
    op: 'Executive and staff travel severely impacted.', cyber: 'Possible — investigation ongoing.',
    travel: 'Critical — reschedule non-essential air travel.', bcp: 'Activate virtual meeting contingencies for travel-dependent meetings.',
    developing: true, url: 'https://apnews.com/',
  },
];

export const MARKET = [
  { sym: 'S&P 500',   val: 5412.30,  chg: +18.45,  pct: +0.34,  type: 'Index' },
  { sym: 'TSX',       val: 22187.60, chg: -43.20,  pct: -0.19,  type: 'Index' },
  { sym: 'Dow Jones', val: 40284.10, chg: +124.70, pct: +0.31,  type: 'Index' },
  { sym: 'Nasdaq',    val: 17092.40, chg: +67.30,  pct: +0.40,  type: 'Index' },
  { sym: 'VIX',       val: 18.42,    chg: +2.11,   pct: +12.93, type: 'Volatility' },
  { sym: 'WTI Oil',   val: 81.34,    chg: -1.20,   pct: -1.45,  type: 'Commodity' },
  { sym: 'Gold',      val: 2318.50,  chg: +12.40,  pct: +0.54,  type: 'Commodity' },
  { sym: 'Nat Gas',   val: 1.94,     chg: -0.08,   pct: -3.96,  type: 'Commodity' },
  { sym: 'USD/CAD',   val: 1.3542,   chg: +0.0031, pct: +0.23,  type: 'FX' },
  { sym: '10Y UST',   val: 4.312,    chg: +0.018,  pct: +0.42,  type: 'Bond' },
];

export const TICKERS = [
  { sym: 'SHOP.TO', val: 98.42,  chg: +1.20, pct: +1.23 },
  { sym: 'RY.TO',   val: 133.65, chg: -0.45, pct: -0.34 },
  { sym: 'ENB.TO',  val: 49.83,  chg: +0.22, pct: +0.44 },
  { sym: 'AAPL',    val: 212.14, chg: +3.10, pct: +1.48 },
  { sym: 'MSFT',    val: 419.22, chg: +5.80, pct: +1.40 },
];

export const MODULES = [
  'Dashboard', 'Regional Intel', 'Global Intel', 'Market Monitor',
  'Alerts', 'Watchlist', 'Sources', 'Schedule', 'Scan History', 'Export Brief', 'Settings',
];

export const ICONS = ['◼', '🗺', '🌐', '📈', '🔔', '⭐', '📡', '⏱', '📋', '📄', '⚙'];
