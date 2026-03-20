import { useState, useEffect, useCallback } from 'react';
import { MODULES, ICONS, EVENTS_INIT, SOURCES_INIT, MARKET } from './data/seeds.js';
import { generateAISummary } from './services/ai.js';
import { sendEmailDigest }   from './services/email.js';

import Dashboard    from './modules/Dashboard.jsx';
import RegionalIntel from './modules/RegionalIntel.jsx';
import GlobalIntel  from './modules/GlobalIntel.jsx';
import MarketMonitor from './modules/MarketMonitor.jsx';
import Alerts       from './modules/Alerts.jsx';
import Watchlist    from './modules/Watchlist.jsx';
import Sources      from './modules/Sources.jsx';
import Schedule     from './modules/Schedule.jsx';
import ScanHistory  from './modules/ScanHistory.jsx';
import ExportBrief  from './modules/ExportBrief.jsx';
import Settings     from './modules/Settings.jsx';

function fmtTime(d) {
  return d.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
function fmtDate(d) {
  return d.toLocaleDateString('en-CA', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export default function App() {
  const [mod,       setMod]       = useState(0);
  const [events]                  = useState(EVENTS_INIT);
  const [sources,   setSources]   = useState(SOURCES_INIT);
  const [scanState, setScanState] = useState('idle');
  const [lastScan,  setLastScan]  = useState(null);
  const [history,   setHistory]   = useState([]);
  const [aiText,    setAiText]    = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError,   setAiError]   = useState('');
  const [tick,      setTick]      = useState(new Date());

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setTick(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const toggleSource = useCallback(id => {
    setSources(s => s.map(x => x.id === id ? { ...x, active: !x.active } : x));
  }, []);

  const runScan = useCallback(async () => {
    if (scanState === 'running') return;
    setScanState('running');
    const t0  = Date.now();
    await new Promise(r => setTimeout(r, 2200));
    const dur  = ((Date.now() - t0) / 1000).toFixed(1);
    const now  = new Date().toISOString();
    const activeSrcs = sources.filter(s => s.active).length;

    let emailSent = false;
    const digestEnabled = localStorage.getItem('digestEnabled') === 'true';
    const digestEmail   = localStorage.getItem('digestEmail') || '';

    if (digestEnabled && digestEmail) {
      try {
        await sendEmailDigest({ toEmail: digestEmail, events, aiText, scanTime: now });
        emailSent = true;
      } catch {
        // Email failure is non-blocking — scan still completes
      }
    }

    setHistory(h => [{ time: now, ok: true, events: events.length, srcs: activeSrcs, dur, emailSent }, ...h]);
    setLastScan(now);
    setScanState('idle');
  }, [scanState, sources, events, aiText]);

  const genAI = useCallback(async () => {
    if (aiLoading) return;
    setAiLoading(true);
    setAiText('');
    setAiError('');
    try {
      const text = await generateAISummary(events, MARKET);
      setAiText(text || 'Unable to generate summary. Please try again.');
    } catch (err) {
      setAiError(err.message);
      setAiText('');
    }
    setAiLoading(false);
  }, [events, aiLoading]);

  const critCount = events.filter(e => e.sev === 'CRITICAL').length;

  const renderModule = () => {
    switch (mod) {
      case 0:  return <Dashboard    events={events} scanState={scanState} onScan={runScan} lastScan={lastScan} aiText={aiText} aiLoading={aiLoading} aiError={aiError} onAI={genAI} />;
      case 1:  return <RegionalIntel events={events} />;
      case 2:  return <GlobalIntel   events={events} />;
      case 3:  return <MarketMonitor />;
      case 4:  return <Alerts        events={events} />;
      case 5:  return <Watchlist />;
      case 6:  return <Sources       sources={sources} onToggle={toggleSource} />;
      case 7:  return <Schedule      onScan={runScan}  scanState={scanState} />;
      case 8:  return <ScanHistory   history={history} />;
      case 9:  return <ExportBrief   events={events}   aiText={aiText} onAI={genAI} aiLoading={aiLoading} />;
      case 10: return <Settings />;
      default: return null;
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">SENTINEL<br />INTEL</div>
          <div className="logo-sub">Executive Platform v3.0</div>
        </div>

        <nav className="sidebar-nav">
          {MODULES.map((m, i) => (
            <button key={m} className={`nav-btn ${mod === i ? 'active' : ''}`} onClick={() => setMod(i)}>
              <span className="nav-icon">{ICONS[i]}</span>
              <span>{m}</span>
              {i === 4 && critCount > 0 && (
                <span style={{
                  marginLeft: 'auto', background: 'var(--red)', color: '#fff',
                  borderRadius: 10, padding: '1px 6px', fontSize: 9, fontFamily: 'var(--mono)',
                }}>
                  {critCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div><span className="status-dot" />SYSTEM ONLINE</div>
          <div style={{ marginTop: 4 }}>{fmtTime(tick)}</div>
          <div style={{ marginTop: 2 }}>{sources.filter(s => s.active).length} sources active</div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="topbar-title">{MODULES[mod]}</div>
          <div className="topbar-time">{fmtDate(tick)}</div>
          {scanState === 'running' && (
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)' }}>
              ⟳ Scan in progress…
            </span>
          )}
        </header>

        <main className="content">{renderModule()}</main>
      </div>
    </div>
  );
}
