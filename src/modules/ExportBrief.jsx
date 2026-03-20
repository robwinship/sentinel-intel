import { MARKET } from '../data/seeds.js';

export default function ExportBrief({ events, aiText, onAI, aiLoading }) {
  const hi  = events.filter(e => e.sev === 'CRITICAL' || e.sev === 'HIGH');
  const now = new Date().toLocaleString('en-CA');

  const brief = [
    'EXECUTIVE SECURITY BRIEF',
    `Generated: ${now}`,
    '─'.repeat(60),
    '',
    'EXECUTIVE SUMMARY',
    aiText || '[Generate AI summary first using the AI Brief button]',
    '',
    '─'.repeat(60),
    'TOP SECURITY DEVELOPMENTS',
    '',
    ...hi.map((e, i) => [
      `${i + 1}. [${e.sev}] ${e.headline}`,
      `   Region: ${e.region} | Category: ${e.cat}`,
      `   ${e.synopsis}`,
      `   Source: ${e.source} — ${e.url}`,
    ].join('\n')),
    '',
    '─'.repeat(60),
    'MARKET SIGNALS',
    '',
    ...MARKET.map(m =>
      `${m.sym.padEnd(12)} ${String(m.val.toFixed(2)).padStart(10)}   ${m.pct >= 0 ? '+' : ''}${m.pct.toFixed(2)}%`
    ),
    '',
    '─'.repeat(60),
    'RECOMMENDED PRIORITIES',
    '',
    '1. Engage cyber response team for any active cyber events',
    '2. Issue travel advisories for affected regions',
    '3. Review border and logistics dependencies',
    '4. Verify backup power and remote access readiness',
    '5. Monitor VIX elevation — review hedging exposure',
    '',
    '─'.repeat(60),
    'CLASSIFICATION: CONFIDENTIAL — FOR EXECUTIVE USE ONLY',
  ].join('\n').trim();

  const copy = () => navigator.clipboard.writeText(brief).catch(() => {});

  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Executive Brief Export</div>
          <div className="sec-sub">Full intelligence briefing for distribution</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={onAI} disabled={aiLoading}>
            {aiLoading ? 'Generating…' : '✦ Generate AI Summary'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={copy}>
            Copy Brief
          </button>
        </div>
      </div>
      <div className="export-pre">{brief}</div>
    </div>
  );
}
