import { SEV, MARKET, TICKERS } from '../data/seeds.js';
import EvCard from '../components/EvCard.jsx';
import MktRow from '../components/MktRow.jsx';

function fmtDt(iso) {
  return new Date(iso).toLocaleString('en-CA', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function Dashboard({ events, scanState, onScan, lastScan, aiText, aiLoading, aiError, onAI }) {
  const crit = events.filter(e => e.sev === 'CRITICAL');
  const high = events.filter(e => e.sev === 'HIGH');
  const dev  = events.filter(e => e.developing);
  const top5 = [...events].sort((a, b) => SEV[b.sev].rank - SEV[a.sev].rank).slice(0, 5);

  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Executive Security Brief</div>
          <div className="sec-sub">{lastScan ? `Last scan: ${fmtDt(lastScan)}` : 'No scan yet'}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={onAI} disabled={aiLoading}>
            {aiLoading ? 'Generating…' : '✦ AI Brief'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={onScan} disabled={scanState === 'running'}>
            {scanState === 'running' ? '⟳ Scanning…' : '▶ Run Scan Now'}
          </button>
        </div>
      </div>

      <div className="g4" style={{ marginBottom: 16 }}>
        <div className="stat">
          <div className="stat-val" style={{ color: 'var(--red)' }}>{crit.length}</div>
          <div className="stat-lbl">Critical</div>
        </div>
        <div className="stat">
          <div className="stat-val" style={{ color: 'var(--orange)' }}>{high.length}</div>
          <div className="stat-lbl">High</div>
        </div>
        <div className="stat">
          <div className="stat-val" style={{ color: 'var(--yellow)' }}>{dev.length}</div>
          <div className="stat-lbl">Developing</div>
        </div>
        <div className="stat">
          <div className="stat-val">{events.length}</div>
          <div className="stat-lbl">Total Events</div>
        </div>
      </div>

      <div className="ai-panel">
        <div className="ai-hdr">
          <div className="ai-dot" />
          <div className="ai-title">AI Executive Summary</div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)', marginLeft: 'auto' }}>
            Powered by AI
          </span>
        </div>
        {aiLoading
          ? <div className="ai-dim">Generating executive brief…</div>
          : aiError
            ? (
              <div>
                <div style={{ color: 'var(--red)', fontFamily: 'var(--mono)', fontSize: 12, marginBottom: 8 }}>
                  ✗ {aiError}
                </div>
                <div className="ai-dim">
                  Check your API key in <strong style={{ color: 'var(--text2)' }}>Settings</strong>, then try again.
                </div>
              </div>
            )
          : aiText
            ? <div className="ai-body">{aiText}</div>
            : <div className="ai-dim">Click "✦ AI Brief" to generate an AI executive summary of current intelligence.</div>
        }
      </div>

      <div className="g2">
        <div>
          <div className="card-title" style={{ marginBottom: 12 }}>Top Priority Events</div>
          {top5.map(e => <EvCard key={e.id} ev={e} />)}
        </div>
        <div>
          <div className="card card-accent" style={{ marginBottom: 16 }}>
            <div className="card-hdr">
              <div className="card-title">Market Intelligence</div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)' }}>INDICATIVE</span>
            </div>
            {MARKET.slice(0, 6).map(m => <MktRow key={m.sym} item={m} />)}
          </div>
          <div className="card">
            <div className="card-hdr"><div className="card-title">Watchlist Tickers</div></div>
            {TICKERS.map(m => <MktRow key={m.sym} item={m} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
